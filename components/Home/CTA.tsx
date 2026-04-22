"use client";

export default function CTA() {
  return (
    <section id="cta" style={{
      padding: "100px 0",
      background: "#F5F4F2",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle light blue glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "900px", height: "450px",
        background: "radial-gradient(ellipse, rgba(26,107,220,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container-xl" style={{ position: "relative" }}>
        {/* Badge */}
        <div className="cta-badge-container" style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: "rgba(26,107,220,0.08)", border: "1px solid rgba(26,107,220,0.2)",
          borderRadius: "100px", padding: "6px 16px", marginBottom: "24px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C47A", boxShadow: "0 0 0 3px rgba(34,196,122,0.3)" }} />
          <span className="cta-badge-text" style={{ fontSize: "12px", fontWeight: 700, color: "#1A6BDC", letterSpacing: "0.06em" }}>7-DAY FREE TRIAL · CREDIT CARD REQUIRED</span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: "clamp(32px,5vw,64px)", fontWeight: 900,
          color: "#0C1824", letterSpacing: "-0.04em", lineHeight: 1.05,
          marginBottom: "20px",
        }}>
          Stop wasting dials.{" "}
          <br />
          <span style={{ color: "#1A6BDC" }}>Start closing.</span>
        </h2>

        {/* Body */}
        <p style={{
          fontSize: "16px", color: "#64748B", lineHeight: 1.7,
          maxWidth: "480px", margin: "0 auto 40px",
        }}>
          Join 1,200+ insurance teams pre-qualifying leads, coaching agents,
          and closing more policies with Clinch — every single day.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          <a href="#pricing" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
            Start Your Free Trial →
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          #cta { padding: 64px 16px !important; }
          #cta h2 { font-size: clamp(28px, 8vw, 42px) !important; }
          #cta p { margin-bottom: 32px !important; }
          #cta .btn-primary { width: 100%; padding: 12px 24px !important; }
          .cta-badge-container { padding: 4px 12px !important; margin-bottom: 20px !important; }
          .cta-badge-text { font-size: 10px !important; letter-spacing: 0.03em !important; }
        }
      `}</style>
    </section>
  );
}
