import React from "react";
import { interpolate, spring } from "remotion";

interface Ep2FloatingSubtitlesProps {
  speaker: "raka" | "nara";
  text: string;
  frameInSegment: number;
}

export const Ep2FloatingSubtitles: React.FC<Ep2FloatingSubtitlesProps> = ({
  speaker,
  text,
  frameInSegment,
}) => {
  // Smooth spring entrance for each new dialogue line
  const entrance = spring({
    frame: frameInSegment,
    fps: 30,
    config: {
      damping: 18,
      stiffness: 140,
    },
  });

  const translateY = interpolate(entrance, [0, 1], [18, 0]);
  const opacity = interpolate(frameInSegment, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  const isRaka = speaker === "raka";
  const speakerName = isRaka ? "RAKA" : "NARA";
  const speakerColor = isRaka ? "#FFD166" : "#4ECCD3";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 100,
        right: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: "center",
      }}
    >
      {/* Speaker Badge Floating Directly on Canvas */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
          padding: "4px 14px",
          borderRadius: 16,
          backgroundColor: "rgba(10, 10, 14, 0.75)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${speakerColor}55`,
          boxShadow: `0 0 12px ${speakerColor}33`,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: speakerColor,
            boxShadow: `0 0 8px ${speakerColor}`,
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 2,
            color: speakerColor,
          }}
        >
          {speakerName}
        </span>
      </div>

      {/* Floating Subtitle Line - Massive & Ultra-Readable */}
      <p
        style={{
          margin: 0,
          fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: 42,
          fontWeight: 800,
          lineHeight: 1.35,
          color: "#FFFFFF",
          textShadow:
            "0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 2px rgba(0, 0, 0, 1)",
          maxWidth: 1600,
          letterSpacing: "-0.5px",
        }}
      >
        {text}
      </p>
    </div>
  );
};
