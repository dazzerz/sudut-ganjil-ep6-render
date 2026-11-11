import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Pernahkah kamu heran, kenapa kucing hampir selalu mendarat dengan kakinya duluan saat jatuh, bahkan dari posisi terbalik?",
    startFrame: 3,
    endFrame: 247,
  },
  {
    text: "Secara fisika, gerakan akrobatik ini sempat membingungkan para ilmuwan karena seolah melanggar hukum kekekalan momentum sudut!",
    startFrame: 248,
    endFrame: 487,
  },
  {
    text: "Rahasia utamanya ada pada aparatus vestibular di telinga dalam kucing yang mendeteksi gravitasi hanya dalam hitungan milidetik!",
    startFrame: 488,
    endFrame: 732,
  },
  {
    text: "Alih-alih memutar tubuh sekaligus, kucing menekuk pinggangnya menjadi dua sumbu silinder independen.",
    startFrame: 733,
    endFrame: 936,
  },
  {
    text: "Kaki depan ditarik rapat ke dada agar bagian depan berputar cepat 180 derajat, lalu disusul kaki belakang yang menyelaraskan posisi pendaratan!",
    startFrame: 937,
    endFrame: 1240,
  },
  {
    text: "Seluruh manuver biomekanik ini selesai dalam waktu kurang dari 0,3 detik!",
    startFrame: 1241,
    endFrame: 1410,
  },
  {
    text: "Kucing peliharaanmu di rumah pernah selamat saat jatuh dari ketinggian?",
    startFrame: 1411,
    endFrame: 1553,
  },
  {
    text: "Tulis ceritamu di kolom komentar!",
    startFrame: 1554,
    endFrame: 1780,
  },
];

export const KineticSubtitlesReel6: React.FC = () => {
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
                ? "#22D3EE" // Vivid electric cyan
                : isPast
                ? "#FFFFFF"
                : "rgba(255, 255, 255, 0.45)",
              transform: isCurrent ? "scale(1.12)" : "scale(1)",
              textShadow: isCurrent
                ? "0 0 24px rgba(34, 211, 238, 0.95), 0 4px 18px rgba(0,0,0,0.95)"
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
