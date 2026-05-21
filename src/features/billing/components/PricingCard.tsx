"use client";

import type { PricingCardProps } from "../api/billing.types";
import {
  getActivePriceForCycle,
  formatCurrency,
  buildFeatureDisplayLine,
} from "../utils/pricing.utils";
import { PLAN_CTA_LABEL } from "../constants/pricing.constants";

export function PricingCard({
  plan,
  billingCycle,
  featured = false,
  onSubscribe,
  isLoading = false,
}: PricingCardProps) {
  const activePrice = getActivePriceForCycle(plan, billingCycle);

  const handleClick = () => {
    if (!activePrice || isLoading) return;
    onSubscribe?.(activePrice.id);
  };

  return (
    <div
      style={{
        background: featured ? "#0C1824" : "#fff",
        borderRadius: 18,
        border: featured ? "2px solid #1A6BDC" : "1.5px solid #e4edf5",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: featured
          ? "0 24px 64px rgba(26,107,220,0.2)"
          : "0 2px 16px rgba(12,24,36,0.04)",
        transform: featured ? "translateY(-8px)" : "none",
      }}
    >
      {/* Spin keyframe — scoped to avoid conflicts */}
      <style>{`@keyframes pricing-spin{to{transform:rotate(360deg)}}`}</style>

      {/* Most popular badge */}
      {featured && (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1A6BDC",
            color: "#fff",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.1em",
            padding: "5px 16px",
            borderRadius: 100,
            whiteSpace: "nowrap",
          }}
        >
          MOST POPULAR
        </div>
      )}

      {/* Plan name */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.13em",
          color: featured ? "#6B9FD4" : "#1A6BDC",
          marginBottom: 14,
        }}
      >
        {plan.name.toUpperCase()}
      </div>

      {/* Price */}
      <div
        style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}
      >
        {activePrice ? (
          <>
            <span
              style={{
                fontSize: "clamp(32px,5vw,48px)",
                fontWeight: 900,
                color: featured ? "#fff" : "#0C1824",
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              {formatCurrency(activePrice.price, activePrice.currency)}
            </span>
            <span style={{ fontSize: 14, color: featured ? "#6B9FD4" : "#4a6070" }}>
              /{billingCycle === "monthly" ? "mo" : "yr"}
            </span>
          </>
        ) : (
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: featured ? "#6B9FD4" : "#4a6070",
            }}
          >
            Contact us
          </span>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: featured ? "#6B9FD4" : "#4a6070",
          lineHeight: 1.65,
          marginBottom: 22,
        }}
      >
        {plan.description || "Flexible plan tailored to your team's needs."}
      </p>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: featured ? "#1e3048" : "#f0f4f8",
          marginBottom: 20,
        }}
      />

      {/* Feature list */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 28,
        }}
      >
        {plan.features.map((feature) => (
          <div key={feature.id} style={{ display: "flex", gap: 9, alignItems: "center" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              style={{ flexShrink: 0 }}
              aria-hidden="true"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke={featured ? "#6B9FD4" : "#1A6BDC"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 13,
                color: featured ? "#d1dde8" : "#374151",
                lineHeight: 1.4,
              }}
            >
              {buildFeatureDisplayLine(feature.feature_key, feature.feature_value)}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading || !activePrice}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "13px 20px",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
          background: featured ? "#1A6BDC" : "transparent",
          color: featured ? "#fff" : "#1A6BDC",
          border: featured ? "none" : "1.5px solid #1A6BDC",
          cursor: isLoading || !activePrice ? "not-allowed" : "pointer",
          boxShadow: featured ? "0 4px 18px rgba(26,107,220,0.38)" : "none",
          transition: "all 0.15s",
          opacity: isLoading || !activePrice ? 0.7 : 1,
          width: "100%",
        }}
        onMouseEnter={(e) => {
          if (isLoading || !activePrice) return;
          e.currentTarget.style.background = featured ? "#1558be" : "#E8F2FC";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.background = featured ? "#1A6BDC" : "transparent";
        }}
      >
        {isLoading ? (
          <>
            <span
              style={{
                width: 14,
                height: 14,
                border: featured
                  ? "2px solid rgba(255,255,255,0.3)"
                  : "2px solid rgba(26,107,220,0.25)",
                borderTopColor: featured ? "#fff" : "#1A6BDC",
                borderRadius: "50%",
                flexShrink: 0,
                animation: "pricing-spin 0.7s linear infinite",
              }}
            />
            Processing...
          </>
        ) : (
          PLAN_CTA_LABEL
        )}
      </button>
    </div>
  );
}
