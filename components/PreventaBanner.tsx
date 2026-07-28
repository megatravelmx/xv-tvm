import Link from "next/link";
import { preventa } from "@/data/site";
import { IconCheck, IconClock } from "./icons";

const beneficios = [
  "Garantizas la tarifa más baja del año",
  "Más tiempo para cubrir el costo total del viaje",
  "Apartas con un depósito inicial de $600 USD por pasajera(o)",
  "Aseguras tu lugar con mayor anticipación",
];

export default function PreventaBanner() {
  if (!preventa.vigente) return null;

  return (
    <section className="bg-navy-950">
      <div className="container-page flex flex-col items-center gap-5 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="eyebrow text-gold-400">Preventa oficial 2027</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
            {beneficios.map((b) => (
              <p key={b} className="flex items-center gap-1.5 text-xs text-white/85 sm:text-sm">
                <IconCheck className="h-4 w-4 flex-none text-gold-400" />
                {b}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-none flex-col items-center gap-3 sm:items-end">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-white/70">
            <IconClock className="h-4 w-4" />
            Vigente hasta el {preventa.fechaLimite}
          </p>
          <Link href="/cotizador" className="btn-light animate-cta-pulse !px-5 !py-2.5 text-sm">
            Apartar en preventa
          </Link>
        </div>
      </div>
    </section>
  );
}
