import React from "react";
import { useCurrentFrame, staticFile, Audio, interpolate, Easing } from "remotion";
import rawData from "./hebohBallData.json";

interface RingStatus {
  id: number;
  r: number;
  color: string;
  name: string;
  hp_ratio: number;
  is_broken: boolean;
}

interface SimFrame {
  f: number;
  ball_count: number;
  total_bounces: number;
  active_tier: number;
  balls: [number, number, number, number, number][]; // [x, y, vx, vy, color_idx]
  shockwaves: [number, number, number, number, string][]; // [x, y, r, alpha, col]
  rings: RingStatus[];
  shards: [number, number, number, number, number, string][]; // [x, y, size, rot, alpha, col]
}

interface SimDataset {
  total_frames: number;
  frames: SimFrame[];
}

const simDataset = rawData as unknown as SimDataset;
const frames = simDataset.frames;
export const HEBOH_COLLIDER_TOTAL_FRAMES = frames.length;

const CX = 540;
const CY = 960;

const BALL_COLORS = ["#00F2FE", "#FF007F", "#FFE600", "#39FF14"];

export const HebohColliderASMR: React.FC = () => {
  const frame = useCurrentFrame();
  const safeFrame = Math.min(Math.max(0, frame), frames.length - 1);
  const data = frames[safeFrame];

  // Active theme color
  const tierColors = ["#FF007F", "#FFE600", "#00F2FE", "#FFFFFF"];
  const activeColor = tierColors[Math.min(3, data.active_tier)];

  // Screen shake on shatter moments (around frame 110, 308, 762)
  const isShake1 = frame >= 110 && frame <= 126;
  const isShake2 = frame >= 308 && frame <= 326;
  const isShake3 = frame >= 762 && frame <= 810;
  const shakeIntensity = isShake3 ? 18 : isShake2 ? 11 : isShake1 ? 8 : 0;
  const shakeX = shakeIntensity * Math.sin(frame * 2.7);
  const shakeY = shakeIntensity * Math.cos(frame * 3.3);

  // Dynamic Camera Zoom
  const cameraScale = interpolate(frame, [760, 840], [1.0, 0.84], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

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
      {/* Ultra-Heboh Symphonic Crystalline & 808 Sub-Bass Audio */}
      <Audio src={staticFile("audio/heboh_ball_asmr.mp3")} />

      {/* Deep Cyber Radial Ambience with active tier reactive glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 540px 960px, ${activeColor}22 0%, #060912 45%, #010204 100%)`,
          opacity: 0.98,
        }}
      />

      {/* Cyber Grid Lines */}
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
          opacity: 0.65,
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
            {/* Multi-tier Neon Glow Filters */}
            <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b2" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="b3" />
              <feMerge>
                <feMergeNode in="b3" />
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="ringBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="g1" />
              <feMerge>
                <feMergeNode in="g1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. The 3 Concentric Concentrated Rings */}
          {data.rings.map((ring) => {
            if (ring.is_broken) return null;
            const circum = 2 * Math.PI * ring.r;
            const strokeDash = circum * ring.hp_ratio;
            const isTarget = ring.id === data.active_tier + 1;

            return (
              <g key={`ring-${ring.id}`} filter="url(#ringBloom)">
                {/* Outer Glow Halo */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={isTarget ? 10 : 4}
                  strokeOpacity={isTarget ? 0.35 : 0.15}
                />

                {/* Main Structural Ring Track */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={isTarget ? 7 : 3.5}
                  strokeDasharray={`${strokeDash} ${circum - strokeDash}`}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${CX} ${CY})`}
                  opacity={isTarget ? 0.98 : 0.55}
                />

                {/* Precision Ticks around ring */}
                {Array.from({ length: 32 }).map((_, i) => {
                  const ang = (i / 32) * 2 * Math.PI;
                  const x1 = CX + (ring.r - 10) * Math.cos(ang);
                  const y1 = CY + (ring.r - 10) * Math.sin(ang);
                  const x2 = CX + (ring.r - 2) * Math.cos(ang);
                  const y2 = CY + (ring.r - 2) * Math.sin(ang);
                  return (
                    <line
                      key={`tick-${ring.id}-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={ring.color}
                      strokeWidth="1.5"
                      strokeOpacity={isTarget ? 0.5 : 0.2}
                    />
                  );
                })}

                {/* Intense Stress Lightning Cracks when ring is below 45% HP */}
                {isTarget && ring.hp_ratio < 0.45 && (
                  <g stroke="#FFFFFF" strokeWidth="2.5" opacity={0.9} filter="url(#intenseGlow)">
                    <path
                      d={`M ${CX + ring.r * 0.7} ${CY - ring.r * 0.7} l -20 25 l 30 15 l -25 30`}
                      fill="none"
                    />
                    <path
                      d={`M ${CX - ring.r * 0.7} ${CY + ring.r * 0.7} l 25 -20 l 15 30 l 30 -15`}
                      fill="none"
                    />
                    <path
                      d={`M ${CX} ${CY + ring.r * 0.95} l -15 -35 l 30 -20 l -20 -35`}
                      fill="none"
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* 2. Kinetic Impact Shockwaves */}
          {data.shockwaves.map(([swx, swy, swr, swa, swcol], swidx) => (
            <circle
              key={`shockwave-${swidx}`}
              cx={swx}
              cy={swy}
              r={swr}
              fill="none"
              stroke={swcol}
              strokeWidth="3.5"
              opacity={swa}
              filter="url(#intenseGlow)"
            />
          ))}

          {/* 3. Glass Shards from Shattered Rings */}
          {data.shards.map(([sx, sy, size, rot, alpha, col], idx) => (
            <polygon
              key={`shard-${idx}`}
              points={`0,-${size} ${size * 0.6},${size * 0.5} -${size * 0.6},${size * 0.5}`}
              transform={`translate(${sx}, ${sy}) rotate(${rot})`}
              fill={col}
              stroke="#FFFFFF"
              strokeWidth="2"
              opacity={alpha}
              filter="url(#intenseGlow)"
            />
          ))}

          {/* 4. The Multitude Swarm of Duplicating Neon Balls */}
          {data.balls.map(([bx, by, vx, vy, colorIdx], bidx) => {
            const bcol = BALL_COLORS[colorIdx % BALL_COLORS.length];
            return (
              <g key={`ball-${bidx}`} transform={`translate(${bx}, ${by})`}>
                {/* Outer Glow Halo */}
                <circle cx="0" cy="0" r="22" fill={bcol} opacity="0.4" filter="url(#intenseGlow)" />
                {/* Ball Body */}
                <circle cx="0" cy="0" r="14" fill={bcol} stroke="#FFFFFF" strokeWidth="1.75" />
                {/* Ultra-Bright Center Core */}
                <circle cx="0" cy="0" r="7.5" fill="#FFFFFF" />
                {/* Specular Highlight Point */}
                <circle cx="-3.5" cy="-3.5" r="2.5" fill="#FFFFFF" opacity="0.95" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Kinetic Typography (Top Safe Zone: y ~140px) */}
      <div
        style={{
          position: "absolute",
          top: 140,
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
            letterSpacing: "0.06em",
            color: "#FFFFFF",
            textAlign: "center",
            textTransform: "uppercase",
            textShadow: `0 4px 20px rgba(0,0,0,0.95), 0 0 35px ${activeColor}88`,
            lineHeight: 1.15,
            padding: "0 60px",
          }}
        >
          NEON SUPER-COLLIDER
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: activeColor,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          Setiap Benturan Menggandakan Bola Sampai Meledak
        </div>

        {/* 3 Rings Health Overview Bar */}
        <div
          style={{
            marginTop: 20,
            width: 820,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {data.rings.map((ring) => {
            const isTarget = ring.id === data.active_tier + 1;
            return (
              <div
                key={`hud-ring-${ring.id}`}
                style={{
                  flex: 1,
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
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: ring.is_broken ? "#FF0055" : isTarget ? ring.color : "#64748B",
                    marginBottom: 5,
                  }}
                >
                  <span>{ring.name}</span>
                  <span style={{ fontWeight: 900 }}>
                    {ring.is_broken ? "MELEDAK!" : `${Math.round(ring.hp_ratio * 100)}%`}
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 9,
                    backgroundColor: "rgba(30, 41, 59, 0.7)",
                    borderRadius: 4.5,
                    overflow: "hidden",
                    border: `1.5px solid ${isTarget ? ring.color : "#334155"}`,
                  }}
                >
                  <div
                    style={{
                      width: ring.is_broken ? "0%" : `${Math.round(ring.hp_ratio * 100)}%`,
                      height: "100%",
                      backgroundColor: ring.color,
                      boxShadow: isTarget ? `0 0 12px ${ring.color}` : "none",
                    }}
                  />
                </div>
              </div>
            );
          })}
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
        {/* Total Balls Count (Live Multiplier) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 17,
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
              textShadow: `0 4px 14px rgba(0,0,0,0.9), 0 0 25px ${activeColor}88`,
              lineHeight: 1.1,
            }}
          >
            {data.ball_count}{" "}
            <span style={{ fontSize: 24, fontWeight: 700, color: activeColor }}>BOLA</span>
          </div>
        </div>

        {/* Total Bounces Counter */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: activeColor,
              textTransform: "uppercase",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            TOTAL BENTURAN
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.04em",
              textShadow: `0 4px 16px rgba(0,0,0,0.95), 0 0 25px ${activeColor}`,
              lineHeight: 1.1,
            }}
          >
            {data.total_bounces}
          </div>
        </div>

        {/* Tier Status Badge */}
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
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            {data.active_tier >= 3 ? "SUPERNOVA" : `TIER ${data.active_tier + 1}`}
          </div>
        </div>
      </div>
    </div>
  );
};
