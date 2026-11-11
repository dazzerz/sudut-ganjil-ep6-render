import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const SolarPhotonHUD: React.FC = () => {
  const frame = useCurrentFrame();

  const isEscaped = frame > 1250;

  // Photon elapsed time
  const photonYears = Math.round(
    interpolate(frame, [0, 500, 1150, 1250], [0, 42000, 100000, 100000], {
      extrapolateRight: "clamp",
    })
  );

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
      {/* Top Left: Photon Age & Zone */}
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
          <span style={{ fontSize: 16, color: "#8E9AA8", letterSpacing: "0.08em" }}>
            USIA FOTON:
          </span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: isEscaped ? "#00FF66" : "#FFE600",
              textShadow: isEscaped
                ? "0 0 10px rgba(0, 255, 102, 0.8)"
                : "0 0 10px rgba(255, 230, 0, 0.8)",
            }}
          >
            {isEscaped ? "100.000 THN + 8m 20s" : `${photonYears.toLocaleString()} TAHUN`}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, color: "#8E9AA8" }}>POSISI:</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#00F0FF",
              textShadow: "0 0 8px rgba(0, 240, 255, 0.7)",
            }}
          >
            {isEscaped ? "RUANG HAMPA (VAKUM)" : frame > 800 ? "ZONA RADIATIF" : "INTI MATAHARI (CORE)"}
          </span>
        </div>

        {/* Minimal hairline bar */}
        <div
          style={{
            width: 260,
            height: 3,
            backgroundColor: "rgba(255,255,255,0.15)",
            position: "relative",
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: `${Math.min(100, (photonYears / 100000) * 100)}%`,
              height: "100%",
              backgroundColor: isEscaped ? "#00FF66" : "#FFE600",
              boxShadow: `0 0 8px ${isEscaped ? "#00FF66" : "#FFE600"}`,
            }}
          />
        </div>
      </div>

      {/* Top Right: Mean Free Path & Speed of Light */}
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
          <span style={{ fontSize: 15, color: "#8E9AA8" }}>FREE PATH:</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#FFFFFF",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {isEscaped ? "∞ (VAKUM BEBAS)" : "0.1 mm / TABRAKAN"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, color: "#8E9AA8" }}>KECEPATAN:</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: isEscaped ? "#00FF66" : "#FF9500",
              textShadow: `0 0 8px ${isEscaped ? "rgba(0,255,102,0.8)" : "rgba(255,149,0,0.8)"}`,
            }}
          >
            {isEscaped ? "299.792 km/s (c)" : "0.00001 mm/s"}
          </span>
        </div>

        <span
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.06em",
          }}
        >
          MEKANISME: {isEscaped ? "BALLISTIC PHOTON" : "RANDOM WALK"}
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
          y1={1020}
          x2={460}
          y2={1020}
          stroke="rgba(255, 230, 0, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx={460} cy={1020} r={4} fill="#FFE600" />
        <text
          x={120}
          y={1010}
          fill="#FFE600"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          ○──── [INTI MATAHARI 15.000.000 K]
        </text>

        <line
          x1={540}
          y1={650}
          x2={860}
          y2={650}
          stroke="rgba(0, 240, 255, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx={540} cy={650} r={4} fill="#00F0FF" />
        <text
          x={620}
          y={640}
          fill="#00F0FF"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          [ZONA RADIATIF / RANDOM WALK] ────○
        </text>
      </svg>
    </div>
  );
};
