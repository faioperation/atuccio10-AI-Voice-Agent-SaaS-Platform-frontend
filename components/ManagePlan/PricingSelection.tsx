"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "QUALIFY",
    monthlyPrice: "74.99",
    yearlyPrice: "59.99",
    features: [
      "Up to 100 AI qualification calls/mo",
      "Live call transcription",
      "Basic CRM integration",
      "Email support",
    ],
  },
  {
    name: "CLOSE",
    monthlyPrice: "85.99",
    yearlyPrice: "68.99",
    features: [
      "Unlimited AI qualification calls",
      "Real-time coaching + battle cards",
      "Full CRM integration suite",
      "AI-powered scheduling",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "THE CLINCHER",
    monthlyPrice: "99.99",
    yearlyPrice: "79.99",
    features: [
      "Everything in Close",
      "Custom compliance modules",
      "Dedicated success manager",
      "SLA-backed 99.9% uptime",
      "Custom voice persona",
      "24/7 phone support",
    ],
  },
];

const PricingSelection = ({ onBack }: { onBack: () => void }) => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      {/* Back link */}
      <button
        onClick={onBack}
        className="text-[13px] text-[#64748B] hover:text-[#0C1824] font-medium flex items-center gap-1.5 transition-colors mb-6"
      >
        ← Back to Current Plan
      </button>

      {/* Billing toggle — centered */}
      <div className="flex justify-center">
        <div
          className="inline-flex items-center rounded-full p-1 gap-0.5"
          style={{ background: "#F1F5F9", border: "1px solid #E2E8F0" }}
        >
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-full text-[13px] font-semibold transition-all ${
              billing === "monthly"
                ? "bg-[#4F8AFF] text-white shadow-sm"
                : "text-[#64748B] hover:text-[#0C1824] bg-transparent"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-6 py-2 rounded-full text-[13px] font-semibold transition-all ${
              billing === "yearly"
                ? "bg-[#4F8AFF] text-white shadow-sm"
                : "text-[#64748B] hover:text-[#0C1824] bg-transparent"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* 
        Cards Grid 
        - margin-top: 60px
        - gap: 24px
      */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 justify-center items-start mx-auto" 
        style={{ marginTop: "60px", gap: "24px" }}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white flex flex-col mx-auto"
            style={{
              width: "350px",
              padding: "35px",
              borderRadius: "16px",
              border: "2px solid #E5E7EB",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              minHeight: "580px"
            }}
          >
            {/* Title */}
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#0C1824",
                lineHeight: "1",
                marginBottom: "15px"
              }}
            >
              {plan.name}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline" style={{ marginBottom: "28px" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: 600,
                  color: "#353535ff",
                  lineHeight: "1"
                }}
              >
                ${billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginLeft: "6px"
                }}
              >
                / per month
              </span>
            </div>

            {/* Feature List */}
            <ul className="flex-grow" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: "1.4"
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "9999px",
                      width: "18px",
                      height: "18px",
                      backgroundColor: "#4F8AFF"
                    }}
                  >
                    <Check style={{ width: "10px", height: "10px", color: "white", strokeWidth: 4 }} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Upgrade Plan Button */}
            <button
              className="w-full text-white transition-all flex items-center justify-center"
              style={{
                marginTop: "32px",
                height: "48px",
                borderRadius: "999px",
                backgroundColor: "#4F8AFF",
                fontSize: "14px",
                fontWeight: 600
              }}
            >
              Upgrade Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSelection;
