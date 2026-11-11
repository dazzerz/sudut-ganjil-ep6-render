import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface HUDOverlayProps {
  currentPhase: "prompt" | "reasoning" | "table" | "artifact" | "outro";
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({ currentPhase }) => {
  const frame = useCurrentFrame();

  const phaseConfig = {
    prompt: {
      badge: "LIVE DEMO INTERACTION",
      title: "Jainal · Management Workspace",
      dotColor: "#7c3aed",
    },
    reasoning: {
      badge: "AUTONOMOUS REASONING",
      title: "4-Phase Deck Formulation Engine",
      dotColor: "#3b82f6",
    },
    table: {
      badge: "STRUCTURED ARCHITECTURE",
      title: "15-Slide Pitching Deck Outline",
      dotColor: "#10b981",
    },
    artifact: {
      badge: "DELIVERABLE READY",
      title: "Production PPTX Export (4.9 MB)",
      dotColor: "#a855f7",
    },
    outro: {
      badge: "ENTERPRISE INTELLIGENCE",
      title: "idsMED Management Ecosystem",
      dotColor: "#6366f1",
    },
  }[currentPhase];

  // Subtle fade in
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {/* Sleek Enterprise Glass Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          borderRadius: 999,
          padding: "8px 22px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Pulsing Dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: phaseConfig.dotColor,
            boxShadow: `0 0 10px ${phaseConfig.dotColor}`,
          }}
        />

        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.12em",
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          {phaseConfig.badge}
        </div>

        <div
          style={{
            width: 1,
            height: 12,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        />

        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#f8fafc",
            letterSpacing: "0.02em",
          }}
        >
          {phaseConfig.title}
        </div>
      </div>
    </div>
  );
};
