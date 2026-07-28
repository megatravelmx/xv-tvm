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
      "Junta virtual con los padres 20 días antes de la salida para resolver dudas de equipaje, organización y presupuesto",
      "Validación de requisitos migratorios según destino y nacionalidad (pasaporte, SAM, carta notarial, ETA)",
      "Registro de contacto de emergencia, tipo de sangre, alergias y tratamientos médicos de cada menor",
    ],
  },
  {
    title: "Durante el viaje",
    icon: IconPlaneCompass,
    items: [
      "Guía acompañante profesional de habla hispana en todo el recorrido",
      "3 chaperonas por grupo, cada una a cargo de aproximadamente 14 viajeras, en los circuitos grupales",
      "Las chaperonas resguardan pasaporte, carta notarial y, si la familia lo autoriza, dinero o tarjetas",
      "Backpack, playeras y sudadera de uso obligatorio: ayudan a identificar y ubicar al grupo en todo momento",
      "eSIM con 12 GB para comunicación constante por WhatsApp con la familia",
      "Seguro de asistencia médica incluido en todos los paquetes, con consultas virtuales y hospitales aliados en destino",
    ],
  },
  {
    title: "Ante una eventualidad",
    icon: IconLifeBuoy,
    items: [
      "Canal de asistencia 24/7 para que los padres reporten cualquier situación",
      "Reunión virtual con los padres ante cualquier falta al reglamento que ponga en riesgo la seguridad de la menor",
      "Coordinación con el seguro de asistencia para atención médica en destino",
    ],
  },
];

const comoTeCuidamos = [
  "Desde el inicio del viaje se forman 3 grupos, uno por chaperona, para tener mejor ubicada a cada menor durante traslados, visitas, hoteles y restaurantes.",
  "Las chaperonas verifican que las viajeras desayunen y cenen correctamente, y reportan si alguna no lo hace de forma repetida.",
  "Están atentas a cualquier menor que se muestre aislada, triste o cansada, y se acercan para brindar apoyo.",
  "No están autorizadas a reprender ni castigar: ante una falta grave, reportan de inmediato a la oficina para coordinar con los padres.",
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

        <div className="mt-14 rounded-3xl border border-rose-100 bg-white p-6 sm:p-8">
          <p className="font-display text-lg font-bold text-navy-950">Cómo cuidamos a las menores en destino</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-navy-900/75">
            {comoTeCuidamos.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-rose-100 text-xs text-rose-600">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
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
