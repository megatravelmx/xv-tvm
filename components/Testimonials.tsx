import { testimonialsPlaceholder } from "@/data/site";

export default function Testimonials() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {testimonialsPlaceholder.map((t) => (
        <figure
          key={t.name + t.trip}
          className="rounded-3xl border-2 border-dashed border-rose-300 bg-rose-100/40 p-6"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-300 text-sm font-bold text-white">
              ?
            </div>
            <div>
              <p className="text-sm font-bold text-navy-950">{t.name}</p>
              <p className="text-xs text-navy-900/60">{t.trip}</p>
            </div>
          </div>
          <blockquote className="text-sm italic leading-relaxed text-navy-900/70">
            “{t.quote}”
          </blockquote>
        </figure>
      ))}
    </div>
  );
}
