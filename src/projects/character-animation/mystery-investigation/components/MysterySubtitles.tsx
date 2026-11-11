import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const MysterySubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Words sequence for demo
  // "KORBAN DITEMUKAN TERKUNCI DARI DALAM... TAPI BAGAIMANA BISA PELAKU KELUAR TANPA MENINGGALKAN JEJAK?!"
  const words = [
    { text: "KORBAN", highlight: false },
    { text: "DITEMUKAN", highlight: false },
    { text: "TERKUNCI", highlight: true },
    { text: "DARI", highlight: false },
    { text: "DALAM...", highlight: true },
    { text: "TAPI", highlight: false },
    { text: "BAGAIMANA", highlight: false },
    { text: "PELAKU", highlight: true },
    { text: "BISA", highlight: false },
    { text: "KELUAR?!", highlight: true },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 200,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Question / Hook Label */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          fontWeight: 800,
          color: "#FFE600",
          letterSpacing: "0.2em",
          marginBottom: 14,
          textShadow: "0 0 12px rgba(255, 230, 0, 0.8)",
        }}
      >
        ✦ TEKA-TEKI PART 1 ✦
      </span>

      {/* Main Kinetic Subtitle */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 12px",
          maxWidth: 920,
          textAlign: "center",
        }}
      >
        {words.map((word, idx) => {
          const isCurrentActive = idx === 2 || idx === 7;
          return (
            <span
              key={idx}
              style={{
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                fontSize: 38,
                fontWeight: 900,
                color: isCurrentActive
                  ? "#FFE600"
                  : word.highlight
                  ? "#00F0FF"
                  : "#FFFFFF",
                textShadow: isCurrentActive
                  ? "0 0 25px rgba(255, 230, 0, 0.9), 0 4px 18px rgba(0,0,0,0.95)"
                  : "0 4px 16px rgba(0,0,0,0.9)",
                letterSpacing: "0.02em",
                transform: isCurrentActive ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.1s ease",
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      {/* CTA Prompt */}
      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          padding: "6px 20px",
          borderRadius: 20,
          border: "1px solid rgba(0, 240, 255, 0.4)",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            color: "#00F0FF",
            letterSpacing: "0.06em",
          }}
        >
          TEMUKAN BUKTINYA & TEBAK DI KOMENTAR! 👇
        </span>
      </div>
    </div>
  );
};