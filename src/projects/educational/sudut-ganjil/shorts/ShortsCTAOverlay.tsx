import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

interface ShortsCTAOverlayProps {
  isVisible: boolean;
  frameInCTA: number;
  topicTitle: string;
}

export const ShortsCTAOverlay: React.FC<ShortsCTAOverlayProps> = ({
  isVisible,
  frameInCTA,
  topicTitle,
}) => {
  const { fps } = useVideoConfig();

  if (!isVisible) return null;

  const popSpring = spring({
    frame: frameInCTA,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  const fadeIn = interpolate(frameInCTA, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 58,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 240,
        pointerEvents: "none",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Cardless Floating Final Callout (Zero Boxes, Zero Emojis) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          opacity: fadeIn,
          transform: `scale(${0.92 + popSpring * 0.08})`,
          padding: "0 65px",
        }}
      >
        <span
          style={{
            color: "#FFE600",
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            WebkitTextStroke: "6px #000000",
            paintOrder: "stroke fill",
            textShadow: "0 4px 16px rgba(0,0,0,0.95)",
            marginBottom: 8,
          }}
        >
          TONTON FULLNYA DI VIDEO TERKAIT
        </span>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            WebkitTextStroke: "4px #000000",
            paintOrder: "stroke fill",
            textShadow: "0 3px 12px rgba(0,0,0,0.95)",
          }}
        >
          {topicTitle}
        </span>
      </div>
    </div>
  );
};
