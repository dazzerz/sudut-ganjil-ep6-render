import React from "react";
import { useCurrentFrame, staticFile, Audio, interpolate, Easing } from "remotion";
import rawSim from "./clawPopSimData.json";

interface SimFrame {
  f: number;
  cycle_id: number;
  cycle_name: string;
  claw_x: number;
  claw_y: number;
  claw_angle: number;
  is_pinching?: boolean;
  count: number;
  stress: number;
  is_shattered: boolean;
  shards: [number, number, number, number][];
  balls: [number, number, number, number, number, string, string][];
}

interface SimData {
  total_frames: number;
  frames: SimFrame[];
}

const simData = rawSim as unknown as SimData;
const frames = simData.frames;
export const CLAW_BALLOON_TOTAL_FRAMES = frames.length;

const CX = 540;
const CY = 980;
const CONTAINER_R = 370;

export const ClawBalloonASMR: React.FC = () => {
  const frame = useCurrentFrame();
  const safeFrame = Math.min(Math.max(0, frame), frames.length - 1);
  const data = frames[safeFrame];

  // Stage color palette
  const cycleColors: Record<string, string> = {
    "CYAN BALLOONS": "#00F2FE",
    "BUBBLEGUM PINK": "#FF2A85",
    "SOLAR YELLOW": "#FFE600",
    "NEON LIME": "#39FF14",
    "ULTRA VIOLET": "#A855F7",
    "ORB SHATTER CLIMAX": "#FF0055",
  };
  const activeColor = cycleColors[data.cycle_name] || "#00F2FE";

  // Stress-based ring color (transitions from cyan -> yellow -> warning crimson)
  const ringColor =
    data.stress < 0.35
      ? "#00F2FE"
      : data.stress < 0.7
      ? "#FFE600"
      : "#FF0055";

  // Camera zoom during final orb shatter climax (f >= 980)
  const cameraScale = interpolate(frame, [975, 1060], [1.0, 0.82], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Calculate claw gripper tips with dynamic horizontal tracking
  const clawX = data.claw_x ?? CX;
  const leftTipX = clawX - 22 - data.claw_angle * 1.5;
  const rightTipX = clawX + 22 + data.claw_angle * 1.5;
  const clawTipY = data.claw_y + 85;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#05060A",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
      }}
    >
      {/* Studio Master Satisfying Balloon Pop Audio */}
      <Audio src={staticFile("audio/claw_pop_asmr.mp3")} />

      {/* Deep Cyber Void Radial Lighting */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 540px 980px, #0F1424 0%, #080A12 55%, #030407 100%)`,
          opacity: 0.98,
        }}
      />

      {/* Precision Circular Grid Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          opacity: 0.65,
        }}
      />

      {/* Main Physics Arena Container with Camera Scale */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          transform: `scale(${cameraScale})`,
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
            {/* Balloon Latex Glow */}
            <filter id="balloonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glass Ring Heavy Shadow */}
            <filter id="ringShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000000" floodOpacity="0.85" />
            </filter>

            {/* Chrome Piston Gradient */}
            <linearGradient id="chromePistonGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="45%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* High-Gloss Latex Balloon 3D Sphere Shading */}
            <radialGradient id="balloonGlossGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="75%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </radialGradient>

            {/* Glass Shard Shimmer */}
            <linearGradient id="shardGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor={activeColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1E293B" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* 1. The Glass Containment Orb / Ring (Visible when not shattered) */}
          {!data.is_shattered && (
            <g filter="url(#ringShadow)">
              {/* Outer Circular Glow Halo */}
              <circle
                cx={CX}
                cy={CY}
                r={CONTAINER_R + 6}
                fill="none"
                stroke={ringColor}
                strokeWidth="4"
                strokeOpacity={0.25 + data.stress * 0.5}
                filter="url(#balloonGlow)"
              />

              {/* Main Structural Glass Ring with Top Aperture Opening for Claw */}
              {/* Top aperture opening is between angle -65 deg and -115 deg */}
              <circle
                cx={CX}
                cy={CY}
                r={CONTAINER_R}
                fill="rgba(15, 23, 42, 0.25)"
                stroke={ringColor}
                strokeWidth="8"
                strokeDasharray={`${CONTAINER_R * 2 * Math.PI * 0.88} ${CONTAINER_R * 2 * Math.PI * 0.12}`}
                strokeDashoffset={CONTAINER_R * 2 * Math.PI * 0.06}
                strokeLinecap="round"
              />

              {/* Inner Precision Ticks on Ring Wall */}
              {Array.from({ length: 32 }).map((_, i) => {
                const ang = (i / 32) * 2 * Math.PI;
                // Skip ticks near top opening
                if (ang > (3 * Math.PI) / 2 - 0.5 && ang < (3 * Math.PI) / 2 + 0.5) return null;
                const x1 = CX + (CONTAINER_R - 14) * Math.cos(ang);
                const y1 = CY + (CONTAINER_R - 14) * Math.sin(ang);
                const x2 = CX + (CONTAINER_R - 4) * Math.cos(ang);
                const y2 = CY + (CONTAINER_R - 4) * Math.sin(ang);
                return (
                  <line
                    key={`rtick-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#475569"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                  />
                );
              })}

              {/* Stress Fracture Cracks (grows as stress increases!) */}
              {data.stress > 0.3 && (
                <g stroke="#FFFFFF" strokeWidth="2" opacity={data.stress * 0.9} filter="url(#balloonGlow)">
                  <path d={`M ${CX - CONTAINER_R + 10} ${CY} l 45 -20 l 30 15 l 40 -10`} fill="none" />
                  <path d={`M ${CX + CONTAINER_R - 10} ${CY - 80} l -50 25 l -35 -15 l -45 20`} fill="none" />
                </g>
              )}
              {data.stress > 0.6 && (
                <g stroke="#FF3366" strokeWidth="2.5" opacity="0.9" filter="url(#balloonGlow)">
                  <path d={`M ${CX - 150} ${CY + CONTAINER_R - 25} l 30 -40 l 45 15 l 25 -30`} fill="none" />
                  <path d={`M ${CX + 140} ${CY + CONTAINER_R - 30} l -35 -35 l -25 20 l -40 -25`} fill="none" />
                  <path d={`M ${CX} ${CY + CONTAINER_R - 10} l -20 -60 l 35 -30 l -15 -45`} fill="none" />
                </g>
              )}
            </g>
          )}

          {/* 2. Glass Shards Flying Outward (Rendered when orb is shattered!) */}
          {data.is_shattered &&
            data.shards.map(([sx, sy, size, rot], sidx) => (
              <polygon
                key={`shard-${sidx}`}
                points={`0,-${size} ${size * 0.6},${size * 0.5} -${size * 0.6},${size * 0.5}`}
                transform={`translate(${sx}, ${sy}) rotate(${rot})`}
                fill="url(#shardGrad)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                filter="url(#balloonGlow)"
              />
            ))}

          {/* 3. The Bouncy Balloon Balls */}
          {data.balls.map(([bx, by, brx, bry, isPinchedNum, bcol, bglow], idx) => {
            const isPinched = isPinchedNum > 0.05;
            const specularScale = isPinched ? 0.35 : 1.0;
            return (
              <g key={`bball-${idx}`} transform={`translate(${bx}, ${by})`}>
                {/* Outer Glow */}
                <ellipse
                  cx={0}
                  cy={0}
                  rx={brx + 3.5}
                  ry={bry + 3.5}
                  fill={bglow}
                  opacity={isPinched ? 0.95 : 0.45}
                  filter="url(#balloonGlow)"
                />

                {/* High-Tension Squeeze Stress Ring when Pinched */}
                {isPinched && (
                  <ellipse
                    cx={0}
                    cy={0}
                    rx={brx + 4}
                    ry={bry + 4}
                    fill="none"
                    stroke="#FF0055"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    opacity={0.85}
                    filter="url(#balloonGlow)"
                  />
                )}

                {/* Rubbery Balloon Body */}
                <ellipse
                  cx={0}
                  cy={0}
                  rx={brx}
                  ry={bry}
                  fill={bcol}
                  stroke="#FFFFFF"
                  strokeWidth={isPinched ? "2.5" : "0.75"}
                  strokeOpacity={isPinched ? "0.95" : "0.4"}
                />

                {/* 3D Glossy Volume Shading */}
                <ellipse
                  cx={0}
                  cy={0}
                  rx={brx}
                  ry={bry}
                  fill="url(#balloonGlossGrad)"
                />

                {/* Primary Liquid Latex Specular Reflection (Top Left Crescent) */}
                <ellipse
                  cx={-brx * 0.32}
                  cy={-bry * 0.32}
                  rx={Math.max(2.5, brx * 0.36 * specularScale)}
                  ry={Math.max(1.8, bry * 0.22 * specularScale)}
                  fill="#FFFFFF"
                  opacity="0.95"
                />

                {/* Secondary Bottom Rim Bounce Light */}
                <ellipse
                  cx={brx * 0.28}
                  cy={bry * 0.3}
                  rx={Math.max(1.5, brx * 0.2 * specularScale)}
                  ry={Math.max(1.0, bry * 0.14 * specularScale)}
                  fill="#FFFFFF"
                  opacity="0.5"
                />

                {/* Balloon Tie Knot Nipple (at bottom) */}
                {!isPinched && (
                  <polygon
                    points={`-3,${bry - 1} 3,${bry - 1} 0,${bry + 4}`}
                    fill={bcol}
                    opacity="0.8"
                  />
                )}
              </g>
            );
          })}

          {/* 4. The Mechanical Claw Crane ("Mesin Capitan") */}
          <g filter="url(#ringShadow)">
            {/* Top Crane Track & Trolley Rail */}
            <rect
              x={120}
              y={38}
              width={840}
              height={8}
              fill="#1E293B"
              stroke="#334155"
              strokeWidth="1.5"
              rx="4"
            />
            {/* Horizontal Trolley Carriage (moves with clawX) */}
            <rect
              x={clawX - 36}
              y={28}
              width={72}
              height={26}
              fill="#334155"
              stroke="#64748B"
              strokeWidth="2"
              rx="5"
            />
            <circle cx={clawX - 18} cy={41} r="4" fill="#64748B" />
            <circle cx={clawX + 18} cy={41} r="4" fill="#64748B" />

            {/* Top Crane Cable / Shaft */}
            <rect
              x={clawX - 7}
              y={54}
              width={14}
              height={Math.max(0, data.claw_y - 54)}
              fill="url(#chromePistonGrad)"
              stroke="#0F172A"
              strokeWidth="1.5"
            />

            {/* Pneumatic Wrist Base Housing */}
            <circle
              cx={clawX}
              cy={data.claw_y}
              r="28"
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="3"
            />
            {/* Claw Status LED Lens */}
            <circle
              cx={clawX}
              cy={data.claw_y}
              r="12"
              fill={activeColor}
              filter="url(#balloonGlow)"
            />
            <circle cx={clawX - 3} cy={data.claw_y - 3} r="3" fill="#FFFFFF" opacity="0.9" />

            {/* Left Articulated Finger */}
            <path
              d={`M ${clawX - 18} ${data.claw_y + 16} Q ${clawX - 38 - data.claw_angle * 1.1} ${data.claw_y + 55} ${leftTipX} ${clawTipY}`}
              stroke="#94A3B8"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left High-Grip Rubber Tip Pad */}
            <circle
              cx={leftTipX}
              cy={clawTipY}
              r="9"
              fill="#FF0055"
              stroke="#FFFFFF"
              strokeWidth="2"
              filter="url(#balloonGlow)"
            />

            {/* Right Articulated Finger */}
            <path
              d={`M ${clawX + 18} ${data.claw_y + 16} Q ${clawX + 38 + data.claw_angle * 1.1} ${data.claw_y + 55} ${rightTipX} ${clawTipY}`}
              stroke="#94A3B8"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right High-Grip Rubber Tip Pad */}
            <circle
              cx={rightTipX}
              cy={clawTipY}
              r="9"
              fill="#FF0055"
              stroke="#FFFFFF"
              strokeWidth="2"
              filter="url(#balloonGlow)"
            />

            {/* Center Piston Stabilizer Pin */}
            <rect
              x={clawX - 5}
              y={data.claw_y + 16}
              width={10}
              height={42}
              fill="url(#chromePistonGrad)"
              stroke="#334155"
              strokeWidth="1.5"
              rx="3"
            />
          </g>
        </svg>
      </div>

      {/* Floating Kinetic Typography (Top Safe Zone: y ~155px) */}
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
            fontSize: 46,
            fontWeight: 900,
            letterSpacing: "0.06em",
            color: "#FFFFFF",
            textAlign: "center",
            textTransform: "uppercase",
            textShadow: `0 4px 18px rgba(0,0,0,0.95), 0 0 35px ${activeColor}66`,
            lineHeight: 1.15,
            padding: "0 60px",
          }}
        >
          CAPITAN BALON ASMR
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
          Setiap Dicapit Balon Berlipat Sampai Lingkaran Pecah
        </div>

        {/* Ring Stress Overload Gauge Bar */}
        <div
          style={{
            marginTop: 22,
            width: 520,
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
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: "#94A3B8",
              marginBottom: 6,
            }}
          >
            <span>TEGANGAN LINGKARAN</span>
            <span style={{ color: ringColor, fontWeight: 900 }}>
              {data.is_shattered ? "PECAH TOTAL!" : `${Math.round(data.stress * 100)}%`}
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: 10,
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              borderRadius: 5,
              overflow: "hidden",
              border: "1.5px solid #475569",
              position: "relative",
            }}
          >
            <div
              style={{
                width: data.is_shattered ? "100%" : `${Math.min(100, data.stress * 100)}%`,
                height: "100%",
                backgroundColor: ringColor,
                boxShadow: `0 0 14px ${ringColor}`,
                transition: "width 0.05s ease-out",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating HUD Footer (Bottom Safe Zone: y ~1710px) */}
      <div
        style={{
          position: "absolute",
          bottom: 215,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 90px",
          pointerEvents: "none",
        }}
      >
        {/* Balloon Count Live Counter */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "#94A3B8",
              textTransform: "uppercase",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            JUMLAH BALON
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

        {/* Cycle Stage Badge */}
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
            {data.cycle_name}
          </div>
        </div>
      </div>
    </div>
  );
};
