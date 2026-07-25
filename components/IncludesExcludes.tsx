export default function IncludesExcludes({
  includes,
  excludes,
}: {
  includes: string[];
  excludes: string[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-1">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="font-display text-base font-bold text-emerald-800">El viaje incluye</p>
        <ul className="mt-3 space-y-2 text-sm text-emerald-900/80">
          {includes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-0.5 text-emerald-600">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <p className="font-display text-base font-bold text-rose-800">El viaje no incluye</p>
        <ul className="mt-3 space-y-2 text-sm text-rose-900/80">
          {excludes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-0.5 text-rose-500">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
