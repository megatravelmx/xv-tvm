import { HotelRow } from "@/data/types";
import { flagFromCountryName } from "@/lib/countryFlags";

export default function HotelsTable({ hotels }: { hotels: HotelRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-rose-100">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="bg-blue-500 text-left text-xs uppercase tracking-wide text-white print:bg-white print:text-navy-900 print:border-b-2 print:border-navy-900">
            <th className="px-4 py-3">País</th>
            <th className="px-4 py-3">Ciudad</th>
            <th className="px-4 py-3">Hotel previsto</th>
            <th className="px-4 py-3">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((h, i) => (
            <tr key={h.city} className={i % 2 === 0 ? "bg-white" : "bg-rose-100/40"}>
              <td className="px-4 py-3 font-medium text-navy-900">
                {flagFromCountryName(h.country)} {h.country}
              </td>
              <td className="px-4 py-3 text-navy-900">{h.city}</td>
              <td className="px-4 py-3 text-navy-900/80">{h.hotel}</td>
              <td className="px-4 py-3 text-navy-900/80">{h.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-rose-100 bg-rose-50 px-4 py-3 text-xs text-navy-900/60">
        Hoteles utilizados con mayor frecuencia en este circuito, a efectos indicativos. El
        pasajero puede ser alojado en establecimientos similares o alternativos.
      </p>
    </div>
  );
}
