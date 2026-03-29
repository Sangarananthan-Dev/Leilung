import Link from "next/link";

export function Breadcrumbs({ items }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
      {items.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className="flex items-center gap-2"
        >
          {item.href
            ? <Link className="transition hover:text-white" href={item.href}>
                {item.label}
              </Link>
            : <span className="text-white">{item.label}</span>}
          {index < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  );
}
