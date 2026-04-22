"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      
      {/* Modal Content - Narrower as requested (max-w-md or 500px) */}
      <div className="relative bg-white rounded-2xl w-full max-w-[850px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#F1F5F9]">
          <h3 className="text-[18px] font-bold text-[#0C1824]">Change Password</h3>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#64748B] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Form Fields */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#64748B] ml-1">Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="********"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors pr-12"
                />
                <button 
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#64748B] ml-1">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="********"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors pr-12"
                />
                <button 
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#64748B] ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="********"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors pr-12"
                />
                <button 
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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

export default ChangePasswordModal;
