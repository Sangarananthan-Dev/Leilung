"use client";

import { ChartColumn } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartTooltip({ active, payload, unit }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[rgba(9,16,11,0.94)] px-3 py-2 shadow-2xl">
      <p className="mono text-sm text-white">
        {payload[0].value}
        {unit}
      </p>
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
        {payload[0].payload.label}
      </p>
    </div>
  );
}

export function DeptChart({ activeDept, config, district }) {
  if (!district) {
    return (
      <section className="surface-card rounded-[1.75rem] p-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-2xl border border-white/8 bg-black/10 p-2.5">
            <ChartColumn className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-white">Monthly trend</p>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Select a district
            </p>
          </div>
        </div>
        <div className="rounded-[1.4rem] border border-dashed border-white/10 bg-black/10 px-4 py-10 text-center text-sm text-[var(--text-muted)]">
          The chart activates once a district is selected.
        </div>
      </section>
    );
  }

  const chart = config.buildChart(district);
  const isPrinting = activeDept === "printing";

  return (
    <section className="surface-card rounded-[1.75rem] p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-2xl border border-white/8 bg-black/10 p-2.5">
          <ChartColumn className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-white">{chart.title}</p>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
            {district.name}
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {isPrinting
            ? <BarChart data={chart.data}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  dataKey="label"
                  tick={{ fill: "#93aa96", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  tick={{ fill: "#93aa96", fontSize: 12 }}
                  tickLine={false}
                />
                <Tooltip
                  content={<ChartTooltip unit={chart.unit} />}
                  cursor={false}
                />
                <Bar
                  dataKey="value"
                  fill={config.accent}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            : <AreaChart data={chart.data}>
                <defs>
                  <linearGradient
                    id={`${activeDept}-fill`}
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={config.accent}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor={config.accent}
                      stopOpacity={0.06}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  dataKey="label"
                  tick={{ fill: "#93aa96", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  tick={{ fill: "#93aa96", fontSize: 12 }}
                  tickLine={false}
                />
                <Tooltip
                  content={<ChartTooltip unit={chart.unit} />}
                  cursor={false}
                />
                <Area
                  dataKey="value"
                  fill={`url(#${activeDept}-fill)`}
                  stroke={config.accent}
                  strokeWidth={3}
                  type="monotone"
                />
              </AreaChart>}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
