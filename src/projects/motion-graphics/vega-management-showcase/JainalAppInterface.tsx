import React from "react";
import {
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export interface JainalAppInterfaceProps {
  promptProgress: number; // 0 to 1 (typing)
  isPromptSent: boolean;
  activeReasoningStep: number; // 0 (none), 1, 2, 3, 4
  isGeneratingResponse: boolean;
  showTable: boolean;
  scrollOffset: number; // pixels to scroll the chat container upward
  showDownloadCard: boolean;
  isDownloadClicked: boolean;
  activeHighlight: "none" | "prompt" | "step1" | "step2" | "step3" | "step4" | "table" | "download";
}

export const JainalAppInterface: React.FC<JainalAppInterfaceProps> = ({
  promptProgress,
  isPromptSent,
  activeReasoningStep,
  isGeneratingResponse,
  showTable,
  scrollOffset,
  showDownloadCard,
  isDownloadClicked,
  activeHighlight,
}) => {
  const frame = useCurrentFrame();

  const fullPromptText =
    "Buatkan deck pitching untuk cutomer baru di Surabaya, mau menawarkan livanova hlm S5";
  const typedLength = Math.floor(promptProgress * fullPromptText.length);
  const currentTypedPrompt = fullPromptText.slice(0, typedLength);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#ffffff",
        display: "flex",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: "#0f172a",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ================= LEFT SIDEBAR ================= */}
      <div
        style={{
          width: 270,
          height: "100%",
          backgroundColor: "#f9fafb",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px 18px",
          boxSizing: "border-box",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Top Brand & Navigation */}
        <div>
          {/* Logo Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                backgroundColor: "#f3e8ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                border: "1px solid #e9d5ff",
              }}
            >
              <img
                src={staticFile("images/jainal_mgmt/jainal_avatar.png")}
                alt="Jainal"
                style={{
                  width: 38,
                  height: 38,
                  objectFit: "contain",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "#1e1b4b",
                  lineHeight: 1.1,
                }}
              >
                JAINAL
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "#9ca3af",
                  marginTop: 3,
                }}
              >
                JARVIS · MANAGEMENT
              </div>
            </div>
          </div>

          {/* New Chat Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: "11px 14px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                color: "#1f2937",
              }}
            >
              <span style={{ fontSize: 16, color: "#6b7280" }}>+</span>
              Percakapan baru
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#9ca3af",
                backgroundColor: "#f3f4f6",
                borderRadius: 4,
                padding: "2px 6px",
              }}
            >
              ⌘ K
            </div>
          </div>

          {/* Nav Links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontSize: 14,
              fontWeight: 500,
              color: "#4b5563",
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                color: "#6d28d9",
                fontWeight: 600,
                backgroundColor: "#f5f3ff",
              }}
            >
              SPH / Quotation
            </div>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Pesan masuk</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#ffffff",
                  backgroundColor: "#7c3aed",
                  borderRadius: 999,
                  padding: "1px 7px",
                }}
              >
                1
              </span>
            </div>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                color: "#6b7280",
              }}
            >
              Cari percakapan
            </div>
          </div>
        </div>

        {/* Bottom Workspace, Profile & Logo */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#9ca3af",
              letterSpacing: "0.08em",
              marginBottom: 10,
            }}
          >
            PERCAKAPAN <span style={{ color: "#4b5563" }}>1</span>
          </div>

          {/* Management Workspace card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: "11px 14px",
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  color: "#6b7280",
                }}
              >
                👥
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937" }}>
                  Management workspace
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>
                  idsMED Indonesia
                </div>
              </div>
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#10b981",
              }}
            />
          </div>

          {/* User profile */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 6px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#f3e8ff",
                color: "#7c3aed",
                fontWeight: 700,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              D
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937" }}>
                Daffa Akhdaan
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>
                Sesi disimpan di browser ini
              </div>
            </div>
          </div>

          {/* idsMED bottom logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 12,
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#6b7280",
                  letterSpacing: "-0.04em",
                }}
              >
                iDS
              </span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#1d4ed8",
                  letterSpacing: "-0.04em",
                }}
              >
                MED
              </span>
            </div>
            <div style={{ fontSize: 16, color: "#9ca3af", cursor: "pointer" }}>
              🌙
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            height: 64,
            borderBottom: "1px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 36px",
            flexShrink: 0,
            zIndex: 10,
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "0.06em",
                color: "#1e1b4b",
              }}
            >
              JAINAL
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "#6b7280",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                padding: "4px 11px",
                borderRadius: 6,
              }}
            >
              MANAGEMENT ASSISTANT
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ color: "#6b7280", fontSize: 16 }}>↗</div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#6b7280",
                backgroundColor: "#f3f4f6",
                padding: "6px 14px",
                borderRadius: 6,
              }}
            >
              Keluar
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 500,
                color: "#4b5563",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 8px rgba(16,185,129,0.6)",
                }}
              />
              Jainal terhubung
            </div>
            <div style={{ color: "#6b7280", fontSize: 14 }}>✏️</div>
          </div>
        </div>

        {/* Scrollable Conversation Viewport */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            padding: "36px 56px",
            boxSizing: "border-box",
          }}
        >
          {/* INITIAL WELCOME SCREEN (When prompt is not yet sent) */}
          {!isPromptSent && (
            <div
              style={{
                maxWidth: 820,
                margin: "60px auto 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                opacity: interpolate(promptProgress, [0.7, 1], [1, 0.4], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: "#f3e8ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  border: "1px solid #e9d5ff",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.12)",
                }}
              >
                <img
                  src={staticFile("images/jainal_mgmt/jainal_avatar.png")}
                  alt="Jainal"
                  style={{ width: 50, height: 50, objectFit: "contain" }}
                />
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "#7c3aed",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                RUANG KERJA MANAGEMENT, LEBIH SIMPEL.
              </div>

              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                Ada yang bisa <span style={{ color: "#7c3aed" }}>Jainal</span> bantu hari ini?
              </div>

              <div
                style={{
                  fontSize: 15,
                  color: "#64748b",
                  maxWidth: 620,
                  lineHeight: 1.6,
                  marginBottom: 8,
                }}
              >
                Ringkasan untuk keputusan, kebijakan, approval, dan koordinasi lintas fungsi.
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "#94a3b8",
                  maxWidth: 580,
                  lineHeight: 1.5,
                  marginBottom: 36,
                }}
              >
                Data sensitif dan tindakan mengikuti kewenangan pengguna serta workflow Management.
              </div>

              {/* Action suggestion cards */}
              <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 680 }}>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: "16px 20px",
                    textAlign: "left",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 16 }}>📦</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#1f2937" }}>
                      Ringkas prioritas
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Bahan pembahasan untuk manajemen
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: "16px 20px",
                    textAlign: "left",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 16 }}>✨</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#1f2937" }}>
                      Evaluasi keputusan
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Opsi, bukti, dan pertimbangan
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE CONVERSATION THREAD */}
          {isPromptSent && (
            <div
              style={{
                maxWidth: 960,
                margin: "0 auto",
                transform: `translateY(-${scrollOffset}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              {/* User Chat Bubble */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginBottom: 32,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f3e8ff",
                    color: "#1e1b4b",
                    fontSize: 16,
                    fontWeight: 500,
                    padding: "16px 24px",
                    borderRadius: "18px 18px 4px 18px",
                    maxWidth: 720,
                    lineHeight: 1.5,
                    boxShadow: "0 2px 8px rgba(124, 58, 237, 0.08)",
                    border:
                      activeHighlight === "prompt"
                        ? "2px solid #7c3aed"
                        : "1px solid transparent",
                  }}
                >
                  {fullPromptText}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 12,
                    color: "#9ca3af",
                    marginTop: 8,
                  }}
                >
                  <span>↩ Balas</span>
                  <span>9 Nov 2026, 18.45.22 GMT+7</span>
                </div>
              </div>

              {/* AI Assistant Message Thread */}
              <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
                {/* Jainal Icon */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    backgroundColor: "#f3e8ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    flexShrink: 0,
                    marginTop: 2,
                    border: "1px solid #e9d5ff",
                  }}
                >
                  <img
                    src={staticFile("images/jainal_mgmt/jainal_avatar.png")}
                    alt="Jainal"
                    style={{
                      width: 32,
                      height: 32,
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  {/* Sender title */}
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1f2937",
                      marginBottom: 14,
                    }}
                  >
                    Jainal · Management
                  </div>

                  {/* Autonomous Reasoning Steps (Sequential reveal) */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 20,
                    }}
                  >
                    {/* Step 1 */}
                    {activeReasoningStep >= 1 && (
                      <div
                        style={{
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#1f2937",
                          padding: "10px 14px",
                          borderRadius: 10,
                          backgroundColor:
                            activeHighlight === "step1" ? "#f5f3ff" : "transparent",
                          border:
                            activeHighlight === "step1"
                              ? "1px solid #7c3aed"
                              : "1px solid transparent",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Brief sudah jelas — pitching deck untuk customer baru di
                        Surabaya, menawarkan LivaNova HLM S5 (Stockert S5
                        Heart-Lung Machine). Langsung generate.
                      </div>
                    )}

                    {/* Step 2 */}
                    {activeReasoningStep >= 2 && (
                      <div
                        style={{
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#1f2937",
                          padding: "10px 14px",
                          borderRadius: 10,
                          backgroundColor:
                            activeHighlight === "step2" ? "#f5f3ff" : "transparent",
                          border:
                            activeHighlight === "step2"
                              ? "1px solid #7c3aed"
                              : "1px solid transparent",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Langsung render SVG cover dan generate deck-nya sekarang.
                      </div>
                    )}

                    {/* Step 3 */}
                    {activeReasoningStep >= 3 && (
                      <div
                        style={{
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#1f2937",
                          padding: "10px 14px",
                          borderRadius: 10,
                          backgroundColor:
                            activeHighlight === "step3" ? "#f5f3ff" : "transparent",
                          border:
                            activeHighlight === "step3"
                              ? "1px solid #7c3aed"
                              : "1px solid transparent",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Ilustrasi cover bagus — mesin dengan monitor, roller
                        pumps, dan tubing tergambar jelas. Lanjut generate deck
                        sekarang.
                      </div>
                    )}

                    {/* Step 4 */}
                    {activeReasoningStep >= 4 && (
                      <div
                        style={{
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#1f2937",
                          padding: "10px 14px",
                          borderRadius: 10,
                          backgroundColor:
                            activeHighlight === "step4" ? "#f5f3ff" : "transparent",
                          border:
                            activeHighlight === "step4"
                              ? "1px solid #7c3aed"
                              : "1px solid transparent",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Semua 15 halaman sudah diinspeksi. Deck terlihat solid —
                        langsung submit review dan kirim filenya.
                      </div>
                    )}
                  </div>

                  {/* Active Tool Spinner indicator */}
                  {isGeneratingResponse && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        color: "#6b7280",
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 7,
                          border: "2px solid #7c3aed",
                          borderTopColor: "transparent",
                          transform: `rotate(${frame * 12}deg)`,
                        }}
                      />
                      <span>Jainal sedang menjawab · Mengolah hasil tool</span>
                    </div>
                  )}

                  {/* Response Lead & Table */}
                  {showTable && (
                    <div style={{ marginTop: 14 }}>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#1e1b4b",
                          marginBottom: 16,
                        }}
                      >
                        Deck pitching LivaNova HLM S5 sudah siap —{" "}
                        <strong>15 slide</strong>, editable PPTX.
                      </div>

                      {/* 15-Slide Structure Table */}
                      <div
                        style={{
                          border: "1px solid #e5e7eb",
                          borderRadius: 12,
                          overflow: "hidden",
                          marginBottom: 24,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                        }}
                      >
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: 14,
                            textAlign: "left",
                          }}
                        >
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "#fbfaff",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              <th
                                style={{
                                  padding: "12px 16px",
                                  fontWeight: 700,
                                  color: "#374151",
                                  width: 60,
                                }}
                              >
                                #
                              </th>
                              <th
                                style={{
                                  padding: "12px 16px",
                                  fontWeight: 700,
                                  color: "#374151",
                                  width: 220,
                                }}
                              >
                                Section
                              </th>
                              <th
                                style={{
                                  padding: "12px 16px",
                                  fontWeight: 700,
                                  color: "#374151",
                                }}
                              >
                                Slide
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                id: "1",
                                sec: "Cover",
                                title: "LivaNova Stockert S5 — Heart-Lung Machine",
                              },
                              {
                                id: "2–4",
                                sec: "Tantangan Perfusi Kardiak",
                                title:
                                  "Tuntutan operasi jantung + Mengapa pilihan HLM kritis",
                              },
                              {
                                id: "5–8",
                                sec: "Solusi: LivaNova HLM S5",
                                title:
                                  "Product showcase + Fitur unggulan + Komponen opsional",
                              },
                              {
                                id: "9–11",
                                sec: "Spesifikasi & Konfigurasi",
                                title:
                                  "Tabel harga 5 paket + Alur perfusi 4 langkah",
                              },
                              {
                                id: "12–14",
                                sec: "Dukungan idsMED",
                                title:
                                  "Layanan purna jual Surabaya + Langkah selanjutnya",
                              },
                              {
                                id: "15",
                                sec: "Closing",
                                title: "CTA kontak tim idsMED Surabaya",
                              },
                            ].map((row, idx) => (
                              <tr
                                key={idx}
                                style={{
                                  borderBottom:
                                    idx === 5 ? "none" : "1px solid #f3f4f6",
                                  backgroundColor:
                                    idx % 2 === 1 ? "#fafaf9" : "#ffffff",
                                }}
                              >
                                <td
                                  style={{
                                    padding: "12px 16px",
                                    fontWeight: 600,
                                    color: "#6b7280",
                                  }}
                                >
                                  {row.id}
                                </td>
                                <td
                                  style={{
                                    padding: "12px 16px",
                                    fontWeight: 600,
                                    color: "#1f2937",
                                  }}
                                >
                                  {row.sec}
                                </td>
                                <td
                                  style={{
                                    padding: "12px 16px",
                                    color: "#374151",
                                  }}
                                >
                                  {row.title}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Important Citations & Notes */}
                      <div
                        style={{
                          marginBottom: 24,
                          fontSize: 14,
                          lineHeight: 1.7,
                          color: "#374151",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#111827",
                            marginBottom: 8,
                          }}
                        >
                          Catatan penting:
                        </div>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: 20,
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                          }}
                        >
                          <li>
                            Harga dalam tabel bersumber dari{" "}
                            <strong>KNF4 Livanova 260703.xlsx, cutoff 3 Juli 2026</strong>
                            , excl. PPN — sesuaikan jika ada diskon atau
                            negosiasi khusus
                          </li>
                          <li>
                            Harga adalah Price List internal,{" "}
                            <strong>bukan harga final customer</strong> — gunakan
                            SPH terpisah untuk penawaran resmi
                          </li>
                          <li>
                            Kalau butuh SPH/quotation resmi untuk customer
                            Surabaya-nya, langsung bilang saja — saya bantu
                            generate
                          </li>
                        </ul>
                      </div>

                      {/* Download Artifact Card */}
                      {showDownloadCard && (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 16,
                            backgroundColor: "#ffffff",
                            border: isDownloadClicked
                              ? "2px solid #7c3aed"
                              : "1.5px solid #d8b4fe",
                            borderRadius: 14,
                            padding: "14px 22px",
                            boxShadow: isDownloadClicked
                              ? "0 0 0 4px rgba(124, 58, 237, 0.2), 0 8px 20px rgba(124, 58, 237, 0.15)"
                              : "0 4px 14px rgba(124, 58, 237, 0.08)",
                            cursor: "pointer",
                            marginBottom: 20,
                            transform: isDownloadClicked ? "scale(0.98)" : "scale(1)",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#f3e8ff",
                              color: "#7c3aed",
                              fontWeight: 800,
                              fontSize: 13,
                              letterSpacing: "0.04em",
                              padding: "8px 10px",
                              borderRadius: 8,
                            }}
                          >
                            PPTX
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: "#111827",
                              }}
                            >
                              deck.pptx
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                color: "#6b7280",
                                marginTop: 2,
                              }}
                            >
                              4952 KB ·{" "}
                              <span
                                style={{
                                  color: "#7c3aed",
                                  fontWeight: 600,
                                  textDecoration: "underline",
                                }}
                              >
                                Unduh file
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              color: "#7c3aed",
                              fontSize: 18,
                              marginLeft: 12,
                              transform: isDownloadClicked
                                ? "translateY(2px)"
                                : "translateY(0)",
                            }}
                          >
                            ↓
                          </div>
                        </div>
                      )}

                      {/* Metadata Footer */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          fontSize: 12,
                          color: "#9ca3af",
                          marginTop: 8,
                        }}
                      >
                        <span style={{ cursor: "pointer" }}>📋 Salin</span>
                        <span style={{ cursor: "pointer" }}>↩ Balas</span>
                        <span style={{ cursor: "pointer" }}>↗ Bagikan</span>
                        <span>9 Nov 2026, 18.51.17 GMT+7</span>
                        <span>·</span>
                        <span style={{ color: "#6b7280", fontWeight: 600 }}>
                          Waktu respons: 5 mnt 55,2 dtk
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div
          style={{
            padding: "16px 56px 28px",
            backgroundColor: "#ffffff",
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            {/* Input Context Pill */}
            <div
              style={{
                fontSize: 11,
                color: "#6b7280",
                marginBottom: 8,
                display: "flex",
                gap: 8,
              }}
            >
              <span style={{ fontWeight: 700, color: "#9ca3af" }}>
                PERCAKAPAN MANAGEMENT
              </span>
              <span>Buatkan deck pitching untuk cutomer baru di Su</span>
            </div>

            {/* Input Box Card */}
            <div
              style={{
                border:
                  activeHighlight === "prompt"
                    ? "2px solid #7c3aed"
                    : "1px solid #e5e7eb",
                borderRadius: 16,
                padding: "14px 18px",
                backgroundColor: "#ffffff",
                boxShadow:
                  activeHighlight === "prompt"
                    ? "0 0 0 3px rgba(124, 58, 237, 0.15)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  minHeight: 28,
                  fontSize: 15,
                  color: isPromptSent
                    ? "#9ca3af"
                    : currentTypedPrompt.length > 0
                    ? "#1f2937"
                    : "#9ca3af",
                  marginBottom: 12,
                }}
              >
                {isPromptSent
                  ? "Tanya apa saja ke Jainal..."
                  : currentTypedPrompt.length > 0
                  ? currentTypedPrompt
                  : "Tanya apa saja ke Jainal..."}
                {!isPromptSent && promptProgress < 1 && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: 18,
                      backgroundColor: "#7c3aed",
                      marginLeft: 2,
                      verticalAlign: "text-bottom",
                      opacity: Math.floor(frame / 12) % 2 === 0 ? 1 : 0,
                    }}
                  />
                )}
              </div>

              {/* Action row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: "#6b7280", fontSize: 16 }}>📎</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#7c3aed",
                    }}
                  >
                    <span>✦</span>
                    <span>Jainal</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>
                    File · gambar · teks
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>
                    Enter untuk kirim
                  </span>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor:
                        !isPromptSent && currentTypedPrompt.length > 0
                          ? "#7c3aed"
                          : "#e5e7eb",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      cursor: "pointer",
                      transform:
                        frame >= 175 && frame <= 185
                          ? "scale(0.92)"
                          : "scale(1)",
                      transition: "transform 0.1s ease",
                    }}
                  >
                    ↑
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "#9ca3af",
                marginTop: 8,
              }}
            >
              Riwayat tersedia selama 7 hari. Jawaban dan tindakan mengikuti
              izin Jainal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
