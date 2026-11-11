import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface TechnicalHairlinesProps {
  progress: number; // 0 to 1
}

export const TechnicalHairlines: React.FC<TechnicalHairlinesProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for ear pointer (appears early in scene)
  const earSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { stiffness: 180, damping: 14 },
  });

  // Entrance spring for throat pointer (appears middle of scene)
  const throatSpring = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { stiffness: 180, damping: 14 },
  });

  // Dynamic pressure reading: 15 -> 300 mmHg
  const pressureVal = Math.round(
    interpolate(progress, [0.1, 0.7, 1], [15, 300, 300], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Red alert flashing
  const alertFlash =
    pressureVal >= 250
      ? Math.sin((frame * 2 * Math.PI) / 8) * 0.4 + 0.6
      : 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. EAR ANCHOR & HAIRLINE (Points to Inner Ear / Eustachian Tube) */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 610,
          right: 90,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: earSpring,
          transform: `translateX(${interpolate(earSpring, [0, 1], [40, 0])}px)`,
        }}
      >
        {/* Hairline + Anchor point */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Label sitting directly on canvas */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginRight: 10,
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 2,
                color: "#EF4444",
                textTransform: "uppercase",
                fontFamily: "system-ui, sans-serif",
                textShadow: "0 0 12px rgba(239, 68, 68, 0.8), 0 2px 4px #000000",
              }}
            >
              RISIKO RUPTUR
            </span>
            <span
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFFFFF",
                fontFamily: "'Montserrat', system-ui, sans-serif",
                textShadow: "0 4px 14px #000000, 0 2px 4px #000000",
              }}
            >
              GENDANG TELINGA
            </span>
          </div>

          {/* Thin Hairline 2px */}
          <div
            style={{
              width: 140,
              height: 2,
              backgroundColor: "rgba(239, 68, 68, 0.9)",
              boxShadow: "0 0 8px rgba(239, 68, 68, 0.8)",
            }}
          />

          {/* Anchor Dot */}
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              boxShadow: "0 0 14px #EF4444",
              border: "2px solid #FFFFFF",
            }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. THROAT ANCHOR & HAIRLINE (Points to Pharynx / Trachea)     */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 960,
          left: 90,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: throatSpring,
          transform: `translateX(${interpolate(throatSpring, [0, 1], [-40, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Anchor Dot */}
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#F97316",
              boxShadow: "0 0 14px #F97316",
              border: "2px solid #FFFFFF",
            }}
          />

          {/* Thin Hairline 2px */}
          <div
            style={{
              width: 120,
              height: 2,
              backgroundColor: "rgba(249, 115, 22, 0.9)",
              boxShadow: "0 0 8px rgba(249, 115, 22, 0.8)",
            }}
          />

          {/* Label sitting directly on canvas */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 10,
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 2,
                color: "#F97316",
                textTransform: "uppercase",
                fontFamily: "system-ui, sans-serif",
                textShadow: "0 0 12px rgba(249, 115, 22, 0.8), 0 2px 4px #000000",
              }}
            >
              ROBEKAN JARINGAN
            </span>
            <span
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFFFFF",
                fontFamily: "'Montserrat', system-ui, sans-serif",
                textShadow: "0 4px 14px #000000, 0 2px 4px #000000",
              }}
            >
              SALURAN TENGGOROKAN
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. INTERNAL PNEUMATIC PRESSURE TELEMETRY GAUGE (CENTER HUD)    */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 1140,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: 3,
            color: alertFlash > 0.8 ? "#EF4444" : "#F87171",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
            textShadow: "0 0 14px rgba(239, 68, 68, 0.9), 0 2px 4px #000000",
            marginBottom: 2,
          }}
        >
          ▲ LONJAKAN TEKANAN UDARA INTERNAL
        </span>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1,
              color: pressureVal >= 250 ? "#EF4444" : "#FFFFFF",
              fontFamily: "'Montserrat', system-ui, sans-serif",
              textShadow:
                pressureVal >= 250
                  ? "0 0 30px rgba(239, 68, 68, 0.95), 0 4px 16px #000000"
                  : "0 4px 14px #000000",
            }}
          >
            +{pressureVal}
          </span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#FCA5A5",
              fontFamily: "system-ui, sans-serif",
              textShadow: "0 2px 8px #000000",
            }}
          >
            mmHg
          </span>
        </div>

        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 2,
            color: "#FDE047",
            fontFamily: "system-ui, sans-serif",
            textShadow: "0 0 14px rgba(253, 224, 71, 0.8), 0 2px 4px #000000",
            marginTop: 4,
          }}
        >
          (20x LIPAT LEBIH TINGGI DARI NORMAL!)
        </span>
      </div>
    </div>
  );
};
