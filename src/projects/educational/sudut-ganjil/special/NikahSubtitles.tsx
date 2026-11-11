import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { DialogueSegment, NIKAH_SEGMENTS } from "./nikah_scenes";

export const NikahSubtitles: React.FC = () => {
  const frame = useCurrentFrame();

  const seg = NIKAH_SEGMENTS.find(
    (s: DialogueSegment) =>
      frame >= s.startFrame && frame < s.startFrame + s.durationInFrames + 8
  );

  if (!seg) return null;

  const f = frame - seg.startFrame;
  const isRaka = seg.character === "raka";
  const speakerColor = isRaka ? "#FFE600" : "#00F2FE";
  const speakerName = isRaka ? "RAKA" : "NARA";

  const words = seg.clean_text.split(/\s+/).filter(Boolean);

  // Karaoke timing berbasis bobot panjang kata
  const weights = words.map((w) => w.length + 2);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const tStart = 4;
  const tEnd = Math.max(tStart + 10, seg.durationInFrames - 6);
  const progress = Math.min(1, Math.max(0, (f - tStart) / (tEnd - tStart)));

  let acc = 0;
  let activeIdx = words.length - 1;
  for (let i = 0; i < words.length; i++) {
    acc += weights[i] / totalWeight;
    if (progress <= acc) {
      activeIdx = i;
      break;
    }
  }

  // Transisi exit halus
  const exitOpacity = interpolate(
    f,
    [seg.durationInFrames - 4, seg.durationInFrames + 6],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const speakerIn = interpolate(f, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 140,
        right: 140,
        bottom: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: exitOpacity,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Speaker Tag Melayang Bebas (Zero Card) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          opacity: speakerIn,
          fontFamily: "'Inter', 'Montserrat', system-ui, sans-serif",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: 4,
          color: speakerColor,
          textShadow: "0 3px 12px rgba(0,0,0,0.95), 0 0 2px #000",
          WebkitTextStroke: "4px #000",
          paintOrder: "stroke fill",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: speakerColor,
            boxShadow: `0 0 10px ${speakerColor}`,
          }}
        />
        {speakerName}
      </div>

      {/* Floating Kinetic Typography (Anti-Box, Heavy Stroke, High Contrast) */}
      <div
        style={{
          fontFamily: "'Inter', 'Montserrat', 'Segoe UI', system-ui, sans-serif",
          fontSize: 44,
          fontWeight: 900,
          lineHeight: 1.35,
          textAlign: "center",
          letterSpacing: 0.5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 14px",
          maxWidth: 1600,
        }}
      >
        {words.map((word, idx) => {
          const isActive = idx === activeIdx;
          const isPassed = idx < activeIdx;

          const wordColor = isActive
            ? speakerColor
            : isPassed
            ? "#FFFFFF"
            : "rgba(255, 255, 255, 0.75)";

          const wordScale = isActive ? 1.06 : 1.0;

          return (
            <span
              key={`${seg.id}-${idx}`}
              style={{
                color: wordColor,
                transform: `scale(${wordScale})`,
                transition: "color 0.1s ease, transform 0.1s ease",
                WebkitTextStroke: "8px #000000",
                paintOrder: "stroke fill",
                textShadow:
                  "0 4px 16px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,1)",
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
