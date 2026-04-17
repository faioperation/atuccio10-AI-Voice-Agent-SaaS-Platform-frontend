"use client";

export default function CTA() {
  return (
    <section id="cta" style={{
      padding: "40px 0 100px",
      background: "#0C1824",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "700px", height: "350px",
        background: "radial-gradient(ellipse, rgba(26,107,220,0.22) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.3,
        backgroundImage: "radial-gradient(circle, #1A6BDC33 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      <div className="container-xl" style={{ position: "relative" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: "rgba(26,107,220,0.15)", border: "1px solid rgba(26,107,220,0.3)",
          borderRadius: "100px", padding: "6px 16px", marginBottom: "24px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C47A", boxShadow: "0 0 0 3px rgba(34,196,122,0.3)" }} />
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#6B9FD4", letterSpacing: "0.06em" }}>7-DAY FREE TRIAL · CREDIT CARD REQUIRED</span>
        </div>

        <h2 style={{
          fontSize: "clamp(32px,5vw,64px)", fontWeight: 900,
          color: "#E8F2FC", letterSpacing: "-0.04em", lineHeight: 1.05,
          marginBottom: "20px",
        }}>
          Stop wasting dials.<br />
          <span style={{ color: "#1A6BDC" }}>Start closing.</span>
        </h2>

        <p style={{
          fontSize: "16px", color: "rgba(232,242,252,0.65)", lineHeight: 1.7,
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
    </section>
  );
}
