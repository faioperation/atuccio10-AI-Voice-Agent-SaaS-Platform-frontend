"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NotificationPanel from "@/components/common component/NotificationPanel";

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
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-[20px] md:text-[28px] lg:text-[32px] font-[600] text-[#0C1824] tracking-tight">{title}</h1>
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

          {/* Notification Modal Component */}
          {showNotif && (
            <NotificationPanel onClose={() => setShowNotif(false)} />
          )}
        </div>

        {/* User Profile avatar */}
        <Link href="/business_admin/profile" className="flex-shrink-0 ml-1">
          <div className="w-[38px] h-[38px] rounded-full overflow-hidden border border-[#EDEFF2] bg-gray-100 ring-2 ring-transparent hover:ring-[#EAF2FF] transition-all">
            <Image
              src="/person2.jpeg"
              alt="Profile"
              width={38}
              height={38}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </Link>
      </div>
    </header>
  );
}