import React from "react";
import { Img, interpolate, staticFile, Easing } from "remotion";
import { PALETTE, USER_ASSETS } from "./types";

interface SectionProps {
  frame: number; // 264 to 528
}

export const Section2Origami3D: React.FC<SectionProps> = ({ frame }) => {
  const localFrame = frame - 264; // 0 to 264

  // Beat pulses
  const beatProgress = (localFrame % 18) / 18;
  const beatPulse = interpolate(beatProgress, [0, 0.2, 1], [1.03, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3D Origami Folding Progression
  const foldPhase = interpolate(localFrame, [0, 120, 240, 264], [0, 1, 2, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Continuous 3D spatial rotation
  const rotY = interpolate(localFrame, [0, 264], [-8, 28], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const rotX = interpolate(localFrame, [0, 264], [12, -10], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  // Camera push-in
  const cameraZ = interpolate(localFrame, [0, 240, 264], [0, 120, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: PALETTE.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1400,
        perspectiveOrigin: "50% 50%",
        overflow: "hidden",
      }}
    >
      {/* 3D Isometric Folding Monolith Stage */}
      <div
        style={{
          width: 960,
          height: 1540,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `scale(${beatPulse}) translateZ(${cameraZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformOrigin: "center center",
        }}
      >
        {/* Facet 1: Center Front Facing (img4) */}
        <div
          style={{
            position: "absolute",
            width: 580,
            height: 940,
            left: 190,
            top: 300,
            borderRadius: 16,
            overflow: "hidden",
            border: `2px solid ${PALETTE.black}`,
            boxShadow: "0 30px 80px rgba(9, 9, 11, 0.15)",
            transform: `translateZ(${interpolate(localFrame, [0, 120], [0, 80])}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img4)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 70%" }}
          />
          {/* Terracotta vector boundary accent */}
          <div
            style={{
              position: "absolute",
              inset: 12,
              border: `1px dashed ${PALETTE.terracotta}`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Facet 2: Left Flap Origami Fold (img3 motion blur) */}
        <div
          style={{
            position: "absolute",
            width: 440,
            height: 820,
            left: 40,
            top: 360,
            borderRadius: 14,
            overflow: "hidden",
            border: `2px solid ${PALETTE.black}`,
            boxShadow: "0 20px 60px rgba(9, 9, 11, 0.12)",
            transformOrigin: "right center",
            transform: `rotateY(${interpolate(localFrame, [0, 140], [0, 48])}deg) translateZ(-40px)`,
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img3)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Facet 3: Right Flap Origami Fold (img5 lens flare) */}
        <div
          style={{
            position: "absolute",
            width: 440,
            height: 820,
            right: 40,
            top: 360,
            borderRadius: 14,
            overflow: "hidden",
            border: `2px solid ${PALETTE.black}`,
            boxShadow: "0 20px 60px rgba(9, 9, 11, 0.12)",
            transformOrigin: "left center",
            transform: `rotateY(${interpolate(localFrame, [0, 140], [0, -48])}deg) translateZ(-40px)`,
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img5)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Hairline geometric connection vectors connecting the 3 facets */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transform: "translateZ(100px)",
          }}
        >
          <line
            x1={190}
            y1={300}
            x2={40 + 440}
            y2={360}
            stroke={PALETTE.cobalt}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <line
            x1={190 + 580}
            y1={300}
            x2={960 - 40 - 440}
            y2={360}
            stroke={PALETTE.terracotta}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Monospaced Technical Telemetry */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          fontFamily: "'Inter', monospace",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: PALETTE.black,
        }}
      >
        [02_ORIGAMI_3D] ROT_Y: {rotY.toFixed(1)}° // ROT_X: {rotX.toFixed(1)}°
      </div>
    </div>
  );
};
