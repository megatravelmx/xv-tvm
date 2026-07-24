import { Pricing } from "@/data/types";

export default function PricingTable({ pricing }: { pricing: Pricing }) {
  const rows = [
    { label: "Habitación doble", value: pricing.doble },
    { label: "Habitación triple", value: pricing.triple },
    { label: "Habitación sencilla", value: pricing.sencilla },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-rose-100">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} className={i % 2 === 0 ? "bg-white" : "bg-rose-100/40"}>
              <td className="px-4 py-3 font-medium text-navy-900">{r.label}</td>
              <td className="px-4 py-3 text-right font-bold text-navy-950">
                ${r.value.toLocaleString("en-US")} USD
              </td>
            </tr>
          ))}
          <tr className="bg-white">
            <td className="px-4 py-3 font-medium text-navy-900">Impuestos aéreos</td>
            <td className="px-4 py-3 text-right font-bold text-navy-950">
              ${pricing.impuestos.toLocaleString("en-US")} USD
            </td>
          </tr>
          {pricing.suplementos.map((s) => (
            <tr key={s.label} className="bg-rose-100/40">
              <td className="px-4 py-3 font-medium text-navy-900">Suplemento — {s.label}</td>
              <td className="px-4 py-3 text-right font-bold text-navy-950">
                ${s.amount.toLocaleString("en-US")} USD
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-rose-100 bg-rose-50 px-4 py-3 text-xs text-navy-900/60">
        Precios por persona en USD. Sujetos a cambio y disponibilidad — se confirman al validar la
        cotización con un ejecutivo.
      </p>
    </div>
  );
}
