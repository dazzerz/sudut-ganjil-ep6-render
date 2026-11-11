import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

interface ClaudeSparkProps {
  frame: number;
  size?: number;
  color?: string;
  glow?: boolean;
  rotationOffset?: number;
  is3D?: boolean;
  tiltX?: number;
  tiltY?: number;
  pulseOnBeat?: boolean;
}

export const ClaudeSpark: React.FC<ClaudeSparkProps> = ({
  frame,
  size = 180,
  color = "#D97757",
  glow = false,
  rotationOffset = 0,
  is3D = false,
  tiltX = 0,
  tiltY = 0,
  pulseOnBeat = true,
}) => {
  const { fps } = useVideoConfig();

  // 100 BPM beat pulse: 1 beat = 18 frames
  const beatPhase = (frame % 18 + 18) % 18;
  const beatScale = pulseOnBeat
    ? interpolate(beatPhase, [0, 3, 10, 17], [1.08, 1.04, 1.0, 1.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1.0;

  // Continuous subtle spin
  const rotation = rotationOffset + frame * 0.4;

  // 8 Rays around the center (0 to 315 deg, in 45 deg increments)
  // Standard Claude spark ray coordinates
  const numRays = 8;
  const rayAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  // Alternating ray lengths for the organic Claude sunburst feel
  const rayLengths = [44, 34, 44, 34, 44, 34, 44, 34];
  const rayWidth = 14;

  const center = 100;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: is3D
          ? `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${rotation}deg) scale(${beatScale})`
          : `rotate(${rotation}deg) scale(${beatScale})`,
        transformOrigin: "center center",
        filter: glow ? `drop-shadow(0 0 20px ${color}88)` : "none",
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{ overflow: "visible" }}
      >
        {/* Center dot/core */}
        <circle cx={center} cy={center} r={16} fill={color} />

        {/* 8 Radiating Rounded Petals/Rays */}
        {rayAngles.map((angle, i) => {
          const length = rayLengths[i];
          const rad = (angle * Math.PI) / 180;
          const startDist = 20;
          const endDist = startDist + length;

          const x1 = center + Math.cos(rad) * startDist;
          const y1 = center + Math.sin(rad) * startDist;
          const x2 = center + Math.cos(rad) * endDist;
          const y2 = center + Math.sin(rad) * endDist;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth={rayWidth}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
};
