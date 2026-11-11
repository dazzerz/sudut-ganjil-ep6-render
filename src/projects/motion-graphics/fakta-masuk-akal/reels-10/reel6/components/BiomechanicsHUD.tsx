import React from "react";
import { useCurrentFrame } from "remotion";

export const BiomechanicsHUD: React.FC = () => {
  const frame = useCurrentFrame();

  // Timing:
  // Phase 1: 0 - 488 (Upside down fall & vestibular detection)
  // Phase 2: 488 - 1240 (Dual cylinder tuck-and-twist biomechanics)
  // Phase 3: 1240 - 1800 (Impact shock dissipation & 4-paw landing)

  const isPhase1 = frame < 488;
  const isPhase2 = frame >= 488 && frame < 1241;
  const isPhase3 = frame >= 1241;

  const pulse = Math.sin(frame * 0.2) * 0.5 + 0.5;

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
      {/* 1. TOP BIOMECHANICS HUD HEADER                                */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 70,
          right: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Left: Vestibular System Sensor */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#38BDF8", // Electric cyan
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#22C55E",
                boxShadow: "0 0 12px #22C55E",
                opacity: pulse > 0.3 ? 1 : 0.4,
              }}
            />
            SENSOR: APARATUS VESTIBULAR
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#FFFFFF",
              marginTop: 4,
              letterSpacing: 0.5,
              textShadow: "0 2px 12px rgba(0,0,0,0.9)",
            }}
          >
            DETEKSI GRAVITASI: &lt; 15 ms
          </div>
        </div>

        {/* Right: Total Maneuver Time */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 1.5,
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            DURASI MANUVER
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#FACC15",
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 0 20px rgba(250, 204, 21, 0.9)",
            }}
          >
            &lt; 0,30s{" "}
            <span style={{ fontSize: 18, color: "#38BDF8" }}>(280 ms)</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. PHASE 1: FLOATING HAIRLINE ANCHORS (VESTIBULAR & EAR)      */}
      {/* ------------------------------------------------------------- */}
      {isPhase1 && (
        <div
          style={{
            position: "absolute",
            top: 500,
            left: 80,
            right: 80,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#FDE047",
                letterSpacing: 1,
                textShadow: "0 2px 10px rgba(0,0,0,0.95)",
              }}
            >
              [TELINGA DALAM: CANALIS SEMICIRCULARIS]
            </div>
            <div
              style={{
                flex: 1,
                height: 1.5,
                background:
                  "linear-gradient(90deg, #FDE047 0%, rgba(253, 224, 71, 0.2) 100%)",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#FDE047",
                boxShadow: "0 0 10px #FDE047",
              }}
            />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. PHASE 2: DUAL-CYLINDER BIOMECHANICAL SPLIT                 */}
      {isPhase2 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 70,
            right: 70,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "1.5px solid rgba(56, 189, 248, 0.7)",
              paddingBottom: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#38BDF8",
                  letterSpacing: 1.5,
                  textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                }}
              >
                MODEL KANE-SCHER (1969)
              </div>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  textShadow: "0 0 20px rgba(56, 189, 248, 0.9)",
                }}
              >
                DUA SILINDER FLEKSIBEL
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#94A3B8",
                  letterSpacing: 1,
                }}
              >
                MOMENTUM SUDUT TOTAL
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#22C55E",
                  textShadow: "0 0 16px rgba(34, 197, 94, 0.8)",
                }}
              >
                L = 0 (KEKAL)
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: 800,
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            <span style={{ color: "#FACC15" }}>
              DEPAN: Kaki Merapat (Rotasi 180°)
            </span>
            <span style={{ color: "#38BDF8" }}>
              BELAKANG: Kaki Melebar (Stabilisator)
            </span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. PHASE 3: IMPACT ABSORPTION TELEMETRY                       */}
      {isPhase3 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 70,
            right: 70,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "1.5px solid rgba(74, 222, 128, 0.7)",
              paddingBottom: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#4ADE80",
                  letterSpacing: 1.5,
                  textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                }}
              >
                EFISIENSI ABSORPSI BENTURAN
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  textShadow: "0 0 24px rgba(74, 222, 128, 0.9)",
                }}
              >
                98.2%{" "}
                <span style={{ fontSize: 24, color: "#4ADE80" }}>
                  (KINETIC DISSIPATION)
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#94A3B8",
                  letterSpacing: 1,
                }}
              >
                POSISI PENDARATAN
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#FACC15",
                  textShadow: "0 0 16px rgba(250, 204, 21, 0.8)",
                }}
              >
                4 KAKI SIMETRIS
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
