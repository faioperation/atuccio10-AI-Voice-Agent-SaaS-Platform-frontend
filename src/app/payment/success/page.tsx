"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  CheckCircle,
  ArrowRight,
  Receipt,
  Calendar,
  CreditCard,
  Mail,
  XCircle,
  RefreshCw,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useVerifySession } from "@/features/billing/hooks/useVerifySession";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/features/billing/utils/pricing.utils";
import type { PaymentSessionResponse } from "@/features/billing/api/billing.types";
import type { ActiveSubscription } from "@/features/auth/api/auth.types";

// ── Helpers ────────────────────────────────────────────────────────────────────

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function dashboardHref(role: string | undefined): string {
  return role === "system_admin" ? "/system_admin" : "/business_admin";
}

/** Backend may return active_subscription as an object or legacy string */
function resolveSubscription(sub: ActiveSubscription | string | null | undefined): ActiveSubscription | null {
  if (!sub) return null;
  if (typeof sub === "object") return sub;
  // Legacy string format — wrap so the rest of the page can treat it uniformly
  return { plan_name: sub, billing_cycle: "", price: "", currency: "", status: "active", plan_start_date: "", plan_end_date: "" };
}

/** True if the session response carries enough detail to render a summary */
function hasDetails(s: PaymentSessionResponse): boolean {
  return !!(s.plan_name || s.price || s.billing_cycle);
}

/** Safely format amount; backend uses "price" not "amount" */
function safeFormatAmount(price: string | undefined, currency: string | undefined): string | null {
  if (!price || !currency) return null;
  try {
    return formatCurrency(price, currency);
  } catch {
    return `${currency.toUpperCase()} ${price}`;
  }
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const { user, refetchUser } = useAuth();
  const [profileRefreshed, setProfileRefreshed] = useState(false);

  const {
    data: session,
    isLoading: verifying,
    isSuccess,
    isError,
    error,
    refetch: retryVerification,
    isFetching,
  } = useVerifySession(sessionId);

  // Refetch user ONLY after backend confirms success — ensures active_subscription is live
  useEffect(() => {
    if (isSuccess) {
      refetchUser().finally(() => setProfileRefreshed(true));
    }
  }, [isSuccess, refetchUser]);

  // ── No session_id ──────────────────────────────────────────────────────────
  if (!sessionId) {
    return (
      <ErrorScreen
        title="Invalid Payment Session"
        message="No payment session was found. If you completed a payment, please check your dashboard or contact support."
        primaryLabel="Go to Dashboard"
        onPrimary={() => router.push(dashboardHref(user?.roles?.[0]))}
        secondaryLabel="Back to Home"
        onSecondary={() => router.push("/")}
        sessionId={null}
      />
    );
  }

  // ── Verifying ──────────────────────────────────────────────────────────────
  if (verifying) {
    return (
      <LoadingScreen message="Confirming your payment…" sub="Please don't close this tab." />
    );
  }

  // ── Verification error ─────────────────────────────────────────────────────
  if (isError) {
    const status = (error as { status?: number } | null)?.status;
    if (status === 401 || status === 403) {
      return (
        <ErrorScreen
          title="Session Expired"
          message="Your login session has expired. Please log in again to view your payment status."
          primaryLabel="Go to Login"
          onPrimary={() => router.push("/auth/login")}
          sessionId={sessionId}
        />
      );
    }
    return (
      <ErrorScreen
        title={status === 410 ? "Payment Session Expired" : "Verification Failed"}
        message={
          status === 410
            ? "This payment link has expired. If your payment was charged, it will appear in your dashboard."
            : "We couldn't confirm your payment with the server. Your subscription may not have activated yet."
        }
        primaryLabel={isFetching ? "Retrying…" : "Try Again"}
        onPrimary={() => retryVerification()}
        isPrimaryLoading={isFetching}
        secondaryLabel="Go to Dashboard"
        onSecondary={() => router.push(dashboardHref(user?.roles?.[0]))}
        sessionId={sessionId}
      />
    );
  }

  // ── Waiting for profile refresh ────────────────────────────────────────────
  if (isSuccess && !profileRefreshed) {
    return <LoadingScreen message="Activating your subscription…" />;
  }

  // ── Debug view (dev only) ──────────────────────────────────────────────────
  // Remove this block once API shapes are confirmed in production
  const isDev = process.env.NODE_ENV === "development";
  // const isDev = true; // Force dev view for testing; remove in prod

  // ── Success ────────────────────────────────────────────────────────────────
  const subscription = resolveSubscription(user?.active_subscription);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] py-12 px-4">
      <div className="w-full max-w-[560px]">

        {/* Dev debug panel */}
        {isDev && (
          <details className="mb-4 rounded-xl border border-[#EDEFF2] bg-white text-[11px] font-mono overflow-hidden">
            <summary className="px-4 py-2 cursor-pointer text-[#64748B] bg-[#FAFBFC] select-none">
              🛠 Dev: API response inspection
            </summary>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-[#94A3B8] mb-1">session (billing/success response):</p>
                <pre className="text-[#0C1824] whitespace-pre-wrap break-all">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
              <div>
                <p className="text-[#94A3B8] mb-1">user.active_subscription:</p>
                <pre className="text-[#0C1824] whitespace-pre-wrap break-all">
                  {JSON.stringify(user?.active_subscription, null, 2)}
                </pre>
              </div>
            </div>
          </details>
        )}

        <div className="bg-white border border-[#EDEFF2] rounded-2xl shadow-sm overflow-hidden">

          {/* Header band */}
          <div className="bg-gradient-to-r from-[#22C47A]/10 to-[#1A6BDC]/10 px-10 pt-10 pb-8 flex flex-col items-center border-b border-[#EDEFF2]">
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

            <div className="relative mb-4">
              <div className="w-[72px] h-[72px] rounded-full bg-[#F0FDF4] border-2 border-[#22C47A]/30 flex items-center justify-center">
                <CheckCircle className="text-[#22C47A]" size={36} strokeWidth={1.8} />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[#22C47A]/20 animate-ping" />
            </div>

            <h1 className="text-[26px] font-bold text-[#0C1824] leading-tight text-center">
              Payment Successful!
            </h1>
            <p className="text-[14px] text-[#64748B] mt-2 text-center leading-relaxed">
              Your subscription is now active. Welcome to Clinch!
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 bg-[#F0FDF4] border border-[#22C47A]/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C47A] animate-pulse" />
              <span className="text-[12px] font-semibold text-[#166534]">Subscription Active</span>
            </div>
          </div>

          {/* Summary body */}
          <div className="px-10 py-8">
            {session && hasDetails(session) ? (
              <SessionSummary session={session} />
            ) : subscription ? (
              <SubscriptionSummary sub={subscription} />
            ) : (
              <GenericSuccessNote />
            )}

            <button
              onClick={() => router.push(dashboardHref(user?.roles?.[0]))}
              className="w-full mt-8 bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 group"
            >
              Go to Dashboard
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className="text-center text-[12px] text-[#94A3B8] mt-4">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-[#64748B]">
                {session?.customer_email ?? user?.email ?? "your registered email"}
              </span>
            </p>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#94A3B8] mt-6">
          Questions?{" "}
          <span className="text-[#1A6BDC] cursor-pointer hover:underline">
            Contact our support team
          </span>
        </p>
      </div>
    </div>
  );
}

// ── Loading ────────────────────────────────────────────────────────────────────

function LoadingScreen({ message, sub }: { message: string; sub?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-[3px] border-[#1A6BDC]/20 border-t-[#1A6BDC] rounded-full animate-spin" />
        <p className="text-[14px] text-[#64748B] font-medium">{message}</p>
        {sub && <p className="text-[12px] text-[#94A3B8]">{sub}</p>}
      </div>
    </div>
  );
}

// ── Error screen ───────────────────────────────────────────────────────────────

function ErrorScreen({
  title,
  message,
  primaryLabel,
  onPrimary,
  isPrimaryLoading = false,
  secondaryLabel,
  onSecondary,
  sessionId,
}: {
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
  isPrimaryLoading?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
  sessionId: string | null;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f9] px-4">
      <div className="w-full max-w-[480px] bg-white border border-[#EDEFF2] rounded-2xl p-10 shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-[#FFF5F5] border border-[#FF5A5A]/20 flex items-center justify-center mx-auto mb-5">
          <XCircle size={28} className="text-[#FF5A5A]" strokeWidth={1.5} />
        </div>
        <h2 className="text-[18px] font-bold text-[#0C1824] mb-2">{title}</h2>
        <p className="text-[13px] text-[#64748B] leading-relaxed mb-8">{message}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onPrimary}
            disabled={isPrimaryLoading}
            className="w-full bg-[#1A6BDC] hover:bg-[#1558be] text-white font-semibold py-3.5 rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isPrimaryLoading && <RefreshCw size={15} className="animate-spin" />}
            {primaryLabel}
          </button>

          {secondaryLabel && onSecondary && (
            <button
              onClick={onSecondary}
              className="w-full bg-white border border-[#EDEFF2] hover:bg-[#FAFBFC] text-[#0C1824] font-semibold py-3.5 rounded-lg transition-colors"
            >
              {secondaryLabel}
            </button>
          )}

          {sessionId && (
            <div className="flex items-start gap-2 bg-[#FFFBEB] border border-[#FCD34D]/40 rounded-lg px-4 py-3 text-left">
              <AlertTriangle size={14} className="text-[#D97706] mt-0.5 shrink-0" />
              <p className="text-[12px] text-[#92400E] leading-relaxed">
                If you were charged, your payment is safe. Contact support with your session ID:{" "}
                <span className="font-mono font-semibold break-all">{sessionId}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Summary: from /billing/success response ────────────────────────────────────

function SessionSummary({ session }: { session: PaymentSessionResponse }) {
  const formattedAmount = safeFormatAmount(session.price, session.currency);

  return (
    <div>
      <h2 className="text-[13px] font-semibold text-[#64748B] uppercase tracking-wider mb-4">
        Payment Summary
      </h2>
      <div className="bg-[#FAFBFC] border border-[#EDEFF2] rounded-xl divide-y divide-[#EDEFF2]">
        {session.plan_name && (
          <SummaryRow icon={<Receipt size={15} className="text-[#1A6BDC]" />} label="Plan" value={session.plan_name} />
        )}
        {session.billing_cycle && (
          <SummaryRow icon={<Calendar size={15} className="text-[#1A6BDC]" />} label="Billing Cycle" value={capitalize(session.billing_cycle)} />
        )}
        {formattedAmount && (
          <SummaryRow icon={<CreditCard size={15} className="text-[#1A6BDC]" />} label="Amount Charged" value={formattedAmount} valueClassName="font-bold text-[#0C1824]" />
        )}
        {session.customer_email && (
          <SummaryRow icon={<Mail size={15} className="text-[#1A6BDC]" />} label="Email" value={session.customer_email} />
        )}
        {session.plan_end_date && (
          <SummaryRow icon={<Clock size={15} className="text-[#1A6BDC]" />} label="Renews On" value={session.plan_end_date} />
        )}
      </div>
    </div>
  );
}

// ── Summary: from user.active_subscription object ─────────────────────────────

function SubscriptionSummary({ sub }: { sub: ActiveSubscription }) {
  const formattedAmount = safeFormatAmount(sub.price, sub.currency);

  return (
    <div>
      <h2 className="text-[13px] font-semibold text-[#64748B] uppercase tracking-wider mb-4">
        Active Subscription
      </h2>
      <div className="bg-[#FAFBFC] border border-[#EDEFF2] rounded-xl divide-y divide-[#EDEFF2]">
        {sub.plan_name && (
          <SummaryRow icon={<Receipt size={15} className="text-[#1A6BDC]" />} label="Plan" value={sub.plan_name} />
        )}
        {sub.billing_cycle && (
          <SummaryRow icon={<Calendar size={15} className="text-[#1A6BDC]" />} label="Billing Cycle" value={capitalize(sub.billing_cycle)} />
        )}
        {formattedAmount && (
          <SummaryRow icon={<CreditCard size={15} className="text-[#1A6BDC]" />} label="Amount" value={formattedAmount} valueClassName="font-bold text-[#0C1824]" />
        )}
        {sub.status && (
          <SummaryRow icon={<CheckCircle size={15} className="text-[#22C47A]" />} label="Status" value={capitalize(sub.status)} valueClassName="text-[#16A34A] font-semibold" />
        )}
        {sub.plan_end_date && (
          <SummaryRow icon={<Clock size={15} className="text-[#1A6BDC]" />} label="Renews On" value={sub.plan_end_date} />
        )}
      </div>
    </div>
  );
}

function GenericSuccessNote() {
  return (
    <div className="bg-[#EFF6FF] border border-[#1A6BDC]/20 rounded-xl px-5 py-4">
      <p className="text-[13px] text-[#1e40af] leading-relaxed">
        Your payment was processed successfully. Your subscription details will appear in your dashboard shortly.
      </p>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
  valueClassName = "text-[#0C1824]",
}: {
  icon: import("react").ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div className="flex items-center gap-2.5 text-[#64748B]">
        {icon}
        <span className="text-[13px]">{label}</span>
      </div>
      <span className={`text-[13px] font-medium ${valueClassName}`}>{value}</span>
    </div>
  );
}
