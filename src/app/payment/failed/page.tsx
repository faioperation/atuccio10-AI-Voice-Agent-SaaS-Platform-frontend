"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { XCircle, RefreshCw, LayoutDashboard, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function DashboardHref(role: string | undefined): string {
  if (role === "system_admin") return "/system_admin";
  return "/business_admin";
}

export default function PaymentFailedPage() {
  const router = useRouter();
  const { user } = useAuth();
  const dashboardHref = DashboardHref(user?.roles?.[0]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] py-12 px-4">
      <div className="w-full max-w-[520px]">
        {/* Card */}
        <div className="bg-white border border-[#EDEFF2] rounded-2xl shadow-sm overflow-hidden">
          {/* Red header band */}
          <div className="bg-gradient-to-r from-[#FF5A5A]/8 to-[#FF5A5A]/4 px-10 pt-10 pb-8 flex flex-col items-center border-b border-[#EDEFF2]">
            <div className="w-16 h-16 relative flex items-center justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Clinch Logo"
                width={128}
                height={128}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>

            {/* Failed icon */}
            <div className="relative mb-4">
              <div className="w-[72px] h-[72px] rounded-full bg-[#FFF5F5] border-2 border-[#FF5A5A]/30 flex items-center justify-center">
                <XCircle className="text-[#FF5A5A]" size={36} strokeWidth={1.8} />
              </div>
            </div>

            <h1 className="text-[26px] font-bold text-[#0C1824] leading-tight text-center">
              Payment Unsuccessful
            </h1>
            <p className="text-[14px] text-[#64748B] mt-2 text-center leading-relaxed max-w-[320px]">
              Your payment could not be processed. No charges have been made to your account.
            </p>
          </div>

          {/* Body */}
          <div className="px-10 py-8">
            {/* What happened */}
            <div className="bg-[#FAFBFC] border border-[#EDEFF2] rounded-xl px-5 py-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-[#F59E0B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-[#0C1824] mb-1">What happened?</p>
                  <ul className="text-[13px] text-[#64748B] space-y-1 leading-relaxed list-disc list-inside">
                    <li>Payment was cancelled or declined</li>
                    <li>Your card details may be incorrect</li>
                    <li>Insufficient funds or card limit reached</li>
                    <li>The session may have expired</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => router.push("/#pricing")}
                className="w-full bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 group"
              >
                <RefreshCw size={17} className="group-hover:rotate-180 transition-transform duration-300" />
                Try Again
              </button>

              {user && (
                <button
                  onClick={() => router.push(dashboardHref)}
                  className="w-full bg-white border border-[#EDEFF2] hover:bg-[#FAFBFC] text-[#0C1824] font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <LayoutDashboard size={17} className="text-[#64748B]" />
                  Back to Dashboard
                </button>
              )}

              {!user && (
                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-white border border-[#EDEFF2] hover:bg-[#FAFBFC] text-[#0C1824] font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Back to Home
                </button>
              )}
            </div>

            <p className="text-center text-[12px] text-[#94A3B8] mt-6">
              Need help?{" "}
              <span className="text-[#1A6BDC] cursor-pointer hover:underline">
                Contact our support team
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
