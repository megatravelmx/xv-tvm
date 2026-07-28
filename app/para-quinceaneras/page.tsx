import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { trips } from "@/data/trips";
import SectionHeading from "@/components/SectionHeading";
import { cdnImage } from "@/lib/cdn";

const title = "Para la quinceañera: destinos y experiencias";
const description = "Destinos, experiencias y la noche de gala que vas a vivir en tu viaje de XV años por Europa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/para-quinceaneras" },
  openGraph: { title, description, url: "/para-quinceaneras" },
  twitter: { title, description },
};

const momentos = [
  { title: "Torre Eiffel al atardecer", file: "momento-01-eiffel.jpg" },
  { title: "Góndola en Venecia", file: "momento-02-venecia.jpg" },
  { title: "Día completo en Disneyland París", file: "momento-03-disney.jpg" },
  { title: "Nieve en el Monte Titlis", file: "momento-04-titlis.jpg" },
  { title: "Noche de gala en el Palazzo Borghese", file: "momento-05-palazzo.jpg" },
  { title: "Coliseo Romano", file: "momento-06-coliseo.jpg" },
];

export default function ParaQuinceanerasPage() {
  return (
    <div className="section-y">
      <div className="container-page">
        <SectionHeading
          level="h1"
          eyebrow="Para ti, quinceañera"
          title="Tu viaje, tus reglas, tus recuerdos"
          description="Destinos de ensueño, convivencia con otras quinceañeras y una fiesta de máscaras venecianas para celebrar tus XV como toda una princesa."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {momentos.map((m) => (
            <div key={m.file} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={cdnImage(m.file, { width: 700, height: 875 })}
                  alt={m.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-center text-sm font-semibold text-navy-950">{m.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-brand-gradient p-8 text-white sm:p-10">
          <h3 className="font-display text-2xl font-bold">La noche que vas a recordar toda tu vida</h3>
          <p className="mt-3 max-w-2xl text-sm text-rose-100/90">
            En Florencia te espera una cena temática en un exclusivo palacio italiano: barra libre
            de bebidas sin alcohol, música y una fiesta de máscaras venecianas para celebrar tus XV
            años como verdadera realeza. Código de vestimenta: casual party.
          </p>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Elige tu experiencia" title="Los 3 itinerarios" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {trips.map((t) => (
              <Link key={t.slug} href={`/viajes/${t.slug}`} className="rounded-2xl border border-rose-100 bg-white p-5 hover:shadow-glow">
                <p className="eyebrow">{t.duration.days} días</p>
                <p className="mt-1 font-display text-lg font-bold text-navy-950">{t.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
