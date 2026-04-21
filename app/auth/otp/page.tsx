"use client";

import React, { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface OtpInputs {
  otp: string[];
}

export default function OtpPage() {
  const router = useRouter();
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { control, handleSubmit, setValue, getValues } = useForm<OtpInputs>({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  /* ======================
      Countdown Timer
  ====================== */
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  /* ======================
      Submit OTP
  ====================== */
  const onSubmit = (data: OtpInputs) => {
    const otpString = data.otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }
    console.log("OTP Submitted:", otpString);
    // Proceed to set password
    router.push("/auth/set-password");
  };

  /* ======================
      Handle Typing
  ====================== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    setValue(`otp.${index}`, value);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !getValues(`otp.${index}`) && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* ======================
      Paste OTP
  ====================== */
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    newOtp.forEach((char, idx) => {
      if (idx < 6) {
        setValue(`otp.${idx}`, char);
      }
    });
    
    // Move focus to last input
    inputRefs.current[5]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337]">
      <div className="w-[650px] bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm relative">
        {/* Logo */}
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
            <h1 className="text-[28px] font-bold text-[#0C1824] leading-tight mt-2">OTP Verification</h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1 text-center px-4 leading-relaxed">
            We sent a code to your email address. Please check <br />
            your email for the 6 digit code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* OTP Inputs */}
          <div 
            className="flex justify-center gap-3 md:gap-4" 
            onPaste={handlePaste}
          >
            {[...Array(6)].map((_, index) => (
              <Controller
                key={index}
                name={`otp.${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="text"
                    ref={(el) => {
                      field.ref(el);
                      inputRefs.current[index] = el;
                    }}
                    onChange={(e) => {
                      handleChange(e, index);
                      field.onChange(e);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 md:w-[60px] md:h-[60px] text-center border border-[#EDEFF2] rounded-[10px] bg-[#FAFBFC] text-xl font-bold text-[#0C1824] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-all"
                  />
                )}
              />
            ))}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm"
          >
            Continue
          </button>
        </form>

        {/* Resend */}
        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-[#94A3B8] text-[13px] font-medium">
              Resend OTP in <span className="font-bold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="text-[13px] font-semibold text-[#1A6BDC] hover:text-[#1558be] transition-colors"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
