import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { MobilShotLayer } from "./MobilShotLayer";
import { MobilSubtitles } from "./MobilSubtitles";
import { MobilHUD } from "./MobilHUD";
import { MOBIL_SEGMENTS, MOBIL_TOTAL_FRAMES } from "./kredit_mobil_scenes";
import { MOBIL_SHOTS } from "./kredit_mobil_shots";

export const Gaji6JutaKreditMobil: React.FC = () => {
  // Cari frame awal untuk setiap scene guna menempatkan SFX transisi
  const sceneChanges = Array.from({ length: 19 }, (_, i) => i + 2)
    .map((scNum) => {
      const seg = MOBIL_SEGMENTS.find((s) => s.scene === scNum);
      return seg ? seg.startFrame : null;
    })
    .filter((f): f is number => f !== null);

  return (
    <AbsoluteFill style={{ backgroundColor: "#06080F", overflow: "hidden" }}>
      {/* Visual Plate Layers (20 Physical 16:9 Anime Scenes) */}
      {MOBIL_SHOTS.map((shot) => (
        <MobilShotLayer key={shot.id} shot={shot} />
      ))}

      {/* Broadcast HUD Melayang Bebas */}
      <MobilHUD />

      {/* Kinetic Typography Subtitle */}
      <MobilSubtitles />

      {/* Voiceover Dialog Sequences (Murni Gemini 3.8 Flash TTS) */}
      {MOBIL_SEGMENTS.map((seg) => (
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
          <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.4} />
        </Sequence>
      ))}

      {/* Background Music Lo-Fi Chill dengan Dynamic Ducking */}
      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={(f) => {
          const isEdge = f < 60 || f > MOBIL_TOTAL_FRAMES - 90;
          const fadeOut = Math.min(
            1,
            Math.max(0, (MOBIL_TOTAL_FRAMES - f) / 60)
          );
          // Saat narasi berbicara volume 12%, saat intro/outro 20%
          return (isEdge ? 0.20 : 0.12) * fadeOut;
        }}
      />
    </AbsoluteFill>
  );
};
