import React from "react";
import { useCurrentFrame } from "remotion";

export const CosmicBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle nebula drift
  const nebulaDriftX = Math.sin(frame * 0.015) * 40;
  const nebulaDriftY = Math.cos(frame * 0.012) * 30;

  // Stardust particles (deterministic positions based on index)
  const stars = React.useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      x: ((i * 137.5) % 1000) + 40,
      y: ((i * 269.3) % 1800) + 60,
      size: (i % 3) + 1.5,
      twinkleSpeed: 0.05 + (i % 5) * 0.02,
      baseOpacity: 0.3 + (i % 5) * 0.12,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#050814",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* 1. Deep Space Radial Gradients */}
      <div
        style={{
          position: "absolute",
          top: `calc(20% + ${nebulaDriftY}px)`,
          left: `calc(40% + ${nebulaDriftX}px)`,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14, 42, 92, 0.45) 0%, rgba(5, 8, 20, 0) 70%)",
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: `calc(60% - ${nebulaDriftX * 0.8}px)`,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, rgba(5, 8, 20, 0) 65%)",
          filter: "blur(70px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 2. Starfield with deterministic twinkling */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        {stars.map((star, idx) => {
          const twinkle =
            Math.sin(frame * star.twinkleSpeed + idx) * 0.35 +
            star.baseOpacity;
          const clampedTwinkle = Math.max(0.1, Math.min(1.0, twinkle));
          return (
            <circle
              key={idx}
              cx={star.x}
              cy={(star.y + frame * 0.4) % 1920}
              r={star.size}
              fill="#FFFFFF"
              opacity={clampedTwinkle}
            />
          );
        })}

        {/* 3. Subtle Sci-Fi Telemetry Grid Lines */}
        <defs>
          <pattern
            id="faktaGrid"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 120 0 L 0 0 0 120"
              fill="none"
              stroke="#00F2FE"
              strokeWidth="0.75"
              strokeOpacity="0.08"
            />
            <circle cx="120" cy="120" r="1.5" fill="#00F2FE" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#faktaGrid)" />
      </svg>

      {/* 4. Vignette Shadow around borders */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.85)",
        }}
      />
    </div>
  );
};
