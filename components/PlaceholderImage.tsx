import Image from "next/image";

/**
 * Imagen temporal de relleno (fotografía de stock genérica vía Lorem Picsum).
 * NO es material de marca ni fotografía real de los circuitos: es un
 * placeholder visual mientras se entrega el asset definitivo. Cada instancia
 * muestra una etiqueta con el nombre del archivo/foto que debe sustituirla.
 */
export default function PlaceholderImage({
  seed,
  label,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  seed: string;
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspect} ${className}`}>
      <Image
        src={`https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/900`}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-navy-950/80 px-3 py-2 backdrop-blur-sm print:hidden">
        <p className="text-[11px] font-medium leading-tight text-rose-100">
          📷 Imagen temporal — sustituir por: {label}
        </p>
      </div>
    </div>
  );
}
