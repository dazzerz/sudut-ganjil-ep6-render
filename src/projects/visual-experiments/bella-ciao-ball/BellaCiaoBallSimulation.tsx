import React, { useMemo } from "react";
import { useCurrentFrame, staticFile, Audio } from "remotion";
import rawSim from "./simData.json";

interface BrickMeta {
  id: number;
  layer: number;
  r_in: number;
  r_out: number;
  a1: number;
  a2: number;
}

interface BallState {
  id: number;
  x: number;
  y: number;
  trail: [number, number][];
}

interface SimV4Frame {
  f: number;
  note: string;
  ang1: number;
  ang2: number;
  h1_flash?: number;
  h2_flash?: number;
  scores: number[];
  bricks_left: number;
  alive: number[];
  balls: BallState[];
  ripples: {
    x: number;
    y: number;
    r: number;
    op: number;
    c: string;
    n: string;
  }[];
  fragments: {
    x: number;
    y: number;
    rot: number;
    op: number;
    c: string;
  }[];
  sparks: {
    x: number;
    y: number;
    op: number;
    c: string;
  }[];
}

interface SimV4Data {
  total_bricks?: number;
  bricks_meta: BrickMeta[];
  frames: SimV4Frame[];
}

const simData = rawSim as unknown as SimV4Data;
const frames = simData.frames;
const TOTAL_BRICKS = simData.total_bricks || simData.bricks_meta.length;
export const TOTAL_SIMULATION_FRAMES = frames.length;

const CX = 540;
const CY = 960;
const BALL_RADIUS = 17;

const BALL_DEFS = [
  { id: 0, name: "MERAH", hex: "#FF4D6D", light: "#FFB3C1", dark: "#A4133C" },
  { id: 1, name: "BIRU", hex: "#00F2FE", light: "#B8FBF9", dark: "#0077B6" },
  { id: 2, name: "KUNING", hex: "#FFE600", light: "#FFF799", dark: "#B58900" },
  { id: 3, name: "HIJAU", hex: "#38EF7D", light: "#B7F9D0", dark: "#11998E" },
];

const LAYER_STYLES = [
  { fill: "#0E7490", stroke: "#38BDF8" }, // Inner ring
  { fill: "#B45309", stroke: "#FBBF24" }, // Middle ring
  { fill: "#BE123C", stroke: "#FB7185" }, // Outer ring
];

function createArcBrickPath(
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
  a1: number,
  a2: number
): string {
  const x1 = cx + rIn * Math.cos(a1);
  const y1 = cy + rIn * Math.sin(a1);
  const x2 = cx + rOut * Math.cos(a1);
  const y2 = cy + rOut * Math.sin(a1);
  const x3 = cx + rOut * Math.cos(a2);
  const y3 = cy + rOut * Math.sin(a2);
  const x4 = cx + rIn * Math.cos(a2);
  const y4 = cy + rIn * Math.sin(a2);

  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(
    1
  )} A ${rOut} ${rOut} 0 0 1 ${x3.toFixed(1)} ${y3.toFixed(
    1
  )} L ${x4.toFixed(1)} ${y4.toFixed(1)} A ${rIn} ${rIn} 0 0 0 ${x1.toFixed(
    1
  )} ${y1.toFixed(1)} Z`;
}

export const BellaCiaoBallSimulation: React.FC = () => {
  const frame = useCurrentFrame();
  const current = frames[Math.min(frame, frames.length - 1)] || frames[0];

  // Precompute SVG arc paths for all 108 bricks
  const brickPaths = useMemo(() => {
    return simData.bricks_meta.map((b) => ({
      id: b.id,
      layer: b.layer,
      d: createArcBrickPath(CX, CY, b.r_in, b.r_out, b.a1, b.a2),
    }));
  }, []);

  // Clock dial ticks (12 hour markers)
  const clockDialTicks = useMemo(() => {
    const arr: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
    for (let i = 0; i < 60; i++) {
      const ang = (i / 60) * 2 * Math.PI;
      const major = i % 5 === 0;
      const r1 = major ? 330 : 340;
      const r2 = 348;
      arr.push({
        x1: CX + r1 * Math.cos(ang),
        y1: CY + r1 * Math.sin(ang),
        x2: CX + r2 * Math.cos(ang),
        y2: CY + r2 * Math.sin(ang),
        major,
      });
    }
    return arr;
  }, []);

  const aliveSet = useMemo(() => new Set(current.alive), [current.alive]);

  // Determine leading ball color
  let leaderIdx = 0;
  for (let i = 1; i < current.scores.length; i++) {
    if (current.scores[i] > current.scores[leaderIdx]) {
      leaderIdx = i;
    }
  }

  const destroyedCount = TOTAL_BRICKS - current.bricks_left;
  const destroyedPct = (destroyedCount / TOTAL_BRICKS) * 100;
  const h1Flash = current.h1_flash || 0;
  const h2Flash = current.h2_flash || 0;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#080911",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <Audio src={staticFile("audio/simulations/bella_ciao_v4_clock.wav")} />

      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          {BALL_DEFS.map((b) => (
            <radialGradient
              key={b.id}
              id={`ball-grad-${b.id}`}
              cx="32%"
              cy="30%"
              r="68%"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="28%" stopColor={b.light} />
              <stop offset="68%" stopColor={b.hex} />
              <stop offset="100%" stopColor={b.dark} />
            </radialGradient>
          ))}

          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Titanium Containment Ring */}
        <circle
          cx={CX}
          cy={CY}
          r={444}
          fill="#05060C"
          stroke="#334155"
          strokeWidth={5}
        />

        {/* Subtle Clock Face Radial Grid & Hour Ticks */}
        <circle
          cx={CX}
          cy={CY}
          r={220}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="6 6"
        />
        <circle
          cx={CX}
          cy={CY}
          r={145}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeDasharray="4 4"
        />
        {clockDialTicks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.major ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)"}
            strokeWidth={t.major ? 2.5 : 1.2}
          />
        ))}

        {/* 3 Layers of Breakable Curved Bricks */}
        {brickPaths.map((brk) => {
          if (!aliveSet.has(brk.id)) return null;
          const st = LAYER_STYLES[brk.layer];
          return (
            <path
              key={brk.id}
              d={brk.d}
              fill={st.fill}
              stroke={st.stroke}
              strokeWidth={1.8}
            />
          );
        })}

        {/* Shattered Brick Fragments Flying Outward */}
        {current.fragments.map((fr, idx) => (
          <g
            key={`frag-${idx}`}
            transform={`translate(${fr.x}, ${fr.y}) rotate(${fr.rot})`}
            style={{ opacity: fr.op }}
          >
            <rect
              x={-10}
              y={-6}
              width={20}
              height={12}
              rx={2}
              fill={fr.c}
              stroke="#FFFFFF"
              strokeWidth={1}
            />
          </g>
        ))}

        {/* Collision Ripples & Musical Note Popups (100% 1-to-1 with every bounce!) */}
        {current.ripples.map((rip, idx) => (
          <g key={`rip-${idx}`}>
            <circle
              cx={rip.x}
              cy={rip.y}
              r={rip.r}
              fill="none"
              stroke={rip.c}
              strokeWidth={3.5}
              style={{ opacity: rip.op }}
              filter="url(#soft-glow)"
            />
            {rip.op > 0.3 && (
              <text
                x={rip.x}
                y={rip.y - 20}
                fill="#FFFFFF"
                fontSize={24}
                fontWeight={900}
                textAnchor="middle"
                style={{ opacity: rip.op }}
              >
                {rip.n}
              </text>
            )}
          </g>
        ))}

        {/* Clock-Hand Sparks */}
        {current.sparks.map((sp, idx) => (
          <circle
            key={`sp-${idx}`}
            cx={sp.x}
            cy={sp.y}
            r={3.5}
            fill={sp.c}
            style={{ opacity: sp.op }}
          />
        ))}

        {/* Rotating Mechanical Clock Hands in Center (Jarum Jam Berputar) */}
        {/* Hand 2: Hour Hand (145px reach) */}
        <g transform={`translate(${CX}, ${CY}) rotate(${current.ang2})`}>
          <rect
            x={-14}
            y={-8.5}
            width={159}
            height={17}
            rx={8.5}
            fill={h2Flash > 0.1 ? "#FFFFFF" : "#94A3B8"}
            stroke={h2Flash > 0.1 ? "#FFE600" : "#E2E8F0"}
            strokeWidth={h2Flash > 0.1 ? 4 : 2}
            filter={h2Flash > 0.1 ? "url(#soft-glow)" : undefined}
          />
          <line
            x1={24}
            y1={0}
            x2={125}
            y2={0}
            stroke="#475569"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <circle cx={135} cy={0} r={4.5} fill="#0F172A" />
        </g>

        {/* Hand 1: Minute Hand (205px reach) */}
        <g transform={`translate(${CX}, ${CY}) rotate(${current.ang1})`}>
          <rect
            x={-16}
            y={-8.5}
            width={221}
            height={17}
            rx={8.5}
            fill={h1Flash > 0.1 ? "#FFFFFF" : "#CBD5E1"}
            stroke={h1Flash > 0.1 ? "#00F2FE" : "#38BDF8"}
            strokeWidth={h1Flash > 0.1 ? 4.5 : 2.5}
            filter="url(#soft-glow)"
          />
          <line
            x1={28}
            y1={0}
            x2={182}
            y2={0}
            stroke="#0284C7"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <circle cx={193} cy={0} r={5} fill="#0F172A" />
        </g>

        {/* Central Clock Gear Hub */}
        <circle
          cx={CX}
          cy={CY}
          r={26}
          fill="#334155"
          stroke="#94A3B8"
          strokeWidth={3.5}
        />
        <circle
          cx={CX}
          cy={CY}
          r={10}
          fill="#38BDF8"
          stroke="#FFFFFF"
          strokeWidth={2.5}
        />

        {/* 4 Competing Balls + Comet Motion Trails */}
        {current.balls.map((b) => {
          const def = BALL_DEFS[b.id];
          return (
            <g key={`ball-${b.id}`}>
              {/* Comet Trail */}
              {b.trail.map((pt, ti) => {
                const frac = (ti + 1) / b.trail.length;
                return (
                  <circle
                    key={ti}
                    cx={pt[0]}
                    cy={pt[1]}
                    r={BALL_RADIUS * frac * 0.78}
                    fill={def.hex}
                    style={{ opacity: frac * 0.38 }}
                  />
                );
              })}

              {/* Main 3D Glossy Ball */}
              <circle
                cx={b.x}
                cy={b.y}
                r={BALL_RADIUS}
                fill={`url(#ball-grad-${b.id})`}
                stroke="#FFFFFF"
                strokeWidth={1.5}
                filter="url(#soft-glow)"
              />
            </g>
          );
        })}
      </svg>

      {/* Top Floating Hook (Zero Cards / Anti-Kotak) */}
      <div
        style={{
          position: "absolute",
          top: 165,
          width: "100%",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 1,
            lineHeight: 1.12,
            textShadow: "0 4px 18px rgba(0,0,0,0.95)",
          }}
        >
          WARNA MANA PALING BANYAK?
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 27,
            fontWeight: 700,
            color: "#CBD5E1",
            letterSpacing: 1,
            textShadow: "0 2px 12px rgba(0,0,0,0.95)",
          }}
        >
          1 pantulan = 1 nada Bella Ciao & hancurkan bata
        </div>

        {/* Active Note & Leader Status */}
        <div
          style={{
            marginTop: 20,
            display: "inline-flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#38BDF8",
              letterSpacing: 2,
              textShadow: "0 2px 12px rgba(0,0,0,0.95)",
            }}
          >
            NADA: {current.note}
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 24 }}>|</span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: BALL_DEFS[leaderIdx].hex,
              letterSpacing: 2,
              textShadow: "0 2px 12px rgba(0,0,0,0.95)",
            }}
          >
            {current.bricks_left === 0 ? "PEMENANG" : "UNGGUL"}: {BALL_DEFS[leaderIdx].name} ({current.scores[leaderIdx]})
          </span>
        </div>
      </div>

      {/* Bottom Live 4-Ball Scoreboard & Brick Progress */}
      <div
        style={{
          position: "absolute",
          bottom: 225,
          left: 85,
          right: 85,
          zIndex: 10,
        }}
      >
        {/* 4 Competing Ball Scores */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          {BALL_DEFS.map((def, idx) => (
            <div
              key={def.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: def.hex,
                    boxShadow: `0 0 10px ${def.hex}`,
                  }}
                />
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#CBD5E1",
                    letterSpacing: 1.5,
                  }}
                >
                  {def.name}
                </span>
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: def.hex,
                  fontFamily: "monospace",
                  lineHeight: 1,
                  textShadow: "0 4px 14px rgba(0,0,0,0.95)",
                }}
              >
                {current.scores[idx]}
              </div>
            </div>
          ))}
        </div>

        {/* Bricks Destroyed Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontSize: 18,
            fontWeight: 800,
            color: "#94A3B8",
            letterSpacing: 2,
          }}
        >
          <span>
            BATA HANCUR: {destroyedCount} / {TOTAL_BRICKS}
            {current.bricks_left === 0 ? " (SELESAI)" : ""}
          </span>
          <span>{destroyedPct.toFixed(0)}%</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 10,
            backgroundColor: "rgba(255,255,255,0.12)",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${destroyedPct}%`,
              height: "100%",
              backgroundColor: BALL_DEFS[leaderIdx].hex,
              borderRadius: 5,
            }}
          />
        </div>
      </div>
    </div>
  );
};
