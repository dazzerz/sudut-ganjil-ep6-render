import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Kamu pasti mengira petir selalu menyambar dari awan turun ke tanah, kan?",
    startFrame: 3,
    endFrame: 160,
  },
  {
    text: "Faktanya, ada fenomena langka di mana petir justru melesat dari bawah tanah menyambar ke atas langit!",
    startFrame: 161,
    endFrame: 363,
  },
  {
    text: "Fenomena ini dikenal di dunia sains sebagai Upward Lightning atau sambaran petir ke atas.",
    startFrame: 364,
    endFrame: 548,
  },
  {
    text: "Ketika badai petir melintas di atas menara tinggi atau gedung pencakar langit, muatan listrik raksasa terkumpul di ujung bangunan.",
    startFrame: 549,
    endFrame: 816,
  },
  {
    text: "Ujung menara ini kemudian melepaskan lonjakan ion positif atau positive streamer yang melesat ke atas menembus awan!",
    startFrame: 817,
    endFrame: 1103,
  },
  {
    text: "Riset NOAA dan National Severe Storms Lab membuktikan menara seperti Burj Khalifa bisa memicu ratusan petir ke atas setiap tahunnya!",
    startFrame: 1104,
    endFrame: 1403,
  },
  {
    text: "Pernah melihat kilatan petir aneh yang menyambar ke atas langit saat badai malam?",
    startFrame: 1404,
    endFrame: 1553,
  },
  {
    text: "Tulis ceritamu di kolom komentar!",
    startFrame: 1554,
    endFrame: 1760,
  },
];

export const KineticSubtitlesReel7: React.FC = () => {
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
              color: isCurrent ? "#00FFFF" : isPast ? "#FFFFFF" : "rgba(255,255,255,0.45)",
              transform: isCurrent ? `scale(${interpolate(wordPop, [0, 1], [1.18, 1])})` : "none",
              textShadow: isCurrent
                ? "0 0 25px rgba(0, 255, 255, 0.9), 0 4px 14px rgba(0,0,0,0.95)"
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
