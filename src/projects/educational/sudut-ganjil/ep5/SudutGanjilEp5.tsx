import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Ep5HUD } from "./Ep5HUD";
import { Ep5Rewind } from "./Ep5Rewind";
import { Ep5ShotLayer } from "./Ep5ShotLayer";
import { Ep5Subtitles } from "./Ep5Subtitles";
import { EP5_SEGMENTS, EP5_TOTAL_FRAMES } from "./ep5_scenes";
import { EP5_SHOTS } from "./ep5_shots";

const sceneStart = (scene: number, fallback: number) =>
  EP5_SEGMENTS.find((s) => s.scene === scene)?.start_frame ?? fallback;

// Frame-based hooks live only in the small leaf components (shot layers, subtitles, HUD,
// rewind), so this root never re-renders per frame.
export const SudutGanjilEp5: React.FC = () => {
  const scene2Start = sceneStart(2, 1500);
  const scene6Start = sceneStart(6, EP5_TOTAL_FRAMES - 2400);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {EP5_SHOTS.map((shot) => (
        <Ep5ShotLayer key={shot.index} shot={shot} />
      ))}

      <Ep5Rewind
        startFrame={scene2Start - 26}
        label="◀◀ REWIND  JULI 2017"
        subLabel="MEMUTAR KEMBALI KE SEPULUH PASAL PROTOKOL KONYOL"
        direction="rewind"
      />
      <Ep5Rewind
        startFrame={scene6Start - 26}
        label="▶▶ KEMBALI KE STUDIO"
        subLabel="SUDUT GANJIL, MASA KINI"
        direction="forward"
      />

      <Ep5HUD />
      <Ep5Subtitles />

      {EP5_SEGMENTS.map((seg) => (
        <Sequence key={seg.id} from={seg.start_frame} durationInFrames={seg.duration_frames}>
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      <Sequence from={Math.max(0, scene2Start - 22)} durationInFrames={38}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={Math.max(0, scene6Start - 22)} durationInFrames={38}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>

      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={(f) => {
          const edge = f < 60 || f > EP5_TOTAL_FRAMES - 90;
          const fadeOut = Math.min(1, Math.max(0, (EP5_TOTAL_FRAMES - f) / 60));
          return (edge ? 0.22 : 0.12) * fadeOut;
        }}
      />
    </AbsoluteFill>
  );
};
