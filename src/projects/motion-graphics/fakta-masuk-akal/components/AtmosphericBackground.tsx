import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface Props {
  isAlarm?: boolean;
  atmosphereLoss?: number; // 0 (normal) to 1 (full oxygen loss)
}

export const AtmosphericBackground: React.FC<Props> = ({
  isAlarm = false,
  atmosphereLoss = 0,
}) => {
  const frame = useCurrentFrame();

  // Gentle continuous camera drift
  const driftY = Math.sin(frame * 0.02) * 15;
  const driftX = Math.cos(frame * 0.015) * 10;

  // Background particles (Oxygen molecules O2 floating)
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      x: ((i * 137.5) % 1000) + 40,
      y: ((i * 223.7) % 1800) + 60,
      size: 14 + (i % 5) * 6,
      speed: 0.6 + (i % 4) * 0.4,
      opacity: 0.25 + (i % 3) * 0.2,
      isDoubleMolecule: i % 2 === 0,
    }));
  }, []);

  // Bright energetic background gradients
  // Normal: Radiant bright cream + vibrant cyan sky + solar warm highlights
  // Loss: Shifted towards intense solar amber and high-contrast ultraviolet alert
  const bgGradient = useMemo(() => {
    if (isAlarm) {
      return "radial-gradient(circle at 50% 35%, #FFF0F0 0%, #FFE2E2 40%, #FFCDD2 85%, #EF9A9A 100%)";
    }
    if (atmosphereLoss > 0.5) {
      return "radial-gradient(circle at 50% 30%, #FFFDE7 0%, #FFF9C4 35%, #E1F5FE 75%, #B3E5FC 100%)";
    }
    return "radial-gradient(circle at 50% 25%, #FFFFFF 0%, #F0FDF4 30%, #E0F7FA 70%, #FFF8E1 100%)";
  }, [isAlarm, atmosphereLoss]);

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        overflow: "hidden",
        transform: `translate(${driftX}px, ${driftY}px)`,
      }}
    >
      {/* Dynamic Atmospheric Subtle Wave Grid */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          opacity: 0.18,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern
            id="atmGrid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="40" cy="40" r="1.5" fill="#00838F" />
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#0097A7"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#atmGrid)" />
      </svg>

      {/* Floating Oxygen Molecules (O2) */}
      {particles.map((p, idx) => {
        const floatY = (p.y - frame * p.speed * 1.5) % 1920;
        const currentY = floatY < -50 ? floatY + 1970 : floatY;
        const pulse = 1 + Math.sin((frame + idx * 20) * 0.05) * 0.12;

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: p.x,
              top: currentY,
              opacity: p.opacity * (1 - atmosphereLoss * 0.6),
              transform: `scale(${pulse})`,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* O atom 1 */}
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: isAlarm
                  ? "linear-gradient(135deg, #FF5252, #FF1744)"
                  : "linear-gradient(135deg, #00E5FF, #00B0FF)",
                boxShadow: isAlarm
                  ? "0 0 12px rgba(255, 23, 68, 0.4)"
                  : "0 0 12px rgba(0, 229, 255, 0.4)",
              }}
            />
            {p.isDoubleMolecule && (
              <>
                {/* Double bond */}
                <div
                  style={{
                    width: p.size * 0.4,
                    height: 3,
                    backgroundColor: isAlarm ? "#FF8A80" : "#80D8FF",
                    borderRadius: 2,
                  }}
                />
                {/* O atom 2 */}
                <div
                  style={{
                    width: p.size,
                    height: p.size,
                    borderRadius: "50%",
                    background: isAlarm
                      ? "linear-gradient(135deg, #FF5252, #FF1744)"
                      : "linear-gradient(135deg, #00E5FF, #00B0FF)",
                    boxShadow: isAlarm
                      ? "0 0 12px rgba(255, 23, 68, 0.4)"
                      : "0 0 12px rgba(0, 229, 255, 0.4)",
                  }}
                />
              </>
            )}
          </div>
        );
      })}

      {/* Atmospheric Glow Rings */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          width: 820,
          height: 820,
          marginLeft: -410,
          borderRadius: "50%",
          background: isAlarm
            ? "radial-gradient(circle, rgba(255, 82, 82, 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0, 229, 255, 0.22) 0%, rgba(255, 215, 64, 0.15) 45%, transparent 75%)",
          filter: "blur(35px)",
          transform: `scale(${1 + Math.sin(frame * 0.04) * 0.08})`,
        }}
      />
    </AbsoluteFill>
  );
};
