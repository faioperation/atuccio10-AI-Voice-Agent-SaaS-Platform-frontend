"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "@/components/Shared/Loader";
import MeetingScheduleModal from "@/components/Appointment/MeetingScheduleModal";
import Image from "next/image";

interface Appointment {
  id: string;
  date: string;
  name: string;
  role: string;
  avatar: string;
  time: string;
  link: string;
}

const WEEKDAYS = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];

export default function AppointmentPage() {
  // Use a fixed date to match the mockup's June 2026, or use current date.
  // We'll use June 2026 as the initial state since our mock data is there.
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1)); // Month is 0-indexed, 5 = June
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([]);

  // Fetch data
  const { data: appointments = [], isLoading, isError, refetch } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await axios.get("/appointments.json");
      return response.data;
    },
  });

  // Calendar logic
  const daysInGrid = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // JS getDay(): Sun=0, Mon=1... We want Mon=0, Sun=6
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6; // Sunday

    const days = [];
    
    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days to fill 35 or 42 grid cells
    const totalCells = days.length > 35 ? 42 : 35;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format date to YYYY-MM-DD for easy comparison
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Format display date for modal (e.g., "1 June 2026")
  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDisplayDateWithDay = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    if (dayAppointments.length > 0) {
      setSelectedDateStr(formatDisplayDateWithDay(date));
      setSelectedAppointments(dayAppointments);
      setIsModalOpen(true);
    }
  };

  if (isLoading) {
    return <Loader message="Loading calendar..." />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading appointments. <button onClick={() => refetch()} className="underline ml-2">Try again</button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full min-h-[800px]">
      <div className="bg-white rounded-2xl shadow-sm border border-[#EDEFF2] flex flex-col flex-1 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-[#EDEFF2]">
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevMonth}
              className="w-[36px] h-[36px] flex items-center justify-center border border-[#EDEFF2] rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0C1824] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNextMonth}
              className="w-[36px] h-[36px] flex items-center justify-center border border-[#EDEFF2] rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0C1824] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <h2 className="text-[20px] font-semibold text-[#0C1824] uppercase tracking-wide">
            {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </h2>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 flex flex-col">
          {/* Weekdays Row */}
          <div className="grid grid-cols-7 border-b border-[#EDEFF2]">
            {WEEKDAYS.map((day, idx) => (
              <div 
                key={day} 
                className={`py-4 px-4 text-[13px] font-semibold text-[#94A3B8] uppercase tracking-wider ${idx !== 6 ? 'border-r border-[#EDEFF2]' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {daysInGrid.map((dayObj, idx) => {
              const formattedDate = formatDate(dayObj.date);
              const dayAppointments = appointments.filter(apt => apt.date === formattedDate);
              const hasAppointments = dayAppointments.length > 0;
              const isColEnd = (idx + 1) % 7 === 0;
              const isRowEnd = idx >= daysInGrid.length - 7;

              return (
                <div 
                  key={`${formattedDate}-${idx}`}
                  onClick={() => handleDayClick(dayObj.date, dayAppointments)}
                  className={`relative p-4 flex flex-col justify-between min-h-[140px] transition-colors
                    ${!isColEnd ? 'border-r border-[#EDEFF2]' : ''} 
                    ${!isRowEnd ? 'border-b border-[#EDEFF2]' : ''}
                    ${hasAppointments ? 'bg-[#EBF3FF] cursor-pointer hover:bg-[#E1EDFF]' : 'bg-white'}
                  `}
                >
                  <div className={`text-right text-[15px] font-semibold ${dayObj.isCurrentMonth ? 'text-[#0C1824]' : 'text-[#CBD5E1]'}`}>
                    {dayObj.date.getDate()}
                  </div>

                  {hasAppointments && (
                    <div className="flex flex-col gap-1.5 mt-auto">
                      <div className="flex -space-x-2">
                        {dayAppointments.slice(0, 3).map((apt, i) => (
                          <div key={apt.id} className="w-[24px] h-[24px] rounded-full border-2 border-white overflow-hidden bg-[#F1F5F9]">
                            <Image 
                              src={apt.avatar} 
                              alt="Avatar" 
                              width={24} 
                              height={24}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-[12px] font-medium text-[#1A6BDC]">
                        Have a {dayAppointments.length} Meeting{dayAppointments.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <MeetingScheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dateStr={selectedDateStr}
        appointments={selectedAppointments}
      />
    </div>
  );
}
