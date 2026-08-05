import Link from "next/link";
import { locales, type Locale } from "../lib/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

const SUMMIT_URL = "https://stellar-summit-lp.vercel.app/";

export function LanguageSwitcher({
  locale,
  summitLabel,
}: {
  locale: Locale;
  summitLabel: string;
}) {
  return (
    <div className="top-bar">
      <a className="summit-link" href={SUMMIT_URL} target="_blank" rel="noreferrer">
        {summitLabel} ?
      </a>
      <nav className="lang-bar" aria-label="Language">
        {locales.map((item) => (
          <Link key={item} href={`/${item}`} aria-current={item === locale ? "page" : undefined}>
            {labels[item]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
