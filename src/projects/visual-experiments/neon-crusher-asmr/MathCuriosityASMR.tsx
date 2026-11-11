import React from "react";
import { useCurrentFrame, staticFile, Audio, interpolate, Easing } from "remotion";
import rawData from "./mathCuriosityData.json";

interface SimFrame {
  f: number;
  n: number;
  target_balls: number;
  ball_count: number;
  total_bounces: number;
  stress: number;
  is_shattered: boolean;
  active_color: string;
  note_name: string;
  freq_hz: number;
  status_text: string;
  is_pattern_interrupt: boolean;
  balls: [number, number, number, number, number][]; // [x, y, vx, vy, color_idx]
  shockwaves: [number, number, number, number, string][]; // [x, y, r, alpha, col]
  shards: [number, number, number, number, number, string][]; // [x, y, size, rot, alpha, col]
}

interface SimDataset {
  total_frames: number;
  frames: SimFrame[];
}

const simDataset = rawData as unknown as SimDataset;
const frames = simDataset.frames;
export const MATH_CURIOSITY_TOTAL_FRAMES = frames.length;

const CX = 540;
const CY = 980;
const CONTAINER_R = 380;

const BALL_PALETTE = [
  "#00F2FE", // Cyan
  "#38EF7D", // Emerald
  "#FFE600", // Solar Yellow
  "#FF7E00", // Amber
  "#FF007F", // Magenta
  "#E040FB", // Orchid
  "#7C4DFF", // Purple
  "#00E5FF", // Electric Blue
  "#00FF85", // Spring Lime
  "#FF1744", // Crimson
  "#FFFFFF", // Pure White
];

export const MathCuriosityASMR: React.FC = () => {
  const frame = useCurrentFrame();
  const safeFrame = Math.min(Math.max(0, frame), frames.length - 1);
  const data = frames[safeFrame];

  // Screen shake during final shatter (f >= 725)
  const isShatterShake = frame >= 725 && frame <= 750;
  const shakeIntensity = isShatterShake ? 20 : data.is_pattern_interrupt ? 6 : 0;
  const shakeX = shakeIntensity * Math.sin(frame * 2.8);
  const shakeY = shakeIntensity * Math.cos(frame * 3.4);

  // Camera scale out during final climax
  const cameraScale = interpolate(frame, [720, 750], [1.0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Radian marks
  const radianMarks = [
    { label: "0 / 2π", ang: 0 },
    { label: "π/4", ang: Math.PI / 4 },
    { label: "π/2", ang: Math.PI / 2 },
    { label: "3π/4", ang: (3 * Math.PI) / 4 },
    { label: "π", ang: Math.PI },
    { label: "5π/4", ang: (5 * Math.PI) / 4 },
    { label: "3π/2", ang: (3 * Math.PI) / 2 },
    { label: "7π/4", ang: (7 * Math.PI) / 4 },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#020306",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
      }}
    >
      {/* Retention-Engineered Continuous Crystal & Climax Audio */}
      <Audio src={staticFile("audio/math_curiosity_asmr.mp3")} />

      {/* Deep Cyber Radial Ambience with Active Thermal Energy */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 540px 980px, ${data.active_color}25 0%, #060914 45%, #010204 100%)`,
          opacity: 0.98,
        }}
      />

      {/* Second 8.5 Pattern Interrupt Warning Red Flash Vignette */}
      {data.is_pattern_interrupt && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boxShadow: "inset 0 0 160px #FF1744",
            backgroundColor: "rgba(255, 23, 68, 0.12)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}

      {/* Precision Mathematical Coordinate Grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          opacity: 0.7,
        }}
      />

      {/* Physics World Container with Screen Shake and Camera Scale */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${cameraScale})`,
          transformOrigin: "540px 980px",
        }}
      >
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            {/* Multi-stage Neon Glow */}
            <filter id="curiosityGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="ringBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="g1" />
              <feMerge>
                <feMergeNode in="g1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Mathematical Polar Axes */}
          {!data.is_shattered && (
            <g opacity="0.35">
              <line x1={CX - CONTAINER_R - 30} y1={CY} x2={CX + CONTAINER_R + 30} y2={CY} stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1={CX} y1={CY - CONTAINER_R - 30} x2={CX} y2={CY + CONTAINER_R + 30} stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx={CX} cy={CY} r="6" fill="#64748B" />
            </g>
          )}

          {/* 2. The Polar Stress Pressure Ring */}
          {!data.is_shattered && (
            <g filter="url(#ringBloom)">
              {/* Outer Glow Ring */}
              <circle
                cx={CX}
                cy={CY}
                r={CONTAINER_R + 6}
                fill="none"
                stroke={data.active_color}
                strokeWidth="4"
                strokeOpacity={0.25 + data.stress * 0.55}
              />

              {/* Main Structural Glass Ring */}
              <circle
                cx={CX}
                cy={CY}
                r={CONTAINER_R}
                fill="rgba(15, 23, 42, 0.3)"
                stroke={data.active_color}
                strokeWidth="8"
                strokeOpacity="0.95"
              />

              {/* Radian Precision Ticks & Labels */}
              {radianMarks.map((rm, idx) => {
                const x1 = CX + (CONTAINER_R - 14) * Math.cos(rm.ang);
                const y1 = CY + (CONTAINER_R - 14) * Math.sin(rm.ang);
                const x2 = CX + (CONTAINER_R + 8) * Math.cos(rm.ang);
                const y2 = CY + (CONTAINER_R + 8) * Math.sin(rm.ang);
                const tx = CX + (CONTAINER_R + 34) * Math.cos(rm.ang);
                const ty = CY + (CONTAINER_R + 34) * Math.sin(rm.ang) + 4;

                return (
                  <g key={`rad-${idx}`}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94A3B8" strokeWidth="2" strokeOpacity="0.8" />
                    <text
                      x={tx}
                      y={ty}
                      fill="#94A3B8"
                      fontSize="14"
                      fontWeight="700"
                      textAnchor="middle"
                      opacity="0.85"
                    >
                      {rm.label}
                    </text>
                  </g>
                );
              })}

              {/* Stress Fracture Cracks (dynamic branching based on stress level) */}
              {data.stress > 0.35 && (
                <g stroke="#FFFFFF" strokeWidth="2.5" opacity={data.stress} filter="url(#curiosityGlow)">
                  <path d={`M ${CX - CONTAINER_R + 15} ${CY - 50} l 45 -25 l 35 15 l 50 -10`} fill="none" />
                  <path d={`M ${CX + CONTAINER_R - 15} ${CY + 60} l -55 30 l -40 -15 l -45 25`} fill="none" />
                </g>
              )}
              {data.stress > 0.65 && (
                <g stroke="#FF7E00" strokeWidth="3" opacity="0.9" filter="url(#curiosityGlow)">
                  <path d={`M ${CX - 120} ${CY + CONTAINER_R - 20} l 35 -45 l 50 15 l 30 -35`} fill="none" />
                  <path d={`M ${CX + 140} ${CY - CONTAINER_R + 25} l -40 40 l -25 -20 l -45 30`} fill="none" />
                </g>
              )}
              {data.stress > 0.88 && (
                <g stroke="#FF1744" strokeWidth="3.5" opacity="0.98" filter="url(#curiosityGlow)">
                  <path d={`M ${CX - 80} ${CY - CONTAINER_R + 10} l 30 65 l -40 35 l 55 40`} fill="none" />
                  <path d={`M ${CX + 90} ${CY + CONTAINER_R - 15} l -35 -70 l 45 -30 l -50 -45`} fill="none" />
                </g>
              )}
            </g>
          )}

          {/* 3. Kinetic Impact Shockwaves */}
          {data.shockwaves.map(([swx, swy, swr, swa, swcol], swidx) => (
            <circle
              key={`shockwave-${swidx}`}
              cx={swx}
              cy={swy}
              r={swr}
              fill="none"
              stroke={swcol}
              strokeWidth="3.2"
              opacity={swa}
              filter="url(#curiosityGlow)"
            />
          ))}

          {/* 4. Glass Shards from Shattered Rings (Rendered when destroyed!) */}
          {data.is_shattered &&
            data.shards.map(([sx, sy, size, rot, alpha, col], idx) => (
              <polygon
                key={`shard-${idx}`}
                points={`0,-${size} ${size * 0.6},${size * 0.5} -${size * 0.6},${size * 0.5}`}
                transform={`translate(${sx}, ${sy}) rotate(${rot})`}
                fill={col}
                stroke="#FFFFFF"
                strokeWidth="2"
                opacity={alpha}
                filter="url(#curiosityGlow)"
              />
            ))}

          {/* 5. The Mathematical Balls Swarm */}
          {data.balls.map(([bx, by, vx, vy, colorIdx], bidx) => {
            const bcol = BALL_PALETTE[colorIdx % BALL_PALETTE.length];
            return (
              <g key={`curiosity-ball-${bidx}`} transform={`translate(${bx}, ${by})`}>
                <circle cx="0" cy="0" r="22" fill={bcol} opacity="0.4" filter="url(#curiosityGlow)" />
                <circle cx="0" cy="0" r="12" fill={bcol} stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
                <circle cx="-3" cy="-3" r="2" fill="#FFFFFF" opacity="0.95" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Kinetic Typography & Challenge Hook (Top Safe Zone: y ~135px) */}
      <div
        style={{
          position: "absolute",
          top: 135,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        {/* Main Curiosity Question Hook */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: "0.06em",
            color: "#FFFFFF",
            textAlign: "center",
            textTransform: "uppercase",
            textShadow: `0 4px 20px rgba(0,0,0,0.95), 0 0 35px ${data.active_color}88`,
            lineHeight: 1.15,
            padding: "0 60px",
          }}
        >
          BISAKAH BERTAHAN SAMPAI LEVEL 12?
        </div>

        {/* Audience Challenge Subtitle */}
        <div
          style={{
            marginTop: 8,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: data.is_pattern_interrupt ? "#FF1744" : "#FFE600",
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          {data.is_pattern_interrupt
            ? "PERINGATAN KRITIS: SUHU MELONJAK DRASIS!"
            : "99% Penonton Mengira Pecah di Level 7"}
        </div>

        {/* Live Mathematical Formula Callout */}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            textShadow: `0 2px 14px rgba(0,0,0,0.9), 0 0 25px ${data.active_color}`,
          }}
        >
          <span
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.04em",
            }}
          >
            N(n) = n²
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: data.active_color,
              letterSpacing: "0.06em",
            }}
          >
            ➔ {data.n}² = {data.ball_count} BOLA
          </span>
        </div>

        {/* Structural Stress Gauge Bar */}
        <div
          style={{
            marginTop: 16,
            width: 640,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "#94A3B8",
              marginBottom: 5,
            }}
          >
            <span>STATUS TEGANGAN: {data.status_text}</span>
            <span style={{ color: data.is_shattered ? "#FF1744" : data.active_color, fontWeight: 900 }}>
              {data.is_shattered ? "PECAH DI LEVEL 10!" : `${Math.round(data.stress * 100)}%`}
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: 10,
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              borderRadius: 5,
              overflow: "hidden",
              border: `1.5px solid ${data.is_shattered ? "#FF1744" : "#475569"}`,
            }}
          >
            <div
              style={{
                width: data.is_shattered ? "100%" : `${Math.min(100, data.stress * 100)}%`,
                height: "100%",
                backgroundColor: data.is_shattered ? "#FF1744" : data.active_color,
                boxShadow: `0 0 16px ${data.active_color}`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating HUD Footer (Bottom Safe Zone: y ~1710px) */}
      <div
        style={{
          position: "absolute",
          bottom: 210,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 80px",
          pointerEvents: "none",
        }}
      >
        {/* Total Balls Count (n^2) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "#94A3B8",
              textTransform: "uppercase",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            POPULASI BOLA
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              textShadow: `0 4px 14px rgba(0,0,0,0.9), 0 0 25px ${data.active_color}88`,
              lineHeight: 1.1,
            }}
          >
            {data.ball_count}{" "}
            <span style={{ fontSize: 24, fontWeight: 700, color: data.active_color }}>
              ({data.n}²)
            </span>
          </div>
        </div>

        {/* Resonant Harmonic Chime Note */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: data.active_color,
              textTransform: "uppercase",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            NADA HARMONIK ASMR
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.04em",
              textShadow: `0 4px 16px rgba(0,0,0,0.95), 0 0 25px ${data.active_color}`,
              lineHeight: 1.1,
            }}
          >
            {data.note_name}{" "}
            <span style={{ fontSize: 20, fontWeight: 700, color: data.active_color }}>
              {data.freq_hz} HZ
            </span>
          </div>
        </div>

        {/* Current Level Status */}
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
              backgroundColor: data.active_color,
              boxShadow: `0 0 16px ${data.active_color}`,
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: data.active_color,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            {data.is_shattered ? "HANCUR!" : `LEVEL ${data.n}`}
          </div>
        </div>
      </div>
    </div>
  );
};
