"use client";

const steps = [
  { n:"01", color:"#1A6BDC", title:"Lead Enters", desc:"New lead arrives — Clinch queues them for AI outreach within seconds of capture." },
  { n:"02", color:"#7c3aed", title:"AI Qualifies", desc:"Voice AI calls in under 30s, verifying intent, budget, coverage needs, and timeline." },
  { n:"03", color:"#0891b2", title:"Warm Transfer", desc:"Qualified leads are handed to live agents with a full context brief — ready to close." },
  { n:"04", color:"#22C47A", title:"Agent Closes", desc:"Real-time AI coaching delivers objection handlers and quote suggestions during the call." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      background:"#0C1824", padding:"96px 0", position:"relative", overflow:"hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        width:"800px", height:"400px",
        background:"radial-gradient(ellipse, rgba(26,107,220,0.12) 0%, transparent 65%)",
        pointerEvents:"none",
      }} />

      <div className="container-xl" style={{ position:"relative" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"64px" }}>
          <div className="eyebrow" style={{ color:"#6B9FD4", justifyContent:"center" }}>
            <span style={{ background:"#6B9FD4" }} />
            From Lead to Close
          </div>
          <h2 style={{
            fontSize:"clamp(28px,3.5vw,44px)", fontWeight:900,
            color:"#E8F2FC", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"14px",
          }}>
            From Lead to Close in <span style={{ color:"#1A6BDC" }}>4 Steps</span>
          </h2>
          <p style={{ fontSize:"15px", color:"#6B9FD4", lineHeight:1.7, maxWidth:"460px", margin:"0 auto" }}>
            A precision workflow that eliminates wasted effort and puts your best agents in front of the right leads.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px", position:"relative" }}>
          {/* Connector line */}
          <div style={{
            position:"absolute", top:"27px", left:"calc(12.5% + 10px)", right:"calc(12.5% + 10px)",
            height:"1px", background:"linear-gradient(90deg, transparent, rgba(107,159,212,0.25) 20%, rgba(107,159,212,0.25) 80%, transparent)",
            zIndex:0,
          }} />

          {steps.map((s, i) => (
            <div key={s.n} style={{ position:"relative", zIndex:1 }}>
              {/* Number circle */}
              <div style={{
                width:"56px", height:"56px", borderRadius:"50%",
                background: i===0||i===3 ? s.color : "#111d2b",
                border: i===0||i===3 ? "none" : `1.5px solid ${s.color}44`,
                display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:"20px",
                boxShadow: i===0||i===3 ? `0 0 24px ${s.color}44` : "none",
              }}>
                <span style={{ fontSize:"16px", fontWeight:900, color: i===0||i===3 ? "#fff" : s.color }}>
                  {s.n}
                </span>
              </div>

              <h3 style={{ fontSize:"16px", fontWeight:800, color:"#E8F2FC", marginBottom:"8px", letterSpacing:"-0.01em" }}>
                {s.title}
              </h3>
              <p style={{ fontSize:"13px", color:"#6B9FD4", lineHeight:1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`.eyebrow::before { background: #6B9FD4; }
        @media(max-width:900px){
          #how-it-works > div > div:last-child { grid-template-columns:repeat(2,1fr)!important; }
        }
      `}</style>
    </section>
  );
}
