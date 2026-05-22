"use client";

import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useChangePassword } from "@/features/auth/hooks/useChangePassword";
import { extractApiFieldErrors } from "@/features/auth/utils/auth.utils";
import { ApiError } from "@/lib/api/client";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChangePasswordFormInputs {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const changePassword = useChangePassword();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormInputs>();

  const newPassword = watch("new_password");

  useEffect(() => {
    if (!isOpen) {
      reset();
      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    try {
      await changePassword.mutateAsync(data);
      toast.success("Password changed successfully.");
      reset();
      onClose();
    } catch (err) {
      if (err instanceof ApiError) {
        const fe = extractApiFieldErrors(err.data);
        const msg =
          fe.old_password ||
          fe.new_password ||
          fe.confirm_password ||
          fe.non_field_errors ||
          fe.detail ||
          "Failed to change password.";
        toast.error(msg);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const isSubmitting = changePassword.isPending;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-[850px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#F1F5F9]">
          <h3 className="text-[18px] font-bold text-[#0C1824]">Change Password</h3>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#64748B] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-6">
            <div className="space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#64748B] ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="********"
                    {...register("old_password", { required: "Current password is required" })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors pr-12 disabled:opacity-60"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                  >
                    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.old_password && (
                  <p className="text-[12px] text-red-500">{errors.old_password.message}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#64748B] ml-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="********"
                    {...register("new_password", {
                      required: "New password is required",
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors pr-12 disabled:opacity-60"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.new_password && (
                  <p className="text-[12px] text-red-500">{errors.new_password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#64748B] ml-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="********"
                    {...register("confirm_password", {
                      required: "Please confirm your new password",
                      validate: (val) => val === newPassword || "Passwords do not match",
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors pr-12 disabled:opacity-60"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirm_password && (
                  <p className="text-[12px] text-red-500">{errors.confirm_password.message}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-lg border border-[#FF5A5A] text-[#FF5A5A] text-[14px] font-bold hover:bg-red-50 transition-all disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-lg bg-[#4F8AFF] text-white text-[14px] font-bold hover:bg-[#3B7AFF] transition-all shadow-sm shadow-blue-100 disabled:opacity-60 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Change"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
