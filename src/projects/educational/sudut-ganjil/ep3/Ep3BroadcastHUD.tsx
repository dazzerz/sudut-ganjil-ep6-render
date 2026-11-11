import React from "react";
import { interpolate } from "remotion";

interface Ep3BroadcastHUDProps {
  currentSceneNumber: number;
  currentSceneTitle: string;
  frame: number;
  totalFrames: number;
}

export const Ep3BroadcastHUD: React.FC<Ep3BroadcastHUDProps> = ({
  currentSceneNumber,
  currentSceneTitle,
  frame,
  totalFrames,
}) => {
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const progress = Math.min(100, Math.max(0, (frame / totalFrames) * 100));

  return (
    <>
      {/* Top Thin Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          zIndex: 60,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #FF5E57, #FFD166)",
            boxShadow: "0 0 8px rgba(255, 94, 87, 0.7)",
          }}
        />
      </div>

      {/* Bottom Cinematic Gradient for Perfect Subtitle Readability */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 360,
          background:
            "linear-gradient(to top, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0.65) 50%, rgba(10, 10, 12, 0) 100%)",
          pointerEvents: "none",
          zIndex: 40,
        }}
      />

      {/* Top Header Branding HUD */}
      <div
        style={{
          position: "absolute",
          top: 44,
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
        {/* Left: Channel Brand & Episode Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              backgroundColor: "#FF5E57",
              boxShadow: "0 0 12px #FF5E57",
            }}
          />
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 2.5,
                color: "#FFFFFF",
                lineHeight: 1.1,
              }}
            >
              SUDUT GANJIL
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.5,
                color: "rgba(255, 255, 255, 0.6)",
                marginTop: 2,
              }}
            >
              EP. 03 • SKANDAL MANIPULASI NILAI & PERLAWANAN SMA
            </div>
          </div>
        </div>

        {/* Right: Chapter Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 18px",
            borderRadius: 24,
            backgroundColor: "rgba(20, 20, 26, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 1.2,
              color: "#FFD166",
            }}
          >
            BAB {currentSceneNumber.toString().padStart(2, "0")}
          </div>
          <div
            style={{
              width: 1,
              height: 12,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 0.5,
              color: "#FFFFFF",
            }}
          >
            {currentSceneTitle}
          </div>
        </div>
      </div>
    </>
  );
};
