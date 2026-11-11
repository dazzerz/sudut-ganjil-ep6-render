import React from "react";
import { Img, interpolate, staticFile, Easing } from "remotion";
import { SHOT_CUTS } from "./beatTimeline";
import { PHOTO_PATHS } from "./lyricsData";

interface DynamicPhotoLayerProps {
  frame: number;
}

export const DynamicPhotoLayer: React.FC<DynamicPhotoLayerProps> = ({ frame }) => {
  // Find current active shot
  const activeShotIndex = SHOT_CUTS.findIndex(
    (shot) => frame >= shot.startFrame && frame < shot.endFrame
  );

  const shot = activeShotIndex !== -1 ? SHOT_CUTS[activeShotIndex] : SHOT_CUTS[0];
  const photoPath = PHOTO_PATHS[shot.photoIndex] || PHOTO_PATHS[0];

  const frameInShot = frame - shot.startFrame;
  const shotDuration = shot.endFrame - shot.startFrame;
  const shotProgress = interpolate(frameInShot, [0, Math.max(1, shotDuration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 1. BEAT PULSE BUMP (Syncs with the 18-frame drum grid!)
  // Every 18 frames at 100 BPM is 1 beat
  const isChorus = frame >= 540;
  const beatPhase = (frame % 18 + 18) % 18; // 0 to 17
  const beatBump = interpolate(
    beatPhase,
    [0, 2, 7, 17],
    [isChorus ? 1.042 : 1.022, isChorus ? 1.028 : 1.012, 1.0, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 2. KEN BURNS ZOOM & PAN WITHIN THE SHOT
  const continuousZoom = interpolate(
    shotProgress,
    [0, 1],
    [shot.baseScale, shot.baseScale + shot.zoomSpeed]
  );

  // 3. TRANSITION MOTION (Whip / Snap / Shake on the cut!)
  let transitionX = 0;
  let transitionY = 0;
  let transitionScale = 1;
  let transitionRotate = 0;
  let flashOpacity = 0;

  const transFrames = Math.min(8, shotDuration);

  if (shot.transition === "whip-left") {
    transitionX = interpolate(frameInShot, [0, transFrames], [300, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    transitionRotate = interpolate(frameInShot, [0, transFrames], [-3.5, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (shot.transition === "whip-right") {
    transitionX = interpolate(frameInShot, [0, transFrames], [-300, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    transitionRotate = interpolate(frameInShot, [0, transFrames], [3.5, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (shot.transition === "zoom-snap") {
    transitionScale = interpolate(frameInShot, [0, transFrames], [1.18, 1.0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  } else if (shot.transition === "flash-drop") {
    // Drop flash + intense bass shake
    flashOpacity = interpolate(frameInShot, [0, 7], [0.75, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    transitionScale = interpolate(frameInShot, [0, 8], [1.16, 1.0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    // Camera impact shake
    if (frameInShot < 10) {
      const shakeDecay = (10 - frameInShot) / 10;
      transitionX = (Math.sin(frameInShot * 2.8) * 12) * shakeDecay;
      transitionY = (Math.cos(frameInShot * 3.2) * 10) * shakeDecay;
    }
  }

  // 4. HANDHELD MICRO-DRIFT
  const handheldX = Math.cos(frame * 0.08) * 3;
  const handheldY = Math.sin(frame * 0.11) * 3.5;

  // Final Composite Scale and Position
  const finalScale = continuousZoom * beatBump * transitionScale;
  const finalX = transitionX + handheldX;
  const finalY = transitionY + handheldY;
  const finalRotate = transitionRotate;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        backgroundColor: "#08080a",
        overflow: "hidden",
      }}
    >
      {/* 1. Ambient Blurred Layer Behind (No Black Bars) */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 1280,
          height: 2120,
          filter: "blur(50px) brightness(0.4) saturate(1.6)",
          transform: `scale(${finalScale * 1.15})`,
          transformOrigin: "center center",
          opacity: 0.9,
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

      {/* 2. Main Sharp Photo Layer */}
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
            transform: `scale(${finalScale}) translate(${finalX}px, ${finalY}px) rotate(${finalRotate}deg)`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <Img
            src={staticFile(photoPath)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: isChorus ? "contrast(1.1) saturate(1.15)" : "contrast(1.05) saturate(1.08)",
            }}
          />
        </div>
      </div>

      {/* 3. Aesthetic Film Vignette & Shadow Gradients */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.45) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 16%, transparent 68%, rgba(0,0,0,0.88) 100%)
          `,
        }}
      />

      {/* 4. Beat Transition Flash */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 1920,
            pointerEvents: "none",
            backgroundColor: "#FFFFFF",
            opacity: flashOpacity * 0.55,
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
};
