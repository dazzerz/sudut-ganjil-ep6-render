import React from "react";
import { Easing, interpolate, staticFile, useCurrentFrame } from "remotion";

export interface OutroCardProps {
  visible: boolean;
}

export const OutroCard: React.FC<OutroCardProps> = ({ visible }) => {
  const frame = useCurrentFrame();

  if (!visible) return null;

  // Frame range in outro: 1620 to 1800 (frame local 0 to 180)
  const localFrame = frame - 1620;

  const cardOpacity = interpolate(localFrame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cardScale = interpolate(localFrame, [0, 30], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(10, 15, 29, 0.88)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        opacity: cardOpacity,
      }}
    >
      <div
        style={{
          width: 860,
          backgroundColor: "#ffffff",
          borderRadius: 24,
          padding: "48px 56px",
          boxShadow:
            "0 40px 100px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `scale(${cardScale})`,
        }}
      >
        {/* Avatar & Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <img
            src={staticFile("images/jainal_mgmt/jainal_avatar.png")}
            alt="Jainal"
            style={{ width: 56, height: 56, borderRadius: 12 }}
          />
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.06em",
                color: "#1e1b4b",
                lineHeight: 1.1,
              }}
            >
              JAINAL
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#7c3aed",
                marginTop: 2,
              }}
            >
              JARVIS · MANAGEMENT ASSISTANT
            </div>
          </div>
        </div>

        {/* Hero Title */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            marginBottom: 12,
          }}
        >
          Autonomous Pitching Deck Engine
        </div>

        <div
          style={{
            fontSize: 16,
            color: "#64748b",
            maxWidth: 640,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Mengubah kebutuhan presentasi manajemen menjadi dokumen pitching 15
          slide lengkap dan terverifikasi dalam hitungan menit.
        </div>

        {/* Feature Badges Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            width: "100%",
            marginBottom: 36,
          }}
        >
          {[
            {
              title: "15-Slide Structured Deck",
              desc: "Cover, tantangan kardiak, solusi HLM S5, & closing",
            },
            {
              title: "Autonomous Inspection",
              desc: "Validasi visual SVG cover & kelayakan teknis",
            },
            {
              title: "Internal Price List Citations",
              desc: "Katalog resmi KNF4 Livanova cutoff Juli 2026",
            },
            {
              title: "Production PPTX Export",
              desc: "File PowerPoint 4.9 MB siap pakai & diedit",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "16px 20px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1e1b4b",
                  marginBottom: 4,
                }}
              >
                ✦ {item.title}
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Bottom idsMED Brand Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 20,
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#64748b",
                letterSpacing: "-0.04em",
              }}
            >
              iDS
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#1d4ed8",
                letterSpacing: "-0.04em",
              }}
            >
              MED
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
                marginLeft: 8,
              }}
            >
              Indonesia · Management Workspace
            </span>
          </div>

          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#7c3aed",
              backgroundColor: "#f5f3ff",
              padding: "6px 14px",
              borderRadius: 8,
            }}
          >
            ENTERPRISE LIVE DEMO
          </div>
        </div>
      </div>
    </div>
  );
};
