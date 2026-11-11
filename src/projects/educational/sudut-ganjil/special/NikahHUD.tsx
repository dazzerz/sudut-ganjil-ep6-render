import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { DialogueSegment, NIKAH_SEGMENTS } from "./nikah_scenes";

const TEXT_SHADOW = "0 3px 12px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,1)";

export const NikahHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const seg =
    NIKAH_SEGMENTS.find(
      (s: DialogueSegment) =>
        frame >= s.startFrame && frame < s.startFrame + s.durationInFrames + 8
    ) ?? NIKAH_SEGMENTS[frame < 1 ? 0 : NIKAH_SEGMENTS.length - 1];

  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const progress = Math.min(100, Math.max(0, (frame / durationInFrames) * 100));

  return (
    <>
      {/* Hairline Progress Bar di Atas Layar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: "rgba(255,255,255,0.15)",
          zIndex: 60,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00F2FE, #FFE600)",
            boxShadow: "0 0 10px rgba(0,242,254,0.8)",
          }}
        />
      </div>

      {/* Subtle Gradient Penjaga Kontras Subtitle di Bawah */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 320,
          background:
            "linear-gradient(to top, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.45) 50%, rgba(5,5,8,0) 100%)",
          pointerEvents: "none",
          zIndex: 30,
        }}
      />

      {/* Header HUD di Kiri Atas Melayang Bebas */}
      <div
        style={{
          position: "absolute",
          top: 42,
          left: 65,
          opacity: fadeIn,
          zIndex: 45,
          fontFamily: "'Inter', 'Montserrat', system-ui, sans-serif",
          textShadow: TEXT_SHADOW,
          transform: `translateX(${interpolate(fadeIn, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 3,
              color: "#FFE600",
              WebkitTextStroke: "2px #000",
              paintOrder: "stroke fill",
              textTransform: "uppercase",
            }}
          >
            SUDUT GANJIL · SPECIAL INTERLUDE
          </span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>|</span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#00F2FE",
              WebkitTextStroke: "2px #000",
              paintOrder: "stroke fill",
              textTransform: "uppercase",
            }}
          >
            REALITA EKONOMI
          </span>
        </div>

        {/* Judul Babak Aktif */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: 1,
            WebkitTextStroke: "4px #000",
            paintOrder: "stroke fill",
          }}
        >
          {seg?.scene_title || "Gaji 5 Juta Nekat Nikah di Gedung"}
        </div>
      </div>
    </>
  );
};
