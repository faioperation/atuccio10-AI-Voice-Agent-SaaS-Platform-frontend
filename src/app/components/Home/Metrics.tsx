"use client";

export default function Metrics() {
  return (
    <section id="metrics" style={{ background:"#fff", padding:"96px 0" }}>
      <div className="container-xl">
        {/* Header row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:"64px", alignItems:"center", marginBottom:"56px" }}>
          <div>
            <div className="eyebrow">Metrics that Matter</div>
            <h2 style={{
              fontSize:"clamp(24px,3vw,38px)", fontWeight:900,
              color:"#0C1824", letterSpacing:"-0.03em", lineHeight:1.12, marginBottom:"14px",
            }}>
              Numbers that close deals for themselves.
            </h2>
            <p style={{ fontSize:"14px", color:"#4a6070", lineHeight:1.7 }}>
              Teams using Clinch outperform their previous benchmarks within 90 days.
            </p>
          </div>

          {/* Big 3 numbers */}
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(3,1fr)",
            background:"#F5F4F2", borderRadius:"16px",
            border:"1px solid #e4edf5", overflow:"hidden",
          }}>
            {[
              { v:"1,284", l:"Qualified Leads",  s:"avg / team / mo",  c:"#1A6BDC" },
              { v:"452",   l:"Appointments Set", s:"avg / team / mo",  c:"#7c3aed" },
              { v:"68%",   l:"Transfer Rate",    s:"lead to handoff",  c:"#22C47A" },
            ].map((s,i) => (
              <div key={s.l} style={{
                padding:"32px 24px",
                borderRight: i<2 ? "1px solid #e4edf5" : "none",
                transition:"background 0.18s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background="#E8F2FC")}
              onMouseLeave={e => (e.currentTarget.style.background="transparent")}
              >
                <div style={{ fontSize:"clamp(32px,3.5vw,48px)", fontWeight:900, color:s.c, letterSpacing:"-0.04em", lineHeight:1, marginBottom:"8px" }}>{s.v}</div>
                <div style={{ fontSize:"13px", fontWeight:700, color:"#0C1824", marginBottom:"2px" }}>{s.l}</div>
                <div style={{ fontSize:"11px", color:"#6B9FD4" }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 3 cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"18px" }}>
          {[
            { v:"+314%", l:"Avg Efficiency Gain",  d:"Teams see over 3× productivity without adding headcount." },
            { v:"<30s",  l:"Speed to Lead",        d:"AI follows up in under 30 seconds while intent is at peak." },
            { v:"+57%",  l:"Close Rate Uplift",    d:"Reps coached by Clinch AI close significantly more deals per hour." },
          ].map(s => (
            <div key={s.l} style={{
              padding:"28px 24px", background:"#F5F4F2",
              border:"1px solid #e4edf5", borderRadius:"14px",
              transition:"border-color 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(26,107,220,0.3)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(26,107,220,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="#e4edf5"; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ fontSize:"30px", fontWeight:900, color:"#1A6BDC", letterSpacing:"-0.03em", marginBottom:"6px" }}>{s.v}</div>
              <div style={{ fontSize:"13px", fontWeight:700, color:"#0C1824", marginBottom:"5px" }}>{s.l}</div>
              <div style={{ fontSize:"12px", color:"#6B9FD4", lineHeight:1.6 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
