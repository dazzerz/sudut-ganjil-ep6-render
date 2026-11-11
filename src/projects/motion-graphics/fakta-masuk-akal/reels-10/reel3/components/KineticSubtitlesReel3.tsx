import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Bayangkan jika kamu tiba-tiba terjebak di titik terdalam bumi: Palung Mariana sedalam 11.000 meter!",
    startFrame: 3,
    endFrame: 213,
  },
  {
    text: "Apakah kamu akan tenggelam perlahan kehabisan napas?",
    startFrame: 214,
    endFrame: 328,
  },
  {
    text: "Sama sekali tidak!",
    startFrame: 329,
    endFrame: 390,
  },
  {
    text: "Di kedalaman Challenger Deep, tekanan hidrostatik air laut mencapai 1.086 bar!",
    startFrame: 391,
    endFrame: 584,
  },
  {
    text: "Itu setara dengan tubuhmu ditindih oleh 100 ekor gajah Afrika sekaligus!",
    startFrame: 585,
    endFrame: 750,
  },
  {
    text: "Hanya dalam waktu kurang dari 1 milidetik, seluruh rongga udara di tubuhmu hancur mengempis akibat implosi dahsyat!",
    startFrame: 751,
    endFrame: 1068,
  },
  {
    text: "Tulang rusukmu remuk seketika, dan molekul gas dalam darah terkompresi ekstrem sebelum otakmu merasakan sakit!",
    startFrame: 1069,
    endFrame: 1328,
  },
  {
    text: "Dalam kegelapan abadi bersuhu 1 derajat celcius, kamu lenyap dalam sekejap mata.",
    startFrame: 1329,
    endFrame: 1515,
  },
  {
    text: "Menurutmu, misteri apa yang masih tersembunyi di dasar samudra terdalam ini?",
    startFrame: 1516,
    endFrame: 1675,
  },
  {
    text: "Tulis di kolom komentar!",
    startFrame: 1676,
    endFrame: 1780,
  },
];

export const KineticSubtitlesReel3: React.FC = () => {
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
                ? "#22D3EE" // Electric luminous cyan for deep ocean
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
