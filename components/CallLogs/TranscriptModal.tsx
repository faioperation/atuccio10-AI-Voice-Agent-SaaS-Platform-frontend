import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, FileText, PlayCircle } from "lucide-react";

interface TranscriptData {
  phoneNumber: string;
  duration: string;
  dateTime: string;
  issueType: string;
  messages: Array<{
    role: string;
    text: string;
    color: string;
  }>;
}

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  callId: string | null;
}

export default function TranscriptModal({ isOpen, onClose, callId }: TranscriptModalProps) {
  // Fetch transcript data triggered only when modal is open
  const { data, isLoading, isError } = useQuery<TranscriptData>({
    queryKey: ["transcript", callId],
    queryFn: async () => {
      const response = await fetch("/transcript.json");
      if (!response.ok) throw new Error("Failed to fetch transcript");
      return response.json();
    },
    enabled: isOpen && !!callId,
  });

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-white/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal/Drawer Panel (Right side to match picture) */}
      <div className="relative w-full max-w-[550px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-[#EDEFF2]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#EDEFF2]">
          <h2 className="text-[18px] font-bold text-[#0C1824]">Call Details</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-[#F5F7FA] rounded-md transition-colors text-[#64748B]"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto w-full">
          {isLoading ? (
            <div className="p-8 text-center text-[#64748B]">Loading transcript...</div>
          ) : isError ? (
            <div className="p-8 text-center text-red-500">Error loading details.</div>
          ) : data ? (
            <div className="p-8 flex flex-col gap-8">
              
              {/* Call Info Grid */}
              <div className="grid grid-cols-2 gap-y-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-[#0C1824]">Phone Number</span>
                  <span className="text-[14px] text-[#64748B]">{data.phoneNumber}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-[#0C1824]">Duration</span>
                  <span className="text-[14px] text-[#64748B]">{data.duration}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-[#0C1824]">Date & Time</span>
                  <span className="text-[14px] text-[#64748B]">{data.dateTime}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-[#0C1824]">Issue Type</span>
                  <span className="text-[14px] text-[#64748B]">{data.issueType}</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-[#64748B] font-semibold text-[14.5px]">
                  <FileText className="text-[#3B82F6]" size={18} />
                  Conversation Transcript
                </div>
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-[#A6C5F7] text-[12px] font-semibold text-[#64748B] hover:bg-[#F3F7FF] transition-colors">
                  <PlayCircle size={16} className="text-[#64748B]" />
                  Play Audio Recording
                </button>
              </div>

              {/* Chat Transcript Box */}
              <div className="border border-[#EDEFF2] rounded-2xl p-6 flex flex-col gap-5 bg-white shadow-sm">
                {data.messages.map((msg, idx) => (
                  <div key={idx} className="flex flex-col gap-1 w-full text-[13.5px] leading-relaxed">
                    <span className={`font-semibold ${msg.color}`}>{msg.role}</span>
                    <p className="text-[#0C1824]">{msg.text}</p>
                  </div>
                ))}
              </div>

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
