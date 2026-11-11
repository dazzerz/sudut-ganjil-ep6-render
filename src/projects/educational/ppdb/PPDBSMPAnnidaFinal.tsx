/**
 * VIDEO PROMOSI PPDB SMP ANNIDA 2 SETU (30 DETIK / 900 FRAMES @ 30 FPS)
 * Edisi Kreatif Revisi: Homey & Cheerful Showcase (Anti-Kaku, Tanpa Karakter Kartun)
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
import { TIMED_WORDS_SELINA, TimedWord } from "./data/timedWordsSelina";

const AMBIENT_MOTES = [
  { id: 1, x: 120, yBase: 1800, speed: 1.3, size: 18, color: "#16A34A" },
  { id: 2, x: 260, yBase: 1400, speed: 1.7, size: 22, color: "#F59E0B" },
  { id: 3, x: 820, yBase: 1900, speed: 1.1, size: 24, color: "#22C55E" },
  { id: 4, x: 940, yBase: 1300, speed: 1.9, size: 16, color: "#FBBF24" },
  { id: 5, x: 180, yBase: 2000, speed: 1.5, size: 26, color: "#86EFAC" },
  { id: 6, x: 520, yBase: 1650, speed: 1.2, size: 20, color: "#F59E0B" },
  { id: 7, x: 760, yBase: 2100, speed: 1.6, size: 24, color: "#15803D" },
  { id: 8, x: 400, yBase: 1450, speed: 1.8, size: 14, color: "#FDE68A" },
  { id: 9, x: 670, yBase: 1850, speed: 1.4, size: 26, color: "#4ADE80" },
  { id: 10, x: 150, yBase: 1550, speed: 1.6, size: 18, color: "#F59E0B" },
];

export const PPDBSMPAnnidaFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progressPercent = (frame / durationInFrames) * 100;

  // Ducking BGM
  const bgmVolume = interpolate(
    frame,
    [0, 20, 810, 860],
    [0.26, 0.16, 0.16, 0.34],
    { extrapolateRight: "clamp" }
  );

  const camScale = interpolate(frame, [0, 900], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });

  // SUBTITLE KARAOKE
  const renderSubtitleBar = (wordsSlice: TimedWord[], top = 1340) => {
    return (
      <div
        style={{
          position: "absolute",
          top,
          left: 70,
          right: 70,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 14px",
          padding: "24px 28px",
          borderRadius: 32,
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(14px)",
          border: "2.5px solid rgba(22, 163, 74, 0.25)",
          boxShadow:
            "0 20px 45px rgba(22, 101, 52, 0.1), 0 4px 14px rgba(0,0,0,0.04)",
          zIndex: 60,
        }}
      >
        {wordsSlice.map((tw, i) => {
          const isActive = frame >= tw.startFrame && frame <= tw.endFrame;
          return (
            <span
              key={i}
              style={{
                fontSize: 28,
                fontWeight: isActive ? 900 : 700,
                color: isActive ? "#15803D" : "#475569",
                backgroundColor: isActive ? "#DCFCE7" : "transparent",
                padding: isActive ? "4px 12px" : "4px 4px",
                borderRadius: 14,
                transform: isActive ? "scale(1.08)" : "scale(1.0)",
                display: "inline-block",
              }}
            >
              {tw.word}
            </span>
          );
        })}
      </div>
    );
  };

  // Scene Timings & Springs
  const s1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const s1Exit = interpolate(frame, [140, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s1Words = TIMED_WORDS_SELINA.slice(0, 12);

  const s2Frame = frame - 145;
  const s2Spring = spring({ frame: s2Frame, fps, config: { damping: 14, stiffness: 110 } });
  const s2Exit = interpolate(frame, [325, 335], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s2Words = TIMED_WORDS_SELINA.slice(12, 24);

  const s3Exit = interpolate(frame, [600, 610], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s3Words = TIMED_WORDS_SELINA.slice(24, 46);
  const phase3Index = frame < 425 ? 0 : frame < 515 ? 1 : 2;
  const phaseSpring = spring({
    frame: phase3Index === 0 ? frame - 330 : phase3Index === 1 ? frame - 425 : frame - 515,
    fps,
    config: { damping: 13, stiffness: 125 },
  });

  const s4Frame = frame - 605;
  const s4Spring = spring({ frame: s4Frame, fps, config: { damping: 14, stiffness: 110 } });
  const s4Exit = interpolate(frame, [735, 745], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s4Words = TIMED_WORDS_SELINA.slice(46, 56);

  const s5Frame = frame - 740;
  const s5Spring = spring({ frame: s5Frame, fps, config: { damping: 14, stiffness: 105 } });
  const pulseBtn = Math.sin((frame / fps) * 6) * 0.035 + 1.0;

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
      {/* AUDIO ENGINE */}
      <Audio src={staticFile("audio/ppdb_voiceover_selina_27s.mp3")} volume={1.0} />
      <Audio src={staticFile("audio/soundtrack_120bpm_educational.mp3")} volume={bgmVolume} />
      <Sequence from={0} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.35} />
      </Sequence>
      <Sequence from={145} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={330} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_whoosh.wav")} volume={0.35} />
      </Sequence>
      <Sequence from={605} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.45} />
      </Sequence>
      <Sequence from={740} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.5} />
      </Sequence>

      {/* AMBIENT BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 85% 12%, rgba(254, 243, 199, 0.8) 0%, rgba(250, 247, 242, 0.4) 55%, rgba(243, 238, 228, 0.9) 100%)",
        }}
      />
      <svg
        style={{
          position: "absolute",
          top: -100,
          right: -80,
          width: 580,
          height: 580,
          opacity: 0.22,
          pointerEvents: "none",
        }}
        viewBox="0 0 200 200"
      >
        <path
          fill="#16A34A"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,87.9,-1.2C85.8,13.8,79,27.7,70.5,39.9C62,52.1,51.8,62.7,39.5,70.6C27.2,78.5,13.6,83.8,-0.7,85C-15,86.2,-30,83.3,-43.3,76.1C-56.6,68.9,-68.2,57.4,-76.4,43.7C-84.6,30,-89.4,15,-88.7,0.4C-88,-14.2,-81.8,-28.4,-73.2,-41.2C-64.6,-54,-53.6,-65.4,-40.4,-73.1C-27.2,-80.8,-13.6,-84.8,0.8,-86.2C15.2,-87.6,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Floating Motes */}
      {AMBIENT_MOTES.map((m) => {
        const floatY = ((m.yBase - frame * m.speed) % 2100) + 100;
        const swayX = Math.sin(frame * 0.05 + m.id) * 18;
        return (
          <div
            key={m.id}
            style={{
              position: "absolute",
              left: m.x + swayX,
              top: floatY,
              width: m.size,
              height: m.size,
              borderRadius: "50%",
              backgroundColor: m.color,
              opacity: 0.28,
              filter: "blur(2px)",
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Top Retention Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "rgba(22, 101, 52, 0.08)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #16A34A 0%, #F59E0B 100%)",
            boxShadow: "0 0 12px rgba(245, 158, 11, 0.6)",
          }}
        />
      </div>

      {/* Top Brand Bar */}
      <div
        style={{
          position: "absolute",
          top: 48,
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
            gap: 12,
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            padding: "8px 18px",
            borderRadius: 30,
            border: "1.5px solid rgba(22, 163, 74, 0.2)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
          }}
        >
          <Img
            src={staticFile("ppdb/logo_1x1.png")}
            style={{ width: 34, height: 34, objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#15803D",
              letterSpacing: 0.5,
            }}
          >
            SMP ANNIDA AL ISLAMY SETU
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#FEF3C7",
            color: "#B45309",
            padding: "8px 18px",
            borderRadius: 30,
            fontSize: 16,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: "1.5px solid rgba(245, 158, 11, 0.3)",
          }}
        >
          <span>✨</span>
          <span>PPDB 2027/2028</span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SCENE 1: HOOK AYAH & BUNDA (Frame 0 - 150)                          */}
      {/* =================================================================== */}
      {frame >= 0 && frame < 155 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(s1Exit, [0, 1], [1, 0]),
            transform: `translateY(${interpolate(s1Exit, [0, 1], [0, -60])}px)`,
          }}
        >
          {/* Header Tag (Y: 130 - 360) */}
          <div
            style={{
              position: "absolute",
              top: 135,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `translateY(${interpolate(s1Spring, [0, 1], [40, 0])}px)`,
              opacity: s1Spring,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 22px",
                borderRadius: 99,
                backgroundColor: "#DCFCE7",
                color: "#15803D",
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: 1,
                marginBottom: 12,
              }}
            >
              <span>☀️</span>
              <span>UNTUK AYAH & BUNDA</span>
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                lineHeight: 1.25,
                color: "#1E293B",
              }}
            >
              Mendambakan Sekolah Terbaik
              <br />
              <span
                style={{
                  color: "#15803D",
                  backgroundColor: "#FEF3C7",
                  padding: "2px 14px",
                  borderRadius: 14,
                  display: "inline-block",
                  transform: "rotate(-1deg)",
                  marginTop: 6,
                }}
              >
                Buat Buah Hati?
              </span>
            </h1>
          </div>

          {/* Hero Polaroid Photo (Y: 460 - 1280) */}
          <div
            style={{
              position: "absolute",
              top: 460,
              left: 70,
              right: 70,
              height: 820,
              transform: `scale(${interpolate(s1Spring, [0, 1], [0.88, 1])}) rotate(${
                -2 + Math.sin(frame * 0.05) * 1.5
              }deg)`,
              opacity: s1Spring,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FFFFFF",
              padding: "20px 20px 28px 20px",
              borderRadius: 36,
              boxShadow:
                "0 25px 60px rgba(22, 101, 52, 0.12), 0 8px 24px rgba(0,0,0,0.06)",
              border: "3px solid #F1F5F9",
            }}
          >
            {/* Washi Tape */}
            <div
              style={{
                position: "absolute",
                top: -16,
                left: "38%",
                width: 150,
                height: 34,
                backgroundColor: "rgba(251, 191, 36, 0.85)",
                transform: "rotate(-2.5deg)",
                borderRadius: 4,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
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
                  bottom: 20,
                  left: 20,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(6px)",
                  padding: "10px 20px",
                  borderRadius: 24,
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#15803D",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                🏫 Gedung Kampus SMP Annida 2 Setu
              </div>
            </div>

            <div
              style={{
                marginTop: 18,
                textAlign: "center",
                fontSize: 24,
                fontWeight: 800,
                color: "#1E293B",
              }}
            >
              Tumbuh Mandiri, Cerdas, dan Berakhlak Mulia ✨
            </div>
          </div>

          {/* Subtitles (Y: 1340) */}
          {renderSubtitleBar(s1Words, 1340)}
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENE 2: IDENTITAS SEKOLAH ALAM & PESANTREN TAHFIDZ (145 - 335)     */}
      {/* =================================================================== */}
      {frame >= 145 && frame < 340 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(s2Exit, [0, 1], [1, 0]),
            transform: `translateY(${interpolate(s2Exit, [0, 1], [0, -60])}px)`,
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `translateY(${interpolate(s2Spring, [0, 1], [40, 0])}px)`,
              opacity: s2Spring,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 99,
                backgroundColor: "#FEF3C7",
                color: "#B45309",
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              <span>🏡</span>
              <span>KAMPUS HIJAU & ASRI</span>
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              SMP ANNIDA 2 SETU
            </h1>
            <p
              style={{
                fontSize: 22,
                color: "#16A34A",
                fontWeight: 800,
                marginTop: 6,
              }}
            >
              Sekolah Alam & Pesantren Tahfidz Terpadu
            </p>
          </div>

          {/* Real Campus Photo Frame (Y: 380 - 840) */}
          <div
            style={{
              position: "absolute",
              top: 380,
              left: 70,
              right: 70,
              height: 460,
              borderRadius: 36,
              overflow: "hidden",
              border: "5px solid #FFFFFF",
              boxShadow:
                "0 20px 50px rgba(22, 101, 52, 0.14), 0 6px 16px rgba(0,0,0,0.06)",
              transform: `scale(${interpolate(s2Spring, [0, 1], [0.92, 1])})`,
              opacity: s2Spring,
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-2.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${interpolate(frame, [145, 335], [1.0, 1.08])})`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "8px 18px",
                borderRadius: 24,
                fontSize: 16,
                fontWeight: 800,
                color: "#15803D",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              🌱 Belajar Bahagia
            </div>
          </div>

          {/* 2 Floating Concept Badges (Y: 870 - 1280) */}
          <div
            style={{
              position: "absolute",
              top: 870,
              left: 70,
              right: 70,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 28,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                border: "2.5px solid rgba(22, 163, 74, 0.2)",
                boxShadow: "0 10px 28px rgba(22, 101, 52, 0.08)",
                transform: `translateX(${interpolate(s2Spring, [0, 1], [-50, 0])}px)`,
                opacity: s2Spring,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 22,
                  backgroundColor: "#DCFCE7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 34,
                  flexShrink: 0,
                }}
              >
                🌿
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#15803D" }}>
                  SEKOLAH ALAM TERPADU
                </div>
                <div style={{ fontSize: 17, color: "#64748B", fontWeight: 600, marginTop: 4 }}>
                  Eksplorasi nyata di alam terbuka, sains aplikatif & cinta lingkungan
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 28,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                border: "2.5px solid rgba(245, 158, 11, 0.25)",
                boxShadow: "0 10px 28px rgba(245, 158, 11, 0.08)",
                transform: `translateX(${interpolate(s2Spring, [0, 1], [50, 0])}px)`,
                opacity: s2Spring,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 22,
                  backgroundColor: "#FEF3C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 34,
                  flexShrink: 0,
                }}
              >
                📖
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#B45309" }}>
                  PESANTREN TAHFIDZ QURANI
                </div>
                <div style={{ fontSize: 17, color: "#64748B", fontWeight: 600, marginTop: 4 }}>
                  Hafalan Al-Qur'an mutqin dipadu pembinaan adab & kepemimpinan
                </div>
              </div>
            </div>
          </div>

          {/* Subtitles (Y: 1340) */}
          {renderSubtitleBar(s2Words, 1340)}
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENE 3: 3 NILAI UNGGULAN & DOKUMENTASI AKTIVITAS (330 - 610)        */}
      {/* =================================================================== */}
      {frame >= 330 && frame < 615 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(s3Exit, [0, 1], [1, 0]),
            transform: `translateY(${interpolate(s3Exit, [0, 1], [0, -60])}px)`,
          }}
        >
          {/* Tabs */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 70,
              right: 70,
              display: "flex",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {[
              { label: "1. Akhlak Qurani", active: phase3Index === 0 },
              { label: "2. Belajar di Alam", active: phase3Index === 1 },
              { label: "3. Prestasi & Bakat", active: phase3Index === 2 },
            ].map((tab, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px 18px",
                  borderRadius: 24,
                  fontSize: 17,
                  fontWeight: 800,
                  backgroundColor: tab.active ? "#15803D" : "#E2E8F0",
                  color: tab.active ? "#FFFFFF" : "#64748B",
                  transform: tab.active ? "scale(1.05)" : "scale(1.0)",
                  boxShadow: tab.active ? "0 4px 14px rgba(22, 163, 74, 0.25)" : "none",
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Photo Showcase Card (Y: 220 - 1280) */}
          <div
            style={{
              position: "absolute",
              top: 220,
              left: 70,
              right: 70,
              height: 1060,
              backgroundColor: "#FFFFFF",
              borderRadius: 40,
              padding: 24,
              boxShadow:
                "0 24px 60px rgba(22, 101, 52, 0.12), 0 6px 20px rgba(0,0,0,0.05)",
              border: "3px solid #F1F5F9",
              transform: `scale(${interpolate(phaseSpring, [0, 1], [0.93, 1])})`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 28,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Img
                src={staticFile(
                  phase3Index === 0
                    ? "ppdb/aktivitas-4.webp"
                    : phase3Index === 1
                    ? "ppdb/aktivitas-6.webp"
                    : "ppdb/aktivitas-7.webp"
                )}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  padding: "18px 24px",
                  borderRadius: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.96)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 900, color: "#15803D" }}>
                  {phase3Index === 0
                    ? "📖 Pembinaan Karakter & Tilawah Al-Qur'an"
                    : phase3Index === 1
                    ? "🌿 Belajar Aktif di Alam Terbuka yang Asri"
                    : "🎯 Pengembangan Prestasi & Minat Bakat"}
                </div>
                <div style={{ fontSize: 18, color: "#475569", fontWeight: 600, marginTop: 6 }}>
                  {phase3Index === 0
                    ? "Bimbingan tahsin & tahfidz intensif dengan suasana hati yang tenang"
                    : phase3Index === 1
                    ? "Belajar sambil berinteraksi langsung dengan ekosistem alam sekitar"
                    : "Pramuka, panahan, sains, bahasa, dan kepemimpinan santri"}
                </div>
              </div>
            </div>
          </div>

          {/* Subtitles (Y: 1340) */}
          {renderSubtitleBar(s3Words, 1340)}
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENE 4: BIAYA TRANSPARAN & PROMO BEBAS SPP 5 BULAN (605 - 745)     */}
      {/* =================================================================== */}
      {frame >= 605 && frame < 750 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(s4Exit, [0, 1], [1, 0]),
            transform: `translateY(${interpolate(s4Exit, [0, 1], [0, -60])}px)`,
          }}
        >
          {/* Header (Y: 140 - 340) */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `translateY(${interpolate(s4Spring, [0, 1], [40, 0])}px)`,
              opacity: s4Spring,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 22px",
                borderRadius: 99,
                backgroundColor: "#DCFCE7",
                color: "#15803D",
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              <span>💎</span>
              <span>BIAYA PENDIDIKAN TRANSPARAN</span>
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              Investasi Terbaik Buah Hati
            </h1>
          </div>

          {/* 2 Fee Comparison Cards (Y: 360 - 660) */}
          <div
            style={{
              position: "absolute",
              top: 360,
              left: 70,
              right: 70,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            {/* Reguler */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 32,
                padding: "36px 24px",
                border: "3px solid #22C55E",
                boxShadow: "0 16px 36px rgba(34, 197, 94, 0.12)",
                textAlign: "center",
                transform: `scale(${interpolate(s4Spring, [0, 1], [0.88, 1])})`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 16px",
                  borderRadius: 16,
                  backgroundColor: "#DCFCE7",
                  color: "#15803D",
                  fontSize: 16,
                  fontWeight: 900,
                  marginBottom: 14,
                }}
              >
                REGULER SEKOLAH
              </div>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#15803D",
                  letterSpacing: -0.5,
                }}
              >
                Rp4.375.000
              </div>
              <div
                style={{
                  fontSize: 17,
                  color: "#64748B",
                  fontWeight: 700,
                  marginTop: 8,
                }}
              >
                Biaya Masuk Lengkap
              </div>
            </div>

            {/* Pondok */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 32,
                padding: "36px 24px",
                border: "3px solid #F59E0B",
                boxShadow: "0 16px 36px rgba(245, 158, 11, 0.14)",
                textAlign: "center",
                transform: `scale(${interpolate(s4Spring, [0, 1], [0.88, 1])})`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 16px",
                  borderRadius: 16,
                  backgroundColor: "#FEF3C7",
                  color: "#B45309",
                  fontSize: 16,
                  fontWeight: 900,
                  marginBottom: 14,
                }}
              >
                SEKOLAH + PONDOK
              </div>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#B45309",
                  letterSpacing: -0.5,
                }}
              >
                Rp6.825.000
              </div>
              <div
                style={{
                  fontSize: 17,
                  color: "#64748B",
                  fontWeight: 700,
                  marginTop: 8,
                }}
              >
                Termasuk Asrama & Makan
              </div>
            </div>
          </div>

          {/* Celebratory Promo Banner: BEBAS SPP 5 BULAN (Y: 690 - 1280) */}
          <div
            style={{
              position: "absolute",
              top: 690,
              left: 70,
              right: 70,
              backgroundColor: "#FFFBEB",
              borderRadius: 36,
              padding: "44px 32px",
              border: "3.5px dashed #F59E0B",
              boxShadow: "0 22px 50px rgba(245, 158, 11, 0.18)",
              textAlign: "center",
              transform: `scale(${1.0 + Math.sin(frame * 0.15) * 0.02})`,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 22px",
                borderRadius: 99,
                backgroundColor: "#F59E0B",
                color: "#FFFFFF",
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: 1,
                marginBottom: 16,
              }}
            >
              <span>🎉</span>
              <span>PROMO SPESIAL GELOMBANG 1</span>
            </div>
            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: "#B45309",
                letterSpacing: -1,
                lineHeight: 1.1,
              }}
            >
              BEBAS SPP 5 BULAN!
            </div>
            <p
              style={{
                fontSize: 24,
                color: "#78350F",
                fontWeight: 800,
                marginTop: 14,
              }}
            >
              Khusus pendaftar gelombang pertama. Kuota sangat terbatas!
            </p>
            <div
              style={{
                marginTop: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 18px",
                borderRadius: 20,
                backgroundColor: "#FEF3C7",
                color: "#B45309",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              ⭐ Jangan Lewatkan Kesempatan Emas Ini!
            </div>
          </div>

          {/* Subtitles (Y: 1340) */}
          {renderSubtitleBar(s4Words, 1340)}
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENE 5: OUTRO & CALL TO ACTION RESMI (740 - 900)                   */}
      {/* =================================================================== */}
      {frame >= 740 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${interpolate(s5Spring, [0, 1], [0.92, 1])})`,
            opacity: s5Spring,
          }}
        >
          {/* Logo & Headline (Y: 150 - 480) */}
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
                width: 120,
                height: 120,
                margin: "0 auto 14px auto",
                borderRadius: 32,
                backgroundColor: "#FFFFFF",
                padding: 14,
                boxShadow:
                  "0 20px 45px rgba(22, 101, 52, 0.16), 0 4px 14px rgba(0,0,0,0.06)",
                border: "2.5px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("ppdb/logo_1x1.png")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 99,
                backgroundColor: "#DCFCE7",
                color: "#15803D",
                fontSize: 18,
                fontWeight: 900,
                marginBottom: 10,
              }}
            >
              PENDAFTARAN RESMI DIBUKA
            </div>

            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#0F172A",
                lineHeight: 1.2,
                letterSpacing: -0.5,
              }}
            >
              Amankan Kursi Ananda
              <br />
              <span style={{ color: "#15803D" }}>Sekarang Juga!</span>
            </h1>
            <p
              style={{
                fontSize: 22,
                color: "#64748B",
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              Sekolah Alam & Pesantren Tahfidz Terpadu
            </p>
          </div>

          {/* Hero School Showcase Photo Frame (Y: 570 - 1140) */}
          <div
            style={{
              position: "absolute",
              top: 570,
              left: 70,
              right: 70,
              height: 570,
              borderRadius: 36,
              overflow: "hidden",
              border: "5px solid #FFFFFF",
              boxShadow: "0 22px 50px rgba(22, 101, 52, 0.14)",
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-8.webp")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "16px 22px",
                borderRadius: 24,
                fontSize: 20,
                fontWeight: 800,
                color: "#15803D",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              🏫 Kampus Asri & Nyaman • Lingkungan Islami
            </div>
          </div>

          {/* WhatsApp Button (Y: 1170 - 1380) */}
          <div
            style={{
              position: "absolute",
              top: 1170,
              left: 70,
              right: 70,
              textAlign: "center",
              transform: `scale(${pulseBtn})`,
            }}
          >
            <div
              style={{
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                borderRadius: 40,
                padding: "32px 36px",
                boxShadow:
                  "0 22px 50px rgba(37, 211, 102, 0.36), 0 6px 20px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                border: "4px solid #FFFFFF",
              }}
            >
              <svg
                style={{ width: 56, height: 56, fill: "#FFFFFF", flexShrink: 0 }}
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>

              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.92)",
                  }}
                >
                  WhatsApp PPDB (Ust. Alwan)
                </div>
                <div
                  style={{
                    fontSize: 46,
                    fontWeight: 900,
                    letterSpacing: 1,
                    lineHeight: 1.1,
                  }}
                >
                  0819-1586-5383
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 26,
                fontSize: 24,
                fontWeight: 800,
                color: "#15803D",
              }}
            >
              🌐 Kunjungi Website: <strong>smpannida.sch.id</strong>
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 18,
                color: "#64748B",
                fontWeight: 600,
              }}
            >
              Setu, Bekasi, Jawa Barat
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
