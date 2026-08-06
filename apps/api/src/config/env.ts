import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  STELLAR_NETWORK: z.string().default("stellar:testnet"),
  STELLAR_RPC_URL: z.string().url().default("https://soroban-testnet.stellar.org"),
  VERIFICATION_CONTRACT_ID: z.string().optional().default(""),
  X402_PRICE: z.string().default("$0.01"),
  X402_PAY_TO: z.string().default(""),
  X402_FACILITATOR_URL: z.string().url().default("https://www.x402.org/facilitator"),
  X402_FACILITATOR_API_KEY: z.string().optional().default(""),
  GUARDIAN_SEAL_BASE_URL: z.string().optional().default(""),
});

export type ApiConfig = z.infer<typeof envSchema>;

export function loadConfig(env: Record<string, string | undefined> = process.env): ApiConfig {
  return envSchema.parse(env);
}

export function assertRuntimeConfig(config: ApiConfig): void {
  if (!config.X402_PAY_TO || !config.X402_PAY_TO.startsWith("G")) {
    throw new Error("X402_PAY_TO must be a Stellar public key (G...)");
  }
}
