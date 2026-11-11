import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
} from "remotion";
import { ShortSegment } from "./types";

interface ShortsCameraViewProps {
  segment: ShortSegment;
  frameInSegment: number;
}

export const ShortsCameraView: React.FC<ShortsCameraViewProps> = ({
  segment,
  frameInSegment,
}) => {
  const vType = segment.visual_type;

  // Dynamic smooth punch-in + subtle Ken Burns drift (safe bounds, never crops faces)
  const pushIn = interpolate(
    frameInSegment,
    [0, segment.duration_frames],
    [1.0, 1.08],
    {
      easing: Easing.bezier(0.22, 0.1, 0.25, 1),
      extrapolateRight: "clamp",
    }
  );

  // Micro breathing pan (tiny +/- 8px drift so image stays alive every second)
  const driftY = Math.sin(frameInSegment / 24) * 6;

  // Crisp entry snap (3 frames fast transition instead of slow fade)
  const fadeIn = interpolate(frameInSegment, [0, 4], [0.6, 1], {
    extrapolateRight: "clamp",
  });

  // Always prefer the explicit native 9:16 vertical bg_image defined in the segment
  let imageSrc = segment.bg_image;
  const objectPos = "center center";

  if (vType === "studio_raka" && !imageSrc) {
    imageSrc = "images/sudut-ganjil/studio_raka_vertical.jpg";
  } else if (vType === "studio_nara" && !imageSrc) {
    imageSrc = "images/sudut-ganjil/studio_nara_vertical.jpg";
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: 1080,
        height: 1920,
        opacity: fadeIn,
        overflow: "hidden",
        backgroundColor: "#0A0A0C",
      }}
    >
      <Img
        src={staticFile(imageSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: objectPos,
          transformOrigin: "center center",
          transform: `scale(${pushIn}) translateY(${driftY}px)`,
        }}
      />

      {/* Balanced Contrast Gradient for Cardless Floating Text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(8,8,10,0.88) 0%, rgba(8,8,10,0.35) 32%, rgba(8,8,10,0.05) 55%, rgba(8,8,10,0.68) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
