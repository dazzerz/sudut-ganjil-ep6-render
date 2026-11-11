import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MobilDialogueSegment, MOBIL_SEGMENTS } from "./kredit_mobil_scenes";

const TEXT_SHADOW = "0 3px 12px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,1)";

export const MobilHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const seg =
    MOBIL_SEGMENTS.find(
      (s: MobilDialogueSegment) =>
        frame >= s.startFrame && frame < s.startFrame + s.durationInFrames + 8
    ) ?? MOBIL_SEGMENTS[frame < 1 ? 0 : MOBIL_SEGMENTS.length - 1];

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
            background: "linear-gradient(90deg, #FFDE1A, #FF2A2A)",
            boxShadow: "0 0 10px rgba(255,222,26,0.8)",
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
            "linear-gradient(to top, rgba(5,7,12,0.92) 0%, rgba(5,7,12,0.52) 50%, rgba(5,7,12,0) 100%)",
          pointerEvents: "none",
          zIndex: 30,
        }}
      />

      {/* Header HUD Kiri Atas */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 72,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          zIndex: 50,
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              padding: "4px 14px",
              borderRadius: 4,
              backgroundColor: "#D92222",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            SUDUT GANJIL SPECIAL
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            EPISODE KREDIT MOBIL
          </span>
        </div>

        {/* Topik Scene Berjalan */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 0.5,
            fontFamily: "'Montserrat', sans-serif",
            textShadow: TEXT_SHADOW,
          }}
        >
          {seg ? seg.scene_title : "POV: Gaji 6 Juta Nekat Kredit Mobil"}
        </div>
      </div>

      {/* Indicator Scene di Kanan Atas */}
      <div
        style={{
          position: "absolute",
          top: 48,
          right: 72,
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 50,
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: seg?.scene === 0 ? "#FF2A2A" : "#00E65B",
            boxShadow: seg?.scene === 0 ? "0 0 10px #FF2A2A" : "0 0 8px #00E65B",
          }}
        />
        <span
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.5,
            fontFamily: "'Montserrat', sans-serif",
            textShadow: TEXT_SHADOW,
          }}
        >
          {seg?.scene === 0 ? "KONFLIK AWAL" : `SCENE ${String(seg?.scene ?? 1).padStart(2, "0")}/20`}
        </span>
      </div>

      {/* Massive Hook Headline di 3-13 Detik Pertama (Rule 1 & Rule 3 Audit AI) */}
      {seg?.scene === 0 && (
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            zIndex: 55,
            pointerEvents: "none",
            opacity: interpolate(frame, [0, 15, 395, 410], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `scale(${interpolate(frame, [0, 20], [0.92, 1], {
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })})`,
          }}
        >
          <div
            style={{
              padding: "6px 20px",
              backgroundColor: "#D92222",
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 3,
              fontFamily: "'Montserrat', sans-serif",
              borderRadius: 4,
              boxShadow: "0 4px 18px rgba(217,34,34,0.6)",
              textTransform: "uppercase",
              transform: "rotate(-2deg)",
            }}
          >
            REALITA TERSEMBUNYI
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 56,
              fontWeight: 900,
              color: "#FFDE1A",
              textAlign: "center",
              letterSpacing: -1,
              textTransform: "uppercase",
              textShadow: "0 4px 20px rgba(0,0,0,1), 0 0 35px rgba(255,222,26,0.5)",
              lineHeight: 1.15,
            }}
          >
            GAJI 6 JUTA CICIL MOBIL 4 JUTA?!
          </h1>

          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: 1,
              textAlign: "center",
              textShadow: "0 3px 12px rgba(0,0,0,1)",
              maxWidth: 1200,
            }}
          >
            MUDIK DIPUJI TETANGGA, BALIK DIKEJAR DEBT COLLECTOR!
          </div>
        </div>
      )}
    </>
  );
};
