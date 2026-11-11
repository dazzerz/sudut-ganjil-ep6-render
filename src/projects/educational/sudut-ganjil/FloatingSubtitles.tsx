import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EpisodeSegment } from "./scenes";

interface FloatingSubtitlesProps {
  segment: EpisodeSegment;
  frameInSegment: number;
}

export const FloatingSubtitles: React.FC<FloatingSubtitlesProps> = ({
  segment,
  frameInSegment,
}) => {
  // Split clean text into readable sentence chunks
  const fullText = segment.clean_text;
  const sentences = fullText
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) return null;

  const totalLength = fullText.length;
  let accumulated = 0;

  // Calculate timing for each sentence chunk
  const chunks = sentences.map((sentence) => {
    const startFr = Math.floor((accumulated / totalLength) * segment.duration_frames);
    accumulated += sentence.length;
    const endFr = Math.floor((accumulated / totalLength) * segment.duration_frames);
    return {
      text: sentence,
      startFr,
      endFr,
    };
  });

  // Find active chunk
  const activeChunk =
    chunks.find(
      (c) => frameInSegment >= c.startFr && frameInSegment < c.endFr
    ) || chunks[chunks.length - 1];

  const chunkProgress = interpolate(
    frameInSegment,
    [activeChunk.startFr, activeChunk.startFr + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isRaka = segment.character === "raka";
  const speakerColor = isRaka ? "#FFD166" : "#00F2FE";
  const textColor = isRaka ? "#FFFFFF" : "#FFFFFF";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 85,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none",
        padding: "0 80px",
      }}
    >
      {/* Speaker Tag Indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
          opacity: chunkProgress,
          transform: `translateY(${(1 - chunkProgress) * 6}px)`,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: speakerColor,
            boxShadow: `0 0 12px ${speakerColor}`,
          }}
        />
        <span
          style={{
            color: speakerColor,
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          {segment.character === "raka" ? "RAKA" : "NARA"}
        </span>
      </div>

      {/* Floating Subtitle Text - Anti-Card / Anti-Box! */}
      <div
        style={{
          color: textColor,
          fontSize: 42,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.36,
          maxWidth: 1350,
          textShadow:
            "0 4px 20px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.8)",
          opacity: chunkProgress,
          transform: `translateY(${(1 - chunkProgress) * 10}px)`,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          filter: "drop-shadow(0 4px 15px rgba(0,0,0,0.8))",
        }}
      >
        {activeChunk.text}
      </div>
    </div>
  );
};
