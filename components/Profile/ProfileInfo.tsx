"use client";

import React from "react";
import Image from "next/image";
import { Edit3 } from "lucide-react";

interface ProfileInfoProps {
  onEdit: () => void;
  onChangePassword: () => void;
}

const ProfileInfo = ({ onEdit, onChangePassword }: ProfileInfoProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#F1F5F9] w-full max-w-[1100px] relative" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
      {/* Card Header */}
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-[20px] md:text-2xl font-bold text-[#0C1824]">Profile</h3>
        <button 
          onClick={onEdit}
          className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-black hover:bg-[#F8FAFC] transition-all"
        >
          <Edit3 size={18} />
        </button>
      </div>

      <div className="flex flex-col space-y-8">
        {/* Avatar and Change Password Button Row */}
        <div className="flex items-end justify-between">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#F8FAFC] shadow-sm bg-gray-100">
            <Image
              src="/person2.jpeg"
              alt="Profile"
              width={120}
              height={120}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <button 
            onClick={onChangePassword}
            className="bg-[#F3F3F3] hover:bg-[#E2E8F0] text-black px-6 py-2.5 rounded-lg text-[13px] font-semibold transition-all"
          >
            Change Password
          </button>
        </div>

        {/* Form Fields (Read-only view) */}
        <div className="space-y-6 w-full">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#64748B] ml-1">Name</label>
            <div className="w-full px-4 py-3 rounded-xl border border-[#F1F5F9] bg-[#FAFBFC] text-[#0C1824] text-[14px] font-medium">
              Akash Rohman
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#64748B] ml-1">Email</label>
            <div className="w-full px-4 py-3 rounded-xl border border-[#F1F5F9] bg-[#FAFBFC] text-[#64748B] text-[14px]">
              algoridomai@gmail.com
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#64748B] ml-1">Number</label>
            <div className="w-full px-4 py-3 rounded-xl border border-[#F1F5F9] bg-[#FAFBFC] text-[#64748B] text-[14px]">
              +8801486545864
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
