"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import {
  setRedirectIntent,
  getRedirectIntent,
  clearRedirectIntent,
  setPendingVerificationEmail,
  extractApiFieldErrors,
} from "@/features/auth/utils/auth.utils";
import { ApiError } from "@/lib/api/client";
import AuthAlert from "@/features/auth/components/AuthAlert";

interface SignupFormInputs {
  name: string;
  business_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const registerMutation = useRegister();
  const resendOtpMutation = useResendOtp();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const password = watch("password");

  // Capture redirect intent from ?redirect= param or document.referrer
  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      setRedirectIntent(redirect);
      return;
    }
    if (typeof document !== "undefined" && document.referrer) {
      try {
        const referrerPath = new URL(document.referrer).pathname;
        if (!referrerPath.startsWith("/auth")) {
          setRedirectIntent(referrerPath);
        }
      } catch {
        // invalid URL, ignore
      }
    }
  }, [searchParams]);

  const onSubmit = async (data: SignupFormInputs) => {
    setFormError(null);

    try {
      const res = await registerMutation.mutateAsync({
        name: data.name,
        business_name: data.business_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      setPendingVerificationEmail(res.user.email);

      if (!res.user.is_verified) {
        router.push("/auth/verify-email");
      } else {
        const intent = getRedirectIntent();
        clearRedirectIntent();
        router.push(intent || "/");
      }
    } catch (error) {
      if (error instanceof ApiError) {
        const fieldErrors = extractApiFieldErrors(error.data);

        // Case 2: email already exists but may be unverified — probe with resend OTP
        if (fieldErrors.email?.toLowerCase().includes("already exists")) {
          try {
            await resendOtpMutation.mutateAsync({ email: data.email, type: "email_verify" });
            setPendingVerificationEmail(data.email);
            router.push("/auth/verify-email");
            return;
          } catch (resendError) {
            if (resendError instanceof ApiError && resendError.status === 400) {
              // Account is verified; direct user to login
              setFormError(
                "This email is already registered. Please log in to your account."
              );
            } else {
              setError("email", { message: fieldErrors.email });
            }
            return;
          }
        }

        if (fieldErrors.email) setError("email", { message: fieldErrors.email });
        if (fieldErrors.phone) setError("phone", { message: fieldErrors.phone });
        if (fieldErrors.name) setError("name", { message: fieldErrors.name });
        if (fieldErrors.business_name)
          setError("business_name", { message: fieldErrors.business_name });
        if (fieldErrors.password) setError("password", { message: fieldErrors.password });

        const topError = fieldErrors.non_field_errors || fieldErrors.detail;
        if (topError) setFormError(topError);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  };

  const isLoading = registerMutation.isPending || resendOtpMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337] py-12">
      <div className="w-full max-w-[650px] mx-4 bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm">
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
              Create an Account
            </h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1">Start your journey with us</p>
        </div>

        {formError && (
          <AuthAlert
            type={formError.includes("already registered") ? "info" : "error"}
            message={formError}
            className="mb-5"
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name & Business Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#64748B]">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Full name is required" })}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
              />
              {errors.name && (
                <p className="text-red-500 text-[12px] mt-0.5">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#64748B]">Business Name</label>
              <input
                type="text"
                {...register("business_name", { required: "Business name is required" })}
                placeholder="Your business name"
                className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
              />
              {errors.business_name && (
                <p className="text-red-500 text-[12px] mt-0.5">
                  {errors.business_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-[12px] mt-0.5">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              placeholder="e.g. +1234567890"
              className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
            />
            {errors.phone && (
              <p className="text-red-500 text-[12px] mt-0.5">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] pr-12 focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0C1824] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[12px] mt-0.5">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
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

          {/* Terms */}
          <div className="flex items-start gap-3 pt-2">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", { required: "You must agree to the terms" })}
                className="w-4 h-4 border border-[#EDEFF2] rounded bg-[#FAFBFC] text-[#1A6BDC] focus:ring-2 focus:ring-[#1A6BDC]/20 cursor-pointer"
              />
            </div>
            <label htmlFor="terms" className="text-[13px] text-[#64748B] cursor-pointer">
              I agree to the{" "}
              <a href="#" className="font-semibold text-[#1A6BDC] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-[#1A6BDC] hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-[12px] mt-0.5">{errors.terms.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login link */}
        <div className="mt-8 text-center">
          <p className="text-[14px] text-[#64748B]">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-semibold text-[#1A6BDC] hover:text-[#1558be] transition-colors hover:cursor-pointer"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f6f8f9]" />}>
      <SignupContent />
    </Suspense>
  );
}
