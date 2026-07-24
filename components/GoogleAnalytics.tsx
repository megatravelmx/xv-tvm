import Script from "next/script";

// Google tag (gtag.js) — cuenta de Analytics de Luis. Vive una sola vez en el
// layout raíz para que se cargue en absolutamente todas las páginas del
// sitio sin duplicarse. Si algún día cambia la cuenta, basta con actualizar
// este ID.
const GA_MEASUREMENT_ID = "G-S4NE5K16TY";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
