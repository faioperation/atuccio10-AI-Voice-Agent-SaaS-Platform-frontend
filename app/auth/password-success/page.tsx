"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PasswordSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337]">
      <div className="w-[650px] bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm relative">
        <div className="flex flex-col items-center mb-6">
          <div className="flex flex-col items-center gap-2 mb-3">
            <div className="w-16 h-16 relative flex items-center justify-center">
              <Image 
                src="/Clinch_Logo_Light.png" 
                alt="Clinch Logo" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
            <h1 className="text-[28px] font-bold text-[#0C1824] leading-tight mt-6">
              Password Updated <br/> Successfully!
            </h1>
          </div>
          <p className="text-[13.5px] text-[#64748B] mt-2 text-center max-w-[320px] leading-relaxed">
            Your password has been set successfully. Please return to login screen to continue.
          </p>
        </div>

        <button
          onClick={() => router.push("/auth/login")}
          className="w-full mt-4 bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
