import React from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SageHeaderSidebar } from "./components/SageHeaderSidebar";
import { SageHologramBadge } from "./components/SageHologramBadge";
import { DynamicSubtitle } from "./components/DynamicSubtitle";
import { KineticPunchline } from "./components/KineticPunchline";

export const Scene1CdakbEreport: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtitle Cues for Scene 1 (relative to frame 0 of Scene 1)
  const subtitles = [
    {
      text: "Di balik setiap kelancaran operasional, ada tim back office yang memikul ribuan data, regulasi, dan tenggat waktu.",
      startFrame: 0,
      endFrame: 235,
    },
    {
      text: "Pelaporan regulasi CDAKB dan data partner ke kementerian, biasanya menyita waktu berhari-hari mengumpulkan data antar divisi.",
      startFrame: 240,
      endFrame: 505,
    },
    {
      text: "Sekarang, cukup satu instruksi kepada SAGE. Seluruh kompilasi data terverifikasi dan siap dalam hitungan detik.",
      startFrame: 515,
      endFrame: 725,
    },
  ];

  // Typing animation for prompt (starts frame 150)
  const promptText = "Jarvis, siapkan CDAKB Data Partner bulan ini.";
  const typedLength = Math.min(
    promptText.length,
    Math.floor(
      interpolate(frame, [150, 240], [0, promptText.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );
  const currentPrompt = promptText.substring(0, typedLength);

  // User message appears sent at frame 250
  const messageSent = frame >= 250;

  // SAGE Processing state: frame 260 to 330
  const isProcessing = frame >= 260 && frame < 340;

  // SAGE Response reveals at frame 340 with spring
  const responseSpring = spring({
    frame: Math.max(0, frame - 340),
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.85 },
  });
  const responseOpacity = interpolate(frame, [340, 355], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const responseTranslateY = interpolate(responseSpring, [0, 1], [35, 0]);

  // Dynamic Camera Zoom towards the generated compliance files at frame 500
  const cameraZoom = interpolate(frame, [500, 720], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#050811",
        overflow: "hidden",
      }}
    >
      {/* SFX: Digital Chirp when message sent */}
      {frame === 250 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_digital_chirp.wav")} volume={0.65} />
      )}
      {/* SFX: Data scan sweep */}
      {frame === 270 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_data_scan.wav")} volume={0.55} />
      )}
      {/* SFX: Sub drop on punchline */}
      {frame === 735 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_sub_drop.wav")} volume={0.7} />
      )}

      {/* Main SAGE UI Container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${cameraZoom})`,
          transformOrigin: "center 45%",
          transition: "transform 0.1s ease-out",
        }}
      >
        <SageHeaderSidebar activeTitle="Siapkan CDAKB Data Partner...">
          <div
            style={{
              padding: "40px 60px",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {/* Ambient Background Grid Accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage:
                  "radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.05) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />

            {/* Conversation Flow Area */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, zIndex: 5 }}>
              {/* User Prompt Bubble */}
              {messageSent && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 12,
                    marginRight: 330,
                  }}
                >
                  <div
                    style={{
                      background: "#10B981",
                      color: "#FFFFFF",
                      padding: "16px 24px",
                      borderRadius: "20px 20px 4px 20px",
                      fontSize: 18,
                      fontWeight: 600,
                      boxShadow: "0 8px 24px rgba(16, 185, 129, 0.25)",
                      maxWidth: 600,
                    }}
                  >
                    Jarvis, siapkan CDAKB Data Partner bulan ini.
                  </div>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "#064E3B",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                    }}
                  >
                    F
                  </div>
                </div>
              )}

              {/* SAGE Processing Indicator */}
              {isProcessing && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 22px",
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: "1px solid #A7F3D0",
                    width: "fit-content",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "3px solid #10B981",
                      borderTopColor: "transparent",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#065F46" }}>
                    Mengompilasi data transaksi 48 distributor resmi & validasi format Kemenkes...
                  </span>
                </div>
              )}

              {/* SAGE Response Card */}
              {frame >= 340 && (
                <div
                  style={{
                    opacity: responseOpacity,
                    transform: `translateY(${responseTranslateY}px)`,
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  {/* SAGE Avatar */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "#10B981",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 800,
                      boxShadow: "0 6px 18px rgba(16, 185, 129, 0.35)",
                      flexShrink: 0,
                    }}
                  >
                    S
                  </div>

                  {/* SAGE Content Body */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      borderRadius: 20,
                      padding: "26px 32px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 12px 36px rgba(0,0,0,0.06)",
                      maxWidth: 880,
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                    }}
                  >
                    {/* Header with status badge */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#065F46", background: "#D1FAE5", padding: "4px 12px", borderRadius: 20 }}>
                          ✓ LAPORAN CDAKB SIAP
                        </span>
                        <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>
                          Otomasi E-Report idsMED • Periode Oktober 2026
                        </span>
                      </div>
                      <span style={{ fontSize: 11, color: "#94A3B8" }}>Diverifikasi dalam 1.2 detik</span>
                    </div>

                    <div style={{ fontSize: 16, color: "#1E293B", lineHeight: 1.5 }}>
                      Berikut adalah berkas pelaporan <strong>CDAKB Data Partner</strong> yang telah diverifikasi sesuai format resmi Kementerian Kesehatan RI:
                    </div>

                    {/* Downloadable Deliverables */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "14px 18px",
                          borderRadius: 14,
                          background: "#F0FDF4",
                          border: "1px solid #BBF7D0",
                        }}
                      >
                        <div style={{ fontSize: 26 }}>📊</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#166534" }}>
                            CDAKB_Data_Partner_Okt2026.xlsx
                          </div>
                          <div style={{ fontSize: 11, color: "#15803D" }}>
                            48 Distributor • 1.420 Transaksi • 3.8 MB
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "14px 18px",
                          borderRadius: 14,
                          background: "#F0FDF4",
                          border: "1px solid #BBF7D0",
                        }}
                      >
                        <div style={{ fontSize: 26 }}>📑</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#166534" }}>
                            E-Report_Kemenkes_Submission.pdf
                          </div>
                          <div style={{ fontSize: 11, color: "#15803D" }}>
                            Format Resmi Kemenkes RI • Siap Upload
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress summary stats */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 24,
                        paddingTop: 8,
                        borderTop: "1px solid #F1F5F9",
                        fontSize: 13,
                        color: "#475569",
                      }}
                    >
                      <div>
                        Status Validasi: <strong style={{ color: "#10B981" }}>100% Cocok</strong>
                      </div>
                      <div>
                        Kompilasi Data: <strong style={{ color: "#0F172A" }}>Selesai</strong>
                      </div>
                      <div>
                        Next Action: <strong style={{ color: "#0284C7" }}>Siap Diunduh</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Input Box Area */}
            <div
              style={{
                width: "100%",
                maxWidth: 960,
                margin: "0 auto",
                padding: "16px 24px",
                background: "#FFFFFF",
                borderRadius: 20,
                border: "2px solid #10B981",
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
                <span style={{ color: "#94A3B8", fontSize: 20 }}>📎</span>
                <span style={{ color: "#10B981", fontWeight: 700, fontSize: 14 }}>✦ Sage</span>
                <span style={{ color: "#1E293B", fontSize: 16, fontWeight: 500 }}>
                  {messageSent ? "Tanya apa saja ke Sage..." : currentPrompt}
                  {!messageSent && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 18,
                        backgroundColor: "#10B981",
                        marginLeft: 4,
                        verticalAlign: "middle",
                        opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                      }}
                    />
                  )}
                </span>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                ↑
              </div>
            </div>
          </div>
        </SageHeaderSidebar>
      </div>

      {/* Floating Holographic Badges */}
      <SageHologramBadge
        label="EFFICIENCY GAIN"
        value="16 Hours Saved"
        subtitle="Otomasi dari 2 hari ke 1 klik"
        icon="⚡"
        position={{ top: 120, right: 60 }}
        enterFrame={360}
      />
      <SageHologramBadge
        label="REGULATORY ACCURACY"
        value="100% Compliant"
        subtitle="Format baku Kemenkes RI"
        icon="🛡️"
        position={{ top: 220, right: 60 }}
        enterFrame={440}
      />

      {/* Kinetic Punchline Reveal for Scene 1 */}
      <KineticPunchline
        prefix="OPERATIONAL EFFICIENCY"
        headline="REPORTS THAT USED TO TAKE HOURS"
        tagline="— NOW TAKE ONE REQUEST."
        startFrame={735}
        durationInFrames={135}
      />

      {/* Dynamic Subtitles */}
      <DynamicSubtitle cues={subtitles} />
    </div>
  );
};
