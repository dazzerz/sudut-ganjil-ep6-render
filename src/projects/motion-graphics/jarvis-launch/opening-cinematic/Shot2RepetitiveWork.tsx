import React from "react";
import {
  interpolate,
  useCurrentFrame,
  staticFile,
  Img,
  Audio,
  Sequence,
  Easing,
} from "remotion";
import { CinematicSubtitle } from "./components/CinematicSubtitle";
import { VignetteOverlay } from "./components/VignetteOverlay";

export const Shot2RepetitiveWork: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow horizontal pan & subtle zoom
  const scale = interpolate(frame, [0, 450], [1.0, 1.055], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const translateX = interpolate(frame, [0, 450], [0, -30], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Crossfade in at start, crossfade out at end
  const sceneOpacity = interpolate(
    frame,
    [0, 20, 420, 450],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Animated repetitive counter
  const rowCount = Math.floor(
    interpolate(frame, [30, 400], [1240, 8940], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Scanning laser line across spreadsheet
  const scanLineY = interpolate(frame % 90, [0, 90], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Copy-paste pulse indicator
  const copyPulse = Math.sin((frame / 15) * Math.PI);

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#05080e",
        overflow: "hidden",
        opacity: sceneOpacity,
      }}
    >
      {/* Background B-roll Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale}) translateX(${translateX}px)`,
          transformOrigin: "center left",
        }}
      >
        <Img
          src={staticFile("images/jarvis/shot2_excel_laptop.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.85) contrast(1.15)",
          }}
        />
      </div>

      <VignetteOverlay intensity={0.5} letterbox />

      {/* Voiceover Audio (Shot 2: Pekerjaan yang penting - tenggelam di bawah pekerjaan yang berulang) */}
      <Sequence from={40}>
        <Audio
          src={staticFile("audio/jarvis/shot2_vo.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Corporate Context HUD Stamp (Top Left) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 90,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#38bdf8",
            boxShadow: "0 0 12px #38bdf8",
          }}
        />
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.75)",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          BACK OFFICE OPERASIONAL • RE-KOMPILASI DATA MANUAL
        </span>
      </div>

      {/* Floating HUD: Repetitive Work Telemetry (Left Middle) */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 90,
          width: 440,
          padding: "24px 28px",
          borderRadius: 18,
          background: "rgba(10, 15, 29, 0.8)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          boxShadow:
            "0 24px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: 14,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>📊</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Manual Data Extraction
            </span>
          </div>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#f87171",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            LOOPING
          </span>
        </div>

        {/* Repetitive metrics */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "#cbd5e1",
                marginBottom: 6,
              }}
            >
              <span>Copy-Paste Baris Data Excel:</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#38bdf8",
                }}
              >
                {rowCount.toLocaleString("id-ID")} baris
              </span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, (rowCount / 8940) * 100)}%`,
                  backgroundColor: "#38bdf8",
                  boxShadow: "0 0 10px #38bdf8",
                }}
              />
            </div>
          </div>

          <div
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px dashed rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 13, color: "#94a3b8" }}>
              Kompilasi CDAKB Mingguan:
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: copyPulse > 0 ? "#f59e0b" : "#e2e8f0",
              }}
            >
              ⚡ Mengulang File yang Sama
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 4,
            }}
          >
            <span style={{ fontSize: 12, color: "#64748b" }}>
              Waktu terbuang per karyawan:
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#ef4444",
                fontFamily: "monospace",
              }}
            >
              ~2.5 Jam / Hari
            </span>
          </div>
        </div>
      </div>

      {/* Floating Spreadsheet Virtual Scanner Overlay (Right Side) */}
      <div
        style={{
          position: "absolute",
          top: 150,
          right: 80,
          width: 570,
          height: 340,
          borderRadius: 18,
          background: "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          overflow: "hidden",
          boxShadow: "0 24px 48px rgba(0,0,0,0.6)",
          zIndex: 30,
        }}
      >
        {/* Table Mock Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "75px 240px 145px 80px",
            background: "rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            padding: "10px 14px",
            fontSize: 11,
            fontWeight: 700,
            color: "#94a3b8",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>PO Number</span>
          <span>Item Desc</span>
          <span>Customer</span>
          <span>Status</span>
        </div>

        {/* Table Rows Mock */}
        <div style={{ position: "relative", padding: "10px 14px" }}>
          {/* Laser scanning line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: scanLineY,
              height: 2,
              backgroundColor: "#38bdf8",
              boxShadow: "0 0 14px #38bdf8, 0 0 25px #0284c7",
              zIndex: 10,
            }}
          />

          {[
            { po: "PO-8921", desc: "Hamilton C1 Ventilator", cust: "RS Siloam", st: "Pending" },
            { po: "PO-8922", desc: "ICU Medical Tracheostomy 7.0", cust: "RS Hermina", st: "Review" },
            { po: "PO-8923", desc: "ICU Medical PDT Kit 7", cust: "RS Pondok Indah", st: "Pending" },
            { po: "PO-8924", desc: "Pharma Research Rejuran", cust: "RS Mayapada", st: "Manual Sync" },
            { po: "PO-8925", desc: "Hamilton C1 Ventilator", cust: "RSUP Kariadi", st: "Pending" },
            { po: "PO-8926", desc: "ICU Medical Tracheostomy 7.0", cust: "RS Harapan Kita", st: "Review" },
          ].map((row, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "75px 240px 145px 80px",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                fontSize: 12,
                color: "#e2e8f0",
                fontFamily: "monospace",
              }}
            >
              <span style={{ color: "#38bdf8" }}>{row.po}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {row.desc}
              </span>
              <span style={{ color: "#94a3b8" }}>{row.cust}</span>
              <span style={{ color: "#f59e0b" }}>{row.st}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Voiceover Subtitle */}
      <CinematicSubtitle
        text="Pekerjaan yang penting — tenggelam di bawah pekerjaan yang berulang."
        startFrame={40}
        durationFrames={220}
        highlightWords={["penting", "tenggelam", "berulang."]}
        highlightColor="#f59e0b"
        fontSize={46}
        bottomPosition={140}
      />
    </div>
  );
};
