import type { VerificationStatus } from "@guardian402/shared";

interface GuardianSealVerification {
  seal_status: "VALID" | "REVOKED" | "PENDING" | "INVALID" | "NOT_ON_CHAIN" | "NOT_FOUND";
  proof?: {
    blockchain_network?: string | null;
    blockchain_contract_id?: string | null;
    blockchain_tx_hash?: string | null;
  };
}

function mapSealStatus(sealStatus: GuardianSealVerification["seal_status"]): VerificationStatus {
  switch (sealStatus) {
    case "VALID":
      return "AUTHENTIC";
    case "REVOKED":
      return "REVOKED";
    case "NOT_FOUND":
      return "NOT_FOUND";
    default:
      // PENDING / INVALID / NOT_ON_CHAIN: the seal exists but Guardian Seal's own
      // recomputed integrity checks did not fully pass.
      return "MISMATCH";
  }
}

export async function verifyBoletoWithGuardianSeal(
  baseUrl: string,
  barcode: string,
): Promise<{ status: VerificationStatus; network?: string; contractId?: string; txHash?: string }> {
  const url = new URL(`/api/public/verify/barcode/${encodeURIComponent(barcode)}`, baseUrl).toString();
  const response = await fetch(url);

  if (response.status === 404) {
    return { status: "NOT_FOUND" };
  }

  if (!response.ok) {
    throw new Error(`Guardian Seal returned HTTP ${response.status}`);
  }

  const body = (await response.json()) as GuardianSealVerification;

  return {
    status: mapSealStatus(body.seal_status),
    network: body.proof?.blockchain_network ?? undefined,
    contractId: body.proof?.blockchain_contract_id ?? undefined,
    txHash: body.proof?.blockchain_tx_hash ?? undefined,
  };
}
