import { createHash } from "node:crypto";

export interface BoletoCanonicalInput {
  boletoId: string;
  amount: string;
  dueDate: string;
  beneficiaryDocument: string;
}

export function normalizeBoletoId(boletoId: string): string {
  return boletoId.replace(/[\s.\-/]/g, "");
}

export function normalizeAmountToCents(amount: string): string {
  const cleaned = amount.trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    throw new Error(`Invalid amount: ${amount}`);
  }
  const [whole, fraction = ""] = cleaned.split(".");
  const cents = `${whole}${fraction.padEnd(2, "0")}`;
  return cents.replace(/^0+(?=\d)/, "") || "0";
}

export function normalizeDueDate(dueDate: string): string {
  const trimmed = dueDate.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    throw new Error(`Invalid dueDate: ${dueDate}`);
  }
  return trimmed;
}

export function normalizeDocument(document: string): string {
  return document.replace(/\D/g, "");
}

export function buildCanonicalString(input: BoletoCanonicalInput): string {
  const boletoId = normalizeBoletoId(input.boletoId);
  const amountInCents = normalizeAmountToCents(input.amount);
  const dueDate = normalizeDueDate(input.dueDate);
  const beneficiaryDocument = normalizeDocument(input.beneficiaryDocument);
  return `${boletoId}|${amountInCents}|${dueDate}|${beneficiaryDocument}`;
}

export function sha256Hex(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

export function sha256Bytes(value: string | Buffer): Buffer {
  return createHash("sha256").update(value).digest();
}

export function computeRecordKey(boletoId: string): Buffer {
  return sha256Bytes(normalizeBoletoId(boletoId));
}

/**
 * documentHash = SHA256(recordKeyHex + "|" + amountInCents + "|" + dueDate + "|" + beneficiaryDocument)
 * Using recordKey as hex keeps the shared function deterministic across seed/API/CLI.
 */
export function computeDocumentHash(input: BoletoCanonicalInput): Buffer {
  const recordKeyHex = computeRecordKey(input.boletoId).toString("hex");
  const amountInCents = normalizeAmountToCents(input.amount);
  const dueDate = normalizeDueDate(input.dueDate);
  const beneficiaryDocument = normalizeDocument(input.beneficiaryDocument);
  return sha256Bytes(`${recordKeyHex}|${amountInCents}|${dueDate}|${beneficiaryDocument}`);
}

export function toHex(buffer: Buffer): string {
  return buffer.toString("hex");
}
