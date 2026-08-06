import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guardian402 API — ReDoc",
};

export default function RedocPage() {
  return (
    <>
      {/* @ts-expect-error -- <redoc> is a web component registered by the CDN bundle below */}
      <redoc spec-url="/openapi.json"></redoc>
      <Script src="https://unpkg.com/redoc@2.1.3/bundles/redoc.standalone.js" strategy="afterInteractive" />
    </>
  );
}
