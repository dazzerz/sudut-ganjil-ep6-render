import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

interface Ep5RewindProps {
  startFrame: number;
  durationFrames?: number;
  label: string;
  subLabel: string;
  direction?: "rewind" | "forward";
}

// Cassette rewind / fast-forward transition. A VHS wash, scanlines, glitch bands and a
// counting tape counter; the label floats on the canvas with hairlines instead of a box.
export const Ep5Rewind: React.FC<Ep5RewindProps> = ({
  startFrame,
  durationFrames = 48,
  label,
  subLabel,
  direction = "rewind",
}) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;
  if (rel < 0 || rel > durationFrames) return null;

  const wash = interpolate(rel, [0, 14, durationFrames - 16, durationFrames], [0, 0.92, 0.92, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textIn = interpolate(rel, [8, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const textOut = interpolate(rel, [durationFrames - 14, durationFrames - 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sign = direction === "rewind" ? -1 : 1;
  const counter = Math.max(0, 1208 + sign * rel * 17);
  const mm = String(Math.floor(counter / 60)).padStart(2, "0");
  const ss = String(Math.floor(counter % 60)).padStart(2, "0");

  const bands = [0, 1, 2, 3].map((i) => {
    const y = ((rel * (28 + i * 11) + i * 270) % 1180) - 60;
    const shift = Math.sin(rel * 0.9 + i * 2.1) * 46;
    return { y, shift, h: 36 + i * 22, i };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 55,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#0A0A12", opacity: wash }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: wash * 0.55,
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.09) 0px, rgba(255,255,255,0.09) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 6px)",
        }}
      />
      {bands.map((b) => (
        <div
          key={b.i}
          style={{
            position: "absolute",
            top: b.y,
            left: b.shift,
            right: -b.shift,
            height: b.h,
            opacity: wash * 0.5,
            background:
              b.i % 2 === 0
                ? "linear-gradient(to bottom, rgba(0,242,254,0), rgba(0,242,254,0.55), rgba(0,242,254,0))"
                : "linear-gradient(to bottom, rgba(255,94,87,0), rgba(255,94,87,0.45), rgba(255,94,87,0))",
            mixBlendMode: "screen",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: textIn * textOut,
          scale: String(interpolate(textIn, [0, 1], [0.94, 1])),
        }}
      >
        <div style={{ width: 760 * textIn, height: 2, backgroundColor: "#00F2FE", marginBottom: 26 }} />
        <div
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 74,
            fontWeight: 900,
            letterSpacing: 8,
            color: "#00F2FE",
            WebkitTextStroke: "6px #000",
            paintOrder: "stroke fill",
            textShadow: "0 0 34px rgba(0,242,254,0.7)",
          }}
        >
          {label}
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: "'Courier New', monospace",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 5,
            color: "#FFFFFF",
            textShadow: "0 3px 12px rgba(0,0,0,0.95)",
          }}
        >
          {subLabel}
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: "'Courier New', monospace",
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: 6,
            color: "#FFE600",
            textShadow: "0 3px 12px rgba(0,0,0,0.95)",
          }}
        >
          {mm}:{ss}
        </div>
        <div style={{ width: 760 * textIn, height: 2, backgroundColor: "#00F2FE", marginTop: 26 }} />
      </div>
    </div>
  );
};
