import React from "react";
import { useCurrentFrame, staticFile, Audio, interpolate, Easing } from "remotion";
import rawData from "./galtonBoardData.json";

interface SimFrame {
  f: number;
  total_settled: number;
  completion_ratio: number;
  bin_counts: number[];
  balls: [number, number, number, number][]; // [x, y, color_idx, settled]
  active_pegs: number[];
}

interface SimDataset {
  total_frames: number;
  frames: SimFrame[];
}

const simDataset = rawData as unknown as SimDataset;
const frames = simDataset.frames;
export const GALTON_BOARD_TOTAL_FRAMES = frames.length;

// Geometry matching simulation
const CX = 540.0;
const NUM_ROWS = 12;
const ROW_START_Y = 410.0;
const ROW_SPACING_Y = 56.0;
const PEG_SPACING_X = 52.0;

const NUM_BINS = 13;
const BIN_START_Y = ROW_START_Y + NUM_ROWS * ROW_SPACING_Y + 15.0; // 1097.0
const BIN_WIDTH = 48.0;
const BIN_LEFT = CX - (NUM_BINS * BIN_WIDTH) / 2.0; // 228.0
const BIN_FLOOR_Y = 1680.0;

// Pegs array calculation
interface PegInfo {
  id: number;
  row: number;
  col: number;
  x: number;
  y: number;
}

const PEGS: PegInfo[] = [];
let pegIdCounter = 0;
for (let r = 0; r < NUM_ROWS; r++) {
  const y = ROW_START_Y + r * ROW_SPACING_Y;
  const numPegsInRow = r + 1;
  const rowWidth = (numPegsInRow - 1) * PEG_SPACING_X;
  const leftX = CX - rowWidth / 2.0;
  for (let c = 0; c < numPegsInRow; c++) {
    const x = leftX + c * PEG_SPACING_X;
    PEGS.push({ id: pegIdCounter++, row: r, col: c, x, y });
  }
}

const BALL_COLORS = [
  "#00F2FE", // Vibrant Cyan
  "#38EF7D", // Emerald Green
  "#FFE600", // Solar Yellow
  "#FF7E00", // Warm Amber
  "#FF007F", // Neon Magenta
  "#E040FB", // Electric Orchid
];

// Bin labels relative to mean
const BIN_LABELS = [
  "-6σ", "-5σ", "-4σ", "-3σ", "-2σ", "-1σ", "μ (0)", "+1σ", "+2σ", "+3σ", "+4σ", "+5σ", "+6σ"
];

export const GaltonBoardASMR: React.FC = () => {
  const frame = useCurrentFrame();
  const safeFrame = Math.min(Math.max(0, frame), frames.length - 1);
  const data = frames[safeFrame];

  // Screen pulse during final climax (f >= 640)
  const isClimax = frame >= 640;
  const climaxPulse = isClimax
    ? interpolate(Math.sin((frame - 640) * 0.25), [-1, 1], [0.95, 1.05])
    : 1.0;

  // Gaussian Bell Curve points calculation for SVG
  // Bin centers
  const binCenters = Array.from({ length: NUM_BINS }, (_, i) => BIN_LEFT + (i + 0.5) * BIN_WIDTH);
  
  // Theoretical curve height (scaled to max settled height ~380px)
  const maxCurveHeight = 390;
  const mu = 6.0;
  const sigma = 1.732; // sqrt(12 * 0.5 * 0.5) = sqrt(3)
  
  // SVG points for theoretical Gaussian curve
  const curvePoints: string[] = [];
  for (let step = 0; step <= 80; step++) {
    const t = step / 80.0;
    const binX = BIN_LEFT + t * (NUM_BINS * BIN_WIDTH);
    const binIndexFloat = (binX - BIN_LEFT) / BIN_WIDTH - 0.5;
    const gaussFactor = Math.exp(-Math.pow(binIndexFloat - mu, 2) / (2 * sigma * sigma));
    const py = BIN_FLOOR_Y - gaussFactor * maxCurveHeight * Math.min(1.0, data.completion_ratio * 1.05);
    curvePoints.push(`${binX.toFixed(1)},${py.toFixed(1)}`);
  }
  const curvePathD = `M ${curvePoints.join(" L ")}`;

  // Opacity & glow of the Gaussian guide curve
  const curveGlowOpacity = interpolate(frame, [250, 500, 640], [0.2, 0.7, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic Status Text based on timeline
  let statusText = "KASKADE ACAK BERLANGSUNG";
  if (frame < 120) {
    statusText = "INISIASI 360 PARTIKEL ACAK";
  } else if (frame < 300) {
    statusText = "PERCABANGAN BERNOULLI (p = 0.5)";
  } else if (frame < 500) {
    statusText = "KUMPULAN PARTIKEL MEMBENTUK GAUSS";
  } else if (frame < 640) {
    statusText = "SIMETRI LONCENG MAKIN SEMPURNA";
  } else {
    statusText = "DISTRIBUSI NORMAL TERBUKTI 100%";
  }

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#020409",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
      }}
    >
      {/* Audio: Crystal Marimba Hits & Climax Chord */}
      <Audio src={staticFile("audio/galton_board_asmr.mp3")} />

      {/* Cyber Background Grid & Ambient Glows */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 540px 300px, rgba(0, 242, 254, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 540px 750px, rgba(124, 77, 255, 0.07) 0%, transparent 70%),
            radial-gradient(circle at 540px 1450px, ${isClimax ? "rgba(255, 230, 0, 0.16)" : "rgba(0, 242, 254, 0.08)"} 0%, transparent 70%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Subtle Blueprint Grid Lines */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          opacity: 0.18,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00F2FE" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="1080" height="1920" fill="url(#grid)" />
      </svg>

      {/* =========================================================================
          TOP HEADER SECTION: Safe Zone (y >= 140)
          ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 135,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 50,
          textAlign: "center",
        }}
      >
        {/* Floating Category Badge */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#00F2FE",
            letterSpacing: "4px",
            textTransform: "uppercase",
            textShadow: "0 0 16px rgba(0, 242, 254, 0.8)",
            marginBottom: 6,
          }}
        >
          EXPERIMENT // CENTRAL LIMIT THEOREM
        </div>

        {/* Main Title: Floating Kinetic Typography */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "1px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 242, 254, 0.4)",
            lineHeight: 1.15,
            marginBottom: 10,
          }}
        >
          PAPAN GALTON & KURVA NORMAL
        </div>

        {/* Challenge Hook Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: isClimax ? "#FFE600" : "#E2E8F0",
            letterSpacing: "0.5px",
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.95)",
            marginBottom: 10,
            transition: "color 0.3s ease",
          }}
        >
          {isClimax
            ? "KEACAKAN MENGHASILKAN KETERATURAN MUTLAK"
            : "BISAKAH 360 BOLA ACAK MEMBENTUK POLA SEMPURNA?"}
        </div>

        {/* Mathematical Formula Pill Overlay */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "8px 24px",
            borderRadius: 30,
            background: "rgba(10, 15, 29, 0.85)",
            border: "1.5px solid rgba(0, 242, 254, 0.4)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 242, 254, 0.25)",
          }}
        >
          <span style={{ color: "#FFE600", fontSize: 22, fontWeight: 900, fontFamily: "monospace" }}>
            f(x) = (1 / σ√(2π)) · e^(-(x - μ)² / 2σ²)
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: 18 }}>|</span>
          <span style={{ color: "#38EF7D", fontSize: 20, fontWeight: 800 }}>
            p = 0.5 (50:50)
          </span>
        </div>
      </div>

      {/* =========================================================================
          TOP FUNNEL APPARATUS (y: 230 - 395)
          ========================================================================= */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <defs>
          <linearGradient id="funnelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.8" />
          </linearGradient>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Funnel Outline */}
        {/* Left Funnel Wall */}
        <path
          d="M 380 260 L 515 375 L 515 400"
          fill="none"
          stroke="url(#funnelGrad)"
          strokeWidth="3.5"
          filter="url(#neonGlow)"
        />
        {/* Right Funnel Wall */}
        <path
          d="M 700 260 L 565 375 L 565 400"
          fill="none"
          stroke="url(#funnelGrad)"
          strokeWidth="3.5"
          filter="url(#neonGlow)"
        />
        {/* Funnel Throat Guide Lines */}
        <line
          x1="520"
          y1="380"
          x2="560"
          y2="380"
          stroke="#00F2FE"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.6"
        />

        {/* Outer Triangular Housing Framework for Pegs */}
        <path
          d={`M ${CX} 390 L 860 1090 L 220 1090 Z`}
          fill="none"
          stroke="rgba(0, 242, 254, 0.15)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>

      {/* Pascal Triangle Row Mathematical Annotations on left side */}
      <div
        style={{
          position: "absolute",
          top: ROW_START_Y - 10,
          left: 45,
          display: "flex",
          flexDirection: "column",
          gap: 36,
          zIndex: 8,
          pointerEvents: "none",
        }}
      >
        {[
          { label: "N = 0", sub: "Pelepasan" },
          { label: "N = 3", sub: "1 · 3 · 3 · 1" },
          { label: "N = 6", sub: "Peluang Acak" },
          { label: "N = 9", sub: "Difusi Partikel" },
          { label: "N = 12", sub: "B(12, 0.5)" },
        ].map((item, idx) => (
          <div key={idx} style={{ opacity: 0.55 }}>
            <div style={{ color: "#00F2FE", fontSize: 13, fontWeight: 800, fontFamily: "monospace" }}>
              {item.label}
            </div>
            <div style={{ color: "#94A3B8", fontSize: 11, fontWeight: 600 }}>
              {item.sub}
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
          THE QUINCUNX: 12 ROWS OF PEGS (Pascal's Matrix)
          ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          pointerEvents: "none",
          zIndex: 15,
        }}
      >
        {PEGS.map((peg) => {
          const isActive = data.active_pegs.includes(peg.id);
          const pegScale = isActive ? 1.45 : 1.0;

          return (
            <React.Fragment key={peg.id}>
              {/* Reactive Bloom Halo when hit by a falling ball */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: peg.x - 22,
                    top: peg.y - 22,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0, 242, 254, 0.95) 0%, rgba(0, 242, 254, 0) 70%)",
                    transform: `scale(${pegScale})`,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Physical Peg Pin */}
              <div
                style={{
                  position: "absolute",
                  left: peg.x - 7,
                  top: peg.y - 7,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#FFFFFF" : "#1E293B",
                  border: isActive
                    ? "2.5px solid #00F2FE"
                    : "2px solid rgba(148, 163, 184, 0.45)",
                  boxShadow: isActive
                    ? "0 0 18px #00F2FE, 0 0 30px #00F2FE"
                    : "0 2px 6px rgba(0, 0, 0, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${pegScale})`,
                }}
              >
                {/* Center Core Dot */}
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: isActive ? "#FFE600" : "#64748B",
                  }}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* =========================================================================
          BOTTOM VERTICAL GLASS BINS (13 Bins)
          ========================================================================= */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          pointerEvents: "none",
          zIndex: 12,
        }}
      >
        <defs>
          <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#00F2FE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="centerBinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE600" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#FFE600" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFE600" stopOpacity="1.0" />
          </linearGradient>
        </defs>

        {/* Glass Bin Vertical Dividers (14 Lines for 13 Bins) */}
        {Array.from({ length: NUM_BINS + 1 }).map((_, i) => {
          const divX = BIN_LEFT + i * BIN_WIDTH;
          const isCenterDivider = i === 6 || i === 7;
          return (
            <React.Fragment key={i}>
              {/* Divider Glow & Line */}
              <line
                x1={divX}
                y1={BIN_START_Y - 12}
                x2={divX}
                y2={BIN_FLOOR_Y}
                stroke={isCenterDivider && isClimax ? "url(#centerBinGrad)" : "url(#dividerGrad)"}
                strokeWidth={isCenterDivider ? 2.5 : 1.8}
              />
              {/* Funnel Tooth Top Cap on Divider */}
              <circle
                cx={divX}
                cy={BIN_START_Y - 12}
                r="3"
                fill={isCenterDivider && isClimax ? "#FFE600" : "#00F2FE"}
              />
            </React.Fragment>
          );
        })}

        {/* Acrylic Glass Base Floor Slab */}
        <line
          x1={BIN_LEFT - 10}
          y1={BIN_FLOOR_Y}
          x2={BIN_LEFT + NUM_BINS * BIN_WIDTH + 10}
          y2={BIN_FLOOR_Y}
          stroke="#00F2FE"
          strokeWidth="4"
          filter="url(#neonGlow)"
        />

        {/* Bin Base Reflection Floor */}
        <rect
          x={BIN_LEFT}
          y={BIN_FLOOR_Y + 1}
          width={NUM_BINS * BIN_WIDTH}
          height="12"
          fill="rgba(0, 242, 254, 0.15)"
        />

        {/* Dynamic Gaussian Bell Curve Overlay Path */}
        <path
          d={curvePathD}
          fill="none"
          stroke={isClimax ? "#FFE600" : "#00F2FE"}
          strokeWidth={isClimax ? 4.5 : 3.0}
          strokeDasharray={frame < 400 ? "6 6" : "none"}
          opacity={curveGlowOpacity}
          filter="url(#neonGlow)"
        />

        {/* Area under the Gaussian curve: translucent solar/cyan wash */}
        {frame >= 400 && (
          <path
            d={`${curvePathD} L ${BIN_LEFT + NUM_BINS * BIN_WIDTH} ${BIN_FLOOR_Y} L ${BIN_LEFT} ${BIN_FLOOR_Y} Z`}
            fill={isClimax ? "rgba(255, 230, 0, 0.08)" : "rgba(0, 242, 254, 0.05)"}
            opacity={curveGlowOpacity * 0.7}
          />
        )}
      </svg>

      {/* Bin Statistical Labels (-3σ ... μ ... +3σ) */}
      <div
        style={{
          position: "absolute",
          top: BIN_FLOOR_Y + 14,
          left: BIN_LEFT,
          width: NUM_BINS * BIN_WIDTH,
          display: "flex",
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        {BIN_LABELS.map((lbl, idx) => {
          const isMean = idx === 6;
          const count = data.bin_counts[idx];
          return (
            <div
              key={idx}
              style={{
                width: BIN_WIDTH,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: isMean ? 13 : 11,
                  fontWeight: isMean ? 900 : 700,
                  color: isMean ? "#FFE600" : "#94A3B8",
                  fontFamily: "monospace",
                  textShadow: isMean ? "0 0 8px rgba(255, 230, 0, 0.8)" : "none",
                }}
              >
                {lbl}
              </div>
              {/* Settled ball count per bin */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: isMean ? "#FFE600" : count > 0 ? "#38EF7D" : "#475569",
                  fontFamily: "monospace",
                  marginTop: 2,
                }}
              >
                {count}
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          FALLING & SETTLED NEON PARTICLES (360 BALLS)
          ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        {data.balls.map((b, idx) => {
          const [bx, by, colIdx, isSettled] = b;
          const ballCol = BALL_COLORS[colIdx % BALL_COLORS.length];
          const ballR = 7.5;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: bx - ballR,
                top: by - ballR,
                width: ballR * 2,
                height: ballR * 2,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${ballCol} 55%, rgba(0,0,0,0.4) 100%)`,
                boxShadow: isSettled
                  ? `0 0 5px ${ballCol}`
                  : `0 0 10px ${ballCol}, 0 0 20px ${ballCol}`,
                transform: isClimax && isSettled ? `scale(${climaxPulse})` : "none",
              }}
            />
          );
        })}
      </div>

      {/* =========================================================================
          CLIMAX CELEBRATION OVERLAY: Standard Deviations (f >= 640)
          ========================================================================= */}
      {isClimax && (
        <div
          style={{
            position: "absolute",
            top: 1115,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 20,
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              padding: "6px 18px",
              borderRadius: 20,
              backgroundColor: "rgba(10, 15, 29, 0.9)",
              border: "1.5px solid #FFE600",
              boxShadow: "0 0 20px rgba(255, 230, 0, 0.4)",
              color: "#FFE600",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            ±1σ: 68.2% DATA
          </div>
          <div
            style={{
              padding: "6px 18px",
              borderRadius: 20,
              backgroundColor: "rgba(10, 15, 29, 0.9)",
              border: "1.5px solid #00F2FE",
              boxShadow: "0 0 20px rgba(0, 242, 254, 0.4)",
              color: "#00F2FE",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            ±2σ: 95.4% DATA
          </div>
        </div>
      )}

      {/* =========================================================================
          BOTTOM HUD & TELEMETRY: Safe Zone (y: 1720 - 1860)
          ========================================================================= */}
      <div
        style={{
          position: "absolute",
          bottom: 45,
          left: 50,
          right: 50,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 50,
        }}
      >
        {/* Real-time Telemetry Counters */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Metric: Total Balls Settled */}
          <div>
            <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 700, letterSpacing: "1px" }}>
              BOLA TERSELESAIKAN
            </div>
            <div style={{ color: "#00F2FE", fontSize: 28, fontWeight: 900, fontFamily: "monospace" }}>
              {data.total_settled} <span style={{ fontSize: 18, color: "#64748B" }}>/ 360</span>
            </div>
          </div>

          {/* Center Metric: Status Dynamic */}
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 700, letterSpacing: "1px" }}>
              STATUS DISTRIBUSI
            </div>
            <div
              style={{
                color: isClimax ? "#FFE600" : "#FFFFFF",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textShadow: isClimax ? "0 0 15px rgba(255, 230, 0, 0.8)" : "none",
              }}
            >
              {statusText}
            </div>
          </div>

          {/* Right Metric: Peak Bin */}
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 700, letterSpacing: "1px" }}>
              PUNCAK RATA-RATA (μ)
            </div>
            <div style={{ color: "#FFE600", fontSize: 28, fontWeight: 900, fontFamily: "monospace" }}>
              BIN 6: {data.bin_counts[6]}
            </div>
          </div>
        </div>

        {/* Experiment Completion Progress Bar */}
        <div
          style={{
            width: "100%",
            height: 8,
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(0, 242, 254, 0.2)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(data.completion_ratio * 100).toFixed(1)}%`,
              background: "linear-gradient(90deg, #00F2FE 0%, #38EF7D 60%, #FFE600 100%)",
              boxShadow: "0 0 12px #00F2FE",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};
