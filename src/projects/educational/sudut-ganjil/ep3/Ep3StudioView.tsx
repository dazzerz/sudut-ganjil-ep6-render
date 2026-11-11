import React from "react";
import { interpolate, staticFile } from "remotion";

interface Ep3StudioViewProps {
  speaker: "raka" | "nara";
  frameInSegment: number;
  durationFrames: number;
}

export const Ep3StudioView: React.FC<Ep3StudioViewProps> = ({
  speaker,
  frameInSegment,
  durationFrames,
}) => {
  // Cinematic camera move: slight push-in and subtle pan toward current active speaker
  const scale = interpolate(
    frameInSegment,
    [0, Math.max(durationFrames, 30)],
    [1.0, 1.05],
    { extrapolateRight: "clamp" }
  );

  // Pan subtly: left for Raka, right for Nara
  const targetX = speaker === "raka" ? 18 : -18;
  const panX = interpolate(
    frameInSegment,
    [0, Math.max(durationFrames, 30)],
    [0, targetX],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0A0A0C",
      }}
    >
      <img
        src={staticFile("images/sudut-ganjil/studio_wide.jpg")}
        alt="Studio Sudut Ganjil"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${panX}px)`,
        }}
      />

      {/* Atmospheric lighting overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, rgba(255, 120, 60, 0.08) 0%, rgba(10, 10, 14, 0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
