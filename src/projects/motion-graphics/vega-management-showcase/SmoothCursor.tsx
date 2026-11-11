import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface SmoothCursorProps {
  x: number;
  y: number;
  isClicked: boolean;
  visible?: boolean;
}

export const SmoothCursor: React.FC<SmoothCursorProps> = ({
  x,
  y,
  isClicked,
  visible = true,
}) => {
  const frame = useCurrentFrame();

  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-2px, -2px)",
      }}
    >
      {/* Click ripple effect */}
      {isClicked && (
        <div
          style={{
            position: "absolute",
            left: 2,
            top: 2,
            width: 32,
            height: 32,
            borderRadius: 16,
            border: "2px solid #7c3aed",
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 0.8,
            boxShadow: "0 0 12px rgba(124, 58, 237, 0.6)",
          }}
        />
      )}

      {/* SVG Modern macOS/Corporate Cursor */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.35))",
          transform: isClicked ? "scale(0.92)" : "scale(1)",
          transition: "transform 0.1s ease",
        }}
      >
        <path
          d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z"
          fill="#111827"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
