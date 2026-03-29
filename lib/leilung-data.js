import districtsGeo from "@/data/districts.json";
import foodBase from "@/data/food.json";
import iprBase from "@/data/ipr.json";
import landBase from "@/data/land.json";
import printingBase from "@/data/printing.json";

export const DEPARTMENTS = {
  food: {
    key: "food",
    label: "Food & Public Distribution System",
    accent: "#f59e0b",
    href: "/food",
  },
  land: {
    key: "land",
    label: "Land Revenue",
    accent: "#22c55e",
    href: "/land",
  },
  ipr: {
    key: "ipr",
    label: "Information & Public Relations",
    accent: "#60a5fa",
    href: "/ipr",
  },
  printing: {
    key: "printing",
    label: "Printing & Stationery",
    accent: "#a78bfa",
    href: "/printing",
  },
};

export const DISTRICT_META = Object.fromEntries(
  districtsGeo.features.map((feature) => [
    feature.properties.id,
    {
      id: feature.properties.id,
      name: feature.properties.name,
      headquarter: feature.properties.headquarter,
      center: [feature.properties.centerLat, feature.properties.centerLng],
      feature,
    },
  ]),
);

export const DISTRICT_LIST = Object.values(DISTRICT_META).sort((left, right) =>
  left.name.localeCompare(right.name),
);

export const HOME_CRITICAL_ALERTS = [
  {
    tone: "danger",
    text: "Lawngtlai critical across all 4 departments — Food (69% dist.), Land (critical encroachment), IPR (44% awareness), Printing (69% fulfillment).",
  },
  {
    tone: "danger",
    text: "Hnahthial — SMART PDS not activated, 310 qtl undistributed stock, 18 pending publications.",
  },
  {
    tone: "warning",
    text: "Lunglei — High transport cost (Rs 348/qtl), 10,200 land records undigitised, 14 print orders pending.",
  },
];

export const HOME_MATRIX = [
  ["aizawl", "✓ 98%", "⚠ High encr.", "✓ 82%", "✓ 97%", "Good"],
  ["serchhip", "✓ 99%", "✓ Low", "✓ 84%", "✓ 98%", "Excellent"],
  ["kolasib", "✓ 99%", "✓ Low", "✓ 78%", "✓ 98%", "Excellent"],
  ["saitual", "✓ 98%", "✓ Low", "✓ 76%", "✓ 97%", "Good"],
  ["champhai", "✓ 95%", "— Medium", "— 72%", "✓ 93%", "Good"],
  ["khawzawl", "✓ 94%", "— Medium", "— 68%", "✓ 92%", "Good"],
  ["mamit", "✓ 92%", "— Medium", "— 62%", "✓ 91%", "Moderate"],
  ["lunglei", "— 87%", "⚠ High", "— 64%", "⚠ 77%", "Moderate"],
  ["hnahthial", "⚠ Pending", "— Medium", "⚠ 58%", "— 89%", "Needs attention"],
  ["saiha", "⚠ Partial", "⚠ High", "⚠ 52%", "⚠ 79%", "Needs attention"],
  ["lawngtlai", "🔴 Critical", "🔴 Critical", "🔴 44%", "🔴 69%", "CRITICAL"],
].map(([districtId, food, land, ipr, printing, overall]) => ({
  districtId,
  district: DISTRICT_META[districtId].name,
  food,
  land,
  ipr,
  printing,
  overall,
}));

export const STATEWIDE_ALERTS = [
  "⚠ FPS LNG-034 Lungsen offline since Feb 14 — 1,840 beneficiaries unserved",
  "⚠ Undistributed stock critical — Lawngtlai 2,180 qtl, action required",
  "✓ Digital ration device authentication successful — 98% completion in Kolasib this cycle",
  "⚠ SMART PDS activation pending — Hnahthial DCSO alert sent Mar 28",
  "✓ Ghost beneficiary cancellation completed — 44 cards removed, Aizawl North",
  "⚠ Encroachment case escalated — Bualpui VC, Lawngtlai (1,322 days open)",
  "✓ e-Ram transaction #4821 completed — Aizawl property transfer registered",
  "⚠ Mutation backlog high — Lawngtlai 880 cases, oldest from Jan 2022",
  "✓ Land digitisation milestone — Serchhip crosses 94%, target 100% by Jun 2025",
  "⚠ Online land tax unpaid — Lawngtlai 51% plots not paid (2025-26)",
  "⚠ Publication overdue — Land Encroachment Act circular, Lawngtlai 28 days late",
  "✓ Scheme awareness campaign successful — JJM coverage up to 84% statewide",
  "⚠ Lawngtlai awareness score 44% — lowest in state, DIPRO review recommended",
  "✓ Social media milestone — DIPR Instagram crosses 1.46 lakh followers",
  "⚠ Order PRN-LWT-0856 overdue — encroachment notice templates, paper shortage",
  "⚠ Lawngtlai printing fulfillment at 69% — 18 orders pending, avg 14 days",
  "✓ Aizawl print orders on track — 97% fulfillment this quarter",
  "⚠ Paper stock alert — Mizoram Govt Press A4 bond paper reorder ETA Apr 2",
];

const FOOD_COMMODITY_ALLOCATION = [
  {
    month: "Oct 2024",
    riceAllocated: 48200,
    riceDistributed: 45100,
    wheatAllocated: 8400,
    wheatDistributed: 7900,
    keroseneAllocated: 3200,
    keroseneDistributed: 2860,
    oilAllocated: 2100,
    oilDistributed: 1980,
  },
  {
    month: "Nov 2024",
    riceAllocated: 48200,
    riceDistributed: 46300,
    wheatAllocated: 8400,
    wheatDistributed: 8100,
    keroseneAllocated: 3200,
    keroseneDistributed: 2910,
    oilAllocated: 2100,
    oilDistributed: 2004,
  },
  {
    month: "Dec 2024",
    riceAllocated: 48200,
    riceDistributed: 44800,
    wheatAllocated: 8400,
    wheatDistributed: 7600,
    keroseneAllocated: 3200,
    keroseneDistributed: 2740,
    oilAllocated: 2100,
    oilDistributed: 1890,
  },
  {
    month: "Jan 2025",
    riceAllocated: 48200,
    riceDistributed: 46800,
    wheatAllocated: 8400,
    wheatDistributed: 8200,
    keroseneAllocated: 3200,
    keroseneDistributed: 2960,
    oilAllocated: 2100,
    oilDistributed: 2020,
  },
  {
    month: "Feb 2025",
    riceAllocated: 48200,
    riceDistributed: 45600,
    wheatAllocated: 8400,
    wheatDistributed: 7800,
    keroseneAllocated: 3200,
    keroseneDistributed: 2870,
    oilAllocated: 2100,
    oilDistributed: 1940,
  },
  {
    month: "Mar 2025",
    riceAllocated: 48200,
    riceDistributed: 47100,
    wheatAllocated: 8400,
    wheatDistributed: 8300,
    keroseneAllocated: 3200,
    keroseneDistributed: 3015,
    oilAllocated: 2100,
    oilDistributed: 2045,
  },
];

const FOOD_TRANSPORT_COSTS = [
  ["aizawl", 142, "-18%", "—"],
  ["lunglei", 348, "+101%", "⚠ High"],
  ["lawngtlai", 412, "+138%", "⚠ Critical"],
  ["saiha", 384, "+122%", "⚠ High"],
  ["champhai", 218, "+26%", "—"],
  ["kolasib", 128, "-26%", "✓ Low"],
  ["serchhip", 118, "-32%", "✓ Low"],
  ["mamit", 224, "+30%", "—"],
  ["hnahthial", 264, "+53%", "⚠ Moderate"],
  ["khawzawl", 198, "+15%", "—"],
  ["saitual", 132, "-24%", "✓ Low"],
].map(([districtId, transportCost, versusStateAvg, flag]) => ({
  districtId,
  district: DISTRICT_META[districtId].name,
  transportCost,
  versusStateAvg,
  flag,
}));

const FOOD_BENEFICIARY_BREAKDOWN = {
  lunglei: [
    {
      cardType: "AAY (Yellow)",
      count: 9800,
      members: 42100,
      riceEntitlement: "35 kg/card",
      wheatEntitlement: "0",
    },
    {
      cardType: "PHH/Blue",
      count: 92400,
      members: 384200,
      riceEntitlement: "5 kg/member",
      wheatEntitlement: "0",
    },
    {
      cardType: "White (State)",
      count: 68200,
      members: 218400,
      riceEntitlement: "3 kg/member",
      wheatEntitlement: "1 kg/member",
    },
  ],
};

const FOOD_DISTRICT_ISSUES = {
  lunglei: [
    "⚠ FPS LNG-034 (Lungsen) — offline since Feb 14, 182 qtl stock held, 1,840 beneficiaries unserved",
    "⚠ Stock spoilage reported at Lungsen sub-godown — 14.2 qtl rice degraded",
    "⚠ Transport delay — Chawngte-Lungsen route blocked 6 days in March due to landslide",
    "⚠ 98 ghost beneficiary cases open — 43 under verification, 55 flagged for cancellation",
  ],
};

const FOOD_FPS_SHOPS = {
  lunglei: [
    {
      id: "LNG-001",
      shopName: "Bualte Store",
      village: "Lunglei Town",
      ePos: "✓ Active",
      lastTransaction: "28 Mar 2025",
      stockHeld: 12.4,
      distributionPercent: 96,
      status: "Normal",
    },
    {
      id: "LNG-012",
      shopName: "Hmarveng FPS",
      village: "Hmarveng",
      ePos: "✓ Active",
      lastTransaction: "25 Mar 2025",
      stockHeld: 48.2,
      distributionPercent: 74,
      status: "⚠ Low dist.",
    },
    {
      id: "LNG-034",
      shopName: "Saikah FPS",
      village: "Lungsen",
      ePos: "✗ Offline",
      lastTransaction: "14 Feb 2025",
      stockHeld: 182,
      distributionPercent: 31,
      status: "⚠ Critical",
    },
    {
      id: "LNG-042",
      shopName: "Chawngte Road FPS",
      village: "Chawngte",
      ePos: "✓ Active",
      lastTransaction: "27 Mar 2025",
      stockHeld: 8.1,
      distributionPercent: 98,
      status: "Normal",
    },
    {
      id: "LNG-067",
      shopName: "Haulawng Store",
      village: "Haulawng",
      ePos: "✓ Active",
      lastTransaction: "26 Mar 2025",
      stockHeld: 22.8,
      distributionPercent: 81,
      status: "—",
    },
  ],
};

const FOOD_FPS_DETAILS = {
  "lunglei:LNG-034": {
    shopId: "LNG-034",
    shopName: "Saikah FPS",
    proprietor: "Laldinsanga Ralte",
    village: "Lungsen, Lunglei District",
    ePosDevice:
      "Not installed (reason: power outage, device replacement pending)",
    coordinates: "22.8812° N, 92.7344° E",
    beneficiariesServed: "1,840 (412 cards — 38 AAY, 292 PHH, 82 White)",
    operatingSince: "2008",
    licenceRenewalDue: "September 2025",
    stockRegister: [
      ["Rice (AAY)", 13.3, 13.3, 4.1, 9.2, "⚠ Underdistributed"],
      ["Rice (PHH)", 146, 146, 44.2, 101.8, "⚠ Critical"],
      ["Rice (White)", 24.6, 24.6, 8.9, 15.7, "⚠ Underdistributed"],
      ["Wheat", 8.2, 0, 0, 0, "✗ Not received"],
      ["Kerosene (ltrs)", 920, 920, 184, 736, "⚠ Underdistributed"],
      ["Edible Oil (ltrs)", 184, 184, 62, 122, "⚠"],
    ].map(([commodity, allocated, received, distributed, balance, status]) => ({
      commodity,
      allocated,
      received,
      distributed,
      balance,
      status,
    })),
    transactionHistory: [
      ["28 Mar 2025", 0, "—", "—", "digital ration device offline"],
      ["14 Feb 2025", 82, "Rice", "4.1 qtl", "Manual register"],
      ["13 Feb 2025", 114, "Rice", "5.7 qtl", "Manual register"],
      ["12 Feb 2025", 98, "Rice", "4.9 qtl", "Manual register"],
    ].map(([date, beneficiaries, commodity, qty, authMethod]) => ({
      date,
      beneficiaries,
      commodity,
      qty,
      authMethod,
    })),
    ghostFlags: [
      [
        "MZ-LNG-0042841",
        "Lalramzauva",
        "Deceased, not removed",
        "Pending cancellation",
      ],
      [
        "MZ-LNG-0041128",
        "Vanlalpeki",
        "Migrated to Aizawl, duplicate",
        "Under verification",
      ],
      [
        "MZ-LNG-0038920",
        "Hmingthansanga",
        "No Aadhaar seeding",
        "Notice issued",
      ],
    ].map(([rcNumber, head, flagReason, status]) => ({
      rcNumber,
      head,
      flagReason,
      status,
    })),
    actions: [
      "Flag for Audit",
      "Suspend Distribution",
      "Transfer Stock",
      "Contact DCSO",
    ],
  },
};

const LAND_ERAM_ROLLOUT = [
  [
    "aizawl",
    "✓ Pilot Active",
    "Nov 2024",
    "Property reg., lease, transfer, house site",
    "4,821",
  ],
  ["champhai", "Planned Q3 2025", "—", "—", "—"],
  ["kolasib", "Planned Q3 2025", "—", "—", "—"],
  ["serchhip", "Planned Q4 2025", "—", "—", "—"],
  ["khawzawl", "Planned Q4 2025", "—", "—", "—"],
  ["saitual", "Planned Q4 2025", "—", "—", "—"],
  ["lunglei", "Not started", "—", "—", "—"],
  ["lawngtlai", "Not started", "—", "—", "—"],
  ["mamit", "Not started", "—", "—", "—"],
  ["saiha", "Not started", "—", "—", "—"],
  ["hnahthial", "Not started", "—", "—", "—"],
].map(([districtId, status, launchDate, services, transactions]) => ({
  districtId,
  district: DISTRICT_META[districtId].name,
  status,
  launchDate,
  services,
  transactions,
}));

const LAND_ACT_MILESTONES = [
  ["Act passed by Assembly", "✓ Complete", "Feb 20, 2026"],
  ["District authority notification", "✓ Complete", "Mar 1, 2026"],
  ["Village council awareness circular", "✓ Complete", "Mar 10, 2026"],
  ["GIS encroachment survey — Aizawl", "In progress", "Apr 30, 2026"],
  ["GIS encroachment survey — all districts", "Pending", "Dec 31, 2026"],
  ["First eviction notices issued", "Pending", "May 2026"],
  ["Penalty collection system", "Pending", "Jun 2026"],
].map(([milestone, status, targetDate]) => ({
  milestone,
  status,
  targetDate,
}));

const LAND_MUTATION_BACKLOG = {
  lawngtlai: [
    ["Transfer of ownership", 412, 48, "Jan 2022 (1,150 days!)", "Jun 2025"],
    ["Partition/division", 184, 62, "Mar 2023", "Jul 2025"],
    ["Name correction", 142, 18, "Feb 2025", "Apr 2025"],
    ["Agricultural conversion", 88, 94, "Sep 2021", "Aug 2025"],
    ["House site regularisation", 54, 31, "Nov 2024", "May 2025"],
  ].map(([type, pending, avgAge, oldestCase, targetClearance]) => ({
    type,
    pending,
    avgAge,
    oldestCase,
    targetClearance,
  })),
};

const LAND_BANK_DETAILS = {
  lawngtlai: [
    ["House site", 2840, 1240, 1600, "—"],
    ["Agricultural", 4120, 980, 3140, "—"],
    ["Govt project reserve", 2240, "—", "—", 2240],
  ].map(([category, totalAcres, allocated, available, reservedForGovt]) => ({
    category,
    totalAcres,
    allocated,
    available,
    reservedForGovt,
  })),
};

const LAND_REVENUE_TREND = {
  lawngtlai: [
    ["2020-21", 24, 18.4, "77%"],
    ["2021-22", 26, 21.2, "82%"],
    ["2022-23", 28, 22.8, "81%"],
    ["2023-24", 32, 26.4, "83%"],
    ["2024-25", 36, 28.8, "80%"],
    ["2025-26", 40, 6.2, "—"],
  ].map(([year, target, collected, achievement]) => ({
    year,
    target,
    collected,
    achievement,
  })),
};

const LAND_CASES = {
  lawngtlai: [
    [
      "ENC-LWT-0001",
      "Chawngte Ward 3",
      "Public Land",
      4200,
      "Jan 2024",
      "Under notice",
      "Critical",
    ],
    [
      "ENC-LWT-0012",
      "Sangau Village",
      "Community Ground",
      8800,
      "Mar 2023",
      "Court",
      "High",
    ],
    [
      "ENC-LWT-0028",
      "Lawngtlai Town",
      "VC Land",
      2100,
      "Jun 2024",
      "Eviction pending",
      "High",
    ],
    [
      "ENC-LWT-0044",
      "Bualpui VC",
      "Public Land",
      18400,
      "Aug 2022",
      "Disputed",
      "Critical",
    ],
  ],
};

const LAND_CASE_DETAILS = {
  "lawngtlai:ENC-LWT-0044": {
    caseId: "ENC-LWT-0044",
    title: "Bualpui Village Council",
    filed: "August 14, 2022 (1,322 days open)",
    location: "Bualpui Village, Lawngtlai District",
    landType: "Public government land (forest fringe)",
    area: "18,400 sq ft (1.71 acres)",
    encroacher: "[Name redacted] — 3 structures built",
    applicableAct:
      "Prevention of Public Land Encroachment Act 2026 (supersedes 2001 Act)",
    penaltyApplicable:
      "Rs 2,00,000 (first offence) + Rs 5,00,000 (repeat if applicable)",
    currentStatus: "DISPUTED — encroacher claims historic possession pre-1987",
    timeline: [
      ["Aug 14, 2022", "Case filed by Survey Officer", "SO Lawngtlai", "Open"],
      ["Sep 02, 2022", "Show cause notice issued", "DCSO", "Responded"],
      [
        "Nov 18, 2022",
        "Response received — claims prior possession",
        "Encroacher",
        "Contested",
      ],
      [
        "Feb 06, 2023",
        "Field verification conducted",
        "Revenue Inspector",
        "Confirmed encroachment",
      ],
      ["May 12, 2023", "Referred to DC court", "DC Lawngtlai", "In court"],
      ["Jan 15, 2024", "Court hearing — adjournment", "Court", "Pending"],
      ["Aug 08, 2024", "Court hearing — adjournment #2", "Court", "Pending"],
      [
        "Mar 2026",
        "New Act applicable — penalty escalation",
        "Dept",
        "To be applied",
      ],
    ].map(([date, event, officer, status]) => ({
      date,
      event,
      officer,
      status,
    })),
    surveyData: [
      ["Original land pass number", "None — unregistered govt land"],
      ["Adjacent plots", "ENC-LWT-0041 (same cluster), ENC-LWT-0048"],
      [
        "Structures on encroached land",
        "1 permanent structure, 2 semi-permanent",
      ],
      [
        "Estimated market value of encroached land",
        "Rs 18.4 lakh (at Rs 1,000/sq ft prevailing)",
      ],
    ].map(([label, value]) => ({ label, value })),
    actions: [
      "Issue Eviction Notice",
      "Apply Penalty",
      "Assign Field Officer",
      "Mark Resolved",
      "Escalate to DC",
    ],
  },
};

const IPR_TOP_SCHEMES = [
  ["Jal Jeevan Mission", 84, "PHE"],
  ["MGNREGA", 81, "Rural Development"],
  ["PMAY (housing)", 76, "Rural Development"],
  ["Digital ration device PDS reform", 68, "Food & CS"],
  ["Land Encroachment Act 2026", 31, "Land Revenue"],
].map(([scheme, awareness, department]) => ({
  scheme,
  awareness,
  department,
}));

const IPR_SOCIAL_PANEL = [
  [
    "Facebook",
    "33,538 followers",
    "Avg post reach: 4,200",
    "Engagement rate: 3.2%",
  ],
  [
    "Instagram",
    "1,46,000 followers",
    "Avg reel reach: 18,400",
    "Engagement rate: 6.8%",
  ],
  ["YouTube", "8,200 subscribers", "Avg video views: 1,840", ""],
  ["Twitter/X", "12,400 followers", "Avg impressions: 6,200", ""],
].map(([platform, audience, reach, engagement]) => ({
  platform,
  audience,
  reach,
  engagement,
}));

const IPR_LAWNGTLAI_SCHEME_GAPS = [
  ["MGNREGA", 62, 81, "-19%"],
  ["PMAY", 48, 76, "-28%"],
  ["JJM", 54, 84, "-30%"],
  ["Digital ration device PDS reform", 28, 68, "-40%"],
  ["Land Encroachment Act 2026", 8, 31, "-23%"],
  ["New ration card eligibility rules", 18, 52, "-34%"],
].map(([scheme, districtAwareness, stateAverage, gap]) => ({
  scheme,
  districtAwareness,
  stateAverage,
  gap,
}));

const IPR_LAWNGTLAI_PUBLICATIONS = [
  [
    "New encroachment act summary",
    "Government circular",
    "Mar 1, 2026",
    "⚠ 28 days overdue",
    "Mizo",
  ],
  [
    "PMAY beneficiary list",
    "Notice",
    "Feb 15, 2026",
    "⚠ 42 days overdue",
    "Mizo",
  ],
  [
    "PDS eligibility changes poster",
    "Outreach material",
    "Mar 10, 2026",
    "⚠ 19 days overdue",
    "Mizo, Chakma",
  ],
  [
    "RTI awareness leaflet",
    "Public notice",
    "Feb 1, 2026",
    "⚠ 56 days overdue",
    "Mizo",
  ],
  [
    "Q1 scheme performance report",
    "Departmental",
    "Mar 31, 2026",
    "Due in 2 days",
    "Mizo",
  ],
].map(([publication, type, dueDate, status, language]) => ({
  publication,
  type,
  dueDate,
  status,
  language,
}));

const IPR_LAWNGTLAI_OUTREACH = [
  [
    "Apr 7-11",
    "Land Encroachment Act community meeting",
    "Chawngte, Sangau",
    "Mizo + Chakma",
    "In-person",
  ],
  [
    "Apr 14-18",
    "PDS eligibility changes radio spot",
    "All",
    "Mizo + Mara",
    "AIR Lawngtlai",
  ],
  [
    "Apr 21-25",
    "PMAY beneficiary list distribution",
    "12 remote villages",
    "Mizo",
    "Physical pamphlet",
  ],
].map(([week, activity, targetVillages, language, medium]) => ({
  week,
  activity,
  targetVillages,
  language,
  medium,
}));

const PRINTING_ORDER_BREAKDOWN = [
  {
    orderType: "Official forms & registers",
    aizawl: 42,
    lunglei: 38,
    lawngtlai: 34,
    others: 41,
  },
  {
    orderType: "Government posters & circulars",
    aizawl: 28,
    lunglei: 32,
    lawngtlai: 18,
    others: 26,
  },
  {
    orderType: "ID cards & certificates",
    aizawl: 14,
    lunglei: 12,
    lawngtlai: 24,
    others: 15,
  },
  {
    orderType: "Stationery (pens, paper, files)",
    aizawl: 16,
    lunglei: 18,
    lawngtlai: 24,
    others: 18,
  },
];

const PRINTING_ORDERS = {
  lawngtlai: [
    [
      "PRN-LWT-0841",
      "Food CS",
      "PDS beneficiary forms",
      2400,
      "Feb 10",
      "Feb 24",
      "⚠ 33 days late",
      "Supply chain",
    ],
    [
      "PRN-LWT-0856",
      "Land Revenue",
      "Encroachment notice templates",
      800,
      "Mar 1",
      "Mar 15",
      "⚠ 14 days late",
      "Paper stock",
    ],
    [
      "PRN-LWT-0862",
      "DIPR",
      "Scheme awareness posters (Chakma)",
      1200,
      "Mar 10",
      "Mar 20",
      "⚠ 9 days late",
      "Translation wait",
    ],
    [
      "PRN-LWT-0871",
      "DC Office",
      "Letterheads & registers",
      400,
      "Mar 18",
      "Mar 28",
      "⚠ 1 day late",
      "In queue",
    ],
  ],
};

const PRINTING_ORDER_DETAILS = {
  "lawngtlai:PRN-LWT-0856": {
    orderId: "PRN-LWT-0856",
    orderedBy: "District Revenue Settlement Officer, Lawngtlai",
    item: "Formal eviction notice templates under Prevention of Public Land Encroachment Act 2026",
    quantity: "800 copies (A4, 2-colour letterhead)",
    ordered: "March 1, 2026",
    requiredBy: "March 15, 2026",
    currentStatus: "⚠ 14 days overdue — paper stock shortage at Aizawl press",
    delayReason:
      "Imported bond paper (80 GSM) stock exhausted at Mizoram Government Press, Aizawl. Reorder placed March 8 — ETA April 2 from supplier.",
    impact:
      "Land Revenue Lawngtlai cannot issue formal eviction notices under the new 2026 Act until forms are received. 28 cases pending this template.",
    actions: [
      "Mark as urgent",
      "Approve alternate paper stock",
      "Request partial fulfillment",
      "Contact Press",
    ],
  },
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function percentageFromFoodDistrict(district) {
  return district.monthlyDistributionTrend.at(-1);
}

function foodEfficiencyScore(district) {
  return Math.max(
    28,
    Math.min(
      99,
      (district.fpsEposEnabled / district.fpsShops) * 55 +
        (100 - district.ghostBeneficiaries / 4) * 0.18 +
        (100 - district.undistributedStockQtl / 30) * 0.27,
    ),
  );
}

function getFoodBeneficiaryBreakdown(districtId, district) {
  if (FOOD_BENEFICIARY_BREAKDOWN[districtId]) {
    return FOOD_BENEFICIARY_BREAKDOWN[districtId];
  }

  return [
    {
      cardType: "AAY (Yellow)",
      count: district.yellowCards,
      members: Math.round(district.yellowCards * 4.1),
      riceEntitlement: "35 kg/card",
      wheatEntitlement: "0",
    },
    {
      cardType: "PHH/Blue",
      count: district.blueCards,
      members: Math.round(district.blueCards * 4.2),
      riceEntitlement: "5 kg/member",
      wheatEntitlement: "0",
    },
    {
      cardType: "White (State)",
      count: district.whiteCards,
      members: Math.round(district.whiteCards * 3.2),
      riceEntitlement: "3 kg/member",
      wheatEntitlement: "1 kg/member",
    },
  ];
}

function createGenericFoodShops(districtId, district) {
  const prefix = districtId.slice(0, 3).toUpperCase();

  return [
    {
      id: `${prefix}-001`,
      shopName: `${district.name} Main FPS`,
      village: DISTRICT_META[districtId].headquarter,
      ePos:
        district.fpsEposEnabled === district.fpsShops ? "✓ Active" : "✓ Active",
      lastTransaction: "28 Mar 2025",
      stockHeld: Number((district.undistributedStockQtl / 8).toFixed(1)),
      distributionPercent: percentageFromFoodDistrict(district),
      status: "Normal",
    },
    {
      id: `${prefix}-014`,
      shopName: `${district.name} Peripheral FPS`,
      village: `${DISTRICT_META[districtId].headquarter} Rural`,
      ePos: district.smartPdsStatus === "pending" ? "✗ Offline" : "✓ Active",
      lastTransaction:
        district.smartPdsStatus === "pending" ? "08 Mar 2025" : "26 Mar 2025",
      stockHeld: Number((district.undistributedStockQtl / 4).toFixed(1)),
      distributionPercent: Math.max(
        52,
        percentageFromFoodDistrict(district) - 10,
      ),
      status: district.smartPdsStatus === "pending" ? "⚠ Review" : "—",
    },
    {
      id: `${prefix}-028`,
      shopName: `${district.name} Ridge Store`,
      village: `${DISTRICT_META[districtId].headquarter} Hill`,
      ePos: "✓ Active",
      lastTransaction: "27 Mar 2025",
      stockHeld: Number((district.undistributedStockQtl / 6).toFixed(1)),
      distributionPercent: Math.min(
        99,
        percentageFromFoodDistrict(district) + 2,
      ),
      status: "Normal",
    },
  ];
}

function buildFoodDistrictTable() {
  return Object.entries(foodBase.districts)
    .map(([districtId, district]) => ({
      districtId,
      district: district.name,
      totalBeneficiaries: district.totalBeneficiaries,
      fpsShops: district.fpsShops,
      ePosActive: district.fpsEposEnabled,
      distributionPercent: percentageFromFoodDistrict(district),
      undistributedStockQtl: district.undistributedStockQtl,
      ghostCount: district.ghostBeneficiaries,
      smartPdsStatus: district.smartPdsStatus,
      lastAudit: district.lastAudit,
      efficiencyScore: Math.round(foodEfficiencyScore(district)),
    }))
    .sort((left, right) => left.district.localeCompare(right.district));
}

function buildLandDistrictTable() {
  return Object.entries(landBase.districts)
    .map(([districtId, district]) => ({
      districtId,
      district: district.name,
      encroachmentCases: district.encroachmentCases,
      encroachmentSeverity: district.encroachmentSeverity,
      digitisedPercent: district.digitisationPercent,
      onlineTaxAdoption: district.onlineTaxAdoption,
      mutationsPending: district.mutationsPending,
    }))
    .sort((left, right) => right.encroachmentCases - left.encroachmentCases);
}

function buildLandCasesForDistrict(districtId, district) {
  const preset = LAND_CASES[districtId];

  if (preset) {
    return preset.map(
      ([caseId, location, type, areaSqFt, filed, status, severity], index) => ({
        caseId,
        location,
        type,
        areaSqFt,
        filed,
        status,
        severity,
        coords: offsetFromDistrict(districtId, index),
      }),
    );
  }

  return [
    {
      caseId: `ENC-${districtId.slice(0, 3).toUpperCase()}-0001`,
      location: `${district.name} Ward 1`,
      type: "Public Land",
      areaSqFt: 2600,
      filed: "Jan 2025",
      status: "Under notice",
      severity: district.encroachmentSeverity === "low" ? "Low" : "Medium",
      coords: offsetFromDistrict(districtId, 0),
    },
    {
      caseId: `ENC-${districtId.slice(0, 3).toUpperCase()}-0007`,
      location: `${district.name} Fringe`,
      type: "VC Land",
      areaSqFt: 4200,
      filed: "Oct 2024",
      status: "Court",
      severity:
        district.encroachmentSeverity === "critical" ? "Critical" : "High",
      coords: offsetFromDistrict(districtId, 1),
    },
    {
      caseId: `ENC-${districtId.slice(0, 3).toUpperCase()}-0014`,
      location: `${district.name} Reserve`,
      type: "Community Ground",
      areaSqFt: 1800,
      filed: "Feb 2025",
      status: "Eviction pending",
      severity: "Medium",
      coords: offsetFromDistrict(districtId, 2),
    },
  ];
}

function buildIprDistrictPerformance() {
  return Object.entries(iprBase.districts)
    .map(([districtId, district]) => ({
      districtId,
      district: district.name,
      dipro: district.diproActive ? "Active" : "Inactive",
      pressReleasesMonthly: district.pressReleasesMonthly,
      communityEvents: district.communityEventsConducted,
      digitalReach: `${district.digitalReachScore}%`,
      awarenessScore: `${district.schemeAwarenessScore}%`,
      pendingPubs: district.pendingPublications,
      status:
        district.schemeAwarenessScore < 50
          ? "⚠ Critical"
          : district.schemeAwarenessScore < 60
            ? "⚠ Low"
            : district.schemeAwarenessScore < 75
              ? "— Moderate"
              : "✓ Good",
    }))
    .sort(
      (left, right) => right.pressReleasesMonthly - left.pressReleasesMonthly,
    );
}

function buildPrintingDistrictTable() {
  return Object.entries(printingBase.districts)
    .map(([districtId, district]) => ({
      districtId,
      district: district.name,
      demandUnits: district.stationeryDemandUnits,
      suppliedUnits: district.stationerySupplied,
      fulfillmentPercent: district.fulfillmentPercent,
      ordersPending: district.printingOrdersPending,
      avgTurnaroundDays: district.avgTurnaroundDays,
      budgetUsed: `${district.budgetUtilizedPercent}%`,
      flag:
        district.fulfillmentPercent < 75
          ? "⚠ Critical"
          : district.fulfillmentPercent < 80
            ? "⚠"
            : district.fulfillmentPercent < 90
              ? "—"
              : "✓",
    }))
    .sort((left, right) => right.fulfillmentPercent - left.fulfillmentPercent);
}

function buildPrintingOrdersForDistrict(districtId, district) {
  const preset = PRINTING_ORDERS[districtId];

  if (preset) {
    return preset.map(
      (
        [orderId, department, item, qty, orderedOn, due, status, delay],
        index,
      ) => ({
        orderId,
        department,
        item,
        qty,
        orderedOn,
        due,
        status,
        delay,
        priorityRank: index + 1,
      }),
    );
  }

  return [
    {
      orderId: `PRN-${districtId.slice(0, 3).toUpperCase()}-0101`,
      department: "District Office",
      item: `${district.name} stationery restock`,
      qty: Math.round(district.stationeryDemandUnits / 18),
      orderedOn: "Mar 08",
      due: "Mar 22",
      status: district.avgTurnaroundDays > 10 ? "⚠ Late" : "In queue",
      delay: district.avgTurnaroundDays > 10 ? "Road delay" : "Routine queue",
      priorityRank: 1,
    },
    {
      orderId: `PRN-${districtId.slice(0, 3).toUpperCase()}-0109`,
      department: "Land Revenue",
      item: "Notice templates",
      qty: 420,
      orderedOn: "Mar 12",
      due: "Mar 25",
      status: "In queue",
      delay: "Press capacity",
      priorityRank: 2,
    },
  ];
}

function offsetFromDistrict(districtId, index) {
  const [lat, lng] = DISTRICT_META[districtId].center;
  const angle = index * 1.9;
  const radius = 0.025 + (index % 3) * 0.012;
  return [lat + Math.sin(angle) * radius, lng + Math.cos(angle) * radius];
}

export function getDepartmentMeta(dept) {
  return DEPARTMENTS[dept];
}

export function getHomeData() {
  return {
    alerts: HOME_CRITICAL_ALERTS,
    matrix: HOME_MATRIX,
    ticker: STATEWIDE_ALERTS,
    departmentCards: Object.values(DEPARTMENTS).map((dept) => ({
      ...dept,
      summary:
        dept.key === "food"
          ? "Distribution efficiency, beneficiary integrity, and FPS performance."
          : dept.key === "land"
            ? "Encroachment severity, digitisation, mutation backlog, and e-Ram rollout."
            : dept.key === "ipr"
              ? "Scheme awareness, DIPRO performance, publication queues, and outreach."
              : "Fulfillment, overdue print orders, and stationery supply logistics.",
    })),
  };
}

export function getFoodOverviewData() {
  return {
    meta: DEPARTMENTS.food,
    kpis: [
      {
        label: "Total NFSA beneficiaries",
        value: "11,67,024",
        trend: "—",
        href: "#district-stock-table",
        actionLabel: "District breakdown",
      },
      {
        label: "Undistributed stock",
        value: "6,550 quintals",
        trend: "▲ up from 5,820 last month",
        href: "#district-stock-table",
        actionLabel: "District stock table",
      },
      {
        label: "Ghost beneficiaries flagged",
        value: "692",
        trend: "▼ down from 1,240 (post digital ration device rollout)",
        href: "#ghost-report",
        actionLabel: "Ghost beneficiary report",
      },
      {
        label: "Smart Public Distribution System pending",
        value: "1 district",
        trend: "—",
        href: "/food/hnahthial",
        actionLabel: "Open Hnahthial",
      },
    ],
    mapDistricts: buildFoodDistrictTable().reduce((acc, row) => {
      acc[row.districtId] = {
        ...foodBase.districts[row.districtId],
        efficiencyScore: row.efficiencyScore,
      };
      return acc;
    }, {}),
    districtTable: buildFoodDistrictTable(),
    commodityAllocation: FOOD_COMMODITY_ALLOCATION,
    ePosDonut: [
      { label: "Digital ration device active", value: 1056, color: "#22c55e" },
      { label: "Offline/faulty", value: 28, color: "#ef4444" },
      { label: "Not enrolled", value: 164, color: "#f59e0b" },
    ],
    transportCosts: FOOD_TRANSPORT_COSTS,
    alerts: STATEWIDE_ALERTS.filter((item) => {
      return (
        item.includes("PDS") ||
        item.includes("Digital ration device") ||
        item.includes("Ghost")
      );
    }),
  };
}

export function getFoodDistrictData(districtId) {
  const district = foodBase.districts[districtId];

  if (!district) {
    return null;
  }

  return {
    meta: DEPARTMENTS.food,
    districtId,
    districtName: district.name,
    headerStats: [
      `${formatNumber(district.totalBeneficiaries)} total beneficiaries`,
      `${district.fpsShops} ration shops (${district.fpsEposEnabled} digital ration device active, ${district.fpsShops - district.fpsEposEnabled} offline)`,
      `Distribution rate: ${percentageFromFoodDistrict(district)}% (state avg: 89%)`,
      `${formatNumber(district.undistributedStockQtl)} qtl undistributed stock`,
      `${district.ghostBeneficiaries} ghost beneficiaries pending action`,
      `Last audit: ${district.lastAudit}`,
    ],
    breakdown: getFoodBeneficiaryBreakdown(districtId, district),
    shops:
      FOOD_FPS_SHOPS[districtId] ??
      createGenericFoodShops(districtId, district),
    totalShops: district.fpsShops,
    issues: FOOD_DISTRICT_ISSUES[districtId] ?? district.topIssues,
    monthlyTrend: district.monthlyDistributionTrend.map((value, index) => ({
      month: [
        "Oct 2024",
        "Nov 2024",
        "Dec 2024",
        "Jan 2025",
        "Feb 2025",
        "Mar 2025",
      ][index],
      value,
    })),
  };
}

export function getFoodShopData(districtId, shopId) {
  const detail = FOOD_FPS_DETAILS[`${districtId}:${shopId}`];

  if (detail) {
    return detail;
  }

  const district = getFoodDistrictData(districtId);
  const shop = district?.shops.find((entry) => entry.id === shopId);

  if (!district || !shop) {
    return null;
  }

  return {
    shopId,
    shopName: shop.shopName,
    proprietor: "Department-nominated operator",
    village: `${shop.village}, ${district.districtName}`,
    ePosDevice: shop.ePos.includes("Offline")
      ? "Device requires replacement"
      : "Installed and operational",
    coordinates: `${DISTRICT_META[districtId].center[0].toFixed(4)}° N, ${DISTRICT_META[districtId].center[1].toFixed(4)}° E`,
    beneficiariesServed: `${Math.round(shop.distributionPercent * 12)} active beneficiary households`,
    operatingSince: "2014",
    licenceRenewalDue: "December 2025",
    stockRegister: [
      {
        commodity: "Rice",
        allocated: Number((shop.stockHeld * 1.6).toFixed(1)),
        received: Number((shop.stockHeld * 1.6).toFixed(1)),
        distributed: Number((shop.stockHeld * 1.2).toFixed(1)),
        balance: shop.stockHeld,
        status: shop.status,
      },
    ],
    transactionHistory: [
      {
        date: shop.lastTransaction,
        beneficiaries: Math.round(shop.distributionPercent * 2.5),
        commodity: "Rice",
        qty: `${Number((shop.stockHeld / 2).toFixed(1))} qtl`,
        authMethod: shop.ePos.includes("Offline")
          ? "Manual register"
          : "biometric device",
      },
    ],
    ghostFlags: [],
    actions: [
      "Flag for Audit",
      "Suspend Distribution",
      "Transfer Stock",
      "Contact DCSO",
    ],
  };
}

export function getLandOverviewData() {
  return {
    meta: DEPARTMENTS.land,
    kpis: [
      {
        label: "Total encroachment cases",
        value: "1,344",
        trend: "▲ +18% vs 2024",
        href: "#encroachment-cases",
        actionLabel: "Full case list",
      },
      {
        label: "Mutations pending",
        value: "4,062",
        trend: "▼ -8% (post e-Ram)",
        href: "#encroachment-cases",
        actionLabel: "Pending queue",
      },
      {
        label: "Avg digitisation",
        value: "74%",
        trend: "▲ from 61% in 2023",
        href: "#digitisation-progress",
        actionLabel: "District digitisation table",
      },
      {
        label: "Online tax adoption",
        value: "38%",
        trend: "▲ new (launched 2025)",
        href: "#tax-adoption",
        actionLabel: "Adoption breakdown",
      },
    ],
    districtTable: buildLandDistrictTable(),
    encroachmentBreakdown: [
      { label: "Public land", value: 558, color: "#ef4444" },
      { label: "Village council land", value: 464, color: "#f97316" },
      { label: "Community grounds", value: 322, color: "#f59e0b" },
    ],
    digitisationProgress: buildLandDistrictTable().map((row) => ({
      districtId: row.districtId,
      district: row.district,
      digitisedPercent: row.digitisedPercent,
      recordsDone: landBase.districts[row.districtId].landPassesDigitised,
      recordsRemaining:
        landBase.districts[row.districtId].landPassesTotal -
        landBase.districts[row.districtId].landPassesDigitised,
    })),
    eramRollout: LAND_ERAM_ROLLOUT,
    actMilestones: LAND_ACT_MILESTONES,
    alerts: STATEWIDE_ALERTS.filter((item) => {
      return (
        item.includes("Encroachment") ||
        item.includes("e-Ram") ||
        item.includes("Mutation") ||
        item.includes("land tax")
      );
    }),
  };
}

export function getLandDistrictData(districtId) {
  const district = landBase.districts[districtId];

  if (!district) {
    return null;
  }

  return {
    meta: DEPARTMENTS.land,
    districtId,
    districtName: district.name,
    summaryBadge: district.encroachmentSeverity.toUpperCase(),
    summaryText: `${district.encroachmentCases} encroachment cases, ${district.digitisationPercent}% digitisation, mutations backlog ${district.mutationsPending}`,
    cases: buildLandCasesForDistrict(districtId, district),
    caseTotal: district.encroachmentCases,
    mutationBacklog: LAND_MUTATION_BACKLOG[districtId] ?? [
      {
        type: "Transfer of ownership",
        pending: district.mutationsPending,
        avgAge: 36,
        oldestCase: "Oct 2023",
        targetClearance: "Q3 2025",
      },
    ],
    landBank: LAND_BANK_DETAILS[districtId] ?? [
      {
        category: "Total land bank",
        totalAcres: district.landBankAcres,
        allocated: district.landBankAcres - district.landBankAvailable,
        available: district.landBankAvailable,
        reservedForGovt: "—",
      },
    ],
    onlineTax: {
      taxablePlots: district.landPassesTotal,
      onlinePayments: Math.round(
        district.landPassesTotal * (district.onlineTaxAdoption / 100),
      ),
      offlinePayments: Math.round(district.landPassesTotal * 0.37),
      unpaid: Math.max(
        0,
        district.landPassesTotal -
          Math.round(
            district.landPassesTotal * (district.onlineTaxAdoption / 100),
          ) -
          Math.round(district.landPassesTotal * 0.37),
      ),
    },
    revenueTrend: LAND_REVENUE_TREND[districtId] ?? [],
    districtFeature: DISTRICT_META[districtId].feature,
  };
}

export function getLandCaseData(districtId, caseId) {
  const detail = LAND_CASE_DETAILS[`${districtId}:${caseId}`];

  if (detail) {
    return detail;
  }

  const districtData = getLandDistrictData(districtId);
  const caseRow = districtData?.cases.find((entry) => entry.caseId === caseId);

  if (!districtData || !caseRow) {
    return null;
  }

  return {
    caseId,
    title: caseRow.location,
    filed: caseRow.filed,
    location: `${caseRow.location}, ${districtData.districtName}`,
    landType: caseRow.type,
    area: `${formatNumber(caseRow.areaSqFt)} sq ft`,
    encroacher: "Operational record",
    applicableAct: "Prevention of Public Land Encroachment Act 2026",
    penaltyApplicable: "Penalty to be assessed by district authority",
    currentStatus: caseRow.status,
    timeline: [],
    surveyData: [],
    actions: [
      "Issue Eviction Notice",
      "Apply Penalty",
      "Assign Field Officer",
      "Mark Resolved",
      "Escalate to DC",
    ],
  };
}

export function getIprOverviewData() {
  return {
    meta: DEPARTMENTS.ipr,
    kpis: [
      {
        label: "Avg scheme awareness score",
        value: "67%",
        trend: "▲ +4% vs Q4 2024",
        href: "#district-performance",
        actionLabel: "District breakdown",
      },
      {
        label: "Total pending publications",
        value: "79",
        trend: "▼ -12 cleared this month",
        href: "#district-performance",
        actionLabel: "Publication queue",
      },
      {
        label: "Active schemes being promoted",
        value: "24",
        trend: "—",
        href: "#district-performance",
        actionLabel: "Scheme list",
      },
      {
        label: "RTI applications (statewide)",
        value: "148/month",
        trend: "▲ +22%",
        href: "#district-performance",
        actionLabel: "RTI log",
      },
    ],
    districtPerformance: buildIprDistrictPerformance(),
    topSchemes: IPR_TOP_SCHEMES,
    socialPanel: IPR_SOCIAL_PANEL,
    alerts: STATEWIDE_ALERTS.filter((item) => {
      return (
        item.includes("awareness") ||
        item.includes("Publication") ||
        item.includes("Instagram") ||
        item.includes("scheme")
      );
    }),
  };
}

export function getIprDistrictData(districtId) {
  const district = iprBase.districts[districtId];

  if (!district) {
    return null;
  }

  return {
    meta: DEPARTMENTS.ipr,
    districtId,
    districtName: district.name,
    factors:
      districtId === "lawngtlai"
        ? [
            [
              "Local media outlets",
              "Only 4 (vs 18 in Aizawl)",
              "Very limited reach",
            ],
            [
              "Language diversity",
              "3 languages (Mizo, Chakma, Mara) — content only in Mizo",
              "~38% population missed",
            ],
            [
              "Digital penetration",
              "32% reach score — poor smartphone/internet coverage",
              "Digital campaigns fail",
            ],
            [
              "DIPRO staffing",
              "2 staff (understaffed vs 8 in Aizawl)",
              "Output limited",
            ],
            [
              "Road accessibility",
              "6 villages unreachable during monsoon",
              "In-person outreach impossible",
            ],
          ].map(([factor, detail, impact]) => ({ factor, detail, impact }))
        : [
            {
              factor: "Media footprint",
              detail: `${district.localMediaOutlets} active outlets in district`,
              impact:
                district.localMediaOutlets < 5
                  ? "Coverage constrained"
                  : "Reach manageable",
            },
            {
              factor: "Language coverage",
              detail: district.languageCoverage.join(", "),
              impact:
                district.languageCoverage.length > 1
                  ? "Needs multilingual material"
                  : "Single-language workflow",
            },
          ],
    schemeBreakdown:
      districtId === "lawngtlai"
        ? IPR_LAWNGTLAI_SCHEME_GAPS
        : IPR_TOP_SCHEMES.map((entry) => ({
            scheme: entry.scheme,
            districtAwareness: Math.max(
              18,
              district.schemeAwarenessScore - 6 + Math.round(Math.random() * 8),
            ),
            stateAverage: entry.awareness,
            gap: `${Math.max(-40, district.schemeAwarenessScore - entry.awareness)}%`,
          })),
    publications:
      districtId === "lawngtlai"
        ? IPR_LAWNGTLAI_PUBLICATIONS
        : [
            {
              publication: `${district.name} district outreach bulletin`,
              type: "Departmental",
              dueDate: "Apr 05, 2026",
              status: "In queue",
              language: district.languageCoverage.join(", "),
            },
          ],
    outreachCalendar:
      districtId === "lawngtlai"
        ? IPR_LAWNGTLAI_OUTREACH
        : [
            {
              week: "Apr 07-11",
              activity: "District scheme awareness round",
              targetVillages: DISTRICT_META[districtId].headquarter,
              language: district.languageCoverage.join(", "),
              medium: "Mixed",
            },
          ],
  };
}

export function getPrintingOverviewData() {
  return {
    meta: DEPARTMENTS.printing,
    kpis: [
      {
        label: "Avg fulfillment rate",
        value: "89%",
        trend: "—",
        href: "#district-fulfillment",
        actionLabel: "District breakdown",
      },
      {
        label: "Pending print orders",
        value: "74",
        trend: "—",
        href: "#district-fulfillment",
        actionLabel: "Order queue",
      },
      {
        label: "Budget utilised (YTD)",
        value: "74% of Rs 480 lakh",
        trend: "—",
        href: "#district-fulfillment",
        actionLabel: "Budget breakdown",
      },
      {
        label: "Overdue orders (>10 days)",
        value: "18 orders",
        trend: "—",
        href: "#district-fulfillment",
        actionLabel: "Overdue list",
      },
    ],
    districtFulfillment: buildPrintingDistrictTable(),
    orderTypeBreakdown: PRINTING_ORDER_BREAKDOWN,
    alerts: STATEWIDE_ALERTS.filter((item) => {
      return (
        item.includes("Order") ||
        item.includes("printing") ||
        item.includes("Press") ||
        item.includes("paper")
      );
    }),
  };
}

export function getPrintingDistrictData(districtId) {
  const district = printingBase.districts[districtId];

  if (!district) {
    return null;
  }

  return {
    meta: DEPARTMENTS.printing,
    districtId,
    districtName: district.name,
    pendingOrders: buildPrintingOrdersForDistrict(districtId, district),
    rootCauses:
      districtId === "lawngtlai"
        ? [
            "Road access: 8 delivery days lost to road blockages in Q1 2025",
            "Paper stock: Central press ran out of A4 bond paper — 12-day restock delay",
            "Translation: Chakma-language materials need external translator (avg 7-day wait)",
            "Staff: Lawngtlai sub-depot has 1 staff (vs recommended 3)",
          ]
        : [
            "Press capacity being allocated across departments",
            "District dispatch cycle affects turnaround",
          ],
  };
}

export function getPrintingOrderData(districtId, orderId) {
  const detail = PRINTING_ORDER_DETAILS[`${districtId}:${orderId}`];

  if (detail) {
    return detail;
  }

  const district = getPrintingDistrictData(districtId);
  const order = district?.pendingOrders.find(
    (entry) => entry.orderId === orderId,
  );

  if (!district || !order) {
    return null;
  }

  return {
    orderId,
    orderedBy: order.department,
    item: order.item,
    quantity: `${order.qty} units`,
    ordered: order.orderedOn,
    requiredBy: order.due,
    currentStatus: order.status,
    delayReason: order.delay,
    impact:
      "Order affects district service delivery and administrative continuity.",
    actions: [
      "Mark as urgent",
      "Approve alternate paper stock",
      "Request partial fulfillment",
      "Contact Press",
    ],
  };
}
