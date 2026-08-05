import Link from "next/link";
import { locales, type Locale } from "../lib/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

const GITHUB_URL = "https://github.com/SilvaCleverson/guardian402";

export function LanguageSwitcher({
  locale,
  repoLabel,
}: {
  locale: Locale;
  repoLabel: string;
}) {
  return (
    <div className="top-bar">
      <a className="demo-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
        {repoLabel}
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
