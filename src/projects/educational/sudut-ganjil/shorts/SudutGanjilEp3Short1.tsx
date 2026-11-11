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

export const EP3_SHORT1_SEGMENTS: ShortSegment[] = [
  {
    id: "ep3_06_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep3/ep3_06_nara.mp3",
    duration_sec: 12.02,
    duration_frames: 361,
    start_frame: 0,
    clean_text:
      "Gue masih inget banget baunya lorong sekolah siang itu. Tangan gue dingin waktu nyari nama gue di kolom tiga besar jurusan IPS... tapi nama gue nggak ada di sana.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_mading_skandal_vertical.jpg",
  },
  {
    id: "ep3_07_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep3/ep3_07_raka.mp3",
    duration_sec: 8.9,
    duration_frames: 267,
    start_frame: 367,
    clean_text:
      "Nama Nara digeser paksa ke urutan nomor lima. Dan yang masuk ke nomor dua menggantikan Nara... adalah anak dari salah satu donatur terbesar yayasan sekolah.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_mading_skandal_vertical.jpg",
  },
  {
    id: "ep3_08_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep3/ep3_08_nara.mp3",
    duration_sec: 13.44,
    duration_frames: 403,
    start_frame: 640,
    clean_text:
      "Yang paling bikin gue hancur, guru BK manggil gue ke ruangannya dan bilang kalau nilai ujian akhir Bahasa Indonesia gue diturunkan dari sembilan puluh delapan jadi tujuh puluh dua, gara-gara dituduh menyontek.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_nara_menangis_vertical.jpg",
  },
  {
    id: "ep3_09_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep3/ep3_09_raka.mp3",
    duration_sec: 6.38,
    duration_frames: 192,
    start_frame: 1049,
    clean_text:
      "Alasan palsu yang sengaja dikarang pihak sekolah biar pergeseran nilai di rapor akhir itu keliatan sah secara administrasi.",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1247,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const EP3_SHORT1_TOTAL_FRAMES = 1440; // ~48.0 detik (@ 30 fps)

export const SudutGanjilEp3Short1: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP3_SHORT1_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP3_SHORT1_SEGMENTS[activeSegmentIndex]
      : EP3_SHORT1_SEGMENTS[EP3_SHORT1_SEGMENTS.length - 1];

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

      {/* 2. Top Header HUD Safe Zone */}
      <ShortsHUD
        title="SKANDAL NILAI SMA"
        subtitle="SUDUT GANJIL • EP. 03"
        hookHeadline="NILAI RAPOR DIHAPUS DEMI ANAK DONATUR 💔"
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
          topicTitle="EP. 03 | SKANDAL MANIPULASI NILAI"
        />
      )}

      {/* 5. Audio Sequences */}
      {EP3_SHORT1_SEGMENTS.map((seg) => (
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
