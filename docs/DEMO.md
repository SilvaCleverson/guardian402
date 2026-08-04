# Demo

## Prerequisites

1. Node.js >= 20
2. Stellar CLI
3. `.env` filled from `.env.example` (never commit secrets)
4. Client wallet funded with Testnet XLM + USDC (Circle faucet)
5. Pay-to wallet funded with Testnet XLM + USDC trustline
6. Contract deployed and seeded

## Contract

- Contract ID: `CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO`
- Explorer: https://lab.stellar.org/r/testnet/contract/CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO

## Start API

```bash
npm install
npm run build
npm run start:api
```

## Run verification (AUTHENTIC)

```bash
npm run guardian -- verify \
  --boleto-id "23793381286000000000123456789012345678901234" \
  --amount "159.90" \
  --due-date "2026-08-10" \
  --beneficiary-document "12345678000199"
```

Expected result: `AUTHENTIC`

## Other cases

| Case      | Change                    | Expected  |
| --------- | ------------------------- | --------- |
| MISMATCH  | `--amount "1.00"`         | MISMATCH  |
| NOT_FOUND | unknown boleto id         | NOT_FOUND |
| REVOKED   | boleto ending in `999...` | REVOKED   |

Or run `bash scripts/run-demo.sh` with the API already running.
