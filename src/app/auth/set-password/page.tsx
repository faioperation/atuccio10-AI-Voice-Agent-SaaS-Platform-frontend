"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import {
  getPendingResetEmail,
  clearPendingResetEmail,
  maskEmail,
  extractApiFieldErrors,
} from "@/features/auth/utils/auth.utils";
import { RESET_OTP_COOLDOWN_SECONDS } from "@/features/auth/constants/auth.constants";
import { ApiError } from "@/lib/api/client";
import AuthAlert from "@/features/auth/components/AuthAlert";

interface SetPasswordInputs {
  otp: string[];
  new_password: string;
  confirm_password: string;
}

const COOLDOWN_KEY = "reset_otp_cooldown_expires_at";

export default function SetPasswordPage() {
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [email, setEmail] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const resetPasswordMutation = useResetPassword();
  const forgotPasswordMutation = useForgotPassword();

  const { control, register, handleSubmit, watch, setValue, getValues, reset, formState: { errors } } =
    useForm<SetPasswordInputs>({
      defaultValues: { otp: ["", "", "", "", "", ""], new_password: "", confirm_password: "" },
    });

  const newPassword = watch("new_password");

  // Load email from sessionStorage, restore cooldown
  useEffect(() => {
    const pending = getPendingResetEmail();
    if (!pending) {
      router.replace("/auth/forget-password");
      return;
    }
    setEmail(pending);
    inputRefs.current[0]?.focus();

    const expiresAt = sessionStorage.getItem(COOLDOWN_KEY);
    if (expiresAt) {
      const remaining = Math.max(0, Math.ceil((Number(expiresAt) - Date.now()) / 1000));
      if (remaining > 0) {
        setCooldown(remaining);
        return;
      }
    }

    // Start cooldown from when forgot-password was submitted
    const expires = Date.now() + RESET_OTP_COOLDOWN_SECONDS * 1000;
    sessionStorage.setItem(COOLDOWN_KEY, String(expires));
    setCooldown(RESET_OTP_COOLDOWN_SECONDS);
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) { clearInterval(id); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  /* ======================
      Submit
  ====================== */
  const onSubmit = async (data: SetPasswordInputs) => {
    const otpString = data.otp.join("");
    if (otpString.length !== 6) {
      setNotice({ type: "error", message: "Please enter the complete 6-digit code." });
      return;
    }
    if (!email) return;
    setNotice(null);

    try {
      await resetPasswordMutation.mutateAsync({
        email,
        otp: otpString,
        new_password: data.new_password,
      });

      clearPendingResetEmail();
      sessionStorage.removeItem(COOLDOWN_KEY);
      router.push("/auth/password-success");
    } catch (error) {
      if (error instanceof ApiError) {
        const fieldErrors = extractApiFieldErrors(error.data);
        const msg =
          fieldErrors.otp ||
          fieldErrors.new_password ||
          fieldErrors.non_field_errors ||
          fieldErrors.detail ||
          "Invalid code or password. Please try again.";
        setNotice({ type: "error", message: msg });
      } else {
        setNotice({ type: "error", message: "Something went wrong. Please try again." });
      }
    }
  };

  /* ======================
      Resend Code
  ====================== */
  const handleResend = async () => {
    if (!email || cooldown > 0 || forgotPasswordMutation.isPending) return;
    setNotice(null);

    try {
      await forgotPasswordMutation.mutateAsync({ email });

      const expires = Date.now() + RESET_OTP_COOLDOWN_SECONDS * 1000;
      sessionStorage.setItem(COOLDOWN_KEY, String(expires));
      setCooldown(RESET_OTP_COOLDOWN_SECONDS);

      setNotice({ type: "success", message: "A new reset code has been sent to your email." });
      reset({ otp: ["", "", "", "", "", ""], new_password: "", confirm_password: "" });
      inputRefs.current[0]?.focus();
    } catch (error) {
      if (error instanceof ApiError) {
        const fieldErrors = extractApiFieldErrors(error.data);
        const msg = fieldErrors.email || fieldErrors.detail || "Failed to resend. Please try again.";
        setNotice({ type: "error", message: msg });
      } else {
        setNotice({ type: "error", message: "Something went wrong. Please try again." });
      }
    }
  };

  /* ======================
      OTP Input Handlers
  ====================== */
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    setValue(`otp.${index}`, value);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !getValues(`otp.${index}`) && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasteData)) return;
    pasteData.split("").forEach((char, idx) => {
      if (idx < 6) setValue(`otp.${idx}`, char);
    });
    inputRefs.current[5]?.focus();
  };

  if (!email) return null;

  const isSubmitting = resetPasswordMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337]">
      <div className="w-full max-w-[560px] mx-4 bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm">
        {/* Header */}
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
              Set New Password
            </h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1 text-center px-4 leading-relaxed">
            We sent a 6-digit code to
          </p>
          <p className="text-[14px] font-semibold text-[#0C1824] mt-0.5">{maskEmail(email)}</p>
        </div>

        {/* Notice */}
        {notice && <AuthAlert type={notice.type} message={notice.message} className="mb-6" />}

        {/* Info box */}
        <div className="bg-[#FAFBFC] border border-[#EDEFF2] rounded-lg px-4 py-3 mb-6">
          <p className="text-[13px] text-[#64748B] leading-relaxed">
            Didn&apos;t receive the email? Check your spam folder or use the resend button below.
            The code expires in <span className="font-semibold text-[#0C1824]">5 minutes</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP */}
          <div>
            <label className="text-[13px] font-medium text-[#64748B] block mb-3">
              Verification Code
            </label>
            <div className="flex justify-center gap-3 md:gap-4" onPaste={handleOtpPaste}>
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
                      onChange={(e) => { handleOtpChange(e, index); field.onChange(e); }}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="w-12 h-12 md:w-[60px] md:h-[60px] text-center border border-[#EDEFF2] rounded-[10px] bg-[#FAFBFC] text-xl font-bold text-[#0C1824] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-all"
                    />
                  )}
                />
              ))}
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("new_password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
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
            {errors.new_password && (
              <p className="text-red-500 text-[12px] mt-0.5">{errors.new_password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) => value === newPassword || "Passwords do not match",
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
            {errors.confirm_password && (
              <p className="text-red-500 text-[12px] mt-0.5">{errors.confirm_password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center mt-6">
          {cooldown > 0 ? (
            <p className="text-[#94A3B8] text-[13px] font-medium">
              Resend code in{" "}
              <span className="font-bold text-[#64748B] tabular-nums">{cooldown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={forgotPasswordMutation.isPending}
              className="text-[13px] font-semibold text-[#1A6BDC] hover:text-[#1558be] transition-colors disabled:opacity-60"
            >
              {forgotPasswordMutation.isPending ? "Sending..." : "Resend Code"}
            </button>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              clearPendingResetEmail();
              sessionStorage.removeItem(COOLDOWN_KEY);
              router.push("/auth/forget-password");
            }}
            className="text-[13px] text-[#94A3B8] hover:text-[#64748B] transition-colors"
          >
            ← Change email / Back
          </button>
        </div>
      </div>
    </div>
  );
}
