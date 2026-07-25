import { ItineraryDay } from "@/data/types";

export default function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="relative border-l-2 border-rose-200 pl-6 sm:pl-8">
      {days.map((d, i) => (
        <li key={d.day} className="relative pb-8 last:pb-0">
          <span className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-[10px] font-bold text-white sm:-left-[39px] sm:h-8 sm:w-8 sm:text-xs">
            {i + 1}
          </span>
          <p className="eyebrow">{d.day}</p>
          <h3 className="mt-1 font-display text-lg font-bold text-navy-950">{d.title}</h3>
          <p className="mt-1.5 text-justify text-sm leading-relaxed text-navy-900/70">{d.description}</p>
        </li>
      ))}
    </ol>
  );
}
