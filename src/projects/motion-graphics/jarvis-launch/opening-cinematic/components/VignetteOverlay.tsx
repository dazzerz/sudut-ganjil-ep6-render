import React from "react";

interface VignetteOverlayProps {
  intensity?: number; // 0 to 1
  letterbox?: boolean;
}

export const VignetteOverlay: React.FC<VignetteOverlayProps> = ({
  intensity = 0.5,
  letterbox = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {/* Radial vignette gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 45%, rgba(5, 8, 15, ${intensity}) 100%)`,
        }}
      />

      {/* Top and Bottom soft cinematic gradients */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          background:
            "linear-gradient(to bottom, rgba(5, 8, 15, 0.6) 0%, rgba(5, 8, 15, 0) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 240,
          background:
            "linear-gradient(to top, rgba(5, 8, 15, 0.85) 0%, rgba(5, 8, 15, 0) 100%)",
        }}
      />

      {letterbox && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 48,
              backgroundColor: "#000000",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 48,
              backgroundColor: "#000000",
            }}
          />
        </>
      )}
    </div>
  );
};
