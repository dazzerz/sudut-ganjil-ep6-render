import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SpeedometerGauge160Props {
  progress: number; // 0 to 1
}

export const SpeedometerGauge160: React.FC<SpeedometerGauge160Props> = ({
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Current speed counter interpolated from 0 to 160
  const currentSpeed = Math.round(
    interpolate(progress, [0, 0.7, 1], [0, 160, 160], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Gauge dimensions
  const radius = 180;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  // Sweep across 240 degrees (leaving bottom 120 open)
  const arcLength = circumference * (240 / 360);
  const strokeDashoffset = arcLength * (1 - Math.min(1, progress));

  // Pulse effect once max speed is reached
  const pulse =
    progress >= 0.7
      ? Math.sin((frame * 2 * Math.PI) / 12) * 0.04
      : 0;

  // Scale spring
  const scaleSpring = spring({
    frame,
    fps,
    config: { stiffness: 180, damping: 14 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 720,
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scaleSpring + pulse})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 40,
        pointerEvents: "none",
        width: 600,
        height: 600,
      }}
    >
      {/* SVG Arc Gauge */}
      <svg
        width="460"
        height="460"
        viewBox="0 0 460 460"
        style={{
          transform: "rotate(150deg)", // Orient opening downward
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="85%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx="230"
          cy="230"
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />

        {/* Animated Progress Track */}
        <circle
          cx="230"
          cy="230"
          r={radius}
          fill="none"
          stroke="url(#speedGrad)"
          strokeWidth={strokeWidth + 4}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Ticks along circumference */}
        {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((val, i) => {
          const angle = 150 + (i / 8) * 240;
          const rad = (angle * Math.PI) / 180;
          const x1 = 230 + (radius - 22) * Math.cos(rad);
          const y1 = 230 + (radius - 22) * Math.sin(rad);
          const x2 = 230 + (radius - 8) * Math.cos(rad);
          const y2 = 230 + (radius - 8) * Math.sin(rad);
          return (
            <line
              key={val}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={val <= currentSpeed ? "#FACC15" : "rgba(255, 255, 255, 0.3)"}
              strokeWidth={val % 40 === 0 ? 3 : 1.5}
            />
          );
        })}
      </svg>

      {/* Center Numeric Telemetry Sitting Directly on Canvas */}
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#38BDF8",
            textTransform: "uppercase",
            textShadow: "0 0 16px rgba(56, 189, 248, 0.8), 0 2px 4px #000000",
            fontFamily: "system-ui, sans-serif",
            marginBottom: -8,
          }}
        >
          VELOCITY
        </span>

        {/* Massive Speed Number */}
        <span
          style={{
            fontSize: 140,
            fontWeight: 900,
            lineHeight: 1,
            color: currentSpeed >= 150 ? "#FACC15" : "#FFFFFF",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            textShadow:
              currentSpeed >= 150
                ? "0 0 35px rgba(250, 204, 21, 0.9), 0 6px 20px #000000"
                : "0 0 25px rgba(0, 242, 254, 0.7), 0 6px 20px #000000",
          }}
        >
          {currentSpeed}
        </span>

        <span
          style={{
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: 3,
            color: "#FFFFFF",
            textShadow: "0 4px 12px #000000",
            fontFamily: "system-ui, sans-serif",
            marginTop: -4,
          }}
        >
          KM / JAM
        </span>
      </div>

      {/* Bottom Telemetry Comparison Hairline */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 320,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)",
          }}
        />
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2,
            color: "#F8FAFC",
            textTransform: "uppercase",
            textShadow: "0 2px 8px #000000",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          SETARA ANGIN BADAI KATEGORI 2
        </span>
      </div>
    </div>
  );
};
