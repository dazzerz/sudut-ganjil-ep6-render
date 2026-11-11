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

export const REKSA_SHORT2_SEGMENTS: ShortSegment[] = [
  {
    "id": "reksa_40_nara",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_40_nara.mp3",
    "clean_text": "'Ka! Portofolio kita warnanya merah semua! Modal 36 juta sekarang nilainya tinggal 34 juta! Uang kita lenyap hampir dua juta rupiah, ayo kita tarik sekarang sebelum habis!'",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/reksa-dana/shorts/reksa_s2_pasar_merah_panik_vertical.jpg",
    "duration_sec": 13.16,
    "duration_frames": 395,
    "start_frame": 0
  },
  {
    "id": "reksa_42_raka",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_42_raka.mp3",
    "clean_text": "Gue jelasin ke Nara: penurunan nilai di layar itu belum jadi kerugian sebelum kita menekan tombol jual. Itu cuma harga pasar harian yang sedang terkoreksi.",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/reksa-dana/shorts/reksa_s2_nara_tenang_borong_vertical.jpg",
    "duration_sec": 10.28,
    "duration_frames": 308,
    "start_frame": 399
  },
  {
    "id": "reksa_43_nara",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_43_nara.mp3",
    "clean_text": "Raka mengajari gue konsep Dollar Cost Averaging. Ketika harga unit reksa dana lagi turun, artinya aset berkualitas lagi diskon besar-besaran!",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/reksa-dana/shorts/reksa_s1_aplikasi_dca_vertical.jpg",
    "duration_sec": 10.8,
    "duration_frames": 324,
    "start_frame": 711
  }
];

export const REKSA_SHORT2_TOTAL_FRAMES = 1039; // ~34.6 detik (@ 30 fps)

export const SudutGanjilReksaShort2: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = REKSA_SHORT2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 4
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? REKSA_SHORT2_SEGMENTS[activeSegmentIndex]
      : REKSA_SHORT2_SEGMENTS[REKSA_SHORT2_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const showEndCallout = frame >= REKSA_SHORT2_TOTAL_FRAMES - 75; // Subtle final 2.5s callout without blocking

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
        title="UJIAN PASAR MERAH"
        subtitle="SUDUT GANJIL • SPECIAL"
        hookHeadline="PORTOFOLIO MERAH ANJLOK! JANGAN JUAL RUGI!"
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
          frameInCTA={frame - (REKSA_SHORT2_TOTAL_FRAMES - 75)}
          topicTitle="SPECIAL | REKSA DANA 5 TAHUN"
        />
      )}

      {/* 5. Audio Sequences */}
      {REKSA_SHORT2_SEGMENTS.map((seg) => (
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
