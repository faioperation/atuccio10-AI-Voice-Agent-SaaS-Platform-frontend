"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useVerifyEmail } from "@/features/auth/hooks/useVerifyEmail";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import {
  getPendingVerificationEmail,
  clearPendingVerificationEmail,
  getRedirectIntent,
  clearRedirectIntent,
  maskEmail,
  extractApiFieldErrors,
} from "@/features/auth/utils/auth.utils";
import { ApiError } from "@/lib/api/client";
import { OTP_RESEND_COOLDOWN_SECONDS } from "@/features/auth/constants/auth.constants";
import AuthAlert from "@/features/auth/components/AuthAlert";

interface OtpInputs {
  otp: string[];
}

export default function OtpPage() {
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [email, setEmail] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(OTP_RESEND_COOLDOWN_SECONDS);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const verifyEmailMutation = useVerifyEmail();
  const resendOtpMutation = useResendOtp();

  const { control, handleSubmit, setValue, getValues, reset } = useForm<OtpInputs>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  // Load email from sessionStorage — redirect to signup if missing
  useEffect(() => {
    const pending = getPendingVerificationEmail();
    if (!pending) {
      router.replace("/auth/signup");
      return;
    }
    setEmail(pending);
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  /* ======================
      Submit OTP
  ====================== */
  const onSubmit = async (data: OtpInputs) => {
    const otpString = data.otp.join("");
    if (otpString.length !== 6) {
      setNotice({ type: "error", message: "Please enter the complete 6-digit code." });
      return;
    }

    if (!email) return;
    setNotice(null);

    try {
      await verifyEmailMutation.mutateAsync({ email, otp: otpString });

      clearPendingVerificationEmail();
      const intent = getRedirectIntent();
      clearRedirectIntent();

      // Redirect to original page, or home — never back to auth
      router.push(intent && !intent.startsWith("/auth") ? intent : "/");
    } catch (error) {
      if (error instanceof ApiError) {
        const fieldErrors = extractApiFieldErrors(error.data);
        const msg =
          fieldErrors.otp ||
          fieldErrors.non_field_errors ||
          fieldErrors.detail ||
          "Invalid or expired code. Please try again.";
        setNotice({ type: "error", message: msg });
      } else {
        setNotice({ type: "error", message: "Something went wrong. Please try again." });
      }
    }
  };

  /* ======================
      Resend OTP
  ====================== */
  const handleResend = async () => {
    if (!email || cooldown > 0 || resendOtpMutation.isPending) return;
    setNotice(null);

    try {
      await resendOtpMutation.mutateAsync({ email, type: "email_verify" });
      setNotice({ type: "success", message: "A new verification code has been sent." });
      setCooldown(OTP_RESEND_COOLDOWN_SECONDS);
      reset({ otp: ["", "", "", "", "", ""] });
      inputRefs.current[0]?.focus();
    } catch (error) {
      if (error instanceof ApiError) {
        const raw = error.data as Record<string, unknown> | null;
        if (raw?.code === "rate_limit_exceeded" && typeof raw.wait_time === "number") {
          setCooldown(raw.wait_time);
          setNotice({
            type: "error",
            message: `Please wait ${raw.wait_time}s before requesting another code.`,
          });
        } else {
          const fieldErrors = extractApiFieldErrors(raw);
          const msg = fieldErrors.error || fieldErrors.detail || "Failed to resend. Try again.";
          setNotice({ type: "error", message: msg });
        }
      } else {
        setNotice({ type: "error", message: "Something went wrong. Please try again." });
      }
    }
  };

  /* ======================
      OTP Input Handlers
  ====================== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    setValue(`otp.${index}`, value);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !getValues(`otp.${index}`) && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasteData)) return;
    pasteData.split("").forEach((char, idx) => {
      if (idx < 6) setValue(`otp.${idx}`, char);
    });
    inputRefs.current[5]?.focus();
  };

  if (!email) return null;

  const isSubmitting = verifyEmailMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337]">
      <div className="w-full max-w-[560px] mx-4 bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex flex-col items-center gap-2 mb-3">
            <div className="w-32 h-32 relative flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Clinch Logo"
                width={160}
                height={160}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <h1 className="text-[28px] font-bold text-[#0C1824] leading-tight mt-2">
              OTP Verification
            </h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1 text-center px-4 leading-relaxed">
            Enter the 6-digit code sent to
          </p>
          <p className="text-[14px] font-semibold text-[#0C1824] mt-0.5">{maskEmail(email)}</p>
        </div>

        {/* Notice banner */}
        {notice && <AuthAlert type={notice.type} message={notice.message} className="mb-6" />}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 md:gap-4" onPaste={handlePaste}>
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
            disabled={isSubmitting}
            className="w-full bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify & Continue"
            )}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center mt-6">
          {cooldown > 0 ? (
            <p className="text-[#94A3B8] text-[13px] font-medium">
              Resend OTP in{" "}
              <span className="font-bold text-[#64748B] tabular-nums">{cooldown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendOtpMutation.isPending}
              className="text-[13px] font-semibold text-[#1A6BDC] hover:text-[#1558be] transition-colors disabled:opacity-60"
            >
              {resendOtpMutation.isPending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>

        {/* Back link */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push("/auth/verify-email")}
            className="text-[13px] text-[#94A3B8] hover:text-[#64748B] transition-colors"
          >
            ← Back to email confirmation
          </button>
        </div>
      </div>
    </div>
  );
}
