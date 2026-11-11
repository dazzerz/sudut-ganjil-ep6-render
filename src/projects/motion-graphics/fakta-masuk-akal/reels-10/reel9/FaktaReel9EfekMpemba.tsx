import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { KineticSubtitlesReel9 } from "./components/KineticSubtitlesReel9";
import { ScientificBadgeReel9 } from "./components/ScientificBadgeReel9";
import { ThermodynamicsHUD } from "./components/ThermodynamicsHUD";
import { WaterCrystallizationSimulation } from "./components/WaterCrystallizationSimulation";

export const FaktaReel9EfekMpemba: React.FC = () => {
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
        backgroundColor: "#020813",
        overflow: "hidden",
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile("audio/fakta-masuk-akal/reels/vo_reel9_mpemba.mp3")} />

      {/* Main Visual Plate with camera drift */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: "50% 50%",
        }}
      >
        <WaterCrystallizationSimulation />
      </div>

      {/* Thermodynamics & Molecular HUD */}
      <ThermodynamicsHUD />

      {/* Kinetic Subtitles */}
      <KineticSubtitlesReel9 />

      {/* Scientific Authority Badge */}
      <ScientificBadgeReel9 />
    </AbsoluteFill>
  );
};
