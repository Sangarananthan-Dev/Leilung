export function ActionBar({ actions }) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <button
          key={action}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--text-primary)] transition hover:bg-white/8"
          type="button"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
