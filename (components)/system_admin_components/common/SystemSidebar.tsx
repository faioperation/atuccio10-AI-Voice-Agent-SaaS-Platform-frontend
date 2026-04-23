"use client";

import React from "react";
import {
  LayoutDashboard,
  Users,
  Layers,
  LifeBuoy,
  UserCircle,
  LogIn,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", href: "/system_admin", icon: LayoutDashboard },
  { name: "Users", href: "/system_admin/users", icon: Users },
  { name: "Manage Tiers", href: "/system_admin/manage-tiers", icon: Layers },
  { name: "Support Ticket", href: "/system_admin/support-ticket", icon: LifeBuoy },
  { name: "Profile", href: "/system_admin/profile", icon: UserCircle },
];

interface SidebarProps {
  /** Only passed for the mobile drawer – triggers close when a link is clicked */
  closeSidebar?: () => void;
}

export default function SystemSidebar({ closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (closeSidebar) closeSidebar();
  };

  return (
    <aside className="flex flex-col w-full h-full bg-white overflow-y-auto">

      {/* Mobile close button */}
      {closeSidebar && (
        <button
          onClick={closeSidebar}
          className="absolute top-6 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-all z-20 lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      )}

      <div className="h-[72px] md:h-[90px] flex items-center justify-center px-6 border-b border-[#EDEFF2]">
        <Link href="/" className="block transform transition-transform hover:scale-105">
          <Image
            src="/logo.png"
            alt="Clinch"
            width={90}
            height={36}
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </Link>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 flex flex-col py-4 gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={`
                relative flex items-center gap-[14px]
                h-[48px] pr-4 pl-[28px] outline-none focus:outline-none focus:ring-0
                text-[15px]
                transition-all duration-150
                ${isActive
                  ? "bg-[#F3F7FF] mr-4 rounded-r-2xl"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0C1824] mr-4 rounded-r-2xl"
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#2563EB] rounded-r-md" />
              )}

              <div className={isActive ? "text-[#2563EB]" : "text-[#8E9Faf]"}>
                <Icon size={20} strokeWidth={isActive ? 2 : 1.8} />
              </div>
              <span className={isActive ? "font-semibold text-[#0C1824]" : "font-medium text-[#64748B]"}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Logout ── */}
      <div className="pb-4">
        <div className="h-px bg-[#E5E7EB] mx-4 mb-2" />
        <Link
          href="/auth/login"
          className="flex items-center gap-3 mx-3 px-3 h-[46px] rounded-xl
          text-[13.5px] font-medium text-black
          hover:bg-red-50 transition-colors"
        >
          <LogIn size={18} strokeWidth={1.8} />
          <span>Login</span>
        </Link>
      </div>
    </aside>
  );
}
