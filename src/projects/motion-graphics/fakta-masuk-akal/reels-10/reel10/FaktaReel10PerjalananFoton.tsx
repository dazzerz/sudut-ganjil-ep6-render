import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { KineticSubtitlesReel10 } from "./components/KineticSubtitlesReel10";
import { ScientificBadgeReel10 } from "./components/ScientificBadgeReel10";
import { SolarPhotonHUD } from "./components/SolarPhotonHUD";
import { SolarRandomWalkSimulation } from "./components/SolarRandomWalkSimulation";

export const FaktaReel10PerjalananFoton: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = interpolate(frame, [0, 900, 1800], [1.0, 1.05, 1.02], {
    extrapolateRight: "clamp",
  });
  const cameraY = interpolate(frame, [0, 900, 1800], [0, -20, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030408",
        overflow: "hidden",
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile("audio/fakta-masuk-akal/reels/vo_reel10_foton.mp3")} />

      {/* Main Visual Plate with camera drift */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: "50% 50%",
        }}
      >
        <SolarRandomWalkSimulation />
      </div>

      {/* Solar & Relativistic Telemetry HUD */}
      <SolarPhotonHUD />

      {/* Kinetic Subtitles */}
      <KineticSubtitlesReel10 />

      {/* Scientific Authority Badge */}
      <ScientificBadgeReel10 />
    </AbsoluteFill>
  );
};
