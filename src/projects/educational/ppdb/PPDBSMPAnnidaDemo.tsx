/**
 * IKLAN PPDB SMP ANNIDA 2 SETU - 30 DETIK VERTIKAL (1080x1920, 30 FPS, 900 FRAMES)
 * Motion Graphics Sinematik Berbasis Suara ElevenLabs, Footage Nyata Sekolah & Transisi Modern.
 */

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

// 60 Kata Sinkronisasi Presisi dari ElevenLabs Alignment (Offset frame +15)
const TIMED_WORDS_30S = [
  { word: "Bagi", startFrame: 15, endFrame: 24 },
  { word: "Ayah", startFrame: 26, endFrame: 33 },
  { word: "dan", startFrame: 34, endFrame: 38 },
  { word: "Bunda", startFrame: 39, endFrame: 48 },
  { word: "yang", startFrame: 50, endFrame: 53 },
  { word: "mendambakan", startFrame: 55, endFrame: 71 },
  { word: "pendidikan", startFrame: 72, endFrame: 86 },
  { word: "terbaik", startFrame: 87, endFrame: 100 },
  { word: "untuk", startFrame: 102, endFrame: 109 },
  { word: "sang", startFrame: 110, endFrame: 116 },
  { word: "buah", startFrame: 117, endFrame: 123 },
  { word: "hati,", startFrame: 124, endFrame: 138 },
  { word: "SMP", startFrame: 154, endFrame: 168 },
  { word: "Annida", startFrame: 175, endFrame: 185 },
  { word: "2", startFrame: 189, endFrame: 194 },
  { word: "Setu", startFrame: 207, endFrame: 217 },
  { word: "hadir", startFrame: 219, endFrame: 227 },
  { word: "dengan", startFrame: 229, endFrame: 235 },
  { word: "konsep", startFrame: 237, endFrame: 248 },
  { word: "Sekolah", startFrame: 250, endFrame: 260 },
  { word: "Alam", startFrame: 262, endFrame: 269 },
  { word: "dan", startFrame: 271, endFrame: 274 },
  { word: "Pesantren", startFrame: 276, endFrame: 291 },
  { word: "Tahfidz", startFrame: 293, endFrame: 307 },
  { word: "terpadu.", startFrame: 317, endFrame: 336 },
  { word: "Di", startFrame: 352, endFrame: 356 },
  { word: "sini,", startFrame: 357, endFrame: 367 },
  { word: "ananda", startFrame: 377, endFrame: 389 },
  { word: "dibina", startFrame: 390, endFrame: 401 },
  { word: "dengan", startFrame: 402, endFrame: 408 },
  { word: "akhlak", startFrame: 410, endFrame: 419 },
  { word: "Qurani,", startFrame: 420, endFrame: 437 },
  { word: "belajar", startFrame: 446, endFrame: 459 },
  { word: "aktif", startFrame: 461, endFrame: 472 },
  { word: "di", startFrame: 473, endFrame: 475 },
  { word: "alam", startFrame: 478, endFrame: 485 },
  { word: "asri", startFrame: 487, endFrame: 497 },
  { word: "yang", startFrame: 498, endFrame: 503 },
  { word: "nyaman,", startFrame: 504, endFrame: 517 },
  { word: "serta", startFrame: 526, endFrame: 535 },
  { word: "didorong", startFrame: 536, endFrame: 549 },
  { word: "meraih", startFrame: 551, endFrame: 559 },
  { word: "prestasi", startFrame: 560, endFrame: 574 },
  { word: "akademik", startFrame: 575, endFrame: 589 },
  { word: "dan", startFrame: 591, endFrame: 594 },
  { word: "minat", startFrame: 595, endFrame: 602 },
  { word: "bakat.", startFrame: 603, endFrame: 615 },
  { word: "PPDB", startFrame: 632, endFrame: 648 },
  { word: "telah", startFrame: 652, endFrame: 658 },
  { word: "dibuka,", startFrame: 659, endFrame: 675 },
  { word: "kuota", startFrame: 682, endFrame: 692 },
  { word: "terbatas.", startFrame: 694, endFrame: 715 },
  { word: "Hubungi", startFrame: 729, endFrame: 741 },
  { word: "kami", startFrame: 743, endFrame: 752 },
  { word: "dan", startFrame: 754, endFrame: 758 },
  { word: "amankan", startFrame: 760, endFrame: 772 },
  { word: "kursi", startFrame: 773, endFrame: 781 },
  { word: "ananda", startFrame: 783, endFrame: 792 },
  { word: "sekarang", startFrame: 794, endFrame: 805 },
  { word: "juga.", startFrame: 806, endFrame: 816 },
];

// Partikel Keemasan Melayang (Ambient Bokeh 30 Detik)
const BOKEH_PARTICLES_30S = [
  { id: 1, x: 140, yBase: 1800, speed: 1.4, size: 14, phase: 0.2 },
  { id: 2, x: 320, yBase: 1300, speed: 1.8, size: 22, phase: 1.8 },
  { id: 3, x: 820, yBase: 1900, speed: 1.2, size: 18, phase: 3.4 },
  { id: 4, x: 940, yBase: 1450, speed: 2.0, size: 12, phase: 4.6 },
  { id: 5, x: 240, yBase: 2000, speed: 1.6, size: 26, phase: 2.2 },
  { id: 6, x: 560, yBase: 1600, speed: 1.3, size: 16, phase: 5.3 },
  { id: 7, x: 880, yBase: 2100, speed: 1.7, size: 20, phase: 1.1 },
  { id: 8, x: 440, yBase: 1350, speed: 2.1, size: 10, phase: 4.1 },
  { id: 9, x: 700, yBase: 1750, speed: 1.5, size: 24, phase: 2.9 },
  { id: 10, x: 180, yBase: 1500, speed: 1.7, size: 15, phase: 1.4 },
];

export const PPDBSMPAnnidaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Top Progress Bar (0% - 100% sepanjang 900 frame)
  const progressPercent = (frame / durationInFrames) * 100;

  // Ducking BGM: Rendah saat narator berbicara (f=15 - 816), naik megah di outro (f=816 - 900)
  const bgmVolume = interpolate(
    frame,
    [0, 15, 805, 830],
    [0.3, 0.16, 0.16, 0.38],
    { extrapolateRight: "clamp" }
  );

  // ---------------------------------------------------------------------------
  // SCENE 1 (Frame 0 - 345): Hook Ayah Bunda & Identitas Sekolah
  // Transisi Keluar: Dynamic Scale-Down + Upward Push + Blur
  // ---------------------------------------------------------------------------
  const s1ExitProgress = interpolate(frame, [332, 345], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s1Scale =
    interpolate(frame, [0, 332], [1.02, 1.14], {
      extrapolateRight: "clamp",
    }) * (1 - s1ExitProgress * 0.12);
  const s1TranslateY = -s1ExitProgress * 150;
  const s1Opacity = interpolate(frame, [0, 15, 335, 345], [0, 1, 1, 0]);

  // Hook Text Switch di Scene 1:
  // f=0-145: "Wujudkan Masa Depan Terbaik Ananda"
  // f=145-340: "SMP ANNIDA 2 SETU - Sekolah Alam & Pesantren Tahfidz"
  const s1IsPhase2 = frame >= 145;
  const s1Phase2Spring = spring({
    frame: frame - 145,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // ---------------------------------------------------------------------------
  // SCENE 2 (Frame 340 - 525): Pembinaan Karakter & Belajar di Alam
  // Transisi Masuk: Dynamic Slide-Up + Overshoot Spring
  // ---------------------------------------------------------------------------
  const s2EnterProgress = interpolate(frame, [340, 358], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s2ExitProgress = interpolate(frame, [515, 525], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s2TranslateY = (1 - s2EnterProgress) * 120 - s2ExitProgress * 120;
  const s2Scale =
    interpolate(frame, [340, 370], [1.08, 1.0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }) * (1 - s2ExitProgress * 0.1);
  const s2Opacity = interpolate(frame, [340, 348, 516, 525], [0, 1, 1, 0]);

  const s2Card1Spring = spring({
    frame: frame - 380,
    fps,
    config: { damping: 13, stiffness: 110 },
  });
  const s2Card2Spring = spring({
    frame: frame - 440,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // ---------------------------------------------------------------------------
  // SCENE 3 (Frame 520 - 640): Prestasi Akademik & Minat Bakat
  // Transisi Masuk: Lateral Push & Zoom
  // ---------------------------------------------------------------------------
  const s3EnterProgress = interpolate(frame, [520, 538], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s3ExitProgress = interpolate(frame, [630, 640], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s3TranslateX = (1 - s3EnterProgress) * 100 - s3ExitProgress * 100;
  const s3Scale =
    interpolate(frame, [520, 545], [1.08, 1.0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }) * (1 - s3ExitProgress * 0.1);
  const s3Opacity = interpolate(frame, [520, 528, 631, 640], [0, 1, 1, 0]);

  const s3Card1Spring = spring({
    frame: frame - 550,
    fps,
    config: { damping: 13, stiffness: 110 },
  });
  const s3Card2Spring = spring({
    frame: frame - 585,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // ---------------------------------------------------------------------------
  // SCENE 4 (Frame 635 - 900): Hero PPDB & Call-To-Action Resmi
  // Transisi Masuk: Cinematic Center Zoom-Through
  // ---------------------------------------------------------------------------
  const s4EnterProgress = interpolate(frame, [635, 660], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s4Scale = interpolate(s4EnterProgress, [0, 1], [0.88, 1.0]);
  const s4Opacity = interpolate(frame, [635, 648], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s4Pulse = Math.sin((frame / fps) * 4) * 0.03 + 1.0;
  const s4LogoGlow = Math.sin((frame / fps) * 3) * 10 + 25;

  return (
    <AbsoluteFill style={{ backgroundColor: "#04120C", overflow: "hidden" }}>
      {/* ------------------------------------------------------------------- */}
      {/* AMBIENT FLOATING BOKEH (Membentang di Seluruh Video)                */}
      {/* ------------------------------------------------------------------- */}
      {BOKEH_PARTICLES_30S.map((p) => {
        const currentY =
          ((p.yBase - frame * p.speed * 3.5) % 2100 + 2100) % 2100 - 100;
        const swayX = Math.sin(frame * 0.03 + p.phase) * 25;
        const particleOpacity =
          0.2 + Math.sin(frame * 0.05 + p.phase) * 0.16;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x + swayX,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: "#FBBF24",
              opacity: particleOpacity,
              filter: `blur(${p.size > 18 ? 4 : 2}px)`,
              boxShadow: "0 0 16px rgba(251, 191, 36, 0.8)",
              pointerEvents: "none",
              zIndex: 40,
            }}
          />
        );
      })}

      {/* ------------------------------------------------------------------- */}
      {/* SCENE 1: HOOK ORANG TUA & IDENTITAS SEKOLAH (0 - 345)               */}
      {/* ------------------------------------------------------------------- */}
      {frame < 345 && (
        <AbsoluteFill
          style={{
            opacity: s1Opacity,
            transform: `scale(${s1Scale}) translateY(${s1TranslateY}px)`,
            transformOrigin: "center center",
          }}
        >
          {/* Foto Gedung Asli */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
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
          </div>

          {/* Vignette Gelap untuk Keterbacaan */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4, 18, 12, 0.9) 0%, rgba(4, 18, 12, 0.35) 40%, rgba(4, 18, 12, 0.84) 80%, rgba(4, 18, 12, 0.98) 100%)",
            }}
          />

          {/* Top Badge */}
          <div
            style={{
              position: "absolute",
              top: 150,
              left: 70,
              right: 70,
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 28px",
                borderRadius: 30,
                backgroundColor: "rgba(13, 77, 52, 0.85)",
                border: "1px solid rgba(251, 191, 36, 0.6)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#FBBF24",
                  boxShadow: "0 0 10px #FBBF24",
                }}
              />
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                PENERIMAAN PESERTA DIDIK BARU
              </span>
            </div>
          </div>

          {/* Main Headline Scene 1 */}
          <div
            style={{
              position: "absolute",
              top: 360,
              left: 60,
              right: 60,
              textAlign: "center",
            }}
          >
            {!s1IsPhase2 ? (
              <div>
                <div
                  style={{
                    color: "#6EE7B7",
                    fontSize: 34,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 12,
                    textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                  }}
                >
                  Untuk Ayah & Bunda
                </div>
                <h1
                  style={{
                    color: "#FFFFFF",
                    fontSize: 66,
                    fontWeight: 900,
                    lineHeight: 1.15,
                    margin: 0,
                    textShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Wujudkan Masa Depan{" "}
                  <span
                    style={{
                      color: "#FBBF24",
                      textShadow: "0 0 30px rgba(245, 158, 11, 0.7)",
                    }}
                  >
                    Terbaik Ananda
                  </span>
                </h1>
              </div>
            ) : (
              <div
                style={{
                  transform: `scale(${Math.max(0, s1Phase2Spring)})`,
                }}
              >
                <div
                  style={{
                    color: "#FBBF24",
                    fontSize: 28,
                    fontWeight: 800,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  SEKOLAH ALAM & TAHFIDZ TERPADU
                </div>
                <h1
                  style={{
                    color: "#FFFFFF",
                    fontSize: 68,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    margin: 0,
                    textShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  SMP ANNIDA 2 SETU
                </h1>
                <p
                  style={{
                    color: "#A7F3D0",
                    fontSize: 28,
                    fontWeight: 600,
                    marginTop: 14,
                  }}
                >
                  Islamic Boarding & Full Day School
                </p>
              </div>
            )}
          </div>

          {/* Subtitle Dinamis Scene 1 */}
          <div
            style={{
              position: "absolute",
              bottom: 280,
              left: 60,
              right: 60,
              padding: "24px 32px",
              borderRadius: 24,
              backgroundColor: "rgba(6, 26, 18, 0.85)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px 12px",
              }}
            >
              {TIMED_WORDS_30S.slice(0, 25).map((tw, i) => {
                const isActive =
                  frame >= tw.startFrame && frame <= tw.endFrame;
                return (
                  <span
                    key={i}
                    style={{
                      fontSize: 30,
                      fontWeight: isActive ? 900 : 700,
                      color: isActive ? "#FBBF24" : "#E2E8F0",
                      transform: isActive ? "scale(1.12)" : "scale(1.0)",
                      textShadow: isActive
                        ? "0 0 15px rgba(251, 191, 36, 0.8)"
                        : "none",
                      display: "inline-block",
                    }}
                  >
                    {tw.word}
                  </span>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 16,
                paddingTop: 12,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                color: "#34D399",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              MENCETAK GENERASI BERAKHLAK, CERDAS & MANDIRI
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SCENE 2: PEMBINAAN KARAKTER & BELAJAR DI ALAM (340 - 525)           */}
      {/* ------------------------------------------------------------------- */}
      {frame >= 340 && frame < 525 && (
        <AbsoluteFill
          style={{
            opacity: s2Opacity,
            transform: `scale(${s2Scale}) translateY(${s2TranslateY}px)`,
            transformOrigin: "center center",
          }}
        >
          {/* Foto Siswa Nyata */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-7.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4, 18, 12, 0.94) 0%, rgba(4, 18, 12, 0.6) 45%, rgba(4, 18, 12, 0.95) 100%)",
            }}
          />

          {/* Header Scene 2 */}
          <div
            style={{
              position: "absolute",
              top: 150,
              left: 60,
              right: 60,
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "#FBBF24",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              NILAI INTI PENDIDIKAN
            </span>
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: 54,
                fontWeight: 900,
                margin: "8px 0 0 0",
              }}
            >
              Karakter & Alam Asri
            </h2>
          </div>

          {/* 2 Staggered Feature Cards */}
          <div
            style={{
              position: "absolute",
              top: 360,
              left: 60,
              right: 60,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Card 1: Akhlak Qurani */}
            <div
              style={{
                transform: `scale(${Math.max(0, s2Card1Spring)})`,
                transformOrigin: "center center",
                padding: "28px 32px",
                borderRadius: 24,
                backgroundColor: "rgba(11, 46, 31, 0.92)",
                border: "2px solid rgba(52, 211, 153, 0.5)",
                boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 22,
                  backgroundColor: "rgba(16, 185, 129, 0.25)",
                  border: "1px solid #10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 38,
                }}
              >
                📖
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#FBBF24",
                    fontSize: 34,
                    fontWeight: 900,
                    letterSpacing: 1,
                  }}
                >
                  Akhlak & Tahfidz Qurani
                </div>
                <div
                  style={{
                    color: "#E2E8F0",
                    fontSize: 23,
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  Bimbingan intensif hafalan dan adab harian santri
                </div>
              </div>
            </div>

            {/* Card 2: Belajar Aktif di Alam */}
            <div
              style={{
                transform: `scale(${Math.max(0, s2Card2Spring)})`,
                transformOrigin: "center center",
                padding: "28px 32px",
                borderRadius: 24,
                backgroundColor: "rgba(11, 46, 31, 0.92)",
                border: "2px solid rgba(52, 211, 153, 0.5)",
                boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 22,
                  backgroundColor: "rgba(16, 185, 129, 0.25)",
                  border: "1px solid #10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 38,
                }}
              >
                🌿
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#FBBF24",
                    fontSize: 34,
                    fontWeight: 900,
                    letterSpacing: 1,
                  }}
                >
                  Sekolah Alam yang Asri
                </div>
                <div
                  style={{
                    color: "#E2E8F0",
                    fontSize: 23,
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  Belajar aktif, nyaman, bebas stres di lingkungan hijau
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle Dinamis Scene 2 */}
          <div
            style={{
              position: "absolute",
              bottom: 280,
              left: 60,
              right: 60,
              padding: "22px 30px",
              borderRadius: 20,
              backgroundColor: "rgba(6, 26, 18, 0.85)",
              border: "1px solid rgba(251, 191, 36, 0.4)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px 12px",
              }}
            >
              {TIMED_WORDS_30S.slice(25, 39).map((tw, i) => {
                const isActive =
                  frame >= tw.startFrame && frame <= tw.endFrame;
                return (
                  <span
                    key={i}
                    style={{
                      fontSize: 32,
                      fontWeight: isActive ? 900 : 700,
                      color: isActive ? "#FBBF24" : "#E2E8F0",
                      transform: isActive ? "scale(1.12)" : "scale(1.0)",
                      textShadow: isActive
                        ? "0 0 15px rgba(251, 191, 36, 0.8)"
                        : "none",
                      display: "inline-block",
                    }}
                  >
                    {tw.word}
                  </span>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SCENE 3: PRESTASI AKADEMIK & MINAT BAKAT (520 - 640)                */}
      {/* ------------------------------------------------------------------- */}
      {frame >= 520 && frame < 640 && (
        <AbsoluteFill
          style={{
            opacity: s3Opacity,
            transform: `scale(${s3Scale}) translateX(${s3TranslateX}px)`,
            transformOrigin: "center center",
          }}
        >
          {/* Foto Santri Aktif */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-4.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4, 18, 12, 0.94) 0%, rgba(4, 18, 12, 0.65) 45%, rgba(4, 18, 12, 0.95) 100%)",
            }}
          />

          {/* Header Scene 3 */}
          <div
            style={{
              position: "absolute",
              top: 150,
              left: 60,
              right: 60,
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "#FBBF24",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              PENGEMBANGAN POTENSI
            </span>
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: 54,
                fontWeight: 900,
                margin: "8px 0 0 0",
              }}
            >
              Prestasi & Minat Bakat
            </h2>
          </div>

          {/* 2 Staggered Feature Cards */}
          <div
            style={{
              position: "absolute",
              top: 360,
              left: 60,
              right: 60,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Card 1: Prestasi Akademik */}
            <div
              style={{
                transform: `scale(${Math.max(0, s3Card1Spring)})`,
                transformOrigin: "center center",
                padding: "28px 32px",
                borderRadius: 24,
                backgroundColor: "rgba(11, 46, 31, 0.92)",
                border: "2px solid rgba(52, 211, 153, 0.5)",
                boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 22,
                  backgroundColor: "rgba(16, 185, 129, 0.25)",
                  border: "1px solid #10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 38,
                }}
              >
                🏆
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#FBBF24",
                    fontSize: 34,
                    fontWeight: 900,
                    letterSpacing: 1,
                  }}
                >
                  Prestasi Akademik
                </div>
                <div
                  style={{
                    color: "#E2E8F0",
                    fontSize: 23,
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  Kurikulum nasional terpadu dengan standar kelulusan tinggi
                </div>
              </div>
            </div>

            {/* Card 2: Minat & Bakat Santri */}
            <div
              style={{
                transform: `scale(${Math.max(0, s3Card2Spring)})`,
                transformOrigin: "center center",
                padding: "28px 32px",
                borderRadius: 24,
                backgroundColor: "rgba(11, 46, 31, 0.92)",
                border: "2px solid rgba(52, 211, 153, 0.5)",
                boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 22,
                  backgroundColor: "rgba(16, 185, 129, 0.25)",
                  border: "1px solid #10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 38,
                }}
              >
                🎯
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#FBBF24",
                    fontSize: 34,
                    fontWeight: 900,
                    letterSpacing: 1,
                  }}
                >
                  Eksplorasi Minat Bakat
                </div>
                <div
                  style={{
                    color: "#E2E8F0",
                    fontSize: 23,
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  Ekstrakurikuler, kepemimpinan & keterampilan hidup
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle Dinamis Scene 3 */}
          <div
            style={{
              position: "absolute",
              bottom: 280,
              left: 60,
              right: 60,
              padding: "22px 30px",
              borderRadius: 20,
              backgroundColor: "rgba(6, 26, 18, 0.85)",
              border: "1px solid rgba(251, 191, 36, 0.4)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px 12px",
              }}
            >
              {TIMED_WORDS_30S.slice(39, 47).map((tw, i) => {
                const isActive =
                  frame >= tw.startFrame && frame <= tw.endFrame;
                return (
                  <span
                    key={i}
                    style={{
                      fontSize: 32,
                      fontWeight: isActive ? 900 : 700,
                      color: isActive ? "#FBBF24" : "#E2E8F0",
                      transform: isActive ? "scale(1.12)" : "scale(1.0)",
                      textShadow: isActive
                        ? "0 0 15px rgba(251, 191, 36, 0.8)"
                        : "none",
                      display: "inline-block",
                    }}
                  >
                    {tw.word}
                  </span>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* SCENE 4: HERO PPDB & CALL-TO-ACTION RESMI (635 - 900)               */}
      {/* ------------------------------------------------------------------- */}
      {frame >= 635 && (
        <AbsoluteFill
          style={{
            opacity: s4Opacity,
            transform: `scale(${s4Scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* Latar Gedung Asli */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0.28,
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
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4, 18, 12, 0.94) 0%, rgba(4, 18, 12, 0.98) 50%, #04120C 100%)",
            }}
          />

          {/* Kotak Presentasi Hero */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 60,
              right: 60,
              transform: "translateY(-50%)",
              padding: "44px 36px",
              borderRadius: 32,
              backgroundColor: "rgba(11, 46, 31, 0.95)",
              border: "2px solid rgba(245, 158, 11, 0.6)",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.85)",
              textAlign: "center",
            }}
          >
            {/* Logo Resmi Sekolah */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                padding: 12,
                margin: "0 auto 18px auto",
                boxShadow: `0 0 ${s4LogoGlow}px rgba(16, 185, 129, 0.6)`,
              }}
            >
              <Img
                src={staticFile("ppdb/logo_1x1.png")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <div
              style={{
                color: "#FBBF24",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              PENERIMAAN SANTRI & SISWA BARU
            </div>

            <h1
              style={{
                color: "#FFFFFF",
                fontSize: 54,
                fontWeight: 900,
                lineHeight: 1.15,
                margin: "0 0 10px 0",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              SMP ANNIDA 2 SETU
            </h1>

            <p
              style={{
                color: "#A7F3D0",
                fontSize: 26,
                fontWeight: 600,
                margin: "0 0 28px 0",
              }}
            >
              Tahun Ajaran 2027/2028 • Kuota Terbatas
            </p>

            {/* Tombol Aksi Pulsing */}
            <div
              style={{
                display: "inline-block",
                padding: "20px 48px",
                borderRadius: 40,
                backgroundColor: "#10B981",
                boxShadow: "0 0 35px rgba(16, 185, 129, 0.7)",
                transform: `scale(${s4Pulse})`,
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 30,
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                DAFTAR SEKARANG
              </span>
            </div>

            {/* Informasi Kontak Resmi Terverifikasi */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                padding: "20px 24px",
                borderRadius: 20,
                backgroundColor: "rgba(4, 18, 12, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 26 }}>📞</span>
                <span
                  style={{
                    color: "#FEF08A",
                    fontSize: 28,
                    fontWeight: 900,
                    letterSpacing: 1.5,
                  }}
                >
                  0819-1586-5383
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22 }}>🌐</span>
                <span
                  style={{
                    color: "#6EE7B7",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  smpannida.sch.id
                </span>
              </div>

              <div
                style={{
                  color: "#94A3B8",
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                Gg. Al-Ikhlas No.47, Setu - Bekasi
              </div>
            </div>
          </div>

          {/* Subtitle Dinamis Penutup */}
          <div
            style={{
              position: "absolute",
              bottom: 120,
              left: 60,
              right: 60,
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px 12px",
              }}
            >
              {TIMED_WORDS_30S.slice(47).map((tw, i) => {
                const isActive =
                  frame >= tw.startFrame && frame <= tw.endFrame;
                return (
                  <span
                    key={i}
                    style={{
                      fontSize: 30,
                      fontWeight: isActive ? 900 : 700,
                      color: isActive ? "#FBBF24" : "#A7F3D0",
                      transform: isActive ? "scale(1.12)" : "scale(1.0)",
                      textShadow: isActive
                        ? "0 0 15px rgba(251, 191, 36, 0.8)"
                        : "none",
                      display: "inline-block",
                    }}
                  >
                    {tw.word}
                  </span>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* OVERLAY STATIS: TOP RETENTION PROGRESS BAR (30 DETIK)               */}
      {/* ------------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${progressPercent}%`,
          height: 8,
          backgroundColor: "#F59E0B",
          boxShadow: "0 0 14px #F59E0B",
          zIndex: 999,
        }}
      />

      {/* ------------------------------------------------------------------- */}
      {/* AUDIO TRACKS: ELEVENLABS 30S + DUCKED BGM 30S + MODERN SFX          */}
      {/* ------------------------------------------------------------------- */}

      {/* 1. Suara Narasi Utama ElevenLabs (27 detik / Frame 15 - 825) */}
      <Sequence from={15} durationInFrames={810}>
        <Audio
          src={staticFile("audio/ppdb_voiceover_30s.mp3")}
          volume={1.0}
        />
      </Sequence>

      {/* 2. Musik Latar Sinematik Akustik (30.5 detik, Auto-Ducked) */}
      <Audio
        src={staticFile("audio/ppdb_bgm_rich_30s.mp3")}
        volume={bgmVolume}
      />

      {/* 3. SFX Transisi Modern Whoosh antar Adegan */}
      <Sequence from={0} durationInFrames={18}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.5} />
      </Sequence>
      <Sequence from={335} durationInFrames={18}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.65} />
      </Sequence>
      <Sequence from={515} durationInFrames={18}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.65} />
      </Sequence>
      <Sequence from={630} durationInFrames={18}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.65} />
      </Sequence>

      {/* 4. SFX Chime Sparkle pada Momen Kunci */}
      <Sequence from={18} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.45} />
      </Sequence>
      <Sequence from={150} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.5} />
      </Sequence>
      <Sequence from={380} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.5} />
      </Sequence>
      <Sequence from={550} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.5} />
      </Sequence>
      <Sequence from={645} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  );
};
