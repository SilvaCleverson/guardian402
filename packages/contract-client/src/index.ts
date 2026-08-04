import {
  Account,
  Contract,
  Networks,
  TransactionBuilder,
  nativeToScVal,
  rpc,
  scValToNative,
} from "@stellar/stellar-sdk";
import type { VerificationStatus } from "@guardian402/shared";

export interface VerificationRegistryClientOptions {
  contractId: string;
  rpcUrl: string;
  networkPassphrase?: string;
  timeoutMs?: number;
}

const statusMap: Record<string, VerificationStatus> = {
  Authentic: "AUTHENTIC",
  Mismatch: "MISMATCH",
  NotFound: "NOT_FOUND",
  Revoked: "REVOKED",
};

const SIM_ACCOUNT = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF";

export class VerificationRegistryClient {
  private readonly server: rpc.Server;
  private readonly contract: Contract;
  private readonly networkPassphrase: string;
  private readonly timeoutMs: number;

  constructor(options: VerificationRegistryClientOptions) {
    this.server = new rpc.Server(options.rpcUrl, { allowHttp: false });
    this.contract = new Contract(options.contractId);
    this.networkPassphrase = options.networkPassphrase ?? Networks.TESTNET;
    this.timeoutMs = options.timeoutMs ?? 15_000;
  }

  async verify(recordKey: Buffer, documentHash: Buffer): Promise<VerificationStatus> {
    const native = await this.simulate("verify", [
      nativeToScVal(recordKey, { type: "bytes" }),
      nativeToScVal(documentHash, { type: "bytes" }),
    ]);

    return this.mapStatus(native);
  }

  async get(recordKey: Buffer): Promise<{
    documentHash: string;
    registeredAt: number;
    active: boolean;
  } | null> {
    const native = await this.simulate("get", [nativeToScVal(recordKey, { type: "bytes" })]);
    if (!native) {
      return null;
    }

    const record = native as {
      document_hash: Buffer | Uint8Array;
      registered_at: bigint | number;
      active: boolean;
    };

    return {
      documentHash: Buffer.from(record.document_hash).toString("hex"),
      registeredAt: Number(record.registered_at),
      active: record.active,
    };
  }

  private mapStatus(native: unknown): VerificationStatus {
    if (Array.isArray(native) && native.length > 0) {
      return this.mapStatus(native[0]);
    }

    if (typeof native === "string") {
      const mapped = statusMap[native];
      if (!mapped) {
        throw new Error(`Unknown status: ${native}`);
      }
      return mapped;
    }

    if (native && typeof native === "object" && "tag" in native) {
      const tag = String((native as { tag: string }).tag);
      const mapped = statusMap[tag];
      if (!mapped) {
        throw new Error(`Unknown status tag: ${tag}`);
      }
      return mapped;
    }

    throw new Error(`Unable to parse verification status: ${JSON.stringify(native)}`);
  }

  private async simulate(
    method: string,
    args: Parameters<Contract["call"]>[1][],
  ): Promise<unknown> {
    const built = new TransactionBuilder(new Account(SIM_ACCOUNT, "0"), {
      fee: "100",
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(this.contract.call(method, ...args))
      .setTimeout(30)
      .build();

    const simulated = await this.withTimeout(this.server.simulateTransaction(built));

    if (rpc.Api.isSimulationError(simulated)) {
      throw new Error(simulated.error);
    }

    if (!rpc.Api.isSimulationSuccess(simulated) || !simulated.result) {
      throw new Error("Contract simulation failed");
    }

    return scValToNative(simulated.result.retval);
  }

  private async withTimeout<T>(promise: Promise<T>): Promise<T> {
    let timer: NodeJS.Timeout | undefined;
    try {
      return await Promise.race([
        promise,
        new Promise<T>((_, reject) => {
          timer = setTimeout(() => reject(new Error("RPC timeout")), this.timeoutMs);
        }),
      ]);
    } finally {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }
}

export function createRegistryClient(
  options: VerificationRegistryClientOptions,
): VerificationRegistryClient {
  return new VerificationRegistryClient(options);
}
