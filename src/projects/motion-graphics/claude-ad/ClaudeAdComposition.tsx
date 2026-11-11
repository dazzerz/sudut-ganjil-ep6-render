import React from "react";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { MultiImageLayout, LayoutConfig } from "./MultiImageLayout";
import { ClaudeTypography } from "./ClaudeTypography";
import { ClaudeOutro } from "./ClaudeOutro";

// Scene layout configuration schedule
interface SceneSchedule {
  startFrame: number;
  endFrame: number;
  config: LayoutConfig;
}

const SCENE_SCHEDULE: SceneSchedule[] = [
  // Scene 1: Single Hero (Intro)
  {
    startFrame: 0,
    endFrame: 90,
    config: {
      mode: "single-hero",
      images: ["images/hot_matcha/img1_wide_yellow_mirror.jpg"],
      sparkProps: { size: 140, color: "#D97757", glow: true, x: 22, y: 18 },
      paintedVariant: "intro-brush",
      paintedColor: "#D97757",
    },
  },
  // Scene 2: Split Diptych (2 user images at once!)
  {
    startFrame: 90,
    endFrame: 270,
    config: {
      mode: "split-diptych",
      images: [
        "images/hot_matcha/img2_wide_angle_pose.jpg",
        "images/hot_matcha/img3_motion_blur_vibe.jpg",
      ],
      sparkProps: { size: 160, color: "#D97757", glow: true, x: 50, y: 48 },
      paintedVariant: "tape-accents",
    },
  },
  // Scene 3: Trio 3D Floating (3 user images in 3D perspective!)
  {
    startFrame: 270,
    endFrame: 450,
    config: {
      mode: "trio-3d-floating",
      images: [
        "images/hot_matcha/img4_close_cute_pose.jpg",
        "images/hot_matcha/img5_lens_flare_sharp.jpg",
        "images/hot_matcha/img1_wide_yellow_mirror.jpg",
      ],
      sparkProps: { size: 180, color: "#D97757", glow: true, x: 50, y: 22 },
      paintedVariant: "circle-highlight",
      paintedColor: "#D97757",
    },
  },
  // Scene 4: Single Hero Pre-drop Tension (Motion blur vibe)
  {
    startFrame: 450,
    endFrame: 540,
    config: {
      mode: "single-hero",
      images: ["images/hot_matcha/img3_motion_blur_vibe.jpg"],
      sparkProps: { size: 180, color: "#D97757", glow: true, x: 78, y: 20 },
      paintedVariant: "circle-highlight",
      paintedColor: "#D97757",
    },
  },
  // Scene 5: Quad Bento Grid (Chorus Drop! 4 distinct user images)
  {
    startFrame: 540,
    endFrame: 702,
    config: {
      mode: "quad-bento",
      images: [
        "images/hot_matcha/img1_wide_yellow_mirror.jpg",
        "images/hot_matcha/img4_close_cute_pose.jpg",
        "images/hot_matcha/img3_motion_blur_vibe.jpg",
        "images/hot_matcha/img5_lens_flare_sharp.jpg",
      ],
      sparkProps: { size: 120, color: "#D97757", glow: true, x: 50, y: 50 },
    },
  },
  // Scene 6: Split Diptych (Extra Ice)
  {
    startFrame: 702,
    endFrame: 810,
    config: {
      mode: "split-diptych",
      images: [
        "images/hot_matcha/img5_lens_flare_sharp.jpg",
        "images/hot_matcha/img3_motion_blur_vibe.jpg",
      ],
      sparkProps: { size: 150, color: "#0284C7", glow: true, x: 80, y: 24 },
      paintedVariant: "tape-accents",
    },
  },
  // Scene 7: Trio 3D Floating (Dammit Barista)
  {
    startFrame: 810,
    endFrame: 954,
    config: {
      mode: "trio-3d-floating",
      images: [
        "images/hot_matcha/img2_wide_angle_pose.jpg",
        "images/hot_matcha/img4_close_cute_pose.jpg",
        "images/hot_matcha/img1_wide_yellow_mirror.jpg",
      ],
      sparkProps: { size: 170, color: "#D97757", glow: true, x: 50, y: 22 },
      paintedVariant: "circle-highlight",
      paintedColor: "#D97757",
    },
  },
  // Scene 8: Single Hero (Train & Lame)
  {
    startFrame: 954,
    endFrame: 1116,
    config: {
      mode: "single-hero",
      images: ["images/hot_matcha/img2_wide_angle_pose.jpg"],
      sparkProps: { size: 160, color: "#D97757", glow: true, x: 22, y: 20 },
      paintedVariant: "scribble-wave",
      paintedColor: "#D97757",
    },
  },
  // Scene 9: Staccato Strobe (Rapid 1-Beat Outro Switch with all 5 user images)
  {
    startFrame: 1116,
    endFrame: 1210,
    config: {
      mode: "staccato-strobe",
      images: [
        "images/hot_matcha/img1_wide_yellow_mirror.jpg",
        "images/hot_matcha/img2_wide_angle_pose.jpg",
        "images/hot_matcha/img3_motion_blur_vibe.jpg",
        "images/hot_matcha/img4_close_cute_pose.jpg",
        "images/hot_matcha/img5_lens_flare_sharp.jpg",
      ],
    },
  },
];

export const TOTAL_CLAUDE_AD_FRAMES = 1320; // 44.0 seconds at 30 fps

export const ClaudeAdComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active scene schedule
  const activeScene = SCENE_SCHEDULE.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  ) || SCENE_SCHEDULE[0];

  const frameInScene = frame - activeScene.startFrame;
  const sceneDuration = activeScene.endFrame - activeScene.startFrame;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* 1. Multi-Image Spatial Layout (Single, Split, 3D Trio, Bento, Strobe) */}
      <MultiImageLayout
        frame={frame}
        frameInScene={frameInScene}
        sceneDuration={sceneDuration}
        config={activeScene.config}
      />

      {/* 2. Bold High-Fashion Kinetic Typography (Lyrics + Claude Palette) */}
      <ClaudeTypography frame={frame} />

      {/* 3. The Grand Finale: Pristine Claude Logo Ending (Frame 1210 to 1320) */}
      <ClaudeOutro frame={frame} startFrame={1210} />

      {/* 4. Frame-Accurate Soundtrack: Weird Genius & Guraisu - Train & Hot Matcha */}
      <Audio
        src={staticFile("audio/train_and_hot_matcha_cut.mp3")}
        volume={1.0}
      />
    </div>
  );
};
