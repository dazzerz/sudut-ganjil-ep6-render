import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const OutroCitationBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { stiffness: 130, damping: 14 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 880,
        transform: `scale(${enterSpring})`,
      }}
    >
      {/* Official Verified Source Badge Card */}
      <div
        style={{
          width: 820,
          backgroundColor: "#FFFFFF",
          borderRadius: 36,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.08)",
          border: "3px solid #E2E8F0",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Verified Badge Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#EFF6FF",
            border: "2px solid #BFDBFE",
            padding: "8px 24px",
            borderRadius: 30,
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 22 }}>🔬</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: "#1D4ED8",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            SUMBER REFERENSI ILMIAH TERVERIFIKASI
          </span>
        </div>

        {/* Big Headline */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.2,
            marginBottom: 24,
            fontFamily: "'Montserrat', system-ui, sans-serif",
          }}
        >
          Semua Fakta Ini Masuk Akal Secara Fisika!
        </div>

        {/* Institution Badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* Source 1: NASA */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#F8FAFC",
              border: "2px solid #E2E8F0",
              borderRadius: 24,
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 32 }}>🚀</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#1E293B" }}>
              NASA Earth Observatory
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#64748B" }}>
              Atmospheric Science & Ozone
            </div>
          </div>

          {/* Source 2: APS */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#F8FAFC",
              border: "2px solid #E2E8F0",
              borderRadius: 24,
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 32 }}>⚛️</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#1E293B" }}>
              American Physical Society
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#64748B" }}>
              Molecular Bonding & Pressure
            </div>
          </div>
        </div>

        {/* Call to Action Pill */}
        <div
          style={{
            marginTop: 28,
            width: "100%",
            backgroundColor: "#0284C7",
            borderRadius: 24,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            boxShadow: "0 10px 25px rgba(2, 132, 199, 0.35)",
          }}
        >
          <span style={{ fontSize: 26 }}>👉</span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: 1,
            }}
          >
            Follow @FaktaMasukAkal
          </span>
        </div>
      </div>
    </div>
  );
};
