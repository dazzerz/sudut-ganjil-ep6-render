import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import subtitlesData from "../../../../../scratch/subtitles_ncek_invest.json";

export const NcekSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Cari cue aktif saat ini
  const currentCue = subtitlesData.find(
    (cue) => currentTime >= cue.start && currentTime <= cue.end + 0.3
  );

  if (!currentCue) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 220,
        left: 50,
        right: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.94)",
          border: "2px solid #38BDF8",
          boxShadow: "0 12px 35px rgba(0,0,0,0.7), 0 0 20px rgba(56, 189, 248, 0.3)",
          borderRadius: 20,
          padding: "16px 28px",
          maxWidth: 960,
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', 'Inter', sans-serif",
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.35,
            color: "#F8FAFC",
            margin: 0,
            letterSpacing: "0.02em",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {currentCue.text}
        </p>
      </div>
    </div>
  );
};