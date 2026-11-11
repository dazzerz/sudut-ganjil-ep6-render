import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  countdown: number; // 5.0 down to 0.0
  isHalt: boolean;
}

export const LungsCutawayScene: React.FC<Props> = ({ countdown, isHalt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Breathing motion: slow inhale & exhale
  const breathCycle = Math.sin(frame * 0.08);
  const lungScale = isHalt
    ? interpolate(frame, [162, 220], [1.05, 0.88], { extrapolateRight: "clamp" })
    : 1 + breathCycle * 0.06;

  // Oxygen particles flowing down trachea into lungs
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: 540 + (Math.sin(i * 1.5) * 60),
      speed: 4 + (i % 3) * 2,
      size: 10 + (i % 4) * 4,
      offset: i * 25,
    }));
  }, []);

  // Camera drift
  const camZoom = interpolate(frame, [0, 180], [1.0, 1.1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0B132B",
        background: isHalt
          ? "radial-gradient(circle at 50% 50%, #2D0C15 0%, #17050A 60%, #080104 100%)"
          : "radial-gradient(circle at 50% 50%, #1C2541 0%, #0B132B 65%, #050814 100%)",
        transition: "background 0.3s ease",
        transform: `scale(${camZoom})`,
      }}
    >
      {/* Full-bleed Technical Grid & Crosshairs */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern id="gridPattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <line x1="0" y1="50" x2="100" y2="50" stroke="#00E5FF" strokeWidth="0.8" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#00E5FF" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="2" fill="#00E5FF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>

      {/* Full-Screen Anatomical Cutaway (Body Silhouette + Respiratory System) */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Human Torso Silhouette Outline */}
        <path
          d="M 540 320 C 440 320, 380 400, 380 500 C 380 620, 240 680, 180 820 C 140 920, 160 1400, 220 1800 L 860 1800 C 920 1400, 940 920, 900 820 C 840 680, 700 620, 700 500 C 700 400, 640 320, 540 320 Z"
          fill="none"
          stroke={isHalt ? "rgba(255, 23, 68, 0.4)" : "rgba(0, 229, 255, 0.35)"}
          strokeWidth="4"
          strokeDasharray="8 6"
        />

        {/* Trachea (Tenggorokan) */}
        <path
          d="M 540 500 L 540 760"
          stroke={isHalt ? "#FF5252" : "#38BDF8"}
          strokeWidth="36"
          strokeLinecap="round"
          fill="none"
          style={{
            filter: isHalt
              ? "drop-shadow(0 0 15px rgba(255, 23, 68, 0.8))"
              : "drop-shadow(0 0 15px rgba(56, 189, 248, 0.8))",
          }}
        />

        {/* Trachea Rings */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="520"
            y1={520 + i * 30}
            x2="560"
            y2={520 + i * 30}
            stroke="#FFFFFF"
            strokeWidth="3"
            opacity={0.7}
          />
        ))}

        {/* Bronchial Fork */}
        <path
          d="M 540 760 Q 480 820 420 880 M 540 760 Q 600 820 660 880"
          stroke={isHalt ? "#FF5252" : "#38BDF8"}
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Lung (Lobus Paru Kiri) */}
        <g
          style={{
            transformOrigin: "400px 980px",
            transform: `scale(${lungScale})`,
            transition: "transform 0.1s ease",
          }}
        >
          <path
            d="M 510 820 C 440 780, 280 820, 260 980 C 240 1140, 300 1280, 480 1260 C 510 1260, 520 1050, 510 820 Z"
            fill={
              isHalt
                ? "url(#lungHaltGradient)"
                : "url(#lungOxygenGradient)"
            }
            stroke={isHalt ? "#FF1744" : "#00E5FF"}
            strokeWidth="6"
            style={{
              filter: isHalt
                ? "drop-shadow(0 0 25px rgba(255, 23, 68, 0.6))"
                : "drop-shadow(0 0 35px rgba(0, 229, 255, 0.5))",
            }}
          />
          {/* Internal Bronchial Tree Left */}
          <path
            d="M 430 890 Q 360 960 320 1060 M 430 890 Q 400 1020 380 1150 M 360 960 Q 300 1000 280 1080"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity={0.6}
          />
        </g>

        {/* Right Lung (Lobus Paru Kanan) */}
        <g
          style={{
            transformOrigin: "680px 980px",
            transform: `scale(${lungScale})`,
            transition: "transform 0.1s ease",
          }}
        >
          <path
            d="M 570 820 C 640 780, 800 820, 820 980 C 840 1140, 780 1280, 600 1260 C 570 1260, 560 1050, 570 820 Z"
            fill={
              isHalt
                ? "url(#lungHaltGradient)"
                : "url(#lungOxygenGradient)"
            }
            stroke={isHalt ? "#FF1744" : "#00E5FF"}
            strokeWidth="6"
            style={{
              filter: isHalt
                ? "drop-shadow(0 0 25px rgba(255, 23, 68, 0.6))"
                : "drop-shadow(0 0 35px rgba(0, 229, 255, 0.5))",
            }}
          />
          {/* Internal Bronchial Tree Right */}
          <path
            d="M 650 890 Q 720 960 760 1060 M 650 890 Q 680 1020 700 1150 M 720 960 Q 780 1000 800 1080"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity={0.6}
          />
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="lungOxygenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="lungHaltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1744" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#991B1B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Flowing Oxygen Particles (O2) */}
      {!isHalt &&
        particles.map((p) => {
          const y = ((frame * p.speed * 3 + p.offset) % 650) + 520;
          const spreadX =
            y > 760 ? (p.id % 2 === 0 ? p.x - (y - 760) * 0.8 : p.x + (y - 760) * 0.8) : p.x;
          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: spreadX,
                top: y,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: "#00E5FF",
                boxShadow: "0 0 16px #00E5FF, 0 0 30px #38BDF8",
                pointerEvents: "none",
                opacity: 0.9,
              }}
            />
          );
        })}

      {/* Full-bleed Technical Telemetry Lines directly on canvas (NO BOXES) */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 70,
          right: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "2px solid rgba(0, 229, 255, 0.4)",
          paddingBottom: 14,
        }}
      >
        <div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#00E5FF", letterSpacing: 3 }}>
            FAKTA MASUK AKAL // SIMULASI 01
          </div>
          <div style={{ fontSize: 16, color: "rgba(255, 255, 255, 0.7)", marginTop: 4 }}>
            SISTEM RESPIRASI & ATMOSFER MANUSIA
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 16, color: isHalt ? "#FF5252" : "#38BDF8", fontWeight: 800 }}>
            {isHalt ? "STATUS: PASOKAN HILANG!" : "STATUS: NORMAL O₂ INTAKE"}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              fontFamily: "monospace",
              color: isHalt ? "#FF1744" : "#FFFFFF",
              lineHeight: 1,
              textShadow: isHalt ? "0 0 20px #FF1744" : "0 0 20px #00E5FF",
            }}
          >
            {countdown.toFixed(1)}s
          </div>
        </div>
      </div>

      {/* Dramatic Center Headline Direct on Canvas (NO BOXES) */}
      {isHalt && (
        <div
          style={{
            position: "absolute",
            top: 720,
            left: 60,
            right: 60,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              color: "#FF1744",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', system-ui, sans-serif",
              letterSpacing: 2,
              textShadow: "0 0 40px rgba(255, 23, 68, 0.9), 0 4px 20px #000000",
              lineHeight: 1,
            }}
          >
            SALAH BESAR!
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: "#FFFFFF",
              marginTop: 18,
              textShadow: "0 4px 16px #000000",
            }}
          >
            Bukan Cuma Sekadar Tahan Napas!
          </div>
        </div>
      )}
    </div>
  );
};
