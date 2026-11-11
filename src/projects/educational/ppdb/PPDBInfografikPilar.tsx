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
 * KONTEN 3: 3-PILLAR ANIMATED INFOGRAPHIC (~19.0 DETIK / 570 FRAMES @ 30 FPS)
 * Voice Over: vo_ppdb3_infografik.mp3 (18.13s)
 * Beat 1: The Formula Hook 2-in-1 (0 - 170 frames / 0 - 5.6s)
 * Beat 2: 3 Pilar Infographic Meters (165 - 370 frames / 5.5s - 12.3s)
 * Beat 3: Gedung Sekolah, Promo SPP 5 Bulan & CTA WhatsApp (365 - 570 frames / 12.1s - 19.0s)
 * Tema: Warm Ivory, Fresh Nature Emerald, High-Contrast Mobile Typography.
 */

export const PPDBInfografikPilar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const TOTAL_FRAMES = 570;

  // Progress Bar
  const progressPercent = (frame / TOTAL_FRAMES) * 100;

  // Kamera subtle zoom
  const camScale = interpolate(frame, [0, TOTAL_FRAMES], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // BEAT TIMINGS (Synced with VO: vo_ppdb3_infografik.mp3)
  // =========================================================================
  // Beat 1: The Formula (0 - 170 / VO 0 - 5.6s)
  const b1Exit = interpolate(frame, [158, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Beat 2: 3 Pilar Infographic Meters (165 - 370 / VO 5.5s - 12.3s)
  const b2Frame = frame - 165;
  const meter1 = spring({ frame: b2Frame - 10, fps, config: { damping: 13, stiffness: 120 } }); // ~5.8s
  const meter2 = spring({ frame: b2Frame - 75, fps, config: { damping: 13, stiffness: 120 } }); // ~8.0s
  const meter3 = spring({ frame: b2Frame - 140, fps, config: { damping: 13, stiffness: 120 } }); // ~10.1s
  const b2Exit = interpolate(frame, [356, 370], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Beat 3: Outro Building & CTA (365 - 570 / VO 12.1s - 19.0s)
  const b3Frame = frame - 365;
  const b3Spring = spring({ frame: b3Frame, fps, config: { damping: 14, stiffness: 115 } });
  const b3Offer = spring({ frame: b3Frame - 20, fps, config: { damping: 12, stiffness: 130 } });

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
      {/* AMBIENT BACKGROUND GLOW ORBS */}
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
        src={staticFile("audio/vo_ppdb3_infografik.mp3")}
        volume={1.0}
      />

      {/* SECONDARY AUDIO: BGM (Low ducked volume) */}
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        volume={0.25}
      />

      {/* SFX BEAT TRANSITIONS */}
      <Sequence from={0} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.35} />
      </Sequence>
      <Sequence from={164} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.45} />
      </Sequence>
      <Sequence from={364} durationInFrames={50}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.55} />
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
      {/* BEAT 1: THE 2-IN-1 FORMULA (0 - 170)                                      */}
      {/* ========================================================================= */}
      {frame < 172 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 1 - b1Exit,
            transform: `translateY(${-b1Exit * 70}px)`,
          }}
        >
          {/* Sektor Atas (Y: 250 - 380) */}
          <div
            style={{
              position: "absolute",
              top: 250,
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
              ANALISIS KURIKULUM HOLISTIK
            </div>
            <MaskedWordReveal
              text="Mengapa Harus Memilih?"
              frame={frame}
              startFrame={4}
              fps={fps}
              fontSize={64}
              fontWeight={900}
              color="#0F172A"
              lineHeight={1.15}
              letterSpacing="-0.03em"
              staggerFrames={3}
            />
            <KineticUnderline
              frame={frame}
              startFrame={18}
              fps={fps}
              color="#059669"
              height={5}
            />
          </div>

          {/* Sektor Tengah: The Formula Equation (Y: 420 - 1360) */}
          <div
            style={{
              position: "absolute",
              top: 420,
              left: 70,
              right: 70,
            }}
          >
            {/* Giant Equation directly on canvas */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <KineticSlamPunch
                words={["1", "SEKOLAH"]}
                frame={frame}
                startFrame={22}
                fps={fps}
                fontSize={86}
                textColor="#065F46"
                badgeBg="rgba(6, 95, 70, 0.08)"
                badgeBorder="rgba(6, 95, 70, 0.28)"
                staggerFrames={4}
              />
              <span
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#D97706",
                  transform: `rotate(${interpolate(frame, [25, 45], [-90, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}deg)`,
                  display: "inline-block",
                }}
              >
                ✕
              </span>
              <KineticSlamPunch
                words={["2", "KEUNGGULAN", "SEKALIGUS"]}
                frame={frame}
                startFrame={42}
                fps={fps}
                fontSize={64}
                textColor="#D97706"
                badgeBg="rgba(245, 158, 11, 0.1)"
                badgeBorder="rgba(245, 158, 11, 0.35)"
                staggerFrames={4}
              />
            </div>

            {/* Hairline Divider with Marker */}
            <div
              style={{
                margin: "30px 0 26px 0",
                height: 1.5,
                backgroundColor: "rgba(6, 78, 59, 0.2)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  left: 0,
                  backgroundColor: "#F8FAF7",
                  paddingRight: 16,
                  color: "#047857",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                [ INTEGRASI DUA SISTEM UNGGUL ]
              </div>
            </div>

            {/* Two Pillars Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              <div>
                <MaskedWordReveal
                  text="01 // KONSEP SEKOLAH ALAM BEBAS POLUSI"
                  frame={frame}
                  startFrame={65}
                  fps={fps}
                  fontSize={26}
                  fontWeight={900}
                  color="#059669"
                  letterSpacing="0.06em"
                  staggerFrames={2}
                />
                <div style={{ fontSize: 32, color: "#334155", marginTop: 6, lineHeight: 1.45 }}>
                  Mendorong ananda aktif berkreasi, riset sains terbuka, dan mencintai lingkungan hidup tanpa tertekan kelas sempit.
                </div>
              </div>

              <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)" }} />

              <div>
                <MaskedWordReveal
                  text="02 // PESANTREN TAHFIDZ & ADAB SANTRI"
                  frame={frame}
                  startFrame={95}
                  fps={fps}
                  fontSize={26}
                  fontWeight={900}
                  color="#D97706"
                  letterSpacing="0.06em"
                  staggerFrames={2}
                />
                <div style={{ fontSize: 32, color: "#334155", marginTop: 6, lineHeight: 1.45 }}>
                  Bimbingan hafalan Al-Qur'an bersanad mutqin, pengawasan adab 24 jam, dan pembentukan karakter Islami mandiri.
                </div>
              </div>
            </div>
          </div>

          {/* Sektor Bawah (Y: 1450 - 1680) */}
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
            <div style={{ fontSize: 32, fontWeight: 800, color: "#065F46" }}>
              Perpaduan Harmonis Sains Terapan & Nilai Luhur Qurani.
            </div>
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
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BEAT 2: 3 PILAR INFOGRAPHIC METERS (165 - 370)                            */}
      {/* ========================================================================= */}
      {frame >= 160 && frame < 372 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: frame < 165 ? (frame - 160) / 5 : 1 - b2Exit,
            transform: `translateY(${-b2Exit * 70}px)`,
          }}
        >
          {/* Sektor Atas (Y: 250 - 390) */}
          <div
            style={{
              position: "absolute",
              top: 250,
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
              3 PILAR PENDIDIKAN TANGGUH
            </div>
            <MaskedWordReveal
              text="Mencetak Generasi Tangguh: Berilmu, Beradab & Mandiri"
              frame={frame}
              startFrame={168}
              fps={fps}
              fontSize={56}
              fontWeight={900}
              color="#0F172A"
              lineHeight={1.15}
              letterSpacing="-0.03em"
              staggerFrames={3}
              highlightWords={{
                "Berilmu,": { color: "#047857" },
                "Beradab": { color: "#D97706" },
                "&": { color: "#D97706" },
                "Mandiri": { color: "#2563EB" },
              }}
            />
            <KineticUnderline
              frame={frame}
              startFrame={180}
              fps={fps}
              color="#059669"
              height={5}
            />
          </div>

          {/* Sektor Tengah: 3 Infographic Meters (Y: 460 - 1400) */}
          <div
            style={{
              position: "absolute",
              top: 460,
              left: 70,
              right: 70,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* PILAR 1: ILMU AMALIYAH */}
            <div
              style={{
                padding: "26px 0",
                opacity: interpolate(meter1, [0, 0.4], [0, 1]),
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#047857", letterSpacing: "0.1em" }}>
                  PILAR 01 // AKADEMIK & SAINS
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#059669" }}>
                  KONTEN TERAKREDITASI
                </div>
              </div>

              <div style={{ margin: "6px 0" }}>
                <MaskedWordReveal
                  text="Ilmu Amaliyah Berbasis Alam"
                  frame={frame}
                  startFrame={175}
                  fps={fps}
                  fontSize={44}
                  fontWeight={900}
                  color="#0F172A"
                  staggerFrames={2}
                />
              </div>

              {/* Dynamic Animated Meter Bar */}
              <div
                style={{
                  height: 14,
                  width: "100%",
                  backgroundColor: "rgba(6, 78, 59, 0.10)",
                  borderRadius: 999,
                  overflow: "hidden",
                  margin: "14px 0",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${interpolate(meter1, [0, 1], [0, 100])}%`,
                    background: "linear-gradient(90deg, #059669, #10B981)",
                    borderRadius: 999,
                  }}
                />
              </div>

              <div style={{ fontSize: 30, color: "#334155", lineHeight: 1.45 }}>
                Kurikulum sains aplikatif yang mengajak ananda berani bereksplorasi langsung pada ekosistem alam.
              </div>
            </div>

            {/* Hairline Divider */}
            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)" }} />

            {/* PILAR 2: KARAKTER QURANI */}
            <div
              style={{
                padding: "26px 0",
                opacity: interpolate(meter2, [0, 0.4], [0, 1]),
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#B45309", letterSpacing: "0.1em" }}>
                  PILAR 02 // SPIRITUAL & ADAB
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#D97706" }}>
                  TAHFIDZ BERSANAD
                </div>
              </div>

              <div style={{ margin: "6px 0" }}>
                <MaskedWordReveal
                  text="Karakter Qurani & Adab Santri"
                  frame={frame}
                  startFrame={240}
                  fps={fps}
                  fontSize={44}
                  fontWeight={900}
                  color="#0F172A"
                  staggerFrames={2}
                />
              </div>

              {/* Dynamic Animated Meter Bar */}
              <div
                style={{
                  height: 14,
                  width: "100%",
                  backgroundColor: "rgba(6, 78, 59, 0.10)",
                  borderRadius: 999,
                  overflow: "hidden",
                  margin: "14px 0",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${interpolate(meter2, [0, 1], [0, 100])}%`,
                    background: "linear-gradient(90deg, #D97706, #F59E0B)",
                    borderRadius: 999,
                  }}
                />
              </div>

              <div style={{ fontSize: 30, color: "#334155", lineHeight: 1.45 }}>
                Pembinaan hafalan Al-Qur'an secara mutqin dan penempaan adab sopan santun 24 jam bersama pembina asrama.
              </div>
            </div>

            {/* Hairline Divider */}
            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)" }} />

            {/* PILAR 3: KEMANDIRIAN */}
            <div
              style={{
                padding: "26px 0",
                opacity: interpolate(meter3, [0, 0.4], [0, 1]),
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#1D4ED8", letterSpacing: "0.1em" }}>
                  PILAR 03 // LEADERSHIP & MENTAL
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#2563EB" }}>
                  LIFE SKILLS
                </div>
              </div>

              <div style={{ margin: "6px 0" }}>
                <MaskedWordReveal
                  text="Potensi Diri & Jiwa Mandiri"
                  frame={frame}
                  startFrame={300}
                  fps={fps}
                  fontSize={44}
                  fontWeight={900}
                  color="#0F172A"
                  staggerFrames={2}
                />
              </div>

              {/* Dynamic Animated Meter Bar */}
              <div
                style={{
                  height: 14,
                  width: "100%",
                  backgroundColor: "rgba(6, 78, 59, 0.10)",
                  borderRadius: 999,
                  overflow: "hidden",
                  margin: "14px 0",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${interpolate(meter3, [0, 1], [0, 100])}%`,
                    background: "linear-gradient(90deg, #2563EB, #3B82F6)",
                    borderRadius: 999,
                  }}
                />
              </div>

              <div style={{ fontSize: 30, color: "#334155", lineHeight: 1.45 }}>
                Melatih kepemimpinan, tanggung jawab pribadi, dan kesiapan mental menghadapi masa depan.
              </div>
            </div>

            {/* Hairline Divider */}
            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)" }} />
          </div>

          {/* Sektor Bawah (Y: 1450 - 1680) */}
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 70,
              right: 70,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#065F46",
                lineHeight: 1.35,
              }}
            >
              Investasi Terbaik Mulai Rp 4.375.000 (Reguler) / Rp 6.825.000 (Pondok) All-In.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BEAT 3: REVEAL GEDUNG & CALL TO ACTION (365 - 570)                        */}
      {/* ========================================================================= */}
      {frame >= 360 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: Math.min(1, (frame - 360) / 8),
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
                transform: `scale(${interpolate(frame, [365, 570], [1.0, 1.08])})`,
              }}
            />
            {/* Gradient Overlay */}
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
                LINGKUNGAN BELAJAR TERPADU & REPRESENTATIF
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
                Sekolah Alam & Pondok Pesantren Tahfidz Terpadu
              </div>
            </div>
          </div>

          {/* Sektor Tengah: Massive Offer & Highlight (Y: 760 - 1380) */}
          <div
            style={{
              position: "absolute",
              top: 760,
              left: 70,
              right: 70,
              opacity: interpolate(b3Offer, [0, 0.4], [0, 1]),
            }}
          >
            {/* Promo Headline */}
            <div style={{ textAlign: "center", padding: "8px 0" }}>
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
                ★ PROMO GELOMBANG 1 PERDANA ★
              </div>
              <KineticSlamPunch
                words={["GRATIS", "SPP", "5 BULAN!"]}
                frame={frame}
                startFrame={390}
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

            {/* Price Snapshot */}
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
                  Biaya Sekolah Reguler
                </div>
                <div style={{ marginTop: 4 }}>
                  <KineticCounter
                    value={4375000}
                    prefix="Rp "
                    frame={frame}
                    startFrame={410}
                    fps={fps}
                    durationFrames={25}
                    fontSize={64}
                    color="#065F46"
                  />
                </div>
                <div style={{ fontSize: 22, color: "#475569", fontWeight: 700, marginTop: 4 }}>
                  All-In seragam, modul, praktikum
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#B45309", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Sekolah + Berasrama
                </div>
                <div style={{ marginTop: 4 }}>
                  <KineticCounter
                    value={6825000}
                    prefix="Rp "
                    frame={frame}
                    startFrame={425}
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
                color: "#0F172A",
                fontWeight: 700,
                letterSpacing: "0.04em",
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
              sublabel="KONSULTASI & PENDAFTARAN RESMI"
              frame={frame}
              startFrame={460}
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
