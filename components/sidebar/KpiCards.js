import {
  BadgeAlert,
  ChartColumn,
  ClipboardList,
  Files,
  Landmark,
  MapPinned,
  Package,
  Printer,
  Radio,
  ScanSearch,
  Users,
} from "lucide-react";
import { StatBadge } from "@/components/shared/StatBadge";

const ICONS = {
  alert: BadgeAlert,
  chart: ChartColumn,
  clipboard: ClipboardList,
  files: Files,
  landmark: Landmark,
  map: MapPinned,
  package: Package,
  printer: Printer,
  radio: Radio,
  scan: ScanSearch,
  users: Users,
};

export function KpiCards({ activeDept, cards }) {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {cards.map((card) => {
        const Icon = ICONS[card.iconKey];

        return (
          <article
            key={`${activeDept}-${card.label}`}
            className="surface-card rounded-[1.6rem] p-4"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <span className="rounded-2xl border border-white/8 bg-black/10 p-2.5">
                <Icon className="h-4 w-4" />
              </span>
              <StatBadge tone={card.tone}>{card.tone}</StatBadge>
            </div>
            <p className="mb-1 text-sm text-[var(--text-muted)]">
              {card.label}
            </p>
            <p className="mono text-2xl font-medium text-white">{card.value}</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              {card.hint}
            </p>
          </article>
        );
      })}
    </section>
  );
}
