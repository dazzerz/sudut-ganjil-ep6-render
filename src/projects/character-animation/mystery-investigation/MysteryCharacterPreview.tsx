import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stylized3DDetective } from "./components/Stylized3DDetective";
import { MysteryMagnifierHUD } from "./components/MysteryMagnifierHUD";
import { DetectivePinboardHUD } from "./components/DetectivePinboardHUD";
import { MysterySubtitles } from "./components/MysterySubtitles";

export const MysteryCharacterPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Slow, cinematic camera push-in for suspense
  const cameraScale = interpolate(frame, [0, 300], [1, 1.06], {
    extrapolateRight: "clamp",
  });
  const cameraY = interpolate(frame, [0, 300], [0, -15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070B10",
        overflow: "hidden",
      }}
    >
      {/* ================= 1. 3D ENVIRONMENT BACKGROUND ================= */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("images/environments/indonesian_living_room_3d.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.65) contrast(1.15) saturate(0.9)",
          }}
        />

        {/* Cinematic Vignette & Mystery Lighting Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 45% 45%, rgba(0,0,0,0) 25%, rgba(7, 11, 16, 0.75) 80%, rgba(5, 8, 12, 0.95) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Cold Blue Mystery Mood Wash on the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 600,
            background:
              "linear-gradient(to top, rgba(7, 11, 16, 0.95) 0%, rgba(7, 11, 16, 0.6) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ================= 2. AMBIENT MYSTERY DUST PARTICLES ================= */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 15,
        }}
      >
        {[...Array(12)].map((_, i) => {
          const startX = 200 + ((i * 67) % 680);
          const startY = 300 + ((i * 113) % 900);
          const driftY = ((frame * (0.4 + (i % 3) * 0.2) + i * 40) % 900) - 200;
          const driftX = Math.sin((frame / 40) + i) * 15;
          const opacity = 0.2 + (Math.sin((frame / 20) + i) * 0.15 + 0.15);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: startX + driftX,
                top: startY - driftY,
                width: 3 + (i % 4),
                height: 3 + (i % 4),
                borderRadius: "50%",
                backgroundColor: i % 2 === 0 ? "#FFE600" : "#00F0FF",
                boxShadow: `0 0 10px ${i % 2 === 0 ? "#FFE600" : "#00F0FF"}`,
                opacity,
              }}
            />
          );
        })}
      </div>

      {/* ================= 3. CLUE MAGNIFIER HUD ON COFFEE TABLE ================= */}
      {/* Targeting the book & coffee table area where the clue is hidden */}
      <MysteryMagnifierHUD
        x={360}
        y={1220}
        label="BUKU CATATAN RAHASIA"
        sublabel="ADA HALAMAN TERROBEK PUKUL 21:00"
      />

      {/* ================= 4. STYLIZED 3D DETECTIVE CHARACTER ================= */}
      {/* Positioned on the right foreground examining the room */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: -30,
          zIndex: 35,
        }}
      >
        <Stylized3DDetective scale={1.05} pose="investigating" />
      </div>

      {/* ================= 5. TOP CASE & INVESTIGATION HUD ================= */}
      <DetectivePinboardHUD />

      {/* ================= 6. SUSPENSEFUL KINETIC SUBTITLES ================= */}
      <MysterySubtitles />
    </AbsoluteFill>
  );
};