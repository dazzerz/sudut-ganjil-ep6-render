import React from "react";
import { useCurrentFrame } from "remotion";

interface MysteryMagnifierHUDProps {
  x: number;
  y: number;
  label: string;
  sublabel: string;
}

export const MysteryMagnifierHUD: React.FC<MysteryMagnifierHUDProps> = ({
  x,
  y,
  label,
  sublabel,
}) => {
  const frame = useCurrentFrame();

  // Pulse animation for the clue target
  const pulseScale = 1 + Math.sin((frame / 15) * Math.PI) * 0.08;
  const pulseOpacity = 0.7 + Math.sin((frame / 15) * Math.PI) * 0.3;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 40,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Outer Radar Target Circle */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "2px dashed #00F0FF",
          position: "absolute",
          top: -60,
          left: -60,
          transform: `scale(${pulseScale}) rotate(${frame * 1.2}deg)`,
          opacity: pulseOpacity,
          boxShadow: "0 0 20px rgba(0, 240, 255, 0.4)",
        }}
      />

      {/* Center Target Dot */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#FFE600",
          boxShadow: "0 0 14px #FFE600",
          position: "absolute",
          top: -6,
          left: -6,
        }}
      />

      {/* Hairline Pointer Line - Going up and left */}
      <svg
        style={{
          position: "absolute",
          left: -280,
          top: -140,
          width: 320,
          height: 160,
          overflow: "visible",
        }}
      >
        <line
          x1={280}
          y1={140}
          x2={160}
          y2={50}
          stroke="#00F0FF"
          strokeWidth="2"
        />
        <line
          x1={160}
          y1={50}
          x2={0}
          y2={50}
          stroke="#00F0FF"
          strokeWidth="2"
        />
        <circle cx={160} cy={50} r={4} fill="#00F0FF" />
      </svg>

      {/* Floating HUD Label on the upper left side */}
      <div
        style={{
          position: "absolute",
          left: -280,
          top: -130,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 900,
              backgroundColor: "#FFE600",
              color: "#0B0F15",
              padding: "2px 8px",
              borderRadius: 3,
              letterSpacing: "0.1em",
            }}
          >
            BUKTI DITEMUKAN
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#00F0FF",
              letterSpacing: "0.05em",
              textShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
            }}
          >
            {label}
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#FFFFFF",
            opacity: 0.9,
            letterSpacing: "0.04em",
            textShadow: "0 2px 8px rgba(0,0,0,0.95)",
          }}
        >
          {sublabel}
        </span>
      </div>
    </div>
  );
};