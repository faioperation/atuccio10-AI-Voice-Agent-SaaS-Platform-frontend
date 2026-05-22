"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLogin } from "@/features/auth/hooks/useLogin";
import AuthAlert from "@/features/auth/components/AuthAlert";
import {
  extractApiFieldErrors,
  setPendingVerificationEmail,
} from "@/features/auth/utils/auth.utils";
import { getPendingPlanPriceId } from "@/features/billing/utils/billing.utils";
import { ApiError } from "@/lib/api/client";
import type { UserRole } from "@/features/auth/api/auth.types";

interface LoginFormInputs {
  email: string;
  password: string;
}

const ROLE_REDIRECT: Record<UserRole, string> = {
  system_admin: "/system_admin",
  business_admin: "/business_admin",
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const router = useRouter();
  const { login, user, loading } = useAuth();
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<{ type: "error"; message: string } | null>(null);

  // Bounce already-authenticated users to their dashboard.
  // Runs after AuthContext resolves the profile fetch on mount.
  useEffect(() => {
    if (loading || !user) return;
    const role = user.roles.find((r): r is UserRole => r in ROLE_REDIRECT);
    router.replace(role ? ROLE_REDIRECT[role] : "/");
  }, [user, loading, router]);

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Submitting login form with data:", data);
    setNotice(null);
    try {
      const res = await loginMutation.mutateAsync(data);
      console.log("Login response:", res);
      // Unverified user: do NOT authenticate — send them to OTP verification.
      // The OTP page reads otp_trigger_needed and auto-fires the resend call.
      if (!res.user.is_verified) {
        setPendingVerificationEmail(res.user.email);
        sessionStorage.setItem("otp_trigger_needed", "true");
        router.push("/auth/otp");
        return;
      }

      // Verified user: hydrate global auth state and redirect appropriately.
      login(res.user);
      console.log("Authenticated user:", res.user);

      // Pending billing plan takes priority — go straight to checkout handoff
      if (getPendingPlanPriceId()) {
        router.push("/auth/checkout");
        return;
      }

      const role = res.user.roles.find((r): r is UserRole => r in ROLE_REDIRECT);
      router.push(role ? ROLE_REDIRECT[role] : "/");
    } catch (err) {
      console.error("Login error:", err);
      if (err instanceof ApiError) {
        const fieldErrors = extractApiFieldErrors(err.data);
        const msg =
          fieldErrors.non_field_errors ||
          fieldErrors.detail ||
          fieldErrors.email ||
          fieldErrors.password ||
          "Invalid email or password.";
        setNotice({ type: "error", message: msg });
      } else {
        setNotice({ type: "error", message: "Something went wrong. Please try again." });
      }
    }
  };

  const isSubmitting = loginMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337]">
      <div className="w-full max-w-[560px] mx-4 bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="w-32 h-32 relative flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Clinch Logo"
              width={160}
              height={160}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <h1 className="text-[28px] font-bold text-[#0C1824] leading-tight mt-2">
            Login to your Profile
          </h1>
          <p className="text-[14px] text-[#64748B] mt-1">Start with new journey</p>
        </div>

        {/* Error banner */}
        {notice && <AuthAlert type={notice.type} message={notice.message} className="mb-6" />}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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
              <p className="text-[12px] text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] pr-12 focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0C1824] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[12px] text-red-500">{errors.password.message}</p>
            )}

            <div className="flex justify-end mt-1">
              <button
                type="button"
                onClick={() => router.push("/auth/forget-password")}
                className="text-[13px] font-medium text-[#64748B] hover:text-[#1A6BDC] transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-8 text-center">
          <p className="text-[14px] text-[#64748B]">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/auth/signup")}
              className="font-semibold text-[#1A6BDC] hover:text-[#1558be] transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
