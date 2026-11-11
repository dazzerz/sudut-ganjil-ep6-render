import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Pernahkah kamu membayangkan apa yang terjadi jika Matahari mendadak padam detik ini juga?",
    startFrame: 3,
    endFrame: 175,
  },
  {
    text: "Anehnya, selama delapan menit dua puluh detik pertama, kamu tidak akan merasakan apa-apa!",
    startFrame: 176,
    endFrame: 373,
  },
  {
    text: "Langit tetap terang benderang karena foton cahaya terakhir masih dalam perjalanan 150 juta kilometer ke Bumi!",
    startFrame: 374,
    endFrame: 611,
  },
  {
    text: "Tepat di menit 8 lewat 20 detik, gelap gulita total menyelimuti seluruh planet!",
    startFrame: 612,
    endFrame: 788,
  },
  {
    text: "Gravitasi matahari lenyap seketika, melemparkan orbit Bumi meluncur liar ke ruang antarbintang!",
    startFrame: 789,
    endFrame: 993,
  },
  {
    text: "Hanya dalam satu minggu, suhu global anjlok hingga minus 18 derajat celcius.",
    startFrame: 994,
    endFrame: 1187,
  },
  {
    text: "Dalam setahun, samudra membeku dan bumi menjadi bola es beku minus 73 derajat celcius!",
    startFrame: 1188,
    endFrame: 1400,
  },
  {
    text: "Menurutmu, berapa lama peradaban manusia bisa bertahan jika ini benar-benar terjadi?",
    startFrame: 1401,
    endFrame: 1576,
  },
  {
    text: "Tulis di kolom komentar!",
    startFrame: 1577,
    endFrame: 1780,
  },
];

export const KineticSubtitlesReel5: React.FC = () => {
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

  // Switch color based on solar phase (warm solar amber before 611, deep cryo cyan after)
  const isPostExtinction = frame >= 611;
  const highlightColor = isPostExtinction ? "#38BDF8" : "#F59E0B";

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
                ? highlightColor
                : isPast
                ? "#FFFFFF"
                : "rgba(255, 255, 255, 0.45)",
              transform: isCurrent ? "scale(1.12)" : "scale(1)",
              textShadow: isCurrent
                ? `0 0 24px ${highlightColor}, 0 4px 18px rgba(0,0,0,0.95)`
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
