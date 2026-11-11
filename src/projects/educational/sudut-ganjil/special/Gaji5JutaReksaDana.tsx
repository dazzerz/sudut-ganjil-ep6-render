import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { ReksaDanaShotLayer } from "./ReksaDanaShotLayer";
import { ReksaDanaSubtitles } from "./ReksaDanaSubtitles";
import { ReksaDanaHUD } from "./ReksaDanaHUD";
import { REKSA_SEGMENTS, REKSA_TOTAL_FRAMES } from "./reksa_dana_scenes";
import { getReksaDanaShots } from "./reksa_dana_shots";

export const Gaji5JutaReksaDana: React.FC = () => {
  const shots = getReksaDanaShots();

  // Cari frame awal untuk setiap scene guna menempatkan SFX transisi
  const sceneChanges = [2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map((scNum) => {
      const seg = REKSA_SEGMENTS.find((s) => s.scene === scNum);
      return seg ? seg.startFrame : null;
    })
    .filter((f): f is number => f !== null);

  return (
    <AbsoluteFill style={{ backgroundColor: "#06080F", overflow: "hidden" }}>
      {/* Visual Plate Layers (10 Physical 16:9 Anime Scenes) */}
      {shots.map((shot) => (
        <ReksaDanaShotLayer key={shot.id} shot={shot} />
      ))}

      {/* Broadcast HUD Melayang Bebas */}
      <ReksaDanaHUD />

      {/* Kinetic Typography Subtitle */}
      <ReksaDanaSubtitles />

      {/* Voiceover Dialog Sequences (Murni Gemini 3.8 Flash TTS) */}
      {REKSA_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.startFrame}
          durationInFrames={seg.durationInFrames}
        >
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* SFX Transisi Whoosh Halus Antar-Scene */}
      {sceneChanges.map((frame, idx) => (
        <Sequence
          key={`sfx-${idx}`}
          from={Math.max(0, frame - 12)}
          durationInFrames={35}
        >
          <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.45} />
        </Sequence>
      ))}

      {/* Background Music Lo-Fi Chill dengan Dynamic Ducking */}
      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={(f) => {
          const isEdge = f < 60 || f > REKSA_TOTAL_FRAMES - 90;
          const fadeOut = Math.min(
            1,
            Math.max(0, (REKSA_TOTAL_FRAMES - f) / 60)
          );
          // Saat narasi berbicara volume 13%, saat jeda/intro 22%
          return (isEdge ? 0.22 : 0.13) * fadeOut;
        }}
      />
    </AbsoluteFill>
  );
};
