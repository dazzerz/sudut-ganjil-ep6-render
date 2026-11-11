import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const SolarRandomWalkSimulation: React.FC = () => {
  const frame = useCurrentFrame();

  const sunCenterX = 540;
  const sunCenterY = 960;

  const isEscaped = frame > 1250;

  // Photon position simulation
  // Inside sun (frames 0 to 1250): random walk drift from center outwards
  const driftRadius = interpolate(frame, [0, 1250], [0, 420], {
    extrapolateRight: "clamp",
  });
  // Deterministic high-frequency chaotic scattering
  const scatterAngle = (frame * 13.7) % (Math.PI * 2);
  const scatterJitter = Math.sin(frame * 0.8) * 35;

  const photonX = isEscaped
    ? sunCenterX + 420 + (frame - 1250) * 18
    : sunCenterX + Math.cos(scatterAngle) * (driftRadius + scatterJitter);

  const photonY = isEscaped
    ? sunCenterY - (frame - 1250) * 22
    : sunCenterY + Math.sin(scatterAngle) * (driftRadius + scatterJitter);

  // Escaped light beam length
  const beamLength = isEscaped
    ? interpolate(frame - 1250, [0, 60], [0, 1600], {
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#030408",
      }}
    >
      {/* Deep Space Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, #150800 0%, #050208 70%, #000000 100%)",
        }}
      />

      {/* SVG Solar Layers & Random Walk Trail */}
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
          <filter id="solarGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="25" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="photonSpark" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Photosphere Corona Glow */}
        <circle
          cx={sunCenterX}
          cy={sunCenterY}
          r={440}
          fill="none"
          stroke="rgba(255, 149, 0, 0.4)"
          strokeWidth="30"
          filter="url(#solarGlow)"
        />

        {/* Convective Zone Layer */}
        <circle
          cx={sunCenterX}
          cy={sunCenterY}
          r={420}
          fill="rgba(255, 69, 0, 0.15)"
          stroke="rgba(255, 149, 0, 0.3)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* Radiative Zone Layer */}
        <circle
          cx={sunCenterX}
          cy={sunCenterY}
          r={280}
          fill="rgba(255, 165, 0, 0.2)"
          stroke="rgba(255, 230, 0, 0.4)"
          strokeWidth="2"
        />

        {/* Solar Core */}
        <circle
          cx={sunCenterX}
          cy={sunCenterY}
          r={110}
          fill="rgba(255, 255, 255, 0.85)"
          filter="url(#solarGlow)"
        />
        <circle
          cx={sunCenterX}
          cy={sunCenterY}
          r={90}
          fill="#FFFFFF"
        />

        {/* Random Walk Scattering Particles (Plasma Nuclei) */}
        {Array.from({ length: 30 }).map((_, i) => {
          const a = (i * 0.209 + frame * 0.005);
          const r = 120 + ((i * 47) % 290);
          const px = sunCenterX + Math.cos(a) * r;
          const py = sunCenterY + Math.sin(a) * r;
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={3}
              fill="rgba(255, 200, 100, 0.5)"
            />
          );
        })}

        {/* Escaped High-Speed Laser Beam to Earth */}
        {isEscaped && beamLength > 0 && (
          <line
            x1={sunCenterX + 420}
            y1={sunCenterY}
            x2={sunCenterX + 420 + beamLength * 0.6}
            y2={sunCenterY - beamLength * 0.8}
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#solarGlow)"
          />
        )}

        {/* The Photon Itself (Blazing White/Gold Spark) */}
        <g transform={`translate(${photonX}, ${photonY})`} filter="url(#photonSpark)">
          <circle cx={0} cy={0} r={14} fill="#FFE600" />
          <circle cx={0} cy={0} r={7} fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
