import React, { useEffect } from "react";
import { X, Calendar, Clock } from "lucide-react";
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

interface MeetingScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateStr: string | null;
  appointments: Appointment[];
}

export default function MeetingScheduleModal({ isOpen, onClose, dateStr, appointments }: MeetingScheduleModalProps) {
  // close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-[#0C1824]/20 z-[200] transition-opacity backdrop-blur-sm flex items-center justify-center p-4" 
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] flex flex-col transform transition-all max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-[#EDEFF2]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[20px] font-semibold text-[#0C1824]">Meeting Schedule</h2>
              <div className="flex items-center gap-2 text-[#64748B] text-[14px]">
                <Calendar size={16} />
                <span>{dateStr}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-[#64748B] hover:text-[#0C1824] transition-colors p-1 rounded-md hover:bg-[#F5F7FA]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
            {appointments.length === 0 ? (
              <p className="text-[#64748B] text-[14px]">No meetings scheduled for this day.</p>
            ) : (
              appointments.map((apt, index) => (
                <div key={apt.id} className={`flex flex-col gap-6 ${index !== appointments.length - 1 ? 'pb-8 border-b border-[#EDEFF2]' : ''}`}>
                  
                  {/* Information block */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[13px] font-semibold text-[#64748B]">Information</span>
                    <div className="flex items-center gap-3">
                      <div className="w-[42px] h-[42px] rounded-full overflow-hidden border border-[#EDEFF2] bg-[#F8FAFC]">
                        <Image 
                          src={apt.avatar} 
                          alt={apt.name} 
                          width={42} 
                          height={42}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-medium text-[#0C1824] leading-tight">{apt.name}</span>
                        <span className="text-[13px] text-[#64748B]">{apt.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time block */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[13px] font-semibold text-[#64748B]">Date & Time</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[14px] text-[#475569]">
                        <Calendar size={16} />
                        <span>{dateStr}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[14px] text-[#475569]">
                        <Clock size={16} />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meeting Link block */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[13px] font-semibold text-[#64748B]">Meeting Link</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#F8FAFC] border border-[#EDEFF2] rounded-lg px-4 py-2.5 text-[14px] text-[#475569] overflow-hidden text-ellipsis whitespace-nowrap">
                        {apt.link}
                      </div>
                      <button className="bg-[#1A6BDC] hover:bg-[#155bb5] text-white text-[14px] font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
                        Start Meeting
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}
