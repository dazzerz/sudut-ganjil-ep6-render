import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ScientificBadgeReel7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reveal badge after initial hook
  const entrance = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 155,
        left: 70,
        right: 70,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 40,
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#00F0FF",
            boxShadow: "0 0 12px #00F0FF",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          FAKTA MASUK AKAL
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 700,
            color: "#00F0FF",
            letterSpacing: "0.04em",
            textShadow: "0 0 10px rgba(0,240,255,0.7), 0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          REF: NOAA NSSL / JGR ATMOSPHERES
        </span>
      </div>
    </div>
  );
};
