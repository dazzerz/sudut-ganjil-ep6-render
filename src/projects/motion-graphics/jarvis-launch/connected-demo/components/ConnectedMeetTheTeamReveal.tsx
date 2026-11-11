import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ConnectedMeetTheTeamRevealProps {
  startFrame: number;
  durationInFrames: number;
}

export const ConnectedMeetTheTeamReveal: React.FC<ConnectedMeetTheTeamRevealProps> = ({
  startFrame,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) return null;

  const relFrame = frame - startFrame;
  const progress = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.9 },
  });

  const fadeIn = interpolate(relFrame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Staggered springs for the 3 companions
  const ariaSpring = spring({
    frame: Math.max(0, relFrame - 5),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const sageSpring = spring({
    frame: Math.max(0, relFrame - 12),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const vegaSpring = spring({
    frame: Math.max(0, relFrame - 19),
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const taglineSpring = spring({
    frame: Math.max(0, relFrame - 30),
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        zIndex: 95,
        opacity: fadeIn,
        background: "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.98) 0%, rgba(3, 7, 18, 0.99) 75%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Dynamic Background Multi-Color Glows */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 600,
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.12) 35%, rgba(139, 92, 246, 0.15) 70%, transparent 85%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Top Pill Badge */}
      <div
        style={{
          opacity: interpolate(progress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(progress, [0, 1], [-20, 0])}px)`,
          padding: "8px 24px",
          borderRadius: 30,
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)",
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 4,
          color: "#E2E8F0",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        ✦ MEET THE TEAM ✦
      </div>

      {/* Main Title */}
      <h1
        style={{
          opacity: interpolate(progress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(progress, [0, 1], [-15, 0])}px)`,
          fontSize: 68,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: -1,
          margin: "0 0 40px 0",
          lineHeight: 1.1,
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.9)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        JARVIS idsMED
      </h1>

      {/* The 3 Connected Assistants */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          zIndex: 2,
          marginBottom: 35,
        }}
      >
        {/* ARIA (Sales) */}
        <div
          style={{
            transform: `scale(${interpolate(ariaSpring, [0, 1], [0.85, 1])}) translateY(${interpolate(ariaSpring, [0, 1], [25, 0])}px)`,
            opacity: interpolate(ariaSpring, [0, 1], [0, 1]),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 32px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(8, 47, 73, 0.8) 0%, rgba(3, 20, 36, 0.9) 100%)",
            border: "1.5px solid #06B6D4",
            boxShadow: "0 12px 35px rgba(0,0,0,0.8), 0 0 35px rgba(6, 182, 212, 0.4)",
            width: 240,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)",
              boxShadow: "0 0 25px rgba(6, 182, 212, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: 14,
            }}
          >
            A
          </div>
          <span style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", letterSpacing: 0.5 }}>
            ARIA
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#38BDF8", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>
            Sales Assistant
          </span>
        </div>

        {/* Connection Indicator 1 */}
        <div
          style={{
            width: 30,
            height: 2,
            background: "linear-gradient(90deg, #06B6D4, #10B981)",
            boxShadow: "0 0 10px #10B981",
          }}
        />

        {/* SAGE (Back Office) */}
        <div
          style={{
            transform: `scale(${interpolate(sageSpring, [0, 1], [0.85, 1])}) translateY(${interpolate(sageSpring, [0, 1], [25, 0])}px)`,
            opacity: interpolate(sageSpring, [0, 1], [0, 1]),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 32px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(6, 44, 30, 0.8) 0%, rgba(2, 24, 16, 0.9) 100%)",
            border: "1.5px solid #10B981",
            boxShadow: "0 12px 35px rgba(0,0,0,0.8), 0 0 35px rgba(16, 185, 129, 0.4)",
            width: 240,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: 14,
            }}
          >
            S
          </div>
          <span style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", letterSpacing: 0.5 }}>
            SAGE
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#34D399", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>
            Back Office
          </span>
        </div>

        {/* Connection Indicator 2 */}
        <div
          style={{
            width: 30,
            height: 2,
            background: "linear-gradient(90deg, #10B981, #8B5CF6)",
            boxShadow: "0 0 10px #8B5CF6",
          }}
        />

        {/* VEGA (Management) */}
        <div
          style={{
            transform: `scale(${interpolate(vegaSpring, [0, 1], [0.85, 1])}) translateY(${interpolate(vegaSpring, [0, 1], [25, 0])}px)`,
            opacity: interpolate(vegaSpring, [0, 1], [0, 1]),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 32px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(38, 16, 73, 0.8) 0%, rgba(18, 6, 38, 0.9) 100%)",
            border: "1.5px solid #8B5CF6",
            boxShadow: "0 12px 35px rgba(0,0,0,0.8), 0 0 35px rgba(139, 92, 246, 0.4)",
            width: 240,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
              boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: 14,
            }}
          >
            V
          </div>
          <span style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", letterSpacing: 0.5 }}>
            VEGA
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#C084FC", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>
            Management
          </span>
        </div>
      </div>

      {/* Tagline Banner */}
      <div
        style={{
          opacity: interpolate(taglineSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(taglineSpring, [0, 1], [15, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 1,
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "0 2px 14px rgba(0,0,0,0.9)",
          }}
        >
          One Team. Always Connected.
        </div>
      </div>

      {/* Bottom idsMED badge */}
      <div
        style={{
          position: "absolute",
          bottom: 95,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: 0.85,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#94A3B8",
            letterSpacing: 2,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          POWERED BY
        </span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 1.5,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          idsMED
        </span>
      </div>
    </div>
  );
};
