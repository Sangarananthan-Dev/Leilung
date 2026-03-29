"use client";

import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import { buildMarkers, matchesSearch } from "@/lib/map-markers";

const MAP_CENTER = [23.1645, 92.9376];
const MAP_BOUNDS = [
  [21.9, 92.2],
  [24.5, 93.5],
];

export default function LeilungMap2D({
  activeDept,
  activeLayers,
  config,
  districtFeatures,
  districtsById,
  onSelectDistrict,
  searchQuery,
  selectedDistrictId,
}) {
  const markers = buildMarkers(
    activeDept,
    activeLayers,
    districtFeatures,
    districtsById,
  );

  function styleFeature(feature) {
    const district = districtsById[feature.properties.id];
    const isSelected = selectedDistrictId === feature.properties.id;
    const isMatch = matchesSearch(feature, searchQuery);

    return {
      fillColor: activeLayers[config.primaryLayer]
        ? config.getFillColor(district)
        : "#203024",
      fillOpacity: activeLayers[config.primaryLayer]
        ? isSelected
          ? 0.85
          : 0.68
        : 0.16,
      color: isSelected
        ? "#f8fafc"
        : isMatch
          ? config.accent
          : "rgba(229, 231, 235, 0.2)",
      weight: isSelected ? 2.6 : isMatch ? 2 : 1.2,
      dashArray: isMatch ? "5 4" : undefined,
    };
  }

  function attachFeatureHandlers(feature, layer) {
    const district = districtsById[feature.properties.id];
    const tooltip = `<div><strong>${feature.properties.name}</strong><br/>${config.getTooltipMetric(district)}</div>`;

    layer.bindTooltip(tooltip, {
      className: "leilung-tooltip",
      sticky: true,
    });

    layer.on({
      click: () => {
        onSelectDistrict(feature.properties.id);
      },
      mouseover: () => {
        layer.setStyle({
          ...styleFeature(feature),
          fillOpacity: 0.92,
          weight: 2.4,
        });
      },
      mouseout: () => {
        layer.setStyle(styleFeature(feature));
      },
    });
  }

  return (
    <MapContainer
      bounds={MAP_BOUNDS}
      center={MAP_CENTER}
      className="h-full w-full"
      scrollWheelZoom={true}
      zoom={8}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={`${config.id}-${selectedDistrictId ?? "none"}-${searchQuery || "all"}`}
        data={districtFeatures}
        onEachFeature={attachFeatureHandlers}
        style={styleFeature}
      />
      {markers.map((marker) => (
        <CircleMarker
          key={marker.key}
          center={marker.center}
          pathOptions={{
            color: marker.color,
            fillColor: marker.color,
            fillOpacity: marker.fillOpacity,
            opacity: 0.95,
            weight: 1.4,
          }}
          radius={marker.radius}
        >
          <Tooltip
            direction="top"
            offset={[0, -6]}
            opacity={1}
            permanent={marker.permanent}
          >
            {marker.tooltip}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
