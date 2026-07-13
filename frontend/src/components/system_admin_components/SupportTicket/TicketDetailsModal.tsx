"use client";

import React, { useEffect } from "react";
import { X, Phone } from "lucide-react";
import Image from "next/image";

interface Ticket {
  id: string;
  businessName: string;
  ticketId: string;
  date: string;
  issues: string;
  message: string;
  status: string;
  phoneNumber: string;
  fullMessage: string;
}

interface TicketDetailsModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

const TicketDetailsModal = ({ ticket, isOpen, onClose }: TicketDetailsModalProps) => {
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

  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Panel (Right Side) */}
      <div className="relative bg-white w-full max-w-[550px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-[#EDEFF2]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 border-b border-[#EDEFF2]">
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0C1824]">View Support Ticket</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#F5F7FA] rounded-md transition-colors text-[#64748B] hover:cursor-pointer">
            <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 sm:p-8 flex flex-col gap-8">
            {/* User Profile Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] sm:w-[64px] sm:h-[64px] rounded-full overflow-hidden bg-gray-100 border-2 border-[#F8FAFC] shadow-sm flex-shrink-0">
                  <Image
                    src="/person2.jpeg"
                    alt={ticket.businessName}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <div>
                  <h4 className="text-[18px] sm:text-[20px] font-bold text-[#0C1824] leading-tight">{ticket.businessName}</h4>
                  <span className="text-[13px] sm:text-[14px] font-medium text-[#64748B]">New</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#EDEFF2] rounded-xl text-[14px] font-bold text-[#374151] hover:bg-[#F8FAFC] transition-colors shadow-sm hover:cursor-pointer">
                <Phone size={16} />
                Call
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-bold text-[#0C1824]">Phone Number:</span>
                <span className="text-[14px] text-[#64748B] font-medium">{ticket.phoneNumber}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-bold text-[#0C1824]">Ticket ID:</span>
                <span className="text-[14px] text-[#64748B] font-medium">{ticket.ticketId}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-bold text-[#0C1824]">Date:</span>
                <span className="text-[14px] text-[#64748B] font-medium">15 May 2020 6:00 pm</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-bold text-[#0C1824]">Issues:</span>
                <span className="text-[14px] text-[#64748B] font-medium">{ticket.issues}</span>
              </div>
            </div>

            {/* Message Box */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] font-bold text-[#0C1824]">Message</span>
              <div className="bg-[#F8FAFC] border border-[#EDEFF2] rounded-2xl p-5 min-h-[180px]">
                <p className="text-[14px] text-[#64748B] font-medium leading-relaxed">
                  {ticket.fullMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;
