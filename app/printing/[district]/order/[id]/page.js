import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { ActionBar } from "@/components/ui/ActionBar";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  DISTRICT_LIST,
  getPrintingDistrictData,
  getPrintingOrderData,
} from "@/lib/leilung-data";

export function generateStaticParams() {
  return DISTRICT_LIST.flatMap((district) => {
    const data = getPrintingDistrictData(district.id);
    return (data?.pendingOrders ?? []).map((order) => ({
      district: district.id,
      id: order.orderId,
    }));
  });
}

export default async function Page({ params }) {
  const { district, id } = await params;
  const detail = getPrintingOrderData(district, id);
  const districtData = getPrintingDistrictData(district);

  if (!detail || !districtData) {
    notFound();
  }

  return (
    <LeilungShell
      activeDept="printing"
      subtitle="Individual print order detail with operational impact and escalation actions."
      title={`Order ${detail.orderId}`}
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { href: "/printing", label: "Printing & Stationery" },
          { href: `/printing/${district}`, label: districtData.districtName },
          { label: detail.orderId },
        ]}
      />

      <div className="space-y-6">
        <SectionCard title="Order Details">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              `Ordered by: ${detail.orderedBy}`,
              `Item: ${detail.item}`,
              `Quantity: ${detail.quantity}`,
              `Ordered: ${detail.ordered}`,
              `Required by: ${detail.requiredBy}`,
              `Current status: ${detail.currentStatus}`,
              `Delay reason: ${detail.delayReason}`,
              `Impact: ${detail.impact}`,
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

        <SectionCard title="Actions">
          <ActionBar actions={detail.actions} />
        </SectionCard>
      </div>
    </LeilungShell>
  );
}
