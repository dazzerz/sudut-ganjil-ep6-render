import React, { useMemo } from "react";
import { useCurrentFrame, staticFile, Audio, interpolate, Easing } from "remotion";
import rawSim from "./simData.json";

interface SimFrame {
  f: number;
  phase: string;
  count: number;
  arm1: number;
  arm2: number;
  is_expl: boolean;
  balls: [number, number, number, string, string][]; // [x, y, r, color, glow]
  sparks: { x: number; y: number; c: string }[];
  ripples: { x: number; y: number; r: number; c: string }[];
}

interface SimData {
  total_frames: number;
  frames: SimFrame[];
}

const simData = rawSim as unknown as SimData;
const frames = simData.frames;
export const NEON_CRUSHER_TOTAL_FRAMES = frames.length;

const CX = 540;
const CY = 960;
const ARENA_R = 430;

export const NeonCrusherASMR: React.FC = () => {
  const frame = useCurrentFrame();
  const safeFrame = Math.min(Math.max(0, frame), frames.length - 1);
  const data = frames[safeFrame];

  // Camera zoom during explosion phase (f >= 1020)
  const cameraScale = interpolate(frame, [1015, 1070], [1.0, 0.78], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Arena wall opacity during explosion
  const wallOpacity = interpolate(frame, [1020, 1050], [1.0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wallScale = interpolate(frame, [1020, 1070], [1.0, 1.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // Crusher arms geometry
  const armLen = 350;
  const arm1Angle = data.arm1;
  const arm2Angle = data.arm2;

  // Active phase color styling
  const phaseColors: Record<string, string> = {
    "CYAN DROP": "#00F2FE",
    "MAGENTA PULSE": "#FF2A85",
    "SOLAR WAVE": "#FFE600",
    "LIME MATRIX": "#39FF14",
    "CRYSTAL SWARM": "#A855F7",
    "VORTEX BURST": "#F43F5E",
  };
  const activeColor = phaseColors[data.phase] || "#00F2FE";

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#030407",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
      }}
    >
      {/* Pristine Master Audio */}
      <Audio src={staticFile("audio/neon_crusher_asmr.mp3")} />

      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 540px 960px, #0F172A 0%, #060913 55%, #020305 100%)`,
          opacity: 0.95,
        }}
      />

      {/* Subtle Grid Ambient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.7,
        }}
      />

      {/* Main Physics Arena Container with Camera Transformation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          transform: `scale(${cameraScale})`,
          transformOrigin: "540px 960px",
        }}
      >
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            {/* Glow Filters */}
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="armShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.8" />
            </filter>

            {/* Radial Gradient for Arena Glass Base */}
            <radialGradient id="arenaGlass" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.3" />
              <stop offset="85%" stopColor="#1C2541" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3A506B" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Arena Circular Glass Base */}
          <circle
            cx={CX}
            cy={CY}
            r={ARENA_R}
            fill="url(#arenaGlass)"
            stroke="#1E293B"
            strokeWidth="3"
            style={{
              opacity: wallOpacity,
              transform: `scale(${wallScale})`,
              transformOrigin: `${CX}px ${CY}px`,
            }}
          />

          {/* Arena Outer Glowing Ring Border */}
          <circle
            cx={CX}
            cy={CY}
            r={ARENA_R}
            fill="none"
            stroke={activeColor}
            strokeWidth="3.5"
            filter="url(#neonGlow)"
            style={{
              opacity: wallOpacity * 0.75,
              transform: `scale(${wallScale})`,
              transformOrigin: `${CX}px ${CY}px`,
            }}
          />

          {/* Inner Accent Ring */}
          <circle
            cx={CX}
            cy={CY}
            r={ARENA_R - 12}
            fill="none"
            stroke="#475569"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            style={{
              opacity: wallOpacity * 0.45,
            }}
          />

          {/* Ripples on Wall Bounces */}
          {data.ripples.map((rip, i) => (
            <circle
              key={`rip-${i}`}
              cx={rip.x}
              cy={rip.y}
              r={rip.r}
              fill="none"
              stroke={rip.c}
              strokeWidth="2.5"
              opacity="0.8"
            />
          ))}

          {/* Crusher Robotic Arms */}
          {[
            { angle: arm1Angle, label: "RHYTHM" },
            { angle: arm2Angle, label: "MOTION" },
          ].map((arm, idx) => {
            const tipX = CX + armLen * Math.cos(arm.angle);
            const tipY = CY + armLen * Math.sin(arm.angle);
            const normX = -Math.sin(arm.angle) * 14;
            const normY = Math.cos(arm.angle) * 14;

            const p1 = `${CX - normX * 0.8},${CY - normY * 0.8}`;
            const p2 = `${tipX - normX},${tipY - normY}`;
            const p3 = `${tipX + normX},${tipY + normY}`;
            const p4 = `${CX + normX * 0.8},${CY + normY * 0.8}`;

            return (
              <g key={`arm-${idx}`} filter="url(#armShadow)">
                {/* Arm Body Polygon */}
                <polygon
                  points={`${p1} ${p2} ${p3} ${p4}`}
                  fill="#1E293B"
                  stroke="#475569"
                  strokeWidth="2"
                />

                {/* Neon Indicator Strip along the arm */}
                <line
                  x1={CX + 45 * Math.cos(arm.angle)}
                  y1={CY + 45 * Math.sin(arm.angle)}
                  x2={CX + (armLen - 25) * Math.cos(arm.angle)}
                  y2={CY + (armLen - 25) * Math.sin(arm.angle)}
                  stroke={activeColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#neonGlow)"
                  opacity="0.85"
                />

                {/* Arm Tip Crusher Paddle */}
                <circle
                  cx={tipX}
                  cy={tipY}
                  r="16"
                  fill="#0F172A"
                  stroke={activeColor}
                  strokeWidth="3"
                />
              </g>
            );
          })}

          {/* Central Pivot Gear Hub */}
          <circle cx={CX} cy={CY} r="38" fill="#0B132B" stroke="#475569" strokeWidth="3" />
          <circle cx={CX} cy={CY} r="26" fill="#1E293B" stroke={activeColor} strokeWidth="2.5" />
          <circle cx={CX} cy={CY} r="10" fill="#0F172A" />

          {/* Glowing Balls Rendering */}
          {data.balls.map(([bx, by, br, bcolor, bglow], i) => (
            <g key={`ball-${i}`}>
              {/* Outer soft glow */}
              <circle
                cx={bx}
                cy={by}
                r={br + 2.5}
                fill={bglow}
                opacity="0.35"
              />
              {/* Solid sphere body */}
              <circle
                cx={bx}
                cy={by}
                r={br}
                fill={bcolor}
              />
              {/* Top-left 3D specular highlight */}
              <circle
                cx={bx - br * 0.3}
                cy={by - br * 0.3}
                r={br * 0.35}
                fill="#FFFFFF"
                opacity="0.65"
              />
            </g>
          ))}

          {/* Sparks on Crush Events */}
          {data.sparks.map((sp, i) => (
            <circle
              key={`spark-${i}`}
              cx={sp.x}
              cy={sp.y}
              r="4.5"
              fill={sp.c}
              filter="url(#neonGlow)"
            />
          ))}
        </svg>
      </div>

      {/* Floating Kinetic Typography Header (Safe Zone Top: y ~ 160px) */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: "0.04em",
            color: "#FFFFFF",
            textAlign: "center",
            textTransform: "uppercase",
            textShadow: `0 4px 18px rgba(0,0,0,0.9), 0 0 30px ${activeColor}55`,
            lineHeight: 1.15,
            padding: "0 60px",
          }}
        >
          SETIAP TERGENCET BOLA BERLIPAT
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: activeColor,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          Satu Sentuhan · Suara Memuaskan · Berlipat Warna
        </div>
      </div>

      {/* Floating HUD Footer (Safe Zone Bottom: y ~ 1680px) */}
      <div
        style={{
          position: "absolute",
          bottom: 210,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 90px",
          pointerEvents: "none",
        }}
      >
        {/* Ball Count Live Counter */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: "#94A3B8",
              textTransform: "uppercase",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            JUMLAH BOLA
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              textShadow: `0 4px 14px rgba(0,0,0,0.9), 0 0 20px ${activeColor}66`,
              lineHeight: 1.1,
            }}
          >
            {data.count}
          </div>
        </div>

        {/* Phase Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: activeColor,
              boxShadow: `0 0 16px ${activeColor}`,
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: activeColor,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            {data.phase}
          </div>
        </div>
      </div>
    </div>
  );
};
