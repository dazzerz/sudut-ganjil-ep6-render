import React from "react";
import { interpolate } from "remotion";

interface FilmOverlaysProps {
  frame: number;
}

export const FilmOverlays: React.FC<FilmOverlaysProps> = ({ frame }) => {
  // Blinking REC indicator
  const isRecVisible = Math.floor(frame / 15) % 2 === 0;

  // Floating bokeh particles
  const particle1Y = (frame * 1.5) % 1920;
  const particle2Y = (frame * 1.8 + 600) % 1920;
  const particle3Y = (frame * 1.2 + 1200) % 1920;

  // Subtle light leak pulse on beat
  const lightLeakOpacity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.12, 0.28]
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* 1. Camera Viewfinder Brackets */}
      {/* Top Left */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 60,
          width: 40,
          height: 40,
          borderTop: "3px solid rgba(255, 255, 255, 0.5)",
          borderLeft: "3px solid rgba(255, 255, 255, 0.5)",
        }}
      />
      {/* Top Right */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 60,
          width: 40,
          height: 40,
          borderTop: "3px solid rgba(255, 255, 255, 0.5)",
          borderRight: "3px solid rgba(255, 255, 255, 0.5)",
        }}
      />
      {/* Bottom Left */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          width: 40,
          height: 40,
          borderBottom: "3px solid rgba(255, 255, 255, 0.5)",
          borderLeft: "3px solid rgba(255, 255, 255, 0.5)",
        }}
      />
      {/* Bottom Right */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 60,
          width: 40,
          height: 40,
          borderBottom: "3px solid rgba(255, 255, 255, 0.5)",
          borderRight: "3px solid rgba(255, 255, 255, 0.5)",
        }}
      />

      {/* 2. Top Header HUD */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 120,
          right: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "rgba(255, 255, 255, 0.8)",
          fontFamily: "monospace",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 1.5,
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        {/* REC */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: isRecVisible ? "#FF3B30" : "transparent",
              boxShadow: isRecVisible ? "0 0 12px #FF3B30" : "none",
            }}
          />
          <span>REC</span>
          <span style={{ opacity: 0.6 }}>00:44:00</span>
        </div>

        {/* Location & Quality */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#FFDE59" }}>SPACE BEKASI // +62</span>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.4)",
              fontSize: 18,
            }}
          >
            4K 60FPS
          </span>
        </div>
      </div>

      {/* 3. Aesthetic Light Leak Prism (Top Left / Right) */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(136, 214, 108, 0.28) 0%, rgba(255, 222, 89, 0.15) 50%, transparent 70%)",
          filter: "blur(70px)",
          opacity: lightLeakOpacity,
        }}
      />

      {/* 4. Floating Bokeh Dust Particles */}
      <div
        style={{
          position: "absolute",
          top: particle1Y,
          left: 200,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFE082",
          filter: "blur(2px)",
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: particle2Y,
          right: 240,
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: "#88D66C",
          filter: "blur(3px)",
          opacity: 0.25,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: particle3Y,
          left: 480,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          filter: "blur(1px)",
          opacity: 0.4,
        }}
      />

      {/* 5. Center Rule of Thirds Crosshair */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 24,
          height: 24,
          pointerEvents: "none",
          opacity: 0.3,
        }}
      >
        <div style={{ position: "absolute", top: 11, left: 0, width: 24, height: 2, background: "#FFF" }} />
        <div style={{ position: "absolute", top: 0, left: 11, width: 2, height: 24, background: "#FFF" }} />
      </div>
    </div>
  );
};
