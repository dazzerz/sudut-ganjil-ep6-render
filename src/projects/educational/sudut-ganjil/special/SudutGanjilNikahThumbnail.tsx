import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

interface ThumbnailProps {
  imageSrc?: string;
  titleLine1?: string;
  titleLine2?: string;
}

export const SudutGanjilNikahThumbnail: React.FC<ThumbnailProps> = ({
  imageSrc = "images/sudut-ganjil/nikah-gedung/wedding_fair_gaun_brosur.jpg",
  titleLine1 = "POV: GAJI 5 JUTA",
  titleLine2 = "NEKAT NIKAH GEDUNG",
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        width: 1920,
        height: 1080,
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* 1. VISUAL PLATE (LOWER 75%) */}
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />

        {/* Crisp subtle shadow at top edge to give depth */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* 2. TOP WHITE BANNER & MASSIVE NCEK-STYLE TITLE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 270,
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          borderBottom: "3px solid #111111",
        }}
      >
        <h1
          style={{
            margin: 0,
            padding: 0,
            fontFamily:
              '"Arial Black", "Impact", "Inter", -apple-system, sans-serif',
            fontSize: 104,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          <div>{titleLine1}</div>
          <div>{titleLine2}</div>
        </h1>
      </div>

      {/* 3. HANDWRITTEN ANNOTATIONS & ARROWS (NCEK INVEST TRADEMARK) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        {/* Annotation 1: Pointing to Raka ("Kamu ↘") */}
        <div
          style={{
            position: "absolute",
            top: 410,
            left: 1000,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: '"Segoe Print", "Ink Free", "Caveat", cursive, sans-serif',
              fontSize: 48,
              fontWeight: 700,
              fontStyle: "italic",
              color: "#111111",
              textShadow:
                "0 0 14px #FFFFFF, 0 0 24px #FFFFFF, 2px 2px 0 #FFFFFF, -2px -2px 0 #FFFFFF",
            }}
          >
            Kamu
          </span>
          <svg width="65" height="60" viewBox="0 0 65 60" fill="none">
            {/* Arrow curving down-right to Raka's sweating forehead */}
            <path
              d="M 10 12 Q 38 18 52 50"
              stroke="#111111"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 32 48 L 54 52 L 52 30"
              stroke="#111111"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Annotation 2: Pointing to Nara ("Calon Istri ↙") */}
        <div
          style={{
            position: "absolute",
            top: 450,
            left: 1540,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg width="65" height="60" viewBox="0 0 65 60" fill="none">
            {/* Arrow curving down-left to Nara */}
            <path
              d="M 55 12 Q 28 18 14 50"
              stroke="#111111"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 14 30 L 12 52 L 34 48"
              stroke="#111111"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span
            style={{
              fontFamily: '"Segoe Print", "Ink Free", "Caveat", cursive, sans-serif',
              fontSize: 46,
              fontWeight: 700,
              fontStyle: "italic",
              color: "#111111",
              textShadow:
                "0 0 14px #FFFFFF, 0 0 24px #FFFFFF, 2px 2px 0 #FFFFFF, -2px -2px 0 #FFFFFF",
            }}
          >
            Calon Istri
          </span>
        </div>

        {/* Annotation 3: Pointing to the Luxury Gown ("Paket Gedung: 85 Jt ↗") */}
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 560,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontFamily: '"Segoe Print", "Ink Free", "Caveat", cursive, sans-serif',
              fontSize: 42,
              fontWeight: 800,
              fontStyle: "italic",
              color: "#D32F2F", // Red urgency
              textShadow:
                "0 0 14px #FFFFFF, 0 0 24px #FFFFFF, 2px 2px 0 #FFFFFF, -2px -2px 0 #FFFFFF",
              marginBottom: 4,
            }}
          >
            Paket Gedung: 85 Jt
          </span>
          <svg width="70" height="55" viewBox="0 0 70 55" fill="none">
            {/* Arrow pointing up-right towards the wedding gown mannequin */}
            <path
              d="M 15 45 Q 35 30 55 12"
              stroke="#D32F2F"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 38 10 L 58 10 L 56 30"
              stroke="#D32F2F"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
