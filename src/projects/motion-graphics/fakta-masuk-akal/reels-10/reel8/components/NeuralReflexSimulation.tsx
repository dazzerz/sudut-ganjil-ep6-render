import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const NeuralReflexSimulation: React.FC = () => {
  const frame = useCurrentFrame();

  const isWaking = frame > 1150;
  const isSneezing = frame > 1250;

  // Synapse pulse cycle
  const pulse = (Math.sin(frame * 0.25) + 1) / 2;

  // Sneeze shockwave expansion
  const shockwaveRadius = isSneezing
    ? interpolate(frame - 1250, [0, 45], [20, 400], {
        extrapolateRight: "clamp",
      })
    : 0;
  const shockwaveOpacity = isSneezing
    ? interpolate(frame - 1250, [0, 10, 45], [0, 0.9, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#030712",
      }}
    >
      {/* 3D Brain Base Plate */}
      <Img
        src={staticFile("images/fakta-reels/reel1/scene1_neural_brain.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.65) contrast(1.15)",
          transform: `scale(${interpolate(frame, [0, 1800], [1.02, 1.08])})`,
        }}
      />

      {/* Deep atmosphere gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(3, 7, 18, 0.3) 0%, rgba(3, 7, 18, 0.85) 80%)",
        }}
      />

      {/* SVG Neural Signaling & Sneeze Reflex Arc */}
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
          <filter id="neuralGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Trigeminal Nerve (CN V) Afferent Pathway - From nasal area (top-left) to brainstem */}
        <path
          d="M 320,680 Q 420,780 540,880"
          fill="none"
          stroke="#FFE600"
          strokeWidth="4"
          strokeDasharray="8 6"
          strokeDashoffset={-frame * 3}
          filter="url(#neuralGlow)"
        />

        {/* Brainstem / Pons Synaptic Center */}
        <circle
          cx={540}
          cy={880}
          r={28 + pulse * 6}
          fill="rgba(0, 240, 255, 0.25)"
          stroke="#00F0FF"
          strokeWidth="3"
          filter="url(#neuralGlow)"
        />
        <circle cx={540} cy={880} r={10} fill="#FFFFFF" />

        {/* GABA / Glycine Inhibitory Cloud surrounding brainstem during REM */}
        {!isSneezing && (
          <circle
            cx={540}
            cy={880}
            r={110 + Math.sin(frame * 0.1) * 15}
            fill="none"
            stroke="rgba(168, 85, 247, 0.45)"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeDashoffset={frame * 2}
          />
        )}

        {/* Motor Efferent Pathway to Diaphragm & Facial Muscles */}
        <path
          d="M 540,880 Q 560,1050 540,1250"
          fill="none"
          stroke={isSneezing ? "#00FF66" : isWaking ? "#FFE600" : "rgba(255, 59, 48, 0.4)"}
          strokeWidth={isSneezing ? 6 : 3}
          strokeDasharray={isSneezing ? "none" : "6 6"}
          filter="url(#neuralGlow)"
        />

        {/* Sneeze Explosive Shockwave Ring */}
        {shockwaveRadius > 0 && (
          <circle
            cx={540}
            cy={880}
            r={shockwaveRadius}
            fill="none"
            stroke="#00FF66"
            strokeWidth="6"
            opacity={shockwaveOpacity}
            filter="url(#neuralGlow)"
          />
        )}

        {/* Floating Synaptic Vesicles / Action Potentials */}
        {Array.from({ length: 18 }).map((_, i) => {
          const px = (i * 59 + frame * 1.5) % 1080;
          const py = ((i * 103 + frame * 2.2) % 1920);
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={3}
              fill={i % 2 === 0 ? "#00F0FF" : "#FFE600"}
              opacity={0.4}
            />
          );
        })}
      </svg>
    </div>
  );
};
