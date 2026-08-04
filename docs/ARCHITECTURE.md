# Architecture

## Overview

Guardian402 is a pay-per-use boleto integrity verification API.

1. Client calls `POST /v1/verify` without payment.
2. Server responds `HTTP 402` with x402 payment requirements (USDC on `stellar:testnet`).
3. Client authorizes payment via `@x402/fetch` + `@x402/stellar`.
4. Facilitator verifies and settles the payment on Stellar.
5. Server queries the Soroban `verification-registry` contract.
6. Response returns `AUTHENTIC | MISMATCH | NOT_FOUND | REVOKED`.

```text
CLI / Agent
   |  POST /v1/verify
   v
Express API  --x402--> Facilitator (x402.org) --settle--> Stellar Testnet USDC
   |
   | simulate verify()
   v
Soroban Verification Registry
```

## Components

| Component       | Path                              | Role                                |
| --------------- | --------------------------------- | ----------------------------------- |
| API             | `apps/api`                        | Express + x402 middleware + Zod     |
| CLI             | `apps/cli`                        | Agent client that pays and verifies |
| Shared          | `packages/shared`                 | Canonicalization + hashes           |
| Contract client | `packages/contract-client`        | RPC simulation against Soroban      |
| Contract        | `contracts/verification-registry` | Hash registry on-chain              |

## Design decisions

- Facilitator URL follows the current Stellar x402 quickstart (`https://www.x402.org/facilitator`) rather than the older OpenZeppelin channel URL in the challenge draft.
- On-chain storage is only `record_key` + `document_hash` (+ timestamps/flags). No boleto payload, CPF/CNPJ, or bank data.
- Payment settlement is independent from integrity proof. Paying does not make a boleto authentic.
