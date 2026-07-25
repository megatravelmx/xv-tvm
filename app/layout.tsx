import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SamNotice from "@/components/SamNotice";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteConfig } from "@/data/site";
import { fetchTipoCambio } from "@/lib/megaTravel";

// Fraunces: serif premium, muy en tendencia (editorial/lujo) y con trazos
// mucho más legibles que Playfair Display en negritas grandes — resuelve el
// problema de lectura que se veía con Playfair. Si prefieres Playfair
// Display literal, es un cambio de una línea aquí.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Travelium XV | Viajes de Quinceañeras a Europa",
    template: "%s | Travelium XV",
  },
  description:
    "Viajes de quinceañeras a Europa: 18 a 26 días, guía de habla hispana, chaperonas y gala en un palacio italiano. Planes de pago para tu familia.",
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    siteName: "Travelium XV",
    title: "Travelium XV | Viajes de Quinceañeras a Europa",
    description:
      "Vive tus XV años recorriendo Europa. Itinerarios diseñados para quinceañeras y sus familias.",
    images: ["/images/brand/travelium-xv-europa-hero.png"],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelium XV | Viajes de Quinceañeras a Europa",
    description:
      "Vive tus XV años recorriendo Europa. Itinerarios diseñados para quinceañeras y sus familias.",
    images: ["/images/brand/travelium-xv-europa-hero.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Travelium XV",
  url: siteConfig.siteUrl,
  logo: siteConfig.logoUrl,
  description:
    "Travelium diseña y organiza viajes de quinceañeras a Europa, con años de experiencia coordinando grupos internacionales y acompañando a las familias en cada destino.",
  areaServed: "MX",
  telephone: siteConfig.phone,
  email: siteConfig.contactEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.line,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: "MX",
  },
  sameAs: [siteConfig.instagram, siteConfig.tiktok, siteConfig.facebook].filter(Boolean),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const exchangeRate = await fetchTipoCambio();

  return (
    <html lang="es-MX" className={`${display.variable} ${body.variable}`}>
      <GoogleAnalytics />
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header exchangeRate={exchangeRate} />
        <main className="flex-1">{children}</main>
        <SamNotice />
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
