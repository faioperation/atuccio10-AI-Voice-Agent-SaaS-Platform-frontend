"use client";

interface PricingErrorProps {
  onRetry?: () => void;
}

export function PricingError({ onRetry }: PricingErrorProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        gap: 16,
        background: "#fff",
        borderRadius: 18,
        border: "1.5px solid #e4edf5",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#1A6BDC" strokeWidth="1.5" />
        <path
          d="M12 8v4M12 16h.01"
          stroke="#1A6BDC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h3
        style={{ fontSize: 16, fontWeight: 700, color: "#0C1824", margin: 0 }}
      >
        Unable to load pricing
      </h3>

      <p
        style={{
          fontSize: 13,
          color: "#4a6070",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        We couldn&apos;t fetch the latest plans. Please try again.
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 4,
            padding: "10px 28px",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
            background: "#1A6BDC",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1558be")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1A6BDC")}
        >
          Retry
        </button>
      )}
    </div>
  );
}
