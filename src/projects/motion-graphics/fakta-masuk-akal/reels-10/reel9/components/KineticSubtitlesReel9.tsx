import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Secara logika, air dingin harusnya membeku lebih cepat daripada air panas, kan?",
    startFrame: 3,
    endFrame: 180,
  },
  {
    text: "Tapi di dunia fisika, ada anomali legendaris di mana air mendidih justru bisa membeku jadi es lebih dulu daripada air dingin!",
    startFrame: 181,
    endFrame: 427,
  },
  {
    text: "Fenomena gila ini dinamai Efek Mpemba, diambil dari nama pelajar Tanzania yang menemukannya di tahun 1963.",
    startFrame: 428,
    endFrame: 725,
  },
  {
    text: "Riset modern di jurnal Nature Physics membongkar rahasia mikroskopisnya.",
    startFrame: 726,
    endFrame: 889,
  },
  {
    text: "Pada air panas, ikatan hidrogen merenggang sehingga ikatan kovalen memendek dan menyimpan energi potensial tinggi.",
    startFrame: 890,
    endFrame: 1129,
  },
  {
    text: "Saat didinginkan mendadak, pelepasan energi molekuler terjadi jauh lebih cepat dan memicu kristalisasi seketika!",
    startFrame: 1130,
    endFrame: 1358,
  },
  {
    text: "Ditambah arus konveksi yang jauh lebih kuat, panas menguap lebih cepat ke udara dingin!",
    startFrame: 1359,
    endFrame: 1527,
  },
  {
    text: "Pernah membuktikan eksperimen air panas membeku di freezer rumahmu?",
    startFrame: 1528,
    endFrame: 1659,
  },
  {
    text: "Tulis hasil ujicobamu di kolom komentar!",
    startFrame: 1660,
    endFrame: 1760,
  },
];

export const KineticSubtitlesReel9: React.FC = () => {
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
              color: isCurrent ? "#00F0FF" : isPast ? "#FFFFFF" : "rgba(255,255,255,0.45)",
              transform: isCurrent ? `scale(${interpolate(wordPop, [0, 1], [1.18, 1])})` : "none",
              textShadow: isCurrent
                ? "0 0 25px rgba(0, 240, 255, 0.9), 0 4px 14px rgba(0,0,0,0.95)"
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
