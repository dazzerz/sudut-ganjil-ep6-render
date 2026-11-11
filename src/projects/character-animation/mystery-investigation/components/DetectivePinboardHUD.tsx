import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const DetectivePinboardHUD: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        padding: "0 70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        pointerEvents: "none",
        zIndex: 50,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Top Left: Case Title & Episode */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FF3366",
              boxShadow: "0 0 12px #FF3366",
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: "#FF3366",
              letterSpacing: "0.15em",
              textShadow: "0 0 10px rgba(255, 51, 102, 0.7)",
            }}
          >
            KASUS INVESTIGASI #01
          </span>
        </div>

        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "0.04em",
            textShadow: "0 4px 14px rgba(0,0,0,0.9)",
          }}
        >
          MISTERI KAMAR TERKUNCI
        </span>

        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#FFE600",
            letterSpacing: "0.08em",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          PART 1 • TEKA-TEKI KUNCI RUSAK
        </span>
      </div>

      {/* Top Right: Clues Counter & Time of Crime */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(255, 230, 0, 0.4)",
            borderRadius: 6,
            padding: "4px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ fontSize: 13, color: "#8E9AA8", letterSpacing: "0.08em" }}>
            BUKTI TERKUMPUL:
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: "#FFE600",
              textShadow: "0 0 8px rgba(255, 230, 0, 0.8)",
            }}
          >
            1 / 3
          </span>
        </div>

        <span
          style={{
            fontSize: 13,
            color: "#00F0FF",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textShadow: "0 0 8px rgba(0, 240, 255, 0.7)",
          }}
        >
          WAKTU KEJADIAN: 21:15 WIB
        </span>
      </div>
    </div>
  );
};