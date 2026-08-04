#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> AUTHENTIC"
npm run guardian -- verify \
  --boleto-id "23793381286000000000123456789012345678901234" \
  --amount "159.90" \
  --due-date "2026-08-10" \
  --beneficiary-document "12345678000199"

echo "==> MISMATCH"
npm run guardian -- verify \
  --boleto-id "23793381286000000000123456789012345678901234" \
  --amount "1.00" \
  --due-date "2026-08-10" \
  --beneficiary-document "12345678000199"

echo "==> NOT_FOUND"
npm run guardian -- verify \
  --boleto-id "00000000000000000000000000000000000000000000" \
  --amount "10.00" \
  --due-date "2026-08-10" \
  --beneficiary-document "12345678000199"

echo "==> REVOKED"
npm run guardian -- verify \
  --boleto-id "23793381286000000000999999999999999999999999" \
  --amount "10.00" \
  --due-date "2026-08-15" \
  --beneficiary-document "12345678000199"
