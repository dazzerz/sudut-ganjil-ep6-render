import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface KineticPunchlineProps {
  prefix?: string;
  headline: string;
  tagline: string;
  startFrame: number;
  durationInFrames: number;
  accentColor?: string;
}

export const KineticPunchline: React.FC<KineticPunchlineProps> = ({
  prefix = "EXECUTIVE TAKEAWAY",
  headline,
  tagline,
  startFrame,
  durationInFrames,
  accentColor = "#10B981", // Sage Green
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationInFrames) {
    return null;
  }

  const relFrame = frame - startFrame;
  const remaining = durationInFrames - relFrame;

  const springEntrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.8 },
  });

  const exitFade = interpolate(remaining, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(springEntrance, [0, 1], [0, 1]) * exitFade;
  const scale = interpolate(springEntrance, [0, 1], [0.92, 1.0]);
  const translateY = interpolate(springEntrance, [0, 1], [30, 0]);

  // Subtle breathing pulse
  const pulse = Math.sin((relFrame / 24) * Math.PI * 2) * 0.015 + 1;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 90,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 90,
        pointerEvents: "none",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale * pulse})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 48px",
          background: "linear-gradient(135deg, rgba(6, 28, 20, 0.96) 0%, rgba(2, 14, 10, 0.94) 100%)",
          border: `2px solid ${accentColor}`,
          borderRadius: 24,
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.85), 0 0 50px ${accentColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
          backdropFilter: "blur(20px)",
          maxWidth: 1300,
          textAlign: "center",
        }}
      >
        {prefix && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 3,
              color: accentColor,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
            {prefix}
          </div>
        )}

        <div
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: -0.5,
            lineHeight: 1.15,
            textShadow: "0 4px 16px rgba(0, 0, 0, 0.9)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {headline}
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: accentColor,
            letterSpacing: 0.5,
            marginTop: 6,
            textShadow: `0 0 20px ${accentColor}60`,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {tagline}
        </div>
      </div>
    </div>
  );
};
