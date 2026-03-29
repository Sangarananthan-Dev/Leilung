"use client";

import { ArrowLeft } from "lucide-react";
import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import {
  addEncroachmentOverlay,
  LAND_3D_STYLE_URL,
  LAND_3D_TERRAIN_SOURCE,
  syncEncroachmentOverlay,
  transformLandDrilldownStyle,
} from "@/lib/maplibre-land-drilldown";

export default function LeilungMap3D({ district, districtFeature, onBack }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const loadedRef = useRef(false);
  const districtRef = useRef(district);
  const districtFeatureRef = useRef(districtFeature);

  districtRef.current = district;
  districtFeatureRef.current = districtFeature;

  const districtId = districtFeature?.properties.id ?? null;

  useEffect(() => {
    if (
      !containerRef.current ||
      !districtId ||
      !districtRef.current ||
      !districtFeatureRef.current
    ) {
      return undefined;
    }

    let cancelled = false;
    let resizeObserver;
    let frameId = 0;

    frameId = window.requestAnimationFrame(() => {
      if (cancelled || !containerRef.current || !districtFeatureRef.current) {
        return;
      }

      const currentFeature = districtFeatureRef.current;
      const map = new maplibregl.Map({
        container: containerRef.current,
        center: [
          currentFeature.properties.centerLng,
          currentFeature.properties.centerLat,
        ],
        zoom: 11.3,
        pitch: 70,
        maxPitch: 95,
        bearing: -15,
        attributionControl: false,
      });

      mapRef.current = map;
      loadedRef.current = false;
      map.setStyle(LAND_3D_STYLE_URL, {
        transformStyle: transformLandDrilldownStyle,
      });
      map.addControl(
        new maplibregl.NavigationControl({
          visualizePitch: true,
          showZoom: true,
          showCompass: true,
        }),
        "bottom-right",
      );
      map.addControl(new maplibregl.GlobeControl(), "bottom-right");
      map.addControl(
        new maplibregl.TerrainControl({
          source: LAND_3D_TERRAIN_SOURCE,
          exaggeration: 1.8,
        }),
        "bottom-right",
      );

      map.on("load", () => {
        if (cancelled || !districtFeatureRef.current || !districtRef.current) {
          return;
        }

        loadedRef.current = true;
        addEncroachmentOverlay(
          map,
          districtFeatureRef.current,
          districtRef.current,
        );
        window.requestAnimationFrame(() => {
          if (!cancelled) {
            map.resize();
          }
        });
      });

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          if (!cancelled) {
            map.resize();
          }
        });
        resizeObserver.observe(containerRef.current);
      }
    });

    return () => {
      cancelled = true;
      loadedRef.current = false;
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [districtId]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !loadedRef.current || !district || !districtFeature) {
      return;
    }

    syncEncroachmentOverlay(map, districtFeature, district);
  }, [district, districtFeature]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />

      <div className="pointer-events-none absolute inset-x-4 top-4 z-[1100] flex items-start justify-between gap-4">
        <button
          className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl border border-[rgba(36,48,38,0.14)] bg-[rgba(255,252,245,0.96)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] shadow-2xl"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to overview
        </button>

        <div className="surface-panel max-w-lg rounded-2xl px-4 py-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Land Encroachment View - {district.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.26em] text-[var(--accent-food)]">
            Mizoram Prevention of Public Land Encroachment Act 2026
          </p>
          <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
            Hybrid satellite, terrain elevation, hillshade, globe projection,
            and encroachment overlays are active in this drilldown.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 z-[1100] grid grid-cols-3 gap-3">
        <div className="surface-panel rounded-2xl px-4 py-3">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
            Public land
          </p>
          <p className="mono mt-2 text-lg font-semibold text-red-700">
            {district.encroachmentTypes.publicLand}
          </p>
        </div>
        <div className="surface-panel rounded-2xl px-4 py-3">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
            Village council
          </p>
          <p className="mono mt-2 text-lg font-semibold text-orange-700">
            {district.encroachmentTypes.villageCouncilLand}
          </p>
        </div>
        <div className="surface-panel rounded-2xl px-4 py-3">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
            Community ground
          </p>
          <p className="mono mt-2 text-lg font-semibold text-amber-700">
            {district.encroachmentTypes.communityGround}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 z-[1100] flex flex-wrap justify-end gap-2">
        {["Satellite", "Terrain", "Hillshade", "Globe"].map((item) => (
          <span
            key={item}
            className="surface-panel rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-[var(--text-primary)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
