import { notFound } from "next/navigation";
import { InsightChart } from "@/components/charts/InsightChart";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { LandDistrictExplorer } from "@/components/map/LandDistrictExplorer";
import { StatBadge } from "@/components/shared/StatBadge";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import landBase from "@/data/land.json";
import { DISTRICT_LIST, getLandDistrictData } from "@/lib/leilung-data";
import { landCasePath } from "@/lib/leilung-paths";

function severityTone(value) {
  if (value === "CRITICAL") return "danger";
  if (value === "HIGH") return "warning";
  return "info";
}

export function generateStaticParams() {
  return DISTRICT_LIST.map((district) => ({ district: district.id }));
}

export default async function Page({ params }) {
  const { district: districtId } = await params;
  const data = getLandDistrictData(districtId);
  const district = landBase.districts[districtId];

  if (!data || !district) {
    notFound();
  }

  return (
    <LeilungShell
      activeDept="land"
      subtitle="District detail with case map, mutation backlog, land bank, and revenue collection trend."
      title={`${data.districtName} Land Revenue Detail`}
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { href: "/land", label: "Land Revenue" },
          { label: data.districtName },
        ]}
      />

      <div className="space-y-6">
        <SectionCard title="District Risk Summary">
          <div className="mb-4">
            <StatBadge tone={severityTone(data.summaryBadge)}>
              {data.summaryBadge}
            </StatBadge>
          </div>
          <p className="text-sm leading-7 text-[var(--text-primary)]">
            {data.summaryText}
          </p>
        </SectionCard>

        <LandDistrictExplorer
          cases={data.cases}
          district={district}
          districtFeature={data.districtFeature}
          districtId={districtId}
        />

        <SectionCard title="Encroachment Case Table">
          <DataTable
            columns={[
              {
                key: "caseId",
                label: "Case ID",
                href: (row) => landCasePath(districtId, row.caseId),
              },
              { key: "location", label: "Location" },
              { key: "type", label: "Type" },
              { key: "areaSqFt", label: "Area (sq ft)" },
              { key: "filed", label: "Filed" },
              { key: "status", label: "Status" },
              { key: "severity", label: "Severity" },
              {
                key: "action",
                label: "Action",
                render: (row) => (
                  <a href={landCasePath(districtId, row.caseId)}>View</a>
                ),
              },
            ]}
            rows={data.cases}
          />
        </SectionCard>

        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Mutation Backlog Analysis">
            <DataTable
              columns={[
                { key: "type", label: "Type" },
                { key: "pending", label: "Pending" },
                { key: "avgAge", label: "Avg Age (days)" },
                { key: "oldestCase", label: "Oldest Case" },
                { key: "targetClearance", label: "Target Clearance" },
              ]}
              rows={data.mutationBacklog}
            />
          </SectionCard>

          <SectionCard title="Land Bank Availability">
            <DataTable
              columns={[
                { key: "category", label: "Category" },
                { key: "totalAcres", label: "Total Acres" },
                { key: "allocated", label: "Allocated" },
                { key: "available", label: "Available" },
                { key: "reservedForGovt", label: "Reserved for Govt" },
              ]}
              rows={data.landBank}
            />
          </SectionCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <SectionCard title="Online Land Tax Adoption">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                `Total taxable plots: ${data.onlineTax.taxablePlots}`,
                `Online payments: ${data.onlineTax.onlinePayments}`,
                `Offline payments: ${data.onlineTax.offlinePayments}`,
                `Unpaid: ${data.onlineTax.unpaid}`,
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/8 bg-black/10 px-4 py-3 text-sm text-[var(--text-primary)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>

          <InsightChart
            data={data.revenueTrend}
            keys={[
              { key: "target", label: "Target (Rs lakh)", color: "#22c55e" },
              { key: "collected", label: "Collected", color: "#f59e0b" },
            ]}
            subtitle="Revenue collection trend against annual target."
            title="Revenue Collection Trend"
            type="bar"
            xKey="year"
          />
        </div>
      </div>
    </LeilungShell>
  );
}
