import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import QuoteCalculator from "@/components/QuoteCalculator";

const title = "Cotizador de viaje de XV años";
const description = "Arma tu cotización: elige viaje, tipo de habitación y número de pasajeros para conocer el precio estimado al instante.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cotizador" },
  openGraph: { title, description, url: "/cotizador" },
  twitter: { title, description },
};

export default function CotizadorPage({
  searchParams,
}: {
  searchParams: { viaje?: string };
}) {
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
          <QuoteCalculator initialSlug={searchParams.viaje} />
        </div>
      </div>
    </div>
  );
}
