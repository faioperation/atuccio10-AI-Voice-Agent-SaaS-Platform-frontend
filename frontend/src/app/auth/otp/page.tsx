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
import { getPendingPlanPriceId } from "@/features/billing/utils/billing.utils";
import { ApiError } from "@/lib/api/client";
import AuthAlert from "@/features/auth/components/AuthAlert";
import { useAuth } from "@/contexts/AuthContext";

interface OtpInputs {
  otp: string[];
}

export default function OtpPage() {
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { refetchUser } = useAuth();

  const [email, setEmail] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const verifyEmailMutation = useVerifyEmail();
  const resendOtpMutation = useResendOtp();

  const { control, handleSubmit, setValue, getValues, reset } = useForm<OtpInputs>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  // Calculate cooldown duration based on the resend count.
  // count=1 (initial) → 30s, count=2 (1st resend) → 60s, count=3 → 120s, count=4 → 240s, ...
  const getCooldownDuration = (count: number): number => {
    return 30 * Math.pow(2, count - 1);
  };

  const handleAutoResend = async (targetEmail: string) => {
    setNotice(null);
    try {
      await resendOtpMutation.mutateAsync({ email: targetEmail, type: "email_verify" });
      
      // Since this is the initial auto-send, set resend count to 1 and cooldown to 30s
      sessionStorage.setItem("otp_resend_count", "1");
      const initialCooldown = getCooldownDuration(1); // 30s
      const expires = Date.now() + initialCooldown * 1000;
      sessionStorage.setItem("otp_cooldown_expires_at", String(expires));

      setNotice({ type: "success", message: "Verification code sent to your email." });
      setCooldown(initialCooldown);
      reset({ otp: ["", "", "", "", "", ""] });
    } catch (error) {
      if (error instanceof ApiError) {
        const raw = error.data as Record<string, unknown> | null;
        if (raw?.code === "rate_limit_exceeded" && typeof raw.wait_time === "number") {
          const serverWaitTime = raw.wait_time;
          const expires = Date.now() + serverWaitTime * 1000;
          sessionStorage.setItem("otp_cooldown_expires_at", String(expires));
          setCooldown(serverWaitTime);
          setNotice({
            type: "error",
            message: `Please wait ${serverWaitTime}s before requesting another code.`,
          });
        } else {
          const fieldErrors = extractApiFieldErrors(raw);
          const msg = fieldErrors.error || fieldErrors.detail || "Failed to send code. Try again.";
          setNotice({ type: "error", message: msg });
        }
      } else {
        setNotice({ type: "error", message: "Something went wrong sending verification code." });
      }
    }
  };

  // Load email and initialize/restore cooldown from sessionStorage
  useEffect(() => {
    const pending = getPendingVerificationEmail();
    if (!pending) {
      router.replace("/auth/signup");
      return;
    }
    setEmail(pending);
    inputRefs.current[0]?.focus();

    // Check if there is an active cooldown saved in sessionStorage
    const expiresAt = sessionStorage.getItem("otp_cooldown_expires_at");
    if (expiresAt) {
      const remaining = Math.max(0, Math.ceil((Number(expiresAt) - Date.now()) / 1000));
      if (remaining > 0) {
        setCooldown(remaining);
        return;
      }
    }

    // Check if we need to trigger the initial OTP resend immediately on land
    const triggerNeeded = sessionStorage.getItem("otp_trigger_needed");
    if (triggerNeeded === "true") {
      sessionStorage.removeItem("otp_trigger_needed");
      handleAutoResend(pending);
    } else {
      // Otherwise set the default 30s cooldown
      const initialCooldown = getCooldownDuration(1); // 30s
      const expires = Date.now() + initialCooldown * 1000;
      sessionStorage.setItem("otp_cooldown_expires_at", String(expires));
      sessionStorage.setItem("otp_resend_count", "1");
      setCooldown(initialCooldown);
    }
  }, [router]);

  // Countdown timer effect
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

      // Automatically log the user in on successful verification by refetching profile
      await refetchUser();

      clearPendingVerificationEmail();
      sessionStorage.removeItem("otp_cooldown_expires_at");
      sessionStorage.removeItem("otp_resend_count");

      // Pending billing plan takes priority — go straight to checkout handoff
      if (getPendingPlanPriceId()) {
        router.push("/auth/checkout");
        return;
      }

      const intent = getRedirectIntent();
      clearRedirectIntent();

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
      
      // Update resend count and compute new cooldown
      const savedCount = sessionStorage.getItem("otp_resend_count");
      const currentCount = savedCount ? Number(savedCount) + 1 : 1;
      sessionStorage.setItem("otp_resend_count", String(currentCount));

      const nextCooldown = getCooldownDuration(currentCount);
      const expires = Date.now() + nextCooldown * 1000;
      sessionStorage.setItem("otp_cooldown_expires_at", String(expires));

      setNotice({ type: "success", message: "A new verification code has been sent." });
      setCooldown(nextCooldown);
      reset({ otp: ["", "", "", "", "", ""] });
      inputRefs.current[0]?.focus();
    } catch (error) {
      if (error instanceof ApiError) {
        const raw = error.data as Record<string, unknown> | null;
        if (raw?.code === "rate_limit_exceeded" && typeof raw.wait_time === "number") {
          const serverWaitTime = raw.wait_time;
          const expires = Date.now() + serverWaitTime * 1000;
          sessionStorage.setItem("otp_cooldown_expires_at", String(expires));
          setCooldown(serverWaitTime);
          setNotice({
            type: "error",
            message: `Please wait ${serverWaitTime}s before requesting another code.`,
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
              Check Your Email
            </h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1 text-center px-4 leading-relaxed">
            We sent a 6-digit verification code to
          </p>
          <p className="text-[14px] font-semibold text-[#0C1824] mt-0.5">{maskEmail(email)}</p>
        </div>

        {/* Notice banner */}
        {notice && <AuthAlert type={notice.type} message={notice.message} className="mb-6" />}

        {/* Info box */}
        <div className="bg-[#FAFBFC] border border-[#EDEFF2] rounded-lg px-4 py-3 mb-6">
          <p className="text-[13px] text-[#64748B] leading-relaxed">
            Didn&apos;t receive the email? Check your spam folder, or use the resend button below.
            The code expires in <span className="font-semibold text-[#0C1824]">5 minutes</span>.
          </p>
        </div>

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

        {/* Back / Change Email option */}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              clearPendingVerificationEmail();
              sessionStorage.removeItem("otp_cooldown_expires_at");
              sessionStorage.removeItem("otp_resend_count");
              router.push("/auth/signup");
            }}
            className="text-[13px] text-[#94A3B8] hover:text-[#64748B] transition-colors"
          >
            ← Change email / Back to Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
