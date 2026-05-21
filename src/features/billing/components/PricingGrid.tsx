"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBillingPlans } from "../hooks/useBillingPlans";
import { useSubscribe } from "../hooks/useSubscribe";
import { PricingCard } from "./PricingCard";
import { PricingSkeleton } from "./PricingSkeleton";
import { PricingError } from "./PricingError";
import type { BillingCycle } from "../api/billing.types";
import {
  DEFAULT_BILLING_CYCLE,
  BILLING_CYCLE_LABELS,
  YEARLY_SAVINGS_LABEL,
} from "../constants/pricing.constants";
import { getPendingPlanPriceId, setPendingPlanPriceId, clearPendingPlanPriceId } from "../utils/billing.utils";
import { setRedirectIntent } from "@/features/auth/utils/auth.utils";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/lib/api/client";

export function PricingGrid() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(DEFAULT_BILLING_CYCLE);
  const [loadingPlanPriceId, setLoadingPlanPriceId] = useState<number | null>(null);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const { data: plans, isLoading, isError, refetch } = useBillingPlans();
  const { mutateAsync: executeSubscribe } = useSubscribe();
  const { user } = useAuth();
  const router = useRouter();

  const activePlans = plans?.filter((p) => p.is_active) ?? [];

  // ── Stripe checkout trigger ───────────────────────────────────────────────
  const triggerCheckout = useCallback(
    async (planPriceId: number) => {
      setSubscribeError(null);
      setLoadingPlanPriceId(planPriceId);
      try {
        const { checkout_url } = await executeSubscribe(planPriceId);
        // Hard navigate to Stripe — router.push won't work for external URLs
        window.location.href = checkout_url;
      } catch (error) {
        let msg = "Failed to start checkout. Please try again.";
        if (error instanceof ApiError && error.data && typeof error.data === "object") {
          const data = error.data as Record<string, unknown>;
          const raw = data.detail ?? data.non_field_errors ?? data.error;
          if (raw) msg = Array.isArray(raw) ? String(raw[0]) : String(raw);
        }
        setSubscribeError(msg);
        setLoadingPlanPriceId(null);
      }
    },
    [executeSubscribe],
  );

  // ── Auto-resume checkout after login redirect ────────────────────────────
  // When the user was sent to /auth/login because they weren't authenticated,
  // the selected plan_price_id is stored in sessionStorage. Once login
  // resolves and `user` becomes truthy, we pick it up and continue.
  useEffect(() => {
    const pending = getPendingPlanPriceId();
    if (!user || !pending) return;
    clearPendingPlanPriceId();
    void triggerCheckout(Number(pending));
  }, [user, triggerCheckout]);

  // ── CTA click handler ────────────────────────────────────────────────────
  const handleSubscribe = (planPriceId: number) => {
    if (!user) {
      // Persist plan selection and current page path, then send to login
      setPendingPlanPriceId(planPriceId);
      setRedirectIntent(typeof window !== "undefined" ? window.location.pathname : "/");
      router.push("/auth/login");
      return;
    }
    void triggerCheckout(planPriceId);
  };

  return (
    <>
      {/* ── Billing cycle toggle ─────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#e8eef4",
            borderRadius: 12,
            padding: 4,
            gap: 4,
          }}
        >
          {(Object.keys(BILLING_CYCLE_LABELS) as BillingCycle[]).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              style={{
                padding: "8px 22px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
                background: billingCycle === cycle ? "#0C1824" : "transparent",
                color: billingCycle === cycle ? "#fff" : "#4a6070",
                letterSpacing: "0.02em",
              }}
            >
              {BILLING_CYCLE_LABELS[cycle]}
            </button>
          ))}
        </div>

        {billingCycle === "yearly" && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#fff",
              background: "#22C47A",
              padding: "4px 12px",
              borderRadius: 100,
            }}
          >
            {YEARLY_SAVINGS_LABEL}
          </span>
        )}
      </div>

      {/* ── Subscribe error banner ───────────────────────────────── */}
      {subscribeError && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#FFF5F5",
            border: "1px solid rgba(255,90,90,0.35)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 24,
            fontSize: 13,
            color: "#991b1b",
            fontWeight: 500,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" stroke="#FF5A5A" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="#FF5A5A" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ flex: 1 }}>{subscribeError}</span>
          <button
            onClick={() => setSubscribeError(null)}
            aria-label="Dismiss"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#FF5A5A",
              fontSize: 18,
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* ── Plan grid ────────────────────────────────────────────── */}
      {isLoading ? (
        <PricingSkeleton />
      ) : isError ? (
        <PricingError onRetry={() => refetch()} />
      ) : activePlans.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "64px 24px",
            fontSize: 14,
            color: "#4a6070",
          }}
        >
          No plans available at this time. Please check back soon.
        </p>
      ) : (
        <div
          id="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            alignItems: "start",
          }}
        >
          {activePlans.map((plan, index) => {
            // Determine the active price id for the current billing cycle so we
            // can compare against loadingPlanPriceId for per-button loading state.
            const priceId = plan.prices.find(
              (p) => p.billing_cycle === billingCycle && p.is_active,
            )?.id;

            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
                featured={index === 1}
                onSubscribe={handleSubscribe}
                isLoading={priceId !== undefined && loadingPlanPriceId === priceId}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
