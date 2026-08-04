export type VerificationStatus = "AUTHENTIC" | "MISMATCH" | "NOT_FOUND" | "REVOKED";

export interface HealthResponse {
  status: "ok";
  service: "guardian402";
  network: string;
}

export interface ServiceInfoResponse {
  name: string;
  description: string;
  price: string;
  asset: string;
  network: string;
  contractId: string;
}

export * from "./hash.js";
