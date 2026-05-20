"use client";

import React from "react";
import { Users, CreditCard } from "lucide-react";
import StatsCard from "@/components/buisness_dashboard_components/Dashboard/StatsCard";
import UserGrowthChart from "@/components/system_admin_components/Dashboard/UserGrowthChart";
import RecentUsersTable from "@/components/system_admin_components/Dashboard/RecentUsersTable";

export default function SystemDashboardPage() {
  return (
    <div className="space-y-6">

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <StatsCard
          title="Total Users"
          value="85"
          trend="20.2%"
          isUp
          icon={Users}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />
        <StatsCard
          title="Total Sell"
          value="$12,450"
          trend="30.5%"
          isUp
          icon={CreditCard}
          iconBg="#D1FAE5"
          iconColor="#16A34A"
        />
      </div>

      {/* ── Chart Section ── */}
      <UserGrowthChart />

      {/* ── Recent Users Table ── */}
      <RecentUsersTable />
    </div>
  );
}
