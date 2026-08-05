import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { getDictionary } from "../../messages/dictionaries";
import { isLocale, locales, type Locale } from "../../lib/i18n";

const CONTRACT_ID = "CARQCD7G3S7WNWA37NZS2DW4CCP2V3J4U4T4NG3FXVEW4XNALM65NHAO";
const GITHUB_URL = "https://github.com/SilvaCleverson/guardian402";
const CONTRACT_URL = `https://lab.stellar.org/r/testnet/contract/${CONTRACT_ID}`;

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
    <main className="site">
      <LanguageSwitcher locale={locale} />

      <section className="hero" aria-label={t.brand}>
        <div className="hero-visual" aria-hidden="true" />
        <p className="summit">{t.summitNote}</p>
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
        </div>
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
            <strong>stellar:testnet</strong>
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

        <h3
          style={{
            marginTop: "2.5rem",
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
          }}
        >
          {t.statusesTitle}
        </h3>
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
      </footer>
    </main>
  );
}
