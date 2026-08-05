# Guardian402

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)
![Network](https://img.shields.io/badge/network-Stellar%20Testnet-7D00FF.svg)
![Protocol](https://img.shields.io/badge/protocol-x402-000000.svg)

> O boleto no Protheus é o boleto verdadeiro?

[English](README.md) · [Español](README.es.md)

O **Guardian402** é uma API paga por uso que verifica se os dados de um boleto — como o posicionado no **TOTVS Protheus** ou enviado por um agente — correspondem a uma prova de integridade em **Soroban**. Cada chamada é cobrada em **USDC** na **Stellar Testnet** via **x402**. Sem conta, sem API key, sem assinatura.

**Site de apresentação:** https://guardian402-summit.vercel.app  
**Summit:** [Stellar Summit SP 2026](https://stellar-summit-lp.vercel.app/) — Payments and Agent Tooling / SDF DevEx / Agentic Payments (x402)

Todo o código deste repositório é trabalho original do desafio. Referência relacionada: [Boleto Guardian](https://guardian-labs.xyz/boleto-guardian.html).

## O que é a TOTVS?

A **TOTVS** é a maior empresa brasileira de software de gestão. Seu ERP principal, o **Protheus**, é amplamente usado para emitir e gerir boletos.

Segundo a pesquisa **FGV-Eaesp** de Uso de TI:

- cerca de **34%** do mercado geral de ERP no Brasil (empatada com a SAP)
- cerca de **50%** nas instalações menores (até ~180 usuários)

Verificar um boleto no Protheus alcança uma fatia grande do mercado corporativo brasileiro.

## Por que o Guardian402

Empresas e agentes de IA que precisam confirmar dados de boleto hoje dependem de integrações fechadas, contratos, API keys e cobrança mensal — pouco adequado para agentes que querem pagar por chamada.

O Guardian402 expõe um endpoint protegido por **x402**. A própria resposta HTTP informa preço, rede, ativo e destinatário. O agente assina o pagamento, repete a chamada e recebe o resultado.

**Caminho do produto**

1. Contexto: boleto no Protheus precisa de checagem independente.
2. MVP (este repo): verificação por hash no Soroban, paga com x402 USDC.
3. Roadmap: consumo nativo no Protheus do mesmo endpoint.

## Como funciona

1. `POST /v1/verify` sem pagamento -> `HTTP 402`.
2. Cliente autoriza pagamento x402 em USDC.
3. Facilitator liquida na Stellar Testnet.
4. API consulta o contrato Soroban.
5. Retorno: `AUTHENTIC | MISMATCH | NOT_FOUND | REVOKED`.

## Deploy atual (Testnet)

| Item | Valor |
| --- | --- |
| Site | [guardian402-summit.vercel.app](https://guardian402-summit.vercel.app) |
| Contract ID | `CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO` |
| Explorer | [lab.stellar.org](https://lab.stellar.org/r/testnet/contract/CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO) |
| Rede | `stellar:testnet` |
| Preço | `$0.01` USDC |
| Facilitator | [www.x402.org/facilitator](https://www.x402.org/facilitator) |

## Como começar

```bash
npm install
cp .env.example .env
npm run build
npm run start:api
```

No PowerShell, rode o CLI em **uma linha**:

```powershell
npm run guardian -- verify --boleto-id "23793381286000000000123456789012345678901234" --amount "159.90" --due-date "2026-08-10" --beneficiary-document "12345678000199"
```

## Documentação

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/DEMO.md`](docs/DEMO.md)
- [`docs/SECURITY.md`](docs/SECURITY.md)
- [`docs/STATUS.md`](docs/STATUS.md)
- [Boleto Guardian](https://guardian-labs.xyz/boleto-guardian.html) (referência relacionada)

## Aviso

O Guardian402 verifica correspondência com uma prova de integridade registrada. **Não** confirma liquidação bancária nem pagamento do boleto.

## Licença

[MIT](LICENSE)
