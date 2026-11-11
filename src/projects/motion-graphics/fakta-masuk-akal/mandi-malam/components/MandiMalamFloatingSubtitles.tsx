import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface SubtitleCue {
  id: number;
  startFrame: number;
  endFrame: number;
  text: string;
}

const CUES: SubtitleCue[] = [
  {
    id: 1,
    startFrame: 3,
    endFrame: 148,
    text: "Sering dilarang mandi malam karena takut kena rematik di masa tua?",
  },
  {
    id: 2,
    startFrame: 149,
    endFrame: 187,
    text: "Stop!",
  },
  {
    id: 3,
    startFrame: 188,
    endFrame: 295,
    text: "Tubuhmu ternyata tidak bekerja seperti itu!",
  },
  {
    id: 4,
    startFrame: 296,
    endFrame: 494,
    text: "Air dingin memang bisa bikin pembuluh darah tepi menyempit dan cairan sendi mengental sementara.",
  },
  {
    id: 5,
    startFrame: 495,
    endFrame: 641,
    text: "Inilah yang bikin otot tegang dan sendi terasa kaku atau ngilu.",
  },
  {
    id: 6,
    startFrame: 642,
    endFrame: 892,
    text: "Tapi secara medis, rematik adalah penyakit autoimun dan peradangan genetik, bukan disebabkan oleh suhu air!",
  },
  {
    id: 7,
    startFrame: 893,
    endFrame: 1071,
    text: "Air dingin cuma memicu rasa ngilu pada orang yang sendinya memang sudah bermasalah.",
  },
  {
    id: 8,
    startFrame: 1072,
    endFrame: 1209,
    text: "Jadi kalau tubuhmu sehat, mandi malam itu aman.",
  },
  {
    id: 9,
    startFrame: 1210,
    endFrame: 1330,
    text: "Kalau takut kedinginan, cukup pakai air hangat!",
  },
  {
    id: 10,
    startFrame: 1331,
    endFrame: 1392,
    text: "Masuk akal kan?",
  },
  {
    id: 11,
    startFrame: 1393,
    endFrame: 1515,
    text: "Follow Fakta Masuk Akal untuk sains viral lainnya!",
  },
];

export const MandiMalamFloatingSubtitles: React.FC = () => {
  const frame = useCurrentFrame();

  const currentCue = CUES.find((c) => frame >= c.startFrame && frame <= c.endFrame);

  if (!currentCue) return null;

  const words = currentCue.text.split(" ");
  const cueDuration = Math.max(1, currentCue.endFrame - currentCue.startFrame);
  const elapsed = frame - currentCue.startFrame;
  const progress = Math.min(0.999, Math.max(0, elapsed / cueDuration));
  const activeWordIndex = Math.min(words.length - 1, Math.floor(progress * words.length));

  // Subtle bounce on cue entry
  const entryOpacity = interpolate(elapsed, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const entryScale = interpolate(elapsed, [0, 6], [0.95, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 240, // Outside UI safe area
        left: 60,
        right: 60,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 14,
        rowGap: 10,
        textAlign: "center",
        zIndex: 100,
        opacity: entryOpacity,
        transform: `scale(${entryScale})`,
        pointerEvents: "none",
        // ZERO card or box container! Directly floating with crisp text shadow
      }}
    >
      {words.map((word, idx) => {
        const isActive = idx === activeWordIndex;
        return (
          <span
            key={`${currentCue.id}-${idx}`}
            style={{
              fontSize: 44,
              fontWeight: 900,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              letterSpacing: 0.5,
              lineHeight: 1.25,
              color: isActive ? "#FDE047" : "#FFFFFF",
              textShadow: isActive
                ? "0 4px 18px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9)"
                : "0 4px 14px rgba(0, 0, 0, 0.85), 0 2px 4px rgba(0, 0, 0, 0.75)",
              transform: isActive ? "scale(1.08)" : "scale(1)",
              display: "inline-block",
              transition: "transform 0.1s ease",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
