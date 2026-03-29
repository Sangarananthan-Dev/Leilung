import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeilungShell } from "@/components/layout/LeilungShell";
import { ActionBar } from "@/components/ui/ActionBar";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  DISTRICT_LIST,
  getFoodDistrictData,
  getFoodShopData,
} from "@/lib/leilung-data";

export function generateStaticParams() {
  return DISTRICT_LIST.flatMap((district) => {
    const data = getFoodDistrictData(district.id);
    return (data?.shops ?? []).map((shop) => ({
      district: district.id,
      id: shop.id,
    }));
  });
}

export default async function Page({ params }) {
  const { district, id } = await params;
  const detail = getFoodShopData(district, id);
  const districtData = getFoodDistrictData(district);

  if (!detail || !districtData) {
    notFound();
  }

  return (
    <LeilungShell
      activeDept="food"
      subtitle="Deep operational record for an individual fair price shop."
      title={`FPS ${detail.shopId} · ${detail.shopName}`}
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Leilung" },
          { href: "/food", label: "Food & Public Distribution System" },
          { href: `/food/${district}`, label: districtData.districtName },
          { label: `FPS ${detail.shopId}` },
        ]}
      />

      <div className="space-y-6">
        <SectionCard title="Shop Profile">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              `Shop ID: ${detail.shopId}`,
              `Proprietor: ${detail.proprietor}`,
              `Village: ${detail.village}`,
              `Digital ration device: ${detail.ePosDevice}`,
              `GPS coordinates: ${detail.coordinates}`,
              `Beneficiaries served: ${detail.beneficiariesServed}`,
              `Operating since: ${detail.operatingSince}`,
              `Licence renewal due: ${detail.licenceRenewalDue}`,
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-[rgba(36,48,38,0.08)] bg-[var(--bg-elevated)] px-4 py-3 text-sm font-medium text-[var(--text-primary)]"
              >
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Stock Register">
          <DataTable
            columns={[
              { key: "commodity", label: "Commodity" },
              { key: "allocated", label: "Allocated" },
              { key: "received", label: "Received" },
              { key: "distributed", label: "Distributed" },
              { key: "balance", label: "Balance" },
              { key: "status", label: "Status" },
            ]}
            rows={detail.stockRegister}
          />
        </SectionCard>

        <SectionCard title="Transaction History">
          <DataTable
            columns={[
              { key: "date", label: "Date" },
              { key: "beneficiaries", label: "Beneficiaries Served" },
              { key: "commodity", label: "Commodity" },
              { key: "qty", label: "Qty Distributed" },
              { key: "authMethod", label: "Auth Method" },
            ]}
            rows={detail.transactionHistory}
          />
        </SectionCard>

        <SectionCard title="Ghost Beneficiary Flags">
          {detail.ghostFlags.length
            ? <DataTable
                columns={[
                  { key: "rcNumber", label: "RC Number" },
                  { key: "headOfFamily", label: "Head of Family" },
                  { key: "flagReason", label: "Flag Reason" },
                  { key: "status", label: "Status" },
                ]}
                rows={detail.ghostFlags}
              />
            : <p className="text-sm text-[var(--text-muted)]">
                No named ghost flags are attached to this shop record.
              </p>}
        </SectionCard>

        <SectionCard title="Actions">
          <ActionBar actions={detail.actions} />
        </SectionCard>
      </div>
    </LeilungShell>
  );
}
