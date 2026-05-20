import React, { useEffect } from "react";
import { X } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  platform: string;
  status: string;
}

interface ViewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export default function ViewLeadModal({
  isOpen,
  onClose,
  lead,
}: ViewLeadModalProps) {

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#0C1824]/20 z-[200] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar Modal */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[400px] bg-white shadow-2xl z-[210] flex flex-col border-l border-[#EDEFF2]">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EDEFF2]">
          <h2 className="text-[18px] font-bold text-[#0C1824]">
            View Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0C1824] transition-colors p-1 rounded-md hover:bg-[#F5F7FA]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {lead && (
          <div className="p-6 flex flex-col gap-8 flex-1 overflow-y-auto">

            {/* Top Profile */}
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="w-[42px] h-[42px] rounded-full bg-[#1A6BDC] text-white flex items-center justify-center text-[16px] font-bold uppercase">
                {lead.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#0C1824] leading-tight">
                  {lead.name}
                </span>

                <span className="text-[13px] text-[#64748B] font-medium">
                  {lead.status}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">

              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#0C1824]">
                  Phone Number:
                </span>

                <span className="text-[14px] text-[#64748B] font-medium">
                  {lead.phone}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#0C1824]">
                  Email:
                </span>

                <span className="text-[14px] text-[#64748B] font-medium">
                  {lead.email}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#0C1824]">
                  Platform:
                </span>

                <span className="text-[14px] text-[#64748B] font-medium">
                  {lead.platform}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#0C1824]">
                  Date:
                </span>

                <span className="text-[14px] text-[#64748B] font-medium">
                  {lead.date}
                </span>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
