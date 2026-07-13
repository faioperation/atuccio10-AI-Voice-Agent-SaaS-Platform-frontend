import { MoreVertical, PhoneOff } from "lucide-react";
import type { RecentCall } from "@/features/dashboard/api/dashboard.types";

interface RecentCallsProps {
  calls?: RecentCall[];
  isLoading?: boolean;
}

function SkeletonRow() {
  return (
    <tr>
      <td className="pl-6 pr-2 py-[13px]"><div className="h-3 w-6 bg-[#F1F4F9] rounded animate-pulse" /></td>
      <td className="px-3 py-[13px]"><div className="h-3 w-28 bg-[#F1F4F9] rounded animate-pulse" /></td>
      <td className="px-3 py-[13px]"><div className="h-3 w-32 bg-[#F1F4F9] rounded animate-pulse" /></td>
      <td className="px-3 py-[13px]"><div className="h-3 w-36 bg-[#F1F4F9] rounded animate-pulse" /></td>
      <td className="px-3 py-[13px]"><div className="h-3 w-12 bg-[#F1F4F9] rounded animate-pulse" /></td>
      <td className="px-3 py-[13px]"><div className="h-3 w-16 bg-[#F1F4F9] rounded animate-pulse" /></td>
    </tr>
  );
}

export default function RecentCalls({ calls, isLoading }: RecentCallsProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm overflow-hidden flex flex-col">

      {/* Header */}
      <div className="px-6 py-[18px] flex items-center justify-between border-b border-[#F1F4F9]">
        <h3 className="text-[15px] font-bold text-[#0C1824]">Recent Call</h3>
        <button className="text-[#94A3B8] hover:text-gray-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr className="bg-[#FAFBFC]">
              <th className="pl-6 pr-2 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">#</th>
              <th className="px-3 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Name</th>
              <th className="px-3 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Phone Number</th>
              <th className="px-3 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Location</th>
              <th className="px-3 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Duration</th>
              <th className="px-3 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F4F9]">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : !calls || calls.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-12 gap-2">
                    <PhoneOff size={28} className="text-[#CBD5E1]" strokeWidth={1.5} />
                    <p className="text-[13px] text-[#94A3B8] font-medium">No recent calls</p>
                  </div>
                </td>
              </tr>
            ) : (
              calls.map((call, index) => (
                <tr
                  key={call.id}
                  className="hover:bg-[#F8FAFC] transition-colors"
                >
                  <td className="pl-6 pr-2 py-[13px] text-[12px] text-[#94A3B8]">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-[13px] text-[13px] font-semibold text-[#0C1824]">{call.name}</td>
                  <td className="px-3 py-[13px] text-[13px] text-[#64748B]">{call.phone}</td>
                  <td className="px-3 py-[13px] text-[13px] text-[#64748B]">{call.location}</td>
                  <td className="px-3 py-[13px] text-[13px] text-[#64748B]">{call.duration}</td>
                  <td className="px-3 py-[13px] text-[13px] text-[#64748B]">{call.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
