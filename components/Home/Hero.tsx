"use client";

export default function Hero() {
  return (
    <section style={{
      paddingTop: "100px",
      paddingBottom: "80px",
      background: "#F5F4F2",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle dot grid background */}
      <div style={{
        position:"absolute", inset:0, opacity:0.45,
        backgroundImage:"radial-gradient(circle, #1A6BDC22 1px, transparent 1px)",
        backgroundSize:"28px 28px",
        pointerEvents:"none",
      }} />
      {/* Blue glow top-right */}
      <div style={{
        position:"absolute", top:"-120px", right:"-80px",
        width:"560px", height:"560px", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(26,107,220,0.13) 0%, transparent 65%)",
        pointerEvents:"none",
      }} />

      <div className="container-xl" style={{ position:"relative" }}>
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"56px", alignItems:"center",
        }}>
          {/* LEFT */}
          <div>
            <div className="pill-badge" style={{ marginBottom:"24px" }}>
              <span className="pill-dot" /> AI Voice Agents for Insurance Teams
            </div>

            <h1 style={{
              fontSize:"clamp(34px,4vw,54px)", fontWeight:900,
              lineHeight:1.08, letterSpacing:"-0.035em",
              color:"#0C1824", marginBottom:"20px",
            }}>
              Built for closers.{" "}
              <span className="grad-text">Powered by AI.</span>
            </h1>

            <p style={{
              fontSize:"16px", lineHeight:1.72, color:"#4a6070",
              maxWidth:"440px", marginBottom:"36px",
            }}>
              A calendar full of buyers. Not tire kickers. AI that qualifies before it books and helps you Clinch every deal.
            </p>

            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
              <a href="#pricing" className="btn-primary" style={{ fontSize:"15px", padding:"13px 28px" }}>
                Get Started Free →
              </a>
              <a href="#how-it-works" className="btn-ghost" style={{ fontSize:"15px", padding:"13px 28px" }}>
                See How It Works
              </a>
            </div>

            {/* Trust row */}
            <div style={{
              marginTop:"44px", paddingTop:"28px",
              borderTop:"1px solid #dde8f0",
              display:"flex", gap:"32px", alignItems:"center",
            }}>
              {[
                { v:"1,200+", l:"Teams Onboarded" },
                { v:"314%",   l:"Avg Efficiency Gain" },
                { v:"68%",    l:"Transfer Rate" },
              ].map((s,i) => (
                <div key={s.l} style={{ display:"flex", alignItems:"center", gap: i>0?"32px":"0" }}>
                  {i>0 && <div style={{ width:"1px", height:"32px", background:"#dde8f0" }} />}
                  <div>
                    <div style={{ fontSize:"22px", fontWeight:900, color:"#0C1824", letterSpacing:"-0.02em" }}>{s.v}</div>
                    <div style={{ fontSize:"11px", color:"#6B9FD4", fontWeight:600, marginTop:"1px" }}>{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Dashboard */}
          <div style={{ position:"relative" }}>
            {/* Outer glow ring */}
            <div style={{
              position:"absolute", inset:"-14px",
              borderRadius:"22px",
              background:"linear-gradient(135deg, rgba(26,107,220,0.18), rgba(107,159,212,0.08))",
              zIndex:0,
            }} />

            <div style={{
              position:"relative", zIndex:1,
              background:"#0C1824",
              borderRadius:"16px",
              overflow:"hidden",
              border:"1px solid #1e3048",
              boxShadow:"0 32px 80px rgba(12,24,36,0.36)",
            }}>
              {/* Titlebar */}
              <div style={{
                background:"#0a1520", padding:"13px 18px",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                borderBottom:"1px solid #1e3048",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#ef4444" }} />
                  <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#f59e0b" }} />
                  <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#22C47A" }} />
                  <span style={{ fontSize:"11px", fontWeight:700, color:"#E8F2FC", letterSpacing:"0.09em", marginLeft:"8px" }}>LIVE DASHBOARD</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C47A" }} />
                  <span style={{ fontSize:"10px", color:"#6B9FD4" }}>Real-time · Today</span>
                </div>
              </div>

              {/* Chart section */}
              <div style={{ padding:"18px 18px 0" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4px" }}>
                  <span style={{ fontSize:"10px", color:"#6B9FD4", fontWeight:600, letterSpacing:"0.08em" }}>QUALIFICATION RATE</span>
                  <span style={{ fontSize:"11px", fontWeight:800, color:"#22C47A" }}>▲ +22% vs last week</span>
                </div>
                <div style={{ height:"88px", display:"flex", alignItems:"flex-end", gap:"4px" }}>
                  {[28,42,35,58,44,72,52,88,64,96,74,108].map((h,i) => (
                    <div key={i} style={{
                      flex:1, height:`${h}px`, borderRadius:"3px 3px 0 0",
                      background: i===11
                        ? "linear-gradient(180deg,#1A6BDC,#0e4aab)"
                        : i>=8 ? "rgba(26,107,220,0.42)" : "rgba(26,107,220,0.18)",
                    }} />
                  ))}
                </div>
                <div style={{ height:"1px", background:"#1e3048", margin:"0" }} />
              </div>

              {/* Stats row */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
                {[
                  { lbl:"QUALIFIED LEADS", val:"1,284", chg:"+22%", ok:true },
                  { lbl:"APPOINTMENTS",    val:"452",   chg:"+14%", ok:true },
                  { lbl:"TRANSFER RATE",   val:"68%",   chg:"+5.2%",ok:true },
                ].map((s,i) => (
                  <div key={s.lbl} style={{
                    padding:"14px 16px",
                    borderRight: i<2?"1px solid #1e3048":"none",
                    borderTop:"1px solid #1e3048",
                  }}>
                    <div style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.09em", color:"#3a5060", marginBottom:"5px" }}>{s.lbl}</div>
                    <div style={{ fontSize:"20px", fontWeight:900, color:"#E8F2FC", letterSpacing:"-0.02em" }}>{s.val}</div>
                    <div style={{ fontSize:"11px", fontWeight:700, color:"#22C47A", marginTop:"2px" }}>{s.chg}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge top-right */}
            <div style={{
              position:"absolute", top:"-16px", right:"-16px", zIndex:2,
              background:"linear-gradient(135deg,#1A6BDC,#0e4aab)",
              color:"#fff", borderRadius:"12px", padding:"10px 16px",
              boxShadow:"0 8px 28px rgba(26,107,220,0.45)",
              textAlign:"center", minWidth:"90px",
            }}>
              <div style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.1em", opacity:0.75, marginBottom:"2px" }}>EFFICIENCY</div>
              <div style={{ fontSize:"24px", fontWeight:900, letterSpacing:"-0.03em" }}>+314%</div>
            </div>

            {/* Floating badge bottom-left */}
            <div style={{
              position:"absolute", bottom:"-16px", left:"-16px", zIndex:2,
              background:"#fff", borderRadius:"12px", padding:"10px 15px",
              boxShadow:"0 6px 24px rgba(12,24,36,0.12)",
              border:"1px solid #e4edf5",
              display:"flex", alignItems:"center", gap:"10px",
            }}>
              <div style={{
                width:"34px", height:"34px", borderRadius:"50%",
                background:"#E8F2FC", display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1A6BDC">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize:"12px", fontWeight:700, color:"#0C1824" }}>AI Coaching Active</div>
                <div style={{ fontSize:"10px", color:"#6B9FD4" }}>Real-time prompts on</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #hero-grid{grid-template-columns:1fr!important}
          #hero-dashboard{display:none}
        }
      `}</style>
    </section>
  );
}
