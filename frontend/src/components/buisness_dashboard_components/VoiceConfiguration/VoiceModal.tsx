"use client";

import React from "react";
import { Mic } from "lucide-react";

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onSave: () => void;
}

export default function VoiceModal({
  isOpen,
  onClose,
  isRecording,
  onToggleRecording,
  onSave,
}: VoiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative bg-white rounded-[20px] shadow-xl p-6 w-[380px] flex flex-col gap-5 z-10">
        <h3 className="text-[16px] font-[700] text-[#0C1824]">Set Voice</h3>

        {/* Dashed recording area */}
        <div
          className={`flex items-center justify-center border-2 border-dashed rounded-[12px] h-[180px] cursor-pointer transition-all
            ${
              isRecording
                ? "border-[#1A6BDC] bg-[#EBF3FF]"
                : "border-[#93C5FD] bg-[#F8FBFF] hover:bg-[#EBF3FF]"
            }`}
          onClick={onToggleRecording}
        >
          <div className="flex flex-col items-center gap-3">
            <Mic
              size={52}
              strokeWidth={1.4}
              className={`transition-colors ${
                isRecording ? "text-[#1A6BDC]" : "text-[#0C1824]"
              }`}
            />
            {isRecording && (
              <span className="text-[12px] font-semibold text-[#1A6BDC] animate-pulse">
                Recording...
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[8px] border border-[#EF4444] text-[#EF4444] text-[13px] font-semibold hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 rounded-[8px] bg-[#1A6BDC] hover:bg-[#1558BE] text-white text-[13px] font-semibold transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
