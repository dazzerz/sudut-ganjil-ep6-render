import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Ep3BroadcastHUD } from "./Ep3BroadcastHUD";
import { Ep3FlashbackView } from "./Ep3FlashbackView";
import { Ep3FloatingSubtitles } from "./Ep3FloatingSubtitles";
import { Ep3RewindOverlay } from "./Ep3RewindOverlay";
import { Ep3StudioView } from "./Ep3StudioView";
import { EP3_SEGMENTS, EP3_TOTAL_FRAMES } from "./ep3_scenes";

export const SudutGanjilEp3: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active segment
  const activeSegmentIndex = EP3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 8
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP3_SEGMENTS[activeSegmentIndex]
      : frame < EP3_SEGMENTS[0].start_frame
      ? EP3_SEGMENTS[0]
      : EP3_SEGMENTS[EP3_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);

  // Dynamic BGM Volume Ducking
  const isIntro = frame < 60;
  const isOutro = frame > EP3_TOTAL_FRAMES - 90;
  const bgmVolume = isIntro || isOutro ? 0.22 : 0.12;

  // Dynamic transition frame markers
  const scene2Start = EP3_SEGMENTS.find((s) => s.scene === 2)?.start_frame ?? 1500;
  const scene8Start = EP3_SEGMENTS.find((s) => s.scene === 8)?.start_frame ?? 12000;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {/* 1. VISUAL LAYER */}
      {activeSegment.visual_type === "flashback" ? (
        <Ep3FlashbackView
          bgImage={activeSegment.bg_image}
          frameInSegment={frameInSegment}
          durationFrames={activeSegment.duration_frames}
          sceneTitle={activeSegment.scene_title}
          sceneNumber={activeSegment.scene}
        />
      ) : (
        <Ep3StudioView
          speaker={activeSegment.character}
          frameInSegment={frameInSegment}
          durationFrames={activeSegment.duration_frames}
        />
      )}

      {/* 2. TRANSITION LAYER */}
      {/* Rewind from Present Studio to 2017 SMA Flashback */}
      <Ep3RewindOverlay
        rewindStartFrame={scene2Start - 25}
        durationFrames={45}
        label="◀◀ REWIND • JANUARI 2017"
        subLabel="MEMUTAR KEMBALI KE MASA SKANDAL SNMPTN SMA"
      />
      {/* Transition from SMA Flashback back to Present Studio */}
      <Ep3RewindOverlay
        rewindStartFrame={scene8Start - 25}
        durationFrames={45}
        label="▶▶ FAST FORWARD • STUDIO MASA KINI"
        subLabel="KEMBALI KE SUDUT GANJIL"
      />

      {/* 3. BROADCAST HUD */}
      <Ep3BroadcastHUD
        currentSceneNumber={activeSegment.scene}
        currentSceneTitle={activeSegment.scene_title}
        frame={frame}
        totalFrames={EP3_TOTAL_FRAMES}
      />

      {/* 4. FLOATING KINETIC SUBTITLES (Zero Cards/Zero Divs, Pure Canvas Placement) */}
      <Ep3FloatingSubtitles
        speaker={activeSegment.character}
        text={activeSegment.clean_text}
        frameInSegment={frameInSegment}
      />

      {/* 5. AUDIO LAYER - 38 Dialogue Voiceovers (Riko/Ardi & Sami/Gadis) */}
      {EP3_SEGMENTS.map((seg) => (
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
      <Sequence from={Math.max(0, scene8Start - 20)} durationInFrames={35}>
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
