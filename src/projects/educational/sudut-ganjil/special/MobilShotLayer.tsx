import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export interface MobilShotConfig {
  id: string;
  scene: number;
  image: string;
  startFrame: number;
  durationInFrames: number;
  panDirection?: "zoom-in" | "zoom-out" | "pan-left" | "pan-right";
}

export const MobilShotLayer: React.FC<{ shot: MobilShotConfig }> = ({ shot }) => {
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
  translateY = Math.sin(f / 45) * 3;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        opacity,
        overflow: "hidden",
        backgroundColor: "#06080F",
      }}
    >
      <Img
        src={staticFile(shot.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`,
          willChange: "transform, opacity",
        }}
      />

      {/* Cinematic vignette overlay untuk kontras teks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
