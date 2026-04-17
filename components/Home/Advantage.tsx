"use client";

export default function Advantage() {
  return (
    <section id="advantage" style={{ background:"#F5F4F2", padding:"96px 0" }}>
      <div className="container-xl">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"center" }}>
          {/* LEFT */}
          <div>
            <div className="eyebrow">The Invisible Edge</div>
            <h2 style={{
              fontSize:"clamp(26px,3vw,40px)", fontWeight:900,
              lineHeight:1.12, letterSpacing:"-0.03em",
              color:"#0C1824", marginBottom:"18px",
            }}>
              The invisible advantage in every conversation.
            </h2>
            <p style={{ fontSize:"15px", color:"#4a6070", lineHeight:1.72, marginBottom:"32px" }}>
              While your rep talks, Clinch&apos;s AI listens, analyzes, and surfaces the perfect
              response — battle cards, objection handlers, compliance cues — invisible to the lead.
              Our AI is trained by thousands of hours of training material from some of the industry top closers, saving human agents hundreds of hours of needed coaching.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:"14px", marginBottom:"32px" }}>
              {[
                { label:"Live Objection Handling", desc:"Battle cards trigger on spoken keywords, delivered in &lt;500ms." },
                { label:"Compliance Monitoring", desc:"Flags required disclosure languages before your rep moves on." },
                { label:"Pre-Built Scripting", desc:"Includes optimized scripts for Term Life, Whole Life, Universal Life (UL), Final Expense, and Mortgage Protection." },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                  <div style={{
                    width:"22px", height:"22px", minWidth:"22px", borderRadius:"50%",
                    background:"#E8F2FC", border:"1.5px solid rgba(26,107,220,0.25)",
                    display:"flex", alignItems:"center", justifyContent:"center", marginTop:"1px",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#1A6BDC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:"14px", color:"#0C1824" }}>{item.label}</div>
                    <div style={{ fontSize:"12px", color:"#6B9FD4", lineHeight:1.55, marginTop:"2px" }} dangerouslySetInnerHTML={{__html: item.desc}} />
                  </div>
                </div>
              ))}
            </div>

            <a href="#pricing" className="btn-primary" style={{ fontSize:"14px" }}>
              See It In Action →
            </a>
          </div>

          {/* RIGHT — Transcript card */}
          <div style={{ position:"relative" }}>
            <div style={{
              background:"#fff", borderRadius:"18px",
              boxShadow:"0 20px 60px rgba(12,24,36,0.1)",
              border:"1px solid #e4edf5", overflow:"hidden",
            }}>
              {/* Header bar */}
              <div style={{
                background:"#0C1824", padding:"12px 18px",
                display:"flex", alignItems:"center", justifyContent:"space-between",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                  <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#ef4444" }} />
                  <span style={{ fontSize:"11px", fontWeight:700, color:"#E8F2FC", letterSpacing:"0.08em" }}>RECORDING LIVE</span>
                </div>
                <span style={{ fontSize:"10px", color:"#6B9FD4", fontWeight:600 }}>04:12</span>
              </div>

              {/* Messages */}
              <div style={{ padding:"18px", display:"flex", flexDirection:"column", gap:"12px" }}>
                {/* Lead bubble */}
                <div>
                  <div style={{ fontSize:"10px", fontWeight:700, color:"#1A6BDC", letterSpacing:"0.1em", marginBottom:"5px" }}>LEAD</div>
                  <div style={{
                    background:"#F5F4F2", borderRadius:"10px 10px 10px 2px",
                    padding:"11px 14px", fontSize:"13px", color:"#0C1824",
                    lineHeight:1.5, display:"inline-block", maxWidth:"85%", fontStyle:"italic",
                  }}>
                    &ldquo;I&apos;m not sure if I can afford the premium right now...&rdquo;
                  </div>
                </div>
                {/* Agent bubble */}
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"10px", fontWeight:700, color:"#6B9FD4", letterSpacing:"0.1em", marginBottom:"5px" }}>YOU</div>
                  <div style={{
                    background:"#E8F2FC", borderRadius:"10px 10px 2px 10px",
                    padding:"11px 14px", fontSize:"13px", color:"#0C1824",
                    lineHeight:1.5, display:"inline-block", maxWidth:"85%",
                    fontStyle:"italic", textAlign:"left",
                  }}>
                    &ldquo;I completely understand. Let&apos;s look at a plan that fits your budget.&rdquo;
                  </div>
                </div>
              </div>

              {/* AI Suggestion box */}
              <div style={{
                margin:"0 16px 16px",
                background:"linear-gradient(135deg, #E8F2FC, #f0f7ff)",
                border:"1px solid rgba(26,107,220,0.18)",
                borderRadius:"12px", padding:"14px",
              }}>
                <div style={{ fontSize:"10px", fontWeight:800, letterSpacing:"0.12em", color:"#1A6BDC", marginBottom:"10px" }}>
                  ⚡ AI SUGGESTION
                </div>
                <div style={{
                  background:"#fff", borderRadius:"8px", padding:"10px 12px",
                  border:"1px solid #dde8f0", marginBottom:"10px",
                }}>
                  <div style={{ fontWeight:700, fontSize:"12px", color:"#0C1824", marginBottom:"3px" }}>Objection: Price</div>
                  <div style={{ fontSize:"11px", color:"#4a6070", lineHeight:1.55 }}>
                    Suggest Flexible Term Option — 10% first-year discount available.
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                  <button style={{
                    background:"#1A6BDC", color:"#fff", fontWeight:700, fontSize:"12px",
                    padding:"9px", borderRadius:"7px", border:"none", cursor:"pointer",
                  }}>View Battle Card</button>
                  <button style={{
                    background:"transparent", color:"#0C1824", fontWeight:700, fontSize:"12px",
                    padding:"9px", borderRadius:"7px", border:"1px solid #d0dce8", cursor:"pointer",
                  }}>Open Quote Tool</button>
                </div>
              </div>
            </div>

            {/* Accuracy badge */}
            <div style={{
              position:"absolute", top:"-16px", right:"-16px", zIndex:2,
              background:"#0C1824", borderRadius:"12px", padding:"10px 18px",
              boxShadow:"0 8px 28px rgba(12,24,36,0.22)",
              textAlign:"center",
            }}>
              <div style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.12em", color:"#6B9FD4", marginBottom:"3px" }}>ACCURACY</div>
              <div style={{ fontSize:"26px", fontWeight:900, color:"#fff", letterSpacing:"-0.02em" }}>97.3%</div>
              <div style={{ fontSize:"9px", color:"#22C47A", fontWeight:700, marginTop:"2px" }}>Objection Coverage</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #advantage > div > div { grid-template-columns:1fr!important; }
        }
      `}</style>
    </section>
  );
}
