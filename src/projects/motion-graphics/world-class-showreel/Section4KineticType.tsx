import React from "react";
import { Img, interpolate, staticFile, Easing } from "remotion";
import { PALETTE, USER_ASSETS } from "./types";

interface SectionProps {
  frame: number; // 792 to 1056
}

export const Section4KineticType: React.FC<SectionProps> = ({ frame }) => {
  const localFrame = frame - 792; // 0 to 264

  // 100 BPM drum pulse
  const beatProgress = (localFrame % 18) / 18;
  const beatPulse = interpolate(beatProgress, [0, 0.15, 1], [1.04, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Vertical scroll counter-motion for lines
  const lineScroll1 = interpolate(localFrame, [0, 264], [0, -180]);
  const lineScroll2 = interpolate(localFrame, [0, 264], [-120, 40]);
  const lineScroll3 = interpolate(localFrame, [0, 264], [40, -140]);

  // Transform evolution from lines into text blocks
  const morphProgress = interpolate(localFrame, [0, 40], [0, 1], {
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Subtle Photo Monolith */}
      <div
        style={{
          position: "absolute",
          inset: 80,
          opacity: 0.18,
          filter: "grayscale(100%) contrast(150%)",
          overflow: "hidden",
          borderRadius: 24,
          border: `1.5px solid ${PALETTE.black}`,
        }}
      >
        <Img
          src={staticFile(USER_ASSETS.img2)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Kinetic Typography Architecture */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "0 60px",
          zIndex: 20,
          transform: `scale(${beatPulse})`,
          transformOrigin: "center center",
        }}
      >
        {/* Row 1: Massive Bold Heading */}
        <div
          style={{
            overflow: "hidden",
            height: 140,
            display: "flex",
            alignItems: "center",
            transform: `translateX(${lineScroll1}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: PALETTE.black,
              whiteSpace: "nowrap",
              display: "flex",
              gap: 24,
            }}
          >
            {localFrame < 130 ? (
              <>
                <span>GIVE ME</span>
                <span style={{ color: PALETTE.terracotta }}>THE BARISTA</span>
                <span>GIVE ME</span>
                <span style={{ color: PALETTE.terracotta }}>THE BARISTA</span>
              </>
            ) : (
              <>
                <span>COMPLAIN</span>
                <span style={{ color: PALETTE.cobalt }}>MISS THE TRAIN</span>
                <span>COMPLAIN</span>
                <span style={{ color: PALETTE.cobalt }}>MISS THE TRAIN</span>
              </>
            )}
          </div>
        </div>

        {/* Row 2: Masked Photo Fill Typography */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 220,
            overflow: "hidden",
            borderRadius: 16,
            border: `2px solid ${PALETTE.black}`,
            backgroundColor: PALETTE.black,
          }}
        >
          {/* Photo inside text container */}
          <Img
            src={staticFile(localFrame < 130 ? USER_ASSETS.img4 : USER_ASSETS.img5)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 70%",
              opacity: 0.85,
            }}
          />
          {/* Overlay Typography */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 136,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: PALETTE.white,
                WebkitTextStroke: `3px ${PALETTE.black}`,
                textShadow: "0 10px 40px rgba(0,0,0,0.5)",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {localFrame < 130 ? "HOT MATCHA" : "MISS THE TRAIN"}
            </span>
          </div>
        </div>

        {/* Row 3: Bold Editorial Subtext */}
        <div
          style={{
            overflow: "hidden",
            height: 120,
            display: "flex",
            alignItems: "center",
            transform: `translateX(${lineScroll3}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 105,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: PALETTE.terracotta,
              whiteSpace: "nowrap",
              display: "flex",
              gap: 30,
            }}
          >
            {localFrame < 130 ? (
              <>
                <span>DARN IT!</span>
                <span style={{ color: PALETTE.matcha }}>EXTRA ICE</span>
                <span>DARN IT!</span>
                <span style={{ color: PALETTE.matcha }}>EXTRA ICE</span>
              </>
            ) : (
              <>
                <span>LOOK SO LAME</span>
                <span style={{ color: PALETTE.matcha }}>FOR MY CHANCE</span>
                <span>LOOK SO LAME</span>
                <span style={{ color: PALETTE.matcha }}>FOR MY CHANCE</span>
              </>
            )}
          </div>
        </div>

        {/* Technical Sub-label Hairline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${PALETTE.black}`,
            paddingTop: 16,
            fontFamily: "'Inter', monospace",
            fontSize: 16,
            fontWeight: 800,
            color: PALETTE.black,
          }}
        >
          <span>[TRACK_04] VOCAL_STEM</span>
          <span style={{ color: PALETTE.terracotta }}>BPM: 100.00</span>
          <span>WEIRD_GENIUS × GURAISU</span>
        </div>
      </div>

      {/* Monospaced Technical Telemetry Header */}
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
        [04_KINETIC_TYPE] ARCHITECTURE // 04_STEMS
      </div>
    </div>
  );
};
