import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { LYRIC_LINES } from "./lyricsData";

interface KineticLyricsV2Props {
  frame: number;
}

export const KineticLyricsV2: React.FC<KineticLyricsV2Props> = ({ frame }) => {
  const { fps } = useVideoConfig();

  // Find active line
  const currentLine = LYRIC_LINES.find(
    (line) => frame >= line.startFrame && frame < line.endFrame
  );

  if (!currentLine) {
    return null;
  }

  // Fade in / out of current line
  const lineEnterOpacity = interpolate(
    frame,
    [currentLine.startFrame, currentLine.startFrame + 4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lineExitOpacity = interpolate(
    frame,
    [currentLine.endFrame - 5, currentLine.endFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const overallOpacity = Math.min(lineEnterOpacity, lineExitOpacity);

  // Beat bounce for the active lyric container
  const beatPhase = (frame % 18 + 18) % 18;
  const containerBump = interpolate(beatPhase, [0, 3, 17], [1.025, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 250,
        left: 0,
        width: 1080,
        padding: "0 50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: overallOpacity,
        transform: `scale(${containerBump})`,
        transformOrigin: "center bottom",
        zIndex: 50,
      }}
    >
      {/* 1. Track Info Pill with Animated Sound Wave Bars */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
          padding: "6px 20px",
          borderRadius: 30,
          background: "rgba(10, 10, 12, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Animated mini equalizer bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 16 }}>
          {[0.2, 0.5, 0.8, 0.4].map((offset, i) => {
            const barH = 6 + Math.abs(Math.sin((frame * 0.25) + offset * Math.PI)) * 10;
            return (
              <div
                key={i}
                style={{
                  width: 3.5,
                  height: barH,
                  backgroundColor:
                    currentLine.captionTheme === "matcha"
                      ? "#88D66C"
                      : currentLine.captionTheme === "ice"
                      ? "#5CE1E6"
                      : "#FFDE59",
                  borderRadius: 2,
                }}
              />
            );
          })}
        </div>

        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 1.8,
            textTransform: "uppercase",
            color: "#F8FAFC",
          }}
        >
          Weird Genius & Guraisu
        </span>
      </div>

      {/* 2. Kinetic Words Grid with Spring Physics */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px 16px",
          textAlign: "center",
          maxWidth: 980,
        }}
      >
        {currentLine.words.map((item, idx) => {
          const isSpoken = frame >= item.startFrame;
          const isActive = frame >= item.startFrame && frame <= item.endFrame;

          // Spring pop on word onset
          const wordSpring = spring({
            frame: Math.max(0, frame - item.startFrame),
            fps,
            config: { damping: 10, stiffness: 260, mass: 0.5 },
          });

          let wordScale = 1;
          let translateY = 0;
          let wordColor = "#FFFFFF";
          let textShadow = "0 4px 16px rgba(0, 0, 0, 0.95)";
          let wordBg = "transparent";
          let borderStyle = "none";

          if (isActive) {
            wordScale = interpolate(wordSpring, [0, 1], [0.8, item.isSpecial ? 1.28 : 1.16]);
            translateY = interpolate(wordSpring, [0, 1], [16, 0]);
            wordColor = item.accentColor || "#FFDE59";
            textShadow = `0 0 28px ${item.accentColor || "#FFDE59"}, 0 4px 18px rgba(0,0,0,0.98)`;

            if (item.isSpecial) {
              wordBg = "rgba(0, 0, 0, 0.72)";
              borderStyle = `2.5px solid ${item.accentColor || "#88D66C"}`;
            }
          } else if (isSpoken) {
            wordScale = 1;
            wordColor = "#F1F5F9";
            textShadow = "0 3px 12px rgba(0, 0, 0, 0.9)";
          } else {
            // Future word
            wordScale = 0.95;
            wordColor = "rgba(255, 255, 255, 0.35)";
            textShadow = "none";
          }

          return (
            <span
              key={`${currentLine.id}_w_${idx}`}
              style={{
                display: "inline-block",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: item.isSpecial ? 56 : 48,
                fontWeight: 900,
                letterSpacing: "-0.015em",
                color: wordColor,
                transform: `scale(${wordScale}) translateY(${translateY}px)`,
                transformOrigin: "center center",
                textShadow,
                padding: item.isSpecial ? "6px 20px" : "2px 4px",
                borderRadius: item.isSpecial ? 16 : 0,
                backgroundColor: wordBg,
                border: borderStyle,
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
