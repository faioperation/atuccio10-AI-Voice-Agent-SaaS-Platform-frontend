"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common component/Sidebar";
import Header from "@/components/common component/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">

      {/* ── Desktop Sidebar (sticky) ── */}
      <aside className="hidden lg:flex w-[260px] flex-shrink-0 border-r border-[#EDEFF2] h-screen sticky top-0 bg-white">
        <Sidebar />
      </aside>

      {/* ── Mobile Sidebar (smooth drawer overlay) ── */}
      <div 
        className={`fixed inset-0 z-[150] lg:hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay layer */}
        <div
          onClick={() => setSidebarOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Drawer layer */}
        <div 
          className={`absolute left-0 top-0 h-full w-[260px] bg-white border-r border-[#EDEFF2] shadow-2xl transform transition-transform duration-300 ease-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* ── Right Section ── */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Sticky Header / Navbar */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-[#F5F7FA]">
          <div className="w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}