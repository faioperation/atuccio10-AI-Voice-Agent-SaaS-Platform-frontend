"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { billingApi } from "@/features/billing/api/billing.api";
import {
  getPendingPlanPriceId,
  clearPendingPlanPriceId,
} from "@/features/billing/utils/billing.utils";
import type { UserRole } from "@/features/auth/api/auth.types";

const ROLE_REDIRECT: Record<UserRole, string> = {
  system_admin: "/system_admin",
  business_admin: "/business_admin",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const calledRef = useRef(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (calledRef.current) return;
    calledRef.current = true;

    const planPriceId = getPendingPlanPriceId();

    if (!planPriceId) {
      // Nothing to checkout — redirect to dashboard or home
      if (user) {
        const role = user.roles.find((r): r is UserRole => r in ROLE_REDIRECT);
        router.replace(role ? ROLE_REDIRECT[role] : "/");
      } else {
        router.replace("/auth/login");
      }
      return;
    }

    if (!user) {
      // Not authenticated — send to login (keeps plan in sessionStorage)
      router.replace("/auth/login");
      return;
    }

    // Authenticated + pending plan — fire checkout
    clearPendingPlanPriceId();

    billingApi
      .subscribe({ plan_price_id: planPriceId })
      .then((res) => {
        window.location.href = res.checkout_url;
      })
      .catch(() => {
        setErrorMessage(
          "We couldn't start your checkout session. Please go back to the pricing page and try again."
        );
      });
  }, [loading, user, router]);

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9]">
        <div className="w-full max-w-[480px] mx-4 bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-[#FFF5F5] border border-[#FF5A5A]/20 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5A5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-[18px] font-bold text-[#0C1824] mb-2">Checkout Failed</h2>
          <p className="text-[14px] text-[#64748B] leading-relaxed mb-7">{errorMessage}</p>
          <a
            href="/#pricing"
            className="inline-block px-6 py-3 bg-[#1A6BDC] hover:bg-[#1558be] text-white text-[14px] font-semibold rounded-lg transition-colors"
          >
            Back to Pricing
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f8f9] gap-6">
      <div className="w-24 h-24 relative">
        <Image
          src="/logo.png"
          alt="Clinch Logo"
          width={96}
          height={96}
          className="object-contain"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="w-8 h-8 border-[3px] border-[#1A6BDC]/20 border-t-[#1A6BDC] rounded-full animate-spin" />
        <p className="text-[15px] font-semibold text-[#0C1824]">Redirecting to secure checkout…</p>
        <p className="text-[13px] text-[#94A3B8]">Please do not close this tab.</p>
      </div>
    </div>
  );
}
