import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { ClaudeSpark } from "./ClaudeSpark";

interface ClaudeOutroProps {
  frame: number;
  startFrame: number;
}

export const ClaudeOutro: React.FC<ClaudeOutroProps> = ({ frame, startFrame }) => {
  const { fps } = useVideoConfig();

  if (frame < startFrame) {
    return null;
  }

  const frameInOutro = frame - startFrame;

  // Background white fade in
  const bgOpacity = interpolate(frameInOutro, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spark spring bloom
  const sparkSpring = spring({
    frame: frameInOutro,
    fps,
    config: { damping: 11, stiffness: 160, mass: 0.7 },
  });

  const sparkScale = interpolate(sparkSpring, [0, 1], [0.35, 1.0]);
  const sparkOpacity = interpolate(frameInOutro, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Wordmark "Claude" masked baseline reveal
  const textSpring = spring({
    frame: Math.max(0, frameInOutro - 10),
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  const textTranslateY = interpolate(textSpring, [0, 1], [80, 0]);
  const textOpacity = interpolate(frameInOutro, [10, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slogan reveal
  const sloganOpacity = interpolate(frameInOutro, [20, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        backgroundColor: "#FFFFFF",
        opacity: bgOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient light gradient behind logo */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217, 119, 87, 0.15) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* 1. Iconic Claude Terracotta Spark */}
      <div
        style={{
          transform: `scale(${sparkScale})`,
          opacity: sparkOpacity,
          marginBottom: 44,
          filter: "drop-shadow(0 16px 40px rgba(217, 119, 87, 0.28))",
        }}
      >
        <ClaudeSpark
          frame={frameInOutro}
          size={240}
          color="#D97757"
          glow
          pulseOnBeat={false}
        />
      </div>

      {/* 2. Masked Baseline Wordmark "Claude" */}
      <div
        style={{
          overflow: "hidden",
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Newsreader', 'Canela', 'Georgia', 'Times New Roman', serif",
            fontSize: 104,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "#09090B",
            margin: 0,
            transform: `translateY(${textTranslateY}px)`,
            opacity: textOpacity,
          }}
        >
          Claude
        </h1>
      </div>

      {/* 3. Editorial Minimal Slogan */}
      <div
        style={{
          marginTop: 18,
          opacity: sloganOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#71717A",
          }}
        >
          Anthropic
        </span>

        <span
          style={{
            fontFamily: "'Newsreader', 'Georgia', serif",
            fontStyle: "italic",
            fontSize: 32,
            color: "#D97757",
            marginTop: 4,
          }}
        >
          Intelligence with taste.
        </span>
      </div>
    </div>
  );
};
