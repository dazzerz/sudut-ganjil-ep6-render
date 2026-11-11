import React, { useMemo } from "react";
import {
  interpolate,
  useCurrentFrame,
  staticFile,
  Audio,
  Sequence,
  Img,
  Easing,
} from "remotion";
import { VignetteOverlay } from "./components/VignetteOverlay";

export const Shot4FadeToBlack: React.FC = () => {
  const frame = useCurrentFrame();

  // Procedural ambient floating particles in the void (deterministic)
  const particles = useMemo(() => {
    return Array.from({ length: 55 }).map((_, i) => ({
      x: (i * 47 + 29) % 1920,
      y: (i * 83 + 71) % 1080,
      size: 1.5 + (i % 4),
      speedY: 0.12 + (i % 5) * 0.08,
      speedX: ((i % 3) - 1) * 0.08,
      baseOpacity: 0.2 + (i % 4) * 0.15,
      color: i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#7dd3fc" : "#a5b4fc",
    }));
  }, []);

  // VO Audio: starts at frame 60
  // "Selama ini, semua itu jatuh ke tangan manusia saja. Mulai hari ini — tidak lagi."
  const voVolume = interpolate(frame, [50, 60, 270, 280], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background Plate Opacity Evolution:
  // - Phase 1 (f0-f350): Subdued, mysterious atmospheric depth (opacity 0.35 - 0.45)
  // - Phase 2 (f390-f750): AWAKENING! Bursts into full luminous glory (opacity 0.95)
  const bgPlateOpacity = interpolate(
    frame,
    [0, 60, 280, 360, 400, 420],
    [0, 0.4, 0.25, 0.35, 0.95, 0.9],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Cinematic Camera push-in on the background plate
  const bgScale = interpolate(frame, [0, 750], [1.0, 1.12], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.1, 0.25, 1),
  });

  // Typography Phase 1: "Selama ini, semua itu jatuh ke tangan manusia saja."
  // Appears frame 50 to 240
  const p1Opacity = interpolate(
    frame,
    [50, 75, 230, 255],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const p1TranslateY = interpolate(
    frame,
    [50, 75, 230, 255],
    [20, 0, 0, -10],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Typography Phase 2: "Mulai hari ini —"
  // Appears frame 320 to 720
  const p2Opacity = interpolate(
    frame,
    [320, 350, 710, 740],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Big Impact: "TIDAK LAGI."
  // Slams / awakens at frame 400
  const impactProgress = interpolate(frame, [390, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const impactScale = interpolate(impactProgress, [0, 1], [0.85, 1]);
  const impactGlow = interpolate(impactProgress, [0, 1], [0, 45]);

  // Expanding shockwave ripples on impact (dual ripples)
  const ripple1Scale = interpolate(frame, [400, 680], [0.3, 3.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.1, 0.6, 0.2, 1),
  });
  const ripple1Opacity = interpolate(frame, [400, 425, 650], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ripple2Scale = interpolate(frame, [415, 710], [0.2, 3.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.1, 0.6, 0.2, 1),
  });
  const ripple2Opacity = interpolate(frame, [415, 440, 690], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // High-Tech Concentric Radar Reticle Rotations
  const reticleAngle1 = (frame * 0.35) % 360;
  const reticleAngle2 = (-frame * 0.2) % 360;

  // Floor Perspective Cyber Grid animation (moving toward camera)
  const gridOffsetY = (frame * 1.5) % 60;

  // Sci-fi HUD Telemetry Fade-in
  const hudOpacity = interpolate(frame, [405, 450, 700, 730], [0, 0.85, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#020409",
        overflow: "hidden",
      }}
    >
      {/* 1. Rich Cinematic Background Plate (Neural Cosmos / Quantum Rays) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${bgScale})`,
          transformOrigin: "center center",
          opacity: bgPlateOpacity,
          transition: "opacity 0.2s ease-out",
        }}
      >
        <Img
          src={staticFile("images/jarvis/shot4_cinematic_quantum_void.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) contrast(1.15)",
          }}
        />
      </div>

      {/* 2. Deep Volumetric Ambient Glow Core */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 600,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22) 0%, rgba(14, 116, 144, 0.12) 45%, transparent 75%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          opacity: frame >= 390 ? 1 : 0.4,
        }}
      />

      {/* 3. 3D Perspective Cyber Horizon Grid (Floor) */}
      {frame >= 380 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 380,
            perspective: 500,
            overflow: "hidden",
            pointerEvents: "none",
            opacity: interpolate(frame, [380, 440], [0, 0.45], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -300,
              transform: "rotateX(72deg)",
              transformOrigin: "center bottom",
              backgroundImage: `
                linear-gradient(to right, rgba(56, 189, 248, 0.28) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(56, 189, 248, 0.28) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              backgroundPosition: `center ${gridOffsetY}px`,
            }}
          />
        </div>
      )}

      {/* 4. High-Tech Concentric Radar Reticles (Centered around Awakening Text) */}
      {frame >= 390 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 15,
            opacity: impactProgress,
          }}
        >
          {/* Outer Dashed Radar Reticle with Degree Markers */}
          <div
            style={{
              width: 780,
              height: 780,
              borderRadius: "50%",
              border: "1px dashed rgba(56, 189, 248, 0.28)",
              transform: `rotate(${reticleAngle1}deg)`,
              position: "absolute",
              top: -390,
              left: -390,
            }}
          />

          {/* Inner Technical Coordinate Ring with Cardinal Ticks */}
          <div
            style={{
              width: 580,
              height: 580,
              borderRadius: "50%",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              transform: `rotate(${reticleAngle2}deg)`,
              position: "absolute",
              top: -290,
              left: -290,
              boxShadow: "inset 0 0 30px rgba(56, 189, 248, 0.08)",
            }}
          >
            {/* 4 Cardinal Tick Crossbars */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 2,
                height: 14,
                backgroundColor: "#38bdf8",
                transform: "translateX(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                width: 2,
                height: 14,
                backgroundColor: "#38bdf8",
                transform: "translateX(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: 14,
                height: 2,
                backgroundColor: "#38bdf8",
                transform: "translateY(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                width: 14,
                height: 2,
                backgroundColor: "#38bdf8",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>
      )}

      {/* 5. Expanding Cyan Energy Shockwaves */}
      {frame >= 400 && (
        <>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 380,
              height: 380,
              transform: `translate(-50%, -50%) scale(${ripple1Scale})`,
              borderRadius: "50%",
              border: "2px solid rgba(56, 189, 248, 0.7)",
              boxShadow: "0 0 60px rgba(56, 189, 248, 0.4)",
              opacity: ripple1Opacity,
              pointerEvents: "none",
              zIndex: 16,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 320,
              height: 320,
              transform: `translate(-50%, -50%) scale(${ripple2Scale})`,
              borderRadius: "50%",
              border: "1px dashed rgba(125, 211, 252, 0.5)",
              opacity: ripple2Opacity,
              pointerEvents: "none",
              zIndex: 16,
            }}
          />
        </>
      )}

      {/* 6. Dynamic Floating Cyber Dust Particles */}
      {particles.map((p, idx) => {
        const posX = (p.x + frame * p.speedX + 1920) % 1920;
        const posY = (p.y - frame * p.speedY + 1080) % 1080;
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: posX,
              top: posY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity:
                p.baseOpacity * (0.6 + 0.4 * Math.sin(frame * 0.06 + idx)),
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              pointerEvents: "none",
              zIndex: 18,
            }}
          />
        );
      })}

      {/* 7. Sci-Fi HUD Corner Telemetry (Apple Keynote / Cyberpunk Luxury) */}
      {frame >= 395 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "50px 70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pointerEvents: "none",
            zIndex: 25,
            opacity: hudOpacity,
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: "0.18em",
            color: "rgba(148, 163, 184, 0.65)",
            textTransform: "uppercase",
          }}
        >
          {/* Top Row */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#38bdf8",
                  boxShadow: "0 0 10px #38bdf8",
                }}
              />
              <span>PARADIGM SHIFT // PROTOCOL 01</span>
            </div>
            <span>NEURAL CORE INITIALIZED • 2026</span>
          </div>

          {/* Bottom Row */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>SYS.STATE: SHIFTING TO INTELLIGENT COMPANIONS</span>
            <span style={{ color: "#38bdf8" }}>idsMED ENTERPRISE ARCHITECTURE</span>
          </div>
        </div>
      )}

      <VignetteOverlay intensity={0.5} letterbox />

      {/* Voiceover Part A (Selama ini, semua itu jatuh ke tangan manusia saja) */}
      <Sequence from={50}>
        <Audio
          src={staticFile("audio/jarvis/shot4_partA_vo.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Voiceover Part B (Mulai hari ini... tidak lagi!) */}
      <Sequence from={330}>
        <Audio
          src={staticFile("audio/jarvis/shot4_partB_vo.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Phase 1 Typography: Tension Statement */}
      {frame >= 50 && frame < 280 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 120px",
            opacity: p1Opacity,
            transform: `translateY(${p1TranslateY}px)`,
            zIndex: 40,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(148, 163, 184, 0.8)",
              marginBottom: 20,
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            REALITAS OPERASIONAL KITA
          </div>
          <div
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.35,
              maxWidth: 1300,
              textShadow:
                "0 4px 30px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 0, 0, 0.8)",
            }}
          >
            “Selama ini, semua beban itu jatuh ke tangan{" "}
            <span
              style={{
                color: "#e2e8f0",
                borderBottom: "2px solid rgba(255,255,255,0.3)",
                paddingBottom: 4,
              }}
            >
              manusia saja
            </span>
            .”
          </div>
        </div>
      )}

      {/* Phase 2 Typography: The Shift ("Mulai hari ini — TIDAK LAGI.") */}
      {frame >= 320 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 120px",
            opacity: p2Opacity,
            zIndex: 40,
          }}
        >
          <div
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: 38,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(226, 232, 240, 0.9)",
              marginBottom: 16,
              textShadow:
                "0 2px 20px rgba(0, 0, 0, 0.95), 0 0 15px rgba(56, 189, 248, 0.3)",
            }}
          >
            Mulai hari ini —
          </div>

          <div
            style={{
              position: "relative",
              transform: `scale(${impactScale})`,
              transformOrigin: "center center",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                fontSize: 98,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                textAlign: "center",
                textShadow: `0 0 ${impactGlow}px rgba(56, 189, 248, 0.9), 0 4px 30px rgba(0, 0, 0, 0.95)`,
                background:
                  "linear-gradient(180deg, #FFFFFF 20%, #E0F2FE 70%, #7DD3FC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              TIDAK LAGI.
            </h1>

            {/* Anamorphic Laser Flare Line through text */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "-30%",
                right: "-30%",
                height: 2,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.8) 45%, #FFFFFF 50%, rgba(56, 189, 248, 0.8) 55%, transparent 100%)",
                boxShadow:
                  "0 0 25px rgba(56, 189, 248, 0.9), 0 0 50px rgba(56, 189, 248, 0.6)",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                opacity: impactProgress,
              }}
            />
          </div>

          <div
            style={{
              marginTop: 26,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#38bdf8",
              opacity: impactProgress,
              textShadow:
                "0 0 20px rgba(56, 189, 248, 0.8), 0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            A New Era of Intelligent Collaboration
          </div>
        </div>
      )}
    </div>
  );
};
