"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";

const navLinks = [
  { href: "/viajes", label: "Viajes" },
  { href: "/comparador", label: "Comparador" },
  { href: "/planes-de-pago", label: "Planes de pago" },
  { href: "/seguridad", label: "Seguridad" },
  { href: "/para-padres", label: "Para padres" },
  { href: "/preguntas-frecuentes", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={siteConfig.logoUrl} alt="Travelium" className="h-9 w-auto sm:h-11" />
          <span className="rounded-full bg-brand-gradient px-2.5 py-1 font-display text-xs font-bold text-white sm:text-sm">
            XV
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition hover:text-rose-500 ${
                pathname === link.href ? "text-rose-500" : "text-navy-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contacto" className="text-sm font-semibold text-navy-900 hover:text-rose-500">
            Contacto
          </Link>
          <Link href="/cotizador" className="btn-primary animate-cta-pulse">
            Cotizar mi viaje
          </Link>
        </div>

        <button
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/20 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-navy-950" />
            <span className="block h-0.5 w-5 bg-navy-950" />
            <span className="block h-0.5 w-5 bg-navy-950" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-rose-100 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-900 hover:bg-rose-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-900 hover:bg-rose-100"
            >
              Contacto
            </Link>
            <Link href="/cotizador" onClick={() => setOpen(false)} className="btn-primary animate-cta-pulse mt-2 w-full">
              Cotizar mi viaje
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
