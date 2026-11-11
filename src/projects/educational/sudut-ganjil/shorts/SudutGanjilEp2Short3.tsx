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

export const EP2_SHORT3_SEGMENTS: ShortSegment[] = [
  {
    id: "ep2_26_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep2/ep2_26_nara.mp3",
    duration_sec: 13.36,
    duration_frames: 401,
    start_frame: 0,
    clean_text:
      "Di tangga itu, untuk pertama kalinya obrolan kita bukan soal rumus atau rivalitas nilai. Raka nanya pelan: 'Lu kenapa sih Nar selalu ngotot harus nomor satu di setiap mata pelajaran?'",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/sma_tangga_koridor_senja.jpg",
  },
  {
    id: "ep2_28_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep2/ep2_28_raka.mp3",
    duration_sec: 18.56,
    duration_frames: 557,
    start_frame: 405,
    clean_text:
      "Mendengar cerita Nara, rasa sombong di kepala gue hilang seketika. Gue mikir Nara ambisius karena arogan, padahal dia cuma anak perempuan yang lagi ketakutan bikin kecewa keluarganya.",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "ep2_29_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep2/ep2_29_raka.mp3",
    duration_sec: 15.2,
    duration_frames: 456,
    start_frame: 966,
    clean_text:
      "Sore itu, di anak tangga sekolah yang dingin, kita berdua sadar: kita saling membenci bukan karena kita beda, tapi justru karena kita bercermin pada luka yang sama.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/sma_gerbang_lampu_jalan.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1426,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const EP2_SHORT3_TOTAL_FRAMES = 1620; // 54.0 detik (@ 30 fps)

export const SudutGanjilEp2Short3: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP2_SHORT3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP2_SHORT3_SEGMENTS[activeSegmentIndex]
      : EP2_SHORT3_SEGMENTS[EP2_SHORT3_SEGMENTS.length - 1];

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
        title="LUKA YANG SAMA"
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
      {EP2_SHORT3_SEGMENTS.map((seg) => (
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
