import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface Ep3RewindOverlayProps {
  rewindStartFrame: number;
  durationFrames?: number;
  label?: string;
  subLabel?: string;
}

export const Ep3RewindOverlay: React.FC<Ep3RewindOverlayProps> = ({
  rewindStartFrame,
  durationFrames = 45,
  label = "◀◀ REWIND • JANUARI 2017",
  subLabel = "MEMUTAR KEMBALI KE MASA SERAGAM PUTIH ABU-ABU",
}) => {
  const frame = useCurrentFrame();
  const rel = frame - rewindStartFrame;

  if (rel < 0 || rel > durationFrames) {
    return null;
  }

  // Opacity peaks in the middle of transition
  const opacity = interpolate(
    rel,
    [0, 15, durationFrames - 15, durationFrames],
    [0, 0.95, 0.95, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scanlineY = (rel * 35) % 1080;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(10, 10, 15, 0.85)",
        opacity,
        zIndex: 55,
        pointerEvents: "none",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* VHS Static Stripes */}
      <div
        style={{
          position: "absolute",
          top: scanlineY,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.25), transparent)",
          mixBlendMode: "screen",
        }}
      />

      {/* Retro Cassette Rewind Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 36px",
          borderRadius: 8,
          border: "2px solid #00F2FE",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          boxShadow: "0 0 30px rgba(0, 242, 254, 0.4)",
        }}
      >
        <span
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 32,
            fontWeight: 900,
            color: "#00F2FE",
            letterSpacing: 4,
          }}
        >
          {label}
        </span>
      </div>

      <div
        style={{
          marginTop: 14,
          fontFamily: "'Courier New', monospace",
          fontSize: 16,
          color: "rgba(255, 255, 255, 0.7)",
          letterSpacing: 2,
        }}
      >
        {subLabel}
      </div>
    </div>
  );
};
