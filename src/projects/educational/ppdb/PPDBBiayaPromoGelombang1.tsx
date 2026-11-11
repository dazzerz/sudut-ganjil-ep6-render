import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * PROJECT: PPDB BIAYA & PROMO GELOMBANG 1 (30 DETIK @ 30 FPS)
 * SMP ANNIDA AL-ISLAMI 2 SETU
 *
 * Voiceover: Selina (ElevenLabs) - uploaded_media_1793251541210.mp3
 * Alur Konten:
 * 1. Hook (f: 0-130)       : Kabar gembira untuk Ayah Bunda yang sedang memilih SMP terbaik
 * 2. Transparansi (f: 125-300): Biaya masuk sudah all-in tanpa biaya tambahan
 * 3. Opsi 1 (f: 295-445)   : Program Sekolah Reguler (Rp4.375.000 all-in)
 * 4. Opsi 2 (f: 440-605)   : Program Plus Pondok Pesantren (Rp6.825.000 all-in)
 * 5. Climax Promo (f: 600-750): Spesial Gelombang 1 - GRATIS SPP 5 BULAN PENUH!
 * 6. Outro CTA (f: 745-900): Daftar sekarang WhatsApp 0819-1586-5383 & smpannida.sch.id
 */

// Partikel mengambang hangat (Homey & Cheerful)
const AMBIENT_MOTES = [
  { id: 1, x: 120, yBase: 1650, speed: 1.1, size: 16, color: "#16A34A" },
  { id: 2, x: 280, yBase: 1400, speed: 1.5, size: 20, color: "#F59E0B" },
  { id: 3, x: 880, yBase: 1750, speed: 1.2, size: 22, color: "#22C55E" },
  { id: 4, x: 940, yBase: 1200, speed: 1.7, size: 14, color: "#FBBF24" },
  { id: 5, x: 160, yBase: 1850, speed: 1.3, size: 24, color: "#86EFAC" },
  { id: 6, x: 520, yBase: 1550, speed: 1.4, size: 18, color: "#F59E0B" },
  { id: 7, x: 760, yBase: 1950, speed: 1.6, size: 20, color: "#15803D" },
  { id: 8, x: 360, yBase: 1350, speed: 1.5, size: 16, color: "#FDE68A" },
  { id: 9, x: 680, yBase: 1680, speed: 1.2, size: 22, color: "#4ADE80" },
  { id: 10, x: 220, yBase: 1500, speed: 1.4, size: 18, color: "#F59E0B" },
];

export const PPDBBiayaPromoGelombang1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Progress Bar
  const progressPercent = (frame / durationInFrames) * 100;

  // Kamera subtle push-in
  const camScale = interpolate(frame, [0, 900], [1.0, 1.03], {
    extrapolateRight: "clamp",
  });

  // ================= SCENE SPRINGS & INTERPOLATIONS =================

  // Scene 1: Hook (f: 0 - 130)
  const s1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const s1Exit = interpolate(frame, [122, 132], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Scene 2: Transparansi All-In (f: 125 - 300)
  const s2Frame = frame - 128;
  const s2Spring = spring({ frame: s2Frame, fps, config: { damping: 14, stiffness: 110 } });
  const s2Exit = interpolate(frame, [290, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Scene 3: Opsi 1 - Reguler (f: 295 - 445)
  const s3Frame = frame - 296;
  const s3Spring = spring({ frame: s3Frame, fps, config: { damping: 14, stiffness: 115 } });
  const s3Exit = interpolate(frame, [435, 445], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const countOpsi1 = Math.round(
    interpolate(s3Spring, [0, 1], [3000000, 4375000], {
      extrapolateRight: "clamp",
    })
  );

  // Scene 4: Opsi 2 - Pondok Pesantren (f: 440 - 605)
  const s4Frame = frame - 442;
  const s4Spring = spring({ frame: s4Frame, fps, config: { damping: 14, stiffness: 115 } });
  const s4Exit = interpolate(frame, [595, 605], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const countOpsi2 = Math.round(
    interpolate(s4Spring, [0, 1], [5000000, 6825000], {
      extrapolateRight: "clamp",
    })
  );

  // Scene 5: Climax Promo SPP 5 Bulan (f: 600 - 750)
  const s5Frame = frame - 602;
  const s5Spring = spring({ frame: s5Frame, fps, config: { damping: 13, stiffness: 120 } });
  const s5Exit = interpolate(frame, [740, 750], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Scene 6: Outro & Call to Action (f: 745 - 900)
  const s6Frame = frame - 746;
  const s6Spring = spring({ frame: s6Frame, fps, config: { damping: 14, stiffness: 110 } });
  const pulseBtn = Math.sin((frame / fps) * 6) * 0.03 + 1.0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAF7F2",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif',
        overflow: "hidden",
        transform: `scale(${camScale})`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. AUDIO LAYER: Voiceover Selina + Background Music Ducked + SFX */}
      <Audio
        src={staticFile("audio/ppdb_biaya_promo_vo.mp3")}
        volume={1.0}
      />
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        volume={(f) => {
          if (f < 820) return 0.22;
          return 0.65;
        }}
      />

      {/* SFX TRANSITIONS */}
      <Sequence from={0} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={124} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.35} />
      </Sequence>
      <Sequence from={292} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.45} />
      </Sequence>
      <Sequence from={438} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.45} />
      </Sequence>
      <Sequence from={598} durationInFrames={50}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.65} />
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.4} />
      </Sequence>
      <Sequence from={744} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.5} />
      </Sequence>

      {/* 2. BACKGROUND AMBIENT MOTES (Lush Meadow & Sunlight) */}
      {AMBIENT_MOTES.map((mote) => {
        const floatY = (mote.yBase - frame * mote.speed * 2.2) % 2100;
        const driftX = mote.x + Math.sin(frame * 0.04 + mote.id) * 24;
        return (
          <div
            key={mote.id}
            style={{
              position: "absolute",
              left: driftX,
              top: floatY < -50 ? floatY + 2150 : floatY,
              width: mote.size,
              height: mote.size,
              borderRadius: "50%",
              backgroundColor: mote.color,
              opacity: 0.22,
              filter: "blur(2px)",
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* PERSISTENT TOP HEADER (Scenes 1 to 5) */}
      {frame < 745 && (
        <div
          style={{
            position: "absolute",
            top: 145,
            left: 70,
            right: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Img
              src={staticFile("ppdb/logo_1x1.png")}
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                border: "2px solid #FFFFFF",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#15803D",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                }}
              >
                SMP ANNIDA AL ISLAMY SETU
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#B45309",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Sekolah Alam & Pondok Tahfidz
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#FEF3C7",
              border: "1.5px solid #F59E0B",
              borderRadius: 999,
              padding: "8px 18px",
              color: "#92400E",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.04em",
              boxShadow: "0 4px 12px rgba(245,158,11,0.15)",
            }}
          >
            ✨ PPDB 2027/2028
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 1: HOOK AYAH BUNDA (Frame 0 - 130)                                 */}
      {/* VO: "Kabar gembira untuk Ayah Bunda yang sedang memilih SMP terbaik!"     */}
      {/* ========================================================================= */}
      {frame < 132 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 1 - s1Exit,
            transform: `translateY(${-s1Exit * 60}px)`,
          }}
        >
          {/* Main Headline */}
          <div
            style={{
              position: "absolute",
              top: 245,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `scale(${interpolate(s1Spring, [0, 1], [0.88, 1])})`,
              opacity: interpolate(s1Spring, [0, 0.4], [0, 1]),
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 22px",
                borderRadius: 999,
                backgroundColor: "#DCFCE7",
                border: "1.5px solid #86EFAC",
                color: "#166534",
                fontSize: 16,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 14,
              }}
            >
              Kabar Gembira Untuk Ayah & Bunda 🌸
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#14532D",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Sedang Memilih <br />
              <span
                style={{
                  color: "#D97706",
                  background: "linear-gradient(135deg, #D97706, #F59E0B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                SMP Terbaik Buah Hati?
              </span>
            </div>
          </div>

          {/* Polaroid Frame Santri Tersenyum */}
          <div
            style={{
              position: "absolute",
              top: 485,
              left: 80,
              right: 80,
              height: 900,
              backgroundColor: "#FFFFFF",
              borderRadius: 36,
              padding: 24,
              boxShadow: "0 24px 60px rgba(21, 128, 61, 0.14)",
              border: "3px solid rgba(22, 163, 74, 0.18)",
              transform: `scale(${interpolate(s1Spring, [0, 1], [0.85, 1])}) rotate(${interpolate(s1Spring, [0, 1], [-2, 0.6])}deg)`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Washi Tape Accent */}
            <div
              style={{
                position: "absolute",
                top: -16,
                left: "35%",
                width: 140,
                height: 34,
                backgroundColor: "#FEF08A",
                opacity: 0.92,
                borderRadius: 6,
                boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
                transform: "rotate(-3deg)",
              }}
            />

            <div
              style={{
                flex: 1,
                borderRadius: 24,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Img
                src={staticFile("ppdb/gedung_sekolah.webp")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(20,83,45,0.75) 0%, transparent 60%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 900 }}>
                  Gedung & Kampus SMP Annida 2 Setu
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, opacity: 0.9, marginTop: 4 }}>
                  Lingkungan Asri, Nyaman & Representatif di Setu, Bekasi
                </div>
              </div>
            </div>

            {/* Bottom Polaroid Caption */}
            <div
              style={{
                paddingTop: 20,
                textAlign: "center",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 22 }}>🌿</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: "#166534" }}>
                  Lingkungan Asri
                </span>
              </div>
              <div style={{ width: 1.5, height: 26, backgroundColor: "#E2E8F0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 22 }}>📖</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: "#166534" }}>
                  Tahfidz Mutqin
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle Bar Sync */}
          <div
            style={{
              position: "absolute",
              top: 1440,
              left: 80,
              right: 80,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              padding: "18px 24px",
              borderRadius: 24,
              border: "1.5px solid #BBF7D0",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#15803D" }}>
              "Kabar gembira untuk Ayah & Bunda yang sedang memilih SMP terbaik..."
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 2: BIAYA ALL-IN & TRANSPARAN (Frame 125 - 300)                      */}
      {/* VO: "Di SMP Annida Al-Islami Setu, biaya masuk sudah all-in tanpa biaya   */}
      {/*      tambahan."                                                           */}
      {/* ========================================================================= */}
      {frame >= 125 && frame < 302 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: (1 - s2Exit) * Math.min(1, (frame - 125) / 10),
            transform: `translateY(${-s2Exit * 50}px)`,
          }}
        >
          {/* Section Header */}
          <div
            style={{
              position: "absolute",
              top: 235,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `scale(${interpolate(s2Spring, [0, 1], [0.9, 1])})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 22px",
                borderRadius: 999,
                backgroundColor: "#FEF3C7",
                border: "1.5px solid #F59E0B",
                color: "#92400E",
                fontSize: 16,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 12,
              }}
            >
              100% JUJUR & TRANSPARAN ✨
            </div>
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                color: "#14532D",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Biaya Masuk Sudah All-In <br />
              <span style={{ color: "#D97706" }}>Tanpa Biaya Tambahan!</span>
            </div>
          </div>

          {/* Interactive All-In Feature Card */}
          <div
            style={{
              position: "absolute",
              top: 450,
              left: 80,
              right: 80,
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              padding: "28px 28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.07)",
              border: "3px solid #86EFAC",
              transform: `scale(${interpolate(s2Spring, [0, 1], [0.88, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#15803D",
                textAlign: "center",
                marginBottom: 18,
                letterSpacing: "0.02em",
              }}
            >
              Semua Kebutuhan Awal Santri Sudah Termasuk:
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  icon: "👔",
                  title: "Seragam Lengkap & Atribut",
                  desc: "Siap pakai tanpa beli seragam terpisah",
                },
                {
                  icon: "📚",
                  title: "Buku Paket & Modul Pembelajaran",
                  desc: "Fasilitas materi belajar sudah tersedia",
                },
                {
                  icon: "🌳",
                  title: "Kegiatan Praktik & Sekolah Alam",
                  desc: "Eksplorasi sains, outbound & pembiasaan adab",
                },
                {
                  icon: "🛡️",
                  title: "Tanpa Uang Gedung Tambahan",
                  desc: "Biaya awal sudah meng-cover semuanya",
                },
              ].map((item, idx) => {
                const itemSpring = spring({
                  frame: s2Frame - idx * 7,
                  fps,
                  config: { damping: 13, stiffness: 120 },
                });
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      backgroundColor: "#F0FDF4",
                      padding: "14px 18px",
                      borderRadius: 18,
                      border: "1.5px solid #BBF7D0",
                      transform: `translateX(${interpolate(itemSpring, [0, 1], [-40, 0])}px)`,
                      opacity: interpolate(itemSpring, [0, 0.4], [0, 1]),
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 14,
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: "#166534",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#4B5563",
                          marginTop: 2,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                    <div
                      style={{
                        marginLeft: "auto",
                        color: "#16A34A",
                        fontSize: 22,
                        fontWeight: 900,
                      }}
                    >
                      ✓
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Authentic Campus Preview Card Filling Vertical Space */}
          <div
            style={{
              position: "absolute",
              top: 1070,
              left: 80,
              right: 80,
              height: 330,
              borderRadius: 28,
              overflow: "hidden",
              border: "3px solid #FFFFFF",
              boxShadow: "0 18px 45px rgba(21, 128, 61, 0.12)",
              transform: `scale(${interpolate(s2Spring, [0, 1], [0.92, 1])})`,
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-2.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(20,83,45,0.85) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 24,
                right: 24,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 20, fontWeight: 900 }}>
                  Santri Belajar Bahagia di Alam Bebas
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                  Pendidikan terpadu sains, tahfidz, dan kemandirian berakhlak
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#FEF3C7",
                  color: "#92400E",
                  padding: "6px 14px",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 900,
                  whiteSpace: "nowrap",
                }}
              >
                100% AMANAH
              </div>
            </div>
          </div>

          {/* Subtitle Bar Sync */}
          <div
            style={{
              position: "absolute",
              top: 1440,
              left: 80,
              right: 80,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              padding: "18px 24px",
              borderRadius: 24,
              border: "1.5px solid #FCD34D",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#B45309" }}>
              "Di SMP Annida Al-Islami Setu, biaya masuk sudah all-in tanpa biaya tambahan."
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 3: OPSI 1 - SEKOLAH REGULER (Frame 295 - 445)                       */}
      {/* VO: "Program sekolah reguler: empat juta tiga ratus tujuh puluh lima      */}
      {/*      ribu rupiah."                                                        */}
      {/* ========================================================================= */}
      {frame >= 295 && frame < 448 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: (1 - s3Exit) * Math.min(1, (frame - 295) / 10),
            transform: `translateY(${-s3Exit * 50}px)`,
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: 235,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `scale(${interpolate(s3Spring, [0, 1], [0.9, 1])})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 999,
                backgroundColor: "#DCFCE7",
                border: "2px solid #22C55E",
                color: "#15803D",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              PILIHAN 1 • SEKOLAH MANDIRI ☀️
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: "#14532D",
                lineHeight: 1.2,
              }}
            >
              Program Sekolah Reguler
            </div>
          </div>

          {/* Card 1: Pricing Hero Card */}
          <div
            style={{
              position: "absolute",
              top: 380,
              left: 80,
              right: 80,
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              padding: "26px 30px",
              boxShadow: "0 20px 50px rgba(22, 163, 74, 0.14)",
              border: "3.5px solid #16A34A",
              textAlign: "center",
              transform: `scale(${interpolate(s3Spring, [0, 1], [0.88, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
            >
              Total Biaya Masuk All-In
            </div>

            <div
              style={{
                fontSize: 62,
                fontWeight: 900,
                color: "#15803D",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                textShadow: "0 4px 16px rgba(21,128,61,0.15)",
              }}
            >
              Rp {countOpsi1.toLocaleString("id-ID")}
            </div>

            <div
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "6px 20px",
                backgroundColor: "#FEF3C7",
                borderRadius: 999,
                color: "#92400E",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              ✨ Sudah Termasuk Semua Kebutuhan Awal Santri
            </div>

            {/* 3 Grid Mini Checkpoints */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginTop: 18,
              }}
            >
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#F0FDF4",
                  padding: "10px 8px",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#166534",
                  border: "1px solid #BBF7D0",
                }}
              >
                🌱 Belajar di Alam
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#F0FDF4",
                  padding: "10px 8px",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#166534",
                  border: "1px solid #BBF7D0",
                }}
              >
                📚 Seragam Lengkap
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#F0FDF4",
                  padding: "10px 8px",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#166534",
                  border: "1px solid #BBF7D0",
                }}
              >
                🎯 Ekskul Lengkap
              </div>
            </div>
          </div>

          {/* Card 2: Photo & Benefit Showcase Card (Filling Vertical Canvas) */}
          <div
            style={{
              position: "absolute",
              top: 890,
              left: 80,
              right: 80,
              height: 510,
              borderRadius: 32,
              overflow: "hidden",
              border: "3px solid #FFFFFF",
              boxShadow: "0 20px 50px rgba(22, 163, 74, 0.14)",
              transform: `scale(${interpolate(s3Spring, [0, 1], [0.92, 1])})`,
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-6.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(20,83,45,0.92) 0%, rgba(20,83,45,0.3) 55%, transparent 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 28,
                right: 28,
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 900 }}>
                  Pembelajaran Aktif Berbasis Alam
                </div>
                <div
                  style={{
                    backgroundColor: "#FEF3C7",
                    color: "#92400E",
                    padding: "4px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 900,
                  }}
                >
                  SOLUSI REGULER
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, opacity: 0.95, lineHeight: 1.4 }}>
                Kurikulum terpadu sekolah menengah, penguatan adab Islami, dan eksplorasi bakat ananda.
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  gap: 16,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#BBF7D0",
                }}
              >
                <span>✓ Fokus Belajar Siang</span>
                <span>✓ Berkumpul Keluarga di Rumah</span>
              </div>
            </div>
          </div>

          {/* Subtitle Bar Sync */}
          <div
            style={{
              position: "absolute",
              top: 1440,
              left: 80,
              right: 80,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              padding: "18px 24px",
              borderRadius: 24,
              border: "1.5px solid #86EFAC",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#15803D" }}>
              "Program sekolah reguler: Rp4.375.000..."
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 4: OPSI 2 - SEKOLAH + PONDOK TAHFIDZ (Frame 440 - 605)              */}
      {/* VO: "Program plus pondok pesantren: enam juta delapan ratus dua puluh      */}
      {/*      lima ribu rupiah."                                                   */}
      {/* ========================================================================= */}
      {frame >= 440 && frame < 608 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: (1 - s4Exit) * Math.min(1, (frame - 440) / 10),
            transform: `translateY(${-s4Exit * 50}px)`,
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: 235,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `scale(${interpolate(s4Spring, [0, 1], [0.9, 1])})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 999,
                backgroundColor: "#FEF3C7",
                border: "2px solid #F59E0B",
                color: "#92400E",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              PILIHAN 2 • SEKOLAH + PONDOK 🕌
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: "#14532D",
                lineHeight: 1.2,
              }}
            >
              Plus Pondok Pesantren Tahfidz
            </div>
          </div>

          {/* Card 1: Pricing Hero Card */}
          <div
            style={{
              position: "absolute",
              top: 380,
              left: 80,
              right: 80,
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              padding: "26px 30px",
              boxShadow: "0 20px 50px rgba(217, 119, 6, 0.16)",
              border: "3.5px solid #F59E0B",
              textAlign: "center",
              transform: `scale(${interpolate(s4Spring, [0, 1], [0.88, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
            >
              Total Biaya Masuk All-In
            </div>

            <div
              style={{
                fontSize: 62,
                fontWeight: 900,
                color: "#D97706",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                textShadow: "0 4px 16px rgba(217,119,6,0.15)",
              }}
            >
              Rp {countOpsi2.toLocaleString("id-ID")}
            </div>

            <div
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "6px 20px",
                backgroundColor: "#DCFCE7",
                borderRadius: 999,
                color: "#15803D",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              ✨ Sudah Termasuk Asrama & Pembinaan 24 Jam
            </div>

            {/* 3 Grid Mini Checkpoints */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginTop: 18,
              }}
            >
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#FEF3C7",
                  padding: "10px 8px",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#92400E",
                  border: "1px solid #FDE68A",
                }}
              >
                🕌 Asrama Nyaman
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#FEF3C7",
                  padding: "10px 8px",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#92400E",
                  border: "1px solid #FDE68A",
                }}
              >
                📖 Tahfidz Mutqin
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#FEF3C7",
                  padding: "10px 8px",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#92400E",
                  border: "1px solid #FDE68A",
                }}
              >
                🤲 Adab 24 Jam
              </div>
            </div>
          </div>

          {/* Card 2: Photo & Benefit Showcase Card (Filling Vertical Canvas) */}
          <div
            style={{
              position: "absolute",
              top: 890,
              left: 80,
              right: 80,
              height: 510,
              borderRadius: 32,
              overflow: "hidden",
              border: "3px solid #FFFFFF",
              boxShadow: "0 20px 50px rgba(217, 119, 6, 0.16)",
              transform: `scale(${interpolate(s4Spring, [0, 1], [0.92, 1])})`,
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-4.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(146,64,14,0.92) 0%, rgba(146,64,14,0.3) 55%, transparent 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 28,
                right: 28,
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 900 }}>
                  Tahfidz Al-Qur'an & Adab Santri
                </div>
                <div
                  style={{
                    backgroundColor: "#FEF3C7",
                    color: "#92400E",
                    padding: "4px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 900,
                  }}
                >
                  PILIHAN FAVORIT
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, opacity: 0.95, lineHeight: 1.4 }}>
                Bimbingan ustadz berpengalaman 24 jam, lingkungan pergaulan terjaga, dan makan 3x bergizi.
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  gap: 16,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#FDE68A",
                }}
              >
                <span>✓ Shalat Berjamaah Teratur</span>
                <span>✓ Kemandirian & Karakter Mulia</span>
              </div>
            </div>
          </div>

          {/* Subtitle Bar Sync */}
          <div
            style={{
              position: "absolute",
              top: 1440,
              left: 80,
              right: 80,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              padding: "18px 24px",
              borderRadius: 24,
              border: "1.5px solid #F59E0B",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#92400E" }}>
              "Program plus pondok pesantren: Rp6.825.000..."
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 5: THE CLIMAX PROMO - GRATIS SPP 5 BULAN (Frame 600 - 750)          */}
      {/* VO: "Khusus gelombang 1, nikmati promo GRATIS SPP LIMA BULAN PENUH!"       */}
      {/* ========================================================================= */}
      {frame >= 600 && frame < 752 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: (1 - s5Exit) * Math.min(1, (frame - 600) / 10),
            transform: `translateY(${-s5Exit * 50}px)`,
          }}
        >
          {/* Celebratory Radial Glow */}
          <div
            style={{
              position: "absolute",
              top: 300,
              left: "50%",
              transform: "translateX(-50%)",
              width: 800,
              height: 800,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(21,128,61,0.08) 50%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          {/* Header Badge */}
          <div
            style={{
              position: "absolute",
              top: 235,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `scale(${interpolate(s5Spring, [0, 1], [0.88, 1])})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 28px",
                borderRadius: 999,
                backgroundColor: "#FEF3C7",
                border: "2px solid #F59E0B",
                color: "#92400E",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 6px 20px rgba(245,158,11,0.25)",
                marginBottom: 12,
              }}
            >
              🎉 SPESIAL PENDAFTAR GELOMBANG 1
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: "#14532D",
                lineHeight: 1.18,
              }}
            >
              Kado Ketenangan Untuk Ayah Bunda
            </div>
          </div>

          {/* Card 1: Golden Voucher Card */}
          <div
            style={{
              position: "absolute",
              top: 380,
              left: 80,
              right: 80,
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              padding: "30px 30px",
              boxShadow: "0 24px 60px rgba(217, 119, 6, 0.2)",
              border: "4px solid #F59E0B",
              textAlign: "center",
              transform: `scale(${interpolate(s5Spring, [0, 1], [0.86, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#15803D",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              PROMO TERBATAS GELOMBANG 1
            </div>

            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: "#B45309",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                marginBottom: 6,
              }}
            >
              GRATIS SPP <br />
              <span
                style={{
                  color: "#15803D",
                  fontSize: 60,
                  display: "inline-block",
                  transform: `scale(${interpolate(s5Spring, [0, 1], [0.9, 1.04])})`,
                }}
              >
                5 BULAN PENUH!
              </span>
            </div>

            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#4B5563",
                lineHeight: 1.35,
                maxWidth: 700,
                margin: "8px auto 16px",
              }}
            >
              Fokus mendampingi tumbuh kembang buah hati di 5 bulan pertama tanpa beban SPP bulanan.
            </p>

            {/* 5 Token Month Pills */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 10,
                marginTop: 14,
              }}
            >
              {[1, 2, 3, 4, 5].map((month) => {
                const tokenSpring = spring({
                  frame: s5Frame - 10 - month * 4,
                  fps,
                  config: { damping: 12, stiffness: 130 },
                });
                return (
                  <div
                    key={month}
                    style={{
                      backgroundColor: "#FEF3C7",
                      border: "2px solid #F59E0B",
                      borderRadius: 16,
                      padding: "12px 6px",
                      textAlign: "center",
                      boxShadow: "0 4px 12px rgba(245,158,11,0.15)",
                      transform: `scale(${interpolate(tokenSpring, [0, 1], [0.7, 1])})`,
                      opacity: interpolate(tokenSpring, [0, 0.4], [0, 1]),
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#92400E",
                        textTransform: "uppercase",
                      }}
                    >
                      Bulan {month}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        color: "#15803D",
                        marginTop: 2,
                      }}
                    >
                      GRATIS
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Photo & Relief Showcase Card (Filling Vertical Canvas) */}
          <div
            style={{
              position: "absolute",
              top: 890,
              left: 80,
              right: 80,
              height: 510,
              borderRadius: 32,
              overflow: "hidden",
              border: "3px solid #FFFFFF",
              boxShadow: "0 20px 50px rgba(217, 119, 6, 0.16)",
              transform: `scale(${interpolate(s5Spring, [0, 1], [0.92, 1])})`,
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-2.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(20,83,45,0.92) 0%, rgba(20,83,45,0.3) 55%, transparent 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 28,
                right: 28,
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 900 }}>
                  Penghematan Nyata Jutaan Rupiah
                </div>
                <div
                  style={{
                    backgroundColor: "#FEF3C7",
                    color: "#92400E",
                    padding: "4px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 900,
                  }}
                >
                  HEMAT JUTAAN 🎁
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, opacity: 0.95, lineHeight: 1.4 }}>
                Investasi terbaik untuk masa depan ananda kini semakin terjangkau dan penuh ketenangan batin.
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  gap: 16,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#FDE68A",
                }}
              >
                <span>⚡ Kuota Gelombang 1 Terbatas</span>
                <span>✓ Berlaku Sekolah & Pondok</span>
              </div>
            </div>
          </div>

          {/* Subtitle Bar Sync */}
          <div
            style={{
              position: "absolute",
              top: 1440,
              left: 80,
              right: 80,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              padding: "18px 24px",
              borderRadius: 24,
              border: "1.5px solid #F59E0B",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#B45309" }}>
              "Khusus gelombang 1, nikmati promo GRATIS SPP 5 BULAN PENUH!"
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 6: OUTRO & CALL TO ACTION (Frame 745 - 900)                         */}
      {/* VO: "Daftar sekarang melalui WhatsApp kami." + Visual Kontak Lengkap      */}
      {/* ========================================================================= */}
      {frame >= 745 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: Math.min(1, (frame - 745) / 10),
          }}
        >
          {/* Logo & School Header */}
          <div
            style={{
              position: "absolute",
              top: 175,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `scale(${interpolate(s6Spring, [0, 1], [0.88, 1])})`,
            }}
          >
            <Img
              src={staticFile("ppdb/logo_1x1.png")}
              style={{
                width: 95,
                height: 95,
                borderRadius: 26,
                margin: "0 auto 14px",
                boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
                border: "3px solid #FFFFFF",
              }}
            />
            <div
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: "#14532D",
                lineHeight: 1.18,
                letterSpacing: "-0.01em",
              }}
            >
              SMP Annida 2 Setu
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#D97706",
                marginTop: 4,
              }}
            >
              Sekolah Alam & Pesantren Tahfidz Terpadu • T.A. 2027/2028
            </div>
          </div>

          {/* Campus Photo Frame */}
          <div
            style={{
              position: "absolute",
              top: 450,
              left: 80,
              right: 80,
              height: 600,
              borderRadius: 32,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
              border: "4px solid #FFFFFF",
              transform: `scale(${interpolate(s6Spring, [0, 1], [0.92, 1])})`,
            }}
          >
            <Img
              src={staticFile("ppdb/gedung_sekolah.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(20,83,45,0.85) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 28,
                left: 28,
                right: 28,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 20px",
                  borderRadius: 999,
                  backgroundColor: "#FEF3C7",
                  color: "#92400E",
                  fontSize: 14,
                  fontWeight: 900,
                  marginBottom: 10,
                }}
              >
                ⚡ KUOTA GELOMBANG 1 SANGAT TERBATAS
              </div>
              <div style={{ fontSize: 26, fontWeight: 900 }}>
                Amankan Kursi Buah Hati Hari Ini!
              </div>
            </div>
          </div>

          {/* Pulsing WhatsApp Action Card */}
          <div
            style={{
              position: "absolute",
              top: 1100,
              left: 80,
              right: 80,
              backgroundColor: "#25D366",
              borderRadius: 28,
              padding: "24px 28px",
              boxShadow: "0 18px 45px rgba(37, 211, 102, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              transform: `scale(${pulseBtn})`,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              💬
            </div>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#064E3B",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Daftar WhatsApp (Ust. Alwan):
              </div>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "0.04em",
                  lineHeight: 1.1,
                }}
              >
                0819-1586-5383
              </div>
            </div>
          </div>

          {/* Website Link Card */}
          <div
            style={{
              position: "absolute",
              top: 1270,
              left: 100,
              right: 100,
              backgroundColor: "#FFFFFF",
              borderRadius: 22,
              padding: "16px 24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              border: "2px solid #E2E8F0",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 20 }}>🌐</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#15803D" }}>
              smpannida.sch.id
            </span>
          </div>

          {/* Subtitle Bar Sync in Outro */}
          <div
            style={{
              position: "absolute",
              top: 1440,
              left: 80,
              right: 80,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              padding: "18px 24px",
              borderRadius: 24,
              border: "1.5px solid #22C55E",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#15803D" }}>
              "Daftar sekarang melalui WhatsApp kami."
            </div>
          </div>

          {/* Address Footer note */}
          <div
            style={{
              position: "absolute",
              top: 1560,
              left: 80,
              right: 80,
              textAlign: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#6B7280",
            }}
          >
            Kecamatan Setu, Kabupaten Bekasi • Jawa Barat
          </div>
        </div>
      )}

      {/* TOP TIMELINE PROGRESS BAR */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "rgba(0,0,0,0.06)",
          zIndex: 90,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #16A34A, #F59E0B)",
            borderBottomRightRadius: 4,
            borderTopRightRadius: 4,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
