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

export const EP5_SHORT2_SEGMENTS: ShortSegment[] = [
  {
    id: "ep5_27_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_27_nara.mp3",
    duration_sec: 11.64,
    duration_frames: 349,
    start_frame: 0,
    clean_text:
      "Gue tau Raka ada di seberang. Gue liat bayangannya di kaca. Gue pura-pura nggak liat, tapi besoknya gue ajak dia ketemu di tribun lapangan basket sekolah yang udah sepi.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_kafe_kaca_vertical.jpg",
  },
  {
    id: "ep5_31_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_31_nara.mp3",
    duration_sec: 9.08,
    duration_frames: 272,
    start_frame: 355,
    clean_text:
      "Gue tanya, 'Lu percaya nggak sih sama gue?' Raka diem lama banget. Dan diamnya itu yang paling nyakitin.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_tribun_senja_vertical.jpg",
  },
  {
    id: "ep5_32_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep5/ep5_32_raka.mp3",
    duration_sec: 16.68,
    duration_frames: 500,
    start_frame: 633,
    clean_text:
      "Gue jawab jujur. 'Gue percaya sama lu. Yang gue nggak percaya itu... diri gue sendiri.' Lu bakal masuk kampus bagus, ketemu orang pinter, dan gue takut jadi masa lalu SMA yang norak.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_tribun_senja_vertical.jpg",
  },
  {
    id: "ep5_33_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_33_nara.mp3",
    duration_sec: 12.96,
    duration_frames: 389,
    start_frame: 1139,
    clean_text:
      "Dan gue bilang, 'Ka, pagar ini bikin gue sesak.' Gue nggak butuh pacar yang ngitungin jam online gue. Gue butuh pacar yang percaya pas gue nggak ada di depan matanya.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_tribun_senja_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1534,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const EP5_SHORT2_TOTAL_FRAMES = 1724; // ~57.4 detik (@ 30 fps)

export const SudutGanjilEp5Short2: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP5_SHORT2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP5_SHORT2_SEGMENTS[activeSegmentIndex]
      : EP5_SHORT2_SEGMENTS[EP5_SHORT2_SEGMENTS.length - 1];

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
      {/* 1. Camera Visual View (Native Vertical 9:16) */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* 2. Top Header HUD Safe Zone */}
      <ShortsHUD
        title="POV CEWEK: PAGAR SESAK"
        subtitle="SUDUT GANJIL • EP. 05"
        hookHeadline="POV CEWEK: PAGAR INI BIKIN GUE SESAK, KA..."
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
          topicTitle="EP. 05 | PAGAR YANG MENYESAKKAN"
        />
      )}

      {/* 5. Audio Sequences */}
      {EP5_SHORT2_SEGMENTS.map((seg) => (
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
