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

export const Scene3DocumentSearch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtitles for Scene 3 (total: 510 frames / 17.0s)
  const subtitles = [
    {
      text: "Butuh dokumen tender atau arsip kontrak rumah sakit beberapa tahun lalu?",
      startFrame: 0,
      endFrame: 120,
    },
    {
      text: "Lupakan pencarian manual di tumpukan folder server. SAGE menghubungkan seluruh arsip dokumen secara cerdas dan menampilkannya seketika.",
      startFrame: 125,
      endFrame: 360,
    },
  ];

  // Typing animation for search query
  const searchQuery = "Cari dokumen tender RS Hasan Sadikin.";
  const typedLength = Math.min(
    searchQuery.length,
    Math.floor(
      interpolate(frame, [15, 65], [0, searchQuery.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );
  const currentQuery = searchQuery.substring(0, typedLength);

  // Search triggered at frame 75
  const searchTriggered = frame >= 75;

  // Documents reveal at frame 110 with spring
  const docSpring = spring({
    frame: Math.max(0, frame - 110),
    fps,
    config: { damping: 15, stiffness: 130, mass: 0.8 },
  });
  const docOpacity = interpolate(frame, [110, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const docTranslateY = interpolate(docSpring, [0, 1], [35, 0]);

  // Dynamic Camera Zoom
  const cameraZoom = interpolate(frame, [180, 360], [1.0, 1.05], {
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
      {/* SFX: Digital Chirp */}
      {frame === 75 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_digital_chirp.wav")} volume={0.65} />
      )}
      {/* SFX: Data scan */}
      {frame === 90 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_data_scan.wav")} volume={0.55} />
      )}
      {/* SFX: Sub drop */}
      {frame === 366 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_sub_drop.wav")} volume={0.7} />
      )}

      {/* SAGE Main UI */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${cameraZoom})`,
          transformOrigin: "center 45%",
          transition: "transform 0.1s ease-out",
        }}
      >
        <SageHeaderSidebar activeTitle="Dokumen Tender RS Hasan Sadikin...">
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
            {/* Conversation Area */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22, zIndex: 5 }}>
              {/* User Search Query */}
              {searchTriggered && (
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, marginRight: 330 }}>
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
                    Cari dokumen tender RS Hasan Sadikin.
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

              {/* SAGE Search Result Container */}
              {frame >= 110 && (
                <div
                  style={{
                    opacity: docOpacity,
                    transform: `translateY(${docTranslateY}px)`,
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
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

                  <div
                    style={{
                      background: "#FFFFFF",
                      borderRadius: 20,
                      padding: "26px 32px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 12px 36px rgba(0,0,0,0.06)",
                      maxWidth: 900,
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#065F46", background: "#D1FAE5", padding: "4px 12px", borderRadius: 20 }}>
                        ✦ DOKUMEN RELEVAN DITEMUKAN (0.28 DETIK)
                      </span>
                      <span style={{ fontSize: 12, color: "#64748B" }}>
                        Pencarian semantik di 15.400+ arsip terpusat idsMED
                      </span>
                    </div>

                    <div style={{ fontSize: 15.5, color: "#1E293B" }}>
                      Ditemukan <strong>3 dokumen resmi</strong> yang paling relevan dengan tender RSUP dr. Hasan Sadikin Bandung:
                    </div>

                    {/* Document List Items */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {/* Doc 1 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "14px 20px",
                          borderRadius: 14,
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span style={{ fontSize: 26 }}>📄</span>
                          <div>
                            <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0F172A" }}>
                              Surat_Penawaran_Tender_RSHS_2024_Hamilton_C6.pdf
                            </div>
                            <div style={{ fontSize: 11.5, color: "#64748B" }}>
                              Nilai: Rp 4.380.000.000 • Tanda Tangan: Key Account Manager • Status: Sah
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#059669", background: "#ECFDF5", padding: "4px 10px", borderRadius: 8 }}>
                          99.8% Cocok
                        </span>
                      </div>

                      {/* Doc 2 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "14px 20px",
                          borderRadius: 14,
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span style={{ fontSize: 26 }}>📑</span>
                          <div>
                            <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0F172A" }}>
                              BAP_Serah_Terima_Operasional_RSHS_ICU.docx
                            </div>
                            <div style={{ fontSize: 11.5, color: "#64748B" }}>
                              Unit SN: 90069060 • Berita Acara Penerimaan Gudang & Teknisi
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#059669", background: "#ECFDF5", padding: "4px 10px", borderRadius: 8 }}>
                          96.5% Cocok
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
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
                  {searchTriggered ? "Tanya apa saja ke Sage..." : currentQuery}
                  {!searchTriggered && (
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
        label="RETRIEVAL SPEED"
        value="0.28 Seconds"
        subtitle="Pencarian semantik cerdas"
        icon="⚡"
        position={{ top: 120, right: 60 }}
        enterFrame={130}
      />
      <SageHologramBadge
        label="DOCUMENTS INDEXED"
        value="15,400+ Files"
        subtitle="Terkoneksi seluruh server idsMED"
        icon="📁"
        position={{ top: 220, right: 60 }}
        enterFrame={200}
      />

      {/* Kinetic Punchline for Scene 3 */}
      <KineticPunchline
        prefix="SMART RETRIEVAL"
        headline="THE DOCUMENT YOU NEED"
        tagline="— FOUND BEFORE YOU FINISH ASKING."
        startFrame={366}
        durationInFrames={134}
      />

      {/* Subtitles */}
      <DynamicSubtitle cues={subtitles} />
    </div>
  );
};
