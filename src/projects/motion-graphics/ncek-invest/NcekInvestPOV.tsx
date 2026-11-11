import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NcekBackground } from "./components/NcekBackground";
import { NcekCharacter } from "./components/NcekCharacter";
import { NcekInfoCard } from "./components/NcekInfoCard";
import { NcekSubtitles } from "./components/NcekSubtitles";

export const NcekInvestPOV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kamera subtle push in
  const cameraScale = interpolate(frame, [0, 1650], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        overflow: "hidden",
      }}
    >
      {/* 1. Background Lingkungan Teras Kosan Khas Indonesia */}
      <NcekBackground scene={1} />

      {/* 2. Karakter Utama Ncek Invest (Kaos Oblong, Kacamata, Santai di Teras) */}
      <div
        style={{
          position: "absolute",
          bottom: 260,
          left: 60,
          zIndex: 30,
        }}
      >
        <NcekCharacter scale={1.25} expression="chill" />
      </div>

      {/* 3. Balon Pikiran / Komentar Tetangga (Muncul di Frame 120 - 390) */}
      {frame >= 120 && frame <= 400 && (
        <div
          style={{
            position: "absolute",
            top: 520,
            right: 70,
            backgroundColor: "#FFFFFF",
            border: "3px solid #1E293B",
            borderRadius: 24,
            padding: "16px 22px",
            maxWidth: 380,
            boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
            zIndex: 35,
            animation: "pulse 2s infinite",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: "#EF4444", marginBottom: 4 }}>
            🗣️ BISIK-BISIK TETANGGA:
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", lineHeight: 1.3 }}>
            "Kasihan ya, sarjana kok cuma nganggur di rumah..."
          </div>
        </div>
      )}

      {/* 4. Notifikasi Gaji Dollar Masuk (Muncul di Frame 680 - 950) */}
      {frame >= 680 && frame <= 980 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            right: 70,
            backgroundColor: "#022C22",
            border: "2px solid #10B981",
            borderRadius: 20,
            padding: "16px 22px",
            maxWidth: 420,
            boxShadow: "0 15px 35px rgba(16,185,129,0.3)",
            zIndex: 35,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10B981" }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: "#34D399", letterSpacing: "0.05em" }}>
              TRANSFER WIRE RECEIVED
            </span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF" }}>
            +$2,250.00 USD
          </div>
          <div style={{ fontSize: 13, color: "#A7F3D0", marginTop: 4 }}>
            Klien: US Tech Startup (Remote)
          </div>
        </div>
      )}

      {/* 5. Header & Dynamic Infographic Card */}
      <NcekInfoCard />

      {/* 6. Subtitle Otomatis Dialog */}
      <NcekSubtitles />

      {/* 7. Audio Voiceover Utama */}
      <Audio src={staticFile("audio/ncek-invest/vo_ncek_invest.mp3")} />
    </AbsoluteFill>
  );
};