import type { Locale } from "../lib/i18n";

export type Dictionary = {
  metaTitle: string;
  metaDescription: string;
  langName: string;
  brand: string;
  tagline: string;
  heroSupport: string;
  ctaGithub: string;
  ctaContract: string;
  ctaWhitepaper: string;
  summitNote: string;
  whyTitle: string;
  whySupport: string;
  whyPoints: [string, string, string];
  flowTitle: string;
  flowSupport: string;
  flowSteps: [string, string, string, string];
  proofTitle: string;
  proofSupport: string;
  priceLabel: string;
  networkLabel: string;
  contractLabel: string;
  statusesTitle: string;
  statuses: { code: string; label: string }[];
  disclaimer: string;
  footerBuilt: string;
  summitOfficial: string;
  ctaSummit: string;
  laneNote: string;
};

const en: Dictionary = {
  metaTitle: "Guardian402 - Pay-per-use boleto verification for ERP agents",
  metaDescription:
    "Guardian402 connects the Boleto Guardian vision to agentic payments: verify whether the boleto in TOTVS Protheus matches a Soroban integrity proof, paying per call with x402 USDC.",
  langName: "English",
  brand: "Guardian402",
  tagline: "Is the boleto in Protheus the real one?",
  heroSupport:
    "Guardian402 is the agentic payment layer of Boleto Guardian (Guardian Labs). An ERP, CLI, or AI agent pays 0.01 USDC via x402 and checks if the boleto positioned in TOTVS Protheus matches a Soroban integrity proof - no API key, no subscription.",
  ctaGithub: "Open repository",
  ctaContract: "View contract",
  ctaWhitepaper: "Boleto Guardian",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  whyTitle: "From ERP boleto to on-chain proof",
  whySupport:
    "Boleto Guardian started as public authenticity for Brazilian boletos. The whitepaper still describes Manage Data; Guardian402 moves the registry to Soroban and makes each verification a paid agent call.",
  whyPoints: [
    "Context: a boleto sitting in TOTVS Protheus (or another ERP) needs an independent integrity check before trust or payment.",
    "MVP: hash-based verification against a Soroban registry, protected by x402 exact payments in USDC on Stellar Testnet.",
    "Roadmap: native Protheus consumption of the same endpoint - agents and ERPs pay only for the checks they run.",
  ],
  flowTitle: "How payment meets proof",
  flowSupport: "One Protheus-aligned verification is one measurable USDC payment.",
  flowSteps: [
    "Call POST /v1/verify with boleto fields (as an ERP or agent would)",
    "Receive HTTP 402 with x402 payment instructions",
    "Authorize and settle 0.01 USDC on Stellar Testnet",
    "Read AUTHENTIC, MISMATCH, NOT_FOUND, or REVOKED from Soroban",
  ],
  proofTitle: "Live on Stellar Testnet",
  proofSupport: "Contract and demo records are already deployed for the Summit demo.",
  priceLabel: "Price per call",
  networkLabel: "Network",
  contractLabel: "Contract ID",
  statusesTitle: "Verification outcomes",
  statuses: [
    { code: "AUTHENTIC", label: "Data matches the active Protheus-side integrity proof" },
    { code: "MISMATCH", label: "Identifier exists, supplied boleto data diverges" },
    { code: "NOT_FOUND", label: "No proof registered for that boleto identifier" },
    { code: "REVOKED", label: "Proof existed and was revoked by the issuer admin" },
  ],
  disclaimer:
    "Guardian402 verifies whether supplied boleto data matches a previously registered integrity proof. It does not confirm bank settlement or payment status.",
  footerBuilt: "Guardian Labs / Boleto Guardian / Built on Stellar / x402 / Soroban",
  summitOfficial: "Official Summit site",
  ctaSummit: "Summit site",
  laneNote: "Lane: Payments and Agent Tooling / SDF DevEx / Agentic Payments (x402)",
};

const pt: Dictionary = {
  metaTitle: "Guardian402 - Verificacao de boleto paga por uso para agentes e ERP",
  metaDescription:
    "Guardian402 conecta a visao do Boleto Guardian a pagamentos agenticos: verifica se o boleto no TOTVS Protheus corresponde a uma prova Soroban, pagando por chamada com x402 USDC.",
  langName: "Portugues",
  brand: "Guardian402",
  tagline: "O boleto no Protheus e o boleto verdadeiro?",
  heroSupport:
    "Guardian402 e a camada de pagamento agentico do Boleto Guardian (Guardian Labs). Um ERP, CLI ou agente de IA paga 0,01 USDC via x402 e confere se o boleto posicionado no TOTVS Protheus corresponde a uma prova de integridade no Soroban - sem API key, sem assinatura.",
  ctaGithub: "Abrir repositorio",
  ctaContract: "Ver contrato",
  ctaWhitepaper: "Boleto Guardian",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  whyTitle: "Do boleto no ERP a prova on-chain",
  whySupport:
    "O Boleto Guardian nasceu como autenticidade publica para boletos brasileiros. O whitepaper ainda cita Manage Data; o Guardian402 move o registro para Soroban e transforma cada verificacao em uma chamada paga.",
  whyPoints: [
    "Contexto: o boleto posicionado no TOTVS Protheus (ou outro ERP) precisa de uma checagem independente de integridade antes de confiar ou pagar.",
    "MVP: verificacao por hash contra um registry Soroban, protegida por pagamentos x402 exact em USDC na Stellar Testnet.",
    "Roadmap: consumo nativo no Protheus do mesmo endpoint - agentes e ERPs pagam so pelas verificacoes que executam.",
  ],
  flowTitle: "Onde pagamento encontra prova",
  flowSupport: "Cada verificacao alinhada ao Protheus e um pagamento mensuravel em USDC.",
  flowSteps: [
    "Chame POST /v1/verify com os campos do boleto (como um ERP ou agente faria)",
    "Receba HTTP 402 com instrucoes de pagamento x402",
    "Autorize e liquide 0,01 USDC na Stellar Testnet",
    "Leia AUTHENTIC, MISMATCH, NOT_FOUND ou REVOKED no Soroban",
  ],
  proofTitle: "Ao vivo na Stellar Testnet",
  proofSupport: "Contrato e registros de demo ja estao implantados para a demo do Summit.",
  priceLabel: "Preco por chamada",
  networkLabel: "Rede",
  contractLabel: "Contract ID",
  statusesTitle: "Resultados da verificacao",
  statuses: [
    { code: "AUTHENTIC", label: "Dados batem com a prova de integridade ativa" },
    { code: "MISMATCH", label: "Identificador existe, dados do boleto divergem" },
    { code: "NOT_FOUND", label: "Nao ha prova registrada para esse boleto" },
    { code: "REVOKED", label: "Prova existia e foi revogada pelo admin emissor" },
  ],
  disclaimer:
    "O Guardian402 verifica se os dados fornecidos correspondem a uma prova de integridade registrada. Ele nao confirma liquidacao bancaria nem status de pagamento do boleto.",
  footerBuilt: "Guardian Labs / Boleto Guardian / Built on Stellar / x402 / Soroban",
  summitOfficial: "Site oficial do Summit",
  ctaSummit: "Site do Summit",
  laneNote: "Lane: Payments and Agent Tooling / SDF DevEx / Agentic Payments (x402)",
};

const es: Dictionary = {
  metaTitle: "Guardian402 - Verificacion de boleto de pago por uso para agentes y ERP",
  metaDescription:
    "Guardian402 conecta la vision de Boleto Guardian a pagos agenticos: verifica si el boleto en TOTVS Protheus coincide con una prueba Soroban, pagando por llamada con x402 USDC.",
  langName: "Espanol",
  brand: "Guardian402",
  tagline: "El boleto en Protheus es el verdadero?",
  heroSupport:
    "Guardian402 es la capa de pago agentico de Boleto Guardian (Guardian Labs). Un ERP, CLI o agente de IA paga 0,01 USDC via x402 y comprueba si el boleto posicionado en TOTVS Protheus coincide con una prueba de integridad en Soroban - sin API key, sin suscripcion.",
  ctaGithub: "Abrir repositorio",
  ctaContract: "Ver contrato",
  ctaWhitepaper: "Boleto Guardian",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  whyTitle: "Del boleto en el ERP a la prueba on-chain",
  whySupport:
    "Boleto Guardian nacio como autenticidad publica para boletos brasilenos. El whitepaper aun menciona Manage Data; Guardian402 mueve el registro a Soroban y convierte cada verificacion en una llamada de pago.",
  whyPoints: [
    "Contexto: el boleto posicionado en TOTVS Protheus (u otro ERP) necesita una comprobacion independiente de integridad antes de confiar o pagar.",
    "MVP: verificacion por hash contra un registry Soroban, protegida por pagos x402 exact en USDC en Stellar Testnet.",
    "Roadmap: consumo nativo en Protheus del mismo endpoint - agentes y ERPs pagan solo por las verificaciones que ejecutan.",
  ],
  flowTitle: "Donde el pago encuentra la prueba",
  flowSupport: "Cada verificacion alineada a Protheus es un pago medible en USDC.",
  flowSteps: [
    "Llama POST /v1/verify con los campos del boleto (como haria un ERP o agente)",
    "Recibe HTTP 402 con instrucciones de pago x402",
    "Autoriza y liquida 0,01 USDC en Stellar Testnet",
    "Lee AUTHENTIC, MISMATCH, NOT_FOUND o REVOKED en Soroban",
  ],
  proofTitle: "En vivo en Stellar Testnet",
  proofSupport: "El contrato y los registros de demo ya estan desplegados para la demo del Summit.",
  priceLabel: "Precio por llamada",
  networkLabel: "Red",
  contractLabel: "Contract ID",
  statusesTitle: "Resultados de la verificacion",
  statuses: [
    { code: "AUTHENTIC", label: "Los datos coinciden con la prueba de integridad activa" },
    { code: "MISMATCH", label: "El identificador existe, los datos del boleto divergen" },
    { code: "NOT_FOUND", label: "No hay prueba registrada para ese boleto" },
    { code: "REVOKED", label: "La prueba existia y fue revocada por el admin emisor" },
  ],
  disclaimer:
    "Guardian402 verifica si los datos suministrados coinciden con una prueba de integridad registrada. No confirma liquidacion bancaria ni el estado de pago del boleto.",
  footerBuilt: "Guardian Labs / Boleto Guardian / Built on Stellar / x402 / Soroban",
  summitOfficial: "Sitio oficial del Summit",
  ctaSummit: "Sitio del Summit",
  laneNote: "Lane: Payments and Agent Tooling / SDF DevEx / Agentic Payments (x402)",
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
