import React from "react";
import { Img, interpolate, staticFile } from "remotion";

interface PhotoSlideProps {
  photoPath: string;
  frameInSlide: number;
  slideDuration: number;
  direction?: "zoom-in" | "zoom-out" | "pan-right" | "pan-left";
  withFlash?: boolean;
}

export const PhotoSlide: React.FC<PhotoSlideProps> = ({
  photoPath,
  frameInSlide,
  slideDuration,
  direction = "zoom-in",
  withFlash = false,
}) => {
  // Ken Burns subtle scale & translate
  let scale = 1.05;
  let translateX = 0;
  let translateY = 0;

  const progress = interpolate(frameInSlide, [0, slideDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (direction === "zoom-in") {
    scale = interpolate(progress, [0, 1], [1.03, 1.12]);
  } else if (direction === "zoom-out") {
    scale = interpolate(progress, [0, 1], [1.14, 1.04]);
  } else if (direction === "pan-right") {
    scale = 1.08;
    translateX = interpolate(progress, [0, 1], [-20, 20]);
  } else if (direction === "pan-left") {
    scale = 1.08;
    translateX = interpolate(progress, [0, 1], [20, -20]);
  }

  // Micro handheld camera drift
  const subtleShakeY = Math.sin(frameInSlide * 0.12) * 3;
  const subtleShakeX = Math.cos(frameInSlide * 0.09) * 2;

  // Beat flash at transition
  const flashOpacity = withFlash
    ? interpolate(frameInSlide, [0, 8], [0.65, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        overflow: "hidden",
        backgroundColor: "#0d0d0f",
      }}
    >
      {/* 1. Ambient Blurred Background */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 1200,
          height: 2040,
          filter: "blur(45px) brightness(0.45) saturate(1.4)",
          transform: `scale(${scale * 1.1})`,
          transformOrigin: "center center",
          opacity: 0.85,
        }}
      >
        <Img
          src={staticFile(photoPath)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 2. Main Sharp Hero Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 1080,
            height: 1920,
            overflow: "hidden",
            transform: `scale(${scale}) translate(${translateX + subtleShakeX}px, ${translateY + subtleShakeY}px)`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile(photoPath)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "contrast(1.06) saturate(1.08)",
            }}
          />
        </div>
      </div>

      {/* 3. Aesthetic Vignette & Dark Gradients (Top & Bottom for text readability) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.45) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 18%, transparent 68%, rgba(0,0,0,0.85) 100%)
          `,
        }}
      />

      {/* 4. Beat Flash Overlay */}
      {withFlash && flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 1920,
            pointerEvents: "none",
            backgroundColor: "#FFFFFF",
            opacity: flashOpacity,
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
};
