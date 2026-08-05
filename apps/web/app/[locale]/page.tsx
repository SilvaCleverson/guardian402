import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { getDictionary } from "../../messages/dictionaries";
import { isLocale, locales, type Locale } from "../../lib/i18n";

const CONTRACT_ID = "CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO";
const GITHUB_URL = "https://github.com/SilvaCleverson/guardian402";
const CONTRACT_URL = `https://lab.stellar.org/r/testnet/contract/${CONTRACT_ID}`;
const SUMMIT_URL = "https://stellar-summit-lp.vercel.app/";
const GUARDIAN_LABS = "https://guardian-labs.xyz/";
const REFERENCE_URL = "https://guardian-labs.xyz/boleto-guardian.html";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return {};
  }
  const dict = getDictionary(raw);
  return {
    title: dict.metaTitle,
    description: dict.metaDescription,
    openGraph: {
      title: dict.metaTitle,
      description: dict.metaDescription,
      type: "website",
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <div className="locale-shell">
      <main className="site">
        <LanguageSwitcher locale={locale} repoLabel={t.ctaGithub} />

        <section className="hero" aria-label={t.brand}>
          <div className="hero-visual" aria-hidden="true" />
          <p className="eyebrow">{t.summitNote}</p>
          <h1 className="brand">{t.brand}</h1>
          <p className="tagline">{t.tagline}</p>
          <p className="support">{t.heroSupport}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={GITHUB_URL} target="_blank" rel="noreferrer">
              {t.ctaGithub}
            </a>
            <a className="btn btn-ghost" href={CONTRACT_URL} target="_blank" rel="noreferrer">
              {t.ctaContract}
            </a>
            <a className="btn btn-ghost" href={GUARDIAN_LABS} target="_blank" rel="noreferrer">
              {t.ctaGuardian}
            </a>
          </div>
        </section>

        <section className="section" id="totvs">
          <h2>{t.totvsTitle}</h2>
          <p className="lead">{t.totvsSupport}</p>
          <p className="disclaimer">{t.totvsSource}</p>
        </section>

        <section className="section" id="why">
          <h2>{t.whyTitle}</h2>
          <p className="lead">{t.whySupport}</p>
          <ol className="flow-list">
            {t.whyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
          <p className="lead" style={{ marginTop: "1.5rem" }}>
            {t.laneNote}
          </p>
        </section>

        <section className="section" id="flow">
          <h2>{t.flowTitle}</h2>
          <p className="lead">{t.flowSupport}</p>
          <ol className="flow-list">
            {t.flowSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="section" id="proof">
          <h2>{t.proofTitle}</h2>
          <p className="lead">{t.proofSupport}</p>
          <div className="proof-grid">
            <div className="proof-item">
              <span>{t.priceLabel}</span>
              <strong>$0.01 USDC</strong>
            </div>
            <div className="proof-item">
              <span>{t.networkLabel}</span>
              <strong>Stellar Testnet</strong>
            </div>
            <div className="proof-item">
              <span>{t.contractLabel}</span>
              <code>
                <a href={CONTRACT_URL} target="_blank" rel="noreferrer">
                  {CONTRACT_ID}
                </a>
              </code>
            </div>
          </div>

          <h3 className="contracts-heading">{t.statusesTitle}</h3>
          <ul className="status-list">
            {t.statuses.map((status) => (
              <li key={status.code}>
                <code>{status.code}</code>
                <span>{status.label}</span>
              </li>
            ))}
          </ul>

          <p className="disclaimer">{t.disclaimer}</p>
        </section>

        <footer className="footer">
          <p>{t.footerBuilt}</p>
          <p>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              {t.ctaGithub}
            </a>
            {" | "}
            <a href={GUARDIAN_LABS} target="_blank" rel="noreferrer">
              {t.ctaGuardian}
            </a>
            {" | "}
            <a href={SUMMIT_URL} target="_blank" rel="noreferrer">
              {t.summitOfficial}
            </a>
            {" | "}
            <a href={REFERENCE_URL} target="_blank" rel="noreferrer">
              {t.ctaReference}
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
