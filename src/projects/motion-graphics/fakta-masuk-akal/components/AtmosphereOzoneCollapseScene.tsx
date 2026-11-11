import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  skyDarkness: number; // 0 (bright blue day) to 1 (black space daylight)
}

export const AtmosphereOzoneCollapseScene: React.FC<Props> = ({ skyDarkness }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sun pulsing
  const sunPulse = 1 + Math.sin(frame * 0.12) * 0.08;

  // Sky transition from radiant sky blue to deep space black
  const bgGrad = skyDarkness > 0.4
    ? "linear-gradient(180deg, #020617 0%, #0B0F19 45%, #1E1B4B 80%, #0F172A 100%)"
    : "linear-gradient(180deg, #0284C7 0%, #38BDF8 50%, #7DD3FC 80%, #BAE6FD 100%)";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: bgGrad,
        transition: "background 0.4s ease",
      }}
    >
      {/* Blazing Sun & Harsh Radiation Rays */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          right: "12%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          backgroundColor: "#FBBF24",
          boxShadow: "0 0 100px #F59E0B, 0 0 160px #FBBF24, 0 0 240px #FFFFFF",
          transform: `scale(${sunPulse})`,
        }}
      />

      {/* Extreme UV Radiation Beams Piercing to Ground */}
      {skyDarkness > 0.3 && (
        <svg
          viewBox="0 0 1080 1920"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const startX = 850 + (i - 4) * 40;
            const endX = 100 + i * 130;
            const opacity = (skyDarkness - 0.3) * (0.4 + (i % 3) * 0.2);
            return (
              <line
                key={i}
                x1={startX}
                y1="340"
                x2={endX}
                y2="1920"
                stroke="#FDE047"
                strokeWidth="12"
                strokeDasharray="20 15"
                opacity={opacity}
                style={{ filter: "drop-shadow(0 0 15px rgba(253, 224, 71, 0.9))" }}
              />
            );
          })}
        </svg>
      )}

      {/* Cosmic Stars appearing in daylight (because scattering is gone) */}
      {skyDarkness > 0.35 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(i * 17) % 92 + 4}%`,
                top: `${(i * 29) % 65 + 5}%`,
                width: (i % 3) + 3,
                height: (i % 3) + 3,
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
                opacity: (skyDarkness - 0.35) * 1.5,
                boxShadow: "0 0 6px #FFFFFF",
              }}
            />
          ))}
        </div>
      )}

      {/* Earth Surface & Vanishing Ozone Shield (Full Screen) */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Curvature of Earth Horizon */}
        <path
          d="M -200 1920 Q 540 1480 1280 1920"
          fill="#064E3B"
          stroke="#059669"
          strokeWidth="12"
        />

        {/* Ozone Layer (O3) Protective Dome */}
        <path
          d="M -200 1840 Q 540 1380 1280 1840"
          fill="none"
          stroke={skyDarkness > 0.4 ? "rgba(239, 68, 68, 0.5)" : "#38BDF8"}
          strokeWidth="28"
          strokeDasharray={skyDarkness > 0.4 ? "24 20" : "none"}
          opacity={1 - skyDarkness * 0.75}
          style={{
            filter: skyDarkness > 0.4
              ? "drop-shadow(0 0 20px #FF1744)"
              : "drop-shadow(0 0 35px #00E5FF)",
          }}
        />

        {/* Technical Callout Hairlines (NO BOXES) */}
        <line x1="540" y1="1300" x2="540" y2="1370" stroke="#38BDF8" strokeWidth="3" />
        <circle cx="540" cy="1370" r="8" fill="#38BDF8" />
        <text
          x="320"
          y="1270"
          fill={skyDarkness > 0.4 ? "#FF5252" : "#38BDF8"}
          fontSize="36"
          fontWeight="900"
          fontFamily="'Montserrat', system-ui, sans-serif"
          style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.9))" }}
        >
          {skyDarkness > 0.4 ? "⚡ LAPISAN OZON (O₃) LENYAP!" : "PERISAI OZONOSFER (O₃)"}
        </text>
      </svg>

      {/* Full-Bleed Technical Header sitting directly on canvas (NO BOXES) */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 70,
          right: 70,
          borderLeft: "6px solid #8B5CF6",
          paddingLeft: 20,
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 900, color: "#A78BFA", letterSpacing: 3 }}>
          FAKTA 03 // HAMBURAN CAHAYA LENYAP
        </div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            lineHeight: 1.1,
            marginTop: 6,
            textShadow: "0 4px 20px #000000",
          }}
        >
          LANGIT SIANG BERUBAH HITAM KOSMIK!
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#FDE047",
            marginTop: 10,
            textShadow: "0 2px 10px #000000",
          }}
        >
          Rayleigh Scattering Terhenti & Radiasi UV Surya Masuk Bebas
        </div>
      </div>
    </div>
  );
};
