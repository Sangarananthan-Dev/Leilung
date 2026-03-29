"use client";

import dynamic from "next/dynamic";
import { startTransition, useDeferredValue, useRef, useState } from "react";
import { DeptTabs } from "@/components/nav/DeptTabs";
import { SearchBar } from "@/components/nav/SearchBar";
import { LeilungLogo } from "@/components/shared/LeilungLogo";
import { AlertFeed } from "@/components/sidebar/AlertFeed";
import { DeptChart } from "@/components/sidebar/DeptChart";
import { DistrictPanel } from "@/components/sidebar/DistrictPanel";
import { KpiCards } from "@/components/sidebar/KpiCards";
import { INITIAL_LAYER_STATE, useMapData } from "@/hooks/useMapData";
import { useSimulation } from "@/hooks/useSimulation";

const LeilungMapContainer = dynamic(
  () => import("@/components/map/LeilungMapContainer"),
  {
    ssr: false,
    loading: () => (
      <div className="map-shell h-[calc(100vh-80px)] min-h-[540px] w-full animate-pulse bg-[rgba(17,31,19,0.92)]" />
    ),
  },
);

export default function LeilungDashboard() {
  const { alertIndex, alerts, datasets } = useSimulation();
  const [activeDept, setActiveDept] = useState("food");
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [is3DOpen, setIs3DOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [layersByDept, setLayersByDept] = useState(INITIAL_LAYER_STATE);
  const districtSectionRef = useRef(null);
  const deferredSearch = useDeferredValue(searchQuery);

  const mapData = useMapData(activeDept, datasets);
  const activeLayers = layersByDept[activeDept];
  const selectedDistrict =
    selectedDistrictId && mapData.districtsById[selectedDistrictId]
      ? mapData.districtsById[selectedDistrictId]
      : null;
  const canOpen3D = activeDept === "land" && selectedDistrict;

  function handleDeptChange(nextDept) {
    startTransition(() => {
      setActiveDept(nextDept);
      setIs3DOpen(false);
      setSelectedDistrictId(null);
      setSearchQuery("");
    });
  }

  function handleSelectDistrict(nextDistrictId) {
    setSelectedDistrictId(nextDistrictId);
    setIs3DOpen(false);
  }

  function handleSearchSelection(district) {
    setSearchQuery(district.name);
    setSelectedDistrictId(district.id);
    setIs3DOpen(false);

    window.requestAnimationFrame(() => {
      districtSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function handleToggleLayer(layerKey) {
    setLayersByDept((current) => ({
      ...current,
      [activeDept]: {
        ...current[activeDept],
        [layerKey]: !current[activeDept][layerKey],
      },
    }));
  }

  const visibleAlerts = Array.from({ length: 4 }, (_, index) => {
    const offset = (alertIndex + index) % alerts.length;
    return alerts[offset];
  });

  return (
    <main className="min-h-screen text-[var(--text-primary)]">
      <header className="border-b border-emerald-950/45 bg-[linear-gradient(180deg,#102313,#0c1a0e)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
        <div className="mx-auto max-w-[1800px] px-4 py-3 lg:px-6 lg:py-3.5">
          <div className="flex min-h-[4.5rem] flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-50/10 p-2 ring-4 ring-white/8">
                <LeilungLogo compact={true} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-semibold tracking-[0.03em] text-white lg:text-[1.9rem]">
                  Leilung Resource &amp; Land Governance Dashboard
                </p>
                <p className="text-sm text-emerald-50/72">
                  Governance grounded in data · Minister B. Lalchhanzova · Food,
                  Land, Information &amp; PR, and Printing
                </p>
              </div>
            </div>

            <div className="flex w-full justify-end xl:max-w-[360px]">
              <SearchBar
                districts={mapData.districtList}
                onChange={setSearchQuery}
                onSelectDistrict={handleSearchSelection}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-[1800px] flex-col gap-4 px-4 py-4 lg:px-6">
        <section className="px-1">
          <DeptTabs
            activeDept={activeDept}
            className="w-full lg:grid-cols-4"
            onChange={handleDeptChange}
          />
        </section>

        <section className="dashboard-grid">
          <LeilungMapContainer
            activeDept={activeDept}
            activeLayers={activeLayers}
            config={mapData.config}
            districtFeatures={mapData.districtFeatures}
            districtsById={mapData.districtsById}
            is3DOpen={is3DOpen}
            onClose3D={() => setIs3DOpen(false)}
            onOpen3D={() => setIs3DOpen(true)}
            onToggleLayer={handleToggleLayer}
            searchQuery={deferredSearch}
            selectedDistrictId={selectedDistrictId}
            onSelectDistrict={handleSelectDistrict}
          />

          <aside className="scrollbar-thin flex h-[calc(100vh-80px)] min-h-[540px] flex-col gap-4 overflow-y-auto pr-1">
            <KpiCards activeDept={activeDept} cards={mapData.kpis} />
            <div ref={districtSectionRef}>
              <DistrictPanel
                canOpen3D={canOpen3D}
                config={mapData.config}
                district={selectedDistrict}
                is3DOpen={is3DOpen}
                onOpen3D={() => setIs3DOpen(true)}
              />
            </div>
            <DeptChart
              activeDept={activeDept}
              config={mapData.config}
              district={selectedDistrict}
            />
            <AlertFeed activeDept={activeDept} alerts={visibleAlerts} />
          </aside>
        </section>
      </div>
    </main>
  );
}
