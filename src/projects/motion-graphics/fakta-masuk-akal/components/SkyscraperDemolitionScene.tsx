import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  crumbleProgress: number; // 0 to 1
}

export const SkyscraperDemolitionScene: React.FC<Props> = ({ crumbleProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Violent screen shake when buildings collapse
  const shake = crumbleProgress > 0.1 && crumbleProgress < 0.8
    ? Math.sin(frame * 1.2) * 18 * (1 - crumbleProgress * 0.4)
    : 0;

  // Thousands of dust particles and falling debris
  const debris = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: 100 + (i * 17) % 900,
      y: 400 + (i * 31) % 900,
      size: 12 + (i % 6) * 10,
      speed: 8 + (i % 5) * 6,
      rot: (i * 35) % 360,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0F172A",
        background: "linear-gradient(180deg, #1E293B 0%, #0F172A 40%, #020617 100%)",
        transform: `translate(${shake}px, ${shake * 0.5}px)`,
      }}
    >
      {/* Dynamic Background Atmosphere Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: 900,
          height: 900,
          marginLeft: -450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Full-Screen Skyline Illustration (NO BOXES) */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Background Skyline (Distant Towers) */}
        <g opacity="0.35">
          <rect x="80" y="700" width="120" height="900" fill="#334155" />
          <rect x="230" y="600" width="140" height="1000" fill="#1E293B" />
          <rect x="740" y="650" width="130" height="950" fill="#334155" />
          <rect x="890" y="750" width="110" height="850" fill="#1E293B" />
        </g>

        {/* Hero Skyscraper 1 (Left Tower) */}
        <g
          style={{
            transformOrigin: "300px 1600px",
            transform: `translateY(${crumbleProgress * 300}px) scaleY(${1 - crumbleProgress * 0.7})`,
            opacity: 1 - crumbleProgress * 0.8,
          }}
        >
          <rect
            x="180"
            y="420"
            width="240"
            height="1180"
            fill="#475569"
            stroke="#94A3B8"
            strokeWidth="3"
          />
          {/* Windows Grid */}
          {Array.from({ length: 30 }).map((_, i) => (
            <rect
              key={i}
              x={210 + (i % 4) * 50}
              y={460 + Math.floor(i / 4) * 80}
              width="32"
              height="45"
              fill={crumbleProgress > 0.2 ? "#CBD5E1" : "#38BDF8"}
              opacity={0.8}
            />
          ))}

          {/* Jagged Fracture Lines across the building */}
          {crumbleProgress > 0.1 && (
            <path
              d="M 180 600 L 280 680 L 250 820 L 360 920 L 320 1100 L 420 1200"
              stroke="#EF4444"
              strokeWidth="8"
              fill="none"
              style={{ filter: "drop-shadow(0 0 10px #FF1744)" }}
            />
          )}
        </g>

        {/* Hero Skyscraper 2 (Center Massive Mega-Tower) */}
        <g
          style={{
            transformOrigin: "540px 1600px",
            transform: `translateY(${crumbleProgress * 450}px) scaleY(${1 - crumbleProgress * 0.85})`,
            opacity: 1 - crumbleProgress * 0.9,
          }}
        >
          <rect
            x="440"
            y="300"
            width="260"
            height="1300"
            fill="#334155"
            stroke="#64748B"
            strokeWidth="4"
          />
          {/* Tower Spire */}
          <polygon points="560,300 580,300 570,180" fill="#EF4444" />
          {/* Windows Grid */}
          {Array.from({ length: 48 }).map((_, i) => (
            <rect
              key={i}
              x={470 + (i % 5) * 45}
              y={340 + Math.floor(i / 5) * 75}
              width="28"
              height="42"
              fill={crumbleProgress > 0.15 ? "#E2E8F0" : "#FDE047"}
              opacity={0.85}
            />
          ))}

          {/* Giant Fracture Crack */}
          {crumbleProgress > 0.08 && (
            <path
              d="M 440 500 L 530 620 L 500 780 L 640 920 L 580 1120 L 700 1300"
              stroke="#FF1744"
              strokeWidth="10"
              fill="none"
              style={{ filter: "drop-shadow(0 0 15px #FF1744)" }}
            />
          )}
        </g>

        {/* Hero Skyscraper 3 (Right Tower) */}
        <g
          style={{
            transformOrigin: "780px 1600px",
            transform: `translateY(${crumbleProgress * 320}px) scaleY(${1 - crumbleProgress * 0.75})`,
            opacity: 1 - crumbleProgress * 0.8,
          }}
        >
          <rect
            x="720"
            y="480"
            width="220"
            height="1120"
            fill="#475569"
            stroke="#94A3B8"
            strokeWidth="3"
          />
          {/* Windows */}
          {Array.from({ length: 28 }).map((_, i) => (
            <rect
              key={i}
              x={750 + (i % 4) * 46}
              y={520 + Math.floor(i / 4) * 80}
              width="30"
              height="45"
              fill={crumbleProgress > 0.2 ? "#CBD5E1" : "#38BDF8"}
              opacity={0.8}
            />
          ))}
        </g>

        {/* Suspension Bridge in Background/Midground */}
        <g
          style={{
            transformOrigin: "540px 1450px",
            transform: `translateY(${crumbleProgress * 150}px)`,
          }}
        >
          {/* Bridge Roadway */}
          <rect x="0" y="1380" width="1080" height="32" fill="#475569" />
          {/* Suspension Cables */}
          <path
            d="M 0 1260 Q 270 1380 540 1260 Q 810 1380 1080 1260"
            stroke={crumbleProgress > 0.3 ? "#EF4444" : "#64748B"}
            strokeWidth="6"
            strokeDasharray={crumbleProgress > 0.3 ? "12 10" : "none"}
            fill="none"
          />
        </g>
      </svg>

      {/* Billowing Dust & Debris Explosion Covering the Canvas */}
      {debris.map((d) => {
        const fallY = d.y + crumbleProgress * (d.speed * 80);
        const spreadX = d.x + Math.sin(frame * 0.1 + d.id) * 60;
        const opacity = Math.min(1, crumbleProgress * 1.5) * (1 - crumbleProgress * 0.4);

        return (
          <div
            key={d.id}
            style={{
              position: "absolute",
              left: spreadX,
              top: fallY,
              width: d.size * (1 + crumbleProgress * 2),
              height: d.size * (1 + crumbleProgress * 2),
              backgroundColor: d.id % 2 === 0 ? "#E2E8F0" : "#94A3B8",
              borderRadius: d.id % 3 === 0 ? "50%" : 4,
              opacity,
              transform: `rotate(${d.rot + frame * 4}deg)`,
              filter: "blur(1px)",
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Full-Bleed Technical Callouts sitting directly on screen (NO BOXES) */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 70,
          right: 70,
          borderLeft: "6px solid #EF4444",
          paddingLeft: 20,
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 900, color: "#EF4444", letterSpacing: 3 }}>
          FAKTA 01 // DEKONSTRUKSI SILIKAT
        </div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            lineHeight: 1.1,
            marginTop: 6,
            textShadow: "0 4px 20px #000000",
          }}
        >
          SEMUA BETON HANCUR JADI DEBU
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#38BDF8",
            marginTop: 10,
            textShadow: "0 2px 10px #000000",
          }}
        >
          Oksigen = Molekul Pengikat Utama Partikel Semen (C-S-H)
        </div>
      </div>
    </div>
  );
};
