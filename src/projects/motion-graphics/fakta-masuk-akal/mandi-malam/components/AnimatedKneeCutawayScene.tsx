import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const AnimatedKneeCutawayScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow dramatic camera zoom into the knee joint
  const camScale = interpolate(frame, [0, 345], [1.0, 1.15], {
    extrapolateRight: "clamp",
  });
  const camY = interpolate(frame, [0, 345], [0, -40], {
    extrapolateRight: "clamp",
  });

  // Pulse effect simulating cold vasoconstriction
  const pulse = Math.sin(frame * 0.15) * 0.5 + 0.5;
  const coldGlow = interpolate(pulse, [0, 1], [0.4, 0.9]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#030712",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 3D RENDERED ANATOMICAL KNEE PLATE                             */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          transform: `scale(${camScale}) translateY(${camY}px)`,
          filter: "contrast(1.15) brightness(0.95)",
        }}
      >
        <Img
          src={staticFile("images/fakta-mandi-malam/scene2_knee_cutaway.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Cold Temperature Atmospheric Glow Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(3, 7, 18, 0.8) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Pulsing Cyan Capillary Glow on Knee */}
      <div
        style={{
          position: "absolute",
          top: 600,
          left: 300,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, transparent 70%)",
          opacity: coldGlow,
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

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
          MEKANISME 01 // RESPON SUHU
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
              "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 25px rgba(2, 132, 199, 0.5)",
          }}
        >
          KENAPA SENDI TERASA KAKU?
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#BAE6FD",
            marginTop: 8,
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          Hanya Reaksi Fisik Sementara Akibat Suhu Dingin!
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SCIENTIFIC HAIRLINE CALLOUTS (DIRECT ON CANVAS)               */}
      {/* ------------------------------------------------------------- */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 95,
        }}
      >
        {/* Callout 1: Vasokonstriksi (Left side) */}
        <g style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.9))" }}>
          <circle cx="440" cy="780" r="8" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="440" cy="780" r="18" fill="none" stroke="#38BDF8" strokeWidth="2" opacity={coldGlow} />
          <line x1="440" y1="780" x2="60" y2="780" stroke="#38BDF8" strokeWidth="3" />
          <text
            x="60"
            y="755"
            fill="#38BDF8"
            fontSize="26"
            fontWeight="900"
            fontFamily="'Montserrat', sans-serif"
          >
            VASOKONSTRIKSI
          </text>
          <text
            x="60"
            y="815"
            fill="#E0F2FE"
            fontSize="20"
            fontWeight="700"
          >
            Pembuluh Darah Menyempit
          </text>
        </g>

        {/* Callout 2: Cairan Sendi Sinovial (Right side) */}
        <g style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.9))" }}>
          <circle cx="640" cy="980" r="8" fill="#FDE047" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="640" cy="980" r="18" fill="none" stroke="#FDE047" strokeWidth="2" opacity={coldGlow} />
          <line x1="640" y1="980" x2="1020" y2="980" stroke="#FDE047" strokeWidth="3" />
          <text
            x="1020"
            y="955"
            fill="#FDE047"
            fontSize="26"
            fontWeight="900"
            textAnchor="end"
            fontFamily="'Montserrat', sans-serif"
          >
            CAIRAN SINOVIAL
          </text>
          <text
            x="1020"
            y="1015"
            fill="#FEF08A"
            fontSize="20"
            fontWeight="700"
            textAnchor="end"
          >
            Mengental Sementara
          </text>
        </g>
      </svg>
    </div>
  );
};
