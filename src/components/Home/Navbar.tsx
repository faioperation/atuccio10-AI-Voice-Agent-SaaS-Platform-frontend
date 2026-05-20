"use client";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "#FFFFFF",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(26,107,220,0.1)",
    }}>
      <div className="container-xl" style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "80px",
        padding: "0 clamp(16px, 4vw, 32px)",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }} className="hover:opacity-90 transition-opacity">
          <Image
            src="/logo.png"
            alt="Clinch"
            width={120}
            height={80}
            style={{ width: "auto", height: "auto", objectFit: "contain" }}
            priority
          />
        </a>

        {/* Nav */}
        <nav style={{ display: "flex", gap: "2px" }} className="d-nav">
          {[["Features", "#features"], ["How It Works", "#how-it-works"], ["Pricing", "#pricing"], ["Integrations", "#integrations"], ["Dashboard", "/business_admin"]].map(([l, h]) => (
            <a key={l} href={h} style={{
              fontSize: "13px", fontWeight: 600, color: "#4a6070",
              textDecoration: "none", padding: "6px 14px", borderRadius: "7px",
              transition: "color 0.15s, background 0.15s",
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color = "#1A6BDC"; el.style.background = "#E8F2FC"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color = "#4a6070"; el.style.background = "transparent"; }}
            >{l}</a>
          ))}
        </nav>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="nav-actions">
          <a href="#pricing" className="btn-primary d-nav-btn" style={{ fontSize: "13px", padding: "9px 20px" }}>
            Start Free Trial
          </a>
          {/* Mobile */}
          <button onClick={() => setOpen(!open)} className="mob-btn"
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "6px", marginLeft: "4px" }}
            aria-label="Menu">
            <svg width="20" height="20" fill="none" stroke="#0C1824" strokeWidth="2.2">
              <path d={open ? "M4 4l12 12M4 16L16 4" : "M3 7h14M3 13h14"} strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "#F5F4F2",
          borderTop: "1px solid #e4edf5",
          padding: "16px clamp(24px, 8vw, 48px) 20px",
          position: "absolute",
          top: "64px",
          left: 0,
          right: 0,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}>
          {[["Features", "#features"], ["How It Works", "#how-it-works"], ["Pricing", "#pricing"], ["Integrations", "#integrations"], ["Dashboard", "/business_admin"]].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)} style={{
              display: "block", fontSize: "14px", fontWeight: 600, color: "#0C1824",
              textDecoration: "none", padding: "11px 0", borderBottom: "1px solid #E8F2FC",
            }}>{l}</a>
          ))}
          <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <a href="#pricing" className="btn-primary" style={{ textAlign: "center" }}>Start Free Trial</a>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px) { .d-nav{display:none!important} .mob-btn{display:flex!important} }
        @media(max-width:400px) { .d-nav-btn{display:none!important} }
      `}</style>
    </header>
  );
}
