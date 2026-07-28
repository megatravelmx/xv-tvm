import Link from "next/link";
import { buildWhatsAppLink, siteConfig } from "@/data/site";
import { trips } from "@/data/trips";
import { IconInstagram, IconTikTok, IconFacebook } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-white print:hidden">
      <div className="h-1.5 w-full bg-brand-gradient" />
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.logoUrl} alt="Travelium" className="h-9 w-auto" />
            <span className="rounded-full bg-brand-gradient px-2.5 py-1 font-display text-xs font-bold text-white">
              XV
            </span>
          </div>
          <p className="mt-4 text-sm text-navy-900/70">
            Viajes de quinceañeras a Europa diseñados para crear una experiencia memorable,
            con planes de pago pensados para las familias.
          </p>
          <p className="mt-4 text-xs text-navy-900/45">{siteConfig.legalDisclaimer}</p>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-navy-950">Viajes</p>
          <ul className="mt-4 space-y-2 text-sm">
            {trips.map((t) => (
              <li key={t.slug}>
                <Link href={`/viajes/${t.slug}`} className="text-navy-900/70 hover:text-rose-500">
                  {t.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/viajes" className="text-navy-900/70 hover:text-rose-500">
                Ver catálogo completo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-navy-950">Información</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/para-padres" className="text-navy-900/70 hover:text-rose-500">Para padres</Link></li>
            <li><Link href="/para-quinceaneras" className="text-navy-900/70 hover:text-rose-500">Para quinceañeras</Link></li>
            <li><Link href="/seguridad" className="text-navy-900/70 hover:text-rose-500">Seguridad y acompañamiento</Link></li>
            <li><Link href="/planes-de-pago" className="text-navy-900/70 hover:text-rose-500">Planes de pago</Link></li>
            <li><Link href="/preguntas-frecuentes" className="text-navy-900/70 hover:text-rose-500">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-navy-950">Contacto</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-900/70">
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:text-rose-500">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink("¡Hola! Quiero información sobre un viaje de quinceañeras Travelium.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-500"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-rose-500">
                {siteConfig.contactEmail}
              </a>
            </li>
            <li>{siteConfig.officeHours}</li>
            <li>
              {siteConfig.address.line}, {siteConfig.address.city}
            </li>
            <li className="flex gap-2 pt-1">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Travelium"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-500 hover:text-white"
              >
                <IconInstagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Travelium"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-500 hover:text-white"
              >
                <IconTikTok className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Travelium"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-500 hover:text-white"
              >
                <IconFacebook className="h-4 w-4" />
              </a>
            </li>
            <li className="pt-2">
              <Link href="/contacto" className="btn-primary">Escríbenos</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-rose-100">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-navy-900/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Travelium. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <Link href="/aviso-de-privacidad" className="hover:text-rose-500">Aviso de privacidad</Link>
            <Link href="/terminos-y-condiciones" className="hover:text-rose-500">Términos y condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
