import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const WastelandRecoveryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shockwave of returning oxygen at the 5th second
  const waveRadius = interpolate(frame, [0, 80], [0, 1400], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0B0F19",
        background: "linear-gradient(180deg, #0F172A 0%, #1E293B 55%, #050811 100%)",
      }}
    >
      {/* Full-Screen Destroyed Landscape Silhouette */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Distant Ruins */}
        <polygon
          points="0,1500 120,1460 200,1510 350,1420 480,1490 620,1440 780,1520 920,1450 1080,1500 1080,1920 0,1920"
          fill="#1E293B"
          opacity="0.6"
        />

        {/* Foreground Destroyed Rubble & Slabs */}
        <polygon
          points="0,1650 180,1600 320,1660 500,1580 680,1670 860,1620 1080,1680 1080,1920 0,1920"
          fill="#0F172A"
        />

        {/* Scattered broken rebar & concrete beams */}
        <line x1="220" y1="1620" x2="310" y2="1540" stroke="#64748B" strokeWidth="8" />
        <line x1="680" y1="1650" x2="740" y2="1560" stroke="#64748B" strokeWidth="10" />
        <line x1="880" y1="1630" x2="960" y2="1570" stroke="#64748B" strokeWidth="8" />

        {/* Returning Oxygen Shockwave Blast */}
        <circle
          cx="540"
          cy="1600"
          r={waveRadius}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="16"
          opacity={Math.max(0, 1 - waveRadius / 1400)}
          style={{ filter: "drop-shadow(0 0 35px #00E5FF)" }}
        />
      </svg>

      {/* Floating dust and oxygen molecules revitalizing */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 23) % 90 + 5}%`,
            top: `${1100 + ((i * 37) % 650)}px`,
            width: (i % 3) * 4 + 6,
            height: (i % 3) * 4 + 6,
            backgroundColor: "#00E5FF",
            borderRadius: "50%",
            boxShadow: "0 0 14px #00E5FF",
            opacity: 0.8,
          }}
        />
      ))}

      {/* Full-Bleed Outro Section sitting directly on canvas (NO BOXES) */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 70,
          right: 70,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#00E5FF",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          KESIMPULAN SAINS
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            lineHeight: 1.1,
            marginTop: 12,
            textShadow: "0 0 40px rgba(0, 229, 255, 0.6), 0 4px 20px #000000",
          }}
        >
          MASUK AKAL KAN?
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#94A3B8",
            marginTop: 18,
            textShadow: "0 2px 10px #000000",
          }}
        >
          Oksigen bukan sekadar gas napas, melainkan perekat fisik planet Bumi!
        </div>

        {/* Scientific Citation Badges directly on canvas */}
        <div
          style={{
            marginTop: 60,
            display: "flex",
            justifyContent: "center",
            gap: 40,
            borderTop: "2px solid rgba(255, 255, 255, 0.15)",
            borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
            padding: "24px 0",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 18, color: "#64748B", fontWeight: 700 }}>SUMBER 01</div>
            <div style={{ fontSize: 26, color: "#FFFFFF", fontWeight: 900 }}>
              NASA Earth Observatory
            </div>
            <div style={{ fontSize: 16, color: "#38BDF8" }}>Atmospheric Physics & Ozone</div>
          </div>

          <div style={{ width: 2, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 18, color: "#64748B", fontWeight: 700 }}>SUMBER 02</div>
            <div style={{ fontSize: 26, color: "#FFFFFF", fontWeight: 900 }}>
              American Physical Society
            </div>
            <div style={{ fontSize: 16, color: "#38BDF8" }}>Molecular Bonds & Pressure</div>
          </div>
        </div>

        {/* Follow CTA */}
        <div
          style={{
            marginTop: 48,
            fontSize: 36,
            fontWeight: 900,
            color: "#FDE047",
            letterSpacing: 2,
            textShadow: "0 0 25px rgba(253, 224, 71, 0.8)",
          }}
        >
          👉 FOLLOW @FAKTAMASUKAKAL
        </div>
      </div>
    </div>
  );
};
