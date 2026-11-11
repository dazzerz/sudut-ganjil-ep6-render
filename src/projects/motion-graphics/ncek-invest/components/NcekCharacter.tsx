import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface NcekCharacterProps {
  expression?: "chill" | "smirk" | "focused" | "wise";
  scale?: number;
}

export const NcekCharacter: React.FC<NcekCharacterProps> = ({
  expression = "chill",
  scale = 1,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing animation
  const breathY = Math.sin((frame / 30) * Math.PI * 1.5) * 4;
  const breathScale = 1 + Math.sin((frame / 30) * Math.PI * 1.5) * 0.006;

  // Eyeball micro shift
  const eyeShift = Math.sin((frame / 45) * Math.PI) * 2;

  return (
    <div
      style={{
        position: "relative",
        width: 480 * scale,
        height: 620 * scale,
        transform: `translateY(${breathY}px) scale(${breathScale})`,
        transformOrigin: "bottom center",
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))",
      }}
    >
      <svg
        viewBox="0 0 500 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFDFC4" />
            <stop offset="100%" stopColor="#F0BE9A" />
          </linearGradient>

          <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2D3139" />
            <stop offset="100%" stopColor="#181A20" />
          </linearGradient>

          <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A5568" />
            <stop offset="100%" stopColor="#2D3748" />
          </linearGradient>

          <linearGradient id="glasses" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Kaos Oblong Santai (Torso) */}
        <path
          d="M 120 420 C 130 380 200 370 250 370 C 300 370 370 380 380 420 L 410 650 L 90 650 Z"
          fill="url(#shirt)"
        />
        {/* Kerah Kaos Oblong Bulat */}
        <path
          d="M 200 370 C 210 395 290 395 300 370"
          stroke="#1A202C"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Leher */}
        <path
          d="M 215 310 L 215 375 C 235 385 265 385 285 375 L 285 310 Z"
          fill="url(#skin)"
        />

        {/* Kepala & Wajah Gaya Kartun Minimalis Relatable */}
        {/* Telinga */}
        <circle cx="160" cy="245" r="18" fill="url(#skin)" stroke="#D49A76" strokeWidth="2" />
        <circle cx="340" cy="245" r="18" fill="url(#skin)" stroke="#D49A76" strokeWidth="2" />

        {/* Wajah Oval Bulat Friendly */}
        <rect
          x="165"
          y="150"
          width="170"
          height="185"
          rx="75"
          fill="url(#skin)"
          stroke="#D49A76"
          strokeWidth="3"
        />

        {/* Rambut Belah Samping Simpel Khas Pemuda Lokal */}
        <path
          d="M 160 190 C 155 120 220 100 280 105 C 330 110 355 140 345 200 C 330 150 280 140 230 150 C 190 158 175 175 160 190 Z"
          fill="url(#hair)"
        />

        {/* Alis Relatable (Tenang / Sedikit Senyum Percaya Diri) */}
        <path
          d="M 190 205 Q 210 198 225 204"
          stroke="#181A20"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 275 204 Q 290 198 310 205"
          stroke="#181A20"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Kacamata Bulat Gaya Tech/Remote Worker */}
        {/* Frame Kiri */}
        <circle cx="210" cy="235" r="24" fill="rgba(255,255,255,0.2)" stroke="#1A202C" strokeWidth="4" />
        {/* Frame Kanan */}
        <circle cx="290" cy="235" r="24" fill="rgba(255,255,255,0.2)" stroke="#1A202C" strokeWidth="4" />
        {/* Jembatan Kacamata */}
        <line x1="234" y1="235" x2="266" y2="235" stroke="#1A202C" strokeWidth="4" />

        {/* Mata di Balik Kacamata */}
        <circle cx={210 + eyeShift} cy="235" r="5" fill="#1A202C" />
        <circle cx={212 + eyeShift} cy="233" r="1.8" fill="#FFFFFF" />

        <circle cx={290 + eyeShift} cy="235" r="5" fill="#1A202C" />
        <circle cx={292 + eyeShift} cy="233" r="1.8" fill="#FFFFFF" />

        {/* Hidung Garis Minimalis */}
        <path
          d="M 248 245 Q 252 260 245 264"
          stroke="#C57E56"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Mulut: Senyum Kalem (Nggak Perlu Debat, Silent Wealth) */}
        <path
          d="M 232 284 Q 250 296 268 284"
          stroke="#8A3D22"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Sedikit Blush Pipi Tipis */}
        <ellipse cx="185" cy="260" rx="10" ry="6" fill="#F87171" opacity="0.3" />
        <ellipse cx="315" cy="260" rx="10" ry="6" fill="#F87171" opacity="0.3" />
      </svg>
    </div>
  );
};