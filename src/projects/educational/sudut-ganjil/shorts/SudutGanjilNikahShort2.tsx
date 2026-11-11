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

export const NIKAH_SHORT2_SEGMENTS: ShortSegment[] = [
  {
    id: "nikah_20_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_20_raka.mp3",
    duration_sec: 11.46,
    duration_frames: 344,
    start_frame: 0,
    clean_text:
      "Itu 35 sampai 45 juta rupiah yang bakal ludes dalam waktu 2 jam, berubah jadi piring kotor dan sisa makanan di meja prasmanan.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_katering_vs_kpr_vertical.jpg",
  },
  {
    id: "nikah_21_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-nikah/nikah_21_nara.mp3",
    duration_sec: 12.03,
    duration_frames: 361,
    start_frame: 350,
    clean_text:
      "Padahal uang 40 juta itu kalau dipakai buat uang muka KPR rumah tipe 36 di pinggiran kota, kalian udah punya dinding bata dan atap sendiri seumur hidup.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_katering_vs_kpr_vertical.jpg",
  },
  {
    id: "nikah_31_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-nikah/nikah_31_nara.mp3",
    duration_sec: 14.43,
    duration_frames: 433,
    start_frame: 717,
    clean_text:
      "Bayu dan istrinya mulai dihujani telepon penagih utang tiap jam 9 pagi. Gaji bulanan habis buat bayar bunga pinjaman. Tiap hari mereka bertengkar hebat gara-gara uang makan 20 ribu perak.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_stres_pinjol_vertical.jpg",
  },
  {
    id: "nikah_32_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_32_raka.mp3",
    duration_sec: 9.0,
    duration_frames: 270,
    start_frame: 1156,
    clean_text:
      "Momen yang harusnya jadi awal kehidupan paling romantis, mendadak berubah jadi neraka finansial cuma demi tepuk tangan orang lain selama 2 jam.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_stres_pinjol_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1432,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const NIKAH_SHORT2_TOTAL_FRAMES = 1622; // ~54.0 detik (@ 30 fps)

export const SudutGanjilNikahShort2: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = NIKAH_SHORT2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? NIKAH_SHORT2_SEGMENTS[activeSegmentIndex]
      : NIKAH_SHORT2_SEGMENTS[NIKAH_SHORT2_SEGMENTS.length - 1];

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
        title="POV CEWEK: JEBAKAN RESEPSI"
        subtitle="SUDUT GANJIL • SPESIAL"
        hookHeadline="POV CEWEK: RESEPSI MEWAH 2 JAM VS CICILAN UTANG BERTAHUN-TAHUN"
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
      {NIKAH_SHORT2_SEGMENTS.map((seg) => (
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
