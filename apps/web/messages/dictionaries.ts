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
  ctaGuardian: string;
  ctaReference: string;
  summitNote: string;
  whyTitle: string;
  whySupport: string;
  whyPoints: [string, string, string];
  totvsTitle: string;
  totvsSupport: string;
  totvsSource: string;
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
    "Guardian402 verifies boleto integrity against a Soroban proof, with pay-per-call x402 USDC on Stellar Testnet. Built for agents and ERP flows such as TOTVS Protheus.",
  langName: "English",
  brand: "Guardian402",
  tagline: "Is the boleto in Protheus the real one?",
  heroSupport:
    "Pay-per-use API that checks whether boleto data - the kind positioned in TOTVS Protheus or sent by an agent - matches a Soroban integrity proof. An ERP, CLI, or AI agent pays 0.01 USDC via x402 per call. No API key, no subscription.",
  ctaGithub: "Open repository",
  ctaContract: "View contract",
  ctaGuardian: "Guardian Labs",
  ctaReference: "Boleto Guardian",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  whyTitle: "From ERP boleto to on-chain proof",
  whySupport:
    "Companies and agents need an independent integrity check before trusting a boleto. Guardian402 turns that check into a measurable Stellar payment.",
  whyPoints: [
    "Context: a boleto sitting in TOTVS Protheus (or another ERP) needs an independent integrity check before trust or payment.",
    "MVP: hash-based verification against a Soroban registry, protected by x402 exact payments in USDC on Stellar Testnet.",
    "Roadmap: native Protheus consumption of the same endpoint - agents and ERPs pay only for the checks they run.",
  ],
  totvsTitle: "What is TOTVS?",
  totvsSupport:
    "TOTVS is Brazil's largest business-software company. Its flagship ERP, Protheus, is widely used by Brazilian firms to issue and manage boletos (bank payment slips). In the latest FGV-Eaesp IT survey, TOTVS holds about 34% of Brazil's overall ERP market (tied with SAP) and about 50% among smaller deployments (up to ~180 users) - so verifying a Protheus boleto reaches a large share of Brazilian companies.",
  totvsSource: "Source: FGV-Eaesp Annual IT Use Survey (Brazil ERP market share).",
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
  footerBuilt: "Guardian402 / Built on Stellar / x402 / Soroban",
  summitOfficial: "Official Summit site",
  ctaSummit: "Summit site",
  laneNote: "Lane: Payments and Agent Tooling / SDF DevEx / Agentic Payments (x402)",
};

const pt: Dictionary = {
  metaTitle: "Guardian402 - Verificacao de boleto paga por uso para agentes e ERP",
  metaDescription:
    "Guardian402 verifica a integridade de boletos contra uma prova Soroban, com pagamento por chamada em x402 USDC na Stellar Testnet. Feito para agentes e fluxos de ERP como o TOTVS Protheus.",
  langName: "Portugues",
  brand: "Guardian402",
  tagline: "O boleto no Protheus e o boleto verdadeiro?",
  heroSupport:
    "API paga por uso que confere se os dados de um boleto - como o posicionado no TOTVS Protheus ou enviado por um agente - correspondem a uma prova de integridade no Soroban. Um ERP, CLI ou agente de IA paga 0,01 USDC via x402 por chamada. Sem API key, sem assinatura.",
  ctaGithub: "Abrir repositorio",
  ctaContract: "Ver contrato",
  ctaGuardian: "Guardian Labs",
  ctaReference: "Boleto Guardian",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  whyTitle: "Do boleto no ERP a prova on-chain",
  whySupport:
    "Empresas e agentes precisam de uma checagem independente de integridade antes de confiar em um boleto. O Guardian402 transforma essa checagem em um pagamento mensuravel na Stellar.",
  whyPoints: [
    "Contexto: o boleto posicionado no TOTVS Protheus (ou outro ERP) precisa de uma checagem independente de integridade antes de confiar ou pagar.",
    "MVP: verificacao por hash contra um registry Soroban, protegida por pagamentos x402 exact em USDC na Stellar Testnet.",
    "Roadmap: consumo nativo no Protheus do mesmo endpoint - agentes e ERPs pagam so pelas verificacoes que executam.",
  ],
  totvsTitle: "O que e a TOTVS?",
  totvsSupport:
    "A TOTVS e a maior empresa brasileira de software de gestao. Seu ERP principal, o Protheus, e amplamente usado por empresas no Brasil para emitir e gerir boletos. Na pesquisa FGV-Eaesp mais recente, a TOTVS tem cerca de 34% do mercado geral de ERP no Brasil (empatada com a SAP) e cerca de 50% nas instalacoes menores (ate ~180 usuarios) - verificar um boleto no Protheus alcanca uma fatia grande do mercado corporativo brasileiro.",
  totvsSource: "Fonte: Pesquisa Anual de Uso de TI da FGV-Eaesp (market share de ERP no Brasil).",
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
  footerBuilt: "Guardian402 / Built on Stellar / x402 / Soroban",
  summitOfficial: "Site oficial do Summit",
  ctaSummit: "Site do Summit",
  laneNote: "Lane: Payments and Agent Tooling / SDF DevEx / Agentic Payments (x402)",
};

const es: Dictionary = {
  metaTitle: "Guardian402 - Verificacion de boleto de pago por uso para agentes y ERP",
  metaDescription:
    "Guardian402 verifica la integridad de boletos contra una prueba Soroban, con pago por llamada en x402 USDC en Stellar Testnet. Hecho para agentes y flujos de ERP como TOTVS Protheus.",
  langName: "Espanol",
  brand: "Guardian402",
  tagline: "El boleto en Protheus es el verdadero?",
  heroSupport:
    "API de pago por uso que comprueba si los datos de un boleto - como el posicionado en TOTVS Protheus o enviado por un agente - coinciden con una prueba de integridad en Soroban. Un ERP, CLI o agente de IA paga 0,01 USDC via x402 por llamada. Sin API key, sin suscripcion.",
  ctaGithub: "Abrir repositorio",
  ctaContract: "Ver contrato",
  ctaGuardian: "Guardian Labs",
  ctaReference: "Boleto Guardian",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  whyTitle: "Del boleto en el ERP a la prueba on-chain",
  whySupport:
    "Empresas y agentes necesitan una comprobacion independiente de integridad antes de confiar en un boleto. Guardian402 convierte esa comprobacion en un pago medible en Stellar.",
  whyPoints: [
    "Contexto: el boleto posicionado en TOTVS Protheus (u otro ERP) necesita una comprobacion independiente de integridad antes de confiar o pagar.",
    "MVP: verificacion por hash contra un registry Soroban, protegida por pagos x402 exact en USDC en Stellar Testnet.",
    "Roadmap: consumo nativo en Protheus del mismo endpoint - agentes y ERPs pagan solo por las verificaciones que ejecutan.",
  ],
  totvsTitle: "Que es TOTVS?",
  totvsSupport:
    "TOTVS es la mayor empresa brasilena de software de gestion. Su ERP principal, Protheus, se usa ampliamente en Brasil para emitir y administrar boletos. En la encuesta FGV-Eaesp mas reciente, TOTVS tiene cerca del 34% del mercado general de ERP en Brasil (empatada con SAP) y cerca del 50% en instalaciones mas pequenas (hasta ~180 usuarios) - verificar un boleto en Protheus alcanza una gran parte del mercado corporativo brasileno.",
  totvsSource: "Fuente: Encuesta Anual de Uso de TI de FGV-Eaesp (market share de ERP en Brasil).",
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
  footerBuilt: "Guardian402 / Built on Stellar / x402 / Soroban",
  summitOfficial: "Sitio oficial del Summit",
  ctaSummit: "Sitio del Summit",
  laneNote: "Lane: Payments and Agent Tooling / SDF DevEx / Agentic Payments (x402)",
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
