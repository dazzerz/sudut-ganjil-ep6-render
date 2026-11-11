import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Cahaya matahari hangat yang menyentuh kulitmu hari ini tidak lahir 8 menit lalu, melainkan 100.000 tahun yang lalu!",
    startFrame: 3,
    endFrame: 228,
  },
  {
    text: "Kok bisa?",
    startFrame: 229,
    endFrame: 273,
  },
  {
    text: "Bukannya kecepatan cahaya hanya butuh 8 menit 20 detik dari Matahari ke Bumi?",
    startFrame: 274,
    endFrame: 442,
  },
  {
    text: "Faktanya, waktu 8 menit itu hanya perjalanan di ruang hampa!",
    startFrame: 443,
    endFrame: 596,
  },
  {
    text: "Di inti Matahari yang luar biasa padat, foton harus melewati zona radiasi dengan fenomena random walk.",
    startFrame: 597,
    endFrame: 838,
  },
  {
    text: "Foton bertumbukan dan terpental dengan triliunan partikel plasma padat setiap detiknya!",
    startFrame: 839,
    endFrame: 1005,
  },
  {
    text: "Dibutuhkan 100.000 hingga 170.000 tahun bagi foton untuk merayap dari inti ke permukaan matahari!",
    startFrame: 1006,
    endFrame: 1260,
  },
  {
    text: "Begitu lepas ke angkasa, barulah ia melesat tanpa hambatan menuju wajahmu!",
    startFrame: 1261,
    endFrame: 1428,
  },
  {
    text: "Kagum dengan dahsyatnya perjalanan cahaya kosmik ini?",
    startFrame: 1429,
    endFrame: 1539,
  },
  {
    text: "Tulis kekagumanmu di kolom komentar!",
    startFrame: 1540,
    endFrame: 1750,
  },
];

export const KineticSubtitlesReel10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeCue = SUBTITLE_CUES.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  if (!activeCue) return null;

  const words = activeCue.text.split(" ");
  const cueDuration = activeCue.endFrame - activeCue.startFrame;
  const framesPerWord = cueDuration / words.length;
  const activeWordIndex = Math.min(
    Math.floor((frame - activeCue.startFrame) / framesPerWord),
    words.length - 1
  );

  const cueEntrance = spring({
    frame: frame - activeCue.startFrame,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.6 },
  });

  const cueExit = interpolate(
    frame,
    [activeCue.endFrame - 5, activeCue.endFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 250,
        left: 70,
        right: 70,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 14,
        columnGap: 14,
        zIndex: 50,
        opacity: cueExit,
        transform: `translateY(${interpolate(cueEntrance, [0, 1], [25, 0])}px)`,
        pointerEvents: "none",
      }}
    >
      {words.map((word, idx) => {
        const isCurrent = idx === activeWordIndex;
        const isPast = idx < activeWordIndex;

        const wordPop = isCurrent
          ? spring({
              frame: Math.max(0, frame - (activeCue.startFrame + idx * framesPerWord)),
              fps,
              config: { damping: 12, stiffness: 260 },
            })
          : 1;

        return (
          <span
            key={idx}
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontSize: 44,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
              color: isCurrent ? "#FFE600" : isPast ? "#FFFFFF" : "rgba(255,255,255,0.45)",
              transform: isCurrent ? `scale(${interpolate(wordPop, [0, 1], [1.18, 1])})` : "none",
              textShadow: isCurrent
                ? "0 0 25px rgba(255, 230, 0, 0.9), 0 4px 14px rgba(0,0,0,0.95)"
                : "0 4px 14px rgba(0,0,0,0.85)",
              display: "inline-block",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
