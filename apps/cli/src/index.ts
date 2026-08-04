#!/usr/bin/env node
import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Transaction, TransactionBuilder } from "@stellar/stellar-sdk";
import { x402Client, x402HTTPClient } from "@x402/fetch";
import { createEd25519Signer, getNetworkPassphrase } from "@x402/stellar";
import { ExactStellarScheme } from "@x402/stellar/exact/client";

const here = dirname(fileURLToPath(import.meta.url));
const rootEnv = resolve(here, "../../../.env");
const localEnv = resolve(process.cwd(), ".env");
dotenv.config({ path: existsSync(rootEnv) ? rootEnv : localEnv, quiet: true });

interface VerifyArgs {
  boletoId: string;
  amount: string;
  dueDate: string;
  beneficiaryDocument: string;
  baseUrl: string;
}

function printHelp(): void {
  console.log(`Guardian402 CLI

Usage:
  npm run guardian -- verify --boleto-id <id> --amount <n> --due-date <YYYY-MM-DD> --beneficiary-document <doc>

Options:
  --base-url <url>   API base URL (default: http://localhost:3001)
`);
}

function parseArgs(argv: string[]): VerifyArgs | "help" | "error" {
  if (argv.includes("--help") || argv.includes("-h") || argv.length === 0) {
    return "help";
  }

  if (argv[0] !== "verify") {
    return "error";
  }

  const get = (flag: string): string | undefined => {
    const idx = argv.indexOf(flag);
    return idx >= 0 ? argv[idx + 1] : undefined;
  };

  const boletoId = get("--boleto-id");
  const amount = get("--amount");
  const dueDate = get("--due-date");
  const beneficiaryDocument = get("--beneficiary-document");
  const baseUrl = get("--base-url") ?? process.env.API_BASE_URL ?? "http://localhost:3001";

  if (!boletoId || !amount || !dueDate || !beneficiaryDocument) {
    return "error";
  }

  return { boletoId, amount, dueDate, beneficiaryDocument, baseUrl };
}

async function authorizeAndSettle(
  httpClient: x402HTTPClient,
  client: x402Client,
  url: string,
  body: object,
  network: string,
): Promise<{ status: number; json: unknown; paymentResponse: unknown }> {
  const firstTry = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  console.log(`[1/4] Requesting verification...`);
  console.log(`[2/4] HTTP ${firstTry.status} received.`);

  if (firstTry.status !== 402) {
    const text = await firstTry.text();
    throw new Error(`Expected HTTP 402, got ${firstTry.status}: ${text}`);
  }

  const paymentRequired = httpClient.getPaymentRequiredResponse((name) =>
    firstTry.headers.get(name),
  );

  console.log(`[3/4] Authorizing and settling x402 payment...`);
  let paymentPayload = await client.createPaymentPayload(paymentRequired);
  const networkPassphrase = getNetworkPassphrase(network as `${string}:${string}`);
  const txXdr = String((paymentPayload.payload as { transaction?: string }).transaction ?? "");
  const tx = new Transaction(txXdr, networkPassphrase);
  const sorobanData = tx.toEnvelope().v1()?.tx()?.ext()?.sorobanData();

  // Configure fee to 1 stroop — avoids the testnet facilitator fee-limit issue (Stellar docs).
  if (sorobanData) {
    paymentPayload = {
      ...paymentPayload,
      payload: {
        ...paymentPayload.payload,
        transaction: TransactionBuilder.cloneFrom(tx, {
          fee: "1",
          sorobanData,
          networkPassphrase,
        })
          .build()
          .toXDR(),
      },
    };
  }

  const paymentHeaders = httpClient.encodePaymentSignatureHeader(paymentPayload);
  const paidResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...paymentHeaders,
    },
    body: JSON.stringify(body),
  });

  const rawText = await paidResponse.text();
  let json: unknown = null;
  try {
    json = JSON.parse(rawText);
  } catch {
    json = { raw: rawText };
  }

  let paymentResponse: unknown = null;
  try {
    paymentResponse = httpClient.getPaymentSettleResponse((name) => paidResponse.headers.get(name));
  } catch (error) {
    console.error(
      "Payment settle header missing.",
      `HTTP ${paidResponse.status}`,
      rawText.slice(0, 500),
    );
    console.error(
      "Response payment headers:",
      [...paidResponse.headers.entries()].filter(([k]) => k.toLowerCase().includes("payment")),
    );
    throw error;
  }

  return { status: paidResponse.status, json, paymentResponse };
}

async function main(): Promise<void> {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed === "help") {
    printHelp();
    process.exit(0);
  }
  if (parsed === "error") {
    printHelp();
    process.exit(1);
  }

  const privateKey = process.env.STELLAR_PRIVATE_KEY;
  if (!privateKey || !privateKey.startsWith("S")) {
    console.error("STELLAR_PRIVATE_KEY is required in the environment.");
    process.exit(1);
  }

  const network = process.env.STELLAR_NETWORK ?? "stellar:testnet";
  const rpcUrl = process.env.STELLAR_RPC_URL ?? "https://soroban-testnet.stellar.org";
  const url = new URL("/v1/verify", parsed.baseUrl).toString();

  console.log("Guardian402\n");
  console.log(`Target: ${url}`);
  console.log(`Network: ${network}`);
  console.log(`Price: ${(process.env.X402_PRICE ?? "$0.01").replace("$", "")} USDC\n`);

  const signer = createEd25519Signer(privateKey, network as `${string}:${string}`);
  const client = new x402Client().register(
    "stellar:*",
    new ExactStellarScheme(signer, { url: rpcUrl }),
  );
  const httpClient = new x402HTTPClient(client);

  const body = {
    boletoId: parsed.boletoId,
    amount: parsed.amount,
    dueDate: parsed.dueDate,
    beneficiaryDocument: parsed.beneficiaryDocument,
  };

  const result = await authorizeAndSettle(httpClient, client, url, body, network);
  console.log(`[4/4] Reading verification result...\n`);

  const payload = result.json as {
    status?: string;
    proof?: { contractId?: string };
    payment?: { transactionHash?: string | null };
  };

  const settle = result.paymentResponse as {
    transaction?: string;
    txHash?: string;
    settleResponse?: { transaction?: string };
  } | null;

  const txHash =
    payload.payment?.transactionHash ??
    settle?.transaction ??
    settle?.txHash ??
    settle?.settleResponse?.transaction ??
    "(none)";

  console.log(`Result: ${payload.status ?? "UNKNOWN"}`);
  console.log(`HTTP: ${result.status}`);
  console.log(`Payment transaction: ${txHash}`);
  console.log(`Contract: ${payload.proof?.contractId ?? "(none)"}`);
  if (result.status >= 500) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Client failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
