# Guardian402

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)
![Network](https://img.shields.io/badge/network-Stellar%20Testnet-7D00FF.svg)
![Protocol](https://img.shields.io/badge/protocol-x402-000000.svg)

> ¿El boleto en Protheus es el verdadero?

[English](README.md) · [Português](README.pt-BR.md)

**Guardian402** es una API de pago por uso que verifica si los datos de un boleto — como el posicionado en **TOTVS Protheus** o enviado por un agente — coinciden con una prueba de integridad en **Soroban**. Cada llamada se cobra en **USDC** en la **Stellar Testnet** vía **x402**. Sin cuenta, sin API key, sin suscripción.

**Sitio de presentación:** https://guardian402-summit.vercel.app  
**Summit:** [Stellar Summit SP 2026](https://stellar-summit-lp.vercel.app/) — Payments and Agent Tooling / SDF DevEx / Agentic Payments (x402)

Todo el código de este repositorio es trabajo original del desafío. Referencia relacionada: [Boleto Guardian](https://guardian-labs.xyz/boleto-guardian.html).

## ¿Qué es TOTVS?

**TOTVS** es la mayor empresa brasileña de software de gestión. Su ERP principal, **Protheus**, se usa ampliamente en Brasil para emitir y administrar boletos.

Según la encuesta **FGV-Eaesp** de Uso de TI:

- cerca del **34%** del mercado general de ERP en Brasil (empatada con SAP)
- cerca del **50%** en instalaciones más pequeñas (hasta ~180 usuarios)

Verificar un boleto en Protheus alcanza una gran parte del mercado corporativo brasileño.

## Por qué Guardian402

Las empresas y agentes de IA que necesitan confirmar datos de boleto hoy dependen de integraciones cerradas, contratos, API keys y facturación mensual — poco adecuado para agentes que quieren pagar por llamada.

Guardian402 expone un endpoint protegido por **x402**. La propia respuesta HTTP indica precio, red, activo y destinatario.

**Camino del producto**

1. Contexto: boleto en Protheus necesita comprobación independiente.
2. MVP (este repo): verificación por hash en Soroban, pagada con x402 USDC.
3. Roadmap: consumo nativo en Protheus del mismo endpoint.

## Cómo funciona

1. `POST /v1/verify` sin pago -> `HTTP 402`.
2. El cliente autoriza el pago x402 en USDC.
3. El facilitator liquida en Stellar Testnet.
4. La API consulta el contrato Soroban.
5. Resultado: `AUTHENTIC | MISMATCH | NOT_FOUND | REVOKED`.

## Despliegue actual (Testnet)

| Item | Valor |
| --- | --- |
| Sitio | [guardian402-summit.vercel.app](https://guardian402-summit.vercel.app) |
| Contract ID | `CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO` |
| Explorer | [lab.stellar.org](https://lab.stellar.org/r/testnet/contract/CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO) |
| Red | `stellar:testnet` |
| Precio | `$0.01` USDC |
| Facilitator | [www.x402.org/facilitator](https://www.x402.org/facilitator) |

## Primeros pasos

```bash
npm install
cp .env.example .env
npm run build
npm run start:api
```

## Documentación

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/DEMO.md`](docs/DEMO.md)
- [`docs/SECURITY.md`](docs/SECURITY.md)
- [Boleto Guardian](https://guardian-labs.xyz/boleto-guardian.html) (referencia relacionada)

## Aviso

Guardian402 verifica correspondencia con una prueba de integridad registrada. **No** confirma liquidación bancaria ni el pago del boleto.

## Licencia

[MIT](LICENSE)
