import { notFound } from "next/navigation";
import { InsightChart } from "@/components/charts/InsightChart";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { DISTRICT_LIST, getFoodDistrictData } from "@/lib/leilung-data";
import { foodShopPath } from "@/lib/leilung-paths";

export function generateStaticParams() {
  return DISTRICT_LIST.map((district) => ({ district: district.id }));
}

export default async function Page({ params }) {
  const { district: districtId } = await params;
  const data = getFoodDistrictData(districtId);

  if (!data) {
    notFound();
  }

  return (
    <LeilungShell
      activeDept="food"
      subtitle="District-level beneficiary integrity, shop performance, and operational issues."
      title={`${data.districtName} Food & PDS Detail`}
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { href: "/food", label: "Food & PDS" },
          { label: data.districtName },
        ]}
      />

      <div className="space-y-6">
        <SectionCard
          subtitle="Operational summary for the district."
          title="Header Stat Row"
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {data.headerStats.map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-[rgba(36,48,38,0.08)] bg-[var(--bg-elevated)] px-4 py-3 text-sm font-medium text-[var(--text-primary)]"
              >
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Ration Card Breakdown">
          <DataTable
            columns={[
              { key: "cardType", label: "Card Type" },
              { key: "count", label: "Count" },
              { key: "members", label: "Members" },
              { key: "riceEntitlement", label: "Rice Entitlement" },
              { key: "wheatEntitlement", label: "Wheat Entitlement" },
            ]}
            rows={data.breakdown}
          />
        </SectionCard>

        <SectionCard
          subtitle={`${data.totalShops} total rows in district records; representative sample shown here for drill-through.`}
          title="FPS Shop Performance"
        >
          <DataTable
            columns={[
              {
                key: "id",
                label: "FPS ID",
                href: (row) => foodShopPath(districtId, row.id),
              },
              { key: "shopName", label: "Shop Name" },
              { key: "village", label: "Village" },
              { key: "ePos", label: "e-PoS" },
              { key: "lastTransaction", label: "Last Transaction" },
              { key: "stockHeld", label: "Stock Held (qtl)" },
              { key: "distributionPercent", label: "Distribution %" },
              { key: "status", label: "Status" },
              {
                key: "action",
                label: "Action",
                render: (row) => (
                  <a href={foodShopPath(districtId, row.id)}>View</a>
                ),
              },
            ]}
            rows={data.shops}
          />
        </SectionCard>

        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <SectionCard title="Issues Panel">
            <div className="space-y-3">
              {data.issues.map((issue) => (
                <article
                  key={issue}
                  className="rounded-[1.25rem] border border-[rgba(36,48,38,0.08)] bg-[var(--bg-elevated)] px-4 py-3 text-sm leading-6 text-[var(--text-primary)]"
                >
                  {issue}
                </article>
              ))}
            </div>
          </SectionCard>

          <InsightChart
            data={data.monthlyTrend}
            keys={[{ key: "value", label: "Distribution %", color: "#f59e0b" }]}
            subtitle="Twelve-month pattern condensed into the current reporting window."
            title="Monthly Distribution Trend"
            type="line"
            xKey="month"
          />
        </div>
      </div>
    </LeilungShell>
  );
}
