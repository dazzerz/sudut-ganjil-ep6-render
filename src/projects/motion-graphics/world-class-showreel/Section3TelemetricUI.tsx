import React from "react";
import { Img, interpolate, staticFile, Easing } from "remotion";
import { PALETTE, USER_ASSETS } from "./types";

interface SectionProps {
  frame: number; // 528 to 792
}

export const Section3TelemetricUI: React.FC<SectionProps> = ({ frame }) => {
  const localFrame = frame - 528; // 0 to 264

  // 100 BPM beat pulse (18 frames per beat)
  const beatIndex = Math.floor(localFrame / 18);
  const beatProgress = (localFrame % 18) / 18;
  const beatPulse = interpolate(beatProgress, [0, 0.15, 1], [1.03, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Audio spectrum visualizer bars (16 bars computed from mathematical harmonics)
  const numBars = 20;
  const bars = Array.from({ length: numBars }).map((_, i) => {
    const freq = Math.sin((localFrame * 0.3) + i * 0.7) * 0.5 + 0.5;
    const beatImpact = Math.exp(-beatProgress * 4) * Math.sin(i * 1.2) * 0.4;
    const height = Math.min(100, Math.max(12, (freq + beatImpact) * 80));
    return height;
  });

  // Crosshair tracking animated position
  const crossX = interpolate(localFrame, [0, 130, 264], [340, 580, 460], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const crossY = interpolate(localFrame, [0, 130, 264], [520, 680, 560], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: PALETTE.white,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. Precision 4-Quadrant Viewport Grid */}
      <div
        style={{
          width: 960,
          height: 1480,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 16,
          position: "relative",
          transform: `scale(${beatPulse})`,
          transformOrigin: "center center",
        }}
      >
        {/* Quadrant 0: Main Yellow Mirror Focus */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 8,
            border: `1.5px solid ${PALETTE.black}`,
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img1)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", top: 12, left: 12, fontFamily: "'Inter', monospace", fontSize: 11, fontWeight: 700, color: PALETTE.white, backgroundColor: PALETTE.black, padding: "2px 6px" }}>
            CAM_01 // WIDE_FOV
          </div>
        </div>

        {/* Quadrant 1: Face Lock Tracking Viewport */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 8,
            border: `1.5px solid ${PALETTE.terracotta}`,
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img4)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 72%", transform: "scale(1.4)" }}
          />
          <div style={{ position: "absolute", top: 12, right: 12, fontFamily: "'Inter', monospace", fontSize: 11, fontWeight: 700, color: PALETTE.white, backgroundColor: PALETTE.terracotta, padding: "2px 6px" }}>
            REC [LOCK] 98.4%
          </div>
          {/* Target Tracking Reticle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 120,
              height: 120,
              border: `1px solid ${PALETTE.terracotta}`,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          >
            <div style={{ position: "absolute", top: "50%", left: -10, width: 20, height: 1, backgroundColor: PALETTE.terracotta }} />
            <div style={{ position: "absolute", top: "50%", right: -10, width: 20, height: 1, backgroundColor: PALETTE.terracotta }} />
            <div style={{ position: "absolute", top: -10, left: "50%", width: 1, height: 20, backgroundColor: PALETTE.terracotta }} />
            <div style={{ position: "absolute", bottom: -10, left: "50%", width: 1, height: 20, backgroundColor: PALETTE.terracotta }} />
          </div>
        </div>

        {/* Quadrant 2: Motion Blur Telemetry */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 8,
            border: `1.5px solid ${PALETTE.black}`,
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img3)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "'Inter', monospace", fontSize: 11, fontWeight: 700, color: PALETTE.white, backgroundColor: PALETTE.cobalt, padding: "2px 6px" }}>
            VELOCITY_VECTOR: +4.2m/s
          </div>
        </div>

        {/* Quadrant 3: Lens Flare Spectrum */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 8,
            border: `1.5px solid ${PALETTE.black}`,
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img5)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", transform: "scale(1.2)" }}
          />
          <div style={{ position: "absolute", bottom: 12, right: 12, fontFamily: "'Inter', monospace", fontSize: 11, fontWeight: 700, color: PALETTE.white, backgroundColor: PALETTE.matcha, padding: "2px 6px" }}>
            LUM: 94.2 cd/m²
          </div>
        </div>

        {/* Precision Crosshairs Overlay Tracking over entire grid */}
        <div
          style={{
            position: "absolute",
            left: crossX,
            top: crossY,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 40,
          }}
        >
          <div style={{ width: 40, height: 40, border: `2px solid ${PALETTE.black}`, borderRadius: 2 }} />
          <div style={{ position: "absolute", top: 48, left: 0, fontFamily: "'Inter', monospace", fontSize: 11, fontWeight: 800, color: PALETTE.black, whiteSpace: "nowrap" }}>
            POS_X: {crossX.toFixed(2)} | POS_Y: {crossY.toFixed(2)}
          </div>
        </div>
      </div>

      {/* 2. Technical Audio Spectrum Meter at Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          right: 60,
          height: 50,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 6,
          padding: "0 10px",
          borderBottom: `2px solid ${PALETTE.black}`,
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              backgroundColor: i % 4 === 0 ? PALETTE.terracotta : i % 3 === 0 ? PALETTE.matcha : PALETTE.black,
              borderRadius: "2px 2px 0 0",
            }}
          />
        ))}
      </div>

      {/* Monospaced Technical Telemetry Header */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          fontFamily: "'Inter', monospace",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: PALETTE.black,
        }}
      >
        [03_DATA_UI_MATRIX] CHORUS_BEAT: {beatIndex} // AUDIO_VU_PEAK
      </div>
    </div>
  );
};
