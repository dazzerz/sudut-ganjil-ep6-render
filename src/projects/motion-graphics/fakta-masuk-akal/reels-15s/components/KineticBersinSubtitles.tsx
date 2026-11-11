import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  startFrame: number;
  endFrame: number;
  text: string;
  highlightIndices?: number[]; // indices of words to emphasize
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    startFrame: 3,
    endFrame: 79,
    text: "Jangan pernah tahan bersinmu!",
    highlightIndices: [0, 1, 2, 3],
  },
  {
    startFrame: 79,
    endFrame: 224,
    text: "Kecepatan bersin manusia mencapai 160 kilometer per jam!",
    highlightIndices: [4, 5, 6, 7],
  },
  {
    startFrame: 224,
    endFrame: 380,
    text: "Jika ditahan, tekanannya berbalik merusak tenggorokan dan gendang telinga.",
    highlightIndices: [4, 5, 6, 7, 8, 9],
  },
  {
    startFrame: 380,
    endFrame: 445,
    text: "Lepaskan saja!",
    highlightIndices: [0, 1],
  },
];

export const KineticBersinSubtitles: React.FC = () => {
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
        bottom: 240, // Outside platform safe zone (bottom >= 220px)
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
        // Staggered spring reveal per word
        const wordStartFrame = (idx / wordCount) * 8;
        const wordFrame = Math.max(0, cueElapsed - wordStartFrame);

        const wordSpring = spring({
          frame: wordFrame,
          fps,
          config: { stiffness: 240, damping: 16 },
        });

        // Approximate spoken timing for active word highlight
        const approxWordIndex = Math.min(
          wordCount - 1,
          Math.floor((cueElapsed / cueDuration) * wordCount)
        );
        const isCurrentWord = idx === approxWordIndex;

        return (
          <span
            key={idx}
            style={{
              fontSize: 48, // Extra large readable typography
              fontWeight: 900,
              fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
              color: isCurrentWord
                ? "#FACC15" // Vibrant electric yellow
                : "#FFFFFF", // Crisp white
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
              // Heavy cinematic drop shadows directly on canvas (NO CARDS / NO BOX)
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
