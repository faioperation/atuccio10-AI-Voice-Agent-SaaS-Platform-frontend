"use client";

const features = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6BDC" strokeWidth="2"><path d="M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2z" /><path d="M12 6v6l4 2" strokeLinecap="round" /></svg>,
    title: "Live Scripting In Your Ear",
    desc: "While you're on the phone, Clinch displays the exact script, rebuttal, or close for the moment you're in. Works for term, whole life, IUL, final expense, and mortgage protection.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6BDC" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    title: "AI Qualifies Every Lead So You Don't Waste a Dial",
    desc: "Clinch calls every lead within 30 seconds, asks the qualifying questions you'd ask, and only books the ones ready to buy. You show up to a calendar full of pre-qualified prospects.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6BDC" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" strokeLinecap="round" /></svg>,
    title: "Every Call Transcribed Automatically",
    desc: "Every conversation recorded and transcribed for compliance, coaching, and CRM notes. Never take handwritten notes during a call again.",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6BDC" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" /></svg>,
    title: "Your Calendar Books Itself",
    desc: "linch reads your calendar, matches qualified leads to your available slots, and books them — no back-and-forth emails, no missed appointments, no manual scheduling.",
  },
];

export default function Features() {
  return (
    <section id="features" style={{ background: "#fff", padding: "96px 0" }}>
      <div className="container-xl">
        {/* Header */}
        <div id="features-header" style={{ marginBottom: "56px" }}>
          <div className="eyebrow">Engineered for Precision</div>
          <div className="header-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "32px" }}>
            <h2 style={{
              fontSize: "clamp(28px,3.2vw,42px)", fontWeight: 900,
              lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0C1824",
              maxWidth: "480px",
            }}>
              Every feature built for{" "}
              <span className="grad-text">insurance teams</span>
            </h2>
            <p className="header-p" style={{ fontSize: "15px", color: "#4a6070", lineHeight: 1.7, maxWidth: "360px", flexShrink: 0 }}>
              Clinch is built for how life insurance actually sells — rapport, fact-finding, objections, and the close. Not bolted-on AI that treats every call like a software demo
            </p>
          </div>
        </div>

        {/* Body: 2 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "stretch" }}>
          {/* Left: feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div style={{
                  width: "40px", height: "40px", minWidth: "40px", borderRadius: "10px",
                  background: "#E8F2FC", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "15px", color: "#0C1824", marginBottom: "4px" }}>{f.title}</div>
                  <div style={{ fontSize: "13px", color: "#4a6070", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: brand image card */}
          <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            minHeight: "480px",
            background: "linear-gradient(155deg, #0a1f52 0%, #1A6BDC 60%, #4a94e8 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}>
            {/* Person image */}
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: "60%", height: "90%",
            }}>
              <img src="/person2.jpeg" alt="Agent" style={{
                width: "100%", height: "100%", objectFit: "cover",
                objectPosition: "top center",
                mixBlendMode: "luminosity", opacity: 0.55,
              }} />
            </div>

            {/* Left gradient mask */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(10,31,82,0.98) 30%, rgba(10,31,82,0.4) 100%)",
            }} />

            {/* Live badge */}
            <div id="live-badge" style={{
              position: "absolute", top: "20px", right: "20px", zIndex: 2,
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.22)", borderRadius: "100px",
              padding: "6px 14px", display: "flex", alignItems: "center", gap: "7px",
            }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C47A", boxShadow: "0 0 0 3px rgba(34,196,122,0.3)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", letterSpacing: "0.06em" }}>LIVE · 47 Calls Active</span>
            </div>

            {/* Text content */}
            <div id="feature-text-content" style={{ position: "relative", zIndex: 2, padding: "32px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>
                A Qualified Lead Ready to Close
              </div>
              <h3 style={{ fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "14px", letterSpacing: "-0.02em" }}>
                Never waste a dial {" "}
                <br />on a tire kicker again.
              </h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: "24px" }}>
                AI pre-screens every lead so agents walk into every call knowing exactly who they&apos;re talking to and why they&apos;ll close.
              </p>
              {/* Mini stats */}
              <div style={{ display: "flex", gap: "24px", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "18px" }}>
                {[{ v: "+314%", l: "Efficiency" }, { v: "68%", l: "Transfer Rate" }, { v: "<30s", l: "Response" }].map((s, i) => (
                  <div key={s.l}>
                    <div style={{ fontSize: "18px", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>{s.v}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){
          .header-flex { flex-direction: column; align-items: flex-start !important; gap: 16px !important; }
          .header-p { max-width: 100% !important; }
        }
        @media(max-width:900px){
          #features > div > div:last-child { grid-template-columns:1fr!important; }
          #features > div > div:last-child > div:last-child { min-height:300px!important; }
        }
        @media(max-width:640px){
          #features { padding: 64px 0 !important; }
          #features > div > div:first-child { text-align: center; }
          #features > div > div:first-child > div:last-child { align-items: center !important; }
          #live-badge { top: 16px; right: 16px; transform: scale(0.85); }
          #feature-text-content { padding-top: 64px !important; }
        }
      `}</style>
    </section>
  );
}
