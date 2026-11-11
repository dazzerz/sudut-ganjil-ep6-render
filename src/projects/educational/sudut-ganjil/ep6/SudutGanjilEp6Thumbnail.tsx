import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

interface Ep6ThumbnailProps {
  imageSrc?: string;
  setupLine?: string;
  heroWord?: string;
  badgeText?: string;
  annotationText?: string;
}

export const SudutGanjilEp6Thumbnail: React.FC<Ep6ThumbnailProps> = ({
  imageSrc = "images/sudut-ganjil/ep6/scene12_halaman_samping_bisikan.jpg",
  setupLine = "CUMA ANAK KOSAN,",
  heroWord = "GAK SELEVEL?!",
  badgeText = "DISINDIR KELUARGA!",
  annotationText = "Dengerin bisikannya...",
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

      {/* 2. CINEMATIC GRADIENT VIGNETTE ON LEFT (Contrast without hiding window silhouettes) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(6,8,14,0.74) 0%, rgba(6,8,14,0.52) 32%, rgba(6,8,14,0.18) 50%, rgba(6,8,14,0.02) 66%, rgba(6,8,14,0) 82%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom subtle shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 140,
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. DYNAMIC 3-TIER TEXT STACK (SLANTED -4deg) */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 72,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transform: "rotate(-4deg)",
          transformOrigin: "left center",
          zIndex: 30,
        }}
      >
        {/* TIER 1: SETUP LINE (Crisp White + Thick Black Stroke) */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            textTransform: "uppercase",
            WebkitTextStroke: "11px #0B0E14",
            paintOrder: "stroke fill",
            textShadow: "6px 6px 0px #000000, 10px 10px 20px rgba(0,0,0,0.85)",
            marginBottom: -2,
          }}
        >
          {setupLine}
        </div>

        {/* TIER 2: HERO IMPACT WORD (Bright Warning Yellow #FFE600) */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#FFE600",
            letterSpacing: "-0.035em",
            lineHeight: 0.96,
            textTransform: "uppercase",
            WebkitTextStroke: "14px #0B0E14",
            paintOrder: "stroke fill",
            textShadow:
              "8px 8px 0px #000000, 12px 12px 25px rgba(0,0,0,0.9)",
            marginBottom: 20,
          }}
        >
          {heroWord}
        </div>

        {/* TIER 3: SLANTED CRIMSON RIBBON STAMP */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#E61919",
            padding: "9px 26px 11px 26px",
            borderRadius: 8,
            border: "3.5px solid #FFFFFF",
            boxShadow:
              "5px 5px 0px #000000, 0 8px 18px rgba(0,0,0,0.75)",
            transform: "rotate(-1.5deg)",
          }}
        >
          <span
            style={{
              fontSize: 44,
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

      {/* 4. HANDWRITTEN ANNOTATION POINTING TO WHISPERING WINDOW */}
      <div
        style={{
          position: "absolute",
          top: 74,
          left: 450,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 35,
          pointerEvents: "none",
          transform: "rotate(-2deg)",
        }}
      >
        <span
          style={{
            fontFamily: '"Segoe Print", "Ink Free", "Caveat", cursive, sans-serif',
            fontSize: 34,
            fontWeight: 800,
            fontStyle: "italic",
            color: "#FFFFFF",
            textShadow:
              "0 0 8px #000000, 2px 2px 0 #000000, -2px -2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000",
            marginBottom: 2,
          }}
        >
          {annotationText}
        </span>
        <svg width="68" height="54" viewBox="0 0 68 54" fill="none">
          <path
            d="M 22 6 Q 36 22 50 44"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 32 42 L 52 46 L 52 24"
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
