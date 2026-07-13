"use client";

const CARD_COUNT = 3;
const FEATURE_ROWS = 4;

function SkeletonBlock({
  width,
  height,
  radius = 6,
  style,
}: {
  width: string | number;
  height: number;
  radius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "#e4edf5",
        animation: "sk-pulse 1.6s ease-in-out infinite",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

function SkeletonCard({ elevated }: { elevated: boolean }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        border: "1.5px solid #e4edf5",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        transform: elevated ? "translateY(-8px)" : "none",
      }}
    >
      {/* Plan name */}
      <SkeletonBlock width={64} height={10} style={{ marginBottom: 20 }} />

      {/* Price */}
      <SkeletonBlock width={140} height={52} radius={10} style={{ marginBottom: 14 }} />

      {/* Description */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 22 }}>
        <SkeletonBlock width="100%" height={10} radius={4} />
        <SkeletonBlock width="72%" height={10} radius={4} />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#f0f4f8", marginBottom: 20 }} />

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {Array.from({ length: FEATURE_ROWS }).map((_, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "center" }}>
            <SkeletonBlock width={14} height={14} radius={7} />
            <SkeletonBlock width={`${55 + i * 12}%`} height={10} radius={4} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <SkeletonBlock width="100%" height={46} radius={10} />
    </div>
  );
}

export function PricingSkeleton() {
  return (
    <>
      <div
        id="pricing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
          alignItems: "start",
        }}
      >
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <SkeletonCard key={i} elevated={i === 1} />
        ))}
      </div>

      <style>{`
        @keyframes sk-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
        @media(max-width:1024px){
          #pricing-grid { grid-template-columns: repeat(2,1fr) !important; }
          #pricing-grid > div:last-child { grid-column: span 2; max-width: 500px; margin: 0 auto; width: 100%; }
        }
        @media(max-width:768px){
          #pricing-grid { grid-template-columns: 1fr !important; }
          #pricing-grid > div:last-child { grid-column: span 1; }
        }
      `}</style>
    </>
  );
}
