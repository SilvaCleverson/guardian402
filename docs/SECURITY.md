# Security

## Principles

- Store only hashes on-chain.
- Never commit `.env` or secret keys.
- Validate request bodies with Zod.
- Limit JSON body size.
- Add RPC timeouts in the contract client.
- Do not log private keys or payment payloads.

## Important disclaimer

Guardian402 verifies whether supplied boleto data matches a previously registered integrity proof. It does **not** confirm:

- bank settlement
- clearing/compensation
- beneficiary identity in the banking system
- that the boleto itself was paid

## Facilitator trust

The MVP uses a hosted facilitator. Settlement correctness depends on that facilitator verifying amount, asset, network, and payee before the protected route runs.
