"use client";

import React, { useState } from "react";
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

interface Stat {
  value: number;
  change: number;
  trend: "up" | "down";
}

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  startDate: string;
  endDate: string;
  plan: string;
  stats: {
    leads: Stat;
    calls: Stat;
    conversion: Stat;
    appointments: Stat;
  };
}

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const UserTable = ({ 
  users, 
  onView, 
  searchTerm, 
  onSearchChange, 
  currentPage, 
  onPageChange,
  totalItems,
  itemsPerPage
}: UserTableProps) => {

  const getPlanStyles = (plan: string) => {
    switch (plan) {
      case "QUALIFY":
        return "bg-[#10B981] text-white";
      case "CLOSE":
        return "bg-[#3B82F6] text-white";
      case "THE CLINCHER":
        return "bg-[#F97316] text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-[16px] border border-[#EDEFF2] shadow-sm overflow-hidden min-h-[750px] flex flex-col">
      {/* Table Header with Search */}
      <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[20px] font-bold text-[#0C1824]">Users</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-[300px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#F8FAFC] border border-[#EDEFF2] rounded-xl text-[14px] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4F8AFF] transition-colors"
            />
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-[#64748B] hover:cursor-pointer">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Table Container - Horizontal scroll on small screens */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#F1F5F9] bg-[#FAFBFC]">
              <th className="px-8 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wider w-[60px]">#</th>
              <th className="px-4 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Name</th>
              <th className="px-4 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Phone Number</th>
              <th className="px-4 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Email</th>
              <th className="px-4 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Start Date</th>
              <th className="px-4 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wider">End Date</th>
              <th className="px-4 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Plan</th>
              <th className="px-8 py-4 text-[13px] font-bold text-[#64748B] uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#F8FAFC] transition-colors group">
                <td className="px-8 py-5 text-[14px] font-medium text-[#64748B]">{user.id}</td>
                <td className="px-4 py-5 text-[14px] font-bold text-[#0C1824] whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-5 text-[14px] font-medium text-[#374151] whitespace-nowrap">{user.phoneNumber}</td>
                <td className="px-4 py-5 text-[14px] font-medium text-[#374151] whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-5 text-[14px] font-medium text-[#374151] whitespace-nowrap">{user.startDate}</td>
                <td className="px-4 py-5 text-[14px] font-medium text-[#374151] whitespace-nowrap">{user.endDate}</td>
                <td className="px-4 py-5">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${getPlanStyles(user.plan)}`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-8 py-5 text-center">
                  <button
                    onClick={() => onView(user)}
                    className="bg-[#4F8AFF] hover:bg-[#3B7AFF] text-white px-6 py-1.5 rounded-lg text-[13px] font-bold transition-all shadow-sm active:scale-95 hover:cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-20 text-[#64748B]">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: Pagination */}
      <div className="px-4 sm:px-8 py-5 border-t border-[#F1F5F9] flex flex-col lg:flex-row items-center justify-between gap-5 bg-[#FAFBFC] mt-auto">
        <div className="text-[13px] sm:text-[14px] font-medium text-[#64748B] order-2 lg:order-1">
          Showing <span className="text-[#0C1824] font-bold">{(currentPage - 1) * itemsPerPage + (users.length > 0 ? 1 : 0)}</span> to <span className="text-[#0C1824] font-bold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="text-[#0C1824] font-bold">{totalItems}</span> entries
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 order-1 lg:order-2 flex-wrap justify-center">
          <button 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-9 sm:h-10 px-3 sm:px-4 flex items-center gap-2 border border-[#EDEFF2] rounded-lg text-[13px] sm:text-[14px] font-semibold text-[#374151] hover:bg-white transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 hover:cursor-pointer"
          >
            <ChevronLeft size={16} className="sm:hidden" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-[13px] sm:text-[14px] font-bold transition-all hover:cursor-pointer ${
                  currentPage === page
                    ? "bg-[#4F8AFF] text-white shadow-md shadow-blue-100 ring-2 ring-blue-100"
                    : "text-[#64748B] hover:bg-white border border-[#EDEFF2] bg-white hover:text-[#4F8AFF]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="h-9 sm:h-10 px-3 sm:px-5 flex items-center gap-2 bg-[#4F8AFF] rounded-lg text-[13px] sm:text-[14px] font-bold text-white hover:bg-[#3B7AFF] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 hover:cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} className="sm:hidden" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
