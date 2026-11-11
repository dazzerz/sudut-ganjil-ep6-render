import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const ThermodynamicsHUD: React.FC = () => {
  const frame = useCurrentFrame();

  // Temperatures
  const hotTemp = Math.round(
    interpolate(frame, [0, 400, 1100, 1800], [95, 62, 14, 0], {
      extrapolateRight: "clamp",
    })
  );

  const coldTemp = Math.round(
    interpolate(frame, [0, 400, 1100, 1800], [24, 18, 9, 3], {
      extrapolateRight: "clamp",
    })
  );

  const isFrozen = hotTemp === 0;

  const convectionSpeed = (
    interpolate(frame, [0, 600, 1400], [4.8, 3.2, 0.4], {
      extrapolateRight: "clamp",
    })
  ).toFixed(1);

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
      {/* Top Left: Temperature Comparison */}
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
            AIR PANAS (MPEMBA):
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: isFrozen ? "#00FF66" : "#FF3B30",
              textShadow: isFrozen
                ? "0 0 10px rgba(0, 255, 102, 0.8)"
                : "0 0 10px rgba(255, 59, 48, 0.8)",
            }}
          >
            {isFrozen ? "0°C (BEKU / ES)" : `${hotTemp}°C`}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#8E9AA8" }}>AIR DINGIN KONTROL:</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#00F0FF",
              textShadow: "0 0 8px rgba(0, 240, 255, 0.7)",
            }}
          >
            {coldTemp}°C (BELUM BEKU)
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
              width: `${Math.min(100, (1 - hotTemp / 100) * 100)}%`,
              height: "100%",
              backgroundColor: isFrozen ? "#00FF66" : "#00F0FF",
              boxShadow: `0 0 8px ${isFrozen ? "#00FF66" : "#00F0FF"}`,
            }}
          />
        </div>
      </div>

      {/* Top Right: Molecular Energy & Convection */}
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
          <span style={{ fontSize: 18, color: "#8E9AA8" }}>O-H COVALENT BOND:</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#FFE600",
              textShadow: "0 2px 10px rgba(255,230,0,0.8)",
            }}
          >
            RELAXED (POTENTIAL ↑)
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#8E9AA8" }}>CONVECTION VELOCITY:</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#00F0FF",
              textShadow: "0 0 8px rgba(0, 240, 255, 0.8)",
            }}
          >
            {convectionSpeed} cm/s
          </span>
        </div>

        <span
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.06em",
          }}
        >
          STATE: {isFrozen ? "HEXAGONAL ICE CRYSTAL" : "SUPERCOOLING EXPONENT"}
        </span>
      </div>

      {/* Hairline Pointers */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <line
          x1={200}
          y1={1050}
          x2={480}
          y2={1050}
          stroke="rgba(0, 240, 255, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx={480} cy={1050} r={4} fill="#00F0FF" />
        <text
          x={140}
          y={1040}
          fill="#00F0FF"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          ○──── [IKATAN HIDROGEN H2O]
        </text>

        <line
          x1={540}
          y1={630}
          x2={860}
          y2={630}
          stroke="rgba(255, 230, 0, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx={540} cy={630} r={4} fill="#FFE600" />
        <text
          x={620}
          y={620}
          fill="#FFE600"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          [ARUS KONVEKSI RAYLEIGH] ────○
        </text>
      </svg>
    </div>
  );
};
