import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  startFrame: number;
  endFrame: number;
  text: string;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    startFrame: 3,
    endFrame: 162,
    text: "Cuma 5 detik tanpa oksigen, kamu kira cuma tahan napas biasa?",
  },
  {
    startFrame: 162,
    endFrame: 218,
    text: "SALAH BESAR!",
  },
  {
    startFrame: 218,
    endFrame: 348,
    text: "Dalam 5 detik, dunia langsung hancur total!",
  },
  {
    startFrame: 348,
    endFrame: 528,
    text: "Pertama, semua gedung & jembatan beton langsung roboh jadi debu seketika!",
  },
  {
    startFrame: 528,
    endFrame: 661,
    text: "Oksigen adalah molekul pengikat utama partikel semen!",
  },
  {
    startFrame: 661,
    endFrame: 879,
    text: "Kedua, gendang telingamu pecah serentak akibat 21 persen tekanan udara hilang!",
  },
  {
    startFrame: 879,
    endFrame: 1084,
    text: "Ketiga, langit siang berubah hitam gulita & lapisan ozon lenyap seketika!",
  },
  {
    startFrame: 1084,
    endFrame: 1264,
    text: "Untung oksigen kembali di detik kelima, tapi peradaban sudah rata dengan tanah.",
  },
  {
    startFrame: 1264,
    endFrame: 1326,
    text: "Masuk akal kan?",
  },
  {
    startFrame: 1326,
    endFrame: 1470,
    text: "Follow @FaktaMasukAkal untuk sains viral lainnya!",
  },
];

export const KineticFloatingSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeCue = SUBTITLE_CUES.find(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );

  if (!activeCue) return null;

  const cueElapsed = frame - activeCue.startFrame;
  const words = activeCue.text.split(" ");
  const wordCount = words.length;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 240, // Outside social safe zone (bottom >= 220px)
        left: 60,
        right: 60,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        zIndex: 100,
        pointerEvents: "none",
        textAlign: "center",
      }}
    >
      {words.map((word, idx) => {
        const wordStartFrame = (idx / wordCount) * 10;
        const wordFrame = Math.max(0, cueElapsed - wordStartFrame);

        const wordSpring = spring({
          frame: wordFrame,
          fps,
          config: { stiffness: 220, damping: 15 },
        });

        // Approximate spoken timing for word highlight
        const approxWordIndex = Math.min(
          wordCount - 1,
          Math.floor((cueElapsed / (activeCue.endFrame - activeCue.startFrame)) * wordCount)
        );
        const isCurrentWord = idx === approxWordIndex;

        return (
          <span
            key={idx}
            style={{
              fontSize: 46, // Extra-large readable typography
              fontWeight: 900,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              color: isCurrentWord ? "#FDE047" : "#FFFFFF",
              lineHeight: 1.25,
              textTransform: activeCue.text.length < 20 ? "uppercase" : "none",
              letterSpacing: 0.5,
              transform: `scale(${interpolate(wordSpring, [0, 1], [0.8, 1])}) translateY(${interpolate(wordSpring, [0, 1], [15, 0])}px)`,
              display: "inline-block",
              // Heavy cinematic drop shadows directly on the canvas without any card
              textShadow: isCurrentWord
                ? "0 0 25px rgba(253, 224, 71, 0.9), 0 4px 14px #000000, 0 2px 4px #000000"
                : "0 4px 14px #000000, 0 2px 6px #000000, 0 0 10px rgba(0,0,0,0.8)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
