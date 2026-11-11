import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ScientificBadgeReel1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: frame - 1450,
    fps,
    config: { stiffness: 200, damping: 15 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 660,
        left: "50%",
        transform: `translateX(-50%) scale(${badgeSpring})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        zIndex: 60,
        pointerEvents: "none",
        width: 880,
      }}
    >
      <div
        style={{
          width: 260,
          height: 2,
          background: "linear-gradient(90deg, transparent, #22C55E, transparent)",
          marginBottom: 16,
          boxShadow: "0 0 10px #22C55E",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 32, filter: "drop-shadow(0 0 10px #22C55E)" }}>✓</span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 3,
            color: "#4ADE80",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
            textShadow: "0 0 16px rgba(74, 222, 128, 0.9), 0 2px 4px #000000",
          }}
        >
          REFERENSI RISET NEUROLOGI
        </span>
      </div>

      <span
        style={{
          fontSize: 42,
          fontWeight: 900,
          color: "#FFFFFF",
          fontFamily: "'Montserrat', system-ui, sans-serif",
          textShadow: "0 4px 20px #000000, 0 2px 8px #000000, 0 0 20px rgba(0,0,0,0.95)",
          letterSpacing: 1,
          lineHeight: 1.2,
        }}
      >
        JOURNAL OF NEUROSCIENCE
      </span>

      <span
        style={{
          fontSize: 30,
          fontWeight: 800,
          color: "#CBD5E1",
          fontFamily: "system-ui, sans-serif",
          textShadow: "0 4px 16px #000000, 0 2px 6px #000000, 0 0 14px rgba(0,0,0,0.9)",
          marginTop: 6,
        }}
      >
        & HARVARD MEDICAL SCHOOL
      </span>

      <div
        style={{
          width: 400,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
          marginTop: 22,
          marginBottom: 22,
        }}
      />

      <span
        style={{
          fontSize: 38,
          fontWeight: 900,
          letterSpacing: 2,
          color: "#FACC15",
          fontFamily: "'Montserrat', system-ui, sans-serif",
          textShadow: "0 0 26px rgba(250, 204, 21, 0.95), 0 4px 16px #000000",
        }}
      >
        FOLLOW @FAKTAMASUKAKAL
      </span>

      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 3,
          color: "#F1F5F9",
          textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif",
          textShadow: "0 2px 8px #000000",
          marginTop: 6,
        }}
      >
        Untuk Fakta Biologi Menakjubkan Lainnya
      </span>
    </div>
  );
};
