import { Siren } from "lucide-react";
import { StatBadge } from "@/components/shared/StatBadge";

function getTone(message) {
  return message.startsWith("ALERT") ? "danger" : "success";
}

export function AlertFeed({ activeDept, alerts }) {
  return (
    <section className="surface-card rounded-[1.75rem] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-2xl border border-white/8 bg-black/10 p-2.5">
            <Siren className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-white">Alert feed</p>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Rotates every 12 seconds
            </p>
          </div>
        </div>
        <StatBadge tone={activeDept === "printing" ? "violet" : "info"}>
          Live
        </StatBadge>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <article
            key={alert}
            className="alert-marquee flex items-start gap-3 rounded-2xl border border-white/8 bg-black/10 px-4 py-3"
          >
            <StatBadge tone={getTone(alert)}>
              {alert.startsWith("ALERT") ? "Alert" : "Clear"}
            </StatBadge>
            <p className="text-sm leading-6 text-[var(--text-primary)]">
              {alert}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
