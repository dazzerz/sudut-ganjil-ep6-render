import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

interface ThumbnailProps {
  imageSrc?: string;
  setupLine?: string;
  heroWord?: string;
  badgeText?: string;
  annotationText?: string;
}

export const SudutGanjilMobilThumbnail: React.FC<ThumbnailProps> = ({
  imageSrc = "images/sudut-ganjil/kredit-mobil/thumbnail_plate.jpg",
  setupLine = "GAJI 6 JUTA NEKAT",
  heroWord = "KREDIT MOBIL!",
  badgeText = "DEMI GENGSI!",
  annotationText = "Minus 400 Rb/Bln! ↘",
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07090F",
        width: 1920,
        height: 1080,
        overflow: "hidden",
        fontFamily:
          '"Arial Black", "Impact", "Inter", -apple-system, sans-serif',
      }}
    >
      {/* 1. FULL-BLEED 16:9 ILLUSTRATION PLATE */}
      <AbsoluteFill>
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </AbsoluteFill>

      {/* 2. CINEMATIC GRADIENT VIGNETTE ON LEFT (Max contrast for text) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(6,8,14,0.96) 0%, rgba(6,8,14,0.88) 35%, rgba(6,8,14,0.52) 54%, rgba(6,8,14,0.12) 70%, rgba(6,8,14,0) 86%)",
          pointerEvents: "none",
        }}
      />

      {/* Top subtle vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. DYNAMIC 3-TIER TEXT STACK (SLANTED -4deg) */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 95,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transform: "rotate(-4deg)",
          transformOrigin: "left center",
          zIndex: 30,
        }}
      >
        {/* TIER 1: SETUP LINE (Crisp Clean White with Black Stroke) */}
        <div
          style={{
            fontSize: 78,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            textTransform: "uppercase",
            WebkitTextStroke: "12px #0B0E14",
            paintOrder: "stroke fill",
            textShadow: "6px 6px 0px #000000, 10px 10px 20px rgba(0,0,0,0.85)",
            marginBottom: -6,
          }}
        >
          {setupLine}
        </div>

        {/* TIER 2: HERO IMPACT WORD (Warm Radiant Golden Amber - Eye-catching & High CTR) */}
        <div
          style={{
            fontSize: 146,
            fontWeight: 900,
            color: "#FFDE1A",
            letterSpacing: "-0.035em",
            lineHeight: 0.95,
            textTransform: "uppercase",
            WebkitTextStroke: "15px #0B0E14",
            paintOrder: "stroke fill",
            textShadow:
              "8px 8px 0px #000000, 12px 12px 25px rgba(0,0,0,0.9)",
            marginBottom: 18,
          }}
        >
          {heroWord}
        </div>

        {/* TIER 3: SLANTED REFINED CRIMSON RIBBON BADGE */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#D92222",
            padding: "10px 28px 12px 28px",
            borderRadius: 8,
            border: "3.5px solid #FFFFFF",
            boxShadow:
              "5px 5px 0px #000000, 0 8px 18px rgba(0,0,0,0.75)",
            transform: "rotate(-1.5deg)",
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              WebkitTextStroke: "4px #000000",
              paintOrder: "stroke fill",
              textShadow: "2px 2px 0px #000000",
            }}
          >
            {badgeText}
          </span>
        </div>
      </div>

      {/* 4. HANDWRITTEN ANNOTATION (Shock Accent) */}
      <div
        style={{
          position: "absolute",
          top: 360,
          right: 680,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 35,
          pointerEvents: "none",
          transform: "rotate(6deg)",
        }}
      >
        <span
          style={{
            fontFamily: '"Segoe Print", "Ink Free", "Caveat", cursive, sans-serif',
            fontSize: 38,
            fontWeight: 800,
            fontStyle: "italic",
            color: "#FFFFFF",
            textShadow:
              "0 0 8px #000000, 2px 2px 0 #000000, -2px -2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000",
            marginBottom: -4,
          }}
        >
          {annotationText}
        </span>
        <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
          <path
            d="M 10 10 Q 30 20 48 40"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 28 40 L 50 42 L 48 20"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
