import { InsightChart } from "@/components/charts/InsightChart";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { OverviewMapPanel } from "@/components/map/OverviewMapPanel";
import { DataTable } from "@/components/ui/DataTable";
import { KpiStrip } from "@/components/ui/KpiStrip";
import { SectionCard } from "@/components/ui/SectionCard";
import iprBase from "@/data/ipr.json";
import { getIprOverviewData } from "@/lib/leilung-data";
import { districtPath } from "@/lib/leilung-paths";

export default function Page() {
  const data = getIprOverviewData();

  return (
    <LeilungShell
      activeDept="ipr"
      subtitle="Scheme awareness, district DIPRO performance, pending publications, and statewide reach."
      title="Information & Public Relations Overview"
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { label: "Information & Public Relations" },
        ]}
      />

      <div className="space-y-6">
        <KpiStrip cards={data.kpis} />

        <OverviewMapPanel
          activeDept="ipr"
          districtsById={iprBase.districts}
          subtitle="Awareness-score map. Click a district to inspect gaps, overdue publications, and outreach planning."
          title="Scheme Awareness Map"
        />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard
            id="district-performance"
            title="District DIPRO Performance"
          >
            <DataTable
              columns={[
                {
                  key: "district",
                  label: "District",
                  href: (row) => districtPath("ipr", row.districtId),
                },
                { key: "dipro", label: "DIPRO" },
                { key: "pressReleasesMonthly", label: "Press Releases" },
                { key: "communityEvents", label: "Events" },
                { key: "digitalReach", label: "Digital Reach" },
                { key: "awarenessScore", label: "Awareness" },
                { key: "pendingPubs", label: "Pending Pubs" },
                { key: "status", label: "Status" },
              ]}
              rows={data.districtPerformance}
            />
          </SectionCard>

          <InsightChart
            data={data.topSchemes}
            keys={[
              { key: "awareness", label: "Awareness %", color: "#60a5fa" },
            ]}
            subtitle="Statewide awareness benchmark across high-visibility schemes."
            title="Top Government Schemes By Awareness"
            type="bar"
            xKey="scheme"
          />
        </div>
      </div>
    </LeilungShell>
  );
}
