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

export const EP2_SHORT1_SEGMENTS: ShortSegment[] = [
  {
    id: "ep2_01_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep2/ep2_01_nara.mp3",
    duration_sec: 13.52,
    duration_frames: 406,
    start_frame: 0,
    clean_text:
      "Di kolom komentar kemarin ada satu DM yang bikin gue sama Raka senyum-senyum sendiri. Dia nulis gini: 'Kak Raka sama Kak Nara chemistry-nya dapet banget, pasti pas pertama kali ketemu langsung saling jatuh cinta ya?'",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
  {
    id: "ep2_02_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep2/ep2_02_raka.mp3",
    duration_sec: 16.64,
    duration_frames: 499,
    start_frame: 412,
    clean_text:
      "Begitu baca itu, gue langsung ngebatin: 'Aduh, andai lu tahu kenyataannya.' Pas pertama kali ketemu sembilan tahun lalu, boro-boro ada cinta... yang ada kita berdua saling menganggap satu sama lain sebagai manusia paling arogan di muka bumi.",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "ep2_03_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep2/ep2_03_nara.mp3",
    duration_sec: 14.36,
    duration_frames: 431,
    start_frame: 917,
    clean_text:
      "Waktu itu gue ngeliat Raka sebagai cowok sok pinter yang kerjanya caper ke guru. Rambutnya sok rapi, kacamatanya sok gaya, dan tiap kali ulangan gayanya paling santai padahal ambisius setengah mati.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/sma_mading_perang_dingin.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1354,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const EP2_SHORT1_TOTAL_FRAMES = 1548; // ~51.6 detik (@ 30 fps)

export const SudutGanjilEp2Short1: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP2_SHORT1_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP2_SHORT1_SEGMENTS[activeSegmentIndex]
      : EP2_SHORT1_SEGMENTS[EP2_SHORT1_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const isCTA = activeSegment.id === "short_cta_raka_full";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0C",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. Camera Visual View */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* 2. Top HUD Branding */}
      <ShortsHUD
        title="BORO-BORO JATUH CINTA!"
        subtitle="SUDUT GANJIL • EPISODE 02"
        isCTA={isCTA}
      />

      {/* 3. Subtitles */}
      <ShortsSubtitles
        segment={activeSegment}
        frameInSegment={frameInSegment}
        isCTA={isCTA}
      />

      {/* 4. End Card CTA Overlay */}
      {isCTA && (
        <ShortsCTAOverlay
          frameInCTA={frameInSegment}
          episodeTitle="EP. 02 | BORO-BORO JATUH CINTA, DULU SALING BENCI!"
        />
      )}

      {/* 5. Synchronized Audio Tracks */}
      {EP2_SHORT1_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.start_frame}
          durationInFrames={seg.duration_frames}
        >
          <Audio src={staticFile(seg.audio_file)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
