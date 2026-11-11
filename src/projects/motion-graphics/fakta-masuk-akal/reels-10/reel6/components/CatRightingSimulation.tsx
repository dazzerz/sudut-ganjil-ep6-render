import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const CatRightingSimulation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Vertical fall progression
  // Frames 0 - 1240: Falling from height (Y: 420 -> 980)
  // Frames 1240 - 1800: Landed on floor (Y: 980)
  const catY = interpolate(frame, [0, 1240], [440, 980], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rotation angles for Front and Rear segments
  // Initial: 180° (upside down)
  // Front rotation: starts at frame 733, completes to 0° (upright) by 936
  const frontRotation = interpolate(frame, [733, 936], [180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rear rotation: starts at frame 937, completes to 0° by 1220
  const rearRotation = interpolate(frame, [937, 1220], [180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Landing impact shockwave at frame 1240
  const isLanded = frame >= 1240;
  const landShock = isLanded
    ? interpolate(frame, [1240, 1285], [10, 360], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const landShockOpacity = isLanded
    ? interpolate(frame, [1240, 1285], [0.9, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Vestibular ear sensor glow
  const earPulse =
    frame >= 488 && frame < 733
      ? Math.sin((frame - 488) * 0.3) * 0.4 + 0.6
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: catY,
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        width: 480,
        height: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      {/* 1. Landing Shockwave Ring (Floor contact) */}
      {isLanded && (
        <div
          style={{
            position: "absolute",
            bottom: -60,
            width: landShock * 2,
            height: (landShock * 2) / 3, // Oval perspective on floor
            borderRadius: "50%",
            border: "3px solid #22D3EE",
            boxShadow: "0 0 30px #22D3EE, inset 0 0 20px #22D3EE",
            opacity: landShockOpacity,
          }}
        />
      )}

      {/* 2. Kinematic 3D Biomechanical SVG Cat Model */}
      <svg
        width="440"
        height="440"
        viewBox="-220 -220 440 440"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="catAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Motion Energy Halo */}
        <circle cx="0" cy="0" r="160" fill="url(#catAura)" />

        {/* Waist Bend Pivot Axis (Center) */}
        <circle
          cx="0"
          cy="0"
          r="12"
          fill="#FACC15"
          filter="url(#neonGlowCyan)"
        />
        <circle cx="0" cy="0" r="24" stroke="#FACC15" strokeWidth="2" fill="none" opacity="0.6" />

        {/* ------------------------------------------------------------- */}
        {/* REAR CYLINDER / SEGMENT (HIPS, REAR LEGS, TAIL)               */}
        {/* ------------------------------------------------------------- */}
        <g transform={`rotate(${rearRotation})`}>
          {/* Rear Spine Column */}
          <path
            d="M 0 0 L 80 40 L 130 30"
            stroke="#38BDF8"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Rear Leg 1 & 2 */}
          <path
            d="M 80 40 L 105 110 L 135 125"
            stroke="#22D3EE"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="135" cy="125" r="7" fill="#FACC15" /> {/* Paw */}

          <path
            d="M 70 35 L 90 95 L 115 110"
            stroke="rgba(34, 211, 238, 0.6)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="115" cy="110" r="6" fill="#FACC15" /> {/* Paw */}

          {/* Flexible Tail */}
          <path
            d="M 130 30 Q 180 10 195 -40"
            stroke="#93C5FD"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* FRONT CYLINDER / SEGMENT (CHEST, FRONT LEGS, HEAD, EARS)      */}
        {/* ------------------------------------------------------------- */}
        <g transform={`rotate(${frontRotation})`}>
          {/* Front Spine Column */}
          <path
            d="M 0 0 L -80 -20 L -125 -40"
            stroke="#38BDF8"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cat Head Outline */}
          <circle cx="-135" cy="-45" r="32" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" />

          {/* Cat Ears */}
          <polygon points="-145,-75 -125,-75 -135,-95" fill="#38BDF8" />
          <polygon points="-115,-70 -100,-65 -105,-88" fill="#38BDF8" />

          {/* Vestibular Organ Radar Ping (Frame 488 - 733) */}
          {earPulse > 0 && (
            <circle
              cx="-135"
              cy="-45"
              r={40 + earPulse * 20}
              stroke="#FACC15"
              strokeWidth="2.5"
              fill="none"
              opacity={earPulse}
            />
          )}

          {/* Front Legs (Tucked during frame 733-936, Extended when upright) */}
          <path
            d="M -75 -15 L -95 45 L -115 65"
            stroke="#22D3EE"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="-115" cy="65" r="7" fill="#FACC15" /> {/* Front Paw 1 */}

          <path
            d="M -85 -20 L -105 35 L -125 55"
            stroke="rgba(34, 211, 238, 0.6)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="-125" cy="55" r="6" fill="#FACC15" /> {/* Front Paw 2 */}
        </g>
      </svg>
    </div>
  );
};
