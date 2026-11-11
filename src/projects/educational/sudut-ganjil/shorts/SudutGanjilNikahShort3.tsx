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

export const NIKAH_SHORT3_SEGMENTS: ShortSegment[] = [
  {
    id: "nikah_36_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_36_raka.mp3",
    duration_sec: 10.33,
    duration_frames: 310,
    start_frame: 0,
    clean_text:
      "Dan yang paling penting: biaya nikah di kantor KUA pada hari dan jam kerja itu resmi... nol rupiah alias gratis!",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_kua_asri_vertical.jpg",
  },
  {
    id: "nikah_38_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_38_raka.mp3",
    duration_sec: 9.86,
    duration_frames: 296,
    start_frame: 316,
    clean_text:
      "Uang tabungan 30 juta yang awalnya mau gue bakar di gedung, akhirnya kita pakai buat bayar sewa kontrakan dua kamar selama dua tahun ke depan.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_kontrakan_bahagia_vertical.jpg",
  },
  {
    id: "nikah_40_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_40_raka.mp3",
    duration_sec: 10.73,
    duration_frames: 322,
    start_frame: 618,
    clean_text:
      "Kalian tahu apa kemewahan terbesar dari sebuah pernikahan? Bukan seberapa megah pelaminan tempat duduk berdua, tapi seberapa nyenyak tidur kalian di malam hari setelah menikah.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_kontrakan_bahagia_vertical.jpg",
  },
  {
    id: "nikah_45_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-nikah/nikah_45_nara.mp3",
    duration_sec: 16.86,
    duration_frames: 506,
    start_frame: 946,
    clean_text:
      "Sampaikan dengan sopan: 'Bapak, Ibu, kami ingin pernikahan ini jadi awal berkah, bukan awal penderitaan finansial. Kalau memang ingin mengundang relasi di gedung, apakah berkenan mendanai penuh pesta tersebut?'",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_kontrakan_bahagia_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1458,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const NIKAH_SHORT3_TOTAL_FRAMES = 1648; // ~54.9 detik (@ 30 fps)

export const SudutGanjilNikahShort3: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = NIKAH_SHORT3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? NIKAH_SHORT3_SEGMENTS[activeSegmentIndex]
      : NIKAH_SHORT3_SEGMENTS[NIKAH_SHORT3_SEGMENTS.length - 1];

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
        title="POV: NIKAH TANPA UTANG"
        subtitle="SUDUT GANJIL • SPESIAL"
        hookHeadline="POV: NIKAH SAKRAL TANPA UTANG, TIDUR NYENYAK SETELAH AKAD"
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
          topicTitle="SPESIAL | GAJI 5 JUTA NIKAH GEDUNG"
        />
      )}

      {/* 5. Audio Sequences */}
      {NIKAH_SHORT3_SEGMENTS.map((seg) => (
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
