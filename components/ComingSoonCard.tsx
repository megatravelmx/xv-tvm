import Image from "next/image";

export default function ComingSoonCard({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-950/35" />
        <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950 shadow">
          Próximamente
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">Nuevo destino</p>
        <h3 className="mt-1 font-display text-xl font-bold text-navy-950">{title}</h3>
        <p className="mt-2 text-sm text-navy-900/70">{subtitle}</p>
        <p className="mt-4 text-xs text-navy-900/50">
          Itinerario y tarifas en preparación. Déjanos tus datos para avisarte en cuanto abramos
          fechas.
        </p>
      </div>
    </div>
  );
}
