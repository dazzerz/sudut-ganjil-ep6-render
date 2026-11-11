import React from "react";
import { useCurrentFrame, staticFile, Audio, interpolate, Easing } from "remotion";
import rawSim from "./trueSquishSimData.json";

interface SimFrame {
  f: number;
  stage_id: number;
  stage_name: string;
  top_plate_y: number;
  bot_plate_y: number;
  gap: number;
  count: number;
  squeeze: number;
  is_bloom: boolean;
  is_release: boolean;
  balls: [number, number, number, number, number, string, string][];
}

interface SimData {
  total_frames: number;
  frames: SimFrame[];
}

const simData = rawSim as unknown as SimData;
const frames = simData.frames;
export const TRUE_SQUISH_TOTAL_FRAMES = frames.length;

const CX = 540;
const CY = 960;
const CHAMBER_W = 720;
const LEFT_COL_X = CX - CHAMBER_W / 2;
const RIGHT_COL_X = CX + CHAMBER_W / 2;

export const TrueSquishASMR: React.FC = () => {
  const frame = useCurrentFrame();
  const safeFrame = Math.min(Math.max(0, frame), frames.length - 1);
  const data = frames[safeFrame];

  // Stage colors
  const stageColors: Record<string, string> = {
    "MOONLIGHT CYAN": "#00F2FE",
    "SAKURA BLOSSOM": "#FF3388",
    "SOLAR AMBER": "#FFB800",
    "EMERALD MINT": "#00E676",
    "COSMIC AMETHYST": "#B388FF",
  };
  const activeColor = stageColors[data.stage_name] || "#00F2FE";

  // Gentle camera zoom during cosmic release (f >= 1025)
  const cameraScale = interpolate(frame, [1025, 1140], [1.0, 0.88], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Soft localized chamber glow on bloom
  const bloomFlash = data.is_bloom ? 0.75 : 0;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#07080D",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
      }}
    >
      {/* Therapeutic Master ASMR Audio (Velvet Air + Kalimba + Water Bloops) */}
      <Audio src={staticFile("audio/true_squish_asmr.mp3")} />

      {/* Deep Zen Midnight Atmosphere */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 540px 960px, #101424 0%, #090B12 55%, #040508 100%)`,
          opacity: 0.98,
        }}
      />

      {/* Floating Ambient Starlight Particles (Calming Depth) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px), radial-gradient(rgba(0, 242, 254, 0.06) 1.5px, transparent 1.5px)",
          backgroundSize: "90px 90px, 140px 140px",
          backgroundPosition: "0 0, 45px 45px",
          opacity: 0.55,
        }}
      />

      {/* Localized Chamber Bloom Glow (Soft light bloom between plates) */}
      {bloomFlash > 0 && (
        <div
          style={{
            position: "absolute",
            top: data.top_plate_y - 25,
            left: LEFT_COL_X - 20,
            width: CHAMBER_W + 40,
            height: Math.max(50, data.bot_plate_y - data.top_plate_y + 50),
            background: `radial-gradient(ellipse at center, ${activeColor}B3 0%, ${activeColor}33 50%, transparent 75%)`,
            opacity: bloomFlash,
            pointerEvents: "none",
            mixBlendMode: "screen",
            filter: "blur(14px)",
          }}
        />
      )}

      {/* Main Physics Arena Container with Camera Scale */}
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
            {/* Bioluminescent Jelly Glow */}
            <filter id="zenGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Obsidian Glass Plate Shadow */}
            <filter id="glassShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="16" floodColor="#000000" floodOpacity="0.8" />
            </filter>

            {/* Polished Obsidian Plate Gradient (Top) */}
            <linearGradient id="topPlateGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E2333" />
              <stop offset="50%" stopColor="#121622" />
              <stop offset="95%" stopColor="#252C3E" />
              <stop offset="100%" stopColor={activeColor} />
            </linearGradient>

            {/* Polished Obsidian Plate Gradient (Bottom) */}
            <linearGradient id="botPlateGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeColor} />
              <stop offset="5%" stopColor="#252C3E" />
              <stop offset="50%" stopColor="#121622" />
              <stop offset="100%" stopColor="#1E2333" />
            </linearGradient>

            {/* Translucent Gel Core Gradient Volume */}
            <radialGradient id="gelVolumeGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </radialGradient>
          </defs>

          {/* Minimalist Vertical Guide Rails (Left & Right) */}
          <line
            x1={LEFT_COL_X - 16}
            y1={CY - 460}
            x2={LEFT_COL_X - 16}
            y2={CY + 460}
            stroke="#1E2638"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1={LEFT_COL_X - 16}
            y1={CY - 460}
            x2={LEFT_COL_X - 16}
            y2={CY + 460}
            stroke={activeColor}
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />

          <line
            x1={RIGHT_COL_X + 16}
            y1={CY - 460}
            x2={RIGHT_COL_X + 16}
            y2={CY + 460}
            stroke="#1E2638"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1={RIGHT_COL_X + 16}
            y1={CY - 460}
            x2={RIGHT_COL_X + 16}
            y2={CY + 460}
            stroke={activeColor}
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />

          {/* Top Polished Obsidian Glass Plate (Gliding Downwards) */}
          <g filter="url(#glassShadow)">
            <rect
              x={LEFT_COL_X}
              y={data.top_plate_y - 55}
              width={CHAMBER_W}
              height={55}
              fill="url(#topPlateGrad)"
              stroke="#333E54"
              strokeWidth="2"
              rx="12"
            />
            {/* Luminous Bevel Contact Horizon */}
            <line
              x1={LEFT_COL_X + 8}
              y1={data.top_plate_y}
              x2={RIGHT_COL_X - 8}
              y2={data.top_plate_y}
              stroke={activeColor}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#zenGlow)"
            />
          </g>

          {/* Bottom Polished Obsidian Glass Plate (Gliding Upwards) */}
          <g filter="url(#glassShadow)">
            <rect
              x={LEFT_COL_X}
              y={data.bot_plate_y}
              width={CHAMBER_W}
              height={55}
              fill="url(#botPlateGrad)"
              stroke="#333E54"
              strokeWidth="2"
              rx="12"
            />
            {/* Luminous Bevel Contact Horizon */}
            <line
              x1={LEFT_COL_X + 8}
              y1={data.bot_plate_y}
              x2={RIGHT_COL_X - 8}
              y2={data.bot_plate_y}
              stroke={activeColor}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#zenGlow)"
            />
            {/* Subtle Aesthetic Accent Dots */}
            {Array.from({ length: 9 }).map((_, i) => (
              <circle
                key={`dot-${i}`}
                cx={LEFT_COL_X + 65 + i * 74}
                cy={data.bot_plate_y + 28}
                r="3"
                fill="#334155"
              />
            ))}
          </g>

          {/* The Luminous Soft-Body Jelly Pearls */}
          {data.balls.map(([bx, by, brx, bry, bcomp, bcol, bglow], idx) => {
            const isCompressed = bcomp > 0.15;
            const coreLuminance = isCompressed ? 0.95 : 0.65;
            const specularScale = Math.max(0.2, 1.0 - bcomp * 0.7);

            return (
              <g key={`zenpearl-${idx}`} transform={`translate(${bx}, ${by})`}>
                {/* 1. Outer Bioluminescent Aura */}
                {isCompressed ? (
                  <rect
                    x={-brx - 3}
                    y={-bry - 3}
                    width={(brx + 3) * 2}
                    height={(bry + 3) * 2}
                    rx={bry + 3}
                    ry={bry + 3}
                    fill={bglow}
                    opacity={coreLuminance * 0.65}
                    filter="url(#zenGlow)"
                  />
                ) : (
                  <ellipse
                    cx={0}
                    cy={0}
                    rx={brx + 3.5}
                    ry={bry + 3.5}
                    fill={bglow}
                    opacity={coreLuminance * 0.55}
                    filter="url(#zenGlow)"
                  />
                )}

                {/* 2. Soft Jelly Pearl Body (Flush with plates when squished) */}
                {isCompressed ? (
                  <rect
                    x={-brx}
                    y={-bry}
                    width={brx * 2}
                    height={bry * 2}
                    rx={bry}
                    ry={bry}
                    fill={bcol}
                    stroke="#FFFFFF"
                    strokeWidth={bcomp > 0.35 ? "1.8" : "0.75"}
                    strokeOpacity={bcomp > 0.35 ? "0.9" : "0.5"}
                  />
                ) : (
                  <ellipse
                    cx={0}
                    cy={0}
                    rx={brx}
                    ry={bry}
                    fill={bcol}
                    stroke="#FFFFFF"
                    strokeWidth="0.75"
                    strokeOpacity="0.5"
                  />
                )}

                {/* 3. 3D Translucent Volume Shading */}
                {isCompressed ? (
                  <rect
                    x={-brx * 0.9}
                    y={-bry * 0.9}
                    width={brx * 1.8}
                    height={bry * 1.8}
                    rx={bry * 0.9}
                    ry={bry * 0.9}
                    fill="url(#gelVolumeGrad)"
                    opacity={0.65}
                  />
                ) : (
                  <ellipse
                    cx={0}
                    cy={0}
                    rx={brx * 0.9}
                    ry={bry * 0.9}
                    fill="url(#gelVolumeGrad)"
                    opacity={0.65}
                  />
                )}

                {/* 4. Liquid Specular Reflection */}
                <ellipse
                  cx={-brx * 0.28}
                  cy={-bry * 0.32}
                  rx={Math.max(2.5, brx * 0.34 * specularScale)}
                  ry={Math.max(1.8, bry * 0.24 * specularScale)}
                  fill="#FFFFFF"
                  opacity="0.92"
                />

                {/* 5. Delicate Secondary Rim Specular */}
                <ellipse
                  cx={brx * 0.25}
                  cy={bry * 0.28}
                  rx={Math.max(1.5, brx * 0.18 * specularScale)}
                  ry={Math.max(1.0, bry * 0.14 * specularScale)}
                  fill="#FFFFFF"
                  opacity="0.55"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Kinetic Typography (Top Safe Zone: y ~160px) */}
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
            textShadow: `0 4px 18px rgba(0,0,0,0.95), 0 0 32px ${activeColor}55`,
            lineHeight: 1.15,
            padding: "0 60px",
          }}
        >
          KINETIC JELLY ASMR
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
          Deformasi Soft-Body · Nada Kalimba · Relaksasi Murni
        </div>

        {/* Minimalist Glowing Progress Indicator */}
        <div
          style={{
            marginTop: 24,
            width: 480,
            height: 6,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: 3,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${(safeFrame / (frames.length - 1)) * 100}%`,
              height: "100%",
              backgroundColor: activeColor,
              boxShadow: `0 0 14px ${activeColor}`,
            }}
          />
        </div>
      </div>

      {/* Floating HUD Footer (Bottom Safe Zone: y ~1680px) */}
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
        {/* Pearl Count Live Counter */}
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
            JUMLAH PEARL
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

        {/* Stage Name Badge */}
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
            {data.stage_name}
          </div>
        </div>
      </div>
    </div>
  );
};
