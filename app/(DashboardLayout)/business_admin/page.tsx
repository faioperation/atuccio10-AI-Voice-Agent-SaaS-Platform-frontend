"use client";
import React from "react";
import { Users, PhoneCall, BarChart3, CalendarCheck } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import StatsCard from "@/components/Dashboard/StatsCard";
import RecentCalls from "@/components/Dashboard/RecentCalls";
import Notifications from "@/components/Dashboard/Notifications";

const leadsData = [
  { name: "1 Jan",  thisMonth: 140, lastMonth: 200 },
  { name: "5 Jan",  thisMonth: 190, lastMonth: 170 },
  { name: "10 Jan", thisMonth: 155, lastMonth: 185 },
  { name: "15 Jan", thisMonth: 290, lastMonth: 155 },
  { name: "20 Jan", thisMonth: 245, lastMonth: 165 },
  { name: "25 Jan", thisMonth: 260, lastMonth: 195 },
  { name: "30 Jan", thisMonth: 295, lastMonth: 175 },
];

const callLogsData = [
  { name: "Mon", value: 155 },
  { name: "Tue", value: 265 },
  { name: "Wed", value: 205 },
  { name: "Thu", value: 215 },
  { name: "Fri", value: 305 },
  { name: "Sat", value: 115 },
  { name: "Sun", value: 210 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatsCard
          title="Total Leads"
          value="85"
          trend="20.2%"
          isUp
          icon={Users}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />
        <StatsCard
          title="Total Call"
          value="120"
          trend="30.5%"
          isUp
          icon={PhoneCall}
          iconBg="#D1FAE5"
          iconColor="#16A34A"
        />
        <StatsCard
          title="Conversion Rate"
          value="90%"
          trend="5.2%"
          isUp={false}
          icon={BarChart3}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />
        <StatsCard
          title="Book Appointment"
          value="25"
          trend="2.2%"
          isUp
          icon={CalendarCheck}
          iconBg="#DBEAFE"
          iconColor="#1A6BDC"
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Total Leads — Area Chart */}
        <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm p-6 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[14px] font-bold text-[#0C1824]">Total Leads</h3>
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
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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
                  fill="url(#colorThis)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Call Logs — Bar Chart */}
        <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm p-6 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[14px] font-bold text-[#0C1824]">Call Logs</h3>
            <div className="relative">
              <select
                className="
                  appearance-none text-[12px] font-semibold text-[#64748B]
                  bg-[#F5F7FA] hover:bg-[#EEF2F7]
                  border border-[#E2E8F0]
                  rounded-lg pl-3 pr-7 py-1.5
                  cursor-pointer focus:outline-none focus:ring-0
                  transition-colors
                "
              >
                <option>This Week</option>
                <option>Last Week</option>
              </select>
              {/* Custom chevron */}
              <svg
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
          <div className="h-[230px]" style={{ outline: 'none' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={callLogsData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} style={{ outline: 'none' }}>
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
                  {callLogsData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 4 ? "#3B82F6" : "#BFDBFE"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ── Bottom Row: Recent Call + Notifications ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[65%_35%] gap-5">
        <RecentCalls />
        <Notifications />
      </div>

    </div>
  );
}