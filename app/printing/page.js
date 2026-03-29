import { RotatingAlertFeed } from "@/components/alerts/RotatingAlertFeed";
import { InsightChart } from "@/components/charts/InsightChart";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { DataTable } from "@/components/ui/DataTable";
import { KpiStrip } from "@/components/ui/KpiStrip";
import { SectionCard } from "@/components/ui/SectionCard";
import { getPrintingOverviewData } from "@/lib/leilung-data";
import { districtPath } from "@/lib/leilung-paths";

export default function Page() {
  const data = getPrintingOverviewData();

  return (
    <LeilungShell
      activeDept="printing"
      subtitle="Fulfillment, turnaround, print order backlog, and stationery supply without unnecessary map chrome."
      title="Printing & Stationery Overview"
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { label: "Printing & Stationery" },
        ]}
      />

      <div className="space-y-6">
        <KpiStrip cards={data.kpis} />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard id="district-fulfillment" title="Fulfillment Rate Table">
            <DataTable
              columns={[
                {
                  key: "district",
                  label: "District",
                  href: (row) => districtPath("printing", row.districtId),
                },
                { key: "demandUnits", label: "Demand" },
                { key: "suppliedUnits", label: "Supplied" },
                { key: "fulfillmentPercent", label: "Fulfillment %" },
                { key: "ordersPending", label: "Orders Pending" },
                { key: "avgTurnaroundDays", label: "Avg Turnaround" },
                { key: "budgetUsed", label: "Budget Used" },
                { key: "flag", label: "Flag" },
              ]}
              rows={data.districtFulfillment}
            />
          </SectionCard>

          <RotatingAlertFeed alerts={data.alerts} title="Printing Live Feed" />
        </div>

        <InsightChart
          data={data.orderTypeBreakdown}
          keys={[
            { key: "aizawl", label: "Aizawl", color: "#a78bfa" },
            { key: "lunglei", label: "Lunglei", color: "#c4b5fd" },
            { key: "lawngtlai", label: "Lawngtlai", color: "#8b5cf6" },
            { key: "others", label: "Others", color: "#ddd6fe" },
          ]}
          subtitle="Order mix by district grouping."
          title="Order Type Breakdown"
          type="bar"
          xKey="orderType"
        />
      </div>
    </LeilungShell>
  );
}
