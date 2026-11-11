import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HeartTelemetryHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Show telemetry during anatomical scenes (frame 340 to 1490)
  if (frame < 340 || frame > 1490) return null;

  const isVagusScene = frame >= 340 && frame < 900;
  const isHeartScene = frame >= 900;

  // Temperature drop: 37°C down to 4°C
  const temp = interpolate(frame, [450, 750], [37.2, 4.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Heart rate drop: 115 BPM down to 42 BPM (Bradycardia)
  const bpm = interpolate(frame, [850, 1150], [115, 42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brain perfusion drop: -0% down to -65%
  const brainDrop = interpolate(frame, [1050, 1250], [0, 65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animation pulse
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
      {/* ------------------------------------------------------------- */}
      {/* SCENE 2 TELEMETRY: VAGUS NERVE & THERMAL SHOCK                 */}
      {/* ------------------------------------------------------------- */}
      {isVagusScene && (
        <>
          {/* Top Right: Core vs Esophagus Temp */}
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
              THERMAL IMPACT
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: temp < 15 ? "#38BDF8" : "#F59E0B",
                textShadow: temp < 15
                  ? "0 0 25px rgba(56,189,248,0.8), 0 4px 14px rgba(0,0,0,0.9)"
                  : "0 0 25px rgba(245,158,11,0.8), 0 4px 14px rgba(0,0,0,0.9)",
                letterSpacing: "-1px",
              }}
            >
              {temp.toFixed(1)}°C
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: temp < 10 ? "#EF4444" : "#CBD5E1",
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                letterSpacing: 1.5,
              }}
            >
              {temp < 10 ? "⚠️ SYOK TERMAL AKUT" : "SUHU NORMAL TUBUH"}
            </div>
          </div>

          {/* Hairline Pointer to Vagus Nerve */}
          <div
            style={{
              position: "absolute",
              top: 680,
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
                color: "#FACC15",
                textShadow: "0 0 15px rgba(250,204,21,0.8), 0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              NERVUS VAGUS (CN X)
            </div>
            <div
              style={{
                width: 140,
                height: 2,
                backgroundColor: "#FACC15",
                boxShadow: "0 0 10px #FACC15",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#FACC15",
                boxShadow: "0 0 12px #FACC15",
                transform: `scale(${pulse})`,
              }}
            />
          </div>

          {/* Hairline Pointer to Esophagus Frost */}
          <div
            style={{
              position: "absolute",
              top: 1080,
              left: 60,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: 2,
                color: "#38BDF8",
                textShadow: "0 0 15px rgba(56,189,248,0.8), 0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              ESOFAGUS MEMBEKU
            </div>
            <div
              style={{
                width: 110,
                height: 2,
                backgroundColor: "#38BDF8",
                boxShadow: "0 0 10px #38BDF8",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#38BDF8",
                boxShadow: "0 0 12px #38BDF8",
              }}
            />
          </div>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SCENE 3 TELEMETRY: CARDIAC BRADYCARDIA & BRAIN PERFUSION       */}
      {/* ------------------------------------------------------------- */}
      {isHeartScene && (
        <>
          {/* Top Left: Heart Rate Meter */}
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
              DETAK JANTUNG
            </div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: bpm < 60 ? "#EF4444" : "#10B981",
                textShadow: bpm < 60
                  ? "0 0 30px rgba(239,68,68,0.85), 0 4px 14px rgba(0,0,0,0.95)"
                  : "0 0 25px rgba(16,185,129,0.8), 0 4px 14px rgba(0,0,0,0.9)",
                letterSpacing: "-1px",
              }}
            >
              {Math.round(bpm)}{" "}
              <span style={{ fontSize: 24, fontWeight: 700 }}>BPM</span>
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: bpm < 60 ? "#F87171" : "#A7F3D0",
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                letterSpacing: 2,
              }}
            >
              {bpm < 60 ? "⚠️ REFLEKS BRADIKARDIA" : "RITME NORMAL"}
            </div>
          </div>

          {/* Top Right: Brain Perfusion Drop */}
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
              ALIRAN DARAH OTAK
            </div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: "#EF4444",
                textShadow: "0 0 30px rgba(239,68,68,0.85), 0 4px 14px rgba(0,0,0,0.95)",
                letterSpacing: "-1px",
              }}
            >
              -{Math.round(brainDrop)}%
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#FCA5A5",
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                letterSpacing: 1.5,
              }}
            >
              RISIKO PINGSAN (SINKOP)
            </div>
          </div>

          {/* Hairline Pointer to Coronary Spasm */}
          <div
            style={{
              position: "absolute",
              top: 1040,
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
                backgroundColor: "#38BDF8",
                boxShadow: "0 0 12px #38BDF8",
                transform: `scale(${pulse})`,
              }}
            />
            <div
              style={{
                width: 120,
                height: 2,
                backgroundColor: "#38BDF8",
                boxShadow: "0 0 10px #38BDF8",
              }}
            />
            <div
              style={{
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: 2,
                color: "#38BDF8",
                textShadow: "0 0 15px rgba(56,189,248,0.8), 0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              VASOKONSTRIKSI KORONER
            </div>
          </div>
        </>
      )}
    </div>
  );
};
