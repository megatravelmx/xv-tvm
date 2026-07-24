import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { trips, getTripBySlug } from "@/data/trips";
import { siteConfig } from "@/data/site";
import PlaceholderImage from "@/components/PlaceholderImage";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import PricingTable from "@/components/PricingTable";
import HotelsTable from "@/components/HotelsTable";
import IncludesExcludes from "@/components/IncludesExcludes";
import SectionHeading from "@/components/SectionHeading";
import TrustBadges from "@/components/TrustBadges";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const trip = getTripBySlug(params.slug);
  if (!trip) return {};
  const title = `${trip.name} (${trip.code})`;
  const description = `${trip.tagline} ${trip.duration.days} días, ${trip.countries.length} países, desde $${trip.pricing.doble.toLocaleString("en-US")} USD.`;
  const url = `/viajes/${trip.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export default function TripDetailPage({ params }: { params: { slug: string } }) {
  const trip = getTripBySlug(params.slug);
  if (!trip) notFound();

  const otherTrips = trips.filter((t) => t.slug !== trip.slug);
  const tripUrl = `${siteConfig.siteUrl}/viajes/${trip.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "Viajes", item: `${siteConfig.siteUrl}/viajes` },
      { "@type": "ListItem", position: 3, name: trip.name, item: tripUrl },
    ],
  };

  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.tagline,
    url: tripUrl,
    touristType: "Quinceañera",
    provider: {
      "@type": "TravelAgency",
      name: "Travelium XV",
      url: siteConfig.siteUrl,
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: trip.itinerary.map((day, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: day.title,
      })),
    },
    offers: {
      "@type": "Offer",
      price: trip.pricing.doble,
      priceCurrency: "USD",
      url: tripUrl,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-gradient">
        <div className="container-page relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="text-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{trip.code}</span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{trip.audience}</span>
              <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950">
                {trip.duration.days} días / {trip.duration.nights} noches
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {trip.name}
            </h1>
            <p className="mt-4 max-w-xl text-rose-100/85">{trip.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {trip.countries.map((c) => (
                <span key={c} className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/85">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/cotizador?viaje=${trip.slug}`} className="btn-light animate-cta-pulse">
                Cotizar este viaje
              </Link>
              <a href="#itinerario" className="rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-navy-950">
                Ver itinerario día a día
              </a>
            </div>
          </div>

          <PlaceholderImage
            seed={trip.heroPlaceholder.seed}
            label={trip.heroPlaceholder.label}
            aspect="aspect-[4/3]"
            className="shadow-2xl"
          />
        </div>
      </section>

      {/* RESUMEN + HIGHLIGHTS */}
      <section className="section-y bg-blush">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <SectionHeading eyebrow="El viaje" title="Resumen del itinerario" />
            <p className="mt-4 text-base leading-relaxed text-navy-900/75">{trip.summary}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-rose-100 bg-white p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-navy-950">{trip.duration.days}</p>
                <p className="text-xs text-navy-900/60">Días</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-navy-950">{trip.countries.length}</p>
                <p className="text-xs text-navy-900/60">Países</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-navy-950">{trip.cities.length}</p>
                <p className="text-xs text-navy-900/60">Ciudades</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-navy-950">{trip.duration.nights}</p>
                <p className="text-xs text-navy-900/60">Noches</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white p-6 sm:p-8">
            <p className="font-display text-lg font-bold text-navy-950">Lo más destacado</p>
            <ul className="mt-4 space-y-3">
              {trip.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-navy-900/75">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-rose-100 text-xs text-rose-600">
                    ★
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Galería" title="Así se ve este itinerario" />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {trip.galleryPlaceholders.map((g) => (
              <PlaceholderImage key={g.seed} seed={g.seed} label={g.label} aspect="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARIO */}
      <section id="itinerario" className="section-y scroll-mt-20 bg-blush">
        <div className="container-page">
          <SectionHeading
            eyebrow="Día a día"
            title="Itinerario completo"
            description="Detalle de cada jornada del recorrido, tal como se opera en destino."
          />
          <div className="mt-10 max-w-3xl">
            <ItineraryTimeline days={trip.itinerary} />
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="section-y bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Inversión" title="Tarifas 2027" />
            <div className="mt-6">
              <PricingTable pricing={trip.pricing} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/cotizador?viaje=${trip.slug}`} className="btn-primary animate-cta-pulse">
                Cotizar este viaje
              </Link>
              <Link href="/planes-de-pago" className="btn-secondary">
                Ver planes de pago
              </Link>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Hospedaje" title="Hoteles previstos" />
            <div className="mt-6">
              <HotelsTable hotels={trip.hotels} />
            </div>
          </div>
        </div>
      </section>

      {/* INCLUYE / NO INCLUYE */}
      <section className="section-y bg-blush">
        <div className="container-page">
          <SectionHeading eyebrow="Condiciones" title="¿Qué incluye este viaje?" />
          <div className="mt-8">
            <IncludesExcludes includes={trip.includes} excludes={trip.excludes} />
          </div>
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Acompañamiento" title="Viajan seguras, viajan acompañadas" align="center" />
          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* OTROS VIAJES */}
      <section className="section-y bg-rose-100/40">
        <div className="container-page">
          <SectionHeading eyebrow="Otras opciones" title="También te puede interesar" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {otherTrips.map((t) => (
              <Link
                key={t.slug}
                href={`/viajes/${t.slug}`}
                className="rounded-2xl border border-rose-200 bg-white p-5 transition hover:shadow-glow"
              >
                <p className="eyebrow">{t.code} · {t.duration.days} días</p>
                <p className="mt-1 font-display text-lg font-bold text-navy-950">{t.name}</p>
                <p className="mt-1 text-sm text-navy-900/70">{t.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
