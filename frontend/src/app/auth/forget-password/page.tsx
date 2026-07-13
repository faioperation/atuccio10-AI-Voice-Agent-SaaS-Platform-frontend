"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { setPendingResetEmail } from "@/features/auth/utils/auth.utils";
import { extractApiFieldErrors } from "@/features/auth/utils/auth.utils";
import { ApiError } from "@/lib/api/client";
import AuthAlert from "@/features/auth/components/AuthAlert";

interface ForgetPasswordInputs {
  email: string;
}

export default function ForgetPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgetPasswordInputs>();
  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const onSubmit = async (data: ForgetPasswordInputs) => {
    setNotice(null);
    try {
      await forgotPasswordMutation.mutateAsync({ email: data.email });
      setPendingResetEmail(data.email);
      router.push("/auth/set-password");
    } catch (error) {
      if (error instanceof ApiError) {
        const fieldErrors = extractApiFieldErrors(error.data);
        const msg =
          fieldErrors.email ||
          fieldErrors.non_field_errors ||
          fieldErrors.detail ||
          "Failed to send reset code. Please try again.";
        setNotice({ type: "error", message: msg });
      } else {
        setNotice({ type: "error", message: "Something went wrong. Please try again." });
      }
    }
  };

  const isSubmitting = forgotPasswordMutation.isPending;

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
              Forgot Password?
            </h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1 text-center px-4 leading-relaxed">
            Enter your email and we&apos;ll send you a verification code to reset your password.
          </p>
        </div>

        {/* Notice */}
        {notice && <AuthAlert type={notice.type} message={notice.message} className="mb-6" />}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-[12px] mt-0.5">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Code"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/auth/login")}
            className="text-[13px] text-[#94A3B8] hover:text-[#64748B] transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
