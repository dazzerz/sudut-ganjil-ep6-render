import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface AriaHologramBadgeProps {
  label: string;
  value: string;
  icon?: string;
  subtitle?: string;
  position?: { top?: number | string; bottom?: number | string; left?: number | string; right?: number | string };
  enterFrame?: number;
  accentColor?: string;
}

export const AriaHologramBadge: React.FC<AriaHologramBadgeProps> = ({
  label,
  value,
  icon = "✦",
  subtitle,
  position = { bottom: 60, right: 60 },
  enterFrame = 0,
  accentColor = "#00D2FF",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - enterFrame);

  const enterSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const opacity = interpolate(relFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [30, 0]);

  // Subtle breathing pulse
  const pulse = Math.sin((frame / 30) * Math.PI * 2) * 0.02 + 1;

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        ...position,
        zIndex: 50,
        opacity,
        transform: `translateY(${translateY}px) scale(${pulse})`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 26px",
          background: "rgba(10, 18, 30, 0.85)",
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${accentColor}66`,
          borderRadius: 18,
          boxShadow: `0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px ${accentColor}33`,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
            border: `1px solid ${accentColor}88`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            color: accentColor,
            fontWeight: 800,
          }}
        >
          {icon}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: accentColor,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: -0.3,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {value}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.7)",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
