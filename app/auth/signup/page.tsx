"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  terms: boolean;
}

export default function SignupPage() {
  const router = useRouter();
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignupFormInputs>();

  const password = watch("password");

  const onSubmit = async (data: SignupFormInputs) => {
    console.log("Signup Data:", data);
    // TODO: Implement signup API logic here
    // e.g. await axios.post("/auth/register/", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] text-[#2F3337] py-12">
      <div className="w-[650px] bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm relative">
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
              />
            </div>
            <h1 className="text-[28px] font-bold text-[#0C1824] leading-tight mt-2">Create an Account</h1>
          </div>
          <p className="text-[14px] text-[#64748B] mt-1">
            Start your journey with us
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#64748B]">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
              />
              {errors.firstName && (
                <p className="text-red-500 text-[12px] mt-0.5">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#64748B]">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg bg-[#FAFBFC] border border-[#EDEFF2] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
              />
              {errors.lastName && (
                <p className="text-red-500 text-[12px] mt-0.5">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">
              Email
            </label>
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

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#64748B]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" }
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
            <label className="text-[13px] font-medium text-[#64748B]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: value => value === password || "Passwords do not match"
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
              <p className="text-red-500 text-[12px] mt-0.5">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Checkbox */}
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
              <a href="#" className="font-semibold text-[#1A6BDC] hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-[#1A6BDC] hover:underline">Privacy Policy</a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-[12px] mt-0.5">{errors.terms.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm disabled:opacity-70"
          >
            Create Account
          </button>
        </form>

        {/* Login Option */}
        <div className="mt-8 text-center">
          <p className="text-[14px] text-[#64748B]">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-semibold text-[#1A6BDC] hover:text-[#1558be] transition-colors"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
