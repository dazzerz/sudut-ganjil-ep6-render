import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export interface ShotConfig {
  id: string;
  scene: number;
  image: string;
  startFrame: number;
  durationInFrames: number;
  panDirection?: "zoom-in" | "zoom-out" | "pan-left" | "pan-right";
}

export const NikahShotLayer: React.FC<{ shot: ShotConfig }> = ({ shot }) => {
  const frame = useCurrentFrame();

  if (frame < shot.startFrame - 15 || frame > shot.startFrame + shot.durationInFrames + 15) {
    return null;
  }

  const f = frame - shot.startFrame;

  // Transisi dissolve halus masuk & keluar
  const fadeIn = interpolate(f, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(
    f,
    [shot.durationInFrames - 15, shot.durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Kamera sinematik continuous motion
  const dir = shot.panDirection || "zoom-in";
  let scale = 1.0;
  let translateX = 0;
  let translateY = 0;

  if (dir === "zoom-in") {
    scale = interpolate(f, [0, shot.durationInFrames], [1.02, 1.09], {
      extrapolateRight: "clamp",
    });
  } else if (dir === "zoom-out") {
    scale = interpolate(f, [0, shot.durationInFrames], [1.09, 1.02], {
      extrapolateRight: "clamp",
    });
  } else if (dir === "pan-left") {
    scale = 1.06;
    translateX = interpolate(f, [0, shot.durationInFrames], [20, -20], {
      extrapolateRight: "clamp",
    });
  } else if (dir === "pan-right") {
    scale = 1.06;
    translateX = interpolate(f, [0, shot.durationInFrames], [-20, 20], {
      extrapolateRight: "clamp",
    });
  }

  // Subtle breathing vertical drift
  translateY = Math.sin((f / 30) * Math.PI * 0.3) * 3;

  return (
    <AbsoluteFill
      style={{
        opacity,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <Img
        src={staticFile(shot.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          filter: "contrast(1.05) saturate(1.08) brightness(0.98)",
        }}
      />

      {/* Partikel suasana / vignette sinematik halus */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};
