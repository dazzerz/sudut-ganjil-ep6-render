import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const BrainstemAtoniaHUD: React.FC = () => {
  const frame = useCurrentFrame();

  // Sleep stages and neural inhibition
  const isWaking = frame > 1150;
  const isSneezing = frame > 1250;

  const inhibitionLevel = Math.round(
    interpolate(frame, [0, 950, 1150, 1250], [98, 98, 45, 0], {
      extrapolateRight: "clamp",
    })
  );

  const trigeminalIrritation = Math.round(
    interpolate(frame, [0, 450, 900, 1150], [12, 45, 88, 100], {
      extrapolateRight: "clamp",
    })
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 35,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Top Left: Sleep Phase & Neurotransmitter Level */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 70,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, color: "#8E9AA8", letterSpacing: "0.08em" }}>
            SLEEP STATE:
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: isWaking ? "#FF3B30" : "#00F0FF",
              textShadow: isWaking
                ? "0 0 10px rgba(255, 59, 48, 0.8)"
                : "0 0 10px rgba(0, 240, 255, 0.8)",
            }}
          >
            {isSneezing ? "CONSCIOUS (AWAKE)" : isWaking ? "MICRO-AROUSAL" : "REM SLEEP (STAGE 4)"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#8E9AA8" }}>GABA / GLYCINE:</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#FFE600",
              textShadow: "0 0 8px rgba(255, 230, 0, 0.7)",
            }}
          >
            {inhibitionLevel}% INHIBITION
          </span>
        </div>

        {/* Minimal hairline bar */}
        <div
          style={{
            width: 280,
            height: 3,
            backgroundColor: "rgba(255,255,255,0.15)",
            position: "relative",
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: `${inhibitionLevel}%`,
              height: "100%",
              backgroundColor: isWaking ? "#FF3B30" : "#00F0FF",
              boxShadow: `0 0 8px ${isWaking ? "#FF3B30" : "#00F0FF"}`,
            }}
          />
        </div>
      </div>

      {/* Top Right: Trigeminal Sensory & Reflex Status */}
      <div
        style={{
          position: "absolute",
          top: 230,
          right: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, color: "#8E9AA8" }}>TRIGEMINAL LOAD:</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#FFFFFF",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {trigeminalIrritation}%
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#8E9AA8" }}>SNEEZE REFLEX:</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: isSneezing ? "#00FF66" : isWaking ? "#FFE600" : "#FF3366",
              textShadow: `0 0 8px ${isSneezing ? "rgba(0,255,102,0.8)" : "rgba(255,51,102,0.8)"}`,
            }}
          >
            {isSneezing ? "⚡ ACTIVE (FIRED)" : isWaking ? "⚠️ UNLOCKING..." : "🔒 LOCKED (ATONIA)"}
          </span>
        </div>

        <span
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.06em",
          }}
        >
          MOTOR NEURONS: {isWaking ? "RE-ACTIVATING" : "HYPERPOLARIZED"}
        </span>
      </div>

      {/* Target Hairline Pointers */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Brainstem hairline at center-bottom */}
        <line
          x1={540}
          y1={1020}
          x2={800}
          y2={1020}
          stroke="rgba(0, 240, 255, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx={540} cy={1020} r={4} fill="#00F0FF" />
        <text
          x={620}
          y={1010}
          fill="#00F0FF"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          [BATANG OTAK / PONS] ────○
        </text>

        {/* Trigeminal nerve sensory input */}
        <line
          x1={280}
          y1={850}
          x2={540}
          y2={850}
          stroke="rgba(255, 230, 0, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx={540} cy={850} r={4} fill="#FFE600" />
        <text
          x={140}
          y={840}
          fill="#FFE600"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          ○──── [SARAF TRIGEMINAL V]
        </text>
      </svg>
    </div>
  );
};
