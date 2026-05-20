"use client";

import React from "react";

interface LoaderProps {
  message?: string;
  variant?: "dashboard" | "splash";
}

const Loader = ({ message = "Dashboard Loading", variant = "dashboard" }: LoaderProps) => {
  const isSplash = variant === "splash";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
        isSplash
          ? "fixed inset-0 z-[9999] bg-white min-h-screen w-screen"
          : "min-h-[400px] w-full"
      }`}
    >
      {/* Premium spinner: three concentric rings */}
      <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
        {/* Outer ring */}
        <span
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: "#5D87FF",
            borderRightColor: "#5D87FF33",
            animation: "spin 1.1s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        />
        {/* Middle ring */}
        <span
          className="absolute rounded-full border-4 border-transparent"
          style={{
            inset: 10,
            borderTopColor: "#1A6BDC",
            borderLeftColor: "#1A6BDC44",
            animation: "spin 0.8s cubic-bezier(0.4,0,0.6,1) infinite reverse",
          }}
        />
        {/* Inner dot */}
        <span
          className="rounded-full"
          style={{
            width: 16,
            height: 16,
            background: "linear-gradient(135deg, #5D87FF 0%, #1A6BDC 100%)",
            boxShadow: "0 0 12px rgba(93,135,255,0.6)",
            animation: "pulse-scale 1.4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Loading text */}
      <div className="flex flex-col items-center gap-2">
        <p
          className="font-semibold tracking-widest uppercase"
          style={{
            fontSize: 13,
            color: "#0C1824",
            letterSpacing: "0.18em",
          }}
        >
          {message}
        </p>
        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="rounded-full bg-[#5D87FF]"
              style={{
                width: 6,
                height: 6,
                opacity: 0.3,
                animation: `bounce-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.25); opacity: 0.7; }
        }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
