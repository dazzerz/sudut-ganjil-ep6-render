import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const NcekInfoCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Animasi transisi per babak (Frame 0 - 1650)
  // Babak 1: 0 - 400 (Tuduhan Tetangga)
  // Babak 2: 400 - 870 (Kenyataan Kerja Remote $ USD)
  // Babak 3: 870 - 1280 (Alokasi 80% Investasi & Dividen)
  // Babak 4: 1280 - 1650 (Beli Rumah Cash & Pesan Moral)

  const isBabak1 = frame < 400;
  const isBabak2 = frame >= 400 && frame < 870;
  const isBabak3 = frame >= 870 && frame < 1280;
  const isBabak4 = frame >= 1280;

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 60,
        right: 60,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        zIndex: 40,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Badge Topik POV Khas Ncek Invest */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#0F172A",
            border: "1px solid #334155",
            borderRadius: 999,
            padding: "6px 18px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: isBabak2 ? "#10B981" : isBabak3 ? "#38BDF8" : "#F59E0B",
              boxShadow: `0 0 10px ${isBabak2 ? "#10B981" : isBabak3 ? "#38BDF8" : "#F59E0B"}`,
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 800, color: "#F8FAFC", letterSpacing: "0.08em" }}>
            POV: REALITAS KEUANGAN
          </span>
        </div>

        {/* Tagline Channel */}
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: "#94A3B8",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          SILENT WEALTH #01
        </span>
      </div>

      {/* Dynamic Pop-up Financial Infographic Widget */}
      {isBabak1 && (
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: "16px 20px",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>STATUS DI MATA TETANGGA</span>
            <span style={{ fontSize: 12, color: "#EF4444", fontWeight: 800, backgroundColor: "rgba(239,68,68,0.15)", padding: "2px 8px", borderRadius: 4 }}>
              STIGMA NEGATIF
            </span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#F8FAFC" }}>
            "Pengangguran Sarjana di Kosan"
          </div>
          <span style={{ fontSize: 13, color: "#CBD5E1" }}>
            Pakaian: Kaos Oblong • Sandal Jepit • Nongkrong Teras
          </span>
        </div>
      )}

      {isBabak2 && (
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 16,
            padding: "16px 20px",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>FAKTA REKENING SEBENARNYA</span>
            <span style={{ fontSize: 12, color: "#10B981", fontWeight: 800, backgroundColor: "rgba(16,185,129,0.15)", padding: "2px 8px", borderRadius: 4 }}>
              REMOTE WORK USD
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#10B981" }}>
              Rp35.000.000
            </span>
            <span style={{ fontSize: 14, color: "#94A3B8", fontWeight: 600 }}>/ bulan</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#CBD5E1", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 6 }}>
            <span>Pengeluaran Gaya Hidup:</span>
            <span style={{ fontWeight: 800, color: "#F59E0B" }}>Rp3.000.000 / bln (Gaya Magang)</span>
          </div>
        </div>
      )}

      {isBabak3 && (
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 16,
            padding: "16px 20px",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700 }}>ALOKASI KEUANGAN SISTEMATIS</span>
            <span style={{ fontSize: 12, color: "#38BDF8", fontWeight: 800, backgroundColor: "rgba(56,189,248,0.15)", padding: "2px 8px", borderRadius: 4 }}>
              80% TABUNGAN & INVESTASI
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 4 }}>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#94A3B8" }}>Saham Dividen</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#38BDF8" }}>40%</div>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#94A3B8" }}>Reksa Dana</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#10B981" }}>25%</div>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#94A3B8" }}>Emas Fisik</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#F59E0B" }}>15%</div>
            </div>
          </div>
        </div>
      )}

      {isBabak4 && (
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            borderRadius: 16,
            padding: "16px 20px",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#F59E0B", fontWeight: 800 }}>HASIL DISIPLIN UMUR 27</span>
            <span style={{ fontSize: 12, color: "#10B981", fontWeight: 800, backgroundColor: "rgba(16,185,129,0.15)", padding: "2px 8px", borderRadius: 4 }}>
              BEBAS UTANG 100%
            </span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#F8FAFC" }}>
            Rumah Pertama Cash Keras
          </div>
          <span style={{ fontSize: 13, color: "#A7F3D0", fontWeight: 600 }}>
            ✓ Tanpa Bunga Cicilan KPR • Rekening Tetap Aman
          </span>
        </div>
      )}
    </div>
  );
};