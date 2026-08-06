import { Router } from "express";
import {
  computeDocumentHash,
  computeRecordKey,
  toHex,
  type VerificationStatus,
} from "@guardian402/shared";
import type { VerificationRegistryClient } from "@guardian402/contract-client";
import type { ApiConfig } from "../config/env.js";
import { verifyRequestSchema } from "../schemas/verify.js";
import { extractPaymentTransactionHash } from "../services/payment.js";
import { verifyBoletoWithGuardianSeal } from "../services/guardianSeal.js";

const messages: Record<VerificationStatus, string> = {
  AUTHENTIC: "The supplied boleto data matches the registered proof.",
  MISMATCH: "The supplied boleto data does not match the registered proof.",
  NOT_FOUND: "No integrity proof was found for the supplied boleto identifier.",
  REVOKED: "The integrity proof for this boleto was revoked.",
};

export function createVerifyRouter(
  config: ApiConfig,
  registry: VerificationRegistryClient,
): Router {
  const router = Router();

  router.post("/v1/verify", async (req, res) => {
    const parsed = verifyRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "invalid_request",
        details: parsed.error.flatten(),
      });
      return;
    }

    const paymentHash = extractPaymentTransactionHash(req);

    if (config.GUARDIAN_SEAL_BASE_URL) {
      try {
        const seal = await verifyBoletoWithGuardianSeal(
          config.GUARDIAN_SEAL_BASE_URL,
          parsed.data.boletoId,
        );

        res.status(200).json({
          status: seal.status,
          message: messages[seal.status],
          proof: {
            recordKey: null,
            documentHash: null,
            contractId: seal.contractId ?? null,
            network: seal.network ?? config.STELLAR_NETWORK,
            sealTransactionHash: seal.txHash ?? null,
            source: "guardian-seal",
          },
          payment: {
            protocol: "x402",
            asset: "USDC",
            amount: config.X402_PRICE.replace("$", ""),
            transactionHash: paymentHash ?? null,
          },
          verifiedAt: new Date().toISOString(),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown_error";
        console.error("guardian_seal_verify_failed", { message });
        res.status(503).json({
          error: "guardian_seal_unavailable",
          message: "Unable to query the Guardian Seal verification API.",
        });
      }
      return;
    }

    if (!config.VERIFICATION_CONTRACT_ID) {
      res.status(503).json({
        error: "contract_unavailable",
        message: "VERIFICATION_CONTRACT_ID is not configured.",
      });
      return;
    }

    try {
      const recordKey = computeRecordKey(parsed.data.boletoId);
      const documentHash = computeDocumentHash(parsed.data);
      const status = await registry.verify(recordKey, documentHash);

      res.status(200).json({
        status,
        message: messages[status],
        proof: {
          recordKey: toHex(recordKey),
          documentHash: toHex(documentHash),
          contractId: config.VERIFICATION_CONTRACT_ID,
          network: config.STELLAR_NETWORK,
        },
        payment: {
          protocol: "x402",
          asset: "USDC",
          amount: config.X402_PRICE.replace("$", ""),
          transactionHash: paymentHash ?? null,
        },
        verifiedAt: new Date().toISOString(),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown_error";
      console.error("verify_failed", { message });
      res.status(503).json({
        error: "rpc_unavailable",
        message: "Unable to query the verification contract.",
      });
    }
  });

  return router;
}
