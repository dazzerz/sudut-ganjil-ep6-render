import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SpeedometerHUDProps {
  startFrame?: number;
  maxSpeed?: number;
}

export const SpeedometerHUD: React.FC<SpeedometerHUDProps> = ({
  startFrame = 0,
  maxSpeed = 1670,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Speed counter from 0 to 1670 with ease-out cubic
  const currentSpeed = Math.floor(
    interpolate(relFrame, [0, 45], [0, maxSpeed], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    })
  );

  // Arc progress (0 to 1)
  const arcProgress = interpolate(relFrame, [0, 45], [0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Entrance spring
  const scale = spring({
    frame: relFrame,
    fps,
    config: { stiffness: 120, damping: 14 },
  });

  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference - arcProgress * circumference;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(11, 19, 43, 0.85)",
        border: "1px solid rgba(0, 242, 254, 0.35)",
        borderRadius: 24,
        padding: "24px 32px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 242, 254, 0.15)",
        backdropFilter: "blur(16px)",
        transform: `scale(${scale})`,
        width: 440,
      }}
    >
      {/* Top Header Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#FF6B35",
            boxShadow: "0 0 10px #FF6B35",
          }}
        />
        <span
          style={{
            color: "#94A3B8",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          TELEMETRI ROTASI BUMI
        </span>
      </div>

      {/* Circular Gauge Graphic */}
      <div style={{ position: "relative", width: 250, height: 250 }}>
        <svg width="250" height="250" viewBox="0 0 250 250">
          {/* Background Track */}
          <circle
            cx="125"
            cy="125"
            r="110"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.15}
            strokeLinecap="round"
            transform="rotate(120 125 125)"
          />

          {/* Active Glowing Progress Arc */}
          <circle
            cx="125"
            cy="125"
            r="110"
            fill="none"
            stroke="url(#speedGrad)"
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(120 125 125)"
            filter="drop-shadow(0 0 8px #00F2FE)"
          />

          <defs>
            <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="70%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#FF2E54" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Readout */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: -1,
              fontFamily: "monospace",
              lineHeight: 1,
              textShadow: "0 0 20px rgba(0, 242, 254, 0.5)",
            }}
          >
            {currentSpeed.toLocaleString("id-ID")}
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#00F2FE",
              letterSpacing: 2,
              marginTop: 4,
            }}
          >
            KM / JAM
          </span>
        </div>
      </div>

      {/* Bottom Sub-Metrics */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 18,
          paddingTop: 14,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#94A3B8", fontSize: 11, fontWeight: 700 }}>
            KECEPATAN DETIK
          </div>
          <div
            style={{
              color: "#FF6B35",
              fontSize: 15,
              fontWeight: 900,
              fontFamily: "monospace",
            }}
          >
            465 M / DETIK
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#94A3B8", fontSize: 11, fontWeight: 700 }}>
            STATUS FISIKA
          </div>
          <div
            style={{
              color: "#10B981",
              fontSize: 15,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            SUPERSONIK (MACH 1.4)
          </div>
        </div>
      </div>
    </div>
  );
};
