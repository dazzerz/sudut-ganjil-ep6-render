import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { EP5_SEGMENTS } from "./ep5_scenes";

const TEXT_SHADOW = "0 3px 12px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,1)";

// Broadcast chrome without any cards: a hairline progress bar, a two-line title on the
// canvas, and a chapter label separated by a hairline.
export const Ep5HUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const seg =
    EP5_SEGMENTS.find((s) => frame >= s.start_frame && frame < s.start_frame + s.duration_frames + 8) ??
    EP5_SEGMENTS[frame < 1 ? 0 : EP5_SEGMENTS.length - 1];

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const progress = Math.min(100, Math.max(0, (frame / durationInFrames) * 100));

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: "rgba(255,255,255,0.12)",
          zIndex: 60,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #FF5E57, #FFD166)",
            boxShadow: "0 0 10px rgba(255,94,87,0.8)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 330,
          background:
            "linear-gradient(to top, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.5) 55%, rgba(8,8,12,0) 100%)",
          pointerEvents: "none",
          zIndex: 40,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 44,
          left: 70,
          opacity: fadeIn,
          zIndex: 45,
          fontFamily: "'Inter', system-ui, sans-serif",
          textShadow: TEXT_SHADOW,
          translate: `${interpolate(fadeIn, [0, 1], [-24, 0])}px 0`,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 6, color: "#FFFFFF" }}>
          SUDUT GANJIL
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 3, color: "#FFD166", marginTop: 4 }}>
          EP. 05  /  PROTOKOL KONYOL &amp; PAGAR YANG MENYESAKKAN
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 46,
          right: 70,
          opacity: fadeIn,
          zIndex: 45,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "'Inter', system-ui, sans-serif",
          textShadow: TEXT_SHADOW,
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: 3, color: "#FFD166" }}>
          BAB {String(seg.scene).padStart(2, "0")}
        </span>
        <div style={{ width: 2, height: 22, backgroundColor: "rgba(255,255,255,0.55)" }} />
        <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: 1, color: "#FFFFFF" }}>
          {seg.scene_title}
        </span>
      </div>
    </>
  );
};
