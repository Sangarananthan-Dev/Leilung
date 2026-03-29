import foodSeed from "@/data/food.json";
import iprSeed from "@/data/ipr.json";
import landSeed from "@/data/land.json";
import printingSeed from "@/data/printing.json";

const BASE_DATASETS = {
  food: foodSeed,
  land: landSeed,
  ipr: iprSeed,
  printing: printingSeed,
};

export const ALERTS = [
  "ALERT: Undistributed PDS stock high in Lawngtlai - 2,180 qtl pending distribution",
  "CLEAR: Digital ration device authentication completed - Kolasib all ration shops active",
  "ALERT: Land encroachment case filed - Aizawl Village Council, Ward 14",
  "CLEAR: Mutation resolved - 48 cases cleared in Champhai this week",
  "ALERT: Smart PDS activation pending - Hnahthial district Civil Supplies Officer alerted",
  "CLEAR: Online land tax payment live - Saitual adoption at 58%",
  "ALERT: Scheme awareness score low - Lawngtlai DIPRO report overdue",
  "CLEAR: Press release published - Rural scheme coverage update, Serchhip",
  "ALERT: Printing order backlog - Lunglei 14 orders pending, avg 9 days",
  "CLEAR: Land Bank records updated - Khawzawl 2,600 acres available logged",
  "ALERT: Ghost beneficiaries flagged - Lawngtlai 188 cases pending verification",
  "CLEAR: e-Ram pilot transaction completed - Aizawl property registration #4821",
];

function cloneBase() {
  return JSON.parse(JSON.stringify(BASE_DATASETS));
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function wave(tick, amplitude, phase = 0) {
  return Math.round(Math.sin((tick + phase) * 0.85) * amplitude);
}

export function buildDashboardDatasets(tick) {
  const next = cloneBase();

  next.food.stateSummary.totalUndistributedQtl = clamp(
    6550 + wave(tick, 210),
    6080,
    7040,
  );
  next.food.stateSummary.totalGhostBeneficiaries = clamp(
    692 + wave(tick, 18, 0.4),
    650,
    730,
  );
  next.food.stateSummary.avgDistributionRate = clamp(
    89 + wave(tick, 2, 0.2),
    86,
    92,
  );
  next.food.districts.lawngtlai.undistributedStockQtl = clamp(
    2180 + wave(tick, 110),
    1980,
    2360,
  );
  next.food.districts.hnahthial.ghostBeneficiaries = clamp(
    38 + wave(tick, 6, 0.8),
    28,
    46,
  );
  next.food.districts.saiha.avgDistributionDays = clamp(
    9 + wave(tick, 1, 0.5),
    8,
    10,
  );

  next.land.stateSummary.totalMutationsPending = clamp(
    4062 + wave(tick, 90),
    3920,
    4200,
  );
  next.land.stateSummary.totalEncroachmentCases = clamp(
    1344 + wave(tick, 10, 0.3),
    1328,
    1360,
  );
  next.land.districts.lawngtlai.mutationsPending = clamp(
    880 + wave(tick, 24),
    838,
    920,
  );
  next.land.districts.aizawl.onlineTaxAdoption = clamp(
    62 + wave(tick, 3, 0.8),
    58,
    66,
  );
  next.land.districts.saiha.publicLandEncroachments = clamp(
    64 + wave(tick, 5, 0.5),
    58,
    70,
  );

  next.ipr.stateSummary.avgAwarenessScore = clamp(
    67 + wave(tick, 2, 0.4),
    64,
    70,
  );
  next.ipr.stateSummary.avgDigitalReach = clamp(
    62 + wave(tick, 3, 0.6),
    58,
    65,
  );
  next.ipr.stateSummary.totalPendingPublications = clamp(
    79 + wave(tick, 4),
    72,
    86,
  );
  next.ipr.districts.lawngtlai.pendingPublications = clamp(
    18 + wave(tick, 2),
    15,
    21,
  );
  next.ipr.districts.serchhip.schemeAwarenessScore = clamp(
    84 + wave(tick, 2, 0.9),
    82,
    87,
  );

  next.printing.stateSummary.totalPendingOrders = clamp(
    74 + wave(tick, 4, 0.2),
    68,
    80,
  );
  next.printing.stateSummary.avgFulfillment = clamp(89 + wave(tick, 2), 86, 92);
  next.printing.stateSummary.totalBudgetUtilized = clamp(
    74 + wave(tick, 1, 0.7),
    72,
    76,
  );
  next.printing.districts.lunglei.printingOrdersPending = clamp(
    14 + wave(tick, 2),
    11,
    17,
  );
  next.printing.districts.lawngtlai.fulfillmentPercent = clamp(
    69 + wave(tick, 3, 0.3),
    64,
    74,
  );

  return next;
}
