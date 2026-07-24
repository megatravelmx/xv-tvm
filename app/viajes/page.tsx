import type { Metadata } from "next";
import Link from "next/link";
import { trips } from "@/data/trips";
import TripCard from "@/components/TripCard";
import ComingSoonCard from "@/components/ComingSoonCard";
import SectionHeading from "@/components/SectionHeading";

const title = "Viajes de quinceañeras a Europa: los 3 itinerarios 2027";
const description =
  "Explora los 3 itinerarios de Travelium XV para tu viaje de XV años: Descubre Europa con Mamá, Quinceañeras a Europa y Quinceañeras a Europa II.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/viajes" },
  openGraph: {
    title,
    description,
    url: "/viajes",
    images: ["/images/brand/travelium-xv-europa-hero.png"],
  },
  twitter: { title, description, images: ["/images/brand/travelium-xv-europa-hero.png"] },
};

export default function ViajesPage() {
  return (
    <div className="section-y">
      <div className="container-page">
        <SectionHeading
          level="h1"
          eyebrow="Catálogo 2027"
          title="Los 3 itinerarios de Travelium XV"
          description="Todos incluyen vuelo, guía de habla hispana y visitas confirmadas. Elige por duración, países o si prefieres viajar con mamá o en grupo con amigas."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
          <ComingSoonCard
            image="/images/brand/travelium-xv-corea-hero.png"
            title="Corea · K-pop para Quinceañeras"
            subtitle="Un nuevo itinerario para las fans del K-pop. Próximamente en el catálogo Travelium XV."
          />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-brand-gradient p-8 text-center text-white sm:p-10">
          <h3 className="font-display text-2xl font-bold">¿No sabes cuál elegir?</h3>
          <p className="max-w-xl text-sm text-white/85">
            Compara duración, países, precio y tipo de acompañamiento de los 3 itinerarios lado a
            lado.
          </p>
          <Link href="/comparador" className="btn-light">
            Ir al comparador
          </Link>
        </div>
      </div>
    </div>
  );
}
