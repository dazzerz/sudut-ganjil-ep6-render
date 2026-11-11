import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  ruptureProgress: number; // 0 to 1
}

export const EarAnatomyRuptureScene: React.FC<Props> = ({ ruptureProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Violent eardrum vibration
  const isRuptured = ruptureProgress > 0.35;
  const vibration = !isRuptured ? Math.sin(frame * 0.8) * 14 : 0;
  const shockRingRadius = interpolate(ruptureProgress, [0.35, 1], [40, 500], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0F172A",
        background: "radial-gradient(circle at 50% 50%, #1E1B4B 0%, #0F172A 60%, #020617 100%)",
      }}
    >
      {/* Full-Screen Anatomical Cross-Section of the Ear Canal (NO BOXES) */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Surrounding Cranial Bone & Muscle Cutaway (Pinkish-Warm Tissue) */}
        <path
          d="M 0 0 L 1080 0 L 1080 620 C 800 620, 720 540, 540 680 C 380 680, 200 620, 0 620 Z"
          fill="#4A1525"
          opacity="0.8"
        />
        <path
          d="M 0 1920 L 1080 1920 L 1080 1300 C 800 1300, 720 1380, 540 1240 C 380 1240, 200 1300, 0 1300 Z"
          fill="#4A1525"
          opacity="0.8"
        />

        {/* Ear Canal (Liang Telinga) Pathway */}
        <path
          d="M 0 960 Q 300 900 520 960"
          stroke="#1E293B"
          strokeWidth="320"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner Ear Cavity */}
        <path
          d="M 520 960 Q 750 1020 1080 960"
          stroke="#2E1065"
          strokeWidth="340"
          strokeLinecap="round"
          fill="none"
        />

        {/* Pressure Gradient Arrows Blasting Inwards */}
        {Array.from({ length: 6 }).map((_, i) => {
          const arrowX = 80 + i * 70 + (frame * 3) % 80;
          return (
            <polygon
              key={i}
              points={`${arrowX},920 ${arrowX + 40},960 ${arrowX},1000`}
              fill="#EF4444"
              opacity={0.85}
              style={{ filter: "drop-shadow(0 0 8px #FF1744)" }}
            />
          );
        })}

        {/* Tympanic Membrane (Gendang Telinga) - Center Stage */}
        <g style={{ transformOrigin: "520px 960px" }}>
          {/* Main Membrane Line */}
          <line
            x1={520 + vibration}
            y1="760"
            x2={520 - vibration}
            y2="1160"
            stroke={isRuptured ? "#DC2626" : "#38BDF8"}
            strokeWidth={isRuptured ? "12" : "24"}
            strokeDasharray={isRuptured ? "24 16" : "none"}
            strokeLinecap="round"
            style={{
              filter: isRuptured
                ? "drop-shadow(0 0 25px rgba(220, 38, 38, 1))"
                : "drop-shadow(0 0 20px rgba(56, 189, 248, 0.8))",
            }}
          />

          {/* Malleus / Incus Bone Attached to Membrane */}
          <path
            d="M 520 860 L 640 820 L 700 860"
            stroke="#FDE047"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            style={{ filter: "drop-shadow(0 0 10px rgba(253, 224, 71, 0.7))" }}
          />
          {/* Cochlea (Rumah Siput) Spiral */}
          <circle cx="820" cy="940" r="90" fill="#4338CA" stroke="#818CF8" strokeWidth="12" />
          <circle cx="820" cy="940" r="50" fill="#312E81" />
        </g>

        {/* Acoustic Shockwave Burst at the exact moment of rupture */}
        {isRuptured && (
          <circle
            cx="520"
            cy="960"
            r={shockRingRadius}
            fill="none"
            stroke="#EF4444"
            strokeWidth="12"
            opacity={1 - ruptureProgress * 0.8}
            style={{ filter: "drop-shadow(0 0 20px #FF1744)" }}
          />
        )}

        {/* Technical Callout Hairlines (NO BOXES) */}
        <line x1="240" y1="740" x2="240" y2="880" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />
        <text x="140" y="720" fill="#94A3B8" fontSize="26" fontWeight="bold" fontFamily="monospace">
          LIANG TELINGA LUAR (1.0 ATM)
        </text>

        <line x1="520" y1="640" x2="520" y2="740" stroke="#EF4444" strokeWidth="3" />
        <circle cx="520" cy="740" r="6" fill="#EF4444" />
        <text
          x="360"
          y="620"
          fill={isRuptured ? "#FF1744" : "#38BDF8"}
          fontSize="36"
          fontWeight="900"
          fontFamily="'Montserrat', system-ui, sans-serif"
          style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.8))" }}
        >
          {isRuptured ? "⚡ GENDANG PECAH!" : "MEMBRAN TIMPANI"}
        </text>

        <line x1="820" y1="780" x2="820" y2="840" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />
        <text x="740" y="760" fill="#94A3B8" fontSize="26" fontWeight="bold" fontFamily="monospace">
          RUMAH SIPUT (KOKLEA)
        </text>
      </svg>

      {/* Full-Bleed Technical Header sitting directly on canvas (NO BOXES) */}
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
          FAKTA 02 // BAROTRAUMA AKUT
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
          GENDANG TELINGA PECAH SERENTAK!
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#FDE047",
            marginTop: 10,
            textShadow: "0 2px 10px #000000",
          }}
        >
          Kehilangan 21% Tekanan Udara Seketika (Dekompresi Kilat)
        </div>
      </div>
    </div>
  );
};
