import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EpisodeSegment } from "./scenes";

interface BroadcastHUDProps {
  currentSegment: EpisodeSegment;
  frame: number;
}

export const BroadcastHUD: React.FC<BroadcastHUDProps> = ({
  currentSegment,
  frame,
}) => {
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      {/* Bottom Cinematic Gradient for Subtitle Contrast */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 340,
          background:
            "linear-gradient(to top, rgba(10, 10, 12, 0.92) 0%, rgba(10, 10, 12, 0.6) 45%, rgba(10, 10, 12, 0) 100%)",
          pointerEvents: "none",
          zIndex: 40,
        }}
      />

      {/* Top Header Branding */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 64,
          right: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 45,
          opacity: fadeIn,
          pointerEvents: "none",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Left: Channel Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              backgroundColor: "#FF5E57",
              boxShadow: "0 0 14px #FF5E57",
            }}
          />
          <div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: "uppercase",
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}
            >
              SUDUT GANJIL
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.65)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              POV & Realita Hidup · Ep. 01
            </div>
          </div>
        </div>

        {/* Right: Scene Chapter Badge */}
        <div
          style={{
            padding: "8px 18px",
            borderRadius: 30,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              color: "#FFD166",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            BAGIAN {currentSegment.scene}
          </span>
          <span
            style={{
              color: "rgba(255, 255, 255, 0.35)",
              fontSize: 14,
            }}
          >
            |
          </span>
          <span
            style={{
              color: "#F1F2F6",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {currentSegment.scene_title}
          </span>
        </div>
      </div>
    </>
  );
};
