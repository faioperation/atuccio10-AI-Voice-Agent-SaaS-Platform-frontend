"use client";

export default function Metrics() {
  return (
    <section id="metrics" style={{ background:"#fff", padding:"96px 0" }}>
      <div className="container-xl">
        {/* Header row */}
        <div id="metrics-header-row" style={{ gap:"64px", alignItems:"center", marginBottom:"56px" }}>
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
          <div id="metrics-big-stats" style={{
            background:"#F5F4F2", borderRadius:"16px",
            border:"1px solid #e4edf5", overflow:"hidden",
          }}>
            {[
              { v:"1,284", l:"Qualified Leads",  s:"avg / team / mo",  c:"#1A6BDC" },
              { v:"452",   l:"Appointments Set", s:"avg / team / mo",  c:"#7c3aed" },
              { v:"68%",   l:"Transfer Rate",    s:"lead to handoff",  c:"#22C47A" },
            ].map((s,i) => (
              <div className="metrics-stat-item" key={s.l} style={{
                padding:"32px 24px",
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
        <div id="metrics-bottom-grid" style={{ gap:"18px" }}>
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
      <style>{`
        #metrics-header-row { display: grid; grid-template-columns: 1fr 1.6fr; }
        #metrics-big-stats { display: grid; grid-template-columns: repeat(3, 1fr); }
        .metrics-stat-item:not(:last-child) { border-right: 1px solid #e4edf5; }
        #metrics-bottom-grid { display: grid; grid-template-columns: repeat(3, 1fr); }

        @media(max-width:1024px){
          #metrics-header-row { grid-template-columns: 1fr; gap: 32px; text-align: center; }
          #metrics-big-stats { grid-template-columns: 1fr; }
          .metrics-stat-item:not(:last-child) { border-right: none; border-bottom: 1px solid #e4edf5; }
        }
        @media(max-width:900px){
          #metrics-bottom-grid { grid-template-columns: 1fr; gap: 16px; }
        }
        @media(max-width:640px){
          #metrics { padding: 48px 0 24px !important; }
        }
      `}</style>
    </section>
  );
}
