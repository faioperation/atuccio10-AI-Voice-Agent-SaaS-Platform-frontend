"use client";

import { useState } from "react";
import { Users, PhoneCall, BarChart3, CalendarCheck, RefreshCw, WifiOff } from "lucide-react";
import dynamic from "next/dynamic";
import StatsCard from "@/components/buisness_dashboard_components/Dashboard/StatsCard";
import RecentCalls from "@/components/buisness_dashboard_components/Dashboard/RecentCalls";
import Notifications from "@/components/buisness_dashboard_components/Dashboard/Notifications";
import { useBusinessDashboard } from "@/features/dashboard/hooks/useBusinessDashboard";
import type { LucideIcon } from "lucide-react";

const LeadsChart = dynamic(
  () => import("@/components/buisness_dashboard_components/Dashboard/LeadsChart"),
  { ssr: false }
);

const CallLogsChart = dynamic(
  () => import("@/components/buisness_dashboard_components/Dashboard/CallLogsChart"),
  { ssr: false }
);

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatTrend(value: number | undefined): string {
  if (value === undefined || value === null) return "0%";
  return `${Math.abs(value)}%`;
}

// ── Skeleton Components ────────────────────────────────────────────────────────

function StatsCardSkeleton() {
  return (
    <div className="px-6 py-5 bg-white rounded-2xl border border-[#EDEFF2] shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="h-3.5 w-24 bg-[#F1F4F9] rounded animate-pulse" />
        <div className="w-9 h-9 rounded-full bg-[#F1F4F9] animate-pulse flex-shrink-0" />
      </div>
      <div className="h-9 w-20 bg-[#F1F4F9] rounded animate-pulse mb-3" />
      <div className="h-5 w-36 bg-[#F1F4F9] rounded-full animate-pulse" />
    </div>
  );
}

function ChartSkeleton() {
  return <div className="h-[230px] w-full rounded-xl bg-[#F1F4F9] animate-pulse" />;
}

// ── Stat card config ───────────────────────────────────────────────────────────

interface StatConfig {
  title: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const STAT_CONFIG: Record<string, StatConfig> = {
  total_leads: {
    title: "Total Leads",
    icon: Users,
    iconBg: "#F3E8FF",
    iconColor: "#9333EA",
  },
  total_calls: {
    title: "Total Call",
    icon: PhoneCall,
    iconBg: "#D1FAE5",
    iconColor: "#16A34A",
  },
  conversion_rate: {
    title: "Conversion Rate",
    icon: BarChart3,
    iconBg: "#F3E8FF",
    iconColor: "#9333EA",
  },
  total_appointments: {
    title: "Book Appointment",
    icon: CalendarCheck,
    iconBg: "#DBEAFE",
    iconColor: "#1A6BDC",
  },
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } = useBusinessDashboard();
  const [selectedWeek, setSelectedWeek] = useState<"this_week" | "last_week">("this_week");

  const callLogsData = data?.graphs?.call_logs;
  const activeChartData =
    selectedWeek === "this_week" ? callLogsData?.this_week : callLogsData?.last_week;

  // ── Error state ──────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-14 h-14 rounded-full bg-[#FFF5F5] border border-[#FF5A5A]/20 flex items-center justify-center">
          <WifiOff size={24} className="text-[#FF5A5A]" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-[15px] font-semibold text-[#0C1824] mb-1">Failed to load dashboard</p>
          <p className="text-[13px] text-[#94A3B8]">Check your connection and try again.</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1A6BDC] hover:bg-[#1558be] text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-60"
        >
          <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
          {isFetching ? "Retrying..." : "Retry"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard
              {...STAT_CONFIG.total_leads}
              value={data?.stats?.total_leads?.total ?? 0}
              trend={formatTrend(data?.percentage_change?.total_leads)}
              isUp={data?.trend?.total_leads !== "down"}
            />
            <StatsCard
              {...STAT_CONFIG.total_calls}
              value={data?.stats?.total_calls?.total ?? 0}
              trend={formatTrend(data?.percentage_change?.total_calls)}
              isUp={data?.trend?.total_calls !== "down"}
            />
            <StatsCard
              {...STAT_CONFIG.conversion_rate}
              value={data?.stats?.conversion_rate?.rate ?? "0%"}
              trend={formatTrend(data?.percentage_change?.conversion_rate)}
              isUp={data?.trend?.conversion_rate !== "down"}
            />
            <StatsCard
              {...STAT_CONFIG.total_appointments}
              value={data?.stats?.total_appointments?.total ?? 0}
              trend={formatTrend(data?.percentage_change?.total_appointments)}
              isUp={data?.trend?.total_appointments !== "down"}
            />
          </>
        )}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5">

        {/* Call Logs Weekly Comparison — Area Chart */}
        <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm p-6 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[14px] font-bold text-[#0C1824]">Call Logs</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] inline-block" />
                <span className="text-[11px] text-[#64748B] font-medium">This Week</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1] inline-block" />
                <span className="text-[11px] text-[#64748B] font-medium">Last Week</span>
              </div>
            </div>
          </div>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <LeadsChart
              thisWeek={callLogsData?.this_week}
              lastWeek={callLogsData?.last_week}
            />
          )}
        </div>

        {/* Call Logs Daily — Bar Chart with week selector */}
        <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm p-6 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[14px] font-bold text-[#0C1824]">Call Logs</h3>
            <div className="relative">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value as "this_week" | "last_week")}
                className="appearance-none text-[12px] font-semibold text-[#64748B] bg-[#F5F7FA] hover:bg-[#EEF2F7] border border-[#E2E8F0] rounded-lg pl-3 pr-7 py-1.5 cursor-pointer focus:outline-none focus:ring-0 transition-colors"
              >
                <option value="this_week">This Week</option>
                <option value="last_week">Last Week</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <CallLogsChart data={activeChartData} />
          )}
        </div>

      </div>

      {/* ── Bottom Row: Recent Calls + Notifications ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[65%_35%] gap-5">
        <RecentCalls calls={data?.recent?.calls} isLoading={isLoading} />
        <Notifications notifications={data?.recent?.notifications} isLoading={isLoading} />
      </div>

    </div>
  );
}
