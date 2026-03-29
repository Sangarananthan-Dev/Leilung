import Link from "next/link";

export function KpiStrip({ cards }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const content = (
          <div className="surface-card h-full rounded-[1.5rem] p-5 transition hover:border-white/16">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {card.label}
            </p>
            <p className="mono mt-3 text-2xl text-white">{card.value}</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {card.trend}
            </p>
            <p className="mt-4 text-sm text-[var(--text-primary)]">
              {card.actionLabel} →
            </p>
          </div>
        );

        if (!card.href) {
          return <div key={card.label}>{content}</div>;
        }

        return (
          <Link key={card.label} href={card.href}>
            {content}
          </Link>
        );
      })}
    </section>
  );
}
