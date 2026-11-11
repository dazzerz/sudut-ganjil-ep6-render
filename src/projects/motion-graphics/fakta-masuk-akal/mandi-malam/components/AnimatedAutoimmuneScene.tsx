import React, { useMemo } from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const AnimatedAutoimmuneScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Microscopic camera drift
  const camScale = interpolate(frame, [0, 431], [1.0, 1.14], {
    extrapolateRight: "clamp",
  });
  const camX = interpolate(frame, [0, 431], [0, -25], {
    extrapolateRight: "clamp",
  });
  const camY = interpolate(frame, [0, 431], [0, 20], {
    extrapolateRight: "clamp",
  });

  // Floating microscopic dust particles (depth bokeh)
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 47) % 1080,
      y: (i * 79) % 1920,
      size: 6 + (i % 4) * 8,
      speedX: 0.3 + (i % 3) * 0.2,
      speedY: 0.4 + (i % 4) * 0.3,
      opacity: 0.2 + (i % 3) * 0.25,
      color: i % 2 === 0 ? "#FDE047" : "#F43F5E",
    }));
  }, []);

  // Antibody immune glow pulse
  const immunePulse = Math.sin(frame * 0.12) * 0.5 + 0.5;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0F0B18",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 3D MICROSCOPIC AUTOIMMUNE CELLULAR PLATE                      */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          transform: `scale(${camScale}) translate(${camX}px, ${camY}px)`,
          filter: "contrast(1.15) brightness(0.95)",
        }}
      >
        <Img
          src={staticFile("images/fakta-mandi-malam/scene3_autoimmune_micro.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Atmospheric Deep Cellular Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(225, 29, 72, 0.1) 0%, rgba(15, 11, 24, 0.5) 70%, rgba(5, 3, 10, 0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Microscopic Bokeh Particles */}
      {particles.map((p) => {
        const px = (p.x + frame * p.speedX) % 1080;
        const py = (p.y - frame * p.speedY + 1920) % 1920;
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity: p.opacity * (0.6 + immunePulse * 0.4),
              filter: `blur(${p.size > 14 ? 6 : 2}px)`,
              pointerEvents: "none",
            }}
          />
        );
      })}

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
            color: "#FB7185",
            letterSpacing: 3,
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          FAKTA MEDIS 02 // PENYEBAB ASLI
        </div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            lineHeight: 1.1,
            marginTop: 6,
            textShadow:
              "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 25px rgba(225, 29, 72, 0.5)",
          }}
        >
          REMATIK ADALAH PENYAKIT AUTOIMUN!
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#FDA4AF",
            marginTop: 8,
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          Sistem Imun Keliru Menyerang Selaput Sendi Sendiri
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COMPARISON METRICS (DIRECT ON CANVAS, ZERO BOX CONTAINERS)    */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          gap: 30,
          zIndex: 95,
          pointerEvents: "none",
        }}
      >
        {/* Myth column */}
        <div
          style={{
            flex: 1,
            borderBottom: "4px solid #EF4444",
            paddingBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#EF4444",
              fontFamily: "'Montserrat', sans-serif",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            ❌ BUKAN AIR MANDI
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#E2E8F0",
              marginTop: 4,
              textShadow: "0 2px 6px rgba(0,0,0,0.9)",
            }}
          >
            Air dingin tidak merusak imun
          </div>
        </div>

        {/* Fact column */}
        <div
          style={{
            flex: 1,
            borderBottom: "4px solid #10B981",
            paddingBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#10B981",
              fontFamily: "'Montserrat', sans-serif",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            ✅ FAKTOR GENETIK & IMUN
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#E2E8F0",
              marginTop: 4,
              textShadow: "0 2px 6px rgba(0,0,0,0.9)",
            }}
          >
            Antibodi menyerang lapisan sendi
          </div>
        </div>
      </div>
    </div>
  );
};
