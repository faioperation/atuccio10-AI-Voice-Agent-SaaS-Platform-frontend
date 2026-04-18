"use client";

const integrations = [
  { name: "Go High Level", category: "CRM" },
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Zoom", category: "Video / Calls" },
  { name: "RingCentral", category: "Communications" },
  { name: "Twilio", category: "Communications" },
];

export default function Integrations() {
  return (
    <section
      id="integrations"
      style={{
        padding: "100px 0 40px",
        background: "#0C1824",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container-xl">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#60a5fa",
            marginBottom: "16px",
          }}>
            <span style={{ width: "20px", height: "2px", background: "#60a5fa", borderRadius: "2px", display: "inline-block" }} />
            Plug-and-Play Integrations
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 800,
            color: "#f9fafb",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}>
            Works with your{" "}
            <span style={{ color: "#60a5fa" }}>existing stack</span>
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#6B9FD4",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Connect Clinch to your CRM, dialers, and agency management systems in minutes, not months.
          </p>
        </div>

        {/* Integration logos grid */}
        <div id="integrations-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "16px",
          marginBottom: "48px",
        }}>
          {integrations.map((item) => (
            <div
              key={item.name}
              style={{
                background: "#111d2b",
                border: "1px solid #1e3048",
                borderRadius: "12px",
                padding: "20px 16px",
                textAlign: "center",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#1A6BDC";
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#1e2a3a";
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1e2a3a, #111827)",
                border: "1px solid #2a3a4a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
                fontSize: "11px",
                fontWeight: 800,
                color: "#60a5fa",
                letterSpacing: "0.05em",
              }}>
                {item.name.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#E8F2FC", marginBottom: "3px" }}>{item.name}</div>
              <div style={{ fontSize: "10px", color: "#6b7280", fontWeight: 500 }}>{item.category}</div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}>
          <p style={{ fontSize: "14px", color: "#6B9FD4" }}>
            Don&apos;t see your platform?{" "}
          </p>
          <a href="#footer-contact" className="btn-secondary" style={{ fontSize: "14px", padding: "12px 28px" }}>
            Request a Custom Integration →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #integrations-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #integrations { padding: 64px 0 !important; }
          #integrations-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
