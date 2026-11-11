import React from "react";
import { interpolate } from "remotion";

interface PaintedStrokesProps {
  frame: number;
  variant?: "intro-brush" | "circle-highlight" | "scribble-wave" | "drop-splatter" | "tape-accents";
  color?: string;
  progress?: number;
}

export const PaintedStrokes: React.FC<PaintedStrokesProps> = ({
  frame,
  variant = "intro-brush",
  color = "#D97757",
  progress = 1,
}) => {
  // Animated stroke dashoffset
  const dashLength = 600;
  const strokeDashoffset = interpolate(progress, [0, 1], [dashLength, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (variant === "circle-highlight") {
    return (
      <svg
        viewBox="0 0 400 400"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-6deg)",
          width: 520,
          height: 520,
          pointerEvents: "none",
          zIndex: 35,
        }}
      >
        <path
          d="M 200 40 C 310 40, 370 120, 360 210 C 350 300, 270 370, 180 360 C 90 350, 30 270, 45 180 C 60 90, 130 35, 230 45"
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1200}
          strokeDashoffset={interpolate(progress, [0, 1], [1200, 0])}
          style={{ filter: "drop-shadow(0 4px 12px rgba(217, 119, 87, 0.4))" }}
        />
      </svg>
    );
  }

  if (variant === "scribble-wave") {
    return (
      <svg
        viewBox="0 0 600 120"
        style={{
          position: "absolute",
          bottom: 380,
          left: "50%",
          transform: "translateX(-50%)",
          width: 650,
          height: 100,
          pointerEvents: "none",
          zIndex: 35,
        }}
      >
        <path
          d="M 20 60 Q 80 10, 140 60 T 260 60 T 380 60 T 500 60 T 580 60"
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={800}
          strokeDashoffset={interpolate(progress, [0, 1], [800, 0])}
        />
      </svg>
    );
  }

  if (variant === "tape-accents") {
    return (
      <>
        {/* Top left tape */}
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 100,
            width: 140,
            height: 38,
            backgroundColor: "rgba(217, 119, 87, 0.35)",
            backdropFilter: "blur(4px)",
            transform: "rotate(-12deg)",
            borderLeft: "2px dashed rgba(255,255,255,0.6)",
            borderRight: "2px dashed rgba(255,255,255,0.6)",
            zIndex: 40,
            pointerEvents: "none",
          }}
        />
        {/* Bottom right tape */}
        <div
          style={{
            position: "absolute",
            bottom: 340,
            right: 90,
            width: 150,
            height: 38,
            backgroundColor: "rgba(114, 191, 120, 0.35)",
            backdropFilter: "blur(4px)",
            transform: "rotate(8deg)",
            borderLeft: "2px dashed rgba(255,255,255,0.6)",
            borderRight: "2px dashed rgba(255,255,255,0.6)",
            zIndex: 40,
            pointerEvents: "none",
          }}
        />
      </>
    );
  }

  // Default: Organic thick brush stroke sweep
  return (
    <svg
      viewBox="0 0 600 160"
      style={{
        position: "absolute",
        width: 680,
        height: 180,
        pointerEvents: "none",
        zIndex: 35,
      }}
    >
      <path
        d="M 30 90 C 140 60, 260 110, 390 70 C 470 50, 530 80, 570 75"
        fill="none"
        stroke={color}
        strokeWidth={32}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashLength}
        strokeDashoffset={strokeDashoffset}
        opacity={0.85}
        style={{ filter: "blur(1px)" }}
      />
    </svg>
  );
};
