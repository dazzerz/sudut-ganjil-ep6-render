import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { ShortSegment } from "./types";

interface ShortsSubtitlesProps {
  segment: ShortSegment;
  frameInSegment: number;
  isCTA?: boolean;
}

export const ShortsSubtitles: React.FC<ShortsSubtitlesProps> = ({
  segment,
  frameInSegment,
  isCTA = false,
}) => {
  const { fps } = useVideoConfig();
  const fullText = segment.clean_text;
  const words = fullText.split(/\s+/).filter(Boolean);

  if (words.length === 0) return null;

  // Shorter, punchier 4-word chunks for fast-scroll mobile retention
  const chunkSize = 4;
  const chunks: { text: string; startFr: number; endFr: number }[] = [];

  const totalDuration = segment.duration_frames;
  const chunkCount = Math.ceil(words.length / chunkSize);
  const framesPerChunk = totalDuration / chunkCount;

  for (let i = 0; i < chunkCount; i++) {
    const chunkWords = words.slice(i * chunkSize, (i + 1) * chunkSize);
    chunks.push({
      text: chunkWords.join(" "),
      startFr: Math.floor(i * framesPerChunk),
      endFr: Math.floor((i + 1) * framesPerChunk),
    });
  }

  const activeChunk =
    chunks.find(
      (c) => frameInSegment >= c.startFr && frameInSegment < c.endFr
    ) || chunks[chunks.length - 1];

  const popSpring = spring({
    frame: Math.max(0, frameInSegment - activeChunk.startFr),
    fps,
    config: { damping: 14, stiffness: 220 },
  });

  const isRaka = segment.character === "raka";
  const speakerColor = isRaka ? "#FFE600" : "#00F2FE";

  return (
    <div
      style={{
        position: "absolute",
        bottom: isCTA ? 400 : 320,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 65,
        pointerEvents: "none",
        padding: "0 65px",
      }}
    >
      {/* Cardless Speaker Indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
          opacity: popSpring,
          transform: `translateY(${(1 - popSpring) * 6}px)`,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: speakerColor,
            boxShadow: `0 0 14px ${speakerColor}`,
          }}
        />
        <span
          style={{
            color: speakerColor,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: "uppercase",
            WebkitTextStroke: "4px #000000",
            paintOrder: "stroke fill",
            textShadow: "0 3px 10px rgba(0,0,0,0.95)",
          }}
        >
          {segment.character === "raka" ? "RAKA" : "NARA"}
        </span>
      </div>

      {/* Cardless Floating Kinetic Subtitle - Massive Bold Contrast */}
      <div
        style={{
          color: "#FFFFFF",
          fontSize: 52,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.25,
          maxWidth: 940,
          WebkitTextStroke: "9px #000000",
          paintOrder: "stroke fill",
          textShadow: "0 8px 26px rgba(0,0,0,0.98)",
          opacity: interpolate(popSpring, [0, 1], [0.2, 1]),
          transform: `translateY(${(1 - popSpring) * 10}px) scale(${0.92 + popSpring * 0.08})`,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {activeChunk.text}
      </div>
    </div>
  );
};
