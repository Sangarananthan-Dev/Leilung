export function LayerToggles({
  className = "",
  compact = false,
  options,
  layers,
  onToggle,
}) {
  return (
    <div
      className={`${compact ? "grid grid-cols-2 gap-2" : "surface-panel flex flex-wrap gap-2 rounded-2xl px-3 py-2"} ${className}`.trim()}
    >
      {options.map((option) => (
        <button
          key={option.key}
          className={`inline-flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-xs transition ${
            layers[option.key]
              ? "border-white/16 bg-white/10 text-white"
              : "border-white/8 bg-black/10 text-[var(--text-muted)] hover:border-white/12 hover:text-white"
          } ${compact ? "w-full" : "rounded-full"}`.trim()}
          onClick={() => onToggle(option.key)}
          type="button"
        >
          <span>{option.label}</span>
          <span
            className={`mono rounded-full px-1.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
              layers[option.key]
                ? "bg-emerald-500/16 text-emerald-200"
                : "bg-white/6 text-[var(--text-muted)]"
            }`}
          >
            {layers[option.key] ? "On" : "Off"}
          </span>
        </button>
      ))}
    </div>
  );
}
