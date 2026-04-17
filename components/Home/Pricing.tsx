"use client";

const plans = [
  {
    name: "QUALIFY",
    price: "$74.99",
    per: "/month",
    desc: "Just the AI lead voice agent and features.",
    featured: false,
    cta: "Start Free Trial",
    items: ["Up to 100 AI qualification calls/mo", "Live call transcription", "Basic CRM integration", "Email support"],
    struck: [],
  },
  {
    name: "CLOSE",
    price: "$74.99",
    per: "/month",
    desc: "Just the AI assistant live prompter and features.",
    featured: true,
    cta: "Start Free Trial",
    items: ["Unlimited AI qualification calls", "Real-time coaching + battle cards", "Full CRM integration suite", "AI-powered scheduling", "Advanced analytics", "Priority support"],
    struck: [],
  },
  {
    name: "THE CLINCHER",
    price: "$129.99",
    per: "/month",
    desc: "Both features. Maximum power to qualify and close every deal.",
    featured: false,
    cta: "Start Free Trial",
    items: ["Everything in Close", "Custom compliance modules", "Dedicated success manager", "SLA-backed 99.9% uptime", "Custom voice persona", "24/7 phone support"],
    struck: [],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: "#F5F4F2", padding: "96px 0" }}>
      <div className="container-xl">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Simple Pricing</div>
          <h2 style={{
            fontSize: "clamp(30px,4vw,52px)", fontWeight: 900,
            color: "#0C1824", letterSpacing: "-0.04em", lineHeight: 1.05,
          }}>
            Predictable. <span className="grad-text">Performance.</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "15px", color: "#4a6070" }}>
            7 day free trial, credit card required
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", alignItems: "start" }}>
          {plans.map((p) => (
            <div key={p.name} style={{
              background: p.featured ? "#0C1824" : "#fff",
              borderRadius: "18px",
              border: p.featured ? "2px solid #1A6BDC" : "1.5px solid #e4edf5",
              padding: "32px 28px",
              display: "flex", flexDirection: "column",
              position: "relative",
              boxShadow: p.featured ? "0 24px 64px rgba(26,107,220,0.2)" : "0 2px 16px rgba(12,24,36,0.04)",
              transform: p.featured ? "translateY(-8px)" : "none",
            }}>
              {p.featured && (
                <div style={{
                  position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)",
                  background: "#1A6BDC", color: "#fff", fontSize: "10px", fontWeight: 800,
                  letterSpacing: "0.1em", padding: "5px 16px", borderRadius: "100px",
                  whiteSpace: "nowrap",
                }}>MOST POPULAR</div>
              )}

              <div style={{
                fontSize: "10px", fontWeight: 800, letterSpacing: "0.13em",
                color: p.featured ? "#6B9FD4" : "#1A6BDC", marginBottom: "14px",
              }}>{p.name}</div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "10px" }}>
                <span style={{
                  fontSize: "clamp(42px,5vw,58px)", fontWeight: 900,
                  color: p.featured ? "#fff" : "#0C1824",
                  letterSpacing: "-0.05em", lineHeight: 1,
                }}>{p.price}</span>
                {p.per && <span style={{ fontSize: "14px", color: p.featured ? "#6B9FD4" : "#4a6070" }}>{p.per}</span>}
              </div>

              <p style={{ fontSize: "13px", color: p.featured ? "#6B9FD4" : "#4a6070", lineHeight: 1.65, marginBottom: "22px" }}>
                {p.desc}
              </p>

              <div style={{ height: "1px", background: p.featured ? "#1e3048" : "#f0f4f8", marginBottom: "20px" }} />

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {p.items.map(item => (
                  <div key={item} style={{ display: "flex", gap: "9px", alignItems: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5" stroke={p.featured ? "#6B9FD4" : "#1A6BDC"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: "13px", color: p.featured ? "#d1dde8" : "#374151", lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>

              <a href="#" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "13px 20px", borderRadius: "10px",
                fontWeight: 700, fontSize: "14px", textDecoration: "none",
                background: p.featured ? "#1A6BDC" : "transparent",
                color: p.featured ? "#fff" : "#1A6BDC",
                border: p.featured ? "none" : "1.5px solid #1A6BDC",
                cursor: "pointer",
                boxShadow: p.featured ? "0 4px 18px rgba(26,107,220,0.38)" : "none",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  if (p.featured) { el.style.background = "#1558be"; el.style.transform = "translateY(-1px)"; }
                  else { el.style.background = "#E8F2FC"; }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.transform = "none";
                  if (p.featured) el.style.background = "#1A6BDC";
                  else el.style.background = "transparent";
                }}
              >{p.cta}</a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#6B9FD4", marginTop: "28px" }}>
          Base plan includes standard usage. Additional usage may be billed.
          <br />All plans include SOC 2 Type II · HIPAA-ready infrastructure · Cancel anytime
        </p>
      </div>

      <style>{`
        @media(max-width:900px){
          #pricing > div > div:nth-child(2){grid-template-columns:1fr!important;}
          #pricing > div > div:nth-child(2) > div {transform:none!important;}
        }
      `}</style>
    </section>
  );
}
