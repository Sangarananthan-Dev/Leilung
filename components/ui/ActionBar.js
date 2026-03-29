export function ActionBar({ actions }) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <button
          key={action}
          className="rounded-xl border border-[rgba(36,48,38,0.14)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[#e6dccb]"
          type="button"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
