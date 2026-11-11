/**
 * PROOF OF CONCEPT (POC) 4 DETIK: PRESENTER 2D BERHIJAB (USTADZAH NIDA)
 * Durasi: 4 Detik (120 Frame @ 30 FPS)
 * Format: 1080 x 1920 Vertikal (9:16)
 * Fitur: Karakter Berjas Batik Resmi Annida & Logo, Lip-Sync Nyata, Kedip Alami, Gestur & Footage Gedung Asli.
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PresenterCharacter } from "./components/PresenterCharacter";

// 12 Kata Sinkronisasi Audio untuk 4 Detik Pertama (Frame 0 - 120)
const TIMED_WORDS_POC = [
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
  { word: "buah", startFrame: 117, endFrame: 120 },
];

const BOKEH_PARTICLES_POC = [
  { id: 1, x: 120, yBase: 1600, speed: 1.6, size: 14, phase: 0.2 },
  { id: 2, x: 280, yBase: 1200, speed: 2.0, size: 22, phase: 1.8 },
  { id: 3, x: 740, yBase: 1700, speed: 1.4, size: 18, phase: 3.4 },
  { id: 4, x: 880, yBase: 1350, speed: 2.2, size: 12, phase: 4.6 },
  { id: 5, x: 220, yBase: 1850, speed: 1.8, size: 26, phase: 2.2 },
  { id: 6, x: 500, yBase: 1500, speed: 1.5, size: 16, phase: 5.3 },
];

export const PPDBSMPAnnidaPOC: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Progress Bar 4 Detik
  const progressPercent = (frame / durationInFrames) * 100;

  // Background Slow Push-in
  const bgScale = interpolate(frame, [0, 120], [1.02, 1.10], {
    extrapolateRight: "clamp",
  });

  // Fade In Halus di Pembuka (0 - 10 frame)
  const masterOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // BGM Ducking: Volume tenang agar suara ElevenLabs terdengar sangat jernih
  const bgmVol = interpolate(frame, [0, 15], [0.26, 0.16], {
    extrapolateRight: "clamp",
  });

  // Presenter Entrance (Slide masuk anggun dari kanan bawah)
  const presenterX = interpolate(frame, [0, 25], [120, 0], {
    extrapolateRight: "clamp",
  });
  const presenterOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#04120C",
        opacity: masterOpacity,
        overflow: "hidden",
      }}
    >
      {/* ------------------------------------------------------------------- */}
      {/* 1. LATAR BELAKANG: GEDUNG ASLI SEKOLAH DENGAN CINEMATIC PUSH        */}
      {/* ------------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `scale(${bgScale})`,
          transformOrigin: "center 40%",
        }}
      >
        <Img
          src={staticFile("ppdb/gedung_sekolah.webp")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Cinematic Gradient Vignette: Memperjelas Teks dan Gedung */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(4, 18, 12, 0.92) 0%, rgba(4, 18, 12, 0.35) 40%, rgba(4, 18, 12, 0.75) 75%, rgba(4, 18, 12, 0.98) 100%)",
        }}
      />

      {/* ------------------------------------------------------------------- */}
      {/* 2. AMBIENT GOLDEN BOKEH (Partikel Emas Melayang)                    */}
      {/* ------------------------------------------------------------------- */}
      {BOKEH_PARTICLES_POC.map((p) => {
        const currentY =
          ((p.yBase - frame * p.speed * 4) % 2100 + 2100) % 2100 - 100;
        const swayX = Math.sin(frame * 0.04 + p.phase) * 20;
        const particleOpacity =
          0.2 + Math.sin(frame * 0.06 + p.phase) * 0.15;

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
              zIndex: 30,
            }}
          />
        );
      })}

      {/* ------------------------------------------------------------------- */}
      {/* 3. TOP BADGE & HEADLINE                                             */}
      {/* ------------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 60,
          right: 60,
          textAlign: "center",
          zIndex: 40,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 28px",
            borderRadius: 30,
            backgroundColor: "rgba(13, 77, 52, 0.88)",
            border: "1px solid rgba(251, 191, 36, 0.6)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.6)",
            marginBottom: 24,
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

        <div
          style={{
            color: "#6EE7B7",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 10,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          Untuk Ayah & Bunda
        </div>
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: 64,
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

      {/* ------------------------------------------------------------------- */}
      {/* 4. SUBTITLE DINAMIS (Kiri Bawah - Lebar 480px Bebas Overlap)        */}
      {/* ------------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 60,
          width: 480,
          padding: "22px 26px",
          borderRadius: 24,
          backgroundColor: "rgba(6, 26, 18, 0.92)",
          border: "1px solid rgba(52, 211, 153, 0.4)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.75)",
          zIndex: 40,
        }}
      >
        <div
          style={{
            fontSize: 27,
            lineHeight: 1.5,
            color: "#E2E8F0",
          }}
        >
          {TIMED_WORDS_POC.map((tw, i) => {
            const isActive = frame >= tw.startFrame && frame <= tw.endFrame;
            return (
              <span
                key={i}
                style={{
                  fontWeight: isActive ? 900 : 700,
                  color: isActive ? "#FBBF24" : "#E2E8F0",
                  textShadow: isActive
                    ? "0 0 14px rgba(251, 191, 36, 0.8)"
                    : "none",
                  display: "inline-block",
                  marginRight: 9,
                  transform: isActive ? "scale(1.05)" : "scale(1.0)",
                  transformOrigin: "center bottom",
                }}
              >
                {tw.word}
              </span>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 14,
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            color: "#34D399",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 1.2,
          }}
        >
          SMP ANNIDA 2 SETU • BEKASI
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 5. KARAKTER PRESENTER 2D BERHIJAB (USTADZAH NIDA)                  */}
      {/* Skala Proporsional 0.68x: Tampak Megah, Leluasa & Bebas Tabrakan    */}
      {/* ------------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          right: -15 + presenterX,
          opacity: presenterOpacity,
          zIndex: 50,
        }}
      >
        <PresenterCharacter
          scale={0.68}
          gesture="presenting"
        />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 6. TOP RETENTION PROGRESS BAR (0 - 100% Selama 4 Detik)             */}
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
      {/* 7. AUDIO TRACKS: ELEVENLABS + BGM + SFX                             */}
      {/* ------------------------------------------------------------------- */}
      {/* Suara Narasi ElevenLabs (Dimulai di Frame 15) */}
      <Sequence from={15} durationInFrames={105}>
        <Audio
          src={staticFile("audio/ppdb_voiceover_30s.mp3")}
          volume={1.0}
        />
      </Sequence>

      {/* Musik Latar Sinematik */}
      <Audio
        src={staticFile("audio/ppdb_bgm_rich_30s.mp3")}
        volume={bgmVol}
      />

      {/* SFX Transisi Pembuka */}
      <Sequence from={0} durationInFrames={18}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.45} />
      </Sequence>
      <Sequence from={18} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.4} />
      </Sequence>
    </AbsoluteFill>
  );
};
