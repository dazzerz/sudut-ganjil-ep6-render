import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { DialogueSegment, REKSA_SEGMENTS } from "./reksa_dana_scenes";

export const ReksaDanaSubtitles: React.FC = () => {
  const frame = useCurrentFrame();

  const seg = REKSA_SEGMENTS.find(
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
        <span>{speakerName}</span>
      </div>

      {/* Kinetic Typography Subtitle Words */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 14,
          rowGap: 8,
          maxWidth: 1600,
          textAlign: "center",
          fontFamily: "'Inter', 'Montserrat', system-ui, sans-serif",
          fontSize: 38,
          fontWeight: 900,
          lineHeight: 1.35,
          textShadow: "0 4px 18px rgba(0,0,0,0.95), 0 0 3px #000",
          WebkitTextStroke: "6px #000",
          paintOrder: "stroke fill",
        }}
      >
        {words.map((word, idx) => {
          const isActive = idx === activeIdx;
          const isPast = idx < activeIdx;

          const wordColor = isActive
            ? speakerColor
            : isPast
            ? "#FFFFFF"
            : "rgba(255,255,255,0.65)";

          const wordScale = isActive ? 1.08 : 1.0;

          return (
            <span
              key={`${seg.id}-w-${idx}`}
              style={{
                color: wordColor,
                transform: `scale(${wordScale})`,
                transition: "none",
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
