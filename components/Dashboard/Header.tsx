"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, UserPlus, Phone, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const switchTitle: Record<string, string> = {
  "/business_admin": "Dashboard",
  "/business_admin/call-logs": "Call Logs",
  "/business_admin/leads": "Leads",
  "/business_admin/appointment": "Appointment",
  "/business_admin/configuration": "Configuration",
  "/business_admin/manage-plan": "Manage Plan",
  "/business_admin/support-ticket": "Support Ticket",
  "/business_admin/profile": "Profile",
};

const demoNotifications = [
  { id: 1, title: "Call with David completed", time: "10:00 AM", icon: Phone, color: "text-[#16A34A]", bg: "bg-[#E9FBF1]" },
  { id: 2, title: "New Lead Emmas", time: "09:00 AM", icon: UserPlus, color: "text-[#9333EA]", bg: "bg-[#F3E8FF]" },
  { id: 3, title: "QA Alignment Call", time: "Yesterday", icon: Video, color: "text-[#1A6BDC]", bg: "bg-[#EBF3FF]" },
];

export default function Header({ setSidebarOpen }: HeaderProps) {
  const pathname = usePathname();
  const title = switchTitle[pathname] || "Dashboard";
  
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-[72px] md:h-[90px] w-full bg-white border-b border-[#EDEFF2] flex items-center justify-between px-6 md:px-8 sticky top-0 z-[120]">
      {/* Left: mobile menu + page title */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-[20px] md:text-[28px] lg:text-[32px] font-[800] text-[#0C1824] tracking-tight">{title}</h1>
      </div>

      {/* Right: Bell + Avatar */}
      <div className="flex items-center gap-4">
        
        {/* Notification Bell with Dropdown Modal */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className={`relative p-2 rounded-full transition-colors ${showNotif ? 'bg-[#F0F5FF] text-[#1A6BDC]' : 'text-[#64748B] hover:bg-[#F5F7FA]'}`}
          >
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {/* Modal Panel */}
          {showNotif && (
            <div className="absolute right-0 mt-3 w-[320px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#EDEFF2] z-50 overflow-hidden transform transition-all">
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
          )}
        </div>

        {/* User Profile avatar */}
        <Link href="/business_admin/profile" className="flex-shrink-0 ml-1">
          <div className="w-[38px] h-[38px] rounded-full overflow-hidden border border-[#EDEFF2] bg-gray-100 ring-2 ring-transparent hover:ring-[#EAF2FF] transition-all">
            <Image
              src="/person.jpg"
              alt="Profile"
              width={38}
              height={38}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}