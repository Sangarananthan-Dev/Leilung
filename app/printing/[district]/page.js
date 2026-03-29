import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { DISTRICT_LIST, getPrintingDistrictData } from "@/lib/leilung-data";
import { printingOrderPath } from "@/lib/leilung-paths";

export function generateStaticParams() {
  return DISTRICT_LIST.map((district) => ({ district: district.id }));
}

export default async function Page({ params }) {
  const { district } = await params;
  const data = getPrintingDistrictData(district);

  if (!data) {
    notFound();
  }

  return (
    <LeilungShell
      activeDept="printing"
      subtitle="District order queue and local causes of turnaround slippage."
      title={`${data.districtName} Printing & Stationery Detail`}
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { href: "/printing", label: "Printing & Stationery" },
          { label: data.districtName },
        ]}
      />

      <div className="space-y-6">
        <SectionCard title="Pending Orders Table">
          <DataTable
            columns={[
              {
                key: "orderId",
                label: "Order ID",
                href: (row) => printingOrderPath(district, row.orderId),
              },
              { key: "department", label: "Dept" },
              { key: "item", label: "Item" },
              { key: "qty", label: "Qty" },
              { key: "orderedOn", label: "Ordered On" },
              { key: "due", label: "Due" },
              { key: "status", label: "Status" },
              { key: "delay", label: "Delay" },
            ]}
            rows={data.pendingOrders}
          />
        </SectionCard>

        <SectionCard title="Root Cause Of Delays">
          <div className="space-y-3">
            {data.rootCauses.map((cause) => (
              <article
                key={cause}
                className="rounded-[1.25rem] border border-[rgba(36,48,38,0.08)] bg-[var(--bg-elevated)] px-4 py-3 text-sm leading-6 text-[var(--text-primary)]"
              >
                {cause}
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </LeilungShell>
  );
}
