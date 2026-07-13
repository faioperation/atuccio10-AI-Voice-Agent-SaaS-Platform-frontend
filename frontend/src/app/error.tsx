"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Home, Copy, Check, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
  reset,
}: {
  error: Error & { digest?: string };
  unstable_retry?: () => void;
  reset?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Clinch Error Boundary Captured:", error);
  }, [error]);

  const handleRetry = () => {
    if (unstable_retry) {
      unstable_retry();
    } else if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  const copyDigest = () => {
    if (error.digest) {
      navigator.clipboard.writeText(error.digest);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

      {/* Floating error card */}
      <div className="error-card" style={{
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
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#E8F2FC", letterSpacing: "0.09em", marginLeft: "8px" }}>SYSTEM STATUS · DISCONNECTED</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ fontSize: "10px", color: "#ef4444", fontWeight: 600 }}>Error 500</span>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Animated connection interruption wave */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", height: "60px", marginBottom: "24px", justifyContent: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((bar) => {
              const heights = [20, 45, 15, 55, 30, 40, 25];
              const delays = [0.1, 0.4, 0.2, 0.6, 0.3, 0.5, 0.7];
              return (
                <div
                  key={bar}
                  style={{
                    width: "5px",
                    height: `${heights[bar - 1]}px`,
                    backgroundColor: bar === 4 ? "#ef4444" : "#1A6BDC",
                    borderRadius: "3px",
                    opacity: 0.85,
                    animation: "pulse-wave 1.6s ease-in-out infinite",
                    animationDelay: `${delays[bar - 1]}s`,
                  }}
                />
              );
            })}
          </div>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#ef4444",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            padding: "6px 14px",
            borderRadius: "100px",
            marginBottom: "20px",
          }}>
            <ShieldAlert size={14} /> Connection Interrupted
          </div>

          <h1 style={{
            fontSize: "28px", fontWeight: 900,
            lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "#E8F2FC", marginBottom: "16px",
            textAlign: "center"
          }}>
            Unexpected <span style={{
              background: "linear-gradient(120deg, #ef4444 20%, #6B9FD4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>hurdle encountered.</span>
          </h1>

          <p style={{
            fontSize: "14px", lineHeight: 1.6, color: "#a5b9cc",
            textAlign: "center", marginBottom: "32px", maxWidth: "420px"
          }}>
            The Clinch voice systems encountered a temporary synchronization disruption. We have safely isolated the issue, and our engineering team has been alerted.
          </p>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", width: "100%", marginBottom: "28px", flexWrap: "wrap" }}>
            <button onClick={handleRetry} className="btn-primary" style={{ fontSize: "14px", padding: "11px 22px", border: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <RefreshCw size={15} style={{ animation: "spin 4s linear infinite" }} /> Reconnect Agent
            </button>
            <a href="/" className="btn-ghost" style={{ fontSize: "14px", padding: "11px 22px", display: "inline-flex", alignItems: "center", gap: "8px", color: "#E8F2FC", borderColor: "rgba(255, 255, 255, 0.2)", background: "transparent" }}
               onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255, 255, 255, 0.05)"; el.style.borderColor = "#6B9FD4"; }}
               onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.borderColor = "rgba(255, 255, 255, 0.2)"; }}>
              <Home size={15} /> Return Home
            </a>
          </div>

          {/* Expandable diagnostic details */}
          <div style={{ borderTop: "1px solid #1e3048", paddingTop: "20px", width: "100%" }}>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: "none", border: "none", color: "#6B9FD4", fontSize: "12px", fontWeight: 600,
                display: "flex", alignItems: "center", gap: "6px", margin: "0 auto", cursor: "pointer", padding: "4px 8px"
              }}
            >
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showDetails ? "Hide Diagnostics" : "Show Diagnostics"}
            </button>
            
            {showDetails && (
              <div style={{
                marginTop: "16px", background: "#070f17", borderRadius: "8px", padding: "16px",
                border: "1px solid #1e3048", textAlign: "left", animation: "fadeIn 0.25s ease-out forwards"
              }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#3a5060", marginBottom: "8px", letterSpacing: "0.05em" }}>ERROR DIGEST</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", background: "#0a1520", padding: "8px 12px", borderRadius: "4px", border: "1px solid #142435", marginBottom: "12px" }}>
                  <code style={{ fontSize: "12px", color: "#E8F2FC", fontFamily: "monospace", wordBreak: "break-all" }}>
                    {error.digest || "No digest hash available"}
                  </code>
                  {error.digest && (
                    <button 
                      onClick={copyDigest}
                      style={{ background: "none", border: "none", color: copied ? "#22C47A" : "#6B9FD4", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
                
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#3a5060", marginBottom: "8px", letterSpacing: "0.05em" }}>DIAGNOSTIC MESSAGE</div>
                <div style={{ background: "#0a1520", padding: "10px 12px", borderRadius: "4px", border: "1px solid #142435", fontSize: "12px", color: "#a5b9cc", fontFamily: "monospace", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all", maxHeight: "120px" }}>
                  {error.message || "An unexpected runtime error occurred."}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse-wave {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(0.3); opacity: 0.95; }
        }
        @keyframes float-window {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .error-card {
          animation: float-window 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
