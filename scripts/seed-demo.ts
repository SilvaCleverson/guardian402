#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { computeDocumentHash, computeRecordKey, toHex } from "@guardian402/shared";

const CONTRACT =
  process.env.VERIFICATION_CONTRACT_ID ??
  "CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO";
const ADMIN = execFileSync("stellar", ["keys", "address", "guardian402-admin"], {
  encoding: "utf8",
}).trim();
const PASSPHRASE = "Test SDF Network ; September 2015";

const authentic = {
  boletoId: "23793381286000000000123456789012345678901234",
  amount: "159.90",
  dueDate: "2026-08-10",
  beneficiaryDocument: "12345678000199",
};

const revoked = {
  boletoId: "23793381286000000000999999999999999999999999",
  amount: "10.00",
  dueDate: "2026-08-15",
  beneficiaryDocument: "12345678000199",
};

function invoke(args: string[]): void {
  const cmd = [
    "contract",
    "invoke",
    "--id",
    CONTRACT,
    "--source-account",
    "guardian402-admin",
    "--network",
    "testnet",
    "--network-passphrase",
    PASSPHRASE,
    "--",
    ...args,
  ];
  console.log(">", "stellar", cmd.join(" "));
  execFileSync("stellar", cmd, { stdio: "inherit" });
}

function register(input: typeof authentic): { recordKey: string; documentHash: string } {
  const recordKey = toHex(computeRecordKey(input.boletoId));
  const documentHash = toHex(computeDocumentHash(input));
  invoke([
    "register",
    "--admin",
    ADMIN,
    "--record_key",
    recordKey,
    "--document_hash",
    documentHash,
  ]);
  return { recordKey, documentHash };
}

console.log("Seeding Guardian402 demo records...");
console.log("Contract:", CONTRACT);
console.log("Admin:", ADMIN);

const a = register(authentic);
console.log("AUTHENTIC registered", a);

const r = register(revoked);
invoke(["revoke", "--admin", ADMIN, "--record_key", r.recordKey]);
console.log("REVOKED registered+revoked", r);

console.log("\nDemo inputs:");
console.log(
  JSON.stringify(
    {
      AUTHENTIC: authentic,
      MISMATCH: { ...authentic, amount: "1.00" },
      NOT_FOUND: {
        boletoId: "00000000000000000000000000000000000000000000",
        amount: "10.00",
        dueDate: "2026-08-10",
        beneficiaryDocument: "12345678000199",
      },
      REVOKED: revoked,
    },
    null,
    2,
  ),
);
