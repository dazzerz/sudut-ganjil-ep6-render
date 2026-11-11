import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface BrainTelemetryHUDProps {
  scene: 2 | 3;
}

export const BrainTelemetryHUD: React.FC<BrainTelemetryHUDProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hudSpring = spring({
    frame: frame % 150,
    fps,
    config: { stiffness: 180, damping: 14 },
  });

  if (scene === 2) {
    // Phase A (24 Jam: 293 to 501) vs Phase B (48 Jam: 501 to 760)
    const isPhaseA = frame < 501;

    const cognitiveDrop = Math.round(
      interpolate(frame, [293, 440], [0, 40], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    );
    const cortisolSurge = Math.round(
      interpolate(frame, [501, 680], [0, 250], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    );

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        {/* Hairline: Optic Stress Pointer */}
        <div
          style={{
            position: "absolute",
            top: 610,
            right: 80,
            display: "flex",
            alignItems: "center",
            opacity: hudSpring,
          }}
        >
          <div style={{ marginRight: 10, textAlign: "right" }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: "#F97316",
                letterSpacing: 2,
                display: "block",
                textShadow: "0 0 10px rgba(249, 115, 22, 0.8), 0 2px 4px #000",
              }}
            >
              SARAF OPTIK & RETINA
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#FFFFFF",
                textShadow: "0 4px 14px #000",
              }}
            >
              KETEGANGAN VISUAL TINGGI
            </span>
          </div>
          <div
            style={{
              width: 100,
              height: 2,
              backgroundColor: "rgba(249, 115, 22, 0.9)",
              boxShadow: "0 0 8px rgba(249, 115, 22, 0.8)",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#F97316",
              boxShadow: "0 0 12px #F97316",
              border: "2px solid #FFFFFF",
            }}
          />
        </div>

        {/* Center Big HUD Telemetry */}
        <div
          style={{
            position: "absolute",
            top: 1120,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          {isPhaseA ? (
            <>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 3,
                  color: "#38BDF8",
                  textTransform: "uppercase",
                  textShadow: "0 0 12px rgba(56, 189, 248, 0.8), 0 2px 4px #000",
                }}
              >
                FASE 24 JAM: PENURUNAN KOGNITIF
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 90,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#38BDF8",
                    textShadow:
                      "0 0 30px rgba(56, 189, 248, 0.9), 0 4px 16px #000",
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                  }}
                >
                  -{cognitiveDrop}
                </span>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: "#BAE6FD",
                    textShadow: "0 2px 8px #000",
                  }}
                >
                  % FOKUS
                </span>
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#FDE047",
                  letterSpacing: 2,
                  textShadow: "0 0 14px rgba(253, 224, 71, 0.8), 0 2px 4px #000",
                }}
              >
                SETARA KADAR ALKOHOL 0.10% DI DARAH
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 3,
                  color: "#F97316",
                  textTransform: "uppercase",
                  textShadow: "0 0 12px rgba(249, 115, 22, 0.8), 0 2px 4px #000",
                }}
              >
                FASE 48 JAM: HORMON STRES
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 90,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#F97316",
                    textShadow:
                      "0 0 30px rgba(249, 115, 22, 0.9), 0 4px 16px #000",
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                  }}
                >
                  +{cortisolSurge}
                </span>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: "#FED7AA",
                    textShadow: "0 2px 8px #000",
                  }}
                >
                  % KORTISOL
                </span>
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#EF4444",
                  letterSpacing: 2,
                  textShadow: "0 0 14px rgba(239, 68, 68, 0.8), 0 2px 4px #000",
                }}
              >
                MICROSLEEP TAK SADAR AKTIF
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  // Scene 3: Day 3 Microglia Synapse Cannibalism
  const activePulse = Math.sin((frame * 2 * Math.PI) / 10) * 0.4 + 0.6;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      {/* Hairline to Microglia */}
      <div
        style={{
          position: "absolute",
          top: 660,
          right: 90,
          display: "flex",
          alignItems: "center",
          opacity: hudSpring,
        }}
      >
        <div style={{ marginRight: 10, textAlign: "right" }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: "#EF4444",
              letterSpacing: 2,
              display: "block",
              textShadow: "0 0 10px rgba(239, 68, 68, 0.9), 0 2px 4px #000",
            }}
          >
            SEL MIKROGLIA HIPERAKTIF
          </span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: "#FFFFFF",
              textShadow: "0 4px 14px #000",
            }}
          >
            FAGOSITOSIS SINAPSIS
          </span>
        </div>
        <div
          style={{
            width: 110,
            height: 2,
            backgroundColor: "rgba(239, 68, 68, 0.9)",
            boxShadow: "0 0 8px rgba(239, 68, 68, 0.8)",
          }}
        />
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

      {/* Center Warning Telemetry */}
      <div
        style={{
          position: "absolute",
          top: 1120,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 3,
            color: activePulse > 0.8 ? "#EF4444" : "#F87171",
            textTransform: "uppercase",
            textShadow: "0 0 16px rgba(239, 68, 68, 0.95), 0 2px 4px #000",
          }}
        >
          ▲ PERINGATAN NEUROLOGIS HARI KE-3
        </span>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1,
              color: "#EF4444",
              textShadow: "0 0 35px rgba(239, 68, 68, 0.95), 0 4px 16px #000",
              fontFamily: "'Montserrat', system-ui, sans-serif",
            }}
          >
            AUTOFAGI
          </span>
        </div>
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#FDE047",
            letterSpacing: 2,
            textShadow: "0 0 14px rgba(253, 224, 71, 0.9), 0 2px 4px #000",
          }}
        >
          OTAK MEMAKAN SINAPSISNYA SENDIRI!
        </span>
      </div>
    </div>
  );
};
