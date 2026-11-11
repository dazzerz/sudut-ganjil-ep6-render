import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { MobilDialogueSegment, MOBIL_SEGMENTS } from "./kredit_mobil_scenes";

export const MobilSubtitles: React.FC = () => {
  const frame = useCurrentFrame();

  const seg = MOBIL_SEGMENTS.find(
    (s: MobilDialogueSegment) =>
      frame >= s.startFrame && frame < s.startFrame + s.durationInFrames + 8
  );

  if (!seg) return null;

  const f = frame - seg.startFrame;
  const isRaka = seg.character === "raka";
  const speakerColor = isRaka ? "#FFDE1A" : "#00F2FE";
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
        zIndex: 50,
        opacity: exitOpacity,
        pointerEvents: "none",
      }}
    >
      {/* Speaker Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
          opacity: speakerIn,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: 3,
            color: speakerColor,
            fontFamily: "'Montserrat', sans-serif",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          {speakerName}
        </span>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: speakerColor,
            boxShadow: `0 0 8px ${speakerColor}`,
          }}
        />
      </div>

      {/* Teks Subtitle Karaoke Melayang Bebas (Anti-Box) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 14px",
          maxWidth: 1600,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {words.map((word, i) => {
          const isActive = i === activeIdx;
          const isPast = i < activeIdx;

          const color = isActive
            ? speakerColor
            : isPast
            ? "#FFFFFF"
            : "rgba(255,255,255,0.7)";

          const scale = isActive ? 1.08 : 1.0;

          return (
            <span
              key={`${seg.id}-${i}`}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 38,
                fontWeight: isActive ? 900 : 700,
                color,
                display: "inline-block",
                transform: `scale(${scale})`,
                transition: "none",
                textShadow: isActive
                  ? `0 0 16px ${speakerColor}AA, 0 4px 14px rgba(0,0,0,0.95)`
                  : "0 4px 14px rgba(0,0,0,0.95), 0 0 3px rgba(0,0,0,1)",
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
