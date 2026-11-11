import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ElectricFieldHUD } from "./components/ElectricFieldHUD";
import { KineticSubtitlesReel7 } from "./components/KineticSubtitlesReel7";
import { ScientificBadgeReel7 } from "./components/ScientificBadgeReel7";
import { UpwardLightningSimulation } from "./components/UpwardLightningSimulation";

export const FaktaReel7Petir: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle cinematic camera drift
  const cameraScale = interpolate(frame, [0, 900, 1800], [1.0, 1.05, 1.02], {
    extrapolateRight: "clamp",
  });
  const cameraY = interpolate(frame, [0, 900, 1800], [0, -25, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030611",
        overflow: "hidden",
      }}
    >
      {/* Voiceover Track */}
      <Audio src={staticFile("audio/fakta-masuk-akal/reels/vo_reel7_petir.mp3")} />

      {/* Main Visual Container with smooth camera drift */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: "50% 60%",
        }}
      >
        <UpwardLightningSimulation />
      </div>

      {/* Atmospheric Electric HUD */}
      <ElectricFieldHUD />

      {/* Kinetic Floating Subtitles */}
      <KineticSubtitlesReel7 />

      {/* Scientific Authority Badge */}
      <ScientificBadgeReel7 />
    </AbsoluteFill>
  );
};
