import { InsightChart } from "@/components/charts/InsightChart";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { OverviewMapPanel } from "@/components/map/OverviewMapPanel";
import { DataTable } from "@/components/ui/DataTable";
import { KpiStrip } from "@/components/ui/KpiStrip";
import { SectionCard } from "@/components/ui/SectionCard";
import landBase from "@/data/land.json";
import { getLandOverviewData } from "@/lib/leilung-data";
import { districtPath } from "@/lib/leilung-paths";

export default function Page() {
  const data = getLandOverviewData();

  return (
    <LeilungShell
      activeDept="land"
      subtitle="Encroachment severity, mutation backlog, digitisation progress, and enforcement under the 2026 Act."
      title="Land Revenue Overview"
    >
      <Breadcrumbs
        items={[{ href: "/", label: "Leilung" }, { label: "Land Revenue" }]}
      />

      <div className="space-y-6">
        <KpiStrip cards={data.kpis} />

        <OverviewMapPanel
          activeDept="land"
          districtsById={landBase.districts}
          subtitle="Click any district to open the district case map, mutation queue, and land bank detail."
          title="Encroachment Severity Map"
        />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard
            id="encroachment-cases"
            title="District Encroachment Table"
          >
            <DataTable
              columns={[
                {
                  key: "district",
                  label: "District",
                  href: (row) => districtPath("land", row.districtId),
                },
                { key: "encroachmentCases", label: "Cases" },
                { key: "encroachmentSeverity", label: "Severity" },
                { key: "digitisedPercent", label: "Digitised %" },
                { key: "onlineTaxAdoption", label: "Online Tax %" },
                { key: "mutationsPending", label: "Mutations Pending" },
              ]}
              rows={data.districtTable}
            />
          </SectionCard>

          <InsightChart
            data={data.encroachmentBreakdown}
            keys={[]}
            subtitle="Statewide case composition by land category."
            title="Encroachment Type Breakdown"
            type="pie"
            xKey="label"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <InsightChart
            data={data.digitisationProgress}
            id="digitisation-progress"
            keys={[
              {
                key: "digitisedPercent",
                label: "Digitised %",
                color: "#22c55e",
              },
            ]}
            subtitle="District-level progress against the land record digitisation target."
            title="Digitisation Progress"
            type="bar"
            xKey="district"
          />

          {/*
          <RotatingAlertFeed alerts={data.alerts} title="Land Live Feed" />
          */}
        </div>

        <SectionCard id="tax-adoption" title="e-Ram Rollout Status">
          <DataTable
            columns={[
              { key: "district", label: "District" },
              { key: "status", label: "e-Ram Status" },
              { key: "launchDate", label: "Launch Date" },
              { key: "services", label: "Services Live" },
              { key: "transactions", label: "Transactions (YTD)" },
            ]}
            rows={data.eramRollout}
          />
        </SectionCard>

        {/*
        <SectionCard
          subtitle="Implementation tracker for the minister's new enforcement act."
          title="Act 2026 Implementation Tracker"
        >
          <DataTable
            columns={[
              { key: "milestone", label: "Milestone" },
              { key: "status", label: "Status" },
              { key: "targetDate", label: "Target Date" },
            ]}
            rows={data.actMilestones}
          />
        </SectionCard>
        */}
      </div>
    </LeilungShell>
  );
}
