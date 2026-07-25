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
import TripActions from "@/components/TripActions";
import RouteMap from "@/components/RouteMap";
import { countryWithFlag } from "@/lib/countryFlags";
import {
  MT_ID_BY_SLUG,
  fetchProgram,
  parseItineraryDays,
  parseListItems,
  mapHotels,
  mapPricing,
  mapCitiesGeo,
} from "@/lib/megaTravel";

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

export default async function TripDetailPage({ params }: { params: { slug: string } }) {
  const trip = getTripBySlug(params.slug);
  if (!trip) notFound();

  // Datos "siempre actualizados" desde la operación (con respaldo a los
  // datos estáticos de data/trips.ts si el feed falla o cambia de formato).
  const mtId = MT_ID_BY_SLUG[trip.slug];
  const live = mtId ? await fetchProgram(mtId) : null;

  const liveItinerary = live ? parseItineraryDays(live.itinerary) : [];
  const itinerary = liveItinerary.length > 0 ? liveItinerary : trip.itinerary;

  const liveIncludes = live ? parseListItems(live.include) : [];
  const includes = liveIncludes.length > 0 ? liveIncludes : trip.includes;

  const liveExcludes = live ? parseListItems(live.not_include) : [];
  const excludes = liveExcludes.length > 0 ? liveExcludes : trip.excludes;

  const liveHotels = live?.hotels_json?.length ? mapHotels(live.hotels_json) : [];
  const hotels = liveHotels.length > 0 ? liveHotels : trip.hotels;

  const livePricing = live ? mapPricing(live.price_json?.[0], live.taxes) : null;
  const pricing = livePricing ?? trip.pricing;

  const countries = live?.countries?.length ? live.countries : trip.countries;
  const countryIso: Record<string, string> = {};
  live?.array_countries?.forEach((c) => {
    countryIso[c.name_country] = c.code_iata;
  });

  const routeStops = live?.array_cities?.length ? mapCitiesGeo(live.array_cities) : [];
  const isLive = Boolean(live);
  const cities = live?.cities?.length ? live.cities : trip.cities;
  const airline = live?.airlines?.[0]?.name ?? "Vuelo redondo incluido";
  // Solo se usa si ya viene en formato ISO (YYYY-MM-DD) desde el feed en vivo
  // — el dato estático de respaldo ("18 de julio, 2027") no es una fecha ISO
  // válida para priceValidUntil, así que en ese caso simplemente se omite.
  const priceValidUntil = live?.departures?.[0]?.date;

  const otherTrips = trips.filter((t) => t.slug !== trip.slug);
  const tripUrl = `${siteConfig.siteUrl}/viajes/${trip.slug}`;
  const productImage = `${siteConfig.siteUrl}/images/brand/travelium-xv-europa-hero.png`;

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${tripUrl}#product`,
        name: trip.name,
        image: productImage,
        description: `Viaje a ${countries.join(", ")} — ${trip.duration.days} días / ${trip.duration.nights} noches desde México con Travelium.`,
        sku: trip.code,
        brand: { "@type": "Brand", name: siteConfig.brand },
        category: "Viajes de quinceañeras a Europa",
        additionalProperty: [
          { "@type": "PropertyValue", name: "Días", value: String(trip.duration.days) },
          { "@type": "PropertyValue", name: "Noches", value: String(trip.duration.nights) },
          { "@type": "PropertyValue", name: "Países", value: countries.join(", ") },
          { "@type": "PropertyValue", name: "Ciudades", value: cities.join(", ") },
          { "@type": "PropertyValue", name: "Aerolíneas", value: airline },
        ],
        offers: {
          "@type": "Offer",
          price: pricing.doble,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: tripUrl,
          ...(priceValidUntil ? { priceValidUntil } : {}),
        },
      },
      {
        "@type": "TouristTrip",
        "@id": `${tripUrl}#touristtrip`,
        name: trip.name,
        description: trip.tagline,
        url: tripUrl,
        touristType: "Quinceañera",
        provider: { "@type": "TravelAgency", name: siteConfig.brand, url: siteConfig.siteUrl },
        itinerary: {
          "@type": "ItemList",
          itemListElement: itinerary.map((day, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: day.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.siteUrl },
          { "@type": "ListItem", position: 2, name: "Viajes", item: `${siteConfig.siteUrl}/viajes` },
          { "@type": "ListItem", position: 3, name: trip.name, item: tripUrl },
        ],
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-gradient print:bg-white">
        <div className="container-page relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr,0.9fr] lg:items-center print:grid-cols-1 print:gap-4 print:py-4">
          <div className="text-white print:text-navy-950">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold print:border print:border-navy-900/20 print:bg-white print:text-navy-900">
                {trip.code}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold print:border print:border-navy-900/20 print:bg-white print:text-navy-900">
                {trip.audience}
              </span>
              <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950">
                {trip.duration.days} días / {trip.duration.nights} noches
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl print:text-navy-950">
              {trip.name}
            </h1>
            <p className="mt-4 max-w-xl text-rose-100/85 print:text-navy-900/75">{trip.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {countries.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/85 print:border-navy-900/20 print:text-navy-900"
                >
                  {countryWithFlag(c, countryIso[c])}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 print:hidden">
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
            className="shadow-2xl print:hidden"
          />
        </div>
      </section>

      {/* ACCIONES: descargar / imprimir / compartir */}
      <div className="container-page py-4 print:hidden">
        <TripActions title={`${trip.name} — Travelium XV`} />
      </div>

      {/* RESUMEN + HIGHLIGHTS */}
      <section className="section-y bg-blush">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr,0.9fr] print:grid-cols-1">
          <div>
            <SectionHeading eyebrow="El viaje" title="Resumen del itinerario" />
            <p className="mt-4 text-base leading-relaxed text-navy-900/75">{trip.summary}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 print:grid-cols-4">
              <div className="rounded-2xl border border-rose-100 bg-white p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-navy-950">{countries.length}</p>
                <p className="text-xs text-navy-900/60">Países</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-navy-950">{cities.length}</p>
                <p className="text-xs text-navy-900/60">Ciudades</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-navy-950">{trip.duration.days}</p>
                <p className="text-xs text-navy-900/60">Días</p>
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

      {/* MAPA DEL RECORRIDO */}
      {routeStops.length > 0 && (
        <section className="section-y bg-white print:hidden">
          <div className="container-page">
            <SectionHeading
              eyebrow="El recorrido"
              title="Así se ve el mapa de este viaje"
              description="Cada parada en orden, tal como se recorre en destino."
            />
            <div className="mt-8">
              <RouteMap stops={routeStops} />
            </div>
            <ol className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-navy-900/60">
              {routeStops.map((s, i) => {
                const variant = i === 0 ? "start" : i === routeStops.length - 1 ? "end" : "mid";
                const badgeBg =
                  variant === "start" ? "bg-emerald-500" : variant === "end" ? "bg-rose-500" : "bg-blue-500";
                return (
                  <li key={`${s.name}-${i}`} className="flex items-center gap-1.5">
                    <span
                      className={`flex h-4 w-4 flex-none items-center justify-center rounded-full ${badgeBg} text-[9px] font-bold text-white`}
                    >
                      {i + 1}
                    </span>
                    {countryWithFlag(s.name, s.iso2)}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* GALERÍA */}
      <section className="section-y bg-blush">
        <div className="container-page">
          <SectionHeading eyebrow="Galería" title="Así se ve este itinerario" />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 print:grid-cols-2 print:gap-2">
            {trip.galleryPlaceholders.map((g) => (
              <PlaceholderImage key={g.seed} seed={g.seed} label={g.label} aspect="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARIO */}
      <section id="itinerario" className="section-y scroll-mt-20 bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Día a día"
            title="Itinerario completo"
            description="Detalle de cada jornada del recorrido, tal como se opera en destino."
          />
          <div className="mt-10 max-w-3xl">
            <ItineraryTimeline days={itinerary} />
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="section-y bg-blush">
        <div className="container-page grid gap-10 lg:grid-cols-2 print:grid-cols-1">
          <div>
            <SectionHeading eyebrow="Inversión" title="Tarifas 2027" />
            <div className="mt-6">
              <PricingTable pricing={pricing} />
            </div>
            {isLive && (
              <p className="mt-2 text-[11px] text-navy-900/45">
                Tarifas actualizadas en vivo · {live!.generated_at}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3 print:hidden">
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
              <HotelsTable hotels={hotels} />
            </div>
          </div>
        </div>
      </section>

      {/* INCLUYE / NO INCLUYE */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Condiciones" title="¿Qué incluye este viaje?" />
          <div className="mt-8">
            <IncludesExcludes includes={includes} excludes={excludes} />
          </div>
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="section-y bg-blush print:hidden">
        <div className="container-page">
          <SectionHeading eyebrow="Acompañamiento" title="Viajan seguras, viajan acompañadas" align="center" />
          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* OTROS VIAJES */}
      <section className="section-y bg-rose-100/40 print:hidden">
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
