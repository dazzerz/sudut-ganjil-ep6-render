import React, { useMemo } from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const AnimatedWarmShowerOutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow warm camera push-in
  const camScale = interpolate(frame, [0, 458], [1.0, 1.12], {
    extrapolateRight: "clamp",
  });
  const camY = interpolate(frame, [0, 458], [0, -25], {
    extrapolateRight: "clamp",
  });

  // Animated rising warm steam puffs
  const steamPuffs = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: 320 + ((i * 43) % 440),
      speed: 3.5 + (i % 3) * 1.5,
      size: 50 + (i % 4) * 35,
      offset: i * 35,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#1C140C",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 3D STEAMING WARM SHOWER BATHROOM PLATE                        */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          transform: `scale(${camScale}) translateY(${camY}px)`,
          filter: "contrast(1.1) brightness(0.95)",
        }}
      >
        <Img
          src={staticFile("images/fakta-mandi-malam/scene4_warm_shower.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Warm Ambient Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, rgba(30, 20, 10, 0.5) 70%, rgba(10, 5, 2, 0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Procedural Rising Warm Steam Particles */}
      {steamPuffs.map((p) => {
        const y = 1600 - ((frame * p.speed + p.offset) % 1300);
        const sway = Math.sin((frame + p.id * 15) * 0.05) * 35;
        const opacity = interpolate(y, [400, 800, 1500], [0, 0.45, 0.75], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x + sway,
              top: y,
              width: p.size,
              height: p.size,
              backgroundColor: "#FEF08A",
              borderRadius: "50%",
              opacity,
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* ------------------------------------------------------------- */}
      {/* CONCLUSION & VERIFIED CITATIONS (DIRECT ON CANVAS, ZERO BOXES) */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 60,
          right: 60,
          textAlign: "center",
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "#FDE047",
            letterSpacing: 4,
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          KESIMPULAN SAINS
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            lineHeight: 1.1,
            marginTop: 10,
            textShadow:
              "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 158, 11, 0.6)",
          }}
        >
          MASUK AKAL KAN?
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#6EE7B7",
            marginTop: 14,
            textShadow: "0 2px 10px rgba(0,0,0,0.95)",
          }}
        >
          Mandi malam itu aman! Kalau dingin, cukup pakai air hangat.
        </div>

        {/* Verified Citation Hairlines */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
            gap: 40,
            borderTop: "2px solid rgba(255, 255, 255, 0.2)",
            borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
            padding: "20px 0",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700, letterSpacing: 1 }}>
              SUMBER 01
            </div>
            <div style={{ fontSize: 22, color: "#FFFFFF", fontWeight: 900, textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>
              Harvard Health Publishing
            </div>
            <div style={{ fontSize: 15, color: "#38BDF8" }}>Cold Temperature & Joint Health</div>
          </div>

          <div style={{ width: 2, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 700, letterSpacing: 1 }}>
              SUMBER 02
            </div>
            <div style={{ fontSize: 22, color: "#FFFFFF", fontWeight: 900, textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>
              Arthritis Foundation
            </div>
            <div style={{ fontSize: 15, color: "#FDE047" }}>Rheumatoid Autoimmunity Guide</div>
          </div>
        </div>

        {/* Big CTA */}
        <div
          style={{
            marginTop: 35,
            fontSize: 32,
            fontWeight: 900,
            color: "#38BDF8",
            letterSpacing: 2,
            textShadow: "0 4px 15px rgba(0,0,0,0.95), 0 0 25px rgba(56, 189, 248, 0.7)",
          }}
        >
          👉 FOLLOW @FAKTAMASUKAKAL
        </div>
      </div>
    </div>
  );
};
