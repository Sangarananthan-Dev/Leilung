import Image from "next/image";

export function LeilungLogo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        alt="Mizoram mark"
        className={compact ? "h-11 w-11 rounded-full" : "h-12 w-12 rounded-2xl"}
        height={compact ? 44 : 48}
        priority
        src="/mizoram-mark.svg"
        width={compact ? 44 : 48}
      />

      {compact
        ? null
        : <div>
            <p className="text-xl font-semibold tracking-[0.16em] text-white">
              LEILUNG
            </p>
            <p className="mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Mizoram resource dashboard
            </p>
          </div>}
    </div>
  );
}
