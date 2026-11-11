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
    endFrame: 89,
    text: "Jangan pernah remehkan begadang!",
  },
  {
    startFrame: 89,
    endFrame: 293,
    text: "Jika kamu tidak tidur selama tiga hari penuh, otakmu akan mulai memakan sel-selnya sendiri!",
  },
  {
    startFrame: 293,
    endFrame: 501,
    text: "Di 24 jam pertama, fokus kognitifmu anjlok setara dengan orang mabuk alkohol.",
  },
  {
    startFrame: 501,
    endFrame: 760,
    text: "Memasuki 48 jam, tubuhmu mengalami mikrotidur tak sadar, dan hormon stres kortisol melonjak drastis.",
  },
  {
    startFrame: 760,
    endFrame: 875,
    text: "Puncaknya di hari ketiga, otakmu panik.",
  },
  {
    startFrame: 875,
    endFrame: 1084,
    text: "Sel mikroglia yang biasanya membersihkan racun berbalik menyerang dan melahap sinapsis neuron aktifmu!",
  },
  {
    startFrame: 1084,
    endFrame: 1314,
    text: "Kamu mulai berhalusinasi melihat bayangan, detak jantung kacau, dan memori jangka pendek terhapus.",
  },
  {
    startFrame: 1314,
    endFrame: 1431,
    text: "Tidur adalah kebutuhan mutlak untuk bertahan hidup!",
  },
  {
    startFrame: 1431,
    endFrame: 1557,
    text: "Berapa jam rekor begadang terlama yang pernah kamu alami?",
  },
  {
    startFrame: 1557,
    endFrame: 1650,
    text: "Tulis di kolom komentar!",
  },
];

export const KineticSubtitlesReel1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeCue = SUBTITLE_CUES.find(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );

  if (!activeCue) return null;

  const cueElapsed = frame - activeCue.startFrame;
  const cueDuration = activeCue.endFrame - activeCue.startFrame;
  const words = activeCue.text.split(" ");
  const wordCount = words.length;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 240, // Outside bottom safe zone (bottom >= 220px)
        left: 70,
        right: 70,
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
        const wordStartFrame = (idx / wordCount) * 8;
        const wordFrame = Math.max(0, cueElapsed - wordStartFrame);

        const wordSpring = spring({
          frame: wordFrame,
          fps,
          config: { stiffness: 240, damping: 16 },
        });

        const approxWordIndex = Math.min(
          wordCount - 1,
          Math.floor((cueElapsed / cueDuration) * wordCount)
        );
        const isCurrentWord = idx === approxWordIndex;

        return (
          <span
            key={idx}
            style={{
              fontSize: 46,
              fontWeight: 900,
              fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
              color: isCurrentWord ? "#FACC15" : "#FFFFFF",
              lineHeight: 1.25,
              textTransform:
                activeCue.text.length < 25 ? "uppercase" : "none",
              letterSpacing: 0.5,
              transform: `scale(${interpolate(
                wordSpring,
                [0, 1],
                [0.85, 1]
              )}) translateY(${interpolate(wordSpring, [0, 1], [12, 0])}px)`,
              display: "inline-block",
              textShadow: isCurrentWord
                ? "0 0 28px rgba(250, 204, 21, 0.95), 0 4px 16px #000000, 0 2px 4px #000000"
                : "0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 6px #000000, 0 0 10px rgba(0, 0, 0, 0.8)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
