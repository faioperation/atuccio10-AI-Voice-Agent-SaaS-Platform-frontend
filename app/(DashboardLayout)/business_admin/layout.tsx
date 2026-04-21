"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import Header from "@/components/Dashboard/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">

      {/* ── Desktop Sidebar (sticky) ── */}
      <aside className="hidden md:flex w-[240px] flex-shrink-0 border-r border-[#E5E7EB] h-screen sticky top-0 bg-white">
        <Sidebar />
      </aside>

      {/* ── Mobile Sidebar (drawer overlay) ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-[240px] bg-white border-r border-[#E5E7EB] shadow-xl">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

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