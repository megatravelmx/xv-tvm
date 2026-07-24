import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import TrustBadges from "@/components/TrustBadges";
import { IconCalendarCheck, IconPlaneCompass, IconLifeBuoy } from "@/components/icons";

const title = "Seguridad y acompañamiento en el viaje";
const description = "Cómo cuidamos a tu hija antes, durante y después del viaje: guía de habla hispana, chaperonas, seguro de asistencia y protocolos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/seguridad" },
  openGraph: { title, description, url: "/seguridad" },
  twitter: { title, description },
};

const pillars = [
  {
    title: "Antes del viaje",
    icon: IconCalendarCheck,
    items: [
      "Reunión informativa con requisitos, documentos y recomendaciones de equipaje",
      "Validación de requisitos migratorios según destino y nacionalidad",
      "Registro de contactos de emergencia de la familia",
    ],
  },
  {
    title: "Durante el viaje",
    icon: IconPlaneCompass,
    items: [
      "Guía acompañante profesional de habla hispana en todo el recorrido",
      "Chaperonas con experiencia en grupos de menores en los circuitos grupales",
      "eSIM incluida para mantener comunicación constante con la familia",
      "Seguro de asistencia en viaje incluido en todos los paquetes",
    ],
  },
  {
    title: "Ante una eventualidad",
    icon: IconLifeBuoy,
    items: [
      "Protocolo de atención ante contingencias con el tour leader en destino",
      "Comunicación directa con la familia en caso de emergencia",
      "Coordinación con el seguro de asistencia para atención médica",
    ],
  },
];

export default function SeguridadPage() {
  return (
    <div className="section-y">
      <div className="container-page">
        <SectionHeading
          level="h1"
          eyebrow="Tranquilidad para la familia"
          title="Viajan seguras, viajan acompañadas"
          description="Sabemos que la pregunta más importante para cualquier padre o madre es: ¿quién cuida a mi hija? Así está diseñado el acompañamiento en cada itinerario."
        />

        <div className="mt-10">
          <TrustBadges />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-3xl border border-rose-100 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <p.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-lg font-bold text-navy-950">{p.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-navy-900/75">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-0.5 text-rose-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-brand-gradient-soft p-8 text-center text-white sm:p-10">
          <h3 className="font-display text-2xl font-bold">¿Tienes dudas específicas de seguridad?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85">
            Escríbenos y con gusto te compartimos el protocolo completo de acompañamiento del
            itinerario que te interesa.
          </p>
          <Link href="/contacto" className="btn-light mt-6 inline-flex">
            Hablar con un ejecutivo
          </Link>
        </div>
      </div>
    </div>
  );
}
