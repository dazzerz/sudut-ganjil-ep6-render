import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Ep6HUD } from "./Ep6HUD";
import { Ep6Rewind } from "./Ep6Rewind";
import { Ep6ShotLayer } from "./Ep6ShotLayer";
import { Ep6Subtitles } from "./Ep6Subtitles";
import { EP6_SEGMENTS, EP6_TOTAL_FRAMES } from "./ep6_scenes";
import { EP6_SHOTS } from "./ep6_shots";

const sceneStart = (scene: number, fallback: number) =>
  EP6_SEGMENTS.find((s) => s.scene === scene)?.start_frame ?? fallback;

export const SudutGanjilEp6: React.FC = () => {
  const scene3Start = sceneStart(3, 1800);
  const scene22Start = sceneStart(22, EP6_TOTAL_FRAMES - 1500);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {EP6_SHOTS.map((shot) => (
        <Ep6ShotLayer key={shot.index} shot={shot} />
      ))}

      <Ep6Rewind
        startFrame={Math.max(0, scene3Start - 26)}
        label="REWIND  //  TIGA HARI SEBELUMNYA"
        subLabel="MINGGU KETIGA KULIAH  -  KORIDOR KAMPUS"
        direction="rewind"
      />
      <Ep6Rewind
        startFrame={Math.max(0, scene22Start - 26)}
        label="KEMBALI KE STUDIO"
        subLabel="SUDUT GANJIL, MASA KINI"
        direction="forward"
      />

      <Ep6HUD />
      <Ep6Subtitles />

      {EP6_SEGMENTS.map((seg) => (
        <Sequence key={seg.id} from={seg.start_frame} durationInFrames={seg.duration_frames}>
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      <Sequence from={Math.max(0, scene3Start - 22)} durationInFrames={38}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={Math.max(0, scene22Start - 22)} durationInFrames={38}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>

      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={(f) => {
          const edge = f < 60 || f > EP6_TOTAL_FRAMES - 90;
          const fadeOut = Math.min(1, Math.max(0, (EP6_TOTAL_FRAMES - f) / 60));
          return (edge ? 0.2 : 0.11) * fadeOut;
        }}
      />
    </AbsoluteFill>
  );
};
