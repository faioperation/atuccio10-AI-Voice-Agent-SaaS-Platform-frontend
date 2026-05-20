"use client";

const steps = [
  { n: "01", color: "#1A6BDC", title: "Lead Enters", desc: "A new lead hits your CRM. Clinch picks it up within seconds — no manual import, no delays." },
  { n: "02", color: "#7c3aed", title: "Clinch Qualifies", desc: "Your AI assistant calls in under 30 seconds and runs the same qualifying questions a top producer would: health profile, budget, existing coverage, motivation, and urgency." },
  { n: "03", color: "#0891b2", title: "Warm Transfer to You", desc: "Qualified leads get transferred straight to you with a full briefing: who they are, what they need, how much they can afford, and what to say first." },
  { n: "04", color: "#22C47A", title: "You Close", desc: "With Clinch whispering the right rebuttals, script lines, and closes in your ear. You stay in control. The prospect never knows Clinch is there." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      background: "#0C1824", padding: "96px 0", position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "800px", height: "400px",
        background: "radial-gradient(ellipse, rgba(26,107,220,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container-xl" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="eyebrow" style={{ color: "#6B9FD4", justifyContent: "center" }}>
            <span style={{ background: "#6B9FD4" }} />
            From Lead to Close
          </div>
          <h2 style={{
            fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900,
            color: "#E8F2FC", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "14px",
          }}>
            From Lead to Close in <span style={{ color: "#1A6BDC" }}>4 Steps</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#6B9FD4", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto" }}>
            A simple 4-step system that turns raw leads into written policies — whether you're a solo producer or running a team.
          </p>
        </div>

        {/* Steps */}
        <div id="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", position: "relative" }}>
          {/* Connector line */}
          <div id="connector-line" style={{
            position: "absolute", top: "27px", left: "calc(12.5% + 10px)", right: "calc(12.5% + 10px)",
            height: "1px", background: "linear-gradient(90deg, transparent, rgba(107,159,212,0.25) 20%, rgba(107,159,212,0.25) 80%, transparent)",
            zIndex: 0,
          }} />

          {steps.map((s, i) => (
            <div key={s.n} style={{ position: "relative", zIndex: 1 }}>
              {/* Number circle */}
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: i === 0 || i === 3 ? s.color : "#111d2b",
                border: i === 0 || i === 3 ? "none" : `1.5px solid ${s.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
                boxShadow: i === 0 || i === 3 ? `0 0 24px ${s.color}44` : "none",
              }}>
                <span style={{ fontSize: "16px", fontWeight: 900, color: i === 0 || i === 3 ? "#fff" : s.color }}>
                  {s.n}
                </span>
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#E8F2FC", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#6B9FD4", lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`.eyebrow::before { background: #6B9FD4; }
        @media(max-width:900px){
          #how-it-works { padding: 64px 0 !important; }
          #steps-grid { grid-template-columns:repeat(2,1fr)!important; gap: 40px !important; }
          #connector-line { display: none; }
        }
        @media(max-width:640px){
          #steps-grid { grid-template-columns:1fr!important; text-align: center; }
          #steps-grid > div > div:first-child { margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </section>
  );
}
