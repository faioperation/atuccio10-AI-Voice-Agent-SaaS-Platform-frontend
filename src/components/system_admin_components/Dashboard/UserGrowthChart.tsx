"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const usersData = [
  { name: "1 Jan", thisMonth: 140, lastMonth: 200 },
  { name: "5 Jan", thisMonth: 190, lastMonth: 170 },
  { name: "10 Jan", thisMonth: 155, lastMonth: 185 },
  { name: "15 Jan", thisMonth: 290, lastMonth: 155 },
  { name: "20 Jan", thisMonth: 245, lastMonth: 165 },
  { name: "25 Jan", thisMonth: 260, lastMonth: 195 },
  { name: "30 Jan", thisMonth: 295, lastMonth: 175 },
];

const UserGrowthChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm p-6 min-w-0">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[14px] font-bold text-[#0C1824]">Total Users Growth</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] inline-block" />
            <span className="text-[11px] text-[#64748B] font-medium">This Month</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#CBD5E1] inline-block" />
            <span className="text-[11px] text-[#64748B] font-medium">Last Month</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={usersData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="lastMonth"
              stroke="#CBD5E1"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="transparent"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="thisMonth"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#colorUsers)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;
