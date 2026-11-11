import React from "react";
import { interpolate, staticFile } from "remotion";

interface Ep2FlashbackViewProps {
  bgImage: string;
  frameInSegment: number;
  durationFrames: number;
  sceneTitle: string;
  sceneNumber: number;
}

export const Ep2FlashbackView: React.FC<Ep2FlashbackViewProps> = ({
  bgImage,
  frameInSegment,
  durationFrames,
  sceneTitle,
  sceneNumber,
}) => {
  // Continuous cinematic camera drift (slow subtle push-in & drift)
  const scale = interpolate(
    frameInSegment,
    [0, Math.max(durationFrames, 30)],
    [1.0, 1.06],
    { extrapolateRight: "clamp" }
  );

  const translateY = interpolate(
    frameInSegment,
    [0, Math.max(durationFrames, 30)],
    [0, -12],
    { extrapolateRight: "clamp" }
  );

  // Soft atmospheric pulse
  const ambientGlow = interpolate(
    Math.sin((frameInSegment / 25) * Math.PI),
    [-1, 1],
    [0.96, 1.04]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0A0A0C",
      }}
    >
      {/* Background Plate with Ken Burns Drift */}
      <img
        src={staticFile(bgImage)}
        alt={sceneTitle}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          filter: `brightness(${ambientGlow}) contrast(1.04) saturate(1.08)`,
          transition: "filter 0.1s linear",
        }}
      />

      {/* Cinematic Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 55%, rgba(5, 5, 8, 0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Warm Golden Hour Ambient Overlay for Nostalgia */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255, 170, 70, 0.08) 0%, rgba(120, 60, 20, 0.12) 100%)",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* Retro Memory Timestamp Stamp */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 64,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "6px 16px",
          borderRadius: 20,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: "#FFD166",
          zIndex: 30,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#FF5E57",
            boxShadow: "0 0 8px #FF5E57",
            opacity: frameInSegment % 30 < 18 ? 1 : 0.3,
          }}
        />
        <span>FLASHBACK SMA • 9 TAHUN LALU</span>
      </div>
    </div>
  );
};
