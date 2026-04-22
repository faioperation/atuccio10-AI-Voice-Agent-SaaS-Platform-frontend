"use client";

import { useState } from "react";
import { ChevronDown, Mic } from "lucide-react";
import VoiceModal from "@/components/VoiceConfiguration/VoiceModal";

export default function VoiceConfigurationPage() {
  const [gender, setGender] = useState("Male");
  const [voiceTon, setVoiceTon] = useState("Professional");
  const [showModal, setShowModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSaveModal = () => {
    setShowModal(false);
    setIsRecording(false);
    // Logic to save the recording would go here
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* ── Left: Voice Ton Card ── */}
        <div className="bg-white rounded-[16px] border border-[#EDEFF2] shadow-sm p-6 flex flex-col gap-5 flex-1">
          <h2 className="text-[15px] font-[700] text-[#0C1824]">Voice Ton</h2>

          {/* Gender Select */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0C1824]">
              Gender
            </label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full appearance-none bg-white border border-[#EDEFF2] rounded-[10px] px-4 py-3 text-[13px] text-[#0C1824] font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/30 focus:border-[#1A6BDC] transition"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
              />
            </div>
          </div>

          {/* Voice Ton Select */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0C1824]">
              Voice Ton
            </label>
            <div className="relative">
              <select
                value={voiceTon}
                onChange={(e) => setVoiceTon(e.target.value)}
                className="w-full appearance-none bg-white border border-[#EDEFF2] rounded-[10px] px-4 py-3 text-[13px] text-[#0C1824] font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/30 focus:border-[#1A6BDC] transition"
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Formal</option>
                <option>Casual</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
              />
            </div>
          </div>

          {/* Save button — right-aligned */}
          <div className="flex justify-end mt-2">
            <button className="bg-[#1A6BDC] hover:bg-[#1558BE] text-white text-[13px] font-semibold px-5 py-2 rounded-[8px] transition-colors">
              Save
            </button>
          </div>
        </div>

        {/* ── Right: Set Voice Card ── */}
        <div className="bg-white rounded-[16px] border border-[#EDEFF2] shadow-sm p-6 flex flex-col gap-4 flex-1">
          <h2 className="text-[15px] font-[700] text-[#0C1824]">Set Voice</h2>

          {/* Dashed mic area */}
          <div
            className="flex-1 flex items-center justify-center border-2 border-dashed border-[#93C5FD] rounded-[12px] min-h-[160px] bg-[#F8FBFF] cursor-pointer hover:bg-[#EBF3FF] transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Mic size={56} strokeWidth={1.4} className="text-[#0C1824]" />
          </div>

          {/* Start button — right-aligned */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#1A6BDC] hover:bg-[#1558BE] text-white text-[13px] font-semibold px-6 py-2 rounded-[8px] transition-colors"
            >
              Start
            </button>
          </div>
        </div>
      </div>

      {/* ── Modal Component ── */}
      <VoiceModal
        isOpen={showModal}
        onClose={handleCloseModal}
        isRecording={isRecording}
        onToggleRecording={() => setIsRecording(!isRecording)}
        onSave={handleSaveModal}
      />
    </div>
  );
}
