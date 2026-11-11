import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ScientificCitationBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame,
    fps,
    config: { stiffness: 200, damping: 15 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 680,
        left: "50%",
        transform: `translateX(-50%) scale(${badgeSpring})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        zIndex: 60,
        pointerEvents: "none",
        width: 860,
      }}
    >
      {/* Top Hairline Accent */}
      <div
        style={{
          width: 260,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #22C55E, transparent)",
          marginBottom: 16,
          boxShadow: "0 0 10px #22C55E",
        }}
      />

      {/* Verified Shield Icon & Headline */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 32,
            filter: "drop-shadow(0 0 10px #22C55E)",
          }}
        >
          ✓
        </span>
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
          REFERENSI ILMIAH TERVERIFIKASI
        </span>
      </div>

      {/* Primary Scientific Source Sitting Directly on Canvas */}
      <span
        style={{
          fontSize: 44,
          fontWeight: 900,
          color: "#FFFFFF",
          fontFamily: "'Montserrat', system-ui, sans-serif",
          textShadow:
            "0 4px 20px #000000, 0 2px 8px #000000, 0 0 20px rgba(0,0,0,0.95)",
          letterSpacing: 1,
          lineHeight: 1.2,
        }}
      >
        BRITISH MEDICAL JOURNAL (BMJ)
      </span>

      <span
        style={{
          fontSize: 30,
          fontWeight: 800,
          color: "#CBD5E1",
          fontFamily: "system-ui, sans-serif",
          textShadow:
            "0 4px 16px #000000, 0 2px 6px #000000, 0 0 14px rgba(0,0,0,0.9)",
          marginTop: 6,
        }}
      >
        & AMERICAN LUNG ASSOCIATION
      </span>

      {/* Divider Hairline */}
      <div
        style={{
          width: 400,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
          marginTop: 22,
          marginBottom: 22,
        }}
      />

      {/* Channel Call To Action */}
      <span
        style={{
          fontSize: 38,
          fontWeight: 900,
          letterSpacing: 2,
          color: "#FACC15",
          fontFamily: "'Montserrat', system-ui, sans-serif",
          textShadow:
            "0 0 26px rgba(250, 204, 21, 0.95), 0 4px 16px #000000, 0 2px 6px #000000",
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
          textShadow: "0 2px 8px #000000, 0 0 10px rgba(0,0,0,0.8)",
          marginTop: 6,
        }}
      >
        Untuk Fakta Sains Menakjubkan Lainnya
      </span>
    </div>
  );
};
