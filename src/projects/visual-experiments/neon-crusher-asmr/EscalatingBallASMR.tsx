import React from "react";
import { useCurrentFrame, staticFile, Audio, interpolate, Easing } from "remotion";
import rawData from "./escalatingBallData.json";

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
  bx: number;
  by: number;
  bvx: number;
  bvy: number;
  speed_kmh: number;
  total_bounces: number;
  active_tier: number;
  trail: [number, number][];
  rings: RingStatus[];
  shards: [number, number, number, number, number, string][];
}

interface SimDataset {
  total_frames: number;
  frames: SimFrame[];
}

const simDataset = rawData as unknown as SimDataset;
const frames = simDataset.frames;
export const ESCALATING_BALL_TOTAL_FRAMES = frames.length;

const CX = 540;
const CY = 960;

export const EscalatingBallASMR: React.FC = () => {
  const frame = useCurrentFrame();
  const safeFrame = Math.min(Math.max(0, frame), frames.length - 1);
  const data = frames[safeFrame];

  // Active theme color
  const tierColors = ["#FF007F", "#FFE600", "#00F2FE", "#FFFFFF"];
  const activeColor = tierColors[Math.min(3, data.active_tier)];

  // Screen shake on shatter impacts (around frame 157, 443, 737)
  const isShake1 = frame >= 157 && frame <= 170;
  const isShake2 = frame >= 443 && frame <= 458;
  const isShake3 = frame >= 737 && frame <= 760;
  const shakeIntensity = isShake3 ? 14 : isShake2 ? 9 : isShake1 ? 6 : 0;
  const shakeX = shakeIntensity * Math.sin(frame * 2.8);
  const shakeY = shakeIntensity * Math.cos(frame * 3.4);

  // Camera scale during final tier 3 supernova (f >= 737)
  const cameraScale = interpolate(frame, [735, 830], [1.0, 0.88], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Polyline points for trailing neon laser ribbon
  const trailPoints = data.trail.map((p) => `${p[0]},${p[1]}`).join(" ");

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#030408",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
      }}
    >
      {/* Continuous Crystal Marimba & Glass Shatter Audio */}
      <Audio src={staticFile("audio/escalating_ball_asmr.mp3")} />

      {/* Deep Cyber Void Radial Lighting */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 540px 960px, ${activeColor}15 0%, #080B14 50%, #020306 100%)`,
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
          opacity: 0.55,
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
            {/* Neon Glow Filters */}
            <filter id="ballGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="g1" />
              <feMerge>
                <feMergeNode in="g1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. The 3 Concentric Rings */}
          {data.rings.map((ring) => {
            if (ring.is_broken) return null;
            const circum = 2 * Math.PI * ring.r;
            const strokeDash = circum * ring.hp_ratio;
            const isTarget = ring.id === data.active_tier + 1;

            return (
              <g key={`ring-${ring.id}`} filter="url(#ringGlow)">
                {/* Background Dim Guide Track */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="2.5"
                  strokeOpacity={isTarget ? 0.25 : 0.12}
                />

                {/* Active Health Arc (Depletes as ball hits it!) */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={isTarget ? 8 : 4.5}
                  strokeDasharray={`${strokeDash} ${circum - strokeDash}`}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${CX} ${CY})`}
                  opacity={isTarget ? 0.95 : 0.6}
                />

                {/* Precision Ticks around ring */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const ang = (i / 24) * 2 * Math.PI;
                  const x1 = CX + (ring.r - 8) * Math.cos(ang);
                  const y1 = CY + (ring.r - 8) * Math.sin(ang);
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
                      strokeOpacity={isTarget ? 0.45 : 0.2}
                    />
                  );
                })}

                {/* Stress Cracks when ring is below 40% health */}
                {isTarget && ring.hp_ratio < 0.45 && (
                  <g stroke="#FFFFFF" strokeWidth="2.5" opacity={0.85} filter="url(#ballGlow)">
                    <path
                      d={`M ${CX + ring.r * 0.7} ${CY - ring.r * 0.7} l -15 20 l 25 10 l -20 25`}
                      fill="none"
                    />
                    <path
                      d={`M ${CX - ring.r * 0.6} ${CY + ring.r * 0.8} l 20 -15 l 10 25 l 25 -10`}
                      fill="none"
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* 2. Glass Shards from Shattered Rings */}
          {data.shards.map(([sx, sy, size, rot, alpha, col], idx) => (
            <polygon
              key={`shard-${idx}`}
              points={`0,-${size} ${size * 0.55},${size * 0.45} -${size * 0.55},${size * 0.45}`}
              transform={`translate(${sx}, ${sy}) rotate(${rot})`}
              fill={col}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              opacity={alpha}
              filter="url(#ballGlow)"
            />
          ))}

          {/* 3. Glowing Neon Laser Motion Trail */}
          {data.trail.length > 2 && (
            <polyline
              points={trailPoints}
              fill="none"
              stroke={activeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.75"
              filter="url(#ballGlow)"
            />
          )}

          {/* 4. The Supernova Bouncing Ball */}
          <g transform={`translate(${data.bx}, ${data.by})`}>
            {/* Outer Giant Flare */}
            <circle cx="0" cy="0" r="38" fill={activeColor} opacity="0.25" filter="url(#ballGlow)" />
            {/* Secondary Aura */}
            <circle cx="0" cy="0" r="26" fill={activeColor} opacity="0.75" filter="url(#ballGlow)" />
            {/* Ball Body */}
            <circle cx="0" cy="0" r="20" fill={activeColor} stroke="#FFFFFF" strokeWidth="2" />
            {/* Ultra-Bright Pure White Core */}
            <circle cx="0" cy="0" r="12" fill="#FFFFFF" />
            {/* Specular Highlight Point */}
            <circle cx="-5" cy="-5" r="4" fill="#FFFFFF" opacity="0.95" />
          </g>
        </svg>
      </div>

      {/* Floating Kinetic Typography (Top Safe Zone: y ~145px) */}
      <div
        style={{
          position: "absolute",
          top: 145,
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
          NEON RING BREAKER
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: activeColor,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          Kecepatan Naik 1.03x Sampai 3 Lapisan Pecah
        </div>

        {/* 3 Rings Health Overview Bar */}
        <div
          style={{
            marginTop: 22,
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
                    {ring.is_broken ? "PECAH!" : `${Math.round(ring.hp_ratio * 100)}%`}
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    backgroundColor: "rgba(30, 41, 59, 0.7)",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: `1px solid ${isTarget ? ring.color : "#334155"}`,
                  }}
                >
                  <div
                    style={{
                      width: ring.is_broken ? "0%" : `${Math.round(ring.hp_ratio * 100)}%`,
                      height: "100%",
                      backgroundColor: ring.color,
                      boxShadow: isTarget ? `0 0 10px ${ring.color}` : "none",
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
        {/* Total Bounces Live Counter */}
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
            PANTULAN
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              textShadow: `0 4px 14px rgba(0,0,0,0.9), 0 0 20px ${activeColor}66`,
              lineHeight: 1.1,
            }}
          >
            {data.total_bounces}
          </div>
        </div>

        {/* Realtime Speedometer (km/h) */}
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
            KECEPATAN BOLA
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
            {data.speed_kmh}{" "}
            <span style={{ fontSize: 24, fontWeight: 700, color: activeColor }}>KM/H</span>
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
