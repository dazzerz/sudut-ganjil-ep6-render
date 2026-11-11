import React from "react";
import {
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
  Audio,
  Sequence,
  Easing,
} from "remotion";
import { CinematicSubtitle } from "./components/CinematicSubtitle";
import { VignetteOverlay } from "./components/VignetteOverlay";

export const Shot3BoardroomWaiting: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow cinematic push-in towards the clock & sunlit conference table
  const scale = interpolate(frame, [0, 450], [1.0, 1.065], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const translateY = interpolate(frame, [0, 450], [0, -15], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Crossfade in at start, crossfade out at end
  const sceneOpacity = interpolate(
    frame,
    [0, 20, 420, 450],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Time ticker: advancing from 08:56:40 to 09:02:15
  const secondCounter = Math.floor(frame * 0.7);
  const minutes = 56 + Math.floor(secondCounter / 60);
  const displayMin = String(minutes % 60).padStart(2, "0");
  const displaySec = String(secondCounter % 60).padStart(2, "0");

  // Rotating clock hand for analog radar
  const clockAngle = (frame * 3) % 360;

  // Pulse effect for disconnected nodes
  const pulse = Math.sin((frame / 12) * Math.PI) * 0.2 + 0.8;

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#060911",
        overflow: "hidden",
        opacity: sceneOpacity,
      }}
    >
      {/* Background B-roll Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("images/jarvis/shot3_boardroom_clock.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.82) contrast(1.12)",
          }}
        />
      </div>

      <VignetteOverlay intensity={0.55} letterbox />

      {/* Voiceover Audio (Shot 3: Keputusan yang butuh kecepatan - tertahan karena informasi ada di tempat yang berbeda) */}
      <Sequence from={40}>
        <Audio
          src={staticFile("audio/jarvis/shot3_vo.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Corporate Context HUD Stamp (Top Left) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 90,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#f59e0b",
            boxShadow: "0 0 12px #f59e0b",
          }}
        />
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.75)",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          RUANG RAPAT DIREKSI • MENJELANG RAPAT STRATEGIS JAM 09:00
        </span>
      </div>

      {/* Urgent Executive Time HUD (Top Right) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 90,
          padding: "18px 24px",
          borderRadius: 16,
          background: "rgba(10, 15, 29, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(245, 158, 11, 0.35)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        {/* Analog Mini Dial */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "2px solid rgba(245, 158, 11, 0.5)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 2,
              height: 18,
              backgroundColor: "#f59e0b",
              top: 4,
              transformOrigin: "bottom center",
              transform: `rotate(${clockAngle}deg)`,
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#fbbf24",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Waktu Tersisa Menuju Rapat
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 26,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.05em",
            }}
          >
            08:{displayMin}:{displaySec}{" "}
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              WIB
            </span>
          </div>
        </div>
      </div>

      {/* Disconnected Data Silos Visualization HUD (Center Left) */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 90,
          width: 480,
          padding: "26px 30px",
          borderRadius: 20,
          background: "rgba(10, 16, 31, 0.82)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)",
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.14em",
            color: "#ef4444",
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "inline-block",
            }}
          />
          FRAGMEN DATA TERISOLASI (DATA SILOS)
        </div>

        {/* 3 Siloed Systems with Broken Connection */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Silo 1 */}
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>🏢</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>
                  Sistem ERP / SAP
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  Status PO & Nilai Tagihan
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#ef4444",
                opacity: pulse,
              }}
            >
              ✖ Belum Tersinkron
            </span>
          </div>

          {/* Broken Link Dotted Line */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              color: "rgba(239, 68, 68, 0.6)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span>- - - - - [ Terputus: Perlu Telepon Logistik ] - - - - -</span>
          </div>

          {/* Silo 2 */}
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>📦</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>
                  WMS Gudang & Logistik
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  Lokasi Fisik & ETA Pengiriman
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#f59e0b",
                opacity: pulse,
              }}
            >
              ⚠ Update Tertunda
            </span>
          </div>

          {/* Broken Link Dotted Line */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              color: "rgba(239, 68, 68, 0.6)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span>- - - - - [ Terputus: Menunggu Email Balasan ] - - - - -</span>
          </div>

          {/* Silo 3 */}
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>📁</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>
                  Spreadsheet Cabang & Chat
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  Catatan Lapangan FSS & RS
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#ef4444",
                opacity: pulse,
              }}
            >
              ✖ Tercecer
            </span>
          </div>
        </div>
      </div>

      {/* Cinematic Voiceover Subtitle */}
      <CinematicSubtitle
        text="Keputusan yang butuh kecepatan — tertahan karena informasi ada di tempat yang berbeda."
        startFrame={40}
        durationFrames={210}
        highlightWords={["kecepatan", "tertahan", "berbeda."]}
        highlightColor="#38bdf8"
        fontSize={46}
        bottomPosition={130}
      />
    </div>
  );
};
