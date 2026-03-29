import Link from "next/link";
import { RotatingAlertFeed } from "@/components/alerts/RotatingAlertFeed";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { StatBadge } from "@/components/shared/StatBadge";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { getHomeData } from "@/lib/leilung-data";
import { districtPath } from "@/lib/leilung-paths";

export default function Page() {
  const home = getHomeData();

  return (
    <LeilungShell
      subtitle="Governance grounded in data · minister-wide operational view across Food, Land Revenue, Information & PR, and Printing."
      title="Leilung Resource & Land Governance Dashboard"
    >
      <div className="space-y-6">
        <SectionCard
          subtitle="The first ministerial view: critical cross-department pressure points and direct entry into every department workflow."
          title="State At A Glance"
        >
          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-3">
                {home.alerts.map((alert) => (
                  <article
                    key={alert.text}
                    className="rounded-[1.5rem] border border-[rgba(36,48,38,0.08)] bg-[var(--bg-elevated)] p-4"
                  >
                    <div className="mb-3">
                      <StatBadge
                        tone={alert.tone === "danger" ? "danger" : "warning"}
                      >
                        {alert.tone === "danger" ? "Critical" : "Watch"}
                      </StatBadge>
                    </div>
                    <p className="text-sm leading-6 text-[var(--text-primary)]">
                      {alert.text}
                    </p>
                  </article>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {home.departmentCards.map((dept) => (
                  <Link key={dept.key} href={dept.href}>
                    <article
                      className="h-full rounded-[1.5rem] border p-5 transition hover:border-[rgba(36,48,38,0.18)]"
                      style={{
                        borderColor: `${dept.accent}66`,
                        backgroundColor: `${dept.accent}22`,
                      }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-[0.24em]"
                        style={{ color: dept.accent }}
                      >
                        Department
                      </p>
                      <p className="mt-3 text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">
                        {dept.label}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[var(--text-primary)]">
                        {dept.summary}
                      </p>
                      <p
                        className="mt-5 text-sm font-semibold"
                        style={{ color: dept.accent }}
                      >
                        Open overview →
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            <RotatingAlertFeed alerts={home.ticker} title="Statewide Feed" />
          </div>
        </SectionCard>

        <SectionCard
          subtitle="Each department cell opens the district detail page directly."
          title="District Performance Heatmap"
        >
          <DataTable
            columns={[
              { key: "district", label: "District" },
              {
                key: "food",
                label: "Food & PDS",
                render: (row) => (
                  <Link
                    className="transition hover:text-[var(--accent-land)]"
                    href={districtPath("food", row.districtId)}
                  >
                    {row.food}
                  </Link>
                ),
              },
              {
                key: "land",
                label: "Land Revenue",
                render: (row) => (
                  <Link
                    className="transition hover:text-[var(--accent-land)]"
                    href={districtPath("land", row.districtId)}
                  >
                    {row.land}
                  </Link>
                ),
              },
              {
                key: "ipr",
                label: "Info & PR",
                render: (row) => (
                  <Link
                    className="transition hover:text-[var(--accent-land)]"
                    href={districtPath("ipr", row.districtId)}
                  >
                    {row.ipr}
                  </Link>
                ),
              },
              {
                key: "printing",
                label: "Printing",
                render: (row) => (
                  <Link
                    className="transition hover:text-[var(--accent-land)]"
                    href={districtPath("printing", row.districtId)}
                  >
                    {row.printing}
                  </Link>
                ),
              },
              { key: "overall", label: "Overall" },
            ]}
            rows={home.matrix}
          />
        </SectionCard>
      </div>
    </LeilungShell>
  );
}
