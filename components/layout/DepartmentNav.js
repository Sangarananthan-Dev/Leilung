import Link from "next/link";
import { DEPARTMENTS } from "@/lib/leilung-data";

export function DepartmentNav({ activeDept }) {
  return (
    <nav className="border-t border-white/8 bg-[rgba(10,18,12,0.72)]">
      <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-2 px-4 py-3 lg:px-6">
        <Link
          className={`rounded-xl px-4 py-2 text-sm transition ${
            !activeDept
              ? "bg-white/8 text-white"
              : "text-[var(--text-muted)] hover:bg-white/5 hover:text-white"
          }`}
          href="/"
        >
          State At A Glance
        </Link>

        {Object.values(DEPARTMENTS).map((dept) => {
          const isActive = dept.key === activeDept;

          return (
            <Link
              key={dept.key}
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                isActive
                  ? "text-white"
                  : "border-transparent text-[var(--text-muted)] hover:bg-white/5 hover:text-white"
              }`}
              href={dept.href}
              style={
                isActive
                  ? {
                      borderColor: `${dept.accent}55`,
                      backgroundColor: `${dept.accent}18`,
                    }
                  : undefined
              }
            >
              {dept.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
