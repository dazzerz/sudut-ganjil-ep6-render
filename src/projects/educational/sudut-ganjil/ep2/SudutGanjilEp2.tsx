import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Ep2BroadcastHUD } from "./Ep2BroadcastHUD";
import { Ep2FlashbackView } from "./Ep2FlashbackView";
import { Ep2FloatingSubtitles } from "./Ep2FloatingSubtitles";
import { Ep2RewindOverlay } from "./Ep2RewindOverlay";
import { Ep2StudioView } from "./Ep2StudioView";
import { EP2_SEGMENTS, EP2_TOTAL_FRAMES } from "./ep2_scenes";

export const SudutGanjilEp2: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active segment
  const activeSegmentIndex = EP2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 8
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP2_SEGMENTS[activeSegmentIndex]
      : frame < EP2_SEGMENTS[0].start_frame
      ? EP2_SEGMENTS[0]
      : EP2_SEGMENTS[EP2_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);

  // Dynamic BGM Volume Ducking
  const isIntro = frame < 60;
  const isOutro = frame > EP2_TOTAL_FRAMES - 90;
  const bgmVolume = isIntro || isOutro ? 0.22 : 0.12;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {/* 1. VISUAL LAYER */}
      {activeSegment.visual_type === "flashback" ? (
        <Ep2FlashbackView
          bgImage={activeSegment.bg_image}
          frameInSegment={frameInSegment}
          durationFrames={activeSegment.duration_frames}
          sceneTitle={activeSegment.scene_title}
          sceneNumber={activeSegment.scene}
        />
      ) : (
        <Ep2StudioView
          speaker={activeSegment.character}
          frameInSegment={frameInSegment}
          durationFrames={activeSegment.duration_frames}
        />
      )}

      {/* 2. TRANSITION LAYER */}
      {/* Rewind from Studio to 2017 SMA Flashback */}
      <Ep2RewindOverlay rewindStartFrame={2060} durationFrames={45} />
      {/* Transition from SMA Flashback back to Present Studio */}
      <Ep2RewindOverlay rewindStartFrame={14515} durationFrames={45} />

      {/* 3. BROADCAST HUD */}
      <Ep2BroadcastHUD
        currentSceneNumber={activeSegment.scene}
        currentSceneTitle={activeSegment.scene_title}
        frame={frame}
        totalFrames={EP2_TOTAL_FRAMES}
      />

      {/* 4. FLOATING KINETIC SUBTITLES (Zero Cards/Zero Divs, Pure Canvas Placement) */}
      <Ep2FloatingSubtitles
        speaker={activeSegment.character}
        text={activeSegment.clean_text}
        frameInSegment={frameInSegment}
      />

      {/* 5. AUDIO LAYER - 38 Dialogue Voiceovers (Riko/Ardi & Sami/Gadis) */}
      {EP2_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.start_frame}
          durationInFrames={seg.duration_frames}
        >
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* SFX: Cassette Rewind Whoosh */}
      <Sequence from={2065} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={14520} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>

      {/* Backsound: Warm Lo-Fi Groove Bed */}
      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={bgmVolume}
      />
    </AbsoluteFill>
  );
};
