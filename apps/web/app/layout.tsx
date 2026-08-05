import type { CSSProperties, ReactNode } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk-loaded",
  weight: ["300", "400", "500", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  weight: ["400", "500"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = {
    ["--font-display"]: "var(--font-grotesk-loaded), sans-serif",
    ["--font-body"]: "var(--font-grotesk-loaded), sans-serif",
    ["--font-mono"]: "var(--font-mono-loaded), monospace",
  } as CSSProperties;

  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body style={fontVars}>{children}</body>
    </html>
  );
}
