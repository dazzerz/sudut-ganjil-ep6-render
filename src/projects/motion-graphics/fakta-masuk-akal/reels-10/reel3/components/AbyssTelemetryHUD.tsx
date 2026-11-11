import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const AbyssTelemetryHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Show telemetry during abyss scenes (frame 200 to 1500)
  if (frame < 200 || frame > 1500) return null;

  const isImplosionScene = frame >= 580 && frame < 1100;
  const isFloorScene = frame >= 1100;

  // Depth meter descending: 0m to 10,994m
  const depth = interpolate(frame, [200, 600], [200, 10994], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pressure meter spiking: 20 bar to 1,086 bar
  const pressure = interpolate(frame, [380, 750], [20, 1086], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse effect
  const pulse = Math.sin((frame / fps) * Math.PI * 4) * 0.1 + 0.9;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Left: Depth Meter */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 60,
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 3,
            fontWeight: 700,
            color: "#94A3B8",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          KEDALAMAN LAUT
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#22D3EE",
            textShadow: "0 0 25px rgba(34,211,238,0.85), 0 4px 14px rgba(0,0,0,0.95)",
            letterSpacing: "-1px",
          }}
        >
          {Math.round(depth).toLocaleString("id-ID")}{" "}
          <span style={{ fontSize: 24, fontWeight: 700 }}>M</span>
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: depth > 10000 ? "#FACC15" : "#38BDF8",
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            letterSpacing: 2,
          }}
        >
          {depth > 10000 ? "ZONA HADAL (CHALLENGER DEEP)" : "ZONA ABISAL"}
        </div>
      </div>

      {/* Top Right: Hydrostatic Pressure */}
      <div
        style={{
          position: "absolute",
          top: 360,
          right: 60,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 3,
            fontWeight: 700,
            color: "#94A3B8",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          TEKANAN HIDROSTATIK
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: pressure > 1000 ? "#EF4444" : "#F59E0B",
            textShadow: pressure > 1000
              ? "0 0 30px rgba(239,68,68,0.85), 0 4px 14px rgba(0,0,0,0.95)"
              : "0 0 25px rgba(245,158,11,0.8), 0 4px 14px rgba(0,0,0,0.9)",
            letterSpacing: "-1px",
          }}
        >
          {Math.round(pressure)}{" "}
          <span style={{ fontSize: 24, fontWeight: 700 }}>BAR</span>
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: pressure > 1000 ? "#FCA5A5" : "#FDE68A",
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            letterSpacing: 1.5,
          }}
        >
          {pressure > 1000 ? "⚠️ SETARA 100 GAJAH AFRIKA" : "TEKANAN MENINGKAT"}
        </div>
      </div>

      {/* Hairline Pointer to Implosion Shockwave (Scene 2) */}
      {isImplosionScene && (
        <div
          style={{
            position: "absolute",
            top: 720,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#EF4444",
              textShadow: "0 0 16px rgba(239,68,68,0.8), 0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            IMPLOSI TOTAL &lt;1 MS
          </div>
          <div
            style={{
              width: 130,
              height: 2,
              backgroundColor: "#EF4444",
              boxShadow: "0 0 10px #EF4444",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              boxShadow: "0 0 12px #EF4444",
              transform: `scale(${pulse})`,
            }}
          />
        </div>
      )}

      {/* Hairline Pointer to Snailfish (Scene 3) */}
      {isFloorScene && (
        <div
          style={{
            position: "absolute",
            top: 1100,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#22D3EE",
              boxShadow: "0 0 12px #22D3EE",
              transform: `scale(${pulse})`,
            }}
          />
          <div
            style={{
              width: 120,
              height: 2,
              backgroundColor: "#22D3EE",
              boxShadow: "0 0 10px #22D3EE",
            }}
          />
          <div
            style={{
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#22D3EE",
              textShadow: "0 0 15px rgba(34,211,238,0.8), 0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            IKAN HADAL (PSEUDOLIPARIS)
          </div>
        </div>
      )}
    </div>
  );
};
