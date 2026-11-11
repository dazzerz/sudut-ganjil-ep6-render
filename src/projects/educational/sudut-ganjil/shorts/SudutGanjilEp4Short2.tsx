import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ShortsCameraView } from "./ShortsCameraView";
import { ShortsCTAOverlay } from "./ShortsCTAOverlay";
import { ShortsHUD } from "./ShortsHUD";
import { ShortsSubtitles } from "./ShortsSubtitles";
import { ShortSegment } from "./types";

export const EP4_SHORT2_SEGMENTS: ShortSegment[] = [
  {
    id: "ep4_24_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep4/ep4_24_nara.mp3",
    duration_sec: 10.04,
    duration_frames: 301,
    start_frame: 0,
    clean_text:
      "Ujung terpal warung mendadak robek kecil tepat di atas kepala gue. Air hujan yang udah ketampung di lekukan terpal langsung tumpah deras ke bawah!",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep4/sma_terpal_bocor_vertical.jpg",
  },
  {
    id: "ep4_25_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep4/ep4_25_raka.mp3",
    duration_sec: 10.16,
    duration_frames: 305,
    start_frame: 307,
    clean_text:
      "Tanpa mikir panjang, gue langsung lompat dari bangku gue. Tangan kiri gue nahan bambu penyangga terpal biar nggak roboh, dan badan gue condong nutupin Nara.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep4/sma_terpal_bocor_vertical.jpg",
  },
  {
    id: "ep4_27_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep4/ep4_27_nara.mp3",
    duration_sec: 12.12,
    duration_frames: 364,
    start_frame: 618,
    clean_text:
      "Di momen itu... jarak muka Raka sama muka gue deket banget. Gue bisa denger suara napasnya yang terengah-engah, dan tetesan air hujan dari ujung rambutnya jatuh ke meja.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep4/sma_terpal_bocor_vertical.jpg",
  },
  {
    id: "ep4_31_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep4/ep4_31_nara.mp3",
    duration_sec: 11.68,
    duration_frames: 350,
    start_frame: 988,
    clean_text:
      "Itu adalah detik pertama kali dalam hidup gue... di mana gue sadar kalau cowok yang selama ini gue musuhi, ternyata adalah orang yang paling siap pasang badan buat ngelindungin gue.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep4/sma_terpal_bocor_vertical.jpg",
  },
  {
    id: "short_cta_nara_full",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_nara_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1344,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
];

export const EP4_SHORT2_TOTAL_FRAMES = 1535; // ~51.1 detik (@ 30 fps)

export const SudutGanjilEp4Short2: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP4_SHORT2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP4_SHORT2_SEGMENTS[activeSegmentIndex]
      : EP4_SHORT2_SEGMENTS[EP4_SHORT2_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const isCTA = activeSegment.id === "short_cta_nara_full";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0C",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. Camera Visual View (Native Vertical 9:16) */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* 2. Top Header HUD Safe Zone */}
      <ShortsHUD
        title="TITIK BALIK RASA"
        subtitle="SUDUT GANJIL • EP. 04"
        hookHeadline="REFLEKS PASANG BADAN PAS TERPAL BOCOR 🌧️"
        isCTA={isCTA}
      />

      {/* 3. Floating Kinetic Subtitles */}
      <ShortsSubtitles
        segment={activeSegment}
        frameInSegment={frameInSegment}
        isCTA={isCTA}
      />

      {/* 4. End-Card CTA Overlay */}
      {isCTA && (
        <ShortsCTAOverlay
          isVisible={isCTA}
          frameInCTA={frameInSegment}
          topicTitle="EP. 04 | TITIK BALIK RASA"
        />
      )}

      {/* 5. Audio Sequences */}
      {EP4_SHORT2_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.start_frame}
          durationInFrames={seg.duration_frames}
        >
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* Backsound: Lo-Fi chill */}
      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={0.12}
      />
    </AbsoluteFill>
  );
};
