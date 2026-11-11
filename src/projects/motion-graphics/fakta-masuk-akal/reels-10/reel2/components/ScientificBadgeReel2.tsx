import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ScientificBadgeReel2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Show in outro (frame 1450 to 1800)
  if (frame < 1450) return null;

  const entrance = spring({
    frame: frame - 1450,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  const pulse = Math.sin((frame / fps) * Math.PI * 3) * 0.05 + 0.95;

  return (
    <div
      style={{
        position: "absolute",
        top: "48%",
        left: 0,
        right: 0,
        transform: `translateY(-50%) scale(${entrance})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 45,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            color: "#38BDF8",
            fontSize: 20,
            textShadow: "0 0 12px rgba(56,189,248,0.8)",
          }}
        >
          ✓
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#38BDF8",
            textTransform: "uppercase",
            textShadow: "0 0 16px rgba(56,189,248,0.7), 0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          REFERENSI RISET KARDIOLOGI
        </span>
      </div>

      {/* Main Journal Title */}
      <div
        style={{
          fontSize: 34,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-0.5px",
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.25,
          textShadow: "0 4px 20px rgba(0,0,0,0.95), 0 0 25px rgba(255,255,255,0.4)",
        }}
      >
        JOURNAL OF THE AMERICAN HEART ASSOCIATION
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#94A3B8",
          marginTop: 6,
          letterSpacing: 2,
          textShadow: "0 2px 10px rgba(0,0,0,0.9)",
        }}
      >
        & HARVARD MEDICAL SCHOOL RESEARCH
      </div>

      {/* Channel Follow CTA */}
      <div
        style={{
          marginTop: 36,
          textAlign: "center",
          transform: `scale(${pulse})`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#FACC15",
            letterSpacing: 1,
            textShadow: "0 0 20px rgba(250,204,21,0.8), 0 3px 12px rgba(0,0,0,0.9)",
          }}
        >
          FOLLOW @FAKTAMASUKAKAL
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#F1F5F9",
            marginTop: 4,
            letterSpacing: 1.5,
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          UNTUK FAKTA SAINS TUBUH MENAKJUBKAN LAINNYA
        </div>
      </div>
    </div>
  );
};
