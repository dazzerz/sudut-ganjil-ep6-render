import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Habis kepanasan atau olahraga terik, kamu langsung menenggak air es segelas besar?",
    startFrame: 3,
    endFrame: 185,
  },
  {
    text: "Hati-hati, kebiasaan ini bisa memicu syok jantung mendadak!",
    startFrame: 186,
    endFrame: 340,
  },
  {
    text: "Saat tubuhmu panas membara, pembuluh darahmu sedang melebar maksimal.",
    startFrame: 341,
    endFrame: 505,
  },
  {
    text: "Ketika air es bersuhu mendekati nol derajat tiba-tiba mengguyur kerongkonganmu, saraf vagus di belakang jantungmu mengalami syok termal hebat!",
    startFrame: 506,
    endFrame: 815,
  },
  {
    text: "Saraf vagus yang kaget seketika mengirim sinyal darurat, membuat detak jantungmu anjlok drastis dalam hitungan detik.",
    startFrame: 816,
    endFrame: 1046,
  },
  {
    text: "Aliran darah ke otak drop seketika, memicu pusing hebat, kram lambung parah, bahkan pingsan mendadak!",
    startFrame: 1047,
    endFrame: 1279,
  },
  {
    text: "Jadi saat kepanasan, minumlah air bersuhu sejuk secara perlahan, bukan es batu langsung!",
    startFrame: 1280,
    endFrame: 1498,
  },
  {
    text: "Kamu tim air dingin atau air sejuk sehabis panas-panasan?",
    startFrame: 1499,
    endFrame: 1642,
  },
  {
    text: "Tulis di kolom komentar!",
    startFrame: 1643,
    endFrame: 1780,
  },
];

export const KineticSubtitlesReel2: React.FC = () => {
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

        return (
          <span
            key={idx}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: "-0.5px",
              lineHeight: 1.25,
              textTransform: "uppercase",
              margin: isCurrent ? "0 8px" : "0 4px",
              color: isCurrent
                ? "#38BDF8" // Vivid electric sky blue for active cold shock
                : isPast
                ? "#FFFFFF"
                : "rgba(255, 255, 255, 0.45)",
              transform: isCurrent ? "scale(1.12)" : "scale(1)",
              textShadow: isCurrent
                ? "0 0 24px rgba(56, 189, 248, 0.9), 0 4px 18px rgba(0,0,0,0.95)"
                : "0 4px 16px rgba(0,0,0,0.9)",
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
