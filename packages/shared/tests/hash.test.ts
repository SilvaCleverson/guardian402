import { describe, expect, it } from "vitest";
import {
  buildCanonicalString,
  computeDocumentHash,
  computeRecordKey,
  normalizeAmountToCents,
  toHex,
} from "../src/hash.js";

const sample = {
  boletoId: "23793381286000000000123456789012345678901234",
  amount: "159.90",
  dueDate: "2026-08-10",
  beneficiaryDocument: "12.345.678/0001-99",
};

describe("canonicalization", () => {
  it("builds deterministic canonical string", () => {
    expect(buildCanonicalString(sample)).toBe(
      "23793381286000000000123456789012345678901234|15990|2026-08-10|12345678000199",
    );
  });

  it("normalizes amount with comma", () => {
    expect(normalizeAmountToCents("159,90")).toBe("15990");
  });

  it("computes stable record key and document hash", () => {
    const key1 = toHex(computeRecordKey(sample.boletoId));
    const key2 = toHex(computeRecordKey(` ${sample.boletoId} `));
    expect(key1).toBe(key2);
    expect(key1).toHaveLength(64);

    const hash1 = toHex(computeDocumentHash(sample));
    const hash2 = toHex(
      computeDocumentHash({
        ...sample,
        beneficiaryDocument: "12345678000199",
      }),
    );
    expect(hash1).toBe(hash2);
  });

  it("changes document hash when amount changes", () => {
    const authentic = toHex(computeDocumentHash(sample));
    const altered = toHex(computeDocumentHash({ ...sample, amount: "1.00" }));
    expect(authentic).not.toBe(altered);
  });
});
