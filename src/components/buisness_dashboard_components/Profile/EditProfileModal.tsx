"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-[850px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#F1F5F9]">
          <h3 className="text-[18px] font-bold text-[#0C1824]">Edit Profile</h3>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#64748B] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-gray-100 border border-[#F1F5F9]">
              <Image
                src="/person2.jpeg"
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log("File selected:", file.name);
                }
              }}
            />
            <button 
              onClick={handleUploadClick}
              className="bg-[#F3F3F3] hover:bg-[#E2E8F0] text-[#34322D] px-4 py-2 rounded-lg text-[13px] font-semibold transition-all"
            >
              Upload File
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#64748B] ml-1">Name</label>
              <input
                type="text"
                defaultValue="Akash Rohman"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#64748B] ml-1">Email</label>
              <input
                type="email"
                defaultValue="algoridomai@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#64748B] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#64748B] ml-1">Number</label>
              <input
                type="text"
                defaultValue="+88014655254"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button 
              onClick={onClose}
              className="px-8 py-2.5 rounded-lg border border-[#FF5A5A] text-[#FF5A5A] text-[14px] font-bold hover:bg-red-50 transition-all"
            >
              Cancel
            </button>
            <button className="px-8 py-2.5 rounded-lg bg-[#4F8AFF] text-white text-[14px] font-bold hover:bg-[#3B7AFF] transition-all shadow-sm shadow-blue-100">
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
