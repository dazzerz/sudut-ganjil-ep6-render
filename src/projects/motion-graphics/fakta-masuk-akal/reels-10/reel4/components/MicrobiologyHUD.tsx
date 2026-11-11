import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const MicrobiologyHUD: React.FC = () => {
  const frame = useCurrentFrame();

  // Timing:
  // Scene 1 (0-550): Dropped bread macro - Floor adhesion telemetry
  // Scene 2 (550-1250): Microscopic bacterial transfer shockwave
  // Scene 3 (1250-1800): Forensic UV microbial scan

  const isScene1 = frame < 550;
  const isScene2 = frame >= 550 && frame < 1250;
  const isScene3 = frame >= 1250;

  // Blinking pulse
  const pulse = Math.sin(frame * 0.15) * 0.5 + 0.5;

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
      {/* 1. TOP SCIENTIFIC HUD HEADER                                  */}
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
        {/* Left: Scientific Lab Mode */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#38BDF8", // Sky electric blue
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
            LAB TEST: FOOD CROSS-CONTAMINATION
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
            RUTGERS UNIVERSITY STUDY (2016)
          </div>
        </div>

        {/* Right: Stopwatch Comparison */}
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
            WAKTU KONTAK
          </div>
          {frame < 650 ? (
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: "#FACC15",
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 0 16px rgba(250, 204, 21, 0.8)",
              }}
            >
              5.00s <span style={{ fontSize: 18, color: "#EF4444" }}>(MITOS)</span>
            </div>
          ) : (
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: "#EF4444",
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 0 20px rgba(239, 68, 68, 0.9)",
                animation: "pulse 0.5s infinite",
              }}
            >
              &lt; 0.10s{" "}
              <span
                style={{
                  fontSize: 18,
                  color: "#22D3EE",
                  display: "block",
                  letterSpacing: 1,
                }}
              >
                (FAKTA ILMIAH)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SCENE 1: FLOATING HAIRLINE ANCHORS (DROPPED BREAD)         */}
      {/* ------------------------------------------------------------- */}
      {isScene1 && (
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 80,
            right: 80,
          }}
        >
          {/* Top Hairline: Bread Moisture */}
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
              [MATRIKS MAKANAN LEMBAP]
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

          {/* Bottom Hairline: Floor Contact Area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 180,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#38BDF8",
                boxShadow: "0 0 10px #38BDF8",
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1.5,
                background:
                  "linear-gradient(90deg, rgba(56, 189, 248, 0.2) 0%, #38BDF8 100%)",
              }}
            />
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#38BDF8",
                letterSpacing: 1,
                textShadow: "0 2px 10px rgba(0,0,0,0.95)",
              }}
            >
              [PORI KERAMIK PORSELEN]
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. SCENE 2: MICROSCOPIC BACTERIAL ADHESION HUD                */}
      {/* ------------------------------------------------------------- */}
      {isScene2 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 70,
            right: 70,
          }}
        >
          {/* Microscopic Adhesion Rate */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "1.5px solid rgba(239, 68, 68, 0.6)",
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
                TINGKAT TRANSFER MIKROBA
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  textShadow: "0 0 20px rgba(239, 68, 68, 0.8)",
                }}
              >
                99.4%
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
                KECEPATAN ADHESI
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#38BDF8",
                  textShadow: "0 0 16px rgba(56, 189, 248, 0.9)",
                }}
              >
                &lt; 100 ms
              </div>
            </div>
          </div>

          {/* Microscopic details */}
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
            <span>PATOGEN: Salmonella &amp; Enterobacter</span>
            <span style={{ color: "#FACC15" }}>VEKTOR: Kelembapan Cairan</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. SCENE 3: FORENSIC UV MICROBIAL DENSITY HUD                 */}
      {/* ------------------------------------------------------------- */}
      {isScene3 && (
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
              borderBottom: "1.5px solid rgba(168, 85, 247, 0.6)",
              paddingBottom: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#C084FC", // Purple neon for UV
                  letterSpacing: 1.5,
                  textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                }}
              >
                DETEKSI UV FLOATING BIOFILM
              </div>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  textShadow: "0 0 24px rgba(192, 132, 252, 0.9)",
                }}
              >
                100.000+{" "}
                <span style={{ fontSize: 22, color: "#C084FC" }}>CFU / cm²</span>
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
                STATUS PERMUKAAN
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#EF4444",
                  textShadow: "0 0 16px rgba(239, 68, 68, 0.8)",
                }}
              >
                TERKONTAMINASI
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
