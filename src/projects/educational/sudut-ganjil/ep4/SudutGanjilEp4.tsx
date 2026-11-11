import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Ep4BroadcastHUD } from "./Ep4BroadcastHUD";
import { Ep4FlashbackView } from "./Ep4FlashbackView";
import { Ep4FloatingSubtitles } from "./Ep4FloatingSubtitles";
import { Ep4RewindOverlay } from "./Ep4RewindOverlay";
import { Ep4StudioView } from "./Ep4StudioView";
import { EP4_SEGMENTS, EP4_TOTAL_FRAMES } from "./ep4_scenes";

export const SudutGanjilEp4: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active segment
  const activeSegmentIndex = EP4_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 8
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP4_SEGMENTS[activeSegmentIndex]
      : frame < EP4_SEGMENTS[0].start_frame
      ? EP4_SEGMENTS[0]
      : EP4_SEGMENTS[EP4_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);

  // Dynamic BGM Volume Ducking
  const isIntro = frame < 60;
  const isOutro = frame > EP4_TOTAL_FRAMES - 90;
  const bgmVolume = isIntro || isOutro ? 0.22 : 0.12;

  // Dynamic transition frame markers
  const scene2Start = EP4_SEGMENTS.find((s) => s.scene === 2)?.start_frame ?? 1500;
  const scene6Start = EP4_SEGMENTS.find((s) => s.scene === 6)?.start_frame ?? 12000;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {/* 1. VISUAL LAYER */}
      {activeSegment.visual_type === "flashback" ? (
        <Ep4FlashbackView
          bgImage={activeSegment.bg_image}
          frameInSegment={frameInSegment}
          durationFrames={activeSegment.duration_frames}
          sceneTitle={activeSegment.scene_title}
          sceneNumber={activeSegment.scene}
        />
      ) : (
        <Ep4StudioView
          speaker={activeSegment.character}
          frameInSegment={frameInSegment}
          durationFrames={activeSegment.duration_frames}
        />
      )}

      {/* 2. TRANSITION LAYER */}
      {/* Rewind from Present Studio to 2017 SMA Flashback */}
      <Ep4RewindOverlay
        rewindStartFrame={scene2Start - 25}
        durationFrames={45}
        label="◀◀ REWIND • JUNI 2017"
        subLabel="MEMUTAR KEMBALI KE SORE GERIMIS DI WARUNG TENDA"
      />
      {/* Transition from SMA Flashback back to Present Studio */}
      <Ep4RewindOverlay
        rewindStartFrame={scene6Start - 25}
        durationFrames={45}
        label="▶▶ FAST FORWARD • STUDIO MASA KINI"
        subLabel="KEMBALI KE SUDUT GANJIL"
      />

      {/* 3. BROADCAST HUD */}
      <Ep4BroadcastHUD
        currentSceneNumber={activeSegment.scene}
        currentSceneTitle={activeSegment.scene_title}
        frame={frame}
        totalFrames={EP4_TOTAL_FRAMES}
      />

      {/* 4. FLOATING KINETIC SUBTITLES (Zero Cards/Zero Divs, Pure Canvas Placement) */}
      <Ep4FloatingSubtitles
        speaker={activeSegment.character}
        text={activeSegment.clean_text}
        frameInSegment={frameInSegment}
      />

      {/* 5. AUDIO LAYER - 44 Dialogue Voiceovers (Riko/Raka & Sami/Nara) */}
      {EP4_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.start_frame}
          durationInFrames={seg.duration_frames}
        >
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* SFX: Cassette Rewind Whoosh */}
      <Sequence from={Math.max(0, scene2Start - 20)} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={Math.max(0, scene6Start - 20)} durationInFrames={35}>
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
