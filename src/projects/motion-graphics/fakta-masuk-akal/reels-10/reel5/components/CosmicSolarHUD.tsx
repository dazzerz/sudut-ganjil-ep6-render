import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const CosmicSolarHUD: React.FC = () => {
  const frame = useCurrentFrame();

  // Timing:
  // Phase 1: 0 - 611 (First 8m 20s illusion, light is traveling)
  // Phase 2: 612 - 993 (Sudden blackout, gravitational release)
  // Phase 3: 994 - 1800 (Cryogenic freeze -18°C to -73°C)

  const isPhase1 = frame < 611;
  const isPhase2 = frame >= 611 && frame < 994;
  const isPhase3 = frame >= 994;

  // Photon flight countdown: 500s -> 0s
  const remainingSeconds = Math.max(
    0,
    Math.round(interpolate(frame, [0, 611], [500, 0], { extrapolateRight: "clamp" }))
  );
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedCountdown = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Surface temperature
  const tempCelsius = isPhase1
    ? 15
    : Math.round(
        interpolate(frame, [611, 994, 1800], [15, -18, -73], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      );

  // Pulse
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
      {/* 1. TOP ASTROPHYSICS HUD HEADER                                */}
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
        {/* Left: Solar State */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 2,
              color: isPhase1 ? "#F59E0B" : "#EF4444",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: isPhase1 ? "#F59E0B" : "#EF4444",
                boxShadow: isPhase1
                  ? "0 0 12px #F59E0B"
                  : "0 0 16px #EF4444",
                opacity: pulse > 0.3 ? 1 : 0.4,
              }}
            />
            {isPhase1 ? "STATUS: FOTON DALAM PERJALANAN" : "STATUS: MATAHARI PADAM"}
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
            JARAK KE BUMI: 149.600.000 KM (1 AU)
          </div>
        </div>

        {/* Right: Countdown or Temperature */}
        <div style={{ textAlign: "right" }}>
          {isPhase1 ? (
            <>
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
                SISA CAHAYA MATAHARI
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#FDE047",
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 0 20px rgba(253, 224, 71, 0.9)",
                }}
              >
                {formattedCountdown}{" "}
                <span style={{ fontSize: 18, color: "#94A3B8" }}>(8m 20s)</span>
              </div>
            </>
          ) : (
            <>
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
                SUHU RATA-RATA GLOBAL
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  color: "#38BDF8",
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 0 24px rgba(56, 189, 248, 0.95)",
                }}
              >
                {tempCelsius}°C
              </div>
            </>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. PHASE 1: FLOATING HAIRLINE CALLOUTS (ORBIT & SPEED)        */}
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
              marginBottom: 30,
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
              [KECEPATAN CAHAYA: 299.792 KM/DETIK]
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
      {/* 3. PHASE 2: GRAVITATIONAL DISRUPTION HUD                      */}
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
              borderBottom: "1.5px solid rgba(239, 68, 68, 0.7)",
              paddingBottom: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#F87171",
                  letterSpacing: 1.5,
                  textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                }}
              >
                GAYA TARIK GRAVITASI
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#EF4444",
                  lineHeight: 1.1,
                  textShadow: "0 0 24px rgba(239, 68, 68, 0.9)",
                }}
              >
                0,000 N{" "}
                <span style={{ fontSize: 22, color: "#FFFFFF" }}>
                  (ORBIT TERPUTUS)
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
                VEKTOR ARAH
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  textShadow: "0 0 16px rgba(255, 255, 255, 0.8)",
                }}
              >
                ANTARBINTANG
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. PHASE 3: CRYOGENIC ICE CRUST TELEMETRY                     */}
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
                KETEBALAN ES SAMUDRA
              </div>
              <div
                style={{
                  fontSize: 46,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  textShadow: "0 0 24px rgba(56, 189, 248, 0.9)",
                }}
              >
                300+{" "}
                <span style={{ fontSize: 24, color: "#38BDF8" }}>METER</span>
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
                KONDISI GLOBAL
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#22D3EE",
                  textShadow: "0 0 16px rgba(34, 211, 238, 0.8)",
                }}
              >
                SNOWBALL EARTH
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
