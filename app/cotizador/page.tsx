import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import QuoteCalculator from "@/components/QuoteCalculator";
import { trips } from "@/data/trips";
import { MT_ID_BY_SLUG, fetchProgram, fetchTipoCambio, mapPricing } from "@/lib/megaTravel";
import type { Pricing } from "@/data/types";

const title = "Cotizador de viaje de XV años";
const description = "Arma tu cotización: elige viaje, tipo de habitación y número de pasajeros para conocer el precio estimado al instante.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cotizador" },
  openGraph: { title, description, url: "/cotizador" },
  twitter: { title, description },
};

export default async function CotizadorPage({
  searchParams,
}: {
  searchParams: { viaje?: string };
}) {
  const tipoCambio = await fetchTipoCambio();

  const livePricingEntries = await Promise.all(
    trips.map(async (t) => {
      const mtId = MT_ID_BY_SLUG[t.slug];
      if (!mtId) return null;
      const live = await fetchProgram(mtId);
      if (!live) return null;
      const pricing = mapPricing(live.price_json?.[0], live.taxes);
      return pricing ? ([t.slug, pricing] as [string, Pricing]) : null;
    })
  );
  const livePricing = Object.fromEntries(livePricingEntries.filter(Boolean) as [string, Pricing][]);

  return (
    <div className="section-y">
      <div className="container-page">
        <SectionHeading
          level="h1"
          eyebrow="Cotizador"
          title="Arma tu cotización en un minuto"
          description="Elige el itinerario, tipo de habitación y número de pasajeros. Al final puedes enviar tu cotización directo a un ejecutivo por WhatsApp."
        />
        <div className="mt-10">
          <QuoteCalculator
            initialSlug={searchParams.viaje}
            livePricing={livePricing}
            tipoCambio={tipoCambio?.tc ?? null}
          />
        </div>
      </div>
    </div>
  );
}
