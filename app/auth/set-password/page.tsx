"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

interface SetPasswordInputs {
  newPassword?: string;
  confirmPassword?: string;
}

export default function SetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SetPasswordInputs>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: SetPasswordInputs) => {
    console.log(data);
    // Proceed to success page
    router.push("/auth/password-success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337]">
      <div className="w-[650px] bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm relative">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
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
            <h1 className="text-[28px] font-bold text-[#0C1824] leading-tight mt-2">Set Password</h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1 text-center">
            Start with new journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="******"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] pr-12 focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0C1824] transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-[12px] mt-0.5">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="******"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match"
                })}
                className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] pr-12 focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0C1824] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-[12px] mt-0.5">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
