import React from "react";
import { Img, interpolate, staticFile, Easing } from "remotion";
import { PALETTE, USER_ASSETS, easeOutExpo, easeInOutCubic } from "./types";

interface SectionProps {
  frame: number; // 0 to 264
}

export const Section1ShapeMorph: React.FC<SectionProps> = ({ frame }) => {
  // Beat pulses on every 18 frames
  const beatProgress = (frame % 18) / 18;
  const beatPulse = interpolate(beatProgress, [0, 0.2, 1], [1.025, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 1: Frame 0 - 72 (Square expansion from center, seamless from frame 1320 loop)
  const squareScale = 1;

  const squareWidth = interpolate(frame, [0, 72], [140, 920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const squareHeight = interpolate(frame, [0, 72], [140, 1480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Phase 2: Frame 72 - 160 (Planar split into diptych)
  const splitOffset = interpolate(frame, [72, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Phase 3: Frame 160 - 264 (Diptych recombines & shifts forward into monolithic card)
  const recombineProgress = interpolate(frame, [160, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Hand-painted sweep over the card
  const paintStrokeOffset = interpolate(frame, [90, 140], [1000, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Continuous camera drift
  const cameraZ = interpolate(frame, [0, 264], [1, 1.08]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: PALETTE.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transform: `scale(${cameraZ * beatPulse})`,
        transformOrigin: "center center",
      }}
    >
      {/* Background Architectural Grid Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(9, 9, 11, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9, 9, 11, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.7,
        }}
      />

      {/* Primary Morphing Frame */}
      {frame < 72 ? (
        // The expanding geometric boundary
        <div
          style={{
            width: squareWidth,
            height: squareHeight,
            border: `2px solid ${PALETTE.black}`,
            position: "relative",
            overflow: "hidden",
            borderRadius: interpolate(frame, [0, 72], [0, 16]),
            transform: `scale(${squareScale})`,
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img1)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${interpolate(frame, [0, 72], [1.3, 1.05])})`,
            }}
          />
          {/* Hairline corner crosshairs */}
          <div style={{ position: "absolute", top: 12, left: 12, width: 14, height: 14, borderTop: `2px solid ${PALETTE.terracotta}`, borderLeft: `2px solid ${PALETTE.terracotta}` }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 14, height: 14, borderTop: `2px solid ${PALETTE.terracotta}`, borderRight: `2px solid ${PALETTE.terracotta}` }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 14, height: 14, borderBottom: `2px solid ${PALETTE.terracotta}`, borderLeft: `2px solid ${PALETTE.terracotta}` }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 14, height: 14, borderBottom: `2px solid ${PALETTE.terracotta}`, borderRight: `2px solid ${PALETTE.terracotta}` }} />
        </div>
      ) : frame < 200 ? (
        // Diptych Splitting Panes (Left & Right / Top & Bottom)
        <div
          style={{
            position: "relative",
            width: 940,
            height: 1520,
            display: "flex",
            flexDirection: "column",
            gap: interpolate(splitOffset, [0, 1], [0, 24]),
          }}
        >
          {/* Top Panel */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              borderRadius: 16,
              border: `2px solid ${PALETTE.black}`,
              transform: `translateY(${interpolate(splitOffset, [0, 1], [0, -30])}px)`,
              position: "relative",
            }}
          >
            <Img
              src={staticFile(USER_ASSETS.img2)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Painted Terracotta Vector Accent */}
            <svg
              viewBox="0 0 400 100"
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 260,
                height: 60,
                pointerEvents: "none",
              }}
            >
              <path
                d="M 10 50 Q 80 10, 150 50 T 290 50"
                fill="none"
                stroke={PALETTE.terracotta}
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={400}
                strokeDashoffset={paintStrokeOffset}
              />
            </svg>
          </div>

          {/* Bottom Panel */}
          <div
            style={{
              height: interpolate(splitOffset, [0, 1], [0, 640]),
              overflow: "hidden",
              borderRadius: 16,
              border: `2px solid ${PALETTE.black}`,
              transform: `translateY(${interpolate(splitOffset, [0, 1], [0, 20])}px)`,
              position: "relative",
            }}
          >
            <Img
              src={staticFile(USER_ASSETS.img4)}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 70%" }}
            />
          </div>
        </div>
      ) : (
        // Monolithic Card prepped for 3D Origami fold (handoff to Section 2)
        <div
          style={{
            width: 920,
            height: 1480,
            borderRadius: 18,
            overflow: "hidden",
            border: `2px solid ${PALETTE.black}`,
            transform: `scale(${interpolate(recombineProgress, [0, 1], [0.96, 1])})`,
            position: "relative",
          }}
        >
          <Img
            src={staticFile(USER_ASSETS.img1)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Floating Monospaced Coordinate Watermark */}
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
        [01_SHAPE_MORPH] SEC_01 // 100_BPM
      </div>
    </div>
  );
};
