"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/features/auth/hooks/useUpdateProfile";
import { extractApiFieldErrors } from "@/features/auth/utils/auth.utils";
import { ApiError } from "@/lib/api/client";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditProfileFormInputs {
  name: string;
  phone: string;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const FALLBACK_AVATAR = "/system_admin_avatar.png";

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const { user, updateUser } = useAuth();
  const updateProfile = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormInputs>();

  useEffect(() => {
    if (isOpen && user) {
      reset({ name: user.name, phone: user.phone });
      setPreviewUrl(null);
      setImageDataUrl(null);
      setImageError(null);
    }
  }, [isOpen, user, reset]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError(null);

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Please select a valid image (JPG, PNG, WebP, GIF, SVG).");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image must be under 2MB.");
      return;
    }

    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = (ev) => setImageDataUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: EditProfileFormInputs) => {
    try {
      const payload: { name: string; phone: string; profile_image?: string } = {
        name: data.name,
        phone: data.phone,
      };
      if (imageDataUrl) payload.profile_image = imageDataUrl;

      const updated = await updateProfile.mutateAsync(payload);
      updateUser(updated);
      toast.success("Profile updated successfully.");
      onClose();
    } catch (err) {
      if (err instanceof ApiError) {
        const fe = extractApiFieldErrors(err.data);
        const msg =
          fe.name ||
          fe.phone ||
          fe.profile_image ||
          fe.non_field_errors ||
          fe.detail ||
          "Failed to update profile.";
        toast.error(msg);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const displayAvatar = previewUrl ?? user?.profile_image ?? FALLBACK_AVATAR;
  const isSubmitting = updateProfile.isPending;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-[850px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#F1F5F9]">
          <h3 className="text-[18px] font-bold text-[#0C1824]">Edit Profile</h3>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#64748B] transition-colors hover:cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center gap-4">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-gray-100 border border-[#F1F5F9] flex-shrink-0">
                <Image
                  src={displayAvatar}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  unoptimized={displayAvatar.startsWith("blob:") || displayAvatar.startsWith("data:")}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#F3F3F3] hover:bg-[#E2E8F0] text-[#34322D] px-4 py-2 rounded-lg text-[13px] font-semibold transition-all hover:cursor-pointer"
                >
                  Upload File
                </button>
                {imageError && (
                  <p className="text-[12px] text-red-500">{imageError}</p>
                )}
                <p className="text-[11px] text-[#94A3B8]">JPG, PNG, WebP, GIF, SVG · max 2MB</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#64748B] ml-1">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors disabled:opacity-60"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-[12px] text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#64748B] ml-1">Email</label>
                <input
                  type="email"
                  value={user?.email ?? ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#64748B] text-[14px] bg-[#FAFBFC] cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#64748B] ml-1">Number</label>
                <input
                  type="text"
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0C1824] text-[14px] focus:outline-none focus:border-[#4F8AFF] transition-colors disabled:opacity-60"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-[12px] text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-lg border border-[#FF5A5A] text-[#FF5A5A] text-[14px] font-bold hover:bg-red-50 transition-all disabled:opacity-60 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !!imageError}
                className="px-8 py-2.5 rounded-lg bg-[#4F8AFF] text-white text-[14px] font-bold hover:bg-[#3B7AFF] transition-all shadow-sm shadow-blue-100 disabled:opacity-60 flex items-center gap-2 hover:cursor-pointer"
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

export default EditProfileModal;
