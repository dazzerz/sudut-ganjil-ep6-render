import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    text: "Pernah dengar aturan lima detik?",
    startFrame: 3,
    endFrame: 85,
  },
  {
    text: "Kalau makanan jatuh ke lantai, katanya masih aman dimakan sebelum lima detik!",
    startFrame: 86,
    endFrame: 248,
  },
  {
    text: "Tapi benarkah begitu?",
    startFrame: 249,
    endFrame: 315,
  },
  {
    text: "Tahun 2016, para peneliti dari Rutgers University membongkar mitos ini di laboratorium dengan ribuan sampel makanan.",
    startFrame: 316,
    endFrame: 570,
  },
  {
    text: "Hasilnya sangat mengejutkan!",
    startFrame: 571,
    endFrame: 651,
  },
  {
    text: "Bakteri sama sekali tidak punya stopwatch!",
    startFrame: 652,
    endFrame: 749,
  },
  {
    text: "Kontaminasi bakteri ternyata terjadi hanya dalam waktu kurang dari 100 milidetik—alias 0,1 detik setelah menyentuh lantai!",
    startFrame: 750,
    endFrame: 1012,
  },
  {
    text: "Makanan bertekstur lembap seperti potongan buah atau roti mentega langsung menyerap jutaan koloni bakteri Salmonella saat benturan pertama!",
    startFrame: 1013,
    endFrame: 1267,
  },
  {
    text: "Bahkan lantai keramik yang terlihat mengilap dan bersih bisa menampung ribuan mikroba patogen tak kasat mata!",
    startFrame: 1268,
    endFrame: 1463,
  },
  {
    text: "Setelah tahu fakta sains ini, kamu masih berani memungut makanan yang jatuh?",
    startFrame: 1464,
    endFrame: 1623,
  },
  {
    text: "Tulis di kolom komentar!",
    startFrame: 1624,
    endFrame: 1780,
  },
];

export const KineticSubtitlesReel4: React.FC = () => {
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
                ? "#FACC15" // Energetic high-visibility solar amber/yellow for food microbiology
                : isPast
                ? "#FFFFFF"
                : "rgba(255, 255, 255, 0.45)",
              transform: isCurrent ? "scale(1.12)" : "scale(1)",
              textShadow: isCurrent
                ? "0 0 24px rgba(250, 204, 21, 0.95), 0 4px 18px rgba(0,0,0,0.95)"
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
