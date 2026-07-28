import Image from "next/image";
import { testimonialsPlaceholder } from "@/data/site";
import { cdnImage } from "@/lib/cdn";

export default function Testimonials() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {testimonialsPlaceholder.map((t) => (
        <figure
          key={t.name + t.trip}
          className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="relative h-10 w-10 flex-none overflow-hidden rounded-full bg-rose-300">
              <Image
                src={cdnImage(t.avatarImage, { width: 100, height: 100 })}
                alt={t.name}
                fill
                sizes="40px"
                className="object-cover"
              />
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
