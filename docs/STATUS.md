# Guardian402 — Status das fases

Atualizado em: 2026-08-04

Projeto iniciado durante o Stellar Builder Summit SP 2026. Encerramento: 2026-08-06, 17:00.

## Checklist por fase

### Fase 0 — Preparação

- [x] Repositório Git inicializado
- [x] README / monorepo / lint / testes / `.env.example`

### Fase 1 — Prova x402 isolada

- [x] Rota protegida com middleware oficial
- [x] HTTP 402 confirmado
- [x] Pagamento USDC Testnet liquidado pelo facilitator
- [x] HTTP 200 após pagamento

### Fase 2 — Contrato Soroban

- [x] `initialize` / `register` / `verify` / `revoke` + eventos
- [x] 7 testes unitários passing
- [x] Deploy Testnet: `CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO`

### Fase 3 — Contract Client

- [x] Adapter TypeScript + simulate + mapeamento de status + timeout

### Fase 4 — API Guardian402

- [x] Zod + canonicalização + `POST /v1/verify` + schema estável

### Fase 5 — Agent Client

- [x] CLI paga e verifica os 4 status (AUTHENTIC/MISMATCH/NOT_FOUND/REVOKED)

### Fase 6 — Documentação

- [x] README + ARCHITECTURE + DEMO + SECURITY + SUBMISSION

### Fase 7 — Submissão

- [ ] Vídeo da demo
- [ ] Repositório público no GitHub
- [ ] Conferir ausência de segredos no remoto

## Evidências locais

| Caso      | Resultado | Tx exemplo    |
| --------- | --------- | ------------- |
| AUTHENTIC | ok        | pago via x402 |
| MISMATCH  | ok        | `8e1965fa...` |
| NOT_FOUND | ok        | `e5312cc6...` |
| REVOKED   | ok        | `daf44a55...` |

Facilitator usado: `https://www.x402.org/facilitator` (quickstart oficial Stellar).
