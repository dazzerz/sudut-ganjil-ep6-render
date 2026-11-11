import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  countdownSeconds: number; // e.g. 5, 4, 3, 2, 1, 0
  pressureKPa: number; // e.g. 101.3 down to 80.0
  isAlarm?: boolean;
}

export const CountdownDial: React.FC<Props> = ({
  countdownSeconds,
  pressureKPa,
  isAlarm = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dialSpring = spring({
    frame,
    fps,
    config: { stiffness: 140, damping: 14 },
  });

  const rotation = (frame * 1.5) % 360;
  const pulse = 1 + Math.sin(frame * 0.15) * (isAlarm ? 0.06 : 0.02);

  // Pressure progress percentage (101.3 kPa = 100%, 80.0 kPa = 0%)
  const pressurePercent = Math.max(
    0,
    Math.min(100, ((pressureKPa - 80) / (101.3 - 80)) * 100)
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${dialSpring * pulse})`,
      }}
    >
      {/* Outer Circular High-Tech HUD */}
      <div
        style={{
          position: "relative",
          width: 440,
          height: 440,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="440"
          height="440"
          viewBox="0 0 440 440"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* Background circle track */}
          <circle
            cx="220"
            cy="220"
            r="190"
            fill="rgba(255, 255, 255, 0.85)"
            stroke={isAlarm ? "rgba(255, 23, 68, 0.3)" : "rgba(0, 188, 212, 0.25)"}
            strokeWidth="16"
          />

          {/* Animated Pressure / Countdown Arc */}
          <circle
            cx="220"
            cy="220"
            r="190"
            fill="none"
            stroke={isAlarm ? "#FF1744" : "#00BCD4"}
            strokeWidth="16"
            strokeDasharray="1194"
            strokeDashoffset={1194 * (1 - pressurePercent / 100)}
            strokeLinecap="round"
            style={{
              transformOrigin: "center",
              transform: "rotate(-90deg)",
              filter: isAlarm
                ? "drop-shadow(0 0 10px rgba(255, 23, 68, 0.8))"
                : "drop-shadow(0 0 10px rgba(0, 188, 212, 0.8))",
            }}
          />

          {/* Rotating dashed ring */}
          <circle
            cx="220"
            cy="220"
            r="165"
            fill="none"
            stroke={isAlarm ? "rgba(255, 82, 82, 0.4)" : "rgba(2, 136, 209, 0.35)"}
            strokeWidth="3"
            strokeDasharray="12 10"
            style={{
              transformOrigin: "center",
              transform: `rotate(${rotation}deg)`,
            }}
          />
        </svg>

        {/* Inner Card Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          {/* Header Label */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              color: isAlarm ? "#D50000" : "#00838F",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {isAlarm ? "⚠️ OKSIGEN HILANG" : "SIMULASI 5 DETIK"}
          </div>

          {/* Giant Countdown Number */}
          <div
            style={{
              fontSize: 108,
              fontWeight: 900,
              lineHeight: 0.95,
              color: isAlarm ? "#B71C1C" : "#0F172A",
              fontFamily: "'Montserrat', system-ui, sans-serif",
              letterSpacing: -2,
              textShadow: isAlarm
                ? "0 4px 20px rgba(255, 23, 68, 0.3)"
                : "0 4px 16px rgba(0, 188, 212, 0.2)",
            }}
          >
            {countdownSeconds.toFixed(1)}s
          </div>

          {/* Subtitle Badge */}
          <div
            style={{
              marginTop: 12,
              padding: "6px 18px",
              borderRadius: 20,
              backgroundColor: isAlarm ? "#FFEBEE" : "#E0F7FA",
              border: `2px solid ${isAlarm ? "#FFCDD2" : "#B2EBF2"}`,
              color: isAlarm ? "#C62828" : "#006064",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 0.5,
            }}
          >
            {isAlarm ? "FASE DEKONDENSASI" : "KONDISI NORMAL"}
          </div>
        </div>
      </div>

      {/* Barometric Pressure Floating Gauge */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: "#FFFFFF",
          padding: "12px 28px",
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          border: "2px solid #E2E8F0",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: isAlarm ? "#FF1744" : "#00E676",
            boxShadow: `0 0 10px ${isAlarm ? "#FF1744" : "#00E676"}`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#64748B" }}>
            Tekanan Barometrik Udara:
          </span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: isAlarm ? "#B71C1C" : "#0F172A",
            }}
          >
            {pressureKPa.toFixed(1)} kPa{" "}
            {pressureKPa < 100 && (
              <span style={{ color: "#E53935", fontSize: 20 }}>(-21% Turun)</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
