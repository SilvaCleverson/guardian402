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
  summitNote: string;
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
};

const en: Dictionary = {
  metaTitle: "Guardian402 - Pay per verification. Trust every boleto.",
  metaDescription:
    "Pay-per-use boleto integrity verification via x402 USDC on Stellar and Soroban. Built at Stellar Builder Summit SP 2026.",
  langName: "English",
  brand: "Guardian402",
  tagline: "Pay per verification. Trust every boleto.",
  heroSupport:
    "An agent receives HTTP 402, pays automatically in USDC on Stellar, and gets a Soroban-backed integrity result - no account, no API key, no subscription.",
  ctaGithub: "Open repository",
  ctaContract: "View contract",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  flowTitle: "How payment meets proof",
  flowSupport: "One verification is one measurable payment.",
  flowSteps: [
    "Call POST /v1/verify without payment",
    "Receive HTTP 402 with x402 instructions",
    "Authorize and settle 0.01 USDC on Testnet",
    "Read AUTHENTIC, MISMATCH, NOT_FOUND, or REVOKED from Soroban",
  ],
  proofTitle: "Live on Stellar Testnet",
  proofSupport: "Contract and demo records are already deployed.",
  priceLabel: "Price per call",
  networkLabel: "Network",
  contractLabel: "Contract ID",
  statusesTitle: "Verification outcomes",
  statuses: [
    { code: "AUTHENTIC", label: "Hash matches an active registry proof" },
    { code: "MISMATCH", label: "Identifier exists, supplied data diverges" },
    { code: "NOT_FOUND", label: "No proof registered for that identifier" },
    { code: "REVOKED", label: "Proof existed and was revoked by admin" },
  ],
  disclaimer:
    "Guardian402 verifies whether supplied boleto data matches a previously registered integrity proof. It does not confirm bank settlement or payment status.",
  footerBuilt: "Built on Stellar / x402 exact / Soroban registry",
};

const pt: Dictionary = {
  metaTitle: "Guardian402 - Pague por verificacao. Confie em cada boleto.",
  metaDescription:
    "Verificacao de integridade de boletos paga por uso via x402 USDC na Stellar e Soroban. Feito no Stellar Builder Summit SP 2026.",
  langName: "Portugues",
  brand: "Guardian402",
  tagline: "Pague por verificacao. Confie em cada boleto.",
  heroSupport:
    "Um agente recebe HTTP 402, paga automaticamente em USDC na Stellar e obtem um resultado de integridade no Soroban - sem conta, sem API key, sem assinatura.",
  ctaGithub: "Abrir repositorio",
  ctaContract: "Ver contrato",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  flowTitle: "Onde pagamento encontra prova",
  flowSupport: "Cada verificacao e um pagamento mensuravel.",
  flowSteps: [
    "Chame POST /v1/verify sem pagamento",
    "Receba HTTP 402 com instrucoes x402",
    "Autorize e liquide 0,01 USDC na Testnet",
    "Leia AUTHENTIC, MISMATCH, NOT_FOUND ou REVOKED no Soroban",
  ],
  proofTitle: "Ao vivo na Stellar Testnet",
  proofSupport: "Contrato e registros de demo ja estao implantados.",
  priceLabel: "Preco por chamada",
  networkLabel: "Rede",
  contractLabel: "Contract ID",
  statusesTitle: "Resultados da verificacao",
  statuses: [
    { code: "AUTHENTIC", label: "Hash corresponde a uma prova ativa" },
    { code: "MISMATCH", label: "Identificador existe, dados divergem" },
    { code: "NOT_FOUND", label: "Nao ha prova para esse identificador" },
    { code: "REVOKED", label: "Prova existia e foi revogada pelo admin" },
  ],
  disclaimer:
    "O Guardian402 verifica se os dados fornecidos correspondem a uma prova de integridade registrada. Ele nao confirma liquidacao bancaria nem status de pagamento do boleto.",
  footerBuilt: "Built on Stellar / x402 exact / registro Soroban",
};

const es: Dictionary = {
  metaTitle: "Guardian402 - Paga por verificacion. Confia en cada boleto.",
  metaDescription:
    "Verificacion de integridad de boletos de pago por uso via x402 USDC en Stellar y Soroban. Creado en el Stellar Builder Summit SP 2026.",
  langName: "Espanol",
  brand: "Guardian402",
  tagline: "Paga por verificacion. Confia en cada boleto.",
  heroSupport:
    "Un agente recibe HTTP 402, paga automaticamente en USDC en Stellar y obtiene un resultado de integridad en Soroban - sin cuenta, sin API key, sin suscripcion.",
  ctaGithub: "Abrir repositorio",
  ctaContract: "Ver contrato",
  summitNote: "Stellar Builder Summit SP 2026 / Agentic Payments (x402)",
  flowTitle: "Donde el pago encuentra la prueba",
  flowSupport: "Cada verificacion es un pago medible.",
  flowSteps: [
    "Llama POST /v1/verify sin pago",
    "Recibe HTTP 402 con instrucciones x402",
    "Autoriza y liquida 0,01 USDC en Testnet",
    "Lee AUTHENTIC, MISMATCH, NOT_FOUND o REVOKED en Soroban",
  ],
  proofTitle: "En vivo en Stellar Testnet",
  proofSupport: "El contrato y los registros de demo ya estan desplegados.",
  priceLabel: "Precio por llamada",
  networkLabel: "Red",
  contractLabel: "Contract ID",
  statusesTitle: "Resultados de la verificacion",
  statuses: [
    { code: "AUTHENTIC", label: "El hash coincide con una prueba activa" },
    { code: "MISMATCH", label: "El identificador existe, los datos divergen" },
    { code: "NOT_FOUND", label: "No hay prueba para ese identificador" },
    { code: "REVOKED", label: "La prueba existia y fue revocada por el admin" },
  ],
  disclaimer:
    "Guardian402 verifica si los datos suministrados coinciden con una prueba de integridad registrada. No confirma liquidacion bancaria ni el estado de pago del boleto.",
  footerBuilt: "Built on Stellar / x402 exact / registro Soroban",
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
