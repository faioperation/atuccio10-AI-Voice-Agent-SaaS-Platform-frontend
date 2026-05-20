"use client";

import { Users, PhoneCall, BarChart3, CalendarCheck } from "lucide-react";
import StatsCard from "@/components/buisness_dashboard_components/Dashboard/StatsCard";
import RecentCalls from "@/components/buisness_dashboard_components/Dashboard/RecentCalls";
import Notifications from "@/components/buisness_dashboard_components/Dashboard/Notifications";
import dynamic from "next/dynamic";

const LeadsChart = dynamic(
  () => import("@/components/buisness_dashboard_components/Dashboard/LeadsChart"),
  {
    ssr: false,
  }
);

const CallLogsChart = dynamic(
  () => import("@/components/buisness_dashboard_components/Dashboard/CallLogsChart"),
  {
    ssr: false,
  }
);


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
      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-5"> */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5">

        {/* Total Leads — Area Chart */}
        <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm p-6 min-w-0 overflow-hidden">
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
          <LeadsChart />
        </div>

        {/* Call Logs — Bar Chart */}
       <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm p-6 min-w-0 overflow-hidden">
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
          <CallLogsChart />
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