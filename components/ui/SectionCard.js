export function SectionCard({ actions = null, children, id, subtitle, title }) {
  return (
    <section className="surface-card rounded-[1.75rem] p-5" id={id}>
      <div className="mb-5 flex flex-col gap-3 border-b border-white/8 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{title}</p>
          {subtitle
            ? <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                {subtitle}
              </p>
            : null}
        </div>
        {actions}
      </div>

      {children}
    </section>
  );
}
