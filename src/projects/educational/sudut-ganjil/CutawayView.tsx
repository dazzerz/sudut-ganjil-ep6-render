import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { EpisodeSegment } from "./scenes";

interface CutawayViewProps {
  segment: EpisodeSegment;
  frameInSegment: number;
}

export const CutawayView: React.FC<CutawayViewProps> = ({
  segment,
  frameInSegment,
}) => {
  // Smooth, cinematic slow Ken Burns drift (1.0 to 1.05)
  const zoom = interpolate(
    frameInSegment,
    [0, segment.duration_frames],
    [1.0, 1.05],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateRight: "clamp",
    }
  );

  const panY = interpolate(
    frameInSegment,
    [0, segment.duration_frames],
    [0, -12],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateRight: "clamp",
    }
  );

  const fadeIn = interpolate(frameInSegment, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        opacity: fadeIn,
        overflow: "hidden",
        backgroundColor: "#0d0e12",
      }}
    >
      {/* 1. Full-Bleed 16:9 Landscape Plate (No cards, no boxes, edge-to-edge) */}
      <Img
        src={staticFile(segment.bg_image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom}) translateY(${panY}px)`,
          transformOrigin: "center center",
        }}
      />

      {/* 2. Cinematic Ambient Lighting & Subtitle Readability Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 28%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.3) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Subtle Character Tint Accent in Corner */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            segment.character === "raka"
              ? "radial-gradient(circle, rgba(255, 209, 102, 0.06) 0%, rgba(0,0,0,0) 70%)"
              : "radial-gradient(circle, rgba(0, 242, 254, 0.06) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
