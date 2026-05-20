"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

const SupportForm = () => {
  return (
    <div 
      className="bg-white rounded-2xl p-8 border border-[#F1F5F9] w-full max-w-[1000px]"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
    >
      <h3 className="text-[20px] font-bold text-[#0C1824] mb-8">Support</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Field */}
          <div className="space-y-2.5">
            <label className="text-[14px] font-bold text-[#0C1824] ml-1">Date</label>
            <div className="relative">
              <input
                type="date"
                defaultValue="10/05/2026"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#64748B] text-[14px] focus:outline-none focus:border-[#4F8AFF] bg-white transition-colors"
              />
            </div>
          </div>

          {/* Issue Field */}
          <div className="space-y-2.5">
            <label className="text-[14px] font-bold text-[#0C1824] ml-1">Issue</label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#64748B] text-[14px] focus:outline-none focus:border-[#4F8AFF] bg-white transition-colors cursor-pointer">
                <option>Technical</option>
                <option>Billing</option>
                <option>General</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2.5">
          <label className="text-[14px] font-bold text-[#0C1824] ml-1">Message</label>
          <textarea
            placeholder="type..."
            rows={6}
            className="w-full px-4 py-4 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] resize-none transition-colors"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button className="bg-[#4F8AFF] hover:bg-[#3B7AFF] text-white px-10 py-2.5 rounded-lg text-[14px] font-bold transition-all shadow-sm shadow-blue-100">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportForm;
