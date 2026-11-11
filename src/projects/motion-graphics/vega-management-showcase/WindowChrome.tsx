import React from "react";

export interface WindowChromeProps {
  children: React.ReactNode;
}

export const WindowChrome: React.FC<WindowChromeProps> = ({ children }) => {
  return (
    <div
      style={{
        width: 1760,
        height: 990,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow:
          "0 35px 90px -20px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.16)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Sleek App Window Header */}
      <div
        style={{
          height: 42,
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {/* Window Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: 6,
              backgroundColor: "#f87171",
            }}
          />
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: 6,
              backgroundColor: "#fbbf24",
            }}
          />
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: 6,
              backgroundColor: "#34d399",
            }}
          />
        </div>

        {/* Clean URL Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: 8,
            padding: "4px 32px",
            fontSize: 12,
            fontWeight: 500,
            color: "#475569",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <span style={{ color: "#10b981", fontSize: 11 }}>🔒</span>
          <span>jainal.idsmed.com</span>
          <span style={{ color: "#94a3b8" }}>/management</span>
        </div>

        {/* Right Info */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#64748b",
            letterSpacing: "0.06em",
          }}
        >
          idsMED VEGA PLATFORM
        </div>
      </div>

      {/* Main Body */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};
