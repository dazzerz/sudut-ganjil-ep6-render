import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  skyDarkness: number; // 0 (bright blue day) to 1 (pitch black space daylight)
}

export const SkyOzoneTransition: React.FC<Props> = ({ skyDarkness }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { stiffness: 120, damping: 14 },
  });

  // Animated sunlight rays
  const sunPulse = 1 + Math.sin(frame * 0.1) * 0.08;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 880,
        transform: `scale(${enterSpring})`,
      }}
    >
      {/* Sky & Ozone Visual Box */}
      <div
        style={{
          position: "relative",
          width: 800,
          height: 520,
          borderRadius: 36,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.08)",
          border: "3px solid #E2E8F0",
          overflow: "hidden",
          backgroundColor: interpolate(skyDarkness, [0, 1], [0, 1]) > 0.5
            ? "#0F172A"
            : "#38BDF8",
          background: interpolate(skyDarkness, [0, 1], [0, 1]) > 0.5
            ? "linear-gradient(180deg, #090D16 0%, #1E293B 70%, #334155 100%)"
            : "linear-gradient(180deg, #0284C7 0%, #38BDF8 60%, #BAE6FD 100%)",
          transition: "background 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Blazing Sun */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 80,
            width: 130,
            height: 130,
            borderRadius: "50%",
            backgroundColor: "#FBBF24",
            boxShadow: "0 0 60px #F59E0B, 0 0 100px #FBBF24",
            transform: `scale(${sunPulse})`,
          }}
        />

        {/* Stars appearing when sky turns black (Rayleigh scattering gone) */}
        {skyDarkness > 0.3 && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${(i * 17) % 90 + 5}%`,
                  top: `${(i * 23) % 80 + 5}%`,
                  width: (i % 3) + 2,
                  height: (i % 3) + 2,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "50%",
                  opacity: (skyDarkness - 0.3) * 1.4,
                  boxShadow: "0 0 4px #FFFFFF",
                }}
              />
            ))}
          </div>
        )}

        {/* Ozone Protective Shield Arc */}
        <svg
          width="740"
          height="460"
          viewBox="0 0 740 460"
          style={{ position: "absolute", bottom: 0 }}
        >
          {/* Earth Horizon Curve */}
          <path
            d="M -100 480 Q 370 280 840 480"
            fill="#10B981"
            stroke="#059669"
            strokeWidth="12"
          />

          {/* Ozone Layer (O3) Protective Bubble */}
          <path
            d="M -100 420 Q 370 200 840 420"
            fill="none"
            stroke={skyDarkness > 0.4 ? "rgba(239, 68, 68, 0.4)" : "#38BDF8"}
            strokeWidth="20"
            strokeDasharray={skyDarkness > 0.4 ? "15 15" : "none"}
            opacity={1 - skyDarkness * 0.7}
            style={{
              filter: skyDarkness > 0.4
                ? "drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))"
                : "drop-shadow(0 0 15px rgba(56, 189, 248, 0.9))",
            }}
          />
        </svg>

        {/* Dynamic Center Badge */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            padding: "16px 36px",
            borderRadius: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: skyDarkness > 0.4 ? "#DC2626" : "#0284C7",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {skyDarkness > 0.4
              ? "⚡ HAMBURAN CAHAYA & OZON (O₃) LENYAP"
              : "ATMOSFER NORMAL (HAMBURAN RAYLEIGH)"}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#475569" }}>
            {skyDarkness > 0.4
              ? "Langit Siang Berubah Menjadi Gelap Kosmik"
              : "Molekul O₂ Membiaskan Cahaya Biru"}
          </div>
        </div>
      </div>

      {/* Scientific Reference Card */}
      <div
        style={{
          marginTop: 24,
          width: 800,
          backgroundColor: "#F8FAFC",
          border: "2px solid #E2E8F0",
          borderRadius: 24,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              backgroundColor: "#EFF6FF",
              border: "2px solid #BFDBFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            ☀️
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#1E293B",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Hukum Fisika:
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#0284C7" }}>
              Rayleigh Scattering & Ozonosfer
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "8px 18px",
            backgroundColor: "#FEF3C7",
            borderRadius: 16,
            border: "1px solid #FDE68A",
            color: "#92400E",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          UV Ekstrem Masuk
        </div>
      </div>
    </div>
  );
};
