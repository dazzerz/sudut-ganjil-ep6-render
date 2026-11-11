import React from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DynamicSubtitle } from "./components/DynamicSubtitle";

export const Scene4ClosingReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtitles for Scene 4 (total: 330 frames / 11.0s)
  const subtitles = [
    {
      text: "Tanpa follow-up berulang, tanpa waktu terbuang.",
      startFrame: 0,
      endFrame: 85,
    },
  ];

  // Monolith entrance spring
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120, mass: 0.9 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.82, 1.0]);
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Light streak sweep across logo
  const lightStreakX = interpolate(frame, [40, 110], [-200, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Breathing pulse on glow
  const pulse = Math.sin((frame / 25) * Math.PI * 2) * 0.05 + 1;

  // Final fade out at the very end
  const fadeOut = interpolate(frame, [300, 330], [1, 0], {
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
      {/* SFX: Modern whoosh transition at entrance */}
      {frame === 0 && (
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.6} />
      )}
      {/* SFX: Sub bass impact on brand reveal */}
      {frame === 90 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_sub_drop.wav")} volume={0.8} />
      )}
      {/* SFX: Elegant Chime */}
      {frame === 130 && (
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.5} />
      )}

      {/* Volumetric Radial Glow Background (Sage Green) */}
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.08) 45%, transparent 70%)",
          transform: `scale(${pulse})`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Cyber Particle Grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(16, 185, 129, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />

      {/* Center Monolith Card */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          zIndex: 10,
        }}
      >
        {/* Sage Green Monolith Emblem */}
        <div
          style={{
            position: "relative",
            width: 150,
            height: 150,
            borderRadius: 36,
            background: "linear-gradient(135deg, #10B981 0%, #059669 60%, #047857 100%)",
            border: "2px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(16, 185, 129, 0.55), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Animated Light Streak */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 50,
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
              transform: `translateX(${lightStreakX}px) skewX(-25deg)`,
              pointerEvents: "none",
            }}
          />

          {/* Letter S */}
          <span
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: -1,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            }}
          >
            S
          </span>
        </div>

        {/* Brand Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: 10,
            color: "#FFFFFF",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "0 4px 24px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.4)",
          }}
        >
          JARVIS SAGE
        </div>

        {/* Pill Badge */}
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 30,
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.45)",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 3,
            color: "#34D399",
            textTransform: "uppercase",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          ACT 2 • OPERATIONS & BACK OFFICE COMPANION
        </div>

        {/* Taglines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#E2E8F0",
              letterSpacing: 1,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Your back office companion.
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#10B981",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 0 25px rgba(16, 185, 129, 0.5)",
            }}
          >
            Less Chasing. More Doing.
          </div>
        </div>

        {/* Corporate Signature */}
        <div
          style={{
            marginTop: 20,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            color: "#64748B",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          idsMED GROUP KEYNOTE 2026
        </div>
      </div>

      {/* Subtitles */}
      <DynamicSubtitle cues={subtitles} />
    </div>
  );
};
