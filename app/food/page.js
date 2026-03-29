import { RotatingAlertFeed } from "@/components/alerts/RotatingAlertFeed";
import { InsightChart } from "@/components/charts/InsightChart";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { OverviewMapPanel } from "@/components/map/OverviewMapPanel";
import { StatBadge } from "@/components/shared/StatBadge";
import { DataTable } from "@/components/ui/DataTable";
import { KpiStrip } from "@/components/ui/KpiStrip";
import { SectionCard } from "@/components/ui/SectionCard";
import { getFoodOverviewData } from "@/lib/leilung-data";
import { districtPath } from "@/lib/leilung-paths";

function smartPdsTone(status) {
  if (status === "active") return "success";
  if (status === "partial") return "warning";
  return "danger";
}

export default function Page() {
  const data = getFoodOverviewData();

  return (
    <LeilungShell
      activeDept="food"
      subtitle="NFSA coverage, distribution efficiency, e-PoS integrity, and FPS-level operational risk."
      title="Food & PDS Overview"
    >
      <Breadcrumbs
        items={[{ href: "/", label: "Leilung" }, { label: "Food & PDS" }]}
      />

      <div className="space-y-6">
        <KpiStrip cards={data.kpis} />

        <OverviewMapPanel
          activeDept="food"
          districtsById={data.mapDistricts}
          subtitle="District choropleth entry map. Click any district to open its full operational breakdown."
          title="Distribution Efficiency Map"
        />

        <SectionCard
          id="district-stock-table"
          subtitle="Sortable state view of beneficiary coverage, stock pressure, ghost flags, and SMART PDS status."
          title="District Comparison Table"
        >
          <DataTable
            columns={[
              {
                key: "district",
                label: "District",
                href: (row) => districtPath("food", row.districtId),
              },
              { key: "totalBeneficiaries", label: "Total Beneficiaries" },
              { key: "fpsShops", label: "FPS Shops" },
              { key: "ePosActive", label: "e-PoS Active" },
              { key: "distributionPercent", label: "Distribution %" },
              { key: "undistributedStockQtl", label: "Undist. Stock (qtl)" },
              { key: "ghostCount", label: "Ghost Count" },
              {
                key: "smartPdsStatus",
                label: "Smart PDS Status",
                render: (row) => (
                  <StatBadge tone={smartPdsTone(row.smartPdsStatus)}>
                    {row.smartPdsStatus}
                  </StatBadge>
                ),
              },
              { key: "lastAudit", label: "Last Audit" },
              {
                key: "action",
                label: "Action",
                render: (row) => (
                  <a href={districtPath("food", row.districtId)}>View</a>
                ),
              },
            ]}
            rows={data.districtTable}
          />
        </SectionCard>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <InsightChart
            data={data.commodityAllocation}
            keys={[
              {
                key: "riceAllocated",
                label: "Rice allocated",
                color: "#f59e0b",
              },
              {
                key: "riceDistributed",
                label: "Rice distributed",
                color: "#22c55e",
              },
              {
                key: "wheatAllocated",
                label: "Wheat allocated",
                color: "#fbbf24",
              },
              {
                key: "wheatDistributed",
                label: "Wheat distributed",
                color: "#86efac",
              },
            ]}
            subtitle="Statewide allocation versus actual distribution over the last six months."
            title="Commodity Allocation"
            type="bar"
            xKey="month"
          />

          <InsightChart
            data={data.ePosDonut}
            keys={[]}
            subtitle="Enrollment split across all FPS shops."
            title="e-PoS Adoption"
            type="pie"
            xKey="label"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <SectionCard
            id="ghost-report"
            subtitle="High transport cost per quintal remains concentrated in the southern districts."
            title="Transport Cost Heatmap Table"
          >
            <DataTable
              columns={[
                {
                  key: "district",
                  label: "District",
                  href: (row) => districtPath("food", row.districtId),
                },
                { key: "transportCost", label: "Cost/Qtl (Rs)" },
                { key: "versusStateAvg", label: "vs State Avg" },
                { key: "flag", label: "Flag" },
              ]}
              rows={data.transportCosts}
            />
          </SectionCard>

          <RotatingAlertFeed alerts={data.alerts} title="Food Live Feed" />
        </div>
      </div>
    </LeilungShell>
  );
}
