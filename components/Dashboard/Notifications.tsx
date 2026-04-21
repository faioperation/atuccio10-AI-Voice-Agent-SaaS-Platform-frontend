import React from "react";
import { MoreVertical, Phone, UserPlus, Video } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Call with David completed",
    time: "Mon, July 8, 2026·10:00 AM",
    icon: Phone,
    iconBg: "#E9FBF1",
    iconColor: "#16A34A",
  },
  {
    id: 2,
    title: "New Lead Emmas",
    time: "Tue, July 9, 2026·09:00 AM",
    icon: UserPlus,
    iconBg: "#F3E8FF",
    iconColor: "#9333EA",
  },
  {
    id: 3,
    title: "QA Alignment Call",
    time: "Thu, July 11, 2026·11:00 AM",
    icon: Video,
    iconBg: "#EBF3FF",
    iconColor: "#1A6BDC",
  },
  {
    id: 4,
    title: "Dev Sync Meeting",
    time: "Mon, July 8, 2026·10:00 AM",
    icon: Phone,
    iconBg: "#E9FBF1",
    iconColor: "#16A34A",
  },
];

export default function Notifications() {
  return (
    <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-5 py-[18px] flex items-center justify-between border-b border-[#F1F4F9]">
        <h3 className="text-[15px] font-bold text-[#0C1824]">Notification</h3>
        <button className="text-[#94A3B8] hover:text-gray-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Items */}
      <div className="flex flex-col divide-y divide-[#F1F4F9]">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-start gap-3 px-5 py-4 hover:bg-[#F8FAFC] cursor-pointer transition-colors"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: notif.iconBg }}
            >
              <notif.icon size={16} style={{ color: notif.iconColor }} strokeWidth={1.8} />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[13px] font-semibold text-[#0C1824] leading-snug truncate">
                {notif.title}
              </span>
              <span className="text-[11px] text-[#94A3B8]">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
