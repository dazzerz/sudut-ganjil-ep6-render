import React, { useMemo } from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
  Audio,
  Sequence,
  Easing,
} from "remotion";
import { VignetteOverlay } from "./components/VignetteOverlay";

export const Shot5JarvisReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grand Entrance spring for JARVIS Logo ("Memperkenalkan JARVIS" at frame 25)
  const logoSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 16, stiffness: 70 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.82, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 0.4], [0, 1]);

  // Subtle breathing scale after reveal
  const breathe = Math.sin((frame / 45) * Math.PI) * 0.015;

  // Staggered reveals for the 3 pods synchronized to vocal callouts:
  // - "JARVIS Aria" at frame 325
  const pod1Spring = spring({
    frame: frame - 320,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  // - "JARVIS Sage" at frame 376
  const pod2Spring = spring({
    frame: frame - 370,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  // - "JARVIS Vega" at frame 418
  const pod3Spring = spring({
    frame: frame - 415,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  // Tagline reveal ("Bukan sekadar alat... Satu pendamping, di setiap langkah")
  const taglineOpacity = interpolate(
    frame,
    [110, 135],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background procedural neural grid / rings
  const ringRotation = (frame * 0.25) % 360;
  const innerRingRotation = (-frame * 0.4) % 360;

  // Light flare sweep across JARVIS text
  const flareX = interpolate(frame, [25, 95], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Background floating ambient cyber particles
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      x: (i * 67 + 23) % 1920,
      y: (i * 91 + 57) % 1080,
      size: 1.5 + (i % 3),
      speedX: ((i % 5) - 2) * 0.15,
      speedY: 0.2 + (i % 4) * 0.1,
      color: i % 2 === 0 ? "#38bdf8" : "#818cf8",
    }));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#030611",
        overflow: "hidden",
      }}
    >
      <VignetteOverlay intensity={0.6} letterbox />

      {/* Voiceover Audio (Shot 5: Memperkenalkan JARVIS...) */}
      <Sequence from={25}>
        <Audio
          src={staticFile("audio/jarvis/shot5_vo.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Background Volumetric Core Light */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          width: 850,
          height: 600,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 75%)",
          filter: "blur(65px)",
          pointerEvents: "none",
        }}
      />

      {/* Procedural Floating Cyber Dust */}
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
              opacity: 0.35 + 0.25 * Math.sin(frame * 0.08 + idx),
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Rotating Neural Geometric Rings */}
      <div
        style={{
          position: "absolute",
          top: "36%",
          left: "50%",
          width: 680,
          height: 680,
          transform: `translate(-50%, -50%) rotate(${ringRotation}deg)`,
          borderRadius: "50%",
          border: "1px dashed rgba(56, 189, 248, 0.2)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "36%",
          left: "50%",
          width: 520,
          height: 520,
          transform: `translate(-50%, -50%) rotate(${innerRingRotation}deg)`,
          borderRadius: "50%",
          border: "1px solid rgba(99, 102, 241, 0.18)",
          pointerEvents: "none",
        }}
      />

      {/* Main Hero Container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 30,
          zIndex: 30,
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            padding: "8px 26px",
            borderRadius: 40,
            background: "rgba(56, 189, 248, 0.1)",
            border: "1px solid rgba(56, 189, 248, 0.32)",
            backdropFilter: "blur(16px)",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#38bdf8",
            marginBottom: 28,
            opacity: logoOpacity,
            boxShadow: "0 0 25px rgba(56, 189, 248, 0.2)",
          }}
        >
          idsMED INTELLIGENT COMPANIONS
        </div>

        {/* Official JARVIS Logo Graphic (From User Image 2: JΛRVIS) */}
        <div
          style={{
            position: "relative",
            opacity: logoOpacity,
            transform: `scale(${logoScale + breathe})`,
            transformOrigin: "center center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("images/jarvis/jarvis_clean_logo.png")}
            style={{
              height: 145,
              width: "auto",
              objectFit: "contain",
              filter:
                "drop-shadow(0 0 35px rgba(56, 189, 248, 0.85)) drop-shadow(0 0 80px rgba(56, 189, 248, 0.45)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.95))",
            }}
          />
        </div>

        {/* Tagline: "One companion. Every step." */}
        <div
          style={{
            marginTop: 22,
            fontSize: 27,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#e2e8f0",
            opacity: taglineOpacity,
            textShadow:
              "0 4px 20px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 255, 255, 0.4)",
          }}
        >
          One companion. <span style={{ color: "#38bdf8" }}>Every step.</span>
        </div>

        {/* The 3 Intelligence Pods / Pillars (Horizontal Alignment) */}
        {/* JARVIS ARIA • JARVIS SAGE • JARVIS VEGA (No description text underneath) */}
        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 60,
            width: 1320,
            justifyContent: "center",
          }}
        >
          {/* Pod 1: Jarvis Aria (Sales / Field) */}
          <div
            style={{
              flex: 1,
              padding: "24px 28px",
              borderRadius: 20,
              background: "rgba(10, 18, 38, 0.82)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              boxShadow:
                "0 20px 45px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
              opacity: pod1Spring,
              transform: `translateY(${(1 - pod1Spring) * 35}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 15 }}>🚀</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  color: "#38bdf8",
                  textTransform: "uppercase",
                }}
              >
                ACT 1 • FIELD
              </span>
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                textShadow:
                  "0 0 25px rgba(56, 189, 248, 0.5), 0 4px 15px rgba(0,0,0,0.9)",
              }}
            >
              JARVIS ARIA
            </div>
          </div>

          {/* Pod 2: Jarvis Sage (DMI / Operations) */}
          <div
            style={{
              flex: 1,
              padding: "24px 28px",
              borderRadius: 20,
              background: "rgba(10, 18, 38, 0.82)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(129, 140, 248, 0.4)",
              boxShadow:
                "0 20px 45px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
              opacity: pod2Spring,
              transform: `translateY(${(1 - pod2Spring) * 35}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 15 }}>⚙️</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  color: "#818cf8",
                  textTransform: "uppercase",
                }}
              >
                ACT 2 • OPERATIONS
              </span>
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                textShadow:
                  "0 0 25px rgba(129, 140, 248, 0.5), 0 4px 15px rgba(0,0,0,0.9)",
              }}
            >
              JARVIS SAGE
            </div>
          </div>

          {/* Pod 3: Jarvis Vega (Management / Leadership) */}
          <div
            style={{
              flex: 1,
              padding: "24px 28px",
              borderRadius: 20,
              background: "rgba(10, 18, 38, 0.82)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              boxShadow:
                "0 20px 45px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
              opacity: pod3Spring,
              transform: `translateY(${(1 - pod3Spring) * 35}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 15 }}>🧠</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  color: "#f59e0b",
                  textTransform: "uppercase",
                }}
              >
                ACT 3 • LEADERSHIP
              </span>
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                textShadow:
                  "0 0 25px rgba(245, 158, 11, 0.5), 0 4px 15px rgba(0,0,0,0.9)",
              }}
            >
              JARVIS VEGA
            </div>
          </div>
        </div>
      </div>

      {/* Footer System Status Anchor (Bottom Center) */}
      <div
        style={{
          position: "absolute",
          bottom: 38,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          zIndex: 40,
          opacity: pod3Spring,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          idsMED Live Ecosystem • Siap Digunakan Hari Ini
        </span>
      </div>
    </div>
  );
};
