import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface Stylized3DDetectiveProps {
  pose?: "investigating" | "pointing" | "shocked";
  scale?: number;
}

export const Stylized3DDetective: React.FC<Stylized3DDetectiveProps> = ({
  scale = 1,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing / idle micro-motion
  const breathY = Math.sin((frame / 30) * Math.PI * 1.2) * 5;
  const breathScale = 1 + Math.sin((frame / 30) * Math.PI * 1.2) * 0.008;

  // Eyeball micro-movement (observing the scene)
  const eyeShiftX = interpolate(
    frame % 90,
    [0, 20, 45, 65, 90],
    [0, 3, 3, -2, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "relative",
        width: 620 * scale,
        height: 920 * scale,
        transform: `translateY(${breathY}px) scale(${breathScale})`,
        transformOrigin: "bottom center",
        filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.75))",
      }}
    >
      <svg
        viewBox="0 0 600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* Volumetric Shading Gradients */}
          {/* Skin tones */}
          <radialGradient id="faceGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFE4C7" />
            <stop offset="65%" stopColor="#F7C49C" />
            <stop offset="100%" stopColor="#DF9364" />
          </radialGradient>
          <linearGradient id="neckGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C97F4F" />
            <stop offset="100%" stopColor="#F7C49C" />
          </linearGradient>

          {/* Hair 3D Volumetric */}
          <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A3324" />
            <stop offset="50%" stopColor="#291A12" />
            <stop offset="100%" stopColor="#140C07" />
          </linearGradient>
          <radialGradient id="hairHighlight" cx="35%" cy="25%" r="50%">
            <stop offset="0%" stopColor="#7E583E" />
            <stop offset="70%" stopColor="#3A2417" />
            <stop offset="100%" stopColor="#1E110A" />
          </radialGradient>

          {/* Fedora Detective Hat */}
          <linearGradient id="hatBrim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4452" />
            <stop offset="100%" stopColor="#1F252E" />
          </linearGradient>
          <linearGradient id="hatCrown" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#485566" />
            <stop offset="60%" stopColor="#272F3B" />
            <stop offset="100%" stopColor="#151A22" />
          </linearGradient>
          <linearGradient id="hatRibbon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4A017" />
            <stop offset="50%" stopColor="#F6C343" />
            <stop offset="100%" stopColor="#9E740B" />
          </linearGradient>

          {/* Detective Trench Coat */}
          <linearGradient id="coatGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2E3744" />
            <stop offset="55%" stopColor="#1B212A" />
            <stop offset="100%" stopColor="#10141A" />
          </linearGradient>
          <linearGradient id="coatLapel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3F4B5C" />
            <stop offset="100%" stopColor="#181E26" />
          </linearGradient>
          <linearGradient id="sweaterGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D49A3D" />
            <stop offset="65%" stopColor="#A26C1C" />
            <stop offset="100%" stopColor="#69430A" />
          </linearGradient>

          {/* Brass Magnifying Glass */}
          <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="35%" stopColor="#E5B942" />
            <stop offset="70%" stopColor="#9B6C14" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <radialGradient id="lensGlass" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgba(215, 248, 255, 0.55)" />
            <stop offset="70%" stopColor="rgba(90, 200, 255, 0.25)" />
            <stop offset="100%" stopColor="rgba(25, 140, 230, 0.65)" />
          </radialGradient>

          {/* Eye Iris Gradient */}
          <radialGradient id="eyeIris" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#56CFE1" />
            <stop offset="55%" stopColor="#0096C7" />
            <stop offset="100%" stopColor="#03045E" />
          </radialGradient>

          {/* Soft Blur Filter */}
          <filter id="softShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="0" dy="6" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================= 1. BACK HAIR ================= */}
        <path
          d="M 185 240 C 175 140 300 110 415 140 C 425 240 405 310 405 310 L 185 310 Z"
          fill="url(#hairGrad)"
        />

        {/* ================= 2. TORSO & COAT ================= */}
        <g filter="url(#softShadow)">
          {/* Main Body */}
          <path
            d="M 120 540 C 120 480 200 450 300 450 C 400 450 480 480 480 540 L 520 900 L 80 900 Z"
            fill="url(#coatGrad)"
          />

          {/* Turtleneck Sweater */}
          <path
            d="M 230 400 C 230 380 265 370 300 370 C 335 370 370 380 370 400 L 370 490 C 340 505 260 505 230 490 Z"
            fill="url(#sweaterGrad)"
          />
          <path
            d="M 240 420 C 275 432 325 432 360 420"
            stroke="#69430A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 238 450 C 275 464 325 464 362 450"
            stroke="#69430A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Coat Lapels */}
          <path
            d="M 195 470 L 255 470 L 220 640 L 155 560 Z"
            fill="url(#coatLapel)"
          />
          <path
            d="M 405 470 L 345 470 L 380 640 L 445 560 Z"
            fill="url(#coatLapel)"
          />

          {/* Center Seam & Brass Buttons */}
          <line
            x1="300"
            y1="500"
            x2="300"
            y2="900"
            stroke="#0F1318"
            strokeWidth="4"
          />
          <circle cx="300" cy="560" r="9" fill="#E5B942" stroke="#9B6C14" strokeWidth="2" />
          <circle cx="300" cy="650" r="9" fill="#E5B942" stroke="#9B6C14" strokeWidth="2" />
          <circle cx="300" cy="740" r="9" fill="#E5B942" stroke="#9B6C14" strokeWidth="2" />

          {/* Gold Detective Badge */}
          <path
            d="M 190 520 L 214 515 L 220 545 L 202 560 L 186 545 Z"
            fill="url(#brassGrad)"
            stroke="#684507"
            strokeWidth="1.5"
          />
        </g>

        {/* ================= 3. NECK ================= */}
        <path
          d="M 260 350 L 260 405 C 280 415 320 415 340 405 L 340 350 Z"
          fill="url(#neckGrad)"
        />

        {/* ================= 4. HEAD BASE ================= */}
        <g filter="url(#softShadow)">
          {/* Ears */}
          <ellipse cx="185" cy="285" rx="16" ry="24" fill="#F7C49C" />
          <ellipse cx="185" cy="285" rx="10" ry="16" fill="#DF9364" />
          <ellipse cx="415" cy="285" rx="16" ry="24" fill="#F7C49C" />
          <ellipse cx="415" cy="285" rx="10" ry="16" fill="#DF9364" />

          {/* Face Oval */}
          <path
            d="M 195 240 C 195 140 405 140 405 240 C 405 340 355 385 300 385 C 245 385 195 340 195 240 Z"
            fill="url(#faceGrad)"
          />

          {/* Soft Cheeks */}
          <circle cx="230" cy="300" r="24" fill="#E27866" opacity="0.3" />
          <circle cx="370" cy="300" r="24" fill="#E27866" opacity="0.3" />

          {/* Nose */}
          <path
            d="M 292 285 C 295 300 305 300 308 285"
            stroke="#BD6A38"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <ellipse cx="300" cy="292" rx="5" ry="3" fill="#D98A58" opacity="0.5" />

          {/* Mouth (Clever Smirk) */}
          <path
            d="M 278 335 C 295 346 318 342 332 328"
            stroke="#662215"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* ================= 5. EYES & BROWS ================= */}
          {/* Left Eye */}
          <g>
            <ellipse cx="245" cy="255" rx="24" ry="20" fill="#FFFFFF" />
            <circle cx={245 + eyeShiftX} cy="255" r="13" fill="url(#eyeIris)" />
            <circle cx={245 + eyeShiftX} cy="255" r="7" fill="#0A1118" />
            {/* Catchlight */}
            <circle cx={241 + eyeShiftX} cy="250" r="4.5" fill="#FFFFFF" />
            <circle cx={248 + eyeShiftX} cy="258" r="2" fill="#FFFFFF" opacity="0.8" />
            {/* Eyelid */}
            <path
              d="M 220 250 C 235 238 258 238 272 250"
              stroke="#211510"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Eyebrow */}
            <path
              d="M 215 228 C 235 214 262 218 274 230"
              stroke="#261710"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          {/* Right Eye */}
          <g>
            <ellipse cx="355" cy="255" rx="24" ry="20" fill="#FFFFFF" />
            <circle cx={355 + eyeShiftX} cy="255" r="13" fill="url(#eyeIris)" />
            <circle cx={355 + eyeShiftX} cy="255" r="7" fill="#0A1118" />
            {/* Catchlight */}
            <circle cx={351 + eyeShiftX} cy="250" r="4.5" fill="#FFFFFF" />
            <circle cx={358 + eyeShiftX} cy="258" r="2" fill="#FFFFFF" opacity="0.8" />
            {/* Eyelid */}
            <path
              d="M 328 250 C 342 238 365 238 380 250"
              stroke="#211510"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Eyebrow (Inquisitive raised arch) */}
            <path
              d="M 326 224 C 345 208 375 212 385 222"
              stroke="#261710"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ================= 6. FRONT HAIR FRINGE (Above eyes) ================= */}
        <g filter="url(#softShadow)">
          <path
            d="M 195 200 C 220 185 245 195 260 215 C 280 185 320 180 345 210 C 365 190 395 195 405 210 C 405 170 380 150 300 150 C 220 150 195 170 195 200 Z"
            fill="url(#hairHighlight)"
          />
        </g>

        {/* ================= 7. DETECTIVE FEDORA HAT ================= */}
        <g filter="url(#softShadow)">
          {/* Hat Crown */}
          <path
            d="M 210 160 C 205 70 250 40 300 45 C 350 40 395 70 390 160 Z"
            fill="url(#hatCrown)"
          />
          {/* Crown Dent */}
          <path
            d="M 260 55 C 285 75 315 75 340 55"
            stroke="#151A22"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Golden Ribbon Band */}
          <path
            d="M 207 145 C 250 155 350 155 393 145 L 395 160 C 350 170 250 170 205 160 Z"
            fill="url(#hatRibbon)"
          />

          {/* Hat Brim */}
          <ellipse cx="300" cy="165" rx="145" ry="25" fill="url(#hatBrim)" />
          {/* Brim Highlight Curve */}
          <path
            d="M 170 168 C 230 182 370 182 430 168"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* ================= 8. BRASS MAGNIFYING GLASS ================= */}
        <g
          style={{
            transform: `translate(380px, 480px) rotate(${
              -10 + Math.sin((frame / 30) * Math.PI) * 4
            }deg)`,
            transformOrigin: "40px 180px",
          }}
          filter="url(#softShadow)"
        >
          {/* Handle */}
          <rect
            x="32"
            y="120"
            width="16"
            height="95"
            rx="6"
            fill="#3E200C"
            stroke="#1E0E04"
            strokeWidth="2"
          />
          <rect x="29" y="110" width="22" height="15" rx="3" fill="url(#brassGrad)" />
          <circle cx="40" cy="220" r="9" fill="url(#brassGrad)" />

          {/* Outer Brass Ring */}
          <circle
            cx="40"
            cy="45"
            r="68"
            fill="none"
            stroke="url(#brassGrad)"
            strokeWidth="14"
          />

          {/* Glass Lens */}
          <circle cx="40" cy="45" r="60" fill="url(#lensGlass)" />
          {/* Reflection Arch */}
          <path
            d="M -2 28 C 10 5 45 0 72 8"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="20" cy="62" r="5" fill="#FFFFFF" opacity="0.65" />

          {/* Hand Holding Handle */}
          <g>
            <ellipse cx="25" cy="140" rx="15" ry="11" fill="#F7C49C" stroke="#BD6A38" strokeWidth="2" />
            <ellipse cx="23" cy="162" rx="15" ry="11" fill="#F7C49C" stroke="#BD6A38" strokeWidth="2" />
            <ellipse cx="25" cy="184" rx="15" ry="11" fill="#F7C49C" stroke="#BD6A38" strokeWidth="2" />
            {/* Thumb */}
            <path
              d="M 45 142 C 55 148 55 170 42 175 Z"
              fill="#FFE4C7"
              stroke="#BD6A38"
              strokeWidth="2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};