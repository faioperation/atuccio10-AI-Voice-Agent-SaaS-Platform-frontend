import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: string;
  isUp: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function StatsCard({
  title,
  value,
  trend,
  isUp,
  icon: Icon,
  iconBg,
  iconColor,
}: StatsCardProps) {
  return (
    <div className="px-6 py-5 bg-white rounded-2xl border border-[#EDEFF2] shadow-sm">

      {/* Top row: title + icon */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-[13px] font-medium text-[#64748B]">{title}</span>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={17} style={{ color: iconColor }} strokeWidth={1.8} />
        </div>
      </div>

      {/* Big value */}
      <h3 className="text-[32px] font-bold text-[#0C1824] leading-none mb-3">{value}</h3>

      {/* Trend */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            isUp ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FEE2E2] text-[#DC2626]"
          }`}
        >
          {isUp
            ? <TrendingUp size={10} strokeWidth={2.5} />
            : <TrendingDown size={10} strokeWidth={2.5} />
          }
          <span>{trend}</span>
        </div>
        <span className="text-[12px] text-[#94A3B8]">From last month</span>
      </div>

    </div>
  );
}
