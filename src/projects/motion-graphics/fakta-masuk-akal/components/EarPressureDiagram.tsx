import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  ruptureProgress: number; // 0 to 1
}

export const EarPressureDiagram: React.FC<Props> = ({ ruptureProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { stiffness: 120, damping: 14 },
  });

  // Pulse wave animation representing pressure vacuum
  const pulse = Math.sin(frame * 0.2) * 8;
  const isRuptured = ruptureProgress > 0.4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 880,
        transform: `scale(${enterSpring})`,
      }}
    >
      {/* Ear Cross-Section Card */}
      <div
        style={{
          position: "relative",
          width: 800,
          height: 520,
          backgroundColor: "#FFFFFF",
          borderRadius: 36,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.08)",
          border: "3px solid #E2E8F0",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="740"
          height="460"
          viewBox="0 0 740 460"
          style={{ position: "relative" }}
        >
          {/* Ear Canal Pathway (Liang Telinga Luar) */}
          <path
            d="M 60 230 C 140 210, 220 220, 320 230"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="80"
            strokeLinecap="round"
          />

          {/* Inner Ear / Cochlea Area */}
          <path
            d="M 420 230 C 500 240, 580 210, 680 230"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="70"
            strokeLinecap="round"
          />

          {/* Pressure Differential Arrows (Outside Air Pressing In) */}
          {Array.from({ length: 4 }).map((_, i) => {
            const arrowX = 100 + i * 50 + (frame * 2) % 60;
            return (
              <polygon
                key={i}
                points={`${arrowX},215 ${arrowX + 25},230 ${arrowX},245`}
                fill="#EF4444"
                opacity={0.8}
              />
            );
          })}

          {/* Tympanic Membrane (Gendang Telinga) */}
          <line
            x1={370 + pulse}
            y1="160"
            x2={370 - pulse}
            y2="300"
            stroke={isRuptured ? "#DC2626" : "#0284C7"}
            strokeWidth={isRuptured ? "8" : "12"}
            strokeDasharray={isRuptured ? "14 10" : "none"}
            strokeLinecap="round"
            style={{
              filter: isRuptured
                ? "drop-shadow(0 0 12px rgba(220, 38, 38, 0.9))"
                : "drop-shadow(0 0 8px rgba(2, 132, 199, 0.5))",
            }}
          />

          {/* Rupture Shockwave Burst */}
          {isRuptured && (
            <circle
              cx="370"
              cy="230"
              r={interpolate(ruptureProgress, [0.4, 1], [20, 90], {
                extrapolateRight: "clamp",
              })}
              fill="none"
              stroke="#EF4444"
              strokeWidth="6"
              opacity={1 - ruptureProgress * 0.7}
            />
          )}

          {/* Cochlea (Rumah Siput) Stylized */}
          <circle cx="530" cy="230" r="45" fill="#FDE68A" stroke="#D97706" strokeWidth="6" />
          <circle cx="530" cy="230" r="24" fill="#F59E0B" />

          {/* Anatomical Labels */}
          <text x="80" y="150" fill="#64748B" fontSize="20" fontWeight="bold">
            Liang Telinga Luar
          </text>
          <text
            x="310"
            y="130"
            fill={isRuptured ? "#DC2626" : "#0369A1"}
            fontSize="22"
            fontWeight="900"
          >
            {isRuptured ? "⚡ GENDANG PECAH!" : "Gendang Telinga"}
          </text>
          <text x="500" y="150" fill="#B45309" fontSize="20" fontWeight="bold">
            Telinga Dalam
          </text>
        </svg>

        {/* Warning Badge at the top */}
        <div
          style={{
            position: "absolute",
            top: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#FEF2F2",
            border: "2px solid #FCA5A5",
            padding: "8px 24px",
            borderRadius: 20,
          }}
        >
          <span style={{ fontSize: 20 }}>⚠️</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: "#991B1B",
              letterSpacing: 1,
            }}
          >
            BAROTRAUMA AKUT EKSTREM (-21% TEKANAN UDARA)
          </span>
        </div>
      </div>

      {/* Scientific Explanation Footer */}
      <div
        style={{
          marginTop: 24,
          width: 800,
          backgroundColor: "#F8FAFC",
          border: "2px solid #E2E8F0",
          borderRadius: 24,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              backgroundColor: "#EFF6FF",
              border: "2px solid #BFDBFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            👂
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#1E293B",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Penyebab Medis:
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#DC2626" }}>
              Perbedaan Tekanan Mendadak (Dekompresi Kilat)
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "8px 18px",
            backgroundColor: "#FEE2E2",
            borderRadius: 16,
            border: "1px solid #FECACA",
            color: "#991B1B",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          Efek Seketika
        </div>
      </div>
    </div>
  );
};
