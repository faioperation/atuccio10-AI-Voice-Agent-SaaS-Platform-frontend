"use client";

import Image from "next/image";

const footerCols = {
  PRODUCT: ["Features", "How it Works", "Pricing", "Integrations"],
  COMPANY: ["About", "Blog", "Careers", "Contact"],
  LEGAL: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
  SUPPORT: ["Help Center", "API Docs", "Status"],
};

export default function Footer() {
  return (
    <footer id="footer-contact" style={{
      background: "#0C1824",
      borderTop: "1px solid #111d2b",
      padding: "56px 0 28px",
    }}>
      <div className="container-xl">
        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr",
          gap: "40px",
          marginBottom: "48px",
        }}>
          {/* Brand column */}
          <div>
            {/* Inline logo — avoids white bg on dark footer */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <div style={{
                width: "80px", height: "80px",
                overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Image src="/logo.png" alt="Clinch" width={80} height={80} className="object-contain" />
              </div>
            </div>
            <p style={{
              fontSize: "13px",
              color: "#6B9FD4",
              lineHeight: 1.65,
              maxWidth: "220px",
              marginBottom: "20px",
            }}>
              Precision-milled AI Voice Agents for high-volume insurance sales teams.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {["tw", "li", "fb"].map((s) => (
                <a key={s} href="#" style={{
                  width: "32px", height: "32px", borderRadius: "7px",
                  background: "#111d2b", border: "1px solid #1e3048",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "border-color 0.18s",
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#1A6BDC")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#1e3048")}
                  aria-label={s}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#6B9FD4">
                    {s === "tw" && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
                    {s === "li" && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>}
                    {s === "fb" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerCols).map(([cat, links]) => (
            <div key={cat}>
              <div style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.13em",
                color: "#3a5060",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}>
                {cat}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {links.map((link) => (
                  <a key={link} href="#" style={{
                    fontSize: "13px", color: "#6B9FD4", textDecoration: "none", transition: "color 0.18s",
                  }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#E8F2FC")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6B9FD4")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid #111d2b",
          paddingTop: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}>
          <p style={{ fontSize: "12px", color: "#3a5060" }}>
            © 2025 Clinch AI, Inc. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "12px", color: "#3a5060", textDecoration: "none", transition: "color 0.18s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#6B9FD4")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#3a5060")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer > div > div:first-child {
            grid-template-columns: 1.5fr 1fr 1fr !important;
            gap: 32px !important;
          }
          footer > div > div:first-child > div:first-child {
            grid-column: span 3;
          }
        }
        @media (max-width: 640px) {
          footer { padding: 32px 0 24px !important; }
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
          }
          footer > div > div:first-child > div:first-child {
            grid-column: span 2;
            text-align: center;
          }
          footer > div > div:first-child > div:first-child > div { justify-content: center; }
          footer > div > div:first-child > div:first-child > p { margin: 0 auto 20px !important; }
          footer > div > div:first-child > div:first-child > div:last-child { justify-content: center; }
          
          footer > div > div:last-child {
            flex-direction: column;
            text-align: center;
            gap: 16px !important;
          }
        }
      `}</style>
    </footer>
  );
}
