import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { ActionBar } from "@/components/ui/ActionBar";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  DISTRICT_LIST,
  getLandCaseData,
  getLandDistrictData,
} from "@/lib/leilung-data";

export function generateStaticParams() {
  return DISTRICT_LIST.flatMap((district) => {
    const data = getLandDistrictData(district.id);
    return (data?.cases ?? []).map((item) => ({
      district: district.id,
      id: item.caseId,
    }));
  });
}

export default async function Page({ params }) {
  const { district, id } = await params;
  const detail = getLandCaseData(district, id);
  const districtData = getLandDistrictData(district);

  if (!detail || !districtData) {
    notFound();
  }

  return (
    <LeilungShell
      activeDept="land"
      subtitle="Individual encroachment case record with timeline, survey facts, and enforcement actions."
      title={`Case ${detail.caseId}`}
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { href: "/land", label: "Land Revenue" },
          { href: `/land/${district}`, label: districtData.districtName },
          { label: detail.caseId },
        ]}
      />

      <div className="space-y-6">
        <SectionCard title="Case Summary">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              `Filed: ${detail.filed}`,
              `Location: ${detail.location}`,
              `Encroached land type: ${detail.landType}`,
              `Area: ${detail.area}`,
              `Encroacher: ${detail.encroacher}`,
              `Applicable Act: ${detail.applicableAct}`,
              `Penalty applicable: ${detail.penaltyApplicable}`,
              `Current status: ${detail.currentStatus}`,
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

        <SectionCard title="Case Timeline">
          <DataTable
            columns={[
              { key: "date", label: "Date" },
              { key: "event", label: "Event" },
              { key: "officer", label: "Officer" },
              { key: "status", label: "Status" },
            ]}
            rows={detail.timeline}
          />
        </SectionCard>

        <SectionCard title="Survey Data">
          {detail.surveyData.length
            ? <DataTable
                columns={[
                  { key: "label", label: "Field" },
                  { key: "value", label: "Value" },
                ]}
                rows={detail.surveyData}
              />
            : <p className="text-sm text-[var(--text-muted)]">
                No additional survey attachments in this simulated case.
              </p>}
        </SectionCard>

        <SectionCard title="Actions">
          <ActionBar actions={detail.actions} />
        </SectionCard>
      </div>
    </LeilungShell>
  );
}
