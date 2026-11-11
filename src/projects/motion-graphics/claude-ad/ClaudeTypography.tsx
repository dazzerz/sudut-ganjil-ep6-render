import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { LYRIC_LINES, WordItem } from "../hot-matcha/lyricsData";

interface ClaudeTypographyProps {
  frame: number;
}

export const ClaudeTypography: React.FC<ClaudeTypographyProps> = ({ frame }) => {
  const { fps } = useVideoConfig();

  // Find active lyric line
  const currentLine = LYRIC_LINES.find(
    (line) => frame >= line.startFrame && frame < line.endFrame
  );

  // If in outro after line 10, let outro take over
  if (!currentLine || frame >= 1210) {
    return null;
  }

  // Line in/out transitions
  const lineEnter = interpolate(
    frame,
    [currentLine.startFrame, currentLine.startFrame + 4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lineExit = interpolate(
    frame,
    [currentLine.endFrame - 4, currentLine.endFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lineOpacity = Math.min(lineEnter, lineExit);

  // 100 BPM drum pulse
  const beatPhase = (frame % 18 + 18) % 18;
  const beatBump = interpolate(beatPhase, [0, 2, 7, 17], [1.03, 1.015, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 280,
        left: 0,
        width: 1080,
        padding: "0 50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: lineOpacity,
        transform: `scale(${beatBump})`,
        transformOrigin: "center bottom",
        zIndex: 60,
      }}
    >
      {/* Words Container - Clean Floating Kinetic Typography (Anti-Kotak / Anti-Card) */}
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

          // Spring pop on onset
          const wordSpring = spring({
            frame: Math.max(0, frame - item.startFrame),
            fps,
            config: { damping: 12, stiffness: 290, mass: 0.45 },
          });

          let scale = 1;
          let translateY = 0;
          let textColor = "#FFFFFF";
          let textStroke = "2px #09090B";
          let textShadow = "0 4px 16px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.95)";

          if (isActive) {
            scale = interpolate(wordSpring, [0, 1], [0.86, item.isSpecial ? 1.34 : 1.22]);
            translateY = interpolate(wordSpring, [0, 1], [14, 0]);

            // High fashion color palette
            if (item.isSpecial) {
              if (item.word.includes("MATCHA")) {
                textColor = "#88D66C"; // Vibrant Matcha Green
                textShadow = "0 0 25px rgba(136, 214, 108, 0.8), 0 4px 16px rgba(0, 0, 0, 0.9)";
              } else if (item.word.includes("ICE")) {
                textColor = "#38BDF8"; // Electric Ice Cyan
                textShadow = "0 0 25px rgba(56, 189, 248, 0.8), 0 4px 16px rgba(0, 0, 0, 0.9)";
              } else if (item.word.includes("DARN") || item.word.includes("IT!")) {
                textColor = "#FF6B4A"; // Vibrant Coral / Terracotta
                textShadow = "0 0 25px rgba(255, 107, 74, 0.8), 0 4px 16px rgba(0, 0, 0, 0.9)";
              } else {
                textColor = "#D97757"; // Iconic Claude Terracotta
                textShadow = "0 0 25px rgba(217, 119, 87, 0.8), 0 4px 16px rgba(0, 0, 0, 0.9)";
              }
            } else {
              textColor = "#FFE600"; // Warm Amber Gold active pop
              textShadow = "0 0 22px rgba(255, 230, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.9)";
            }
          } else if (isSpoken) {
            scale = 1;
            textColor = "#FFFFFF";
            textStroke = "2px #09090B";
            textShadow = "0 4px 16px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.95)";
          } else {
            // Future word
            scale = 0.95;
            textColor = "rgba(255, 255, 255, 0.55)";
            textStroke = "1.5px rgba(9, 9, 11, 0.6)";
            textShadow = "0 2px 8px rgba(0, 0, 0, 0.7)";
          }

          return (
            <span
              key={`${currentLine.id}_cw_${idx}`}
              style={{
                display: "inline-block",
                fontFamily: item.isSpecial
                  ? "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  : "'Newsreader', 'Georgia', serif",
                fontSize: item.isSpecial ? 62 : 54,
                fontWeight: item.isSpecial ? 900 : 700,
                letterSpacing: item.isSpecial ? "-0.02em" : "-0.01em",
                color: textColor,
                WebkitTextStroke: textStroke,
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "center center",
                textShadow,
                willChange: "transform",
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
