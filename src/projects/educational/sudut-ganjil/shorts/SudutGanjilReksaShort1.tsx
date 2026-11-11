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

export const REKSA_SHORT1_SEGMENTS: ShortSegment[] = [
  {
    "id": "reksa_11_raka",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_11_raka.mp3",
    "clean_text": "Secara hitungan kertas, harusnya masih ada sisa 1,2 juta rupiah uang dingin tiap bulan. Tapi pertanyaannya... kenapa tiap tanggal 25 saldo ATM selalu tersisa 50 ribu perak?",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/reksa-dana/shorts/reksa_s1_hook_meja_kos_vertical.jpg",
    "duration_sec": 13.6,
    "duration_frames": 408,
    "start_frame": 0
  },
  {
    "id": "reksa_21_nara",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_21_nara.mp3",
    "clean_text": "Artinya... kalau kalian menimbun uang 2 juta tiap bulan di rekening bank biasa selama 5 tahun, modal kalian memang genap 120 juta. Tapi daya beli uang itu sudah menyusut dimakan inflasi.",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/reksa-dana/shorts/reksa_s1_inflasi_bank_vertical.jpg",
    "duration_sec": 13.52,
    "duration_frames": 406,
    "start_frame": 412
  },
  {
    "id": "reksa_22_raka",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_22_raka.mp3",
    "clean_text": "Itulah kenapa kita butuh kendaraan finansial yang bisa berlari lebih kencang dari laju inflasi: reksa dana.",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/reksa-dana/shorts/reksa_s1_aplikasi_dca_vertical.jpg",
    "duration_sec": 7.32,
    "duration_frames": 220,
    "start_frame": 822
  }
];

export const REKSA_SHORT1_TOTAL_FRAMES = 1046; // ~34.9 detik (@ 30 fps)

export const SudutGanjilReksaShort1: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = REKSA_SHORT1_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 4
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? REKSA_SHORT1_SEGMENTS[activeSegmentIndex]
      : REKSA_SHORT1_SEGMENTS[REKSA_SHORT1_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const showEndCallout = frame >= REKSA_SHORT1_TOTAL_FRAMES - 75; // Subtle final 2.5s callout without blocking

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0C",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. Camera Visual View (100% Native Vertical 9:16 - Zero Cropped Heads) */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* 2. Top Cardless Header & Viral Hook (Zero Boxes) */}
      <ShortsHUD
        title="JEBAKAN BANK BIASA"
        subtitle="SUDUT GANJIL • SPECIAL"
        hookHeadline="GAJI 5 JUTA NABUNG DI BANK = RUGI?!"
        isCTA={false}
      />

      {/* 3. Floating Kinetic Subtitles (4-word high-speed chunks) */}
      <ShortsSubtitles
        segment={activeSegment}
        frameInSegment={frameInSegment}
        isCTA={showEndCallout}
      />

      {/* 4. Subtle Final Callout (Last 2.5s, Zero Boxes, Zero Emojis) */}
      {showEndCallout && (
        <ShortsCTAOverlay
          isVisible={showEndCallout}
          frameInCTA={frame - (REKSA_SHORT1_TOTAL_FRAMES - 75)}
          topicTitle="SPECIAL | REKSA DANA 5 TAHUN"
        />
      )}

      {/* 5. Audio Sequences */}
      {REKSA_SHORT1_SEGMENTS.map((seg) => (
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
