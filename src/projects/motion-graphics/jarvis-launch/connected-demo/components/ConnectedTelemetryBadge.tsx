import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ConnectedTelemetryBadgeProps {
  label: string;
  sublabel?: string;
  startFrame: number;
  durationInFrames: number;
  accentColor?: string;
  position?: "top-right" | "top-left" | "center" | "top-center";
}

export const ConnectedTelemetryBadge: React.FC<ConnectedTelemetryBadgeProps> = ({
  label,
  sublabel,
  startFrame,
  durationInFrames,
  accentColor = "#38BDF8",
  position = "top-right",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationInFrames) {
    return null;
  }

  const relFrame = frame - startFrame;
  const remaining = durationInFrames - relFrame;

  const springEntrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const exitFade = interpolate(remaining, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(springEntrance, [0, 1], [0, 1]) * exitFade;
  const translateY = interpolate(springEntrance, [0, 1], [-12, 0]);

  const posStyle: React.CSSProperties =
    position === "center"
      ? {
          top: "45%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${translateY}px)`,
        }
      : position === "top-center"
      ? {
          top: 65,
          left: "50%",
          transform: `translateX(-50%) translateY(${translateY}px)`,
        }
      : position === "top-left"
      ? {
          top: 65,
          left: 360,
          transform: `translateY(${translateY}px)`,
        }
      : {
          top: 65,
          right: 80,
          transform: `translateY(${translateY}px)`,
        };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 85,
        pointerEvents: "none",
        opacity,
        ...posStyle,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 22px",
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 22, 0.92) 100%)",
          border: `1.5px solid ${accentColor}`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.75), 0 0 24px ${accentColor}40`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: accentColor,
            boxShadow: `0 0 12px ${accentColor}`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: 1.2,
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
          {sublabel && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: accentColor,
                letterSpacing: 0.6,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
