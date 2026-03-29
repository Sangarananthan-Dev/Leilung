const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatPercent(value) {
  return `${value}%`;
}

function titleCase(value) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildPrintingTrend(district) {
  const series = [-6, -4, -2, 0, 1, 0].map((offset, index) => ({
    label: MONTHS[index],
    value: Math.max(58, Math.min(99, district.fulfillmentPercent + offset)),
  }));

  return {
    title: "Fulfillment trend",
    unit: "%",
    data: series,
  };
}

export const DEPARTMENT_CONFIG = {
  food: {
    id: "food",
    label: "Food & PDS",
    accent: "#f59e0b",
    primaryLayer: "pdsCoverage",
    layerOptions: [
      { key: "pdsCoverage", label: "PDS coverage" },
      { key: "fpsShops", label: "FPS shop markers" },
      { key: "ghostBeneficiaries", label: "Ghost hotspots" },
      { key: "smartPdsStatus", label: "Smart PDS status" },
    ],
    getFillColor(district) {
      if (typeof district.efficiencyScore === "number") {
        if (district.efficiencyScore >= 92) {
          return "#22c55e";
        }

        if (district.efficiencyScore >= 82) {
          return "#f59e0b";
        }

        if (district.efficiencyScore >= 70) {
          return "#f97316";
        }

        return "#ef4444";
      }

      return {
        active: "#f59e0b",
        partial: "#f97316",
        pending: "#ef4444",
      }[district.smartPdsStatus];
    },
    getTooltipMetric(district) {
      if (typeof district.efficiencyScore === "number") {
        return `Efficiency score ${district.efficiencyScore} · ${formatNumber(district.undistributedStockQtl)} qtl pending`;
      }

      return `${titleCase(district.smartPdsStatus)} Smart PDS · ${formatNumber(district.undistributedStockQtl)} qtl pending`;
    },
    buildKpis(dataset) {
      return [
        {
          iconKey: "users",
          label: "Total beneficiaries",
          value: formatNumber(1167624),
          hint: "Statewide cardholders under PDS",
          tone: "neutral",
        },
        {
          iconKey: "package",
          label: "Undistributed stock",
          value: `${formatNumber(dataset.stateSummary.totalUndistributedQtl)} qtl`,
          hint: "Red threshold above 5,000 qtl",
          tone:
            dataset.stateSummary.totalUndistributedQtl > 5000
              ? "danger"
              : "warning",
        },
        {
          iconKey: "scan",
          label: "Smart PDS pending",
          value: String(dataset.stateSummary.pendingSmartPdsDistricts.length),
          hint: dataset.stateSummary.pendingSmartPdsDistricts.join(", "),
          tone: "warning",
        },
        {
          iconKey: "alert",
          label: "Ghost beneficiaries",
          value: formatNumber(dataset.stateSummary.totalGhostBeneficiaries),
          hint: "Pending district verification",
          tone: "danger",
        },
      ];
    },
    buildDistrictView(district) {
      return {
        summary: `${district.totalBeneficiaries.toLocaleString("en-IN")} beneficiaries across ${district.fpsShops} FPS shops.`,
        status: {
          label: `Smart PDS ${titleCase(district.smartPdsStatus)}`,
          tone:
            district.smartPdsStatus === "pending"
              ? "danger"
              : district.smartPdsStatus === "partial"
                ? "warning"
                : "success",
        },
        facts: [
          {
            label: "e-PoS enabled",
            value: `${district.fpsEposEnabled}/${district.fpsShops}`,
            tone: "info",
          },
          {
            label: "Undistributed stock",
            value: `${formatNumber(district.undistributedStockQtl)} qtl`,
            tone: "warning",
          },
          {
            label: "Ghost beneficiaries",
            value: formatNumber(district.ghostBeneficiaries),
            tone: "danger",
          },
          {
            label: "Avg distribution",
            value: `${district.avgDistributionDays} days`,
            tone: "success",
          },
          {
            label: "Subsidy spend",
            value: `${formatNumber(district.subsidySpendLakh)} lakh`,
            tone: "neutral",
          },
          { label: "Last audit", value: district.lastAudit, tone: "neutral" },
        ],
        notes: district.topIssues,
      };
    },
    buildChart(district) {
      return {
        title: "Monthly distribution efficiency",
        unit: "%",
        data: district.monthlyDistributionTrend.map((value, index) => ({
          label: MONTHS[index],
          value,
        })),
      };
    },
  },
  land: {
    id: "land",
    label: "Land Revenue",
    accent: "#22c55e",
    primaryLayer: "encroachmentHeatmap",
    layerOptions: [
      { key: "encroachmentHeatmap", label: "Encroachment heatmap" },
      { key: "mutationPending", label: "Mutation pending" },
      { key: "landBankAvailability", label: "Land Bank availability" },
      { key: "eRamStatus", label: "e-Ram status" },
    ],
    getFillColor(district) {
      return {
        low: "#22c55e",
        medium: "#f59e0b",
        high: "#f97316",
        critical: "#ef4444",
      }[district.encroachmentSeverity];
    },
    getTooltipMetric(district) {
      return `${titleCase(district.encroachmentSeverity)} severity · ${formatNumber(district.encroachmentCases)} encroachment cases`;
    },
    buildKpis(dataset) {
      return [
        {
          iconKey: "landmark",
          label: "Encroachment cases",
          value: formatNumber(dataset.stateSummary.totalEncroachmentCases),
          hint: "Highest enforcement priority",
          tone: "danger",
        },
        {
          iconKey: "clipboard",
          label: "Mutations pending",
          value: formatNumber(dataset.stateSummary.totalMutationsPending),
          hint: "Backlog awaiting settlement",
          tone: "warning",
        },
        {
          iconKey: "chart",
          label: "Avg digitisation",
          value: formatPercent(dataset.stateSummary.avgDigitisation),
          hint: "District land pass records digitised",
          tone: "success",
        },
        {
          iconKey: "map",
          label: "e-Ram coverage",
          value: "1 of 11",
          hint: "Pilot active only in Aizawl",
          tone: "info",
        },
      ];
    },
    buildDistrictView(district) {
      return {
        summary: `${formatNumber(district.landPassesDigitised)} of ${formatNumber(district.landPassesTotal)} land passes digitised, with ${formatNumber(district.encroachmentCases)} active encroachment cases.`,
        status: {
          label: `${titleCase(district.encroachmentSeverity)} encroachment`,
          tone:
            district.encroachmentSeverity === "critical"
              ? "danger"
              : district.encroachmentSeverity === "high"
                ? "warning"
                : "success",
        },
        facts: [
          {
            label: "Digitisation",
            value: formatPercent(district.digitisationPercent),
            tone: "success",
          },
          {
            label: "Mutations pending",
            value: formatNumber(district.mutationsPending),
            tone: "warning",
          },
          {
            label: "Mutations resolved",
            value: formatNumber(district.mutationsResolved),
            tone: "info",
          },
          {
            label: "Land Bank available",
            value: `${formatNumber(district.landBankAvailable)} acres`,
            tone: "success",
          },
          {
            label: "Tax adoption",
            value: formatPercent(district.onlineTaxAdoption),
            tone: "info",
          },
          { label: "Last survey", value: district.lastSurvey, tone: "neutral" },
        ],
        notes: [
          `${formatNumber(district.publicLandEncroachments)} public land encroachments tracked.`,
          `e-Ram status: ${titleCase(district.eRamStatus)}.`,
          `${formatNumber(district.landDisputesCourt)} disputes currently in court.`,
        ],
      };
    },
    buildChart(district) {
      return {
        title: "Monthly mutation disposal",
        unit: "cases",
        data: district.monthlyMutationTrend.map((value, index) => ({
          label: MONTHS[index],
          value,
        })),
      };
    },
  },
  ipr: {
    id: "ipr",
    label: "Information & PR",
    accent: "#60a5fa",
    primaryLayer: "awarenessScore",
    layerOptions: [
      { key: "awarenessScore", label: "Awareness score" },
      { key: "diproActivity", label: "DIPRO activity" },
      { key: "mediaOutlets", label: "Media outlets" },
      { key: "rtiApplications", label: "RTI applications" },
    ],
    getFillColor(district) {
      if (district.schemeAwarenessScore < 50) {
        return "#ef4444";
      }

      if (district.schemeAwarenessScore < 70) {
        return "#f59e0b";
      }

      return "#3b82f6";
    },
    getTooltipMetric(district) {
      return `${district.schemeAwarenessScore}% awareness · ${district.digitalReachScore}% digital reach`;
    },
    buildKpis(dataset) {
      return [
        {
          iconKey: "chart",
          label: "Avg awareness score",
          value: formatPercent(dataset.stateSummary.avgAwarenessScore),
          hint: "Scheme comprehension across districts",
          tone: "info",
        },
        {
          iconKey: "radio",
          label: "Digital reach score",
          value: formatPercent(dataset.stateSummary.avgDigitalReach),
          hint: "Broadcast and social penetration",
          tone: "info",
        },
        {
          iconKey: "files",
          label: "Pending publications",
          value: formatNumber(dataset.stateSummary.totalPendingPublications),
          hint: "Editorial backlog awaiting release",
          tone: "warning",
        },
        {
          iconKey: "alert",
          label: "Low-awareness districts",
          value: String(dataset.stateSummary.lowAwarenessDistricts.length),
          hint: dataset.stateSummary.lowAwarenessDistricts.join(", "),
          tone: "danger",
        },
      ];
    },
    buildDistrictView(district) {
      return {
        summary: `${district.pressReleasesMonthly} monthly press releases and a ${district.digitalReachScore}% digital reach score.`,
        status: {
          label: district.diproActive ? "DIPRO Active" : "DIPRO Offline",
          tone: district.diproActive ? "success" : "danger",
        },
        facts: [
          {
            label: "Awareness score",
            value: formatPercent(district.schemeAwarenessScore),
            tone: "info",
          },
          {
            label: "Campaigns",
            value: formatNumber(district.governmentAdsCampaigns),
            tone: "neutral",
          },
          {
            label: "RTI monthly",
            value: formatNumber(district.rtiApplicationsMonthly),
            tone: "warning",
          },
          {
            label: "Community events",
            value: formatNumber(district.communityEventsConducted),
            tone: "success",
          },
          {
            label: "Media outlets",
            value: formatNumber(district.localMediaOutlets),
            tone: "info",
          },
          {
            label: "Pending publications",
            value: formatNumber(district.pendingPublications),
            tone: "warning",
          },
        ],
        notes: [
          `Languages covered: ${district.languageCoverage.join(", ")}.`,
          `${district.pressReleasesMonthly} press releases published this month.`,
        ],
      };
    },
    buildChart(district) {
      return {
        title: "Monthly digital reach",
        unit: "%",
        data: district.monthlyReachTrend.map((value, index) => ({
          label: MONTHS[index],
          value,
        })),
      };
    },
  },
  printing: {
    id: "printing",
    label: "Printing",
    accent: "#a78bfa",
    primaryLayer: "fulfillmentRate",
    layerOptions: [
      { key: "fulfillmentRate", label: "Fulfillment rate" },
      { key: "pendingOrders", label: "Pending orders" },
      { key: "budgetUtilization", label: "Budget utilization" },
    ],
    getFillColor(district) {
      if (district.fulfillmentPercent < 75) {
        return "#ef4444";
      }

      if (district.fulfillmentPercent < 90) {
        return "#f59e0b";
      }

      return "#a78bfa";
    },
    getTooltipMetric(district) {
      return `${district.fulfillmentPercent}% fulfilled · ${district.printingOrdersPending} orders pending`;
    },
    buildKpis(dataset) {
      return [
        {
          iconKey: "printer",
          label: "Avg fulfillment",
          value: formatPercent(dataset.stateSummary.avgFulfillment),
          hint: "District stationery supply performance",
          tone: "violet",
        },
        {
          iconKey: "clipboard",
          label: "Pending orders",
          value: formatNumber(dataset.stateSummary.totalPendingOrders),
          hint: "Statewide print backlog",
          tone: "warning",
        },
        {
          iconKey: "chart",
          label: "Budget utilised",
          value: formatPercent(dataset.stateSummary.totalBudgetUtilized),
          hint: "Annual department budget usage",
          tone: "violet",
        },
        {
          iconKey: "map",
          label: "Underserved districts",
          value: String(dataset.stateSummary.underservedDistricts.length),
          hint: dataset.stateSummary.underservedDistricts.join(", "),
          tone: "danger",
        },
      ];
    },
    buildDistrictView(district) {
      return {
        summary: `${formatNumber(district.stationerySupplied)} of ${formatNumber(district.stationeryDemandUnits)} units supplied with ${district.printingOrdersPending} orders still pending.`,
        status: {
          label: `${district.fulfillmentPercent}% fulfilled`,
          tone:
            district.fulfillmentPercent < 75
              ? "danger"
              : district.fulfillmentPercent < 90
                ? "warning"
                : "violet",
        },
        facts: [
          {
            label: "Demand",
            value: formatNumber(district.stationeryDemandUnits),
            tone: "neutral",
          },
          {
            label: "Supplied",
            value: formatNumber(district.stationerySupplied),
            tone: "success",
          },
          {
            label: "Pending orders",
            value: formatNumber(district.printingOrdersPending),
            tone: "warning",
          },
          {
            label: "Completed orders",
            value: formatNumber(district.printingOrdersCompleted),
            tone: "info",
          },
          {
            label: "Turnaround",
            value: `${district.avgTurnaroundDays} days`,
            tone: "neutral",
          },
          {
            label: "Budget utilized",
            value: formatPercent(district.budgetUtilizedPercent),
            tone: "violet",
          },
        ],
        notes: [
          `Fulfillment performance is ${district.fulfillmentPercent}% this cycle.`,
        ],
      };
    },
    buildChart(district) {
      return buildPrintingTrend(district);
    },
  },
};

export const INITIAL_LAYER_STATE = Object.fromEntries(
  Object.entries(DEPARTMENT_CONFIG).map(([key, config]) => [
    key,
    Object.fromEntries(
      config.layerOptions.map((option) => [
        option.key,
        option.key !== "smartPdsStatus" &&
          option.key !== "landBankAvailability" &&
          option.key !== "mediaOutlets" &&
          option.key !== "rtiApplications" &&
          option.key !== "budgetUtilization",
      ]),
    ),
  ]),
);
