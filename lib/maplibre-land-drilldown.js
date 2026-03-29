import { buildEncroachmentPoints } from "@/lib/encroachment-points";

export const LAND_3D_STYLE_URL = "https://tiles.openfreemap.org/styles/bright";
export const LAND_3D_TERRAIN_SOURCE = "terrainSource";
export const LAND_3D_HILLSHADE_SOURCE = "hillshadeSource";
export const LAND_3D_SATELLITE_SOURCE = "satelliteSource";
export const LAND_3D_ENCROACHMENT_SOURCE = "encroachment-points";

export function transformLandDrilldownStyle(_previousStyle, nextStyle) {
  const style = { ...nextStyle };
  const layers = [...(style.layers ?? [])];
  const firstNonFillLayer = layers.find((layer) => {
    return layer.type !== "fill" && layer.type !== "background";
  });
  const firstNonFillIndex = firstNonFillLayer
    ? layers.indexOf(firstNonFillLayer)
    : layers.length;

  style.projection = { type: "globe" };
  style.sources = {
    ...(style.sources ?? {}),
    [LAND_3D_SATELLITE_SOURCE]: {
      type: "raster",
      tiles: [
        "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
      ],
      tileSize: 256,
    },
    [LAND_3D_TERRAIN_SOURCE]: {
      type: "raster-dem",
      url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
      tileSize: 256,
    },
    [LAND_3D_HILLSHADE_SOURCE]: {
      type: "raster-dem",
      url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
      tileSize: 256,
    },
  };
  style.terrain = {
    source: LAND_3D_TERRAIN_SOURCE,
    exaggeration: 1.8,
  };
  style.sky = {
    "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 2, 0],
  };

  if (!layers.some((layer) => layer.id === "satellite")) {
    layers.splice(firstNonFillIndex, 0, {
      id: "satellite",
      type: "raster",
      source: LAND_3D_SATELLITE_SOURCE,
      layout: { visibility: "visible" },
      paint: { "raster-opacity": 1 },
    });
  }

  if (!layers.some((layer) => layer.id === "hills")) {
    layers.push({
      id: "hills",
      type: "hillshade",
      source: LAND_3D_HILLSHADE_SOURCE,
      layout: { visibility: "visible" },
      paint: { "hillshade-shadow-color": "#473B24" },
    });
  }

  style.layers = layers;
  return style;
}

export function addEncroachmentOverlay(map, districtFeature, district) {
  const encroachmentPoints = buildEncroachmentPoints(districtFeature, district);

  if (!map.getSource(LAND_3D_ENCROACHMENT_SOURCE)) {
    map.addSource(LAND_3D_ENCROACHMENT_SOURCE, {
      type: "geojson",
      data: encroachmentPoints,
    });
  }

  if (!map.getLayer("encroachment-heat")) {
    map.addLayer({
      id: "encroachment-heat",
      type: "heatmap",
      source: LAND_3D_ENCROACHMENT_SOURCE,
      paint: {
        "heatmap-intensity": 1,
        "heatmap-radius": 28,
        "heatmap-opacity": 0.64,
        "heatmap-weight": ["get", "intensity"],
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(245, 158, 11, 0)",
          0.35,
          "rgba(245, 158, 11, 0.45)",
          0.7,
          "rgba(249, 115, 22, 0.72)",
          1,
          "rgba(239, 68, 68, 0.95)",
        ],
      },
    });
  }

  [
    ["publicLand", "#ef4444"],
    ["villageCouncilLand", "#f97316"],
    ["communityGround", "#f59e0b"],
  ].forEach(([kind, color]) => {
    const layerId = `circle-${kind}`;

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: "circle",
        source: LAND_3D_ENCROACHMENT_SOURCE,
        filter: ["==", ["get", "kind"], kind],
        paint: {
          "circle-color": color,
          "circle-radius": 6,
          "circle-stroke-color": "#08120a",
          "circle-stroke-width": 1.2,
          "circle-opacity": 0.92,
        },
      });
    }
  });
}

export function syncEncroachmentOverlay(map, districtFeature, district) {
  const encroachmentPoints = buildEncroachmentPoints(districtFeature, district);
  const source = map.getSource(LAND_3D_ENCROACHMENT_SOURCE);

  if (source && "setData" in source) {
    source.setData(encroachmentPoints);
    return;
  }

  addEncroachmentOverlay(map, districtFeature, district);
}
