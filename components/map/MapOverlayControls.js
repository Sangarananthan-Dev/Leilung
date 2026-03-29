import { LayerToggles } from "@/components/nav/LayerToggles";

export function MapOverlayControls({
  config,
  layers,
  onToggleLayer,
  selectedDistrict,
}) {
  return (
    <div className="surface-panel pointer-events-auto w-full max-w-sm rounded-2xl px-3 py-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">Map layers</p>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {config.label}
          </p>
        </div>
        <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {selectedDistrict ? selectedDistrict.name : "Overview"}
        </p>
      </div>

      <LayerToggles
        compact={true}
        options={config.layerOptions}
        layers={layers}
        onToggle={onToggleLayer}
      />
    </div>
  );
}
