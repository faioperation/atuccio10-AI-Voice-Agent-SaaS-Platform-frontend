"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import type { ChartDataPoint } from "@/features/dashboard/api/dashboard.types";

interface LeadsChartProps {
  thisWeek?: ChartDataPoint[];
  lastWeek?: ChartDataPoint[];
}

interface MergedPoint {
  name: string;
  thisWeek: number;
  lastWeek: number;
}

function mergeWeeklyData(thisWeek: ChartDataPoint[], lastWeek: ChartDataPoint[]): MergedPoint[] {
  const maxLen = Math.max(thisWeek.length, lastWeek.length);
  return Array.from({ length: maxLen }, (_, i) => ({
    name: thisWeek[i]?.name ?? lastWeek[i]?.name ?? `Day ${i + 1}`,
    thisWeek: thisWeek[i]?.value ?? 0,
    lastWeek: lastWeek[i]?.value ?? 0,
  }));
}

const FALLBACK: MergedPoint[] = [
  { name: "Mon", thisWeek: 0, lastWeek: 0 },
  { name: "Tue", thisWeek: 0, lastWeek: 0 },
  { name: "Wed", thisWeek: 0, lastWeek: 0 },
  { name: "Thu", thisWeek: 0, lastWeek: 0 },
  { name: "Fri", thisWeek: 0, lastWeek: 0 },
  { name: "Sat", thisWeek: 0, lastWeek: 0 },
  { name: "Sun", thisWeek: 0, lastWeek: 0 },
];

export default function LeadsChart({ thisWeek, lastWeek }: LeadsChartProps) {
  const chartData =
    thisWeek && lastWeek && (thisWeek.length > 0 || lastWeek.length > 0)
      ? mergeWeeklyData(thisWeek, lastWeek)
      : FALLBACK;

  return (
    <div className="h-[230px] min-w-0 w-full">
      <AreaChart
        width={700}
        height={230}
        data={chartData}
        margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.14} />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

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
          contentStyle={{
            borderRadius: "10px",
            border: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            fontSize: "12px",
          }}
        />

        <Area
          type="monotone"
          dataKey="lastWeek"
          stroke="#CBD5E1"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="transparent"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="thisWeek"
          stroke="#3B82F6"
          strokeWidth={2}
          fill="url(#colorThis)"
          dot={false}
        />
      </AreaChart>
    </div>
  );
}
