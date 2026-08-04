import { Router } from "express";
import type { HealthResponse } from "@guardian402/shared";
import type { ApiConfig } from "../config/env.js";

export function createHealthRouter(config: ApiConfig): Router {
  const router = Router();

  router.get("/health", (_req, res) => {
    const body: HealthResponse = {
      status: "ok",
      service: "guardian402",
      network: config.STELLAR_NETWORK,
    };
    res.status(200).json(body);
  });

  return router;
}
