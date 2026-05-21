"use client";

import Link from "next/link";
import { Home, Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#F5F4F2",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "40px 24px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle dot grid background */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.45,
        backgroundImage: "radial-gradient(circle, #1A6BDC22 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Blue glow top-right */}
      <div style={{
        position: "absolute", top: "-120px", right: "-80px",
        width: "560px", height: "560px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(26,107,220,0.13) 0%, transparent 65%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Floating 404 card */}
      <div className="notfound-card" style={{
        position: "relative", zIndex: 1,
        background: "#0C1824",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #1e3048",
        boxShadow: "0 32px 80px rgba(12,24,36,0.36)",
        maxWidth: "540px",
        width: "100%",
      }}>
        {/* Titlebar */}
        <div style={{
          background: "#0a1520", padding: "13px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid #1e3048",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C47A" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#E8F2FC", letterSpacing: "0.09em", marginLeft: "8px" }}>SYSTEM PATH · UNMAPPED</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6B9FD4" }} />
            <span style={{ fontSize: "10px", color: "#6B9FD4" }}>404 Not Found</span>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Animated 404 Radar Visual */}
          <div style={{ position: "relative", width: "120px", height: "120px", marginBottom: "28px", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center" }}>
            {/* Pulsing ring 1 */}
            <div style={{
              position: "absolute", width: "100%", height: "100%", borderRadius: "50%",
              border: "1.5px solid rgba(26,107,220,0.15)",
              animation: "ping-radar 3s linear infinite",
            }} />
            {/* Pulsing ring 2 */}
            <div style={{
              position: "absolute", width: "70%", height: "70%", borderRadius: "50%",
              border: "1.5px solid rgba(26,107,220,0.25)",
              animation: "ping-radar 3s linear infinite",
              animationDelay: "1s",
            }} />
            {/* Pulse Center */}
            <div style={{
              position: "absolute", width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(26,107,220,0.1)", border: "1.5px solid #1A6BDC",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(26,107,220,0.3)",
            }}>
              <Compass size={20} style={{ color: "#E8F2FC", animation: "spin-slow 8s linear infinite" }} />
            </div>
          </div>

          <div className="pill-badge" style={{ marginBottom: "20px", color: "#6B9FD4", background: "rgba(107, 159, 212, 0.08)", borderColor: "rgba(107, 159, 212, 0.2)" }}>
            <span className="pill-dot" style={{ backgroundColor: "#6B9FD4", boxShadow: "0 0 0 3px rgba(107, 159, 212, 0.25)" }} /> 
            Route Unmapped
          </div>

          <h1 style={{
            fontSize: "30px", fontWeight: 900,
            lineHeight: 1.12, letterSpacing: "-0.03em",
            color: "#E8F2FC", marginBottom: "16px",
            textAlign: "center"
          }}>
            Beyond mapped <span style={{
              background: "linear-gradient(120deg, #1A6BDC 20%, #6B9FD4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>voice networks.</span>
          </h1>

          <p style={{
            fontSize: "14px", lineHeight: 1.6, color: "#a5b9cc",
            textAlign: "center", marginBottom: "32px", maxWidth: "420px"
          }}>
            The address you requested does not exist or has migrated to a different segment. Let&apos;s get you back on track.
          </p>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
            <Link href="/" className="btn-primary" style={{ fontSize: "14px", padding: "11px 22px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Home size={15} /> Return Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-ghost" style={{ fontSize: "14px", padding: "11px 22px", display: "inline-flex", alignItems: "center", gap: "8px", color: "#E8F2FC", borderColor: "rgba(255, 255, 255, 0.2)", background: "transparent", cursor: "pointer" }}
               onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255, 255, 255, 0.05)"; el.style.borderColor = "#6B9FD4"; }}
               onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.borderColor = "rgba(255, 255, 255, 0.2)"; }}>
              <ArrowLeft size={15} /> Go Back
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes ping-radar {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float-window {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .notfound-card {
          animation: float-window 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
