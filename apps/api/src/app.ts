import express from "express";
import { paymentMiddlewareFromConfig } from "@x402/express";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactStellarScheme } from "@x402/stellar/exact/server";
import { Networks } from "@stellar/stellar-sdk";
import { createRegistryClient } from "@guardian402/contract-client";
import type { ApiConfig } from "./config/env.js";
import { createHealthRouter } from "./routes/health.js";
import { createInfoRouter } from "./routes/info.js";
import { createVerifyRouter } from "./routes/verify.js";

type NetworkId = `${string}:${string}`;

export function createApp(config: ApiConfig) {
  const app = express();
  app.use(express.json({ limit: "32kb" }));

  app.use(createHealthRouter(config));
  app.use(createInfoRouter(config));

  const network = config.STELLAR_NETWORK as NetworkId;
  const payTo = config.X402_PAY_TO;

  if (payTo && payTo.startsWith("G")) {
    app.use(
      paymentMiddlewareFromConfig(
        {
          "POST /v1/verify": {
            accepts: {
              scheme: "exact",
              price: config.X402_PRICE,
              network,
              payTo,
            },
          },
          "GET /v1/ping": {
            accepts: {
              scheme: "exact",
              price: config.X402_PRICE,
              network,
              payTo,
            },
          },
        },
        new HTTPFacilitatorClient({
          url: config.X402_FACILITATOR_URL,
        }),
        [{ network, server: new ExactStellarScheme() }],
      ),
    );
  }

  app.get("/v1/ping", (_req, res) => {
    res.status(200).json({
      ok: true,
      service: "guardian402",
      message: "x402 payment settled",
    });
  });

  const registry = createRegistryClient({
    contractId:
      config.VERIFICATION_CONTRACT_ID || "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHK3M",
    rpcUrl: config.STELLAR_RPC_URL,
    networkPassphrase:
      config.STELLAR_NETWORK === "stellar:testnet" ? Networks.TESTNET : Networks.PUBLIC,
  });

  app.use(createVerifyRouter(config, registry));

  return app;
}
