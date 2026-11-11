import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Pernahkah kamu menyadari, seberapa sering pun kamu flu, kamu hampir mustahil bersin saat sedang tidur lelap?",
    startFrame: 3,
    endFrame: 215,
  },
  {
    text: "Bukan karena debu berhenti beterbangan di malam hari, melainkan ada sakelar biologis di otakmu yang sengaja mematikannya!",
    startFrame: 216,
    endFrame: 454,
  },
  {
    text: "Saat kita memasuki fase tidur REM atau fase bermimpi, batang otak melepaskan neurotransmiter GABA dan glisin.",
    startFrame: 455,
    endFrame: 693,
  },
  {
    text: "Zat kimia ini melumpuhkan neuron motorik tubuh dalam kondisi REM atonia, sehingga refleks bersin terkunci total!",
    startFrame: 694,
    endFrame: 943,
  },
  {
    text: "Hanya jika iritasi hidungmu sangat ekstrem, saraf trigeminal mengirim sinyal darurat ke otak untuk membangunkanmu terlebih dahulu.",
    startFrame: 944,
    endFrame: 1205,
  },
  {
    text: "Begitu kesadaranmu kembali, barulah refleks bersin meledak keluar!",
    startFrame: 1206,
    endFrame: 1355,
  },
  {
    text: "Kamu pernah tiba-tiba terbangun tengah malam cuma gara-gara mau bersin?",
    startFrame: 1356,
    endFrame: 1495,
  },
  {
    text: "Tulis ceritamu di kolom komentar!",
    startFrame: 1496,
    endFrame: 1750,
  },
];

export const KineticSubtitlesReel8: React.FC = () => {
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
