import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface EarthGlobeProps {
  size?: number;
  isSpinning?: boolean;
  showEquatorHighlight?: boolean;
  showRotationVectors?: boolean;
  alarmMode?: boolean;
  shockwaveScale?: number;
}

export const EarthGlobe: React.FC<EarthGlobeProps> = ({
  size = 560,
  isSpinning = true,
  showEquatorHighlight = false,
  showRotationVectors = false,
  alarmMode = false,
  shockwaveScale = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continent rotation offset (continuous if spinning, freezes if stopped)
  const rotationOffset = isSpinning ? (frame * 1.8) % 600 : 280;

  // Pulse for equator line
  const equatorGlow = Math.sin(frame * 0.15) * 0.25 + 0.75;

  // Alarm red pulse
  const alarmPulse = alarmMode
    ? Math.sin(frame * 0.35) > 0
      ? 1.0
      : 0.3
    : 0;

  // Gentle float/wobble (secondary motion)
  const floatY = Math.sin((frame / fps) * 2) * 8;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: `translateY(${floatY}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. Atmospheric Outer Glow */}
      <div
        style={{
          position: "absolute",
          width: size * 1.18,
          height: size * 1.18,
          borderRadius: "50%",
          background: alarmMode
            ? `radial-gradient(circle, rgba(239, 68, 68, ${0.4 * alarmPulse}) 40%, rgba(239, 68, 68, 0) 70%)`
            : "radial-gradient(circle, rgba(0, 242, 254, 0.35) 45%, rgba(14, 165, 233, 0.15) 60%, rgba(0, 0, 0, 0) 75%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      {/* 2. Shockwave Blast Ring (when stopped) */}
      {shockwaveScale > 0 && (
        <div
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: "4px solid #FF2E54",
            transform: `scale(${1 + shockwaveScale * 1.8})`,
            opacity: Math.max(0, 1 - shockwaveScale),
            boxShadow: "0 0 35px #FF2E54",
            pointerEvents: "none",
          }}
        />
      )}

      {/* 3. The Earth Sphere Container with Mask */}
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: alarmMode
            ? "0 0 60px rgba(239, 68, 68, 0.7), inset -40px -40px 70px rgba(0, 0, 0, 0.9)"
            : "0 20px 60px rgba(0, 100, 200, 0.4), inset -40px -40px 70px rgba(0, 0, 0, 0.85)",
          border: `2px solid ${alarmMode ? "rgba(239, 68, 68, 0.6)" : "rgba(56, 189, 248, 0.4)"}`,
          background: "linear-gradient(135deg, #0D3A66 0%, #061A33 60%, #020A14 100%)",
        }}
      >
        {/* Ocean Waves / Depth Shading */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 35% 30%, rgba(56, 189, 248, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)",
          }}
        />

        {/* Continents Vector Paths (Stylized Moving SVG) */}
        <svg
          viewBox="0 0 600 600"
          style={{
            position: "absolute",
            width: size * 2,
            height: size,
            left: -rotationOffset,
            top: 0,
          }}
        >
          <g fill={alarmMode ? "#B91C1C" : "#10B981"} opacity={alarmMode ? 0.85 : 0.75}>
            {/* Set 1: Americas & Africa & Eurasia Simplified Vectors */}
            {/* Continent A (Eurasia & Africa shape) */}
            <path d="M 80 140 Q 140 100 220 120 T 320 180 T 280 320 T 210 400 T 150 480 T 120 400 T 140 260 Z" />
            <path d="M 230 180 Q 280 150 330 200 T 350 280 T 290 320 Z" />
            <path d="M 60 280 Q 110 320 120 440 T 70 500 T 40 400 Z" />
            
            {/* Continent B (Americas shape) */}
            <path d="M 380 120 Q 430 110 480 160 T 460 260 T 420 300 T 450 420 T 430 520 T 390 460 T 400 320 T 360 200 Z" />
            <path d="M 470 200 Q 520 220 540 280 T 490 320 Z" />

            {/* Set 2 (Duplicated for seamless loop wrap) */}
            <path d="M 680 140 Q 740 100 820 120 T 920 180 T 880 320 T 810 400 T 750 480 T 720 400 T 740 260 Z" />
            <path d="M 830 180 Q 880 150 930 200 T 950 280 T 890 320 Z" />
            <path d="M 660 280 Q 710 320 720 440 T 670 500 T 640 400 Z" />
            <path d="M 980 120 Q 1030 110 1080 160 T 1060 260 T 1020 300 T 1050 420 T 1030 520 T 990 460 T 1000 320 T 960 200 Z" />
          </g>

          {/* Longitude / Latitude Curved Grid Lines */}
          <g stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.25" fill="none">
            {/* Latitude Parallels */}
            <ellipse cx="300" cy="180" rx="270" ry="60" />
            <ellipse cx="300" cy="300" rx="290" ry="75" />
            <ellipse cx="300" cy="420" rx="270" ry="60" />

            {/* Same on repeat */}
            <ellipse cx="900" cy="180" rx="270" ry="60" />
            <ellipse cx="900" cy="300" rx="290" ry="75" />
            <ellipse cx="900" cy="420" rx="270" ry="60" />
          </g>
        </svg>

        {/* 4. Highlighted Equator Line */}
        {showEquatorHighlight && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: alarmMode ? "#EF4444" : "#FF6B35",
              boxShadow: alarmMode
                ? `0 0 20px #EF4444, 0 0 40px #EF4444`
                : `0 0 24px #FF6B35, 0 0 40px #FF6B35`,
              opacity: equatorGlow,
              transform: "translateY(-50%)",
            }}
          >
            {/* Equator pulsing badge */}
            <div
              style={{
                position: "absolute",
                right: 20,
                top: -14,
                backgroundColor: alarmMode ? "#7F1D1D" : "rgba(11, 19, 37, 0.9)",
                border: `1px solid ${alarmMode ? "#EF4444" : "#FF6B35"}`,
                padding: "2px 8px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: 1,
              }}
            >
              EKUATOR
            </div>
          </div>
        )}

        {/* 5. 3D Spherical Specular Light Reflex */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 30,
            width: size * 0.45,
            height: size * 0.35,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 35% 35%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
            pointerEvents: "none",
          }}
        />

        {/* 6. Dark Shadow on the right side (Day / Night Terminator) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.85) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* 7. Supersonic Rotation Arrows (Around the globe) */}
      {showRotationVectors && (
        <svg
          style={{
            position: "absolute",
            width: size * 1.35,
            height: size * 0.6,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          viewBox="0 0 760 340"
        >
          <defs>
            <marker
              id="arrowHead"
              markerWidth="10"
              markerHeight="10"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L9,3 z" fill={alarmMode ? "#EF4444" : "#00F2FE"} />
            </marker>
          </defs>

          {/* Kinetic Orbit Arc */}
          <path
            d="M 60 170 Q 380 290 700 170"
            fill="none"
            stroke={alarmMode ? "#EF4444" : "#00F2FE"}
            strokeWidth="3.5"
            strokeDasharray="16 10"
            strokeDashoffset={-frame * 6}
            markerEnd="url(#arrowHead)"
            filter="drop-shadow(0 0 10px #00F2FE)"
          />
        </svg>
      )}
    </div>
  );
};
