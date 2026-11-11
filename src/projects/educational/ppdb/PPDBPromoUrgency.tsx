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
 * KONTEN 2: PROMO GELOMBANG 1 S.D. DESEMBER 2026 (~21.0 DETIK / 630 FRAMES @ 30 FPS)
 * Voice Over: vo_ppdb2_promo.mp3 (20.27s)
 * Beat 1: Kabar Gembira & Pembukaan Gelombang 1 (0 - 195 frames / 0 - 6.5s)
 * Beat 2: Batas Waktu Desember 2026 & Gratis SPP 5 Bulan (190 - 390 frames / 6.3s - 13.0s)
 * Beat 3: Biaya Transparan All-In & Gedung + CTA WhatsApp (385 - 630 frames / 12.8s - 21.0s)
 * Batasan: Berlaku s.d. Desember 2026 (Tanpa batasan kuota kursi).
 * Tema: Warm Ivory, Fresh Nature Emerald, High-Contrast Mobile Typography.
 */

export const PPDBPromoUrgency: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const TOTAL_FRAMES = 630;

  // Progress Bar
  const progressPercent = (frame / TOTAL_FRAMES) * 100;

  // Kamera subtle zoom
  const camScale = interpolate(frame, [0, TOTAL_FRAMES], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // BEAT TIMINGS (Synced with VO: vo_ppdb2_promo.mp3)
  // =========================================================================
  // Beat 1: 0 - 195
  const b1Exit = interpolate(frame, [184, 195], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Beat 2: 190 - 390
  const b2Exit = interpolate(frame, [378, 390], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Beat 3: 385 - 630
  const b3Frame = frame - 385;
  const b3Building = spring({ frame: b3Frame - 8, fps, config: { damping: 13, stiffness: 120 } });
  const b3Price = spring({ frame: b3Frame - 30, fps, config: { damping: 12, stiffness: 130 } }); // ~14.0s

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

      {/* PRIMARY AUDIO: VOICE OVER */}
      <Audio
        src={staticFile("audio/vo_ppdb2_promo.mp3")}
        volume={1.0}
      />

      {/* SECONDARY AUDIO: BGM (Low ducked volume) */}
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        volume={0.25}
      />

      {/* SFX BEAT TRANSITIONS */}
      <Sequence from={0} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={188} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.35} />
      </Sequence>
      <Sequence from={383} durationInFrames={50}>
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
            background: "linear-gradient(90deg, #D97706, #059669, #10B981)",
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
            border: "1.5px solid #D97706",
            backgroundColor: "rgba(217, 119, 6, 0.10)",
            padding: "8px 18px",
            borderRadius: 999,
            color: "#B45309",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          📅 S.D. DESEMBER 2026
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
      {/* BEAT 1: KABAR GEMBIRA & PEMBUKAAN GELOMBANG 1 (0 - 195 frames)            */}
      {/* ========================================================================= */}
      {frame < 198 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 1 - b1Exit,
            transform: `translateY(${-b1Exit * 70}px)`,
          }}
        >
          {/* Sektor Atas (Y: 250 - 430) */}
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
              PENGUMUMAN RESMI PPDB 2027/2028
            </div>
            <MaskedWordReveal
              text="Kabar Gembira! Gelombang 1 Resmi Dibuka!"
              frame={frame}
              startFrame={4}
              fps={fps}
              fontSize={62}
              fontWeight={900}
              color="#0F172A"
              lineHeight={1.15}
              letterSpacing="-0.03em"
              staggerFrames={3}
              highlightWords={{
                "Gelombang": { color: "#D97706" },
                "1": { color: "#D97706" },
                "Resmi": { color: "#D97706" },
                "Dibuka!": { color: "#D97706" },
              }}
            />
          </div>

          {/* Sektor Tengah: Hero Typographic Reveal (Y: 500 - 1360) */}
          <div
            style={{
              position: "absolute",
              top: 500,
              left: 70,
              right: 70,
            }}
          >
            <KineticSlamPunch
              words={["PENERIMAAN", "SANTRI", "BARU"]}
              frame={frame}
              startFrame={50}
              fps={fps}
              fontSize={96}
              textColor="#065F46"
              badgeBg="rgba(5, 150, 105, 0.08)"
              badgeBorder="rgba(5, 150, 105, 0.3)"
              staggerFrames={5}
              shadowColor="rgba(5, 150, 105, 0.2)"
            />

            {/* Hairline Divider with Underline */}
            <div
              style={{
                margin: "32px 0 24px 0",
                position: "relative",
              }}
            >
              <KineticUnderline
                frame={frame}
                startFrame={75}
                fps={fps}
                color="#059669"
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
                [ SMP ANNIDA AL ISLAMY SETU ]
              </div>
            </div>

            <MaskedWordReveal
              text="Menyambut generasi pembelajar Qurani dengan perpaduan keunggulan Sekolah Alam dan Pesantren Tahfidz Terpadu."
              frame={frame}
              startFrame={85}
              fps={fps}
              fontSize={34}
              fontWeight={600}
              color="#334155"
              lineHeight={1.42}
              staggerFrames={2}
              highlightWords={{
                "Sekolah": { color: "#047857", bg: "rgba(5, 150, 105, 0.1)" },
                "Alam": { color: "#047857", bg: "rgba(5, 150, 105, 0.1)" },
                "Pesantren": { color: "#D97706", bg: "rgba(217, 119, 6, 0.1)" },
                "Tahfidz": { color: "#D97706", bg: "rgba(217, 119, 6, 0.1)" },
                "Terpadu.": { color: "#D97706", bg: "rgba(217, 119, 6, 0.1)" },
              }}
            />
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
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "2px solid #D97706",
                  backgroundColor: "rgba(217, 119, 6, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#D97706",
                  fontSize: 28,
                  fontWeight: 900,
                }}
              >
                ★
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#0F172A" }}>
                Dapatkan Keuntungan Khusus Pendaftaran Awal
              </div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#D97706" }}>
              LIHAT PROMO ↓
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BEAT 2: BATAS WAKTU DESEMBER 2026 & GRATIS SPP 5 BULAN (190 - 390 frames) */}
      {/* ========================================================================= */}
      {frame >= 188 && frame < 394 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: frame < 195 ? (frame - 188) / 7 : 1 - b2Exit,
            transform: `translateY(${-b2Exit * 70}px)`,
          }}
        >
          {/* Sektor Atas (Y: 240 - 390) */}
          <div
            style={{
              position: "absolute",
              top: 240,
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
              PENAWARAN TERBAIK TAHUN INI
            </div>
            <MaskedWordReveal
              text="Keuntungan Spesial Pendaftaran Gelombang 1"
              frame={frame}
              startFrame={192}
              fps={fps}
              fontSize={52}
              fontWeight={900}
              color="#0F172A"
              lineHeight={1.15}
              letterSpacing="-0.03em"
              staggerFrames={3}
              highlightWords={{
                "Gelombang": { color: "#D97706" },
                "1": { color: "#D97706" },
              }}
            />
            <KineticUnderline
              frame={frame}
              startFrame={205}
              fps={fps}
              color="#D97706"
              height={5}
            />
          </div>

          {/* Sektor Tengah: Massive Deadline & Voucher (Y: 495 - 1360) */}
          <div
            style={{
              position: "absolute",
              top: 495,
              left: 70,
              right: 70,
            }}
          >
            {/* Giant Deadline Box Marker */}
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#B45309", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                BATAS WAKTU PROMO GELOMBANG 1:
              </div>
              <KineticSlamPunch
                words={["DESEMBER", "2026"]}
                frame={frame}
                startFrame={215}
                fps={fps}
                fontSize={84}
                textColor="#D97706"
                badgeBg="rgba(245, 158, 11, 0.1)"
                badgeBorder="rgba(245, 158, 11, 0.35)"
                staggerFrames={5}
                shadowColor="rgba(217, 119, 6, 0.2)"
              />
              <div style={{ fontSize: 28, color: "#475569", marginTop: 10, lineHeight: 1.45 }}>
                Segera amankan promo pendaftaran perdana sebelum periode Desember 2026 berakhir.
              </div>
            </div>

            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)", margin: "24px 0" }} />

            {/* Giant Promo Text */}
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#047857",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                KADO KETENANGAN UNTUK AYAH & BUNDA
              </div>
              <KineticSlamPunch
                words={["GRATIS", "SPP", "5 BULAN!"]}
                frame={frame}
                startFrame={265}
                fps={fps}
                fontSize={84}
                textColor="#047857"
                badgeBg="rgba(5, 150, 105, 0.1)"
                badgeBorder="rgba(5, 150, 105, 0.35)"
                staggerFrames={5}
                shadowColor="rgba(5, 150, 105, 0.2)"
              />
              <div style={{ marginTop: 12 }}>
                <MaskedWordReveal
                  text="Hemat jutaan rupiah langsung sejak awal masuk sekolah untuk seluruh pendaftar s.d. Desember 2026."
                  frame={frame}
                  startFrame={290}
                  fps={fps}
                  fontSize={30}
                  fontWeight={600}
                  color="#334155"
                  lineHeight={1.4}
                  staggerFrames={2}
                  highlightWords={{
                    "Hemat": { color: "#047857" },
                    "jutaan": { color: "#047857" },
                    "Desember": { color: "#D97706" },
                    "2026.": { color: "#D97706" },
                  }}
                />
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
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>📅</span>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#065F46", whiteSpace: "nowrap" }}>
                Berlaku s.d. Desember 2026
              </div>
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#D97706",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              GELOMBANG 1
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BEAT 3: BIAYA MASUK & GEDUNG + WHATSAPP CTA (385 - 630 frames)            */}
      {/* ========================================================================= */}
      {frame >= 380 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: Math.min(1, (frame - 380) / 8),
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
              transform: `scale(${interpolate(b3Building, [0, 1], [0.94, 1])})`,
            }}
          >
            <Img
              src={staticFile("ppdb/gedung_sekolah.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${interpolate(frame, [385, 630], [1.0, 1.08])})`,
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
                PROMO GELOMBANG 1 S.D. DESEMBER 2026
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
                Daftar Sebelum Desember 2026 & Dapatkan Promo SPP 5 Bulan!
              </div>
            </div>
          </div>

          {/* Sektor Tengah: Biaya Transparan & Voucher Highlight (Y: 760 - 1380) */}
          <div
            style={{
              position: "absolute",
              top: 760,
              left: 70,
              right: 70,
              opacity: interpolate(b3Price, [0, 0.4], [0, 1]),
            }}
          >
            {/* Promo Banner */}
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
                ★ KLAIM BENEFIT GELOMBANG 1 SEKARANG ★
              </div>
              <KineticSlamPunch
                words={["GRATIS", "SPP", "5 BULAN!"]}
                frame={frame}
                startFrame={410}
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

            {/* Price Snapshot 2 Kolom Lebar */}
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
                  Sekolah Mandiri (Reguler)
                </div>
                <div style={{ marginTop: 4 }}>
                  <KineticCounter
                    value={4375000}
                    prefix="Rp "
                    frame={frame}
                    startFrame={430}
                    fps={fps}
                    durationFrames={25}
                    fontSize={64}
                    color="#065F46"
                  />
                </div>
                <div style={{ fontSize: 22, color: "#475569", fontWeight: 700, marginTop: 4 }}>
                  All-In seragam, modul, kegiatan
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#B45309", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Sekolah + Pondok Tahfidz
                </div>
                <div style={{ marginTop: 4 }}>
                  <KineticCounter
                    value={6825000}
                    prefix="Rp "
                    frame={frame}
                    startFrame={445}
                    fps={fps}
                    durationFrames={25}
                    fontSize={64}
                    color="#B45309"
                  />
                </div>
                <div style={{ fontSize: 22, color: "#475569", fontWeight: 700, marginTop: 4 }}>
                  All-In asrama, makan 3x, ustadz 24 jam
                </div>
              </div>
            </div>

            <div style={{ height: 1.5, backgroundColor: "rgba(6, 78, 59, 0.15)", margin: "16px 0" }} />

            <div
              style={{
                textAlign: "center",
                fontSize: 28,
                color: "#047857",
                fontWeight: 800,
                letterSpacing: "0.04em",
              }}
            >
              ⚡ Promo potongan SPP 5 bulan berlaku khusus pendaftaran hingga Desember 2026!
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
              sublabel="KLAIM PROMO VIA WHATSAPP RESMI"
              frame={frame}
              startFrame={480}
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
