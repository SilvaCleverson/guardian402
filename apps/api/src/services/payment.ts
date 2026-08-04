import type { Request } from "express";

function tryParsePaymentHeader(header: string): string | undefined {
  try {
    const decoded = Buffer.from(header, "base64").toString("utf8");
    const parsed = JSON.parse(decoded) as Record<string, unknown>;
    const nested = parsed.settleResponse as Record<string, unknown> | undefined;
    const candidates = [
      parsed.transaction,
      parsed.txHash,
      parsed.hash,
      nested?.transaction,
      nested?.txHash,
    ];
    for (const value of candidates) {
      if (typeof value === "string" && value.length > 0) {
        return value;
      }
    }
  } catch {
    // fall through
  }
  return undefined;
}

export function extractPaymentTransactionHash(req: Request): string | undefined {
  const headerNames = [
    "PAYMENT-RESPONSE",
    "payment-response",
    "X-PAYMENT-RESPONSE",
    "x-payment-response",
  ];

  for (const name of headerNames) {
    const header = req.header(name);
    if (!header) {
      continue;
    }
    return tryParsePaymentHeader(header) ?? header.slice(0, 128);
  }

  const fromLocals = (req as Request & { payment?: { transaction?: string } }).payment;
  if (fromLocals?.transaction) {
    return fromLocals.transaction;
  }

  return undefined;
}
