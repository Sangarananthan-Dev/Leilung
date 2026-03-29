import districtsGeo from "@/data/districts.json";
import { DEPARTMENT_CONFIG } from "@/lib/leilung-config";

export { INITIAL_LAYER_STATE } from "@/lib/leilung-config";

export function useMapData(activeDept, datasets) {
  const config = DEPARTMENT_CONFIG[activeDept];
  const dataset = datasets[activeDept];
  const districtFeatures = districtsGeo.features;
  const districtList = districtFeatures
    .map((feature) => ({
      id: feature.properties.id,
      name: feature.properties.name,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
  const districtsById = dataset.districts;
  const kpis = config.buildKpis(dataset);

  function matchCount(query) {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return districtFeatures.length;
    }

    return districtFeatures.filter((feature) => {
      return feature.properties.name.toLowerCase().includes(normalized);
    }).length;
  }

  return {
    config,
    districtFeatures,
    districtList,
    districtsById,
    kpis,
    matchCount,
  };
}
