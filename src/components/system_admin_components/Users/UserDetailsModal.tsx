"use client";

import React, { useEffect } from "react";
import { X, Users, ArrowUpRight, ArrowDownRight, PhoneIncoming, Percent, CalendarCheck } from "lucide-react";
import Image from "next/image";

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

interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailsModal = ({ user, isOpen, onClose }: UserDetailsModalProps) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const StatCard = ({ title, value, change, trend, icon: Icon, colorClass, bgClass }: any) => (
    <div className="bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border border-[#EDEFF2] flex flex-col gap-3 sm:gap-4">
      <div className="flex justify-between items-start">
        <span className="text-[12px] sm:text-[14px] font-bold text-[#64748B]">{title}</span>
        <div className={`p-1.5 sm:p-2 rounded-lg ${bgClass}`}>
          <Icon size={16} className={colorClass} />
        </div>
      </div>
      <div>
        <div className="text-[24px] sm:text-[28px] font-bold text-[#0C1824] leading-none mb-1.5 sm:mb-2">{value}</div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className={`flex items-center text-[11px] sm:text-[12px] font-bold ${trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            {change}% {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          </div>
          <span className="text-[11px] sm:text-[12px] text-[#94A3B8] font-medium whitespace-nowrap">From last month</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal/Drawer Panel (Right side) */}
      <div className="relative bg-white w-full max-w-[550px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-[#EDEFF2]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6 border-b border-[#EDEFF2]">
          <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0C1824]">View User Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#F5F7FA] rounded-md transition-colors text-[#64748B] hover:cursor-pointer">
            <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-5 sm:p-8 flex flex-col gap-6 sm:gap-8">
            {/* User Profile */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-[50px] h-[50px] sm:w-[64px] sm:h-[64px] rounded-full overflow-hidden bg-gray-100 border-2 border-[#F8FAFC] shadow-sm flex-shrink-0">
                <Image
                  src="/person2.jpeg"
                  alt={user.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h4 className="text-[18px] sm:text-[20px] font-bold text-[#0C1824] leading-tight">{user.name}</h4>
                <span className="text-[13px] sm:text-[14px] font-medium text-[#64748B]">New</span>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 sm:gap-y-6">
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <span className="text-[12px] sm:text-[13px] font-bold text-[#0C1824]">Phone Number:</span>
                <span className="text-[13px] sm:text-[14px] text-[#64748B] font-medium break-all">{user.phoneNumber}</span>
              </div>
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <span className="text-[12px] sm:text-[13px] font-bold text-[#0C1824]">Email:</span>
                <span className="text-[13px] sm:text-[14px] text-[#64748B] font-medium break-all">{user.email}</span>
              </div>
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <span className="text-[12px] sm:text-[13px] font-bold text-[#0C1824]">Started Date:</span>
                <span className="text-[13px] sm:text-[14px] text-[#64748B] font-medium">{user.startDate}</span>
              </div>
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <span className="text-[12px] sm:text-[13px] font-bold text-[#0C1824]">End Date:</span>
                <span className="text-[13px] sm:text-[14px] text-[#64748B] font-medium">{user.endDate}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 sm:gap-4">
              <StatCard 
                title="Total Leads" 
                value={user.stats.leads.value} 
                change={user.stats.leads.change} 
                trend={user.stats.leads.trend}
                icon={Users}
                colorClass="text-[#A855F7]"
                bgClass="bg-[#F3E8FF]"
              />
              <StatCard 
                title="Total Call" 
                value={user.stats.calls.value} 
                change={user.stats.calls.change} 
                trend={user.stats.calls.trend}
                icon={PhoneIncoming}
                colorClass="text-[#10B981]"
                bgClass="bg-[#ECFDF5]"
              />
              <StatCard 
                title="Conversion Rate" 
                value={`${user.stats.conversion.value}%`} 
                change={user.stats.conversion.change} 
                trend={user.stats.conversion.trend}
                icon={Percent}
                colorClass="text-[#3B82F6]"
                bgClass="bg-[#EFF6FF]"
              />
              <StatCard 
                title="Book Appointment" 
                value={user.stats.appointments.value} 
                change={user.stats.appointments.change} 
                trend={user.stats.appointments.trend}
                icon={CalendarCheck}
                colorClass="text-[#06B6D4]"
                bgClass="bg-[#ECFEFF]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
