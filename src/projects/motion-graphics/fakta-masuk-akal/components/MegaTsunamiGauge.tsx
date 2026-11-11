import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface TsunamiProps {
  startFrame?: number;
}

export const MegaTsunamiGauge: React.FC<TsunamiProps> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Wave rising height from 0 to 100%
  const waveHeightPercent = interpolate(relFrame, [0, 40], [10, 85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated water meter in meters: 0 to 1200m
  const currentMeters = Math.floor(
    interpolate(relFrame, [0, 45], [50, 1250], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Continuous wave undulating crest
  const waveWiggle1 = Math.sin(relFrame * 0.2) * 15;
  const waveWiggle2 = Math.cos(relFrame * 0.25) * 12;

  // Supersonic wind streaks across the top
  const windOffset = (relFrame * 35) % 800;

  const cardScale = spring({
    frame: relFrame,
    fps,
    config: { stiffness: 120, damping: 14 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: 720,
        backgroundColor: "rgba(10, 20, 40, 0.9)",
        border: "2px solid #00F2FE",
        borderRadius: 24,
        padding: "26px",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 242, 254, 0.2)",
        backdropFilter: "blur(20px)",
        transform: `scale(${cardScale})`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🌊</span>
          <div>
            <div style={{ color: "#00F2FE", fontSize: 13, fontWeight: 900, letterSpacing: 2 }}>
              SIMULASI HIDRODINAMIKA
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900 }}>
              Mega Tsunami & Badai Supersonik
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(0, 242, 254, 0.15)",
            border: "1px solid #00F2FE",
            borderRadius: 12,
            padding: "6px 14px",
            color: "#00F2FE",
            fontWeight: 900,
            fontSize: 14,
            fontFamily: "monospace",
          }}
        >
          MAKSIMAL: 1.250 M
        </div>
      </div>

      {/* Visual Tsunami Elevation Tank Graphic */}
      <div
        style={{
          position: "relative",
          height: 220,
          backgroundColor: "#060D1E",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Supersonic Wind Streaks */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            right: 0,
            height: 40,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, #00F2FE 50%, transparent 100%)",
              transform: `translateX(${windOffset - 400}px)`,
            }}
          />
          <div
            style={{
              height: 1.5,
              background:
                "linear-gradient(90deg, transparent 0%, #38BDF8 60%, transparent 100%)",
              transform: `translateX(${windOffset * 1.3 - 400}px)`,
            }}
          />
        </div>

        {/* The Rising Giant Wave (SVG with dynamic wave curve) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: `${waveHeightPercent}%`,
            transition: "height 0.1s linear",
          }}
        >
          <svg
            viewBox="0 0 700 200"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#0284C7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#032B56" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Wave Body */}
            <path
              d={`M 0 200 L 0 50 Q 180 ${40 + waveWiggle1} 350 ${50 + waveWiggle2} T 700 45 L 700 200 Z`}
              fill="url(#waveGrad)"
            />
            {/* White Water Foam Crest */}
            <path
              d={`M 0 50 Q 180 ${40 + waveWiggle1} 350 ${50 + waveWiggle2} T 700 45`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              filter="drop-shadow(0 0 10px #FFFFFF)"
            />
          </svg>
        </div>

        {/* Real-time Altitude Height Readout Tag */}
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            border: "1px solid #00F2FE",
            borderRadius: 10,
            padding: "8px 16px",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#94A3B8", fontSize: 11, fontWeight: 700 }}>
            TINGGI GELOMBANG AIR
          </div>
          <div
            style={{
              color: "#00F2FE",
              fontSize: 24,
              fontWeight: 900,
              fontFamily: "monospace",
            }}
          >
            {currentMeters} Meter
          </div>
        </div>

        {/* Burj Khalifa Comparison Bar */}
        <div
          style={{
            position: "absolute",
            left: 24,
            bottom: 16,
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 12,
            fontWeight: 800,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          🏢 Lebih tinggi dari Gedung Burj Khalifa (828m)
        </div>
      </div>
    </div>
  );
};
