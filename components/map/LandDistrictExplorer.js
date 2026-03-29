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
      <div className="h-full w-full animate-pulse bg-[rgba(17,31,19,0.92)]" />
    ),
  },
);

const LeilungMap3D = dynamic(() => import("@/components/map/LeilungMap3D"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-[rgba(17,31,19,0.92)]" />
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
          <p className="text-lg font-semibold text-white">Encroachment Map</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            2D district case map and 3D terrain drilldown for enforcement
            review.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              view === "2d"
                ? "border-white/14 bg-white/8 text-white"
                : "border-white/10 bg-white/5 text-[var(--text-muted)] hover:text-white"
            }`}
            onClick={() => setView("2d")}
            type="button"
          >
            2D Case Map
          </button>
          <button
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              view === "3d"
                ? "border-emerald-400/30 bg-emerald-500/14 text-white"
                : "border-emerald-400/18 bg-emerald-500/8 text-emerald-200"
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
