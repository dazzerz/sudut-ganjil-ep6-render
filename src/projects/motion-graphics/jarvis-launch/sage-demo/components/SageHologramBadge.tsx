import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SageHologramBadgeProps {
  label: string;
  value: string;
  icon?: string;
  subtitle?: string;
  position?: { top?: number | string; bottom?: number | string; left?: number | string; right?: number | string };
  enterFrame?: number;
  accentColor?: string;
}

export const SageHologramBadge: React.FC<SageHologramBadgeProps> = ({
  label,
  value,
  icon = "✦",
  subtitle,
  position = { bottom: 60, right: 60 },
  enterFrame = 0,
  accentColor = "#10B981", // Sage Green
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
          padding: "14px 22px",
          background: "linear-gradient(135deg, rgba(6, 28, 20, 0.92) 0%, rgba(3, 14, 10, 0.88) 100%)",
          border: `1px solid ${accentColor}66`,
          borderRadius: 16,
          boxShadow: `0 12px 36px rgba(0, 0, 0, 0.65), 0 0 28px ${accentColor}25, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          backdropFilter: "blur(16px)",
          minWidth: 260,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `radial-gradient(circle, ${accentColor}33 0%, ${accentColor}11 100%)`,
            border: `1px solid ${accentColor}88`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            color: accentColor,
            boxShadow: `0 0 16px ${accentColor}44`,
          }}
        >
          {icon}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#94A3B8",
              textTransform: "uppercase",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: 0.5,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {value}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: accentColor,
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
