"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { ALERTS, buildSimulatedDatasets } from "@/lib/simulation";

export function useSimulation() {
  const [tick, setTick] = useState(0);
  const [alertIndex, setAlertIndex] = useState(0);
  const advanceData = useEffectEvent(() => {
    setTick((current) => current + 1);
  });
  const advanceAlert = useEffectEvent(() => {
    setAlertIndex((current) => (current + 1) % ALERTS.length);
  });

  useEffect(() => {
    const dataTimer = window.setInterval(() => {
      advanceData();
    }, 10000);

    const alertTimer = window.setInterval(() => {
      advanceAlert();
    }, 12000);

    return () => {
      window.clearInterval(dataTimer);
      window.clearInterval(alertTimer);
    };
  }, [advanceAlert, advanceData]);

  return {
    datasets: buildSimulatedDatasets(tick),
    alerts: ALERTS,
    alertIndex,
  };
}
