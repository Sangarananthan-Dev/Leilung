const TONE_STYLES = {
  neutral: "border-slate-700 bg-slate-700 text-white",
  success: "border-emerald-600 bg-emerald-600 text-white",
  warning: "border-amber-400 bg-amber-400 text-slate-950",
  danger: "border-red-600 bg-red-600 text-white",
  info: "border-sky-600 bg-sky-600 text-white",
  violet: "border-violet-600 bg-violet-600 text-white",
};

export function StatBadge({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${TONE_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}
