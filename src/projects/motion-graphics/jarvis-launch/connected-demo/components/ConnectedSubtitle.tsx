import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ConnectedCue {
  text: string;
  startFrame: number;
  endFrame: number;
  isTagline?: boolean;
}

interface ConnectedSubtitleProps {
  cues: ConnectedCue[];
  accentColor?: string;
}

export const ConnectedSubtitle: React.FC<ConnectedSubtitleProps> = ({
  cues,
  accentColor = "#38BDF8",
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
        bottom: 25,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        pointerEvents: "none",
        padding: "0 80px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
          maxWidth: 1300,
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(10, 15, 26, 0.94)",
            padding: "9px 24px",
            borderRadius: 14,
            border: `1.5px solid ${accentColor}88`,
            boxShadow: `0 8px 30px rgba(0, 0, 0, 0.8), 0 0 25px ${accentColor}30`,
            backdropFilter: "blur(14px)",
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: 0.4,
            color: "#FFFFFF",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "0 2px 10px rgba(0,0,0,0.85)",
          }}
        >
          {currentCue.text}
        </span>
      </div>
    </div>
  );
};
