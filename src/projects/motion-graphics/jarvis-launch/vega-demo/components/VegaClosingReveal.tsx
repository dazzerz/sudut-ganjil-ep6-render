import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface VegaClosingRevealProps {
  startFrame: number;
  durationInFrames: number;
}

export const VegaClosingReveal: React.FC<VegaClosingRevealProps> = ({
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
    config: { damping: 16, stiffness: 120, mass: 0.9 },
  });

  const fadeIn = interpolate(relFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(progress, [0, 1], [0.85, 1.0]);
  const textTranslateY = interpolate(progress, [0, 1], [25, 0]);

  // Tagline staggered entrance at frame 40 into closing
  const taglineSpring = spring({
    frame: Math.max(0, relFrame - 35),
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
        background: "radial-gradient(ellipse at center, rgba(35, 18, 65, 0.96) 0%, rgba(8, 4, 16, 0.98) 75%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(18px)",
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Logo Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${logoScale}) translateY(${textTranslateY}px)`,
          zIndex: 2,
        }}
      >
        {/* Vega Emblem [V] */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 28,
            background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
            boxShadow: "0 0 50px rgba(139, 92, 246, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            border: "1.5px solid rgba(255, 255, 255, 0.25)",
          }}
        >
          <span
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: -1,
            }}
          >
            V
          </span>
        </div>

        {/* Brand Name */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 6,
            color: "#A78BFA",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          JARVIS · MANAGEMENT ASSISTANT
        </div>

        <h1
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: -1,
            margin: 0,
            lineHeight: 1.1,
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.9)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          JARVIS VEGA
        </h1>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(taglineSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [15, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#E2E8F0",
              letterSpacing: 1,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            "Your chief of staff. Always on."
          </div>

          <div
            style={{
              marginTop: 14,
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(167, 139, 250, 0.4)",
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.25)",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 3,
              color: "#C084FC",
              textTransform: "uppercase",
            }}
          >
            ✦ From Data to Decision ✦
          </div>
        </div>
      </div>

      {/* Bottom idsMED badge */}
      <div
        style={{
          position: "absolute",
          bottom: 45,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: 0.85,
        }}
      >
        <span
          style={{
            fontSize: 16,
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
