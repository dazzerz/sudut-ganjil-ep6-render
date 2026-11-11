import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { LyricLine } from "./lyricsData";

interface KineticLyricsProps {
  currentLine: LyricLine | null;
  frame: number;
}

export const KineticLyrics: React.FC<KineticLyricsProps> = ({ currentLine, frame }) => {
  const { fps } = useVideoConfig();

  if (!currentLine) {
    return null;
  }

  // Line enter and exit opacity
  const lineEnterOpacity = interpolate(
    frame,
    [currentLine.startFrame, currentLine.startFrame + 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lineExitOpacity = interpolate(
    frame,
    [currentLine.endFrame - 6, currentLine.endFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const overallOpacity = Math.min(lineEnterOpacity, lineExitOpacity);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 260,
        left: 0,
        width: 1080,
        padding: "0 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: overallOpacity,
        zIndex: 40,
      }}
    >
      {/* Aesthetic Small Sub-Header / Song badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
          padding: "6px 18px",
          borderRadius: 30,
          background: "rgba(0, 0, 0, 0.55)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor:
              currentLine.captionTheme === "matcha"
                ? "#88D66C"
                : currentLine.captionTheme === "ice"
                ? "#5CE1E6"
                : "#FFDE59",
            boxShadow: "0 0 10px currentColor",
          }}
        />
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#E2E8F0",
          }}
        >
          Weird Genius & Guraisu
        </span>
      </div>

      {/* Main Kinetic Typography Word Container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 18px",
          textAlign: "center",
          maxWidth: 960,
        }}
      >
        {currentLine.words.map((item, idx) => {
          const isSpoken = frame >= item.startFrame;
          const isActive = frame >= item.startFrame && frame <= item.endFrame;

          // Spring pop when word becomes active
          const wordSpring = spring({
            frame: Math.max(0, frame - item.startFrame),
            fps,
            config: { damping: 12, stiffness: 220, mass: 0.6 },
          });

          // Scale and translate
          let wordScale = 1;
          let translateY = 0;
          let wordColor = "#FFFFFF";
          let textShadow = "0 4px 16px rgba(0, 0, 0, 0.9)";
          let wordBg = "transparent";
          let borderStyle = "none";

          if (isActive) {
            wordScale = interpolate(wordSpring, [0, 1], [0.82, item.isSpecial ? 1.25 : 1.14]);
            translateY = interpolate(wordSpring, [0, 1], [15, 0]);
            wordColor = item.accentColor || "#FFDE59";
            textShadow = `0 0 30px ${item.accentColor || "rgba(255, 222, 89, 0.85)"}, 0 4px 16px rgba(0,0,0,0.95)`;

            if (item.isSpecial) {
              wordBg = "rgba(0, 0, 0, 0.65)";
              borderStyle = `2px solid ${item.accentColor || "#88D66C"}`;
            }
          } else if (isSpoken) {
            wordScale = 1;
            wordColor = "#F1F5F9";
            textShadow = "0 3px 12px rgba(0, 0, 0, 0.85)";
          } else {
            // Future word in line
            wordScale = 0.96;
            wordColor = "rgba(255, 255, 255, 0.4)";
            textShadow = "none";
          }

          return (
            <span
              key={`${currentLine.id}_w_${idx}`}
              style={{
                display: "inline-block",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: item.isSpecial ? 54 : 46,
                fontWeight: 900,
                letterSpacing: "-0.01em",
                color: wordColor,
                transform: `scale(${wordScale}) translateY(${translateY}px)`,
                transformOrigin: "center center",
                textShadow,
                padding: item.isSpecial ? "4px 18px" : "2px 4px",
                borderRadius: item.isSpecial ? 14 : 0,
                backgroundColor: wordBg,
                border: borderStyle,
                transition: "color 0.1s ease",
              }}
            >
              {item.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
