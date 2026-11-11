import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BroadcastHUD } from "./BroadcastHUD";
import { CutawayView } from "./CutawayView";
import { FloatingSubtitles } from "./FloatingSubtitles";
import { EPISODE_SEGMENTS, TOTAL_FRAMES } from "./scenes";
import { StudioCameraView } from "./StudioCameraView";

export const SudutGanjilEp1: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active segment
  const activeSegmentIndex = EPISODE_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 12
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EPISODE_SEGMENTS[activeSegmentIndex]
      : EPISODE_SEGMENTS[EPISODE_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);

  // Auto-ducking BGM volume (subtle, warm lo-fi groove)
  const isIntro = frame < 60;
  const isOutro = frame > TOTAL_FRAMES - 90;
  const bgmVolume = isIntro || isOutro ? 0.22 : 0.12;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {/* Visual Layer */}
      {activeSegment.visual_type === "cutaway" ? (
        <CutawayView
          segment={activeSegment}
          frameInSegment={frameInSegment}
        />
      ) : (
        <StudioCameraView
          segment={activeSegment}
          frameInSegment={frameInSegment}
        />
      )}

      {/* Broadcast Header HUD */}
      <BroadcastHUD currentSegment={activeSegment} frame={frame} />

      {/* Floating Kinetic Subtitles (Strictly Anti-Card/Anti-Box, 100% Canvas Placement) */}
      <FloatingSubtitles
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* Audio Layer - All Dialogue Voiceovers from Google AI Studio Gemini 3.8 Flash TTS */}
      {EPISODE_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.start_frame}
          durationInFrames={seg.duration_frames}
        >
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* Backsound: Chill Lo-Fi Acoustic Bed (Incompetech Chill, 320kbps) */}
      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={bgmVolume}
      />
    </AbsoluteFill>
  );
};
