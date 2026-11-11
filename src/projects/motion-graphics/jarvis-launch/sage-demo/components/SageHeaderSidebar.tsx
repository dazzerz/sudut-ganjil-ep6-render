import React from "react";

interface SageHeaderSidebarProps {
  activeTitle?: string;
  children: React.ReactNode;
}

export const SageHeaderSidebar: React.FC<SageHeaderSidebarProps> = ({
  activeTitle = "Percakapan Baru",
  children,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        display: "flex",
        backgroundColor: "#F8FAFC",
        fontFamily: "system-ui, -apple-system, 'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDEBAR (Width: 320px) */}
      <div
        style={{
          width: 320,
          height: "100%",
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E2E8F0",
          display: "flex",
          flexDirection: "column",
          padding: "24px 20px",
          boxSizing: "border-box",
          zIndex: 10,
          boxShadow: "4px 0 24px rgba(0, 0, 0, 0.03)",
        }}
      >
        {/* Brand Monogram */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: "#10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 26,
              boxShadow: "0 6px 18px rgba(16, 185, 129, 0.35)",
            }}
          >
            S
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 3, color: "#1E293B" }}>
              S A G E
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#64748B" }}>
              JARVIS • BACK OFFICE
            </div>
          </div>
        </div>

        {/* Action: Percakapan Baru */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: "#F1F5F9",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            marginBottom: 20,
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F172A", fontWeight: 600, fontSize: 14 }}>
            <span>＋</span> Percakapan baru
          </div>
          <span style={{ fontSize: 11, color: "#94A3B8", background: "#E2E8F0", padding: "2px 6px", borderRadius: 4 }}>
            ⌘ K
          </span>
        </div>

        {/* Navigation items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", color: "#475569", fontSize: 13.5, fontWeight: 500 }}>
            <span>📥</span> Pesan masuk
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", color: "#475569", fontSize: 13.5, fontWeight: 500 }}>
            <span>🔍</span> Cari percakapan
          </div>
        </div>

        {/* Recent Conversations */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#94A3B8", textTransform: "uppercase", marginBottom: 12 }}>
          Percakapan (7 hari terakhir)
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, overflow: "hidden" }}>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              backgroundColor: "#ECFDF5",
              color: "#065F46",
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid #A7F3D0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            💬 {activeTitle}
          </div>
          <div style={{ padding: "8px 12px", color: "#64748B", fontSize: 13 }}>
            💬 Buatkan report Upline sekar...
          </div>
          <div style={{ padding: "8px 12px", color: "#64748B", fontSize: 13 }}>
            💬 SOP pengembalian uang ke...
          </div>
        </div>

        {/* Workspace Footer */}
        <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10B981" }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>Back Office workspace</div>
                <div style={{ fontSize: 10, color: "#64748B" }}>idsMED Indonesia</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "#0F172A",
                fontSize: 13,
              }}
            >
              F
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>Farah Shandra</div>
              <div style={{ fontSize: 10, color: "#94A3B8" }}>Sesi aktif terenkripsi</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT MAIN VIEW */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Top Header */}
        <div
          style={{
            height: 70,
            borderBottom: "1px solid #E2E8F0",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 36px",
            boxSizing: "border-box",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, color: "#0F172A" }}>
              S A G E
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                color: "#64748B",
                border: "1px solid #CBD5E1",
                padding: "4px 10px",
                borderRadius: 6,
                textTransform: "uppercase",
              }}
            >
              Back Office Assistant
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                backgroundColor: "#ECFDF5",
                borderRadius: 20,
                border: "1px solid #A7F3D0",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10B981", boxShadow: "0 0 8px #10B981" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#065F46" }}>Sage terhubung</span>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
                color: "#0284C7",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              idsMED
            </div>
          </div>
        </div>

        {/* Content Children */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {children}
        </div>
      </div>
    </div>
  );
};
