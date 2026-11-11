import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DynamicSubtitle } from "./components/DynamicSubtitle";

export const Scene4ClosingReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total duration: 300 frames (10.0s @ 30 FPS)
  const subtitles = [
    {
      text: "Satu percakapan. Semua yang tim sales butuhkan di lapangan.",
      startFrame: 15,
      endFrame: 140,
    },
    {
      text: "JARVIS ARIA. Your companion in the field.",
      startFrame: 145,
      endFrame: 285,
      isTagline: true,
    },
  ];

  // Monolith logo entrance spring
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.9 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.85, 1.0]);
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at the end
  const fadeOut = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#050811",
        overflow: "hidden",
        opacity: fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Audio VO Closing */}
      <Sequence from={15} durationInFrames={260}>
        <Audio src={staticFile("audio/jarvis-aria/scene4_closing.mp3")} volume={1.0} />
      </Sequence>

      {/* Volumetric Radial Glow Background */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 210, 255, 0.20) 0%, rgba(0, 100, 200, 0.05) 50%, transparent 75%)",
          transform: `scale(${1 + Math.sin(frame / 30) * 0.05})`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Horizon Laser Line */}
      <div
        style={{
          position: "absolute",
          top: "54%",
          left: "5%",
          right: "5%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.6) 50%, transparent 100%)",
          boxShadow: "0 0 15px rgba(0, 229, 255, 0.8)",
          pointerEvents: "none",
        }}
      />

      {/* Monolith Branding Centerpiece */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          zIndex: 20,
          gap: 24,
        }}
      >
        {/* Lambda / Aria Icon */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 28,
            background: "linear-gradient(135deg, rgba(0, 210, 255, 0.25), rgba(0, 80, 180, 0.15))",
            border: "2px solid rgba(0, 229, 255, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 229, 255, 0.4)",
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#00E5FF",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 0 20px rgba(0, 229, 255, 0.8)",
            }}
          >
            Λ
          </span>
        </div>

        {/* Brand Name */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 8,
              color: "#00E5FF",
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
              marginBottom: 8,
            }}
          >
            idsMED INTELLIGENCE
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: 4,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 8px 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 229, 255, 0.4)",
            }}
          >
            JARVIS ARIA
          </div>
        </div>

        {/* Pillars / Act Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "8px 24px",
            borderRadius: 30,
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#00FFB2",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            ACT 1
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>•</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: 1,
            }}
          >
            FIELD SALES COMPANION
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(255, 255, 255, 0.75)",
            letterSpacing: 1,
            fontFamily: "Georgia, serif",
            marginTop: 8,
          }}
        >
          &ldquo;Your companion in the field.&rdquo;
        </div>
      </div>

      {/* Dynamic Subtitles */}
      <DynamicSubtitle cues={subtitles} />
    </div>
  );
};
