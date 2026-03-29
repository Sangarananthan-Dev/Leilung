import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { DISTRICT_LIST, getIprDistrictData } from "@/lib/leilung-data";

export function generateStaticParams() {
  return DISTRICT_LIST.map((district) => ({ district: district.id }));
}

export default async function Page({ params }) {
  const { district } = await params;
  const data = getIprDistrictData(district);

  if (!data) {
    notFound();
  }

  return (
    <LeilungShell
      activeDept="ipr"
      subtitle="District-level analysis of scheme awareness gaps, publication backlog, and outreach planning."
      title={`${data.districtName} Information & PR Detail`}
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { href: "/ipr", label: "Information & PR" },
          { label: data.districtName },
        ]}
      />

      <div className="space-y-6">
        <SectionCard title="Why Awareness Is Low">
          <DataTable
            columns={[
              { key: "factor", label: "Factor" },
              { key: "detail", label: "Detail" },
              { key: "impact", label: "Impact" },
            ]}
            rows={data.factors}
          />
        </SectionCard>

        <SectionCard title="Scheme Awareness Breakdown">
          <DataTable
            columns={[
              { key: "scheme", label: "Scheme" },
              {
                key: "districtAwareness",
                label: `${data.districtName} Awareness %`,
              },
              { key: "stateAverage", label: "State Avg" },
              { key: "gap", label: "Gap" },
            ]}
            rows={data.schemeBreakdown}
          />
        </SectionCard>

        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Publication Backlog">
            <DataTable
              columns={[
                { key: "publication", label: "Publication" },
                { key: "type", label: "Type" },
                { key: "dueDate", label: "Due Date" },
                { key: "status", label: "Status" },
                { key: "language", label: "Language" },
              ]}
              rows={data.publications}
            />
          </SectionCard>

          <SectionCard title="Recommended Outreach Calendar">
            <DataTable
              columns={[
                { key: "week", label: "Week" },
                { key: "activity", label: "Activity" },
                { key: "targetVillages", label: "Target Villages" },
                { key: "language", label: "Language" },
                { key: "medium", label: "Medium" },
              ]}
              rows={data.outreachCalendar}
            />
          </SectionCard>
        </div>
      </div>
    </LeilungShell>
  );
}
