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

export const EP3_SHORT3_SEGMENTS: ShortSegment[] = [
  {
    id: "ep3_28_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep3/ep3_28_raka.mp3",
    duration_sec: 12.96,
    duration_frames: 389,
    start_frame: 0,
    clean_text:
      "Gue bilang: 'Nara, jalur undangan itu cuma pintu samping. Orang yang masuk lewat pintu belakang bakal selalu takut sama bayangannya sendiri. Kampus impian lu nggak berhak menutup pintunya buat orang secerdas lu.'",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_warung_tenda_vertical.jpg",
  },
  {
    id: "ep3_30_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep3/ep3_30_raka.mp3",
    duration_sec: 9.55,
    duration_frames: 287,
    start_frame: 395,
    clean_text:
      "'Kita buktikan lewat jalur tes tulis nasional, SBMPTN. Dan mulai besok malam, kita belajar bareng tiap hari sampai kita berdua lolos.'",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_warung_tenda_vertical.jpg",
  },
  {
    id: "ep3_33_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep3/ep3_33_nara.mp3",
    duration_sec: 13.15,
    duration_frames: 395,
    start_frame: 688,
    clean_text:
      "Waktu layar monitor tabung yang berkedip itu memuat halaman pengumuman... tiba-tiba muncul kotak hijau besar bertuliskan: Selamat, Anda Dinyatakan Lulus Seleksi Bersama Masuk Perguruan Tinggi Negeri.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_pengumuman_sbmptn_vertical.jpg",
  },
  {
    id: "ep3_34_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep3/ep3_34_raka.mp3",
    duration_sec: 7.92,
    duration_frames: 238,
    start_frame: 1089,
    clean_text:
      "Gue lolos pilihan pertama di Teknik Informatika, dan Nara lolos di Fakultas Hukum impiannya murni lewat hasil tes tulis tanpa bantuan sepeser pun.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_pengumuman_sbmptn_vertical.jpg",
  },
  {
    id: "ep3_35_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep3/ep3_35_nara.mp3",
    duration_sec: 11.76,
    duration_frames: 353,
    start_frame: 1333,
    clean_text:
      "Dan yang paling melegakan... anak donatur yang dulu ngerebut kuota gue lewat jalur manipulasi, drop-out di semester kedua karena nggak sanggup ngikutin standar akademik kuliah.",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
  {
    id: "short_cta_nara_full",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_nara_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1690,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
];

export const EP3_SHORT3_TOTAL_FRAMES = 1880; // ~62.6 detik (@ 30 fps)

export const SudutGanjilEp3Short3: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP3_SHORT3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP3_SHORT3_SEGMENTS[activeSegmentIndex]
      : EP3_SHORT3_SEGMENTS[EP3_SHORT3_SEGMENTS.length - 1];

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
      {/* 1. Camera Visual View */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* 2. Top Header HUD Safe Zone */}
      <ShortsHUD
        title="KEMENANGAN SBMPTN"
        subtitle="SUDUT GANJIL • EP. 03"
        hookHeadline="JALUR BELAKANG BAKAL TAKUT BAYANGANNYA! 🔥"
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
          topicTitle="EP. 03 | KEMENANGAN SBMPTN"
        />
      )}

      {/* 4. Audio Sequences */}
      {EP3_SHORT3_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.start_frame}
          durationInFrames={seg.duration_frames}
        >
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* Backsound */}
      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={0.12}
      />
    </AbsoluteFill>
  );
};
