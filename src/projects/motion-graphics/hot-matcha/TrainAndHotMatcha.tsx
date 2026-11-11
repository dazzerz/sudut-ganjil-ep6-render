import React from "react";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { DynamicPhotoLayer } from "./DynamicPhotoLayer";
import { KineticLyricsV2 } from "./KineticLyricsV2";
import { FilmOverlays } from "./FilmOverlays";

export const TrainAndHotMatcha: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#000000",
        overflow: "hidden",
      }}
    >
      {/* 1. High-Energy Beat-Synced Photo Layer */}
      <DynamicPhotoLayer frame={frame} />

      {/* 2. Aesthetic Retro Viewfinder HUD & Dust Particles */}
      <FilmOverlays frame={frame} />

      {/* 3. Kinetic Typography V2 (Synced to Beat & Syllables) */}
      <KineticLyricsV2 frame={frame} />

      {/* 4. Frame-Accurate Soundtrack */}
      <Audio
        src={staticFile("audio/train_and_hot_matcha_cut.mp3")}
        volume={1.0}
      />
    </div>
  );
};
