import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
  isTagline?: boolean;
}

interface DynamicSubtitleProps {
  cues: SubtitleCue[];
}

export const DynamicSubtitle: React.FC<DynamicSubtitleProps> = ({ cues }) => {
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
        bottom: 80,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 60,
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
            fontSize: currentCue.isTagline ? 46 : 38,
            fontWeight: currentCue.isTagline ? 900 : 700,
            color: currentCue.isTagline ? "#00E5FF" : "#FFFFFF",
            fontFamily: "system-ui, -apple-system, 'SF Pro Display', sans-serif",
            letterSpacing: currentCue.isTagline ? "0.02em" : "-0.01em",
            lineHeight: 1.35,
            textShadow: currentCue.isTagline
              ? "0 4px 20px rgba(0, 229, 255, 0.6), 0 2px 10px rgba(0,0,0,0.95)"
              : "0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          {currentCue.text}
        </span>
      </div>
    </div>
  );
};
