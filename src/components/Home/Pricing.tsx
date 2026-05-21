"use client";

import { PricingGrid } from "@/features/billing/components/PricingGrid";

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: "#F5F4F2", padding: "96px 0" }}>
      <div className="container-xl">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Simple Pricing
          </div>
          <h2
            style={{
              fontSize: "clamp(30px,4vw,52px)",
              fontWeight: 900,
              color: "#0C1824",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Predictable. <span className="grad-text">Performance.</span>
          </h2>
          {/* <p style={{ marginTop: "12px", fontSize: "15px", color: "#4a6070" }}>
            7 day free trial, credit card required
          </p> */}
        </div>

        {/* API-driven plan cards + billing cycle toggle */}
        <PricingGrid />

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#6B9FD4",
            marginTop: "28px",
          }}
        >
          Base plan includes standard usage. Additional usage may be billed.
          <br />
          All plans include SOC 2 Type II · HIPAA-ready infrastructure · Cancel anytime
        </p>
      </div>

      <style>{`
        @media(max-width:1024px){
          #pricing-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
          #pricing-grid > div:last-child { grid-column: span 2; max-width: 500px; margin: 0 auto; width: 100%; }
        }
        @media(max-width:768px){
          #pricing-grid { grid-template-columns: 1fr !important; }
          #pricing-grid > div:last-child { grid-column: span 1; }
        }
        @media(max-width:640px){
          #pricing { padding: 32px 0 48px !important; }
        }
      `}</style>
    </section>
  );
}
