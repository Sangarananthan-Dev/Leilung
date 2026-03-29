function matchesSearch(feature, searchQuery) {
  const normalized = searchQuery.trim().toLowerCase();

  if (!normalized) {
    return false;
  }

  return feature.properties.name.toLowerCase().includes(normalized);
}

function createMarker(base) {
  return base;
}

export function buildMarkers(
  activeDept,
  activeLayers,
  districtFeatures,
  districtsById,
) {
  return districtFeatures.flatMap((feature) => {
    const district = districtsById[feature.properties.id];
    const center = [feature.properties.centerLat, feature.properties.centerLng];
    const markers = [];

    if (activeDept === "food") {
      if (activeLayers.fpsShops) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-stock`,
            center,
            color: "#f59e0b",
            fillOpacity: 0.35,
            radius: Math.max(
              5,
              Math.min(18, district.undistributedStockQtl / 170),
            ),
            tooltip: `${district.undistributedStockQtl} qtl pending · ${district.fpsShops} FPS shops`,
          }),
        );
      }

      if (activeLayers.ghostBeneficiaries && district.ghostBeneficiaries > 20) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-ghost`,
            center,
            color: "#ef4444",
            fillOpacity: 0.22,
            radius: Math.max(4, Math.min(13, district.ghostBeneficiaries / 18)),
            tooltip: `${district.ghostBeneficiaries} ghost beneficiaries flagged`,
          }),
        );
      }

      if (activeLayers.smartPdsStatus) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-smart`,
            center,
            color: "#fde68a",
            fillOpacity: 0.9,
            radius: 3,
            tooltip: `Smart PDS ${district.smartPdsStatus}`,
            permanent: true,
          }),
        );
      }
    }

    if (activeDept === "land") {
      if (
        activeLayers.encroachmentHeatmap &&
        district.encroachmentCases > 100
      ) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-encroachment-ring`,
            center,
            color: "#ef4444",
            fillOpacity: 0.18,
            radius: Math.max(6, Math.min(16, district.encroachmentCases / 18)),
            tooltip: `${district.encroachmentCases} encroachment cases`,
          }),
        );
      }

      if (activeLayers.mutationPending) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-mutation`,
            center,
            color: "#f59e0b",
            fillOpacity: 0.28,
            radius: Math.max(5, Math.min(15, district.mutationsPending / 90)),
            tooltip: `${district.mutationsPending} mutations pending`,
          }),
        );
      }

      if (activeLayers.landBankAvailability) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-bank`,
            center,
            color: "#22c55e",
            fillOpacity: 0.08,
            radius: Math.max(5, Math.min(15, district.landBankAvailable / 420)),
            tooltip: `${district.landBankAvailable} acres available`,
          }),
        );
      }

      if (activeLayers.eRamStatus) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-eram`,
            center,
            color: "#86efac",
            fillOpacity: 0.95,
            radius: 3,
            tooltip: `e-Ram ${district.eRamStatus.replaceAll("_", " ")}`,
            permanent: district.eRamStatus !== "not_started",
          }),
        );
      }
    }

    if (activeDept === "ipr") {
      if (activeLayers.diproActivity) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-dipro`,
            center,
            color: district.diproActive ? "#60a5fa" : "#ef4444",
            fillOpacity: 0.35,
            radius: district.diproActive ? 7 : 5,
            tooltip: district.diproActive ? "DIPRO active" : "DIPRO inactive",
          }),
        );
      }

      if (activeLayers.mediaOutlets) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-media`,
            center,
            color: "#3b82f6",
            fillOpacity: 0.18,
            radius: Math.max(4, Math.min(13, district.localMediaOutlets / 1.6)),
            tooltip: `${district.localMediaOutlets} local outlets`,
          }),
        );
      }

      if (activeLayers.rtiApplications) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-rti`,
            center,
            color: "#f59e0b",
            fillOpacity: 0.22,
            radius: Math.max(
              4,
              Math.min(12, district.rtiApplicationsMonthly / 3),
            ),
            tooltip: `${district.rtiApplicationsMonthly} RTI applications`,
          }),
        );
      }
    }

    if (activeDept === "printing") {
      if (activeLayers.pendingOrders) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-orders`,
            center,
            color: "#a78bfa",
            fillOpacity: 0.28,
            radius: Math.max(4, Math.min(14, district.printingOrdersPending)),
            tooltip: `${district.printingOrdersPending} pending orders`,
          }),
        );
      }

      if (activeLayers.budgetUtilization) {
        markers.push(
          createMarker({
            key: `${feature.properties.id}-budget`,
            center,
            color: "#ddd6fe",
            fillOpacity: 0.95,
            radius: 3,
            tooltip: `Budget ${district.budgetUtilizedPercent}%`,
            permanent: true,
          }),
        );
      }
    }

    return markers;
  });
}

export { matchesSearch };
