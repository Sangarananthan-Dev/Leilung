"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartBody({ data, keys, type, xKey }) {
  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={62}
            outerRadius={96}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} stroke="#93aa96" tickLine={false} />
          <YAxis stroke="#93aa96" tickLine={false} />
          <Tooltip />
          <Legend />
          {keys.map((key) => (
            <Bar
              key={key.key}
              dataKey={key.key}
              fill={key.color}
              name={key.label}
              radius={[10, 10, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} stroke="#93aa96" tickLine={false} />
          <YAxis stroke="#93aa96" tickLine={false} />
          <Tooltip />
          <Legend />
          {keys.map((key) => (
            <Area
              key={key.key}
              dataKey={key.key}
              fill={key.color}
              fillOpacity={0.2}
              name={key.label}
              stroke={key.color}
              type="monotone"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey={xKey} stroke="#93aa96" tickLine={false} />
        <YAxis stroke="#93aa96" tickLine={false} />
        <Tooltip />
        <Legend />
        {keys.map((key) => (
          <Line
            key={key.key}
            dataKey={key.key}
            dot={{ fill: key.color, r: 4 }}
            name={key.label}
            stroke={key.color}
            strokeWidth={2.5}
            type="monotone"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function InsightChart({ data, keys, subtitle, title, type, xKey }) {
  return (
    <div className="surface-card rounded-[1.75rem] p-5">
      <div className="mb-4">
        <p className="text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">
          {title}
        </p>
        {subtitle
          ? <p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">
              {subtitle}
            </p>
          : null}
      </div>

      <ChartBody data={data} keys={keys} type={type} xKey={xKey} />
    </div>
  );
}
