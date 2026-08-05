import Link from "next/link";
import { locales, type Locale } from "../lib/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <nav className="lang-bar" aria-label="Language">
      {locales.map((item) => (
        <Link key={item} href={`/${item}`} aria-current={item === locale ? "page" : undefined}>
          {labels[item]}
        </Link>
      ))}
    </nav>
  );
}
