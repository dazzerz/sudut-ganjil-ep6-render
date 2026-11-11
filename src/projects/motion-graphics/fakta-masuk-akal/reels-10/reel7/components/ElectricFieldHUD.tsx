import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const ElectricFieldHUD: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic atmospheric electrical measurements
  const eField = Math.round(
    interpolate(frame, [0, 400, 800, 1200, 1800], [45, 185, 340, 420, 110], {
      extrapolateRight: "clamp",
    }) + (Math.sin(frame * 0.4) * 8)
  );

  const altitude = Math.round(
    interpolate(frame, [0, 300, 700, 1200, 1800], [380, 828, 2400, 4100, 828], {
      extrapolateRight: "clamp",
    })
  );

  const speedLeader = (
    interpolate(frame, [450, 900, 1300], [0.8, 1.9, 2.4], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) + (Math.cos(frame * 0.2) * 0.05)
  ).toFixed(2);

  // Active discharge flash
  const isFlash = (frame > 250 && frame < 270) || (frame > 780 && frame < 815) || (frame > 1120 && frame < 1160);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 35,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Top Left HUD: Electric Field & Polarity */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 70,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, color: "#8E9AA8", letterSpacing: "0.08em" }}>
            ATMOSPHERIC E-FIELD:
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: isFlash ? "#FFF" : "#00F0FF",
              textShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
            }}
          >
            {eField} kV/m
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#8E9AA8" }}>POLARITY:</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#FFE600",
              textShadow: "0 0 8px rgba(255, 230, 0, 0.7)",
            }}
          >
            POSITIVE (+) UPWARD LEADER
          </span>
        </div>

        {/* Minimal hairline bar */}
        <div
          style={{
            width: 280,
            height: 3,
            backgroundColor: "rgba(255,255,255,0.15)",
            position: "relative",
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: `${Math.min(100, (eField / 450) * 100)}%`,
              height: "100%",
              backgroundColor: "#00F0FF",
              boxShadow: "0 0 8px #00F0FF",
            }}
          />
        </div>
      </div>

      {/* Top Right HUD: Altitude & Leader Velocity */}
      <div
        style={{
          position: "absolute",
          top: 230,
          right: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, color: "#8E9AA8" }}>ALTITUDE:</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#FFFFFF",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {altitude} m
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#8E9AA8" }}>LEADER VELOCITY:</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#00F0FF",
              textShadow: "0 0 8px rgba(0, 240, 255, 0.8)",
            }}
          >
            {speedLeader} × 10⁵ m/s
          </span>
        </div>

        <span
          style={{
            fontSize: 14,
            color: isFlash ? "#00FF66" : "rgba(255,255,255,0.5)",
            letterSpacing: "0.06em",
          }}
        >
          STATUS: {isFlash ? "⚡ DISCHARGE DETECTED" : "IONIZATION ACTIVE"}
        </span>
      </div>

      {/* Center Target Hairlines & Anchor Pointer */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Horizontal hairline reference at tower peak (approx y: 1100) */}
        <line
          x1={100}
          y1={1100}
          x2={400}
          y2={1100}
          stroke="rgba(0, 240, 255, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx={400} cy={1100} r={4} fill="#00F0FF" />
        <text
          x={110}
          y={1090}
          fill="#00F0FF"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          [BURJ KHALIFA SPIRE - 828m] ────○
        </text>

        {/* Upward vector indicator */}
        <line
          x1={540}
          y1={1100}
          x2={540}
          y2={650}
          stroke="rgba(255, 230, 0, 0.6)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        {/* Arrow head */}
        <polygon
          points="534,650 546,650 540,630"
          fill="#FFE600"
        />
        <text
          x={555}
          y={860}
          fill="#FFE600"
          fontSize="18"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          ▲ UPWARD DIRECTION
        </text>
      </svg>
    </div>
  );
};
