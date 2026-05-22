"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from "recharts";
import type { ChartDataPoint } from "@/features/dashboard/api/dashboard.types";

interface CallLogsChartProps {
  data?: ChartDataPoint[];
}

const FALLBACK: ChartDataPoint[] = [
  { name: "Mon", value: 0 },
  { name: "Tue", value: 0 },
  { name: "Wed", value: 0 },
  { name: "Thu", value: 0 },
  { name: "Fri", value: 0 },
  { name: "Sat", value: 0 },
  { name: "Sun", value: 0 },
];

export default function CallLogsChart({ data }: CallLogsChartProps) {
  const chartData = data && data.length > 0 ? data : FALLBACK;

  // Highlight the bar with the highest value
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="h-[230px] min-w-0 w-full">
      <BarChart
        width={700}
        height={230}
        data={chartData}
        margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
        style={{ outline: "none" }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
          tickCount={4}
        />
        <Tooltip
          cursor={{ fill: "rgba(241,245,249,0.6)" }}
          contentStyle={{
            borderRadius: "10px",
            border: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={28}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.value === maxValue && maxValue > 0 ? "#3B82F6" : "#BFDBFE"}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
