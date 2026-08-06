import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guardian402 API — Swagger UI",
};

export default function SwaggerDocsPage() {
  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
      <div
        style={{
          background: "#111",
          color: "#eee",
          padding: "0.75rem 1.5rem",
          fontFamily: "monospace",
          fontSize: "0.85rem",
        }}
      >
        Static preview for the Stellar Builder Summit presentation site. &quot;Try it out&quot;
        will not receive a real response here — clone the repository and run{" "}
        <code>npm run start:api</code> to call these endpoints against the live Testnet contract.
      </div>
      <div id="swagger-ui" />
      <Script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" strategy="afterInteractive" />
      <Script
        id="swagger-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener("load", function () {
              if (window.SwaggerUIBundle) {
                window.SwaggerUIBundle({
                  url: "/openapi.json",
                  dom_id: "#swagger-ui",
                  presets: [window.SwaggerUIBundle.presets.apis],
                });
              }
            });
          `,
        }}
      />
    </>
  );
}
