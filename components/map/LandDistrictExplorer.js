"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { landCasePath } from "@/lib/leilung-paths";

const LandDistrictMap2D = dynamic(
  () => import("@/components/map/LandDistrictMap2D"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-[var(--bg-elevated)]" />
    ),
  },
);

const LeilungMap3D = dynamic(() => import("@/components/map/LeilungMap3D"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-[var(--bg-elevated)]" />
  ),
});

function colorForType(type) {
  if (type.includes("Public")) {
    return "#ef4444";
  }

  if (type.includes("VC") || type.includes("Village")) {
    return "#f97316";
  }

  return "#f59e0b";
}

export function LandDistrictExplorer({
  cases,
  district,
  districtFeature,
  districtId,
}) {
  const [view, setView] = useState("2d");
  const router = useRouter();
  const center = districtFeature
    ? [
        districtFeature.properties.centerLat,
        districtFeature.properties.centerLng,
      ]
    : [23.1645, 92.9376];
  const featureCollection = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: districtFeature ? [districtFeature] : [],
    };
  }, [districtFeature]);

  return (
    <section className="surface-card rounded-[1.75rem] p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">
            Encroachment Map
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            2D district case map and 3D terrain drilldown for enforcement
            review.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              view === "2d"
                ? "border-[rgba(36,48,38,0.16)] bg-[var(--bg-elevated)] font-semibold text-[var(--text-primary)]"
                : "border-[rgba(36,48,38,0.1)] bg-white text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
            onClick={() => setView("2d")}
            type="button"
          >
            2D Case Map
          </button>
          <button
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              view === "3d"
                ? "border-emerald-500/30 bg-emerald-500/14 font-semibold text-emerald-800"
                : "border-emerald-500/18 bg-emerald-50 text-emerald-800"
            }`}
            onClick={() => setView("3d")}
            type="button"
          >
            Open 3D Terrain
          </button>
        </div>
      </div>

      <div className="map-shell h-[calc(100vh-80px)] min-h-[540px] w-full overflow-hidden rounded-[1.5rem]">
        {view === "3d"
          ? <LeilungMap3D
              district={district}
              districtFeature={districtFeature}
              onBack={() => setView("2d")}
            />
          : <LandDistrictMap2D
              cases={cases.map((item) => ({
                ...item,
                color: colorForType(item.type),
                href: landCasePath(districtId, item.caseId),
              }))}
              center={center}
              featureCollection={featureCollection}
              onOpenCase={(href) => router.push(href)}
            />}
      </div>
    </section>
  );
}
