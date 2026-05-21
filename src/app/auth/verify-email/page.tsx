"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import {
  getPendingVerificationEmail,
  maskEmail,
  extractApiFieldErrors,
} from "@/features/auth/utils/auth.utils";
import { ApiError } from "@/lib/api/client";
import { OTP_RESEND_COOLDOWN_SECONDS } from "@/features/auth/constants/auth.constants";
import AuthAlert from "@/features/auth/components/AuthAlert";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(OTP_RESEND_COOLDOWN_SECONDS);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const resendOtpMutation = useResendOtp();

  // Load pending email from sessionStorage
  useEffect(() => {
    const pending = getPendingVerificationEmail();
    if (!pending) {
      router.replace("/auth/signup");
      return;
    }
    setEmail(pending);
  }, [router]);

  // Countdown timer — starts as soon as the page mounts (OTP was just sent)
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

  const handleResend = async () => {
    if (!email || cooldown > 0 || resendOtpMutation.isPending) return;
    setNotice(null);

    try {
      await resendOtpMutation.mutateAsync({ email, type: "email_verify" });
      setNotice({ type: "success", message: "A new verification code has been sent to your email." });
      setCooldown(OTP_RESEND_COOLDOWN_SECONDS);
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
          const msg = fieldErrors.error || fieldErrors.detail || fieldErrors.non_field_errors || "Failed to resend. Please try again.";
          setNotice({ type: "error", message: msg });
        }
      } else {
        setNotice({ type: "error", message: "Something went wrong. Please try again." });
      }
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337] py-12">
      <div className="w-full max-w-[560px] mx-4 bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
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
        </div>

        {/* Mail icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#EFF6FF] border border-[#1A6BDC]/20 flex items-center justify-center">
            <Mail size={28} className="text-[#1A6BDC]" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-[26px] font-bold text-[#0C1824] leading-tight mb-2">
            Check Your Email
          </h1>
          <p className="text-[14px] text-[#64748B] leading-relaxed">
            We sent a 6-digit verification code to
          </p>
          <p className="text-[15px] font-semibold text-[#0C1824] mt-1">{maskEmail(email)}</p>
        </div>

        {/* Notice banner */}
        {notice && (
          <AuthAlert type={notice.type} message={notice.message} className="mb-5" />
        )}

        {/* Info box */}
        <div className="bg-[#FAFBFC] border border-[#EDEFF2] rounded-lg px-4 py-3 mb-6">
          <p className="text-[13px] text-[#64748B] leading-relaxed">
            Didn&apos;t receive the email? Check your spam folder, or use the resend button below.
            The code expires in <span className="font-semibold text-[#0C1824]">10 minutes</span>.
          </p>
        </div>

        {/* Enter code button */}
        <button
          onClick={() => router.push("/auth/otp")}
          className="w-full bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm"
        >
          Enter Verification Code
        </button>

        {/* Resend */}
        <div className="text-center mt-5">
          {cooldown > 0 ? (
            <p className="text-[#94A3B8] text-[13px] font-medium">
              Resend code in{" "}
              <span className="font-bold text-[#64748B] tabular-nums">{cooldown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendOtpMutation.isPending}
              className="text-[13px] font-semibold text-[#1A6BDC] hover:text-[#1558be] transition-colors disabled:opacity-60"
            >
              {resendOtpMutation.isPending ? "Sending..." : "Resend Code"}
            </button>
          )}
        </div>

        {/* Back to signup */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push("/auth/signup")}
            className="text-[13px] text-[#94A3B8] hover:text-[#64748B] transition-colors"
          >
            ← Use a different email
          </button>
        </div>
      </div>
    </div>
  );
}
