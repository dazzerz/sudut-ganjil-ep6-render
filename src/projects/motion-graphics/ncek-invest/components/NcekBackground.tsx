import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface NcekBackgroundProps {
  scene: 1 | 2 | 3 | 4;
}

export const NcekBackground: React.FC<NcekBackgroundProps> = ({ scene }) => {
  const frame = useCurrentFrame();

  // Subtle camera drift
  const scale = interpolate(frame, [0, 1650], [1, 1.05], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <svg
        viewBox="0 0 1080 1920"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyTeras" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="wallKos" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          <linearGradient id="floorKeramik" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          <linearGradient id="laptopGlow" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="dollarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* 1. Dinding Teras Kosan Minimalis */}
        <rect width="1080" height="1300" fill="url(#wallKos)" />

        {/* Garis-garis tekstur dinding / lis plester */}
        <line x1="0" y1="350" x2="1080" y2="350" stroke="#94A3B8" strokeWidth="2" strokeDasharray="8 8" />
        <line x1="0" y1="700" x2="1080" y2="700" stroke="#94A3B8" strokeWidth="2" strokeDasharray="8 8" />

        {/* Jendela Kosan dengan Teralis Khas Indonesia */}
        <g opacity="0.85">
          <rect x="120" y="280" width="340" height="480" rx="12" fill="#1E293B" stroke="#475569" strokeWidth="10" />
          {/* Kaca dengan pantulan langit sore */}
          <rect x="135" y="295" width="310" height="450" fill="url(#skyTeras)" />
          {/* Teralis besi putih */}
          <line x1="212" y1="295" x2="212" y2="745" stroke="#FFFFFF" strokeWidth="6" opacity="0.6" />
          <line x1="290" y1="295" x2="290" y2="745" stroke="#FFFFFF" strokeWidth="6" opacity="0.6" />
          <line x1="368" y1="295" x2="368" y2="745" stroke="#FFFFFF" strokeWidth="6" opacity="0.6" />
          <line x1="135" y1="445" x2="445" y2="445" stroke="#FFFFFF" strokeWidth="6" opacity="0.6" />
          <line x1="135" y1="595" x2="445" y2="595" stroke="#FFFFFF" strokeWidth="6" opacity="0.6" />
        </g>

        {/* Meteran Listrik Token PLN di Dinding Khas Kosan */}
        <g opacity="0.9">
          <rect x="820" y="320" width="130" height="190" rx="10" fill="#334155" stroke="#1E293B" strokeWidth="4" />
          <rect x="840" y="340" width="90" height="45" rx="4" fill="#0284C7" />
          {/* Angka KWH meteran */}
          <text x="850" y="370" fill="#E0F2FE" fontSize="20" fontFamily="monospace" fontWeight="bold">0482.1</text>
          {/* Lampu indikator hijau */}
          <circle cx="855" cy="410" r="5" fill="#22C55E" />
          {/* Tombol-tombol keypad meteran */}
          <circle cx="855" cy="445" r="4" fill="#64748B" />
          <circle cx="885" cy="445" r="4" fill="#64748B" />
          <circle cx="915" cy="445" r="4" fill="#64748B" />
          <circle cx="855" cy="475" r="4" fill="#64748B" />
          <circle cx="885" cy="475" r="4" fill="#64748B" />
          <circle cx="915" cy="475" r="4" fill="#64748B" />
        </g>

        {/* Tanaman Hias Lidah Mertua di Pojok Teras */}
        <g opacity="0.95">
          {/* Pot Terracotta */}
          <polygon points="80,1260 190,1260 170,1400 100,1400" fill="#B45309" stroke="#78350F" strokeWidth="4" />
          {/* Daun-daun Sansiviera */}
          <path d="M 110 1260 Q 95 1050 120 900 Q 145 1050 135 1260 Z" fill="#15803D" stroke="#14532D" strokeWidth="3" />
          <path d="M 135 1260 Q 150 1000 160 850 Q 175 1000 160 1260 Z" fill="#16A34A" stroke="#14532D" strokeWidth="3" />
          <path d="M 160 1260 Q 190 1080 185 960 Q 170 1100 165 1260 Z" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
        </g>

        {/* 2. Lantai Keramik Kosan Motif Kotak 30x30 */}
        <rect y="1260" width="1080" height="660" fill="url(#floorKeramik)" />
        {/* Garis Nat Keramik Kotak */}
        <line x1="0" y1="1260" x2="1080" y2="1260" stroke="#334155" strokeWidth="6" />
        <line x1="0" y1="1380" x2="1080" y2="1380" stroke="#475569" strokeWidth="3" />
        <line x1="0" y1="1520" x2="1080" y2="1520" stroke="#475569" strokeWidth="3" />
        <line x1="0" y1="1680" x2="1080" y2="1680" stroke="#475569" strokeWidth="3" />
        <line x1="0" y1="1850" x2="1080" y2="1850" stroke="#475569" strokeWidth="3" />

        <line x1="180" y1="1260" x2="180" y2="1920" stroke="#475569" strokeWidth="3" />
        <line x1="380" y1="1260" x2="380" y2="1920" stroke="#475569" strokeWidth="3" />
        <line x1="580" y1="1260" x2="580" y2="1920" stroke="#475569" strokeWidth="3" />
        <line x1="780" y1="1260" x2="780" y2="1920" stroke="#475569" strokeWidth="3" />
        <line x1="980" y1="1260" x2="980" y2="1920" stroke="#475569" strokeWidth="3" />

        {/* Sandal Jepit Swallow Hijau di Lantai */}
        <g opacity="0.9" transform="translate(140, 1420) rotate(-15)">
          {/* Sol Kiri */}
          <ellipse cx="60" cy="100" rx="22" ry="50" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
          <path d="M 50 85 L 60 70 L 70 85" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          {/* Sol Kanan */}
          <ellipse cx="120" cy="98" rx="22" ry="50" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
          <path d="M 110 83 L 120 68 L 130 83" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* Meja Belajar Kayu Sederhana di Kanan */}
        <g opacity="0.95">
          {/* Daun Meja */}
          <rect x="620" y="1180" width="460" height="40" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="3" />
          {/* Kaki Meja */}
          <rect x="660" y="1220" width="24" height="260" fill="#78350F" />
          <rect x="1010" y="1220" width="24" height="260" fill="#78350F" />

          {/* Laptop Tua di Meja */}
          <polygon points="760,1180 940,1180 960,1150 780,1150" fill="#475569" stroke="#1E293B" strokeWidth="2" />
          <polygon points="790,1150 930,1150 910,1030 810,1030" fill="#0F172A" stroke="#334155" strokeWidth="3" />
          {/* Layar Laptop Menyala */}
          <polygon points="796,1146 924,1146 906,1036 814,1036" fill="#38BDF8" opacity="0.75" />
          {/* Pendaran Cahaya Layar Laptop */}
          <polygon points="730,1260 990,1260 920,1140 800,1140" fill="url(#laptopGlow)" />

          {/* Gelas Kopi Kaca Belimbing dengan Kopi Hitam */}
          <ellipse cx="715" cy="1165" rx="14" ry="7" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
          <rect x="701" y="1145" width="28" height="24" fill="#3E2723" opacity="0.9" />
          <ellipse cx="715" cy="1145" rx="14" ry="6" fill="#1C1008" />
          {/* Uap Panas Kopi Halus */}
          <path d="M 712 1135 Q 716 1120 710 1105" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <path d="M 720 1132 Q 724 1118 718 1102" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
};