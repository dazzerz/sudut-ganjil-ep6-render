import React from "react";
import { Img, interpolate, staticFile, Easing } from "remotion";
import { PALETTE, USER_ASSETS } from "./types";

interface SectionProps {
  frame: number; // 1056 to 1320
}

export const Section5EndTitleLoop: React.FC<SectionProps> = ({ frame }) => {
  const localFrame = frame - 1056; // 0 to 264

  // Beat pulses
  const beatIndex = Math.floor(localFrame / 18);
  const beatProgress = (localFrame % 18) / 18;
  const beatPulse = interpolate(beatProgress, [0, 0.15, 1], [1.04, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Strobe cycling through user assets every 18 frames, resolving to img1 for the loop
  const photoKeys: (keyof typeof USER_ASSETS)[] = ["img1", "img4", "img2", "img5", "img3"];
  const currentPhoto =
    localFrame >= 210
      ? USER_ASSETS.img1
      : USER_ASSETS[photoKeys[beatIndex % photoKeys.length]];

  // Phase 1 (0 to 164): Strongest architectural climax moment
  // Phase 2 (164 to 210): End Title reveal
  // Phase 3 (210 to 264): Perfect Seamless Loop collapse to initial frame 0 square!

  // Final collapse to frame 0 square (size 140x140 at frame 264)
  const isCollapsingToLoop = localFrame >= 210;
  const loopCollapseProgress = interpolate(localFrame, [210, 264], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cardWidth = interpolate(loopCollapseProgress, [0, 1], [880, 140]);
  const cardHeight = interpolate(loopCollapseProgress, [0, 1], [1280, 140]);
  const cardBorderRadius = interpolate(loopCollapseProgress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: PALETTE.white,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Subtle Geometric Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(9, 9, 11, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9, 9, 11, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: interpolate(loopCollapseProgress, [0, 1], [0.7, 1]),
        }}
      />

      {/* Main Hero Card collapsing into the loop origin */}
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: cardBorderRadius,
          overflow: "hidden",
          border: `2px solid ${PALETTE.black}`,
          boxShadow: loopCollapseProgress > 0.8 ? "none" : "0 30px 90px rgba(9, 9, 11, 0.16)",
          position: "relative",
          transform: `scale(${loopCollapseProgress > 0 ? 1 : beatPulse})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile(currentPhoto)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Minimalist Editorial Corner Hairlines (fade out on collapse) */}
        {loopCollapseProgress < 0.5 && (
          <>
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 24,
                width: 24,
                height: 24,
                borderTop: `2px solid ${PALETTE.white}`,
                borderLeft: `2px solid ${PALETTE.white}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                width: 24,
                height: 24,
                borderTop: `2px solid ${PALETTE.white}`,
                borderRight: `2px solid ${PALETTE.white}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                width: 24,
                height: 24,
                borderBottom: `2px solid ${PALETTE.white}`,
                borderLeft: `2px solid ${PALETTE.white}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: 24,
                width: 24,
                height: 24,
                borderBottom: `2px solid ${PALETTE.white}`,
                borderRight: `2px solid ${PALETTE.white}`,
              }}
            />
          </>
        )}
      </div>

      {/* End Title Overlay (visible before collapse) */}
      {!isCollapsingToLoop && (
        <div
          style={{
            position: "absolute",
            bottom: 110,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: PALETTE.black,
              textTransform: "uppercase",
            }}
          >
            Train & Hot Matcha
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: PALETTE.matcha,
            }}
          >
            Weird Genius × Guraisu
          </div>
        </div>
      )}

      {/* Telemetry Header */}
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
        {"[05_LOOP_FINALE] SEAMLESS // LOOP_FRAME: 1320 -> 0000"}
      </div>
    </div>
  );
};
