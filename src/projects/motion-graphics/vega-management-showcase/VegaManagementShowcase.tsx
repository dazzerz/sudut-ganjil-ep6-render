import React from "react";
import {
  Audio,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const VegaManagementShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // TIMING IN FRAMES (@ 30 FPS):
  // Clip 1 (Prompt Typing & Send): 0 to 384 (12.8s)
  // Clip 2 Step 1: 384 to 504 (4.0s)
  // Clip 2 Step 2: 504 to 624 (4.0s)
  // Clip 2 Step 3: 624 to 744 (4.0s)
  // Clip 2 Step 4: 744 to 864 (4.0s)
  // Clip 3 Stream Table: 864 to 1284 (14.0s)
  // Clip 4 Download & Final: 1284 to 1779 (16.5s)
  // Total: 1779 frames = 59.30 seconds (Max 1 minute)

  // Smooth Virtual Camera Rig applied directly to the authentic screen recording:
  // - 0 to 60: Wide overview (scale 1.0)
  // - 60 to 270: Smooth focus on prompt entry (scale 1.22, panX -30, panY -15)
  // - 270 to 360: Follow sent message bubble (scale 1.10, panY 25)
  // - 360 to 864: Focus on the 4 autonomous reasoning steps (scale 1.12, panY 25)
  // - 864 to 1284: Focus on table streaming (scale 1.12, panY 20)
  // - 1284 to 1620: Focus on PPTX download card & click (scale 1.20, panX -50, panY 35)
  // - 1620 to 1779: Eases back out to full wide overview (scale 1.0)

  const cameraScale = interpolate(
    frame,
    [0, 60, 160, 270, 360, 864, 1284, 1380, 1620, 1720, 1779],
    [1.0, 1.0, 1.22, 1.22, 1.10, 1.12, 1.12, 1.20, 1.20, 1.0, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    }
  );

  const cameraPanX = interpolate(
    frame,
    [0, 60, 160, 270, 360, 864, 1284, 1380, 1620, 1720, 1779],
    [0, 0, -30, -30, -15, -15, -15, -45, -45, 0, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    }
  );

  const cameraPanY = interpolate(
    frame,
    [0, 60, 160, 270, 360, 864, 1284, 1380, 1620, 1720, 1779],
    [0, 0, -15, -15, 25, 25, 20, 35, 35, 0, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    }
  );

  // Subtle clean fade out at the very end
  const opacity = interpolate(frame, [1745, 1778], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#181a1f",
        position: "relative",
        overflow: "hidden",
        opacity,
      }}
    >
      {/* Background Master Audio: Soft Groove Tech (-22 dB LUFS, speech ready, ZERO typing sound) */}
      <Audio
        src={staticFile("audio/vega_management_showcase_master_60s.mp3")}
      />

      {/* Virtual Camera Container for the Authentic Screen Recording Footage */}
      <div
        style={{
          width: 1920,
          height: 1080,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${cameraScale}) translate(${cameraPanX}px, ${cameraPanY}px)`,
          transformOrigin: "center center",
        }}
      >
        {/* Clip 1: Opening, Sped-up Prompt Typing, Send (0 - 384) */}
        <Sequence from={0} durationInFrames={384}>
          <OffthreadVideo
            src={staticFile("video/vega_real/real_clip1_prompt.mp4")}
            style={{ width: 1920, height: 1008 }}
          />
        </Sequence>

        {/* Clip 2 Step 1: Brief sudah jelas... (384 - 504) */}
        <Sequence from={384} durationInFrames={120}>
          <OffthreadVideo
            src={staticFile("video/vega_real/real_clip2_step1.mp4")}
            style={{ width: 1920, height: 1008 }}
          />
        </Sequence>

        {/* Clip 2 Step 2: Render SVG cover... (504 - 624) */}
        <Sequence from={504} durationInFrames={120}>
          <OffthreadVideo
            src={staticFile("video/vega_real/real_clip2_step2.mp4")}
            style={{ width: 1920, height: 1008 }}
          />
        </Sequence>

        {/* Clip 2 Step 3: Ilustrasi cover bagus... (624 - 744) */}
        <Sequence from={624} durationInFrames={120}>
          <OffthreadVideo
            src={staticFile("video/vega_real/real_clip2_step3.mp4")}
            style={{ width: 1920, height: 1008 }}
          />
        </Sequence>

        {/* Clip 2 Step 4: Semua 15 halaman diinspeksi... (744 - 864) */}
        <Sequence from={744} durationInFrames={120}>
          <OffthreadVideo
            src={staticFile("video/vega_real/real_clip2_step4.mp4")}
            style={{ width: 1920, height: 1008 }}
          />
        </Sequence>

        {/* Clip 3: Table Streaming (864 - 1284) */}
        <Sequence from={864} durationInFrames={420}>
          <OffthreadVideo
            src={staticFile("video/vega_real/real_clip3_stream.mp4")}
            style={{ width: 1920, height: 1008 }}
          />
        </Sequence>

        {/* Clip 4: Download Click & Final Screen (1284 - 1779) */}
        <Sequence from={1284} durationInFrames={495}>
          <OffthreadVideo
            src={staticFile("video/vega_real/real_clip4_download.mp4")}
            style={{ width: 1920, height: 1008 }}
          />
        </Sequence>
      </div>
    </div>
  );
};
