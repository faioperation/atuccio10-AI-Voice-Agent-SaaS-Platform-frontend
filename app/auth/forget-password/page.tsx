"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ForgetPasswordInputs {
  email: string;
}

export default function ForgetPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgetPasswordInputs>();
  const router = useRouter();

  const onSubmit = (data: ForgetPasswordInputs) => {
    console.log(data);
    // Proceed to OTP page or API call
    router.push("/auth/otp");
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
            <h1 className="text-[28px] font-bold text-[#0C1824] leading-tight mt-2">Forgot Password?</h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1 text-center px-4">
            Please enter your email to get verification code
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-[12px] mt-0.5">
                Email is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
