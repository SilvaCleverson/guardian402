import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { loadConfig } from "../src/config/env.js";

describe("API routes", () => {
  const config = loadConfig({
    NODE_ENV: "test",
    PORT: "3001",
    STELLAR_NETWORK: "stellar:testnet",
    STELLAR_RPC_URL: "https://soroban-testnet.stellar.org",
    VERIFICATION_CONTRACT_ID: "",
    X402_PRICE: "$0.01",
    X402_PAY_TO: "",
    X402_FACILITATOR_URL: "https://www.x402.org/facilitator",
  });

  it("GET /health", async () => {
    const app = createApp(config);
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.service).toBe("guardian402");
  });

  it("GET /v1/info", async () => {
    const app = createApp(config);
    const response = await request(app).get("/v1/info");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Guardian402");
    expect(response.body.asset).toBe("USDC");
  });

  it("POST /v1/verify rejects invalid body", async () => {
    const app = createApp(config);
    const response = await request(app).post("/v1/verify").send({ boletoId: "1" });
    expect(response.status).toBe(400);
  });
});
