const TONE_STYLES = {
  neutral: "border-white/10 bg-white/5 text-white",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  danger: "border-red-500/30 bg-red-500/10 text-red-200",
  info: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  violet: "border-violet-500/30 bg-violet-500/10 text-violet-200",
};

export function StatBadge({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.22em] ${TONE_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}
