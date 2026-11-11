import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ShortsHUDProps {
  title: string;
  subtitle: string;
  hookHeadline?: string;
  isCTA?: boolean;
}

export const ShortsHUD: React.FC<ShortsHUDProps> = ({
  title,
  subtitle,
  hookHeadline,
  isCTA = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const hookPop = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  return (
    <>
      {/* Top Header Branding (Cardless, Safe Area top: 140px) */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 65,
          right: 65,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 60,
          opacity: fadeIn,
          pointerEvents: "none",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FF3B30",
              boxShadow: "0 0 14px #FF3B30",
            }}
          />
          <div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                textShadow: "0 3px 12px rgba(0,0,0,0.95)",
              }}
            >
              SUDUT GANJIL
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                textShadow: "0 2px 8px rgba(0,0,0,0.95)",
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>

        <div
          style={{
            color: "#FFE600",
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            textShadow: "0 3px 12px rgba(0,0,0,0.95)",
          }}
        >
          {title}
        </div>
      </div>

      {/* Cardless Viral Floating Headline Hook (Anti-Box Standard) */}
      {hookHeadline && !isCTA && (
        <div
          style={{
            position: "absolute",
            top: 215,
            left: 60,
            right: 60,
            display: "flex",
            justifyContent: "center",
            zIndex: 62,
            opacity: fadeIn,
            pointerEvents: "none",
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            transform: `scale(${0.9 + hookPop * 0.1})`,
          }}
        >
          <span
            style={{
              color: "#FFE600",
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: 0.5,
              lineHeight: 1.25,
              textAlign: "center",
              textTransform: "uppercase",
              WebkitTextStroke: "7px #000000",
              paintOrder: "stroke fill",
              textShadow: "0 6px 18px rgba(0,0,0,0.95)",
            }}
          >
            {hookHeadline}
          </span>
        </div>
      )}
    </>
  );
};
