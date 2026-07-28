import Image from "next/image";
import Link from "next/link";
import { trips } from "@/data/trips";
import TripCard from "@/components/TripCard";
import SectionHeading from "@/components/SectionHeading";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import ComingSoonCard from "@/components/ComingSoonCard";
import FAQAccordion from "@/components/FAQAccordion";
import PreventaBanner from "@/components/PreventaBanner";
import InstagramStories from "@/components/InstagramStories";
import { parentFaqs, siteConfig } from "@/data/site";
import { IconSparkle, IconTag, IconHeadset, IconShieldCheck } from "@/components/icons";

const pillars = [
  {
    title: "Experiencia",
    desc: "Operación internacional de grupos, coordinadores en destino y respaldo antes, durante y después del viaje.",
    icon: IconSparkle,
  },
  {
    title: "Costo claro",
    desc: "Precio competitivo, impuestos y suplementos siempre visibles, con planes de abonos para las familias.",
    icon: IconTag,
  },
  {
    title: "Acompañamiento",
    desc: "Guía de habla hispana, chaperonas especializadas y comunicación constante con los padres.",
    icon: IconHeadset,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-gradient">
        {/* Outline de París a todo lo ancho del fondo. object-top recorta
            hacia arriba (cielo/torre) y evita que se vea el agua justo
            debajo de donde para la quinceañera. La imagen viene en negro
            sobre blanco: invert() la vuelve blanca y mix-blend-screen hace
            que el blanco original (ahora negro) se vuelva transparente y
            deje ver el degradado. Si la entregan ya en blanco/transparente,
            basta con quitar "invert". */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={siteConfig.heroParisOutlineUrl}
            alt=""
            fill
            priority
            className="object-cover object-top opacity-90 mix-blend-screen invert"
          />
        </div>

        {/* Velo oscuro solo del lado del texto, para que siempre se lea sin
            importar qué haya detrás (líneas del outline o el degradado). */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-navy-950/60 via-navy-950/25 to-transparent" />

        <div className="container-page relative grid items-end gap-6 pb-0 pt-12 sm:gap-8 sm:pt-16 lg:grid-cols-[1.15fr,0.85fr] lg:gap-10 lg:pt-24">
          <div className="relative z-10 max-w-xl pb-6 sm:pb-8 lg:pb-16">
            <p className="eyebrow text-rose-300">Travelium XV · Europa para quinceañeras</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white [text-shadow:0_2px_20px_rgba(6,11,36,0.35)] sm:text-5xl lg:text-6xl">
              Sus XV años,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-rose-400 to-gold-400 bg-clip-text text-transparent">
                el viaje de su vida
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base text-white/90 [text-shadow:0_1px_12px_rgba(6,11,36,0.4)] sm:text-lg">
              Itinerarios diseñados para crear una experiencia memorable en Europa: 8 a 12 países,
              guía de habla hispana, celebración de gala en un palacio italiano y planes de pago
              pensados para tu familia.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/viajes" className="btn-primary">
                Ver los 3 itinerarios
              </Link>
              <Link href="/cotizador" className="btn-light animate-cta-pulse">
                Cotizar mi viaje
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/85">
              <p><span className="font-bold text-white">3</span> itinerarios en Europa</p>
              <p><span className="font-bold text-white">18–26</span> días de experiencia</p>
              <p><span className="font-bold text-white">8–12</span> países por recorrido</p>
            </div>
          </div>

          {/* Quinceañera recortada, sin marco ni fondo, protagonista.
              Ancho y alto topeados para que NUNCA invada la columna de texto,
              sin importar qué tan ancha venga la foto (falda/vestido abierto). */}
          <div className="relative z-10 mx-auto h-[300px] w-full max-w-[240px] sm:h-[440px] sm:max-w-xs lg:h-[560px] lg:max-w-sm">
            <Image
              src={siteConfig.heroQuinceaneraUrl}
              alt="Quinceañera Travelium en su viaje de XV años"
              fill
              priority
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <PreventaBanner />

      {/* STORIES: reels en formato historia de Instagram */}
      <section className="section-y bg-white !pb-10 !pt-10">
        <div className="container-page">
          <SectionHeading
            eyebrow="Míralo con tus propios ojos"
            title="Historias del viaje"
            description="Toca un círculo para ver el video, tal como en tus stories de Instagram."
          />
          <div className="mt-6">
            <InstagramStories />
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="section-y bg-blush">
        <div className="container-page">
          <SectionHeading
            eyebrow="Por qué Travelium"
            title="Una experiencia memorable, respaldada de principio a fin"
            description="Tres pilares que guían cada itinerario: experiencia operativa, costo transparente y acompañamiento real para las familias."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-3xl border border-rose-100 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-950">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* VIAJES DESTACADOS */}
      <section className="section-y bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Catálogo 2027"
              title="Elige el itinerario perfecto para su viaje de XV años"
              description="Tres experiencias por Europa, cada una con su propio ritmo, compañía y duración."
            />
            <Link href="/comparador" className="btn-secondary self-start sm:self-auto">
              Comparar los 3 viajes
            </Link>
          </div>
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
        </div>
      </section>

      {/* PARA PADRES / QUINCEAÑERAS */}
      <section className="section-y bg-blush">
        <div className="container-page grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border-2 border-rose-100 bg-white p-8 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <IconShieldCheck />
            </div>
            <p className="eyebrow mt-5">Para papás y mamás</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-navy-950">
              Seguridad, organización y respaldo en cada paso
            </h3>
            <p className="mt-3 text-sm text-navy-900/70">
              Resolvemos las dudas que más importan: quién acompaña a tu hija, qué incluye el
              precio, cómo funcionan los pagos y qué pasa ante una emergencia.
            </p>
            <Link href="/para-padres" className="btn-secondary mt-6 inline-flex">
              Información para padres
            </Link>
          </div>
          <div className="rounded-3xl bg-brand-gradient-soft p-8 text-white sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white">
              <IconSparkle />
            </div>
            <p className="eyebrow mt-5 text-white/85">Para la quinceañera</p>
            <h3 className="mt-2 font-display text-2xl font-bold">
              Destinos, experiencias y una noche de gala inolvidable
            </h3>
            <p className="mt-3 text-sm text-white/85">
              Torre Eiffel, Disneyland París, góndolas en Venecia y una fiesta de máscaras
              venecianas en un palacio italiano para celebrar tus XV como toda una princesa.
            </p>
            <Link href="/para-quinceaneras" className="btn-light mt-6 inline-flex">
              Descubre la experiencia
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="section-y bg-blush">
        <div className="container-page">
          <SectionHeading
            eyebrow="Experiencias"
            title="Lo que viven las familias Travelium"
            align="center"
          />
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="section-y bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr,1.2fr]">
          <SectionHeading
            eyebrow="Resolvemos tus dudas"
            title="Preguntas frecuentes de los padres"
            description="Las preguntas que más nos hacen las familias antes de reservar."
          />
          <div>
            <FAQAccordion items={parentFaqs.slice(0, 4)} />
            <Link href="/preguntas-frecuentes" className="btn-secondary mt-6 inline-flex">
              Ver todas las preguntas
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-brand-gradient">
        <div className="container-page flex flex-col items-center gap-6 py-16 text-center text-white sm:py-20">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
            Empieza a planear el viaje de XV años que va a recordar toda la vida
          </h2>
          <p className="max-w-xl text-rose-100/85">
            Cotiza en minutos, elige el plan de pago que más te acomode y aparta su lugar antes de
            que se agoten las fechas 2027.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/cotizador" className="btn-light animate-cta-pulse">
              Cotizar mi viaje
            </Link>
            <Link href="/contacto" className="rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-navy-950">
              Hablar con un ejecutivo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
