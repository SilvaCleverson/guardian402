import type { CSSProperties, ReactNode } from "react";
import { Bricolage_Grotesque, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  weight: ["500", "700"],
});

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  weight: ["400", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  weight: ["400", "500"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = {
    ["--font-display"]: "var(--font-display-loaded), sans-serif",
    ["--font-body"]: "var(--font-body-loaded), sans-serif",
    ["--font-mono"]: "var(--font-mono-loaded), monospace",
  } as CSSProperties;

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body style={fontVars}>{children}</body>
    </html>
  );
}
