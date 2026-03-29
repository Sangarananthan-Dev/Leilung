"use client";

import { Layers3, MapPinned } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MapOverlayControls } from "@/components/map/MapOverlayControls";

const LeilungMap2D = dynamic(() => import("@/components/map/LeilungMap2D"), {
  ssr: false,
});

const LeilungMap3D = dynamic(() => import("@/components/map/LeilungMap3D"), {
  ssr: false,
});

export default function LeilungMapContainer({
  activeDept,
  activeLayers,
  config,
  districtFeatures,
  districtsById,
  is3DOpen,
  onClose3D,
  onOpen3D,
  onSelectDistrict,
  onToggleLayer,
  searchQuery,
  selectedDistrictId,
}) {
  const [displayMode, setDisplayMode] = useState("2d");
  const [render3D, setRender3D] = useState(false);
  const selectedFeature = districtFeatures.find(
    (feature) => feature.properties.id === selectedDistrictId,
  );
  const selectedDistrict = selectedDistrictId
    ? districtsById[selectedDistrictId]
    : null;
  const is3DEligible =
    activeDept === "land" && selectedDistrict && selectedFeature;
  const shouldUse3D = is3DEligible && is3DOpen;

  useEffect(() => {
    if (shouldUse3D) {
      setRender3D(true);
      const frame = window.requestAnimationFrame(() => {
        setDisplayMode("3d");
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    setDisplayMode("2d");
    const timer = window.setTimeout(() => {
      setRender3D(false);
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [shouldUse3D]);

  function handleExit3D() {
    onClose3D();
  }

  return (
    <section className="map-shell h-[calc(100vh-80px)] min-h-[540px] w-full">
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-[900] flex items-start justify-between gap-4">
        <div className="surface-panel max-w-sm rounded-2xl px-4 py-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-black/15 p-1.5">
              {displayMode === "3d"
                ? <Layers3 className="h-4 w-4" />
                : <MapPinned className="h-4 w-4" />}
            </span>
            <p className="text-sm font-medium text-white">
              {config.label} Overview
            </p>
          </div>
          <p className="text-sm leading-6 text-[var(--text-muted)]">
            {displayMode === "3d"
              ? "Terrain drilldown is active. Use Back to overview to return to the 2D command view."
              : selectedDistrict
                ? `${selectedDistrict.name} selected. Use the district panel for deeper actions.`
                : "Hover to inspect districts and click once to pin the district panel."}
          </p>
          {activeDept === "land"
            ? <div className="mt-3 pointer-events-auto">
                <button
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                    is3DEligible
                      ? "border-emerald-400/25 bg-emerald-500/12 text-emerald-100 hover:bg-emerald-500/18"
                      : "cursor-not-allowed border-white/8 bg-black/10 text-[var(--text-muted)]"
                  }`}
                  disabled={!is3DEligible}
                  onClick={onOpen3D}
                  type="button"
                >
                  <Layers3 className="h-4 w-4" />
                  {is3DOpen ? "3D Terrain Active" : "Open 3D Terrain"}
                </button>
              </div>
            : null}
        </div>

        <MapOverlayControls
          config={config}
          layers={activeLayers}
          onToggleLayer={onToggleLayer}
          selectedDistrict={selectedDistrict}
        />
      </div>

      <div
        className={`map-fade absolute inset-0 ${
          displayMode === "3d" ? "opacity-0" : "opacity-100"
        }`}
      >
        <LeilungMap2D
          activeDept={activeDept}
          activeLayers={activeLayers}
          config={config}
          districtFeatures={districtFeatures}
          districtsById={districtsById}
          onSelectDistrict={onSelectDistrict}
          searchQuery={searchQuery}
          selectedDistrictId={selectedDistrictId}
        />
      </div>

      {render3D
        ? <div
            className={`map-fade absolute inset-0 ${
              displayMode === "3d" ? "opacity-100" : "opacity-0"
            }`}
          >
            <LeilungMap3D
              district={selectedDistrict}
              districtFeature={selectedFeature}
              onBack={handleExit3D}
            />
          </div>
        : null}
    </section>
  );
}
