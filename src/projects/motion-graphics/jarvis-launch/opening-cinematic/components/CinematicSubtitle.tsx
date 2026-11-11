import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface CinematicSubtitleProps {
  text: string;
  startFrame: number;
  durationFrames?: number;
  highlightWords?: string[];
  highlightColor?: string;
  fontSize?: number;
  bottomPosition?: number;
}

export const CinematicSubtitle: React.FC<CinematicSubtitleProps> = ({
  text,
  startFrame,
  durationFrames = 150,
  highlightWords = [],
  highlightColor = "#38bdf8", // bright cyan
  fontSize = 44,
  bottomPosition = 120,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > startFrame + durationFrames + 20) {
    return null;
  }

  const relFrame = frame - startFrame;

  // Fade and slight slide-up entrance
  const opacity = interpolate(
    relFrame,
    [0, 15, durationFrames, durationFrames + 15],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const translateY = interpolate(
    relFrame,
    [0, 15, durationFrames, durationFrames + 15],
    [20, 0, 0, -10],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Word-by-word subtle reveal or full sentence with highlight
  const words = text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: bottomPosition,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 100px",
        pointerEvents: "none",
        zIndex: 50,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
          fontSize,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.35,
          color: "#FFFFFF",
          textAlign: "center",
          maxWidth: 1500,
          textShadow:
            "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 40px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)",
        }}
      >
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[—.,!?"']/g, "").toLowerCase();
          const isHighlighted = highlightWords.some(
            (hw) => hw.replace(/[—.,!?"']/g, "").toLowerCase() === cleanWord
          );

          return (
            <span
              key={idx}
              style={{
                display: "inline-block",
                margin: "0 6px",
                color: isHighlighted ? highlightColor : "#FFFFFF",
                textShadow: isHighlighted
                  ? `0 0 25px ${highlightColor}88, 0 4px 20px rgba(0, 0, 0, 0.95)`
                  : "0 4px 20px rgba(0, 0, 0, 0.95)",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
