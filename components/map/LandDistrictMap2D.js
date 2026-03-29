"use client";

import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  TileLayer,
  Tooltip,
} from "react-leaflet";

export default function LandDistrictMap2D({
  cases,
  center,
  featureCollection,
  onOpenCase,
}) {
  return (
    <MapContainer center={center} className="h-full w-full" zoom={10.5}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={featureCollection}
        style={() => ({
          fillColor: "#22c55e",
          fillOpacity: 0.14,
          color: "#d1fae5",
          weight: 2,
        })}
      />
      {cases.map((item) => (
        <CircleMarker
          key={item.caseId}
          center={item.coords}
          eventHandlers={{
            click: () => {
              onOpenCase(item.href);
            },
          }}
          pathOptions={{
            color: item.color,
            fillColor: item.color,
            fillOpacity: 0.72,
            opacity: 0.9,
            weight: 1.5,
          }}
          radius={8}
        >
          <Tooltip direction="top" offset={[0, -6]} opacity={1}>
            {item.caseId} · {item.location}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
