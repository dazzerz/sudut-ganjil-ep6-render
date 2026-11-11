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
 * PROJECT: KENALI KEUNGGULAN SMP ANNIDA 2 SETU (30 DETIK @ 30 FPS)
 * Edisi Revisi: Homey & Cheerful Motion Graphics (Anti-Kaku, Tanpa Karakter Kartun)
 */

const FLOWER_MOTES = [
  { id: 1, x: 140, yBase: 1750, speed: 1.2, size: 18, color: "#16A34A" },
  { id: 2, x: 260, yBase: 1350, speed: 1.6, size: 22, color: "#F59E0B" },
  { id: 3, x: 840, yBase: 1850, speed: 1.1, size: 24, color: "#22C55E" },
  { id: 4, x: 920, yBase: 1250, speed: 1.8, size: 16, color: "#FBBF24" },
  { id: 5, x: 180, yBase: 1950, speed: 1.4, size: 26, color: "#86EFAC" },
  { id: 6, x: 500, yBase: 1600, speed: 1.3, size: 20, color: "#F59E0B" },
  { id: 7, x: 740, yBase: 2050, speed: 1.5, size: 22, color: "#15803D" },
  { id: 8, x: 380, yBase: 1400, speed: 1.7, size: 14, color: "#FDE68A" },
  { id: 9, x: 690, yBase: 1750, speed: 1.3, size: 24, color: "#4ADE80" },
  { id: 10, x: 160, yBase: 1500, speed: 1.5, size: 18, color: "#F59E0B" },
];

export const KenaliKeunggulanSMPAnnida: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progressPercent = (frame / durationInFrames) * 100;

  const camScale = interpolate(frame, [0, 900], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  // Scene Timings & Springs
  const s1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const s1Exit = interpolate(frame, [140, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sproutScale = interpolate(s1Spring, [0, 1], [0.2, 1.0]);
  const sproutSway = Math.sin(frame * 0.1) * 6;

  const s2Frame = frame - 145;
  const s2Spring = spring({ frame: s2Frame, fps, config: { damping: 14, stiffness: 110 } });
  const s2Exit = interpolate(frame, [325, 335], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const s3Frame = frame - 330;
  const s3Spring = spring({ frame: s3Frame, fps, config: { damping: 14, stiffness: 110 } });
  const s3Exit = interpolate(frame, [505, 515], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const s4Frame = frame - 510;
  const s4Spring = spring({ frame: s4Frame, fps, config: { damping: 14, stiffness: 110 } });
  const s4Exit = interpolate(frame, [685, 695], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const node1Spring = spring({ frame: s4Frame - 10, fps, config: { damping: 13, stiffness: 120 } });
  const node2Spring = spring({ frame: s4Frame - 30, fps, config: { damping: 13, stiffness: 120 } });
  const node3Spring = spring({ frame: s4Frame - 50, fps, config: { damping: 13, stiffness: 120 } });

  const s5Frame = frame - 690;
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
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        volume={0.88}
      />
      <Sequence from={0} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={145} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={330} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={510} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={690} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx_chime.wav")} volume={0.5} />
      </Sequence>

      {/* AMBIENT BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 80% 15%, rgba(254, 243, 199, 0.85) 0%, rgba(250, 247, 242, 0.5) 55%, rgba(244, 239, 230, 0.95) 100%)",
        }}
      />
      <svg
        style={{
          position: "absolute",
          top: -120,
          right: -90,
          width: 600,
          height: 600,
          opacity: 0.2,
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
      {FLOWER_MOTES.map((m) => {
        const floatY = ((m.yBase - frame * m.speed) % 2100) + 100;
        const swayX = Math.sin(frame * 0.05 + m.id) * 16;
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
            backgroundColor: "#DCFCE7",
            color: "#15803D",
            padding: "8px 18px",
            borderRadius: 30,
            fontSize: 16,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: "1.5px solid rgba(22, 163, 74, 0.25)",
          }}
        >
          <span>🌱</span>
          <span>KEUNGGULAN SEKOLAH</span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SCENE 1: THE HOMEY HOOK (Frame 0 - 150)                             */}
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
          {/* Header Tag (Y: 140 - 340) */}
          <div
            style={{
              position: "absolute",
              top: 140,
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
                backgroundColor: "#FEF3C7",
                color: "#B45309",
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: 1,
                marginBottom: 12,
              }}
            >
              <span>✨</span>
              <span>REFLEKSI PENDIDIKAN</span>
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                lineHeight: 1.25,
                color: "#0F172A",
              }}
            >
              Memilih SMP Bukan
              <br />
              <span
                style={{
                  color: "#E11D48",
                  textDecoration: "line-through",
                  textDecorationColor: "#E11D48",
                  textDecorationThickness: "4px",
                  display: "inline-block",
                  marginRight: 10,
                }}
              >
                Cuma Soal Nilai!
              </span>
            </h1>
          </div>

          {/* Living Sprout Graphic (Y: 380 - 640) */}
          <div
            style={{
              position: "absolute",
              top: 380,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              transform: `scale(${sproutScale}) rotate(${sproutSway}deg)`,
              transformOrigin: "center bottom",
            }}
          >
            <div
              style={{
                width: 230,
                height: 230,
                borderRadius: "50%",
                backgroundColor: "#FEF3C7",
                border: "5px solid #F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 45px rgba(245, 158, 11, 0.25)",
              }}
            >
              <svg width="130" height="130" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22V12"
                  stroke="#16A34A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 12C12 7 7 4 3 6C3 11 7 14 12 12Z"
                  fill="#22C55E"
                  stroke="#15803D"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 9C13 5 18 3 21 5C21 10 17 12 12 9Z"
                  fill="#86EFAC"
                  stroke="#16A34A"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* Homey Message Card with Student Photo (Y: 660 - 1560) */}
          <div
            style={{
              position: "absolute",
              top: 660,
              left: 70,
              right: 70,
              backgroundColor: "#FFFFFF",
              borderRadius: 36,
              padding: "36px 32px",
              textAlign: "center",
              border: "3px solid #DCFCE7",
              boxShadow:
                "0 25px 60px rgba(22, 101, 52, 0.12), 0 8px 24px rgba(0,0,0,0.06)",
              transform: `translateY(${interpolate(s1Spring, [0, 1], [60, 0])}px)`,
              opacity: s1Spring,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#64748B",
                marginBottom: 10,
              }}
            >
              Melainkan tentang tempat di mana buah hati Anda...
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: "#15803D",
                lineHeight: 1.25,
              }}
            >
              Tumbuh Bahagia & Berkarakter Mulia! 🌱
            </div>

            {/* Photo preview snippet inside card */}
            <div
              style={{
                marginTop: 22,
                height: 480,
                borderRadius: 24,
                overflow: "hidden",
                border: "3px solid #F1F5F9",
              }}
            >
              <Img
                src={staticFile("ppdb/gedung_sekolah.webp")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                marginTop: 22,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 26px",
                borderRadius: 30,
                backgroundColor: "#DCFCE7",
                color: "#15803D",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              <span>🌿</span>
              <span>Selamat Datang di SMP Annida 2 Setu</span>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENE 2: PILAR 1 - SEKOLAH ALAM TERPADU (Frame 145 - 335)           */}
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
                padding: "8px 22px",
                borderRadius: 99,
                backgroundColor: "#DCFCE7",
                color: "#15803D",
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              <span>🌿</span>
              <span>KEUNGGULAN 01</span>
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              SEKOLAH ALAM TERPADU
            </h1>
            <p
              style={{
                fontSize: 22,
                color: "#16A34A",
                fontWeight: 800,
                marginTop: 6,
              }}
            >
              Belajar Nyata & Eksplorasi Bersama Alam
            </p>
          </div>

          {/* Real Photo (Y: 380 - 1080) */}
          <div
            style={{
              position: "absolute",
              top: 380,
              left: 70,
              right: 70,
              height: 700,
              borderRadius: 36,
              overflow: "hidden",
              border: "5px solid #FFFFFF",
              boxShadow:
                "0 24px 60px rgba(22, 101, 52, 0.14), 0 8px 20px rgba(0,0,0,0.06)",
              transform: `scale(${interpolate(s2Spring, [0, 1], [0.9, 1])})`,
              opacity: s2Spring,
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-1.webp")}
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
                bottom: 24,
                left: 24,
                right: 24,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
                padding: "18px 24px",
                borderRadius: 24,
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 900, color: "#15803D" }}>
                🍃 Ruang Terbuka Hijau & Sejuk
              </div>
              <div style={{ fontSize: 18, color: "#475569", fontWeight: 600, marginTop: 4 }}>
                Mengasah daya kritis, kepedulian lingkungan, dan kecerdasan naturalis
              </div>
            </div>
          </div>

          {/* 3 Cheerful Tags (Y: 1110 - 1360) */}
          <div
            style={{
              position: "absolute",
              top: 1110,
              left: 70,
              right: 70,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
            }}
          >
            {[
              { icon: "🔍", label: "Observasi Alam", desc: "Eksplorasi Lingkungan" },
              { icon: "💡", label: "Sains Terapan", desc: "Praktik Langsung" },
              { icon: "🎨", label: "Kreativitas Bebas", desc: "Tumbuh Mandiri" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 26,
                  padding: "22px 16px",
                  textAlign: "center",
                  border: "2px solid #DCFCE7",
                  boxShadow: "0 10px 24px rgba(22, 101, 52, 0.08)",
                  transform: `translateY(${interpolate(s2Spring, [0, 1], [30, 0])}px)`,
                  opacity: s2Spring,
                }}
              >
                <div style={{ fontSize: 38, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#15803D" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 14, color: "#64748B", fontWeight: 600, marginTop: 4 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Narrative Banner (Y: 1390 - 1560) */}
          <div
            style={{
              position: "absolute",
              top: 1390,
              left: 70,
              right: 70,
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              borderRadius: 28,
              padding: "22px 28px",
              textAlign: "center",
              border: "2px solid rgba(22, 163, 74, 0.2)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#15803D" }}>
              "Menjadikan setiap sudut alam sebagai ruang kelas yang menginspirasi."
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENE 3: PILAR 2 - PESANTREN TAHFIDZ (Frame 330 - 515)              */}
      {/* =================================================================== */}
      {frame >= 330 && frame < 520 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(s3Exit, [0, 1], [1, 0]),
            transform: `translateY(${interpolate(s3Exit, [0, 1], [0, -60])}px)`,
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
              transform: `translateY(${interpolate(s3Spring, [0, 1], [40, 0])}px)`,
              opacity: s3Spring,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 22px",
                borderRadius: 99,
                backgroundColor: "#FEF3C7",
                color: "#B45309",
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              <span>📖</span>
              <span>KEUNGGULAN 02</span>
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              PESANTREN TAHFIDZ
            </h1>
            <p
              style={{
                fontSize: 22,
                color: "#B45309",
                fontWeight: 800,
                marginTop: 6,
              }}
            >
              Dekap Al-Qur'an dengan Cinta & Adab Mulia
            </p>
          </div>

          {/* Real Photo (Y: 380 - 1080) */}
          <div
            style={{
              position: "absolute",
              top: 380,
              left: 70,
              right: 70,
              height: 700,
              borderRadius: 36,
              overflow: "hidden",
              border: "5px solid #FFFFFF",
              boxShadow:
                "0 24px 60px rgba(245, 158, 11, 0.16), 0 8px 20px rgba(0,0,0,0.06)",
              transform: `scale(${interpolate(s3Spring, [0, 1], [0.9, 1])})`,
              opacity: s3Spring,
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-4.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${interpolate(frame, [330, 515], [1.0, 1.08])})`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
                padding: "18px 24px",
                borderRadius: 24,
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 900, color: "#B45309" }}>
                ✨ Bimbingan Tahsin & Tahfidz Mutqin
              </div>
              <div style={{ fontSize: 18, color: "#475569", fontWeight: 600, marginTop: 4 }}>
                Metode hafalan menyenangkan, target terukur & pembiasaan ibadah harian
              </div>
            </div>
          </div>

          {/* 3 Cheerful Tags (Y: 1110 - 1360) */}
          <div
            style={{
              position: "absolute",
              top: 1110,
              left: 70,
              right: 70,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
            }}
          >
            {[
              { icon: "🎙️", label: "Tahsin Fasih", desc: "Makhraj & Tajwid" },
              { icon: "🕌", label: "Hafalan Mutqin", desc: "Target Terbimbing" },
              { icon: "🤝", label: "Adab Santri", desc: "Karakter Qurani" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 26,
                  padding: "22px 16px",
                  textAlign: "center",
                  border: "2px solid #FEF3C7",
                  boxShadow: "0 10px 24px rgba(245, 158, 11, 0.08)",
                  transform: `translateY(${interpolate(s3Spring, [0, 1], [30, 0])}px)`,
                  opacity: s3Spring,
                }}
              >
                <div style={{ fontSize: 38, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#B45309" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 14, color: "#64748B", fontWeight: 600, marginTop: 4 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Narrative Banner (Y: 1390 - 1560) */}
          <div
            style={{
              position: "absolute",
              top: 1390,
              left: 70,
              right: 70,
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              borderRadius: 28,
              padding: "22px 28px",
              textAlign: "center",
              border: "2px solid rgba(245, 158, 11, 0.25)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#B45309" }}>
              "Mencetak generasi penghafal Al-Qur'an yang cerdas dan rendah hati."
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENE 4: PILAR 3 - PENDIDIKAN HOLISTIK (Frame 510 - 695)            */}
      {/* =================================================================== */}
      {frame >= 510 && frame < 700 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(s4Exit, [0, 1], [1, 0]),
            transform: `translateY(${interpolate(s4Exit, [0, 1], [0, -60])}px)`,
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
              <span>🌟</span>
              <span>KURIKULUM TERPADU</span>
            </div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              3 PILAR PENDIDIKAN
            </h1>
            <p
              style={{
                fontSize: 22,
                color: "#16A34A",
                fontWeight: 800,
                marginTop: 6,
              }}
            >
              Mempersiapkan Generasi Unggul & Siap Masa Depan
            </p>
          </div>

          {/* 3 Staggered Triad Pillar Cards (Y: 340 - 960) */}
          <div
            style={{
              position: "absolute",
              top: 340,
              left: 70,
              right: 70,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {/* Pilar 1 */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 30,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 22,
                border: "3px solid #22C55E",
                boxShadow: "0 12px 30px rgba(34, 197, 94, 0.12)",
                transform: `translateX(${interpolate(node1Spring, [0, 1], [-60, 0])}px)`,
                opacity: node1Spring,
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 24,
                  backgroundColor: "#DCFCE7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  flexShrink: 0,
                }}
              >
                📚
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#15803D" }}>
                  1. ILMU AMALIYAH
                </div>
                <div style={{ fontSize: 17, color: "#64748B", fontWeight: 600, marginTop: 4 }}>
                  Kurikulum nasional berstandar tinggi yang aplikatif dan mudah dipahami
                </div>
              </div>
            </div>

            {/* Pilar 2 */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 30,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 22,
                border: "3px solid #F59E0B",
                boxShadow: "0 12px 30px rgba(245, 158, 11, 0.14)",
                transform: `translateX(${interpolate(node2Spring, [0, 1], [60, 0])}px)`,
                opacity: node2Spring,
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 24,
                  backgroundColor: "#FEF3C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  flexShrink: 0,
                }}
              >
                🤝
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#B45309" }}>
                  2. KARAKTER QURANI
                </div>
                <div style={{ fontSize: 17, color: "#64748B", fontWeight: 600, marginTop: 4 }}>
                  Penanaman kejujuran, disiplin, empati, dan kepedulian terhadap sesama
                </div>
              </div>
            </div>

            {/* Pilar 3 */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 30,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 22,
                border: "3px solid #0EA5E9",
                boxShadow: "0 12px 30px rgba(14, 165, 233, 0.14)",
                transform: `translateX(${interpolate(node3Spring, [0, 1], [-60, 0])}px)`,
                opacity: node3Spring,
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 24,
                  backgroundColor: "#E0F2FE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  flexShrink: 0,
                }}
              >
                🎯
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#0284C7" }}>
                  3. POTENSI DIRI MANDIRI
                </div>
                <div style={{ fontSize: 17, color: "#64748B", fontWeight: 600, marginTop: 4 }}>
                  Eksplorasi bakat seni, olahraga, panahan, sains, dan kepemimpinan santri
                </div>
              </div>
            </div>
          </div>

          {/* Photo Montage below (Y: 1000 - 1560) */}
          <div
            style={{
              position: "absolute",
              top: 1000,
              left: 70,
              right: 70,
              height: 540,
              borderRadius: 36,
              overflow: "hidden",
              border: "5px solid #FFFFFF",
              boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
            }}
          >
            <Img
              src={staticFile("ppdb/aktivitas-7.webp")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                right: 20,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "16px 20px",
                borderRadius: 22,
                fontSize: 18,
                fontWeight: 800,
                color: "#15803D",
              }}
            >
              🎯 Mengasah Prestasi & Bakat Santri Secara Optimal
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENE 5: GRAND FINALE & CALL TO ACTION (Frame 690 - 900)             */}
      {/* =================================================================== */}
      {frame >= 690 && (
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
              PPDB TAHUN AJARAN 2027/2028
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
              SMP ANNIDA 2 SETU
            </h1>
            <p
              style={{
                fontSize: 22,
                color: "#15803D",
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              Sekolah Alam & Pesantren Tahfidz Terpadu
            </p>
            <p
              style={{
                fontSize: 18,
                color: "#64748B",
                fontWeight: 600,
                marginTop: 6,
              }}
            >
              Rumah Kedua Tempat Buah Hati Bertumbuh Bahagia
            </p>
          </div>

          {/* School Photo Showcase Frame (Y: 570 - 1140) */}
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
              src={staticFile("ppdb/aktivitas-2.webp")}
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
              🌱 Santri Berakhlak Mulia & Mandiri
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
