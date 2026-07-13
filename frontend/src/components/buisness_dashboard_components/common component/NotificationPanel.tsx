"use client";

import React from "react";
import { Phone, UserPlus, Video } from "lucide-react";

const demoNotifications = [
  { id: 1, title: "Call with David completed", time: "10:00 AM", icon: Phone, color: "text-[#16A34A]", bg: "bg-[#E9FBF1]" },
  { id: 2, title: "New Lead Emmas", time: "09:00 AM", icon: UserPlus, color: "text-[#9333EA]", bg: "bg-[#F3E8FF]" },
  { id: 3, title: "QA Alignment Call", time: "Yesterday", icon: Video, color: "text-[#1A6BDC]", bg: "bg-[#EBF3FF]" },
];

interface NotificationPanelProps {
  onClose?: () => void;
}

const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  return (
    <div className="fixed sm:absolute top-[72px] sm:top-auto right-4 left-4 sm:left-auto sm:right-0 sm:mt-3 sm:w-[360px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#EDEFF2] z-[200] overflow-hidden transition-all duration-200">
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#F1F4F9] bg-[#FAFBFC]">
        <h3 className="text-[14px] font-bold text-[#0C1824]">Notifications</h3>
        <button className="text-[12px] font-semibold text-[#1A6BDC] hover:text-[#1558be] transition-colors">
          Mark all read
        </button>
      </div>
      
      <div className="flex flex-col max-h-[340px] overflow-y-auto divide-y divide-[#F1F4F9]">
        {demoNotifications.map(notif => (
          <div key={notif.id} className="flex items-start gap-3.5 px-5 py-4 hover:bg-[#F8FAFC] cursor-pointer transition-colors">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${notif.bg}`}>
              <notif.icon size={16} className={notif.color} strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1 pr-2">
              <span className="text-[13px] font-semibold text-[#0C1824] leading-tight select-none">
                {notif.title}
              </span>
              <span className="text-[11.5px] text-[#94A3B8] font-medium leading-none select-none">
                {notif.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
