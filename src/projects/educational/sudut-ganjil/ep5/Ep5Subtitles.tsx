import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EP5_SEGMENTS } from "./ep5_scenes";
import { subtitleColor } from "./ep5_shots";

const FPS = 30;

// Floating kinetic subtitles: masked baseline spring reveal per word + karaoke highlight.
// No cards, no boxes: type sits directly on the canvas with a heavy stroke.
export const Ep5Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const seg = EP5_SEGMENTS.find(
    (s) => frame >= s.start_frame && frame < s.start_frame + s.duration_frames + 8
  );
  if (!seg) return null;

  const f = frame - seg.start_frame;
  const color = subtitleColor(seg.bg_image, seg.character);
  const words = seg.clean_text.split(/\s+/).filter(Boolean);

  // Karaoke timing weighted by word length so the highlight follows the voice.
  const weights = words.map((w) => w.length + 2);
  const total = weights.reduce((a, b) => a + b, 0);
  const t0 = 5;
  const t1 = Math.max(t0 + 10, seg.duration_frames - 6);
  const progress = Math.min(1, Math.max(0, (f - t0) / (t1 - t0)));
  let acc = 0;
  let activeIdx = words.length - 1;
  for (let i = 0; i < words.length; i++) {
    acc += weights[i] / total;
    if (progress <= acc) {
      activeIdx = i;
      break;
    }
  }

  const exit = interpolate(f, [seg.duration_frames - 4, seg.duration_frames + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelIn = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 74,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: exit,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 10,
          opacity: labelIn,
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: 6,
          color,
          textShadow: "0 3px 10px rgba(0,0,0,0.95)",
        }}
      >
        <div style={{ width: 70 * labelIn, height: 2, backgroundColor: color }} />
        <span>{seg.character === "raka" ? "RAKA" : "NARA"}</span>
        <div style={{ width: 70 * labelIn, height: 2, backgroundColor: color }} />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 16,
          rowGap: 4,
          maxWidth: 1600,
          textAlign: "center",
        }}
      >
        {words.map((w, i) => {
          const enter = spring({
            frame: f - Math.min(i * 1.5, 24),
            fps: FPS,
            config: { damping: 18, stiffness: 160 },
          });
          const rise = interpolate(enter, [0, 1], [105, 0]);
          const isActive = i === activeIdx && progress < 1;
          const activeColor = isActive ? "#FFFFFF" : color;
          const liftY = isActive ? -4 : 0;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                translate: `0 ${liftY}px`,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  padding: "8px 6px 14px",
                  margin: "-8px -6px -14px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    translate: `0 ${rise}%`,
                    fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif",
                    fontSize: 46,
                    fontWeight: 900,
                    lineHeight: 1.3,
                    color: activeColor,
                    WebkitTextStroke: "8px #000",
                    paintOrder: "stroke fill",
                    textShadow: isActive
                      ? `0 0 24px ${color}, 0 5px 16px rgba(0,0,0,0.95)`
                      : "0 5px 16px rgba(0,0,0,0.9)",
                  }}
                >
                  {w}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
