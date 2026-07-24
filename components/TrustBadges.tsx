import { IconHeadset, IconUsers, IconShieldCheck, IconWifi } from "./icons";

const badges = [
  { title: "Guía de habla hispana", desc: "Durante todo el recorrido, en cada ciudad.", icon: IconHeadset },
  { title: "Chaperonas especializadas", desc: "Experiencia específica en grupos de menores.", icon: IconUsers },
  { title: "Seguro de asistencia", desc: "Incluido en todos los paquetes.", icon: IconShieldCheck },
  { title: "eSIM incluida", desc: "Comunicación constante con la familia.", icon: IconWifi },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map((b) => (
        <div key={b.title} className="rounded-2xl border border-rose-100 bg-white p-4 text-center sm:p-5">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <b.icon className="h-5 w-5" />
          </div>
          <p className="mt-3 font-display text-sm font-bold text-navy-950 sm:text-base">{b.title}</p>
          <p className="mt-1 text-xs text-navy-900/60">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}
