import React, { useMemo } from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  isStopTriggered: boolean;
}

export const AnimatedBathroomScene: React.FC<Props> = ({ isStopTriggered }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cinematic camera push-in
  const camScale = interpolate(frame, [0, 296], [1.0, 1.12], {
    extrapolateRight: "clamp",
  });
  const camY = interpolate(frame, [0, 296], [0, -30], {
    extrapolateRight: "clamp",
  });

  // Animated falling water droplets from shower
  const droplets = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: 480 + ((i * 29) % 180) - 90,
      speed: 24 + (i % 5) * 6,
      length: 20 + (i % 4) * 15,
      width: 2 + (i % 2),
      opacity: 0.35 + (i % 4) * 0.15,
      offset: i * 18,
    }));
  }, []);

  // Temperature drops from 26°C down to 18°C
  const temp = Math.round(
    interpolate(frame, [0, 140], [26, 18], {
      extrapolateRight: "clamp",
    })
  );

  // Stop badge spring animation
  const stopSpring = spring({
    frame: Math.max(0, frame - 149),
    fps,
    config: { stiffness: 260, damping: 15 },
  });

  // Stop shockwave ring
  const shockwaveScale = interpolate(frame - 149, [0, 25], [0.8, 2.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shockwaveOpacity = interpolate(frame - 149, [0, 25], [0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0B1120",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 3D RENDERED ENVIRONMENT PLATE (FULL-BLEED CINEMATIC)         */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          transform: `scale(${camScale}) translateY(${camY}px)`,
          filter: frame >= 149 ? "brightness(0.7) contrast(1.15)" : "brightness(0.9) contrast(1.1)",
        }}
      >
        <Img
          src={staticFile("images/fakta-mandi-malam/scene1_cold_bathroom.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Atmospheric Cold Blue Tint & Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0.6) 80%, rgba(2, 6, 23, 0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Dynamic Falling Water Droplets */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {droplets.map((d) => {
          const y = 380 + ((frame * d.speed + d.offset) % 1100);
          return (
            <line
              key={d.id}
              x1={d.x + 80}
              y1={y}
              x2={d.x + 80}
              y2={y + d.length}
              stroke="#BAE6FD"
              strokeWidth={d.width}
              strokeOpacity={d.opacity}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* ------------------------------------------------------------- */}
      {/* HIGH-TECH HUD THERMOMETER (COLD AIR MONITOR)                  */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 14,
          zIndex: 80,
          pointerEvents: "none",
        }}
      >
        {/* Neon Indicator Pill */}
        <div
          style={{
            width: 12,
            height: 120,
            borderRadius: 6,
            background: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(56, 189, 248, 0.6)",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            boxShadow: "0 0 15px rgba(14, 165, 233, 0.4)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: `${interpolate(temp, [18, 26], [35, 90])}%`,
              background: "linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)",
              borderRadius: 4,
              boxShadow: "0 0 10px #38BDF8",
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: "#38BDF8",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: 1,
              textShadow: "0 0 20px rgba(56, 189, 248, 0.8), 0 2px 8px rgba(0,0,0,0.9)",
              lineHeight: 1,
            }}
          >
            {temp}°C
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: "#BAE6FD",
              letterSpacing: 2,
              marginTop: 4,
              textTransform: "uppercase",
              textShadow: "0 2px 6px rgba(0,0,0,0.9)",
            }}
          >
            SUHU AIR MALAM
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TOP HEADLINE (DIRECT ON CANVAS, ZERO BOXES)                   */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 60,
          right: 60,
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#38BDF8",
            letterSpacing: 3,
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          FAKTA MASUK AKAL // MITOS POPULER
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            lineHeight: 1.1,
            marginTop: 6,
            textShadow:
              "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 30px rgba(2, 132, 199, 0.5)",
          }}
        >
          MANDI MALAM BIKIN REMATIK?
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GIANT 3D ANIMATED "STOP!" BADGE & SHOCKWAVE (f >= 149)        */}
      {/* ------------------------------------------------------------- */}
      {frame >= 149 && (
        <div
          style={{
            position: "absolute",
            top: 720,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 120,
            pointerEvents: "none",
          }}
        >
          {/* Expanding Shockwave Ring */}
          <div
            style={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              border: "6px solid #EF4444",
              transform: `scale(${shockwaveScale})`,
              opacity: shockwaveOpacity,
              boxShadow: "0 0 40px #EF4444",
            }}
          />

          {/* Main STOP Octagon Badge */}
          <div
            style={{
              width: 260,
              height: 260,
              borderRadius: "50%",
              backgroundColor: "#DC2626",
              border: "10px solid #FFFFFF",
              boxShadow: "0 25px 60px rgba(220, 38, 38, 0.8), 0 0 40px rgba(239, 68, 68, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: 76,
              fontWeight: 900,
              letterSpacing: 2,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              transform: `scale(${stopSpring})`,
            }}
          >
            STOP!
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#FFFFFF",
              marginTop: 24,
              textShadow: "0 4px 18px rgba(0, 0, 0, 0.95), 0 0 25px rgba(239, 68, 68, 0.7)",
              letterSpacing: 1,
              fontFamily: "'Montserrat', sans-serif",
              transform: `scale(${Math.min(1, stopSpring)})`,
            }}
          >
            Tubuhmu Tidak Bekerja Begitu!
          </div>
        </div>
      )}
    </div>
  );
};
