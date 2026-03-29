import { Layers3, MapPinned } from "lucide-react";
import { StatBadge } from "@/components/shared/StatBadge";

export function DistrictPanel({
  canOpen3D = false,
  config,
  district,
  is3DOpen = false,
  onOpen3D,
}) {
  if (!district) {
    return (
      <section className="surface-card rounded-[1.75rem] p-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-2xl border border-white/8 bg-black/10 p-2.5">
            <MapPinned className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-white">
              District Detail Panel
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {config.label}
            </p>
          </div>
        </div>
        <div className="rounded-[1.4rem] border border-dashed border-white/10 bg-black/10 px-4 py-8 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Select a district on the map to inspect active departmental metrics.
          </p>
        </div>
      </section>
    );
  }

  const view = config.buildDistrictView(district);

  return (
    <section className="surface-card rounded-[1.75rem] p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{district.name}</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {view.summary}
          </p>
        </div>
        <StatBadge tone={view.status.tone}>{view.status.label}</StatBadge>
      </div>

      {canOpen3D
        ? <button
            className={`mb-4 inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm transition ${
              is3DOpen
                ? "border-emerald-400/30 bg-emerald-500/12 text-emerald-100"
                : "border-white/10 bg-black/10 text-white hover:border-white/16 hover:bg-white/6"
            }`}
            onClick={onOpen3D}
            type="button"
          >
            <Layers3 className="h-4 w-4" />
            {is3DOpen ? "3D Terrain Active" : "View 3D Terrain"}
          </button>
        : null}

      <div className="grid grid-cols-2 gap-3">
        {view.facts.map((fact) => (
          <div
            key={`${district.name}-${fact.label}`}
            className="rounded-2xl border border-white/8 bg-black/10 px-3 py-3"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {fact.label}
            </p>
            <p className="mono mt-2 text-base text-white">{fact.value}</p>
          </div>
        ))}
      </div>

      {view.notes.length > 0
        ? <div className="mt-4 space-y-2 rounded-2xl border border-white/8 bg-black/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
              Active notes
            </p>
            {view.notes.map((note) => (
              <p
                key={note}
                className="text-sm leading-6 text-[var(--text-primary)]"
              >
                {note}
              </p>
            ))}
          </div>
        : null}
    </section>
  );
}
