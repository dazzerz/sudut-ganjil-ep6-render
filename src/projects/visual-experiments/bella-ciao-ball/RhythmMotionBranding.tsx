import React from "react";

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

const LAYER_STYLES = [
  { fill: "#0E7490", stroke: "#38BDF8" },
  { fill: "#B45309", stroke: "#FBBF24" },
  { fill: "#BE123C", stroke: "#FB7185" },
];

const BALL_DEFS = [
  { id: 0, name: "MERAH", hex: "#FF4D6D", light: "#FFB3C1", dark: "#A4133C" },
  { id: 1, name: "BIRU", hex: "#00F2FE", light: "#B8FBF9", dark: "#0077B6" },
  { id: 2, name: "KUNING", hex: "#FFE600", light: "#FFF799", dark: "#B58900" },
  { id: 3, name: "HIJAU", hex: "#38EF7D", light: "#B7F9D0", dark: "#11998E" },
];

export const RhythmMotionProfilePic: React.FC = () => {
  const CX = 540;
  const CY = 540;

  // Build 3 concentric brick rings with dramatic shattered gaps where balls hit
  const bricks: { d: string; layer: number }[] = [];
  const radii = [
    [350, 382],
    [388, 420],
    [426, 458],
  ];
  const skipSegments = new Set([
    "0-1",
    "0-2",
    "0-6",
    "0-9",
    "1-2",
    "1-6",
    "2-2",
  ]);

  radii.forEach(([rIn, rOut], layer) => {
    const nSeg = 12;
    for (let s = 0; s < nSeg; s++) {
      if (skipSegments.has(`${layer}-${s}`)) continue;
      const a1 = (s / nSeg) * 2 * Math.PI - Math.PI / 2 + 0.015;
      const a2 = ((s + 1) / nSeg) * 2 * Math.PI - Math.PI / 2 - 0.015;
      bricks.push({
        d: createArcBrickPath(CX, CY, rIn, rOut, a1, a2),
        layer,
      });
    }
  });

  // Equalizer wave bars across the center
  const eqHeights = [
    36, 64, 98, 145, 190, 130, 85, 160, 220, 170, 110, 195, 150, 95, 60, 38,
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: "#05070F",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <svg width={1080} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.26" />
            <stop offset="55%" stopColor="#be123c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#05070F" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="eq-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="50%" stopColor="#38EF7D" />
            <stop offset="100%" stopColor="#FF4D6D" />
          </linearGradient>

          {BALL_DEFS.map((b) => (
            <radialGradient
              key={b.id}
              id={`prof-ball-${b.id}`}
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

          <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Radial Glow */}
        <circle cx={CX} cy={CY} r={520} fill="url(#bg-glow)" />

        {/* Outer Titanium Ring */}
        <circle
          cx={CX}
          cy={CY}
          r={468}
          fill="none"
          stroke="#1E293B"
          strokeWidth={6}
        />

        {/* Concentric Segmented Bricks */}
        {bricks.map((b, i) => {
          const st = LAYER_STYLES[b.layer];
          return (
            <path
              key={i}
              d={b.d}
              fill={st.fill}
              stroke={st.stroke}
              strokeWidth={2.5}
            />
          );
        })}

        {/* Audio Equalizer Bars in Upper Center */}
        {eqHeights.map((h, i) => {
          const bw = 14;
          const gap = 8;
          const totalW = eqHeights.length * (bw + gap) - gap;
          const x = CX - totalW / 2 + i * (bw + gap);
          const y = CY - 95 - h / 2;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={bw}
              height={h}
              rx={7}
              fill="url(#eq-grad)"
              opacity={0.85}
              filter="url(#neon-glow)"
            />
          );
        })}

        {/* Rotating Mechanical Clock Hands */}
        <g transform={`translate(${CX}, ${CY - 95}) rotate(-32)`}>
          <rect
            x={-18}
            y={-10}
            width={230}
            height={20}
            rx={10}
            fill="#E2E8F0"
            stroke="#00F2FE"
            strokeWidth={3.5}
            filter="url(#neon-glow)"
          />
          <circle cx={195} cy={0} r={5.5} fill="#0F172A" />
        </g>
        <g transform={`translate(${CX}, ${CY - 95}) rotate(142)`}>
          <rect
            x={-16}
            y={-9}
            width={165}
            height={18}
            rx={9}
            fill="#94A3B8"
            stroke="#FFE600"
            strokeWidth={3}
          />
        </g>
        <circle
          cx={CX}
          cy={CY - 95}
          r={28}
          fill="#1E293B"
          stroke="#00F2FE"
          strokeWidth={4}
        />
        <circle cx={CX} cy={CY - 95} r={11} fill="#FFFFFF" />

        {/* 4 Dynamic 3D Glossy Balls & Impact Ripples */}
        {[
          { id: 0, x: 320, y: 310, dx: 45, dy: 35 },
          { id: 1, x: 755, y: 295, dx: -50, dy: 30 },
          { id: 2, x: 285, y: 545, dx: 55, dy: -20 },
          { id: 3, x: 785, y: 535, dx: -50, dy: -25 },
        ].map((b) => (
          <g key={b.id}>
            <circle
              cx={b.x}
              cy={b.y}
              r={46}
              fill="none"
              stroke={BALL_DEFS[b.id].hex}
              strokeWidth={3.5}
              opacity={0.55}
            />
            {[0.25, 0.5, 0.75].map((t, ti) => (
              <circle
                key={ti}
                cx={b.x + b.dx * (1 - t)}
                cy={b.y + b.dy * (1 - t)}
                r={30 * t * 0.8}
                fill={BALL_DEFS[b.id].hex}
                opacity={t * 0.45}
              />
            ))}
            <circle
              cx={b.x}
              cy={b.y}
              r={30}
              fill={`url(#prof-ball-${b.id})`}
              stroke="#FFFFFF"
              strokeWidth={2}
              filter="url(#neon-glow)"
            />
          </g>
        ))}
      </svg>

      {/* Center-Bottom Hero Typography inside Circular Safe Zone */}
      <div
        style={{
          position: "absolute",
          bottom: 195,
          width: "100%",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 3,
            lineHeight: 1.0,
            textShadow: "0 6px 24px rgba(0,0,0,0.95), 0 0 24px rgba(0,242,254,0.45)",
          }}
        >
          RHYTHM
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#FFE600",
            letterSpacing: 4,
            lineHeight: 1.08,
            textShadow: "0 6px 20px rgba(0,0,0,0.95)",
          }}
        >
          &amp; MOTION
        </div>
        <div
          style={{
            marginTop: 14,
            display: "inline-block",
            padding: "6px 32px",
            backgroundColor: "#FF4D6D",
            borderRadius: 999,
            fontSize: 32,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 8,
            boxShadow: "0 6px 20px rgba(255,77,109,0.55)",
          }}
        >
          ASMR
        </div>
      </div>
    </div>
  );
};

export const RhythmMotionCoverBanner: React.FC = () => {
  const eqBars = [
    28, 52, 85, 130, 95, 60, 115, 165, 120, 75, 140, 195, 145, 90, 55, 110, 175,
    130, 80, 45, 95, 155, 115, 70, 135, 185, 125, 85, 50, 30,
  ];

  // Build left and right decorative brick rings
  const buildRing = (cx: number, cy: number) => {
    const paths: { d: string; layer: number }[] = [];
    const radii = [
      [190, 212],
      [218, 240],
      [246, 268],
    ];
    radii.forEach(([rIn, rOut], layer) => {
      const nSeg = 10;
      for (let s = 0; s < nSeg; s++) {
        if ((layer === 0 && (s === 2 || s === 7)) || (layer === 1 && s === 2))
          continue;
        const a1 = (s / nSeg) * 2 * Math.PI + 0.015;
        const a2 = ((s + 1) / nSeg) * 2 * Math.PI - 0.015;
        paths.push({
          d: createArcBrickPath(cx, cy, rIn, rOut, a1, a2),
          layer,
        });
      }
    });
    return paths;
  };

  const leftRing = buildRing(165, 540);
  const rightRing = buildRing(1755, 540);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#05070F",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="cov-glow-center" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#9D174D" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#05070F" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="cov-eq" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4D6D" />
            <stop offset="33%" stopColor="#FFE600" />
            <stop offset="66%" stopColor="#38EF7D" />
            <stop offset="100%" stopColor="#00F2FE" />
          </linearGradient>

          {BALL_DEFS.map((b) => (
            <radialGradient
              key={b.id}
              id={`cov-ball-${b.id}`}
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

          <filter id="cov-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={1920} height={1080} fill="url(#cov-glow-center)" />

        {/* Subtle Perspective Grid Lines */}
        {[240, 390, 540, 690, 840].map((y, i) => (
          <line
            key={i}
            x1={0}
            y1={y}
            x2={1920}
            y2={y}
            stroke="rgba(255,255,255,0.035)"
            strokeWidth={1.5}
          />
        ))}

        {/* Left & Right Arena Rings */}
        {leftRing.map((b, i) => (
          <path
            key={`l-${i}`}
            d={b.d}
            fill={LAYER_STYLES[b.layer].fill}
            stroke={LAYER_STYLES[b.layer].stroke}
            strokeWidth={2}
            opacity={0.75}
          />
        ))}
        {rightRing.map((b, i) => (
          <path
            key={`r-${i}`}
            d={b.d}
            fill={LAYER_STYLES[b.layer].fill}
            stroke={LAYER_STYLES[b.layer].stroke}
            strokeWidth={2}
            opacity={0.75}
          />
        ))}

        {/* Left & Right Clock Hands */}
        <g transform="translate(165, 540) rotate(28)">
          <rect
            x={-12}
            y={-7}
            width={150}
            height={14}
            rx={7}
            fill="#E2E8F0"
            stroke="#00F2FE"
            strokeWidth={2.5}
          />
        </g>
        <g transform="translate(1755, 540) rotate(148)">
          <rect
            x={-12}
            y={-7}
            width={150}
            height={14}
            rx={7}
            fill="#E2E8F0"
            stroke="#FFE600"
            strokeWidth={2.5}
          />
        </g>

        {/* Center Equalizer Spectrum Behind Typography */}
        {eqBars.map((h, i) => {
          const bw = 16;
          const gap = 14;
          const totalW = eqBars.length * (bw + gap) - gap;
          const x = 960 - totalW / 2 + i * (bw + gap);
          const y = 740 - h / 2;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={bw}
              height={h}
              rx={8}
              fill="url(#cov-eq)"
              opacity={0.75}
              filter="url(#cov-blur)"
            />
          );
        })}

        {/* 4 Bouncing Glossy Spheres */}
        {[
          { id: 0, x: 260, y: 425 },
          { id: 1, x: 105, y: 635 },
          { id: 2, x: 1660, y: 420 },
          { id: 3, x: 1815, y: 640 },
        ].map((b) => (
          <g key={b.id}>
            <circle
              cx={b.x}
              cy={b.y}
              r={42}
              fill="none"
              stroke={BALL_DEFS[b.id].hex}
              strokeWidth={3}
              opacity={0.5}
            />
            <circle
              cx={b.x}
              cy={b.y}
              r={26}
              fill={`url(#cov-ball-${b.id})`}
              stroke="#FFFFFF"
              strokeWidth={2}
              filter="url(#cov-blur)"
            />
          </g>
        ))}
      </svg>

      {/* Center Safe-Zone Hero Lockup */}
      <div
        style={{
          position: "absolute",
          top: 255,
          width: "100%",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#38BDF8",
            letterSpacing: 8,
            marginBottom: 16,
            textShadow: "0 2px 12px rgba(0,0,0,0.95)",
          }}
        >
          SATISFYING PHYSICS · MUSICAL BOUNCE · VISUAL TRIGGERS
        </div>

        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 4,
            lineHeight: 1.02,
            textShadow:
              "0 8px 30px rgba(0,0,0,0.95), 0 0 32px rgba(0,242,254,0.4)",
          }}
        >
          RHYTHM <span style={{ color: "#FFE600" }}>&amp;</span> MOTION
        </div>

        <div
          style={{
            marginTop: 22,
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            padding: "10px 44px",
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            border: "2.5px solid #00F2FE",
            borderRadius: 999,
            boxShadow: "0 0 28px rgba(0, 242, 254, 0.35)",
          }}
        >
          <span
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: "#FF4D6D",
              letterSpacing: 6,
            }}
          >
            ASMR
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 28 }}>|</span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#E2E8F0",
              letterSpacing: 4,
            }}
          >
            DAILY SIMULATION CHALLENGE
          </span>
        </div>
      </div>
    </div>
  );
};
