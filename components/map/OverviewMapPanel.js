"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import districtsGeo from "@/data/districts.json";
import { DEPARTMENT_CONFIG } from "@/lib/leilung-config";

const LeilungMap2D = dynamic(() => import("@/components/map/LeilungMap2D"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-[rgba(17,31,19,0.92)]" />
  ),
});

const OVERVIEW_LAYERS = {
  food: {
    pdsCoverage: true,
    fpsShops: true,
    ghostBeneficiaries: true,
    smartPdsStatus: false,
  },
  land: {
    encroachmentHeatmap: true,
    mutationPending: true,
    landBankAvailability: false,
    eRamStatus: true,
  },
  ipr: {
    awarenessScore: true,
    diproActivity: true,
    mediaOutlets: false,
    rtiApplications: false,
  },
};

export function OverviewMapPanel({
  activeDept,
  districtsById,
  subtitle,
  title,
}) {
  const router = useRouter();

  return (
    <section className="surface-card rounded-[1.75rem] p-5">
      <div className="mb-4">
        <p className="text-lg font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
          {subtitle}
        </p>
      </div>

      <div className="map-shell h-[calc(100vh-80px)] min-h-[540px] w-full overflow-hidden rounded-[1.5rem]">
        <LeilungMap2D
          activeDept={activeDept}
          activeLayers={OVERVIEW_LAYERS[activeDept]}
          config={DEPARTMENT_CONFIG[activeDept]}
          districtFeatures={districtsGeo.features}
          districtsById={districtsById}
          onSelectDistrict={(districtId) => {
            router.push(`/${activeDept}/${districtId}`);
          }}
          searchQuery=""
          selectedDistrictId={null}
        />
      </div>
    </section>
  );
}
