import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const WaterCrystallizationSimulation: React.FC = () => {
  const frame = useCurrentFrame();

  const isFreezing = frame > 1100;
  const iceSpread = interpolate(frame, [1100, 1500], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#020813",
      }}
    >
      {/* Base 3D Cold/Freezing Environment Plate */}
      <Img
        src={staticFile("images/fakta-reels/reel2/scene1_ice_drink.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.6) contrast(1.15) hue-rotate(-15deg)",
          transform: `scale(${interpolate(frame, [0, 1800], [1.02, 1.08])})`,
        }}
      />

      {/* Atmospheric vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(2, 8, 19, 0.3) 0%, rgba(2, 8, 19, 0.85) 80%)",
        }}
      />

      {/* Procedural Molecular H2O & Ice Crystal Lattice Overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id="iceGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rayleigh-Bénard Convection Loop (Center upward, sides downward) */}
        {!isFreezing && (
          <g opacity={0.65}>
            {/* Left circulation loop */}
            <path
              d="M 380,820 Q 330,950 380,1080 Q 450,1080 450,950 Q 450,820 380,820"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              strokeDashoffset={-frame * 2.5}
            />
            {/* Right circulation loop */}
            <path
              d="M 700,820 Q 750,950 700,1080 Q 630,1080 630,950 Q 630,820 700,820"
              fill="none"
              stroke="#FF3B30"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              strokeDashoffset={-frame * 2.5}
            />
            {/* Convection label */}
            <text
              x={540}
              y={960}
              fill="#FFFFFF"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="0.08em"
            >
              ▲ CEPAT MENGUAPKAN KALOR ▲
            </text>
          </g>
        )}

        {/* H2O Molecular Nodes */}
        {/* Central Water Molecule 1 */}
        <g transform="translate(540, 1020)">
          {/* Oxygen */}
          <circle cx={0} cy={0} r={18} fill="#FF3B30" filter="url(#iceGlow)" />
          {/* Hydrogens */}
          <line x1={0} y1={0} x2={-32} y2={-22} stroke="#FFFFFF" strokeWidth="4" />
          <circle cx={-32} cy={-22} r={10} fill="#FFFFFF" />
          <line x1={0} y1={0} x2={32} y2={-22} stroke="#FFFFFF" strokeWidth="4" />
          <circle cx={32} cy={-22} r={10} fill="#FFFFFF" />
        </g>

        {/* Surrounding Hydrogen-Bonded Molecules */}
        <g transform="translate(420, 940)">
          <circle cx={0} cy={0} r={14} fill="#FF3B30" />
          <line x1={0} y1={0} x2={-22} y2={-16} stroke="#FFFFFF" strokeWidth="3" />
          <circle cx={-22} cy={-16} r={8} fill="#FFFFFF" />
          <line x1={0} y1={0} x2={22} y2={-16} stroke="#FFFFFF" strokeWidth="3" />
          <circle cx={22} cy={-16} r={8} fill="#FFFFFF" />
          {/* Hydrogen bond connector */}
          <line x1={22} y1={-16} x2={88} y2={58} stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 4" />
        </g>

        <g transform="translate(660, 940)">
          <circle cx={0} cy={0} r={14} fill="#FF3B30" />
          <line x1={0} y1={0} x2={-22} y2={-16} stroke="#FFFFFF" strokeWidth="3" />
          <circle cx={-22} cy={-16} r={8} fill="#FFFFFF" />
          <line x1={0} y1={0} x2={22} y2={-16} stroke="#FFFFFF" strokeWidth="3" />
          <circle cx={22} cy={-16} r={8} fill="#FFFFFF" />
          {/* Hydrogen bond connector */}
          <line x1={-22} y1={-16} x2={-88} y2={58} stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 4" />
        </g>

        {/* Hexagonal Ice Crystal Lattice Frost Spread when freezing */}
        {iceSpread > 0 && (
          <g filter="url(#iceGlow)" opacity={iceSpread}>
            {/* Hexagon 1 */}
            <polygon
              points="540,680 600,715 600,785 540,820 480,785 480,715"
              fill="rgba(0, 240, 255, 0.15)"
              stroke="#00F0FF"
              strokeWidth="3.5"
            />
            {/* Hexagon 2 */}
            <polygon
              points="660,750 720,785 720,855 660,890 600,855 600,785"
              fill="rgba(0, 240, 255, 0.15)"
              stroke="#00F0FF"
              strokeWidth="3.5"
            />
            {/* Hexagon 3 */}
            <polygon
              points="420,750 480,785 480,855 420,890 360,855 360,785"
              fill="rgba(0, 240, 255, 0.15)"
              stroke="#00F0FF"
              strokeWidth="3.5"
            />
            <text
              x={540}
              y={755}
              fill="#00FFFF"
              fontSize="18"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.1em"
            >
              ❄ KRISTALISASI ES HEXAGONAL ❄
            </text>
          </g>
        )}

        {/* Ambient Steam / Thermal Vapor Floating Up */}
        {Array.from({ length: 20 }).map((_, i) => {
          const vx = (i * 53 + frame * 0.8) % 1080;
          const vy = 1920 - ((i * 97 + frame * 4.5) % 1920);
          return (
            <circle
              key={i}
              cx={vx}
              cy={vy}
              r={i % 3 === 0 ? 4 : 2}
              fill="#FFFFFF"
              opacity={0.3}
            />
          );
        })}
      </svg>
    </div>
  );
};
