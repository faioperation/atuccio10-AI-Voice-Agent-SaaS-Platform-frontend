import React from "react";
import { MoreVertical } from "lucide-react";

const calls = [
  { id: "01", name: "Jane Cooper",    phone: "(+33)7 00 55 57 60", location: "Lafayette, California",   duration: "1 min",  status: "1 min ago"   },
  { id: "02", name: "Jacob Jones",    phone: "(+33)7 35 55 21 02", location: "Lansing, Illinois",       duration: "50 min", status: "50 min ago"  },
  { id: "03", name: "Dianne Russell", phone: "(+33)7 35 55 45 43", location: "Corona, Michigan",        duration: "2 min",  status: "2 hours ago" },
  { id: "04", name: "Theresa Webb",   phone: "(+33)7 35 55 50 46", location: "Pasadena, Oklahoma",      duration: "4 min",  status: "6 hours ago" },
  { id: "05", name: "Courtney Henry", phone: "(+33)6 55 59 32 88", location: "Stockton, New Hampshire", duration: "8 min",  status: "1 day ago"   },
  { id: "06", name: "Kathryn Murphy", phone: "(+33)7 45 55 87 71", location: "Portland, Illinois",      duration: "4 min",  status: "8 day ago"   },
  { id: "07", name: "Eleanor Pena",   phone: "(+33)7 75 55 87 24", location: "Syracuse, Connecticut",   duration: "1 min",  status: "9 day ago"   },
];

export default function RecentCalls() {
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
            {calls.map((call) => (
              <tr
                key={call.id}
                className="hover:bg-[#F8FAFC] transition-colors"
              >
                <td className="pl-6 pr-2 py-[13px] text-[12px] text-[#94A3B8]">{call.id}</td>
                <td className="px-3 py-[13px] text-[13px] font-semibold text-[#0C1824]">{call.name}</td>
                <td className="px-3 py-[13px] text-[13px] text-[#64748B]">{call.phone}</td>
                <td className="px-3 py-[13px] text-[13px] text-[#64748B]">{call.location}</td>
                <td className="px-3 py-[13px] text-[13px] text-[#64748B]">{call.duration}</td>
                <td className="px-3 py-[13px] text-[13px] text-[#64748B]">{call.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
