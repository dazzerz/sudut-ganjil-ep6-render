import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface InertiaProps {
  startFrame?: number;
}

export const InertiaShockwave: React.FC<InertiaProps> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Violent screen shake decay
  const shakeIntensity = interpolate(relFrame, [0, 25], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(relFrame * 2.2) * shakeIntensity;
  const shakeY = Math.cos(relFrame * 2.7) * shakeIntensity;

  // Supersonic objects flying continuously to the east (right)
  const flyOffset = ((relFrame * 22) % 950) - 150;

  const entryScale = spring({
    frame: relFrame,
    fps,
    config: { stiffness: 140, damping: 12 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: 720,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 1. Emergency Warning Banner */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          padding: "10px 24px",
          borderRadius: 999,
          fontWeight: 900,
          fontSize: 18,
          letterSpacing: 2,
          boxShadow: "0 0 40px rgba(239, 68, 68, 0.7)",
          marginBottom: 20,
          transform: `scale(${entryScale})`,
        }}
      >
        <span>⚠️</span>
        <span>HUKUM I NEWTON: INERSIA</span>
      </div>

      {/* 2. Visual Vector Comparison Box */}
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(18, 24, 38, 0.9)",
          border: "2px solid #EF4444",
          borderRadius: 24,
          padding: "26px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#F8FAFC",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Bumi Berhenti, Tapi Segala Isinya <span style={{ color: "#FF2E54" }}>TIDAK!</span>
        </div>

        {/* Supersonic Projectile Visualization */}
        <div
          style={{
            position: "relative",
            height: 140,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Speed Streak Lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 15 + i * 15,
                left: 0,
                right: 0,
                height: 1.5,
                background:
                  "linear-gradient(90deg, rgba(239, 68, 68, 0) 0%, rgba(239, 68, 68, 0.6) 80%, rgba(255, 255, 255, 0.9) 100%)",
                transform: `translateX(${(relFrame * 25 + i * 60) % 700 - 300}px)`,
              }}
            />
          ))}

          {/* Flying Supersonic Object */}
          <div
            style={{
              position: "absolute",
              left: flyOffset,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                backgroundColor: "#FF2E54",
                padding: "8px 16px",
                borderRadius: 8,
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: 16,
                boxShadow: "0 0 20px #FF2E54",
                whiteSpace: "nowrap",
              }}
            >
              🚀 Terlempar ke Timur @ 1.670 km/jam!
            </div>
            {/* Sonic Boom Cone */}
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "20px solid transparent",
                borderBottom: "20px solid transparent",
                borderLeft: "40px solid rgba(255, 46, 84, 0.4)",
              }}
            />
          </div>
        </div>

        {/* Bottom Explanatory Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 18,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 14,
              padding: "14px",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div style={{ color: "#94A3B8", fontSize: 12, fontWeight: 700 }}>
              KECEPATAN PELURU
            </div>
            <div style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 900 }}>
              ~1.200 km/jam
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              borderRadius: 14,
              padding: "14px",
              textAlign: "center",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            <div style={{ color: "#FCA5A5", fontSize: 12, fontWeight: 700 }}>
              LEMPARAN INERSIA
            </div>
            <div style={{ color: "#FF2E54", fontSize: 20, fontWeight: 900 }}>
              1.670 km/jam 🔥
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
