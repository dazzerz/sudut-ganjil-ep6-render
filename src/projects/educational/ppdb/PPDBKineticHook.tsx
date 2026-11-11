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
import {
  MaskedWordReveal,
  KineticSlamPunch,
  KineticUnderline,
  KineticCounter,
  ShimmerSweepButton,
} from "./components/KineticTypography";

/**
 * KONTEN 1: KINETIC TYPOGRAPHY HOOK (~21.5 DETIK / 645 FRAMES @ 30 FPS)
 * Voice Over: vo_ppdb1_kinetic.mp3 (21.00s)
 * Beat 1: Hook Ayah & Bunda (0 - 155 frames / 0 - 5.1s)
 * Beat 2: 3 Kebutuhan Utama (150 - 355 frames / 5.0s - 11.8s)
 * Beat 3: Gedung, Biaya All-In & Promo SPP 5 Bulan + CTA WA (350 - 645 frames / 11.6s - 21.5s)
 * Tema: Warm Ivory, Fresh Nature Emerald, High-Contrast Mobile Typography
 */

export const PPDBKineticHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const TOTAL_FRAMES = 645;

  // Subtle continuous camera drift
  const camScale = interpolate(frame, [0, TOTAL_FRAMES], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });

  // Top Retention Progress Bar (0% -> 100%)
  const progressPercent = (frame / TOTAL_FRAMES) * 100;

  // =========================================================================
  // BEAT TIMINGS (Synced with VO: vo_ppdb1_kinetic.mp3)
  // =========================================================================
  // Beat 1: 0 - 155
  const b1Sub = spring({ frame: frame - 90, fps, config: { damping: 13, stiffness: 130 } });
  const b1Exit = interpolate(frame, [144, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Beat 2: 150 - 355
  const b2Frame = frame - 150;
  const row1 = spring({ frame: b2Frame - 10, fps, config: { damping: 13, stiffness: 130 } }); // ~5.4s
  const row2 = spring({ frame: b2Frame - 80, fps, config: { damping: 13, stiffness: 130 } }); // ~7.8s
  const row3 = spring({ frame: b2Frame - 140, fps, config: { damping: 13, stiffness: 130 } }); // ~9.8s
  const b2Exit = interpolate(frame, [342, 355], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Beat 3: 350 - 645
  const b3Frame = frame - 350;
  const b3Spring = spring({ frame: b3Frame, fps, config: { damping: 14, stiffness: 115 } });
  const b3Price = spring({ frame: b3Frame - 110, fps, config: { damping: 12, stiffness: 130 } }); // ~15.5s

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(175deg, #F8FAF7 0%, #F1F6F0 45%, #E8F2EA 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif',
        overflow: "hidden",
        transform: `scale(${camScale})`,
        transformOrigin: "center center",
      }}
    >
      {/* AMBIENT BACKGROUND GLOW ORBS (Warm, Friendly, Living Canvas) */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 600,
          right: -150,
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* PRIMARY AUDIO: ELEVENLABS VOICE OVER */}
      <Audio
        src={staticFile("audio/vo_ppdb1_kinetic.mp3")}
        volume={1.0}
      />

      {/* SECONDARY AUDIO: BGM (Low ducked volume) */}
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        volume={0.25}
      />

      {/* SFX BEAT TRANSITIONS */}
      <Sequence from={0} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.3} />
      </Sequence>
      <Sequence from={148} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={348} durationInFrames={50}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.35} />
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.5} />
      </Sequence>

      {/* TOP RETENTION PROGRESS BAR */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: "rgba(6, 78, 59, 0.08)",
          zIndex: 99,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #059669, #10B981, #F59E0B)",
          }}
        />
      </div>

      {/* TOP HEADER: SMP ANNIDA AL ISLAMY SETU (Safe-Zone Y: 148px) */}
      <div
        style={{
          position: "absolute",
          top: 148,
          left: 70,
          right: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Img
            src={staticFile("ppdb/logo_1x1.png")}
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              objectFit: "contain",
              backgroundColor: "#FFFFFF",
              padding: 2,
              boxShadow: "0 4px 12px rgba(6, 78, 59, 0.12)",
            }}
          />
          <div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#065F46",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              SMP ANNIDA AL ISLAMY SETU
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#64748B",
                letterSpacing: "0.06em",
              }}
            >
              SEKOLAH ALAM & PESANTREN TAHFIDZ TERPADU
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1.5px solid #059669",
            backgroundColor: "rgba(5, 150, 105, 0.10)",
            padding: "8px 18px",
            borderRadius: 999,
            color: "#047857",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          PPDB 2027/2028
        </div>
      </div>

      {/* Hairline Divider Below Header */}
      <div
        style={{
          position: "absolute",
          top: 226,
          left: 70,
          right: 70,
          height: 1.5,
          backgroundColor: "rgba(6, 78, 59, 0.15)",
          zIndex: 79,
        }}
      />

      {/* ========================================================================= */}
      {/* BEAT 1: KINETIC HOOK (0 - 155 frames)                                     */}
      {/* ========================================================================= */}
      {frame < 158 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 1 - b1Exit,
            transform: `translateY(${-b1Exit * 70}px)`,
          }}
        >
          {/* Sektor Atas (Y: 280 - 430) */}
          <div
            style={{
              position: "absolute",
              top: 280,
              left: 70,
              right: 70,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                color: "#047857",
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
                backgroundColor: "rgba(5, 150, 105, 0.1)",
                border: "1.5px solid rgba(5, 150, 105, 0.2)",
                padding: "6px 16px",
                borderRadius: 999,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#059669" }} />
              PESAN PENTING UNTUK AYAH & BUNDA
            </div>
            <MaskedWordReveal
              text="Memilih Sekolah Menengah Buah Hati..."
              frame={frame}
              startFrame={4}
              fps={fps}
              fontSize={66}
              fontWeight={900}
              color="#0F172A"
              lineHeight={1.15}
              letterSpacing="-0.03em"
              staggerFrames={3}
              highlightWords={{
                "Buah": { color: "#047857" },
                "Hati...": { color: "#047857" },
              }}
            />
          </div>

          {/* Sektor Tengah: Hero Kinetic Punch (Y: 530 - 1100) */}
          <div
            style={{
              position: "absolute",
              top: 530,
              left: 70,
              right: 70,
            }}
          >
            <KineticSlamPunch
              words={["JANGAN", "ASAL", "PILIH!"]}
              frame={frame}
              startFrame={68}
              fps={fps}
              fontSize={104}
              textColor="#DC2626"
              badgeBg="rgba(220, 38, 38, 0.08)"
              badgeBorder="rgba(220, 38, 38, 0.28)"
              staggerFrames={5}
              shadowColor="rgba(220, 38, 38, 0.22)"
            />

            {/* Hairline Divider with Technical Marker & Underline */}
            <div
              style={{
                margin: "38px 0 28px 0",
                position: "relative",
              }}
            >
              <KineticUnderline
                frame={frame}
                startFrame={88}
                fps={fps}
                color="#DC2626"
                height={5}
              />
              <div
                style={{
                  marginTop: 12,
                  color: "#047857",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                [ ANALISIS KEBUTUHAN PENDIDIKAN ]
              </div>
            </div>

            {/* Subtext with Masked Reveal */}
            <MaskedWordReveal
              text="Masa transisi remaja membutuhkan lingkungan tepat: akhlak mulia, sains terasah, dan biaya 100% transparan."
              frame={frame}
              startFrame={96}
              fps={fps}
              fontSize={34}
              fontWeight={600}
              color="#334155"
              lineHeight={1.42}
              staggerFrames={2}
              highlightWords={{
                "akhlak": { color: "#065F46", bg: "rgba(5, 150, 105, 0.1)" },
                "sains": { color: "#D97706", bg: "rgba(217, 119, 6, 0.1)" },
                "100%": { color: "#2563EB", bg: "rgba(37, 99, 235, 0.1)" },
                "transparan.": { color: "#2563EB", bg: "rgba(37, 99, 235, 0.1)" },
              }}
            />
          </div>

          {/* Sektor Bawah (Y: 1420 - 1680) */}
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 70,
              right: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: interpolate(b1Sub, [0, 0.5], [0, 1]),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "2px solid #059669",
                  backgroundColor: "rgba(5, 150, 105, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#047857",
                  fontSize: 28,
                  fontWeight: 900,
                }}
              >
                ↓
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#0F172A" }}>
                3 Hal Krusial yang Wajib Ada di Sekolah Ananda
              </div>
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#D97706",
                letterSpacing: "0.08em",
              }}
            >
              LIHAT DETAIL
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BEAT 2: 3 KEBUTUHAN UTAMA (150 - 355 frames)                              */}
      {/* ========================================================================= */}
      {frame >= 148 && frame < 358 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: frame < 155 ? (frame - 148) / 7 : 1 - b2Exit,
            transform: `translateY(${-b2Exit * 70}px)`,
          }}
        >
          {/* Sektor Atas: Header Topic (Y: 245 - 390) */}
          <div
            style={{
              position: "absolute",
              top: 245,
              left: 70,
              right: 70,
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "0.15em",
                color: "#047857",
                textTransform: "uppercase",
                marginBottom: 8,
                backgroundColor: "rgba(5, 150, 105, 0.1)",
                padding: "4px 14px",
                borderRadius: 999,
              }}
            >
              CHECKLIST PILIHAN SEKOLAH
            </div>
            <MaskedWordReveal
              text="3 Kebutuhan Mutlak Generasi Masa Depan:"
              frame={frame}
              startFrame={152}
              fps={fps}
              fontSize={58}
              fontWeight={900}
              color="#0F172A"
              lineHeight={1.15}
              letterSpacing="-0.03em"
              staggerFrames={3}
              highlightWords={{
                "Masa": { color: "#D97706" },
                "Depan:": { color: "#D97706" },
              }}
            />
            <KineticUnderline
              frame={frame}
              startFrame={162}
              fps={fps}
              color="#059669"
              height={5}
            />
          </div>

          {/* Sektor Tengah: 3 Full-Width Rows (Y: 495 - 1360) */}
          <div
            style={{
              position: "absolute",
              top: 495,
              left: 70,
              right: 70,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ROW 1: SEKOLAH ALAM */}
            <div
              style={{
                padding: "26px 0",
                opacity: interpolate(row1, [0, 0.4], [0, 1]),
                transform: `translateX(${interpolate(row1, [0, 1], [-40, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
                <span
                  style={{
                    fontSize: 78,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#059669",
                    letterSpacing: "-0.04em",
                    fontVariantNumeric: "tabular-nums",
                    transform: `scale(${interpolate(row1, [0, 1], [0.5, 1])})`,
                    display: "inline-block",
                  }}
                >
                  01
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#047857",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      backgroundColor: "rgba(5, 150, 105, 0.12)",
                      padding: "4px 12px",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    LINGKUNGAN ASRI & SEHAT
                  </div>
                  <MaskedWordReveal
                    text="Konsep Sekolah Berbasis Alam"
                    frame={frame}
                    startFrame={166}
                    fps={fps}
                    fontSize={44}
                    fontWeight={900}
                    color="#0F172A"
                    staggerFrames={2}
                  />
                  <div
                    style={{
                      fontSize: 30,
                      color: "#334155",
                      lineHeight: 1.45,
                      marginTop: 6,
                    }}
                  >
                    Bebas polusi dan pergaulan buruk. Belajar aktif eksplorasi alam & riset sains terbuka.
                  </div>
                </div>
              </div>
            </div>

            {/* Hairline Divider */}
            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)" }} />

            {/* ROW 2: TAHFIDZ & ADAB */}
            <div
              style={{
                padding: "26px 0",
                opacity: interpolate(row2, [0, 0.4], [0, 1]),
                transform: `translateX(${interpolate(row2, [0, 1], [40, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
                <span
                  style={{
                    fontSize: 78,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#D97706",
                    letterSpacing: "-0.04em",
                    fontVariantNumeric: "tabular-nums",
                    transform: `scale(${interpolate(row2, [0, 1], [0.5, 1])})`,
                    display: "inline-block",
                  }}
                >
                  02
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#B45309",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      backgroundColor: "rgba(217, 119, 6, 0.12)",
                      padding: "4px 12px",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    AKHLAK, TAHFIDZ & IBADAH
                  </div>
                  <MaskedWordReveal
                    text="Pesantren Tahfidz & Adab Santri"
                    frame={frame}
                    startFrame={235}
                    fps={fps}
                    fontSize={44}
                    fontWeight={900}
                    color="#0F172A"
                    staggerFrames={2}
                  />
                  <div
                    style={{
                      fontSize: 30,
                      color: "#334155",
                      lineHeight: 1.45,
                      marginTop: 6,
                    }}
                  >
                    Bimbingan tahfidz bersanad 24 jam dengan ustadz berdedikasi. Membangun kebiasaan sholat tepat waktu & adab sopan santun.
                  </div>
                </div>
              </div>
            </div>

            {/* Hairline Divider */}
            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)" }} />

            {/* ROW 3: BIAYA ALL-IN */}
            <div
              style={{
                padding: "26px 0",
                opacity: interpolate(row3, [0, 0.4], [0, 1]),
                transform: `translateX(${interpolate(row3, [0, 1], [-40, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
                <span
                  style={{
                    fontSize: 78,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#2563EB",
                    letterSpacing: "-0.04em",
                    fontVariantNumeric: "tabular-nums",
                    transform: `scale(${interpolate(row3, [0, 1], [0.5, 1])})`,
                    display: "inline-block",
                  }}
                >
                  03
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#1D4ED8",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      backgroundColor: "rgba(37, 99, 235, 0.12)",
                      padding: "4px 12px",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    KEPASTIAN & TRANSPARANSI
                  </div>
                  <MaskedWordReveal
                    text="Biaya 100% All-In Tanpa Pungutan"
                    frame={frame}
                    startFrame={295}
                    fps={fps}
                    fontSize={44}
                    fontWeight={900}
                    color="#0F172A"
                    staggerFrames={2}
                  />
                  <div
                    style={{
                      fontSize: 30,
                      color: "#334155",
                      lineHeight: 1.45,
                      marginTop: 6,
                    }}
                  >
                    Semua keperluan santri (seragam, buku, modul praktikum) tercakup penuh sejak awal.
                  </div>
                </div>
              </div>
            </div>

            {/* Hairline Divider */}
            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)" }} />
          </div>

          {/* Sektor Bawah: Narrative Impact Punch (Y: 1460 - 1680) */}
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 70,
              right: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 34, fontWeight: 900, color: "#065F46" }}>
                Semua Keunggulan Ini Ada di Satu Kampus.
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#475569", marginTop: 4 }}>
                Solusi holistik pendidikan putra-putri tercinta.
              </div>
            </div>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "rgba(5, 150, 105, 0.15)",
                border: "2px solid #059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#047857",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              →
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BEAT 3: THE SOLUTION & CALL TO ACTION (350 - 645 frames)                  */}
      {/* ========================================================================= */}
      {frame >= 345 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: Math.min(1, (frame - 345) / 8),
          }}
        >
          {/* Sektor Atas: Gedung Sekolah Sinematik (Y: 250 - 750) */}
          <div
            style={{
              position: "absolute",
              top: 250,
              left: 70,
              right: 70,
              height: 480,
              overflow: "hidden",
              borderRadius: 20,
              border: "2px solid rgba(6, 78, 59, 0.15)",
              boxShadow: "0 16px 40px rgba(6, 78, 59, 0.12)",
              transform: `scale(${interpolate(b3Spring, [0, 1], [0.94, 1])})`,
            }}
          >
            <Img
              src={staticFile("ppdb/gedung_sekolah.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${interpolate(frame, [350, 645], [1.0, 1.08])})`,
              }}
            />
            {/* Elegant Gradient Bleed */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(6,38,28,0.92) 0%, rgba(6,38,28,0.2) 45%, rgba(0,0,0,0.15) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 30,
                right: 30,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  color: "#FDE047",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                PILIHAN TEPAT MASA DEPAN ANANDA
              </div>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                }}
              >
                SMP Annida Al Islamy Setu
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#86EFAC",
                  marginTop: 4,
                }}
              >
                Kecamatan Setu, Kabupaten Bekasi, Jawa Barat
              </div>
            </div>
          </div>

          {/* Sektor Tengah: Massive Typographic Pricing (Y: 760 - 1380) */}
          <div
            style={{
              position: "absolute",
              top: 760,
              left: 70,
              right: 70,
              opacity: interpolate(b3Price, [0, 0.4], [0, 1]),
            }}
          >
            {/* Promo Gelombang 1 Highlight Banner */}
            <div
              style={{
                textAlign: "center",
                padding: "8px 0",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  letterSpacing: "0.18em",
                  color: "#D97706",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                ★ PROMO ISTIMEWA GELOMBANG 1 ★
              </div>
              <KineticSlamPunch
                words={["GRATIS", "SPP", "5 BULAN!"]}
                frame={frame}
                startFrame={445}
                fps={fps}
                fontSize={86}
                textColor="#047857"
                badgeBg="rgba(245, 158, 11, 0.12)"
                badgeBorder="rgba(245, 158, 11, 0.4)"
                staggerFrames={4}
                shadowColor="rgba(5, 150, 105, 0.2)"
              />
            </div>

            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)", margin: "16px 0" }} />

            {/* 2-Column Price Snapshot */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
              }}
            >
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Biaya Masuk Reguler
                </div>
                <div style={{ marginTop: 4 }}>
                  <KineticCounter
                    value={4375000}
                    prefix="Rp "
                    frame={frame}
                    startFrame={460}
                    fps={fps}
                    durationFrames={25}
                    fontSize={64}
                    color="#065F46"
                  />
                </div>
                <div style={{ fontSize: 22, color: "#475569", fontWeight: 700, marginTop: 4 }}>
                  All-In seragam, buku, kegiatan
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#B45309", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Sekolah + Asrama
                </div>
                <div style={{ marginTop: 4 }}>
                  <KineticCounter
                    value={6825000}
                    prefix="Rp "
                    frame={frame}
                    startFrame={475}
                    fps={fps}
                    durationFrames={25}
                    fontSize={64}
                    color="#B45309"
                  />
                </div>
                <div style={{ fontSize: 22, color: "#475569", fontWeight: 700, marginTop: 4 }}>
                  All-In asrama, makan 3x, tahfidz 24 jam
                </div>
              </div>
            </div>

            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)", margin: "16px 0" }} />

            <div
              style={{
                textAlign: "center",
                fontSize: 28,
                color: "#334155",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              Daftar sekarang & amankan promo keringanan biaya 5 bulan!
            </div>
          </div>

          {/* Sektor Bawah: WhatsApp CTA Button (Y: 1440 - 1680 Safe Zone) */}
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 70,
              right: 70,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShimmerSweepButton
              label="0819-1586-5383 (Ust. Alwan)"
              sublabel="DAFTAR SEKARANG VIA WHATSAPP RESMI"
              frame={frame}
              startFrame={515}
              fps={fps}
              icon="💬"
              bgColor="#16A34A"
              textColor="#FFFFFF"
            />

            <div
              style={{
                marginTop: 18,
                fontSize: 24,
                fontWeight: 700,
                color: "#64748B",
                letterSpacing: "0.04em",
              }}
            >
              smpannida.sch.id • Kecamatan Setu, Kabupaten Bekasi
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
