import Link from "next/link";
import { Trip } from "@/data/types";
import PlaceholderImage from "./PlaceholderImage";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/viajes/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative">
        <PlaceholderImage
          seed={trip.heroPlaceholder.seed}
          label={trip.heroPlaceholder.label}
          aspect="aspect-[4/3]"
          className="rounded-none"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-950 backdrop-blur">
          {trip.code}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white shadow">
          {trip.duration.days} días
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{trip.audience}</p>
        <h3 className="mt-1 font-display text-xl font-bold text-navy-950 group-hover:text-rose-500">
          {trip.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-navy-900/70">{trip.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {trip.countries.slice(0, 4).map((c) => (
            <span key={c} className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-navy-900">
              {c}
            </span>
          ))}
          {trip.countries.length > 4 && (
            <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-navy-900">
              +{trip.countries.length - 4}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-rose-100 pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-900/50">Desde</p>
            <p className="font-display text-2xl font-extrabold text-navy-950">
              ${trip.pricing.doble.toLocaleString("en-US")}
              <span className="text-sm font-semibold text-navy-900/60"> USD</span>
            </p>
            <p className="text-xs text-navy-900/50">+ ${trip.pricing.impuestos} USD de impuestos</p>
          </div>
          <span className="btn-secondary !px-4 !py-2 text-xs">Ver itinerario</span>
        </div>
      </div>
    </Link>
  );
}
