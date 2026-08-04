# Guardian402

> Pay per verification. Trust every boleto.

API de verifica��o de integridade de boletos, paga por uso via protocolo **x402** em **USDC** na **Stellar Testnet**, com prova armazenada em contrato **Soroban**.

Este reposit�rio foi iniciado durante o **Stellar Builder Summit SP 2026** (lane Payments and Agent Tooling / Agentic Payments). Todo o c�digo � trabalho original do desafio.

## Deploy atual (Testnet)

| Item        | Valor                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Contract ID | `CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO`                                          |
| Lab         | https://lab.stellar.org/r/testnet/contract/CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO |
| Rede        | `stellar:testnet`                                                                                   |
| Pre�o       | `$0.01` USDC                                                                                        |
| Facilitator | `https://www.x402.org/facilitator`                                                                  |

## Fluxo

1. `POST /v1/verify` sem pagamento ? `HTTP 402`
2. Cliente assina autoriza��o x402 em USDC
3. Facilitator liquida na Stellar Testnet
4. API consulta o contrato Soroban
5. Retorna `AUTHENTIC | MISMATCH | NOT_FOUND | REVOKED`

## Setup

```bash
npm install
cp .env.example .env
# Preencha X402_PAY_TO, STELLAR_PRIVATE_KEY, VERIFICATION_CONTRACT_ID
npm run build
npm run start:api
```

Em outro terminal:

```bash
npm run guardian -- verify \
  --boleto-id "23793381286000000000123456789012345678901234" \
  --amount "159.90" \
  --due-date "2026-08-10" \
  --beneficiary-document "12345678000199"
```

## Comandos

```bash
npm test
npm run lint
npm run seed:demo
npm run build
```

## Documenta��o

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/DEMO.md`](docs/DEMO.md)
- [`docs/SECURITY.md`](docs/SECURITY.md)
- [`docs/STATUS.md`](docs/STATUS.md)
- [`docs/SUBMISSION.md`](docs/SUBMISSION.md)

## Aviso

Guardian402 verifies whether supplied boleto data matches a previously registered integrity proof. It does not confirm bank settlement or payment status.

## Licen�a

MIT
