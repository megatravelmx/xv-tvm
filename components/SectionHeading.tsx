export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Nivel semántico del encabezado. Usa "h1" solo en la página que no tenga
   * ya un <h1> propio en su hero (evita tener más de un h1 por página). */
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className="mt-2 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
        {title}
      </Heading>
      {description && <p className="mt-3 text-base text-navy-900/70">{description}</p>}
    </div>
  );
}
