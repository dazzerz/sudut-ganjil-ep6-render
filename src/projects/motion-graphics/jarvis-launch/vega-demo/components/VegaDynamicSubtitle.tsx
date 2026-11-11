import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
  isTagline?: boolean;
}

interface VegaDynamicSubtitleProps {
  cues: SubtitleCue[];
  accentColor?: string;
}

export const VegaDynamicSubtitle: React.FC<VegaDynamicSubtitleProps> = ({
  cues,
  accentColor = "#A78BFA",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentCue = cues.find((c) => frame >= c.startFrame && frame <= c.endFrame);

  if (!currentCue) return null;

  const relFrame = frame - currentCue.startFrame;
  const remainingFrame = currentCue.endFrame - frame;

  const enterSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  const exitOpacity = interpolate(remainingFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;
  const translateY = interpolate(enterSpring, [0, 1], [15, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 80,
        pointerEvents: "none",
        padding: "0 100px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
          maxWidth: 1400,
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: currentCue.isTagline
              ? "linear-gradient(135deg, rgba(26, 16, 45, 0.95) 0%, rgba(15, 8, 28, 0.92) 100%)"
              : "rgba(12, 10, 20, 0.90)",
            padding: currentCue.isTagline ? "14px 34px" : "12px 28px",
            borderRadius: 16,
            border: currentCue.isTagline
              ? `1.5px solid ${accentColor}AA`
              : "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: currentCue.isTagline
              ? `0 12px 40px rgba(0, 0, 0, 0.75), 0 0 35px ${accentColor}35`
              : "0 8px 30px rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(14px)",
            fontSize: currentCue.isTagline ? 34 : 27,
            fontWeight: currentCue.isTagline ? 900 : 600,
            letterSpacing: currentCue.isTagline ? 1.2 : 0.3,
            color: currentCue.isTagline ? accentColor : "#FFFFFF",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textTransform: currentCue.isTagline ? "uppercase" : "none",
            textShadow: "0 2px 10px rgba(0,0,0,0.85)",
          }}
        >
          {currentCue.text}
        </span>
      </div>
    </div>
  );
};
