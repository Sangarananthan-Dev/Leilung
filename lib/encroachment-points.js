export function buildEncroachmentPoints(districtFeature, district) {
  const { centerLat, centerLng } = districtFeature.properties;
  const seeds = [
    ["publicLand", district.encroachmentTypes.publicLand, 0],
    ["villageCouncilLand", district.encroachmentTypes.villageCouncilLand, 1.8],
    ["communityGround", district.encroachmentTypes.communityGround, 3.6],
  ];

  return {
    type: "FeatureCollection",
    features: seeds.flatMap(([kind, count, baseAngle]) => {
      const totalPoints = Math.max(4, Math.round(count / 18));

      return Array.from({ length: totalPoints }, (_, index) => {
        const angle = baseAngle + (index / totalPoints) * Math.PI * 2;
        const radius = 0.012 + (index % 3) * 0.004;

        return {
          type: "Feature",
          properties: {
            kind,
            intensity: Math.max(0.25, Math.min(1, count / 140)),
          },
          geometry: {
            type: "Point",
            coordinates: [
              centerLng + Math.cos(angle) * radius,
              centerLat + Math.sin(angle) * radius,
            ],
          },
        };
      });
    }),
  };
}
