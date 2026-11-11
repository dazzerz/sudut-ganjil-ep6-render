import React from "react";
import { interpolate } from "remotion";
import { PALETTE } from "./types";
import { SONG_LYRICS } from "./lyricsData";

interface KineticLyricsOverlayProps {
  frame: number; // 0 to 1320
}

export const KineticLyricsOverlay: React.FC<KineticLyricsOverlayProps> = ({ frame }) => {
  // Find current line of lyrics
  const currentLine = SONG_LYRICS.find(
    (l) => frame >= l.startFrame && frame < l.endFrame
  );

  // In Section 4 (792 to 1056), Section 4 renders its own full-canvas kinetic typography architecture
  // In Section 5 after frame 1260, the end title and loop collapse take over
  if (!currentLine || (frame >= 792 && frame < 1056) || frame >= 1240) {
    return null;
  }

  // Adjust bottom placement: in section 5, float above the title at 280; otherwise at 260
  const bottomPosition = frame >= 1056 ? 280 : 260;

  return (
    <div
      style={{
        position: "absolute",
        bottom: bottomPosition,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 85,
        pointerEvents: "none",
        padding: "0 50px",
      }}
    >
      {/* Floating Kinetic Typography Badges */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px 12px",
          maxWidth: 920,
        }}
      >
        {currentLine.words.map((w, idx) => {
          const isSpoken = frame >= w.frame;
          const nextWordFrame =
            idx < currentLine.words.length - 1
              ? currentLine.words[idx + 1].frame
              : currentLine.endFrame;
          const isCurrent = isSpoken && frame < nextWordFrame;

          // Word micro-pop animation when triggered
          const wordPop = isCurrent
            ? interpolate(frame - w.frame, [0, 3, 10], [1.16, 1.05, 1.0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 1.0;

          const textColor = isCurrent
            ? PALETTE.matcha
            : isSpoken
            ? PALETTE.white
            : "rgba(255, 255, 255, 0.55)";

          const bgColor = isCurrent
            ? "rgba(9, 9, 11, 0.95)"
            : "rgba(9, 9, 11, 0.7)";

          const borderColor = isCurrent
            ? `1.5px solid ${PALETTE.matcha}`
            : `1px solid rgba(255, 255, 255, 0.15)`;

          return (
            <span
              key={`${currentLine.id}-${idx}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 42,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: textColor,
                backgroundColor: bgColor,
                border: borderColor,
                padding: "6px 14px",
                borderRadius: 10,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                transform: `scale(${wordPop})`,
                display: "inline-block",
                transformOrigin: "center center",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
