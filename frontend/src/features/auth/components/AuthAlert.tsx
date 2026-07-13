"use client";

import React from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

interface AuthAlertProps {
  type: "success" | "error" | "info";
  message: string;
  className?: string;
}

const STYLES = {
  success: {
    wrapper: "bg-[#F0FDF4] border border-[#22C47A]/40 text-[#166534]",
    icon: CheckCircle,
    iconColor: "text-[#22C47A]",
  },
  error: {
    wrapper: "bg-[#FFF5F5] border border-[#FF5A5A]/40 text-[#991b1b]",
    icon: XCircle,
    iconColor: "text-[#FF5A5A]",
  },
  info: {
    wrapper: "bg-[#EFF6FF] border border-[#1A6BDC]/30 text-[#1e40af]",
    icon: Info,
    iconColor: "text-[#1A6BDC]",
  },
} as const;

export default function AuthAlert({ type, message, className = "" }: AuthAlertProps) {
  const { wrapper, icon: Icon, iconColor } = STYLES[type];
  return (
    <div className={`flex items-start gap-2.5 rounded-lg px-4 py-3 text-[13px] font-medium leading-relaxed ${wrapper} ${className}`}>
      <Icon size={16} className={`mt-0.5 shrink-0 ${iconColor}`} />
      <span>{message}</span>
    </div>
  );
}
