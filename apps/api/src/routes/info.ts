import { Router } from "express";
import type { ServiceInfoResponse } from "@guardian402/shared";
import type { ApiConfig } from "../config/env.js";

export function createInfoRouter(config: ApiConfig): Router {
  const router = Router();

  router.get("/v1/info", (_req, res) => {
    const body: ServiceInfoResponse = {
      name: "Guardian402",
      description: "Pay-per-use boleto integrity verification",
      price: config.X402_PRICE,
      asset: "USDC",
      network: config.STELLAR_NETWORK,
      contractId: config.VERIFICATION_CONTRACT_ID || "not-deployed",
    };
    res.status(200).json(body);
  });

  return router;
}
