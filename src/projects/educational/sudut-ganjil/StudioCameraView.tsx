import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
} from "remotion";
import { EpisodeSegment } from "./scenes";

interface StudioCameraViewProps {
  segment: EpisodeSegment;
  frameInSegment: number;
}

export const StudioCameraView: React.FC<StudioCameraViewProps> = ({
  segment,
  frameInSegment,
}) => {
  const vType = segment.visual_type;

  // Multi-cam parameters: Wide, Raka close, Nara close
  let scaleStart = 1.0;
  let scaleEnd = 1.05;
  let txStart = 0;
  let txEnd = 0;
  let ty = 0;

  if (vType === "studio_raka") {
    scaleStart = 1.25;
    scaleEnd = 1.31;
    txStart = 180;
    txEnd = 205;
    ty = 40;
  } else if (vType === "studio_nara") {
    scaleStart = 1.25;
    scaleEnd = 1.31;
    txStart = -180;
    txEnd = -205;
    ty = 40;
  }

  const currentScale = interpolate(
    frameInSegment,
    [0, segment.duration_frames],
    [scaleStart, scaleEnd],
    {
      easing: Easing.bezier(0.2, 0.1, 0.25, 1),
      extrapolateRight: "clamp",
    }
  );

  const currentTx = interpolate(
    frameInSegment,
    [0, segment.duration_frames],
    [txStart, txEnd],
    {
      easing: Easing.bezier(0.2, 0.1, 0.25, 1),
      extrapolateRight: "clamp",
    }
  );

  // Micro dissolve on cut (4 frames) for broadcast smoothness
  const cutDissolve = interpolate(frameInSegment, [0, 4], [0.85, 1], {
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
        overflow: "hidden",
        backgroundColor: "#0d0e12",
        opacity: cutDissolve,
      }}
    >
      <Img
        src={staticFile("images/sudut-ganjil/studio_wide.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: "center center",
          transform: `scale(${currentScale}) translate(${currentTx}px, ${ty}px)`,
        }}
      />

      {/* Subtle Studio Warm Lighting Bloom */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(255, 180, 80, 0.08) 0%, rgba(0,0,0,0) 65%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
