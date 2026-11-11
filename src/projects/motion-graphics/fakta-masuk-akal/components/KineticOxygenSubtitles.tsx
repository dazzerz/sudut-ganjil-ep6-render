import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  startFrame: number;
  endFrame: number;
  text: string;
  isHighlight?: boolean;
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
    text: "💥 SALAH BESAR!",
    isHighlight: true,
  },
  {
    startFrame: 218,
    endFrame: 348,
    text: "Dalam 5 detik, dunia langsung hancur total!",
    isHighlight: true,
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
    isHighlight: true,
  },
  {
    startFrame: 661,
    endFrame: 879,
    text: "Kedua, gendang telingamu pecah serentak akibat 21% tekanan udara hilang!",
  },
  {
    startFrame: 879,
    endFrame: 1084,
    text: "Ketiga, langit siang berubah hitam gulita & ozon lenyap seketika!",
    isHighlight: true,
  },
  {
    startFrame: 1084,
    endFrame: 1264,
    text: "Untung oksigen kembali di detik ke-5, tapi peradaban sudah rata dengan tanah.",
  },
  {
    startFrame: 1264,
    endFrame: 1326,
    text: "Masuk akal kan? 🤔",
    isHighlight: true,
  },
  {
    startFrame: 1326,
    endFrame: 1460,
    text: "Follow @FaktaMasukAkal untuk sains viral lainnya!",
    isHighlight: true,
  },
];

export const KineticOxygenSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find active cue
  const activeCue = SUBTITLE_CUES.find(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );

  if (!activeCue) return null;

  const cueElapsed = frame - activeCue.startFrame;

  // Staggered word animation
  const words = activeCue.text.split(" ");
  const wordCount = words.length;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 240, // Outside social media UI safe zone (bottom >= 220px)
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          padding: "20px 32px",
          backgroundColor: activeCue.isHighlight
            ? "rgba(15, 23, 42, 0.94)"
            : "rgba(255, 255, 255, 0.95)",
          borderRadius: 28,
          boxShadow: activeCue.isHighlight
            ? "0 20px 40px rgba(0, 0, 0, 0.3)"
            : "0 20px 40px rgba(0, 0, 0, 0.08)",
          border: activeCue.isHighlight
            ? "3px solid #38BDF8"
            : "3px solid #E2E8F0",
          maxWidth: 960,
        }}
      >
        {words.map((word, idx) => {
          // Word spring entrance
          const wordStartFrame = (idx / wordCount) * 12;
          const wordFrame = Math.max(0, cueElapsed - wordStartFrame);

          const wordSpring = spring({
            frame: wordFrame,
            fps,
            config: { stiffness: 220, damping: 15 },
          });

          // Check if this word is currently the active spoken word
          const approxWordIndex = Math.min(
            wordCount - 1,
            Math.floor((cueElapsed / (activeCue.endFrame - activeCue.startFrame)) * wordCount)
          );
          const isCurrentWord = idx === approxWordIndex;

          const textColor = activeCue.isHighlight
            ? isCurrentWord
              ? "#38BDF8"
              : "#FFFFFF"
            : isCurrentWord
            ? "#0284C7"
            : "#0F172A";

          return (
            <span
              key={idx}
              style={{
                fontSize: 42, // Extra large readable typography (min 36-44px rule)
                fontWeight: 900,
                color: textColor,
                fontFamily: "'Montserrat', system-ui, sans-serif",
                lineHeight: 1.25,
                transform: `scale(${interpolate(wordSpring, [0, 1], [0.8, 1])}) translateY(${interpolate(wordSpring, [0, 1], [20, 0])}px)`,
                display: "inline-block",
                textShadow: isCurrentWord && activeCue.isHighlight
                  ? "0 0 12px rgba(56, 189, 248, 0.8)"
                  : "none",
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
