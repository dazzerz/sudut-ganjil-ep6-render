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

export const EP5_SHORT1_SEGMENTS: ShortSegment[] = [
  {
    id: "ep5_10_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_10_nara.mp3",
    duration_sec: 13.92,
    duration_frames: 418,
    start_frame: 0,
    clean_text:
      "Sore itu, di teras rumah gue, gue bawa buku catatan sampul biru. Di halaman pertama gue tulis gede-gede... 'PROTOKOL', pakai tiga garis bawah.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_teras_protokol_vertical.jpg",
  },
  {
    id: "ep5_12_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_12_nara.mp3",
    duration_sec: 12.12,
    duration_frames: 364,
    start_frame: 424,
    clean_text:
      "Pasal satu, wajib ngabarin kalau udah sampai rumah. Pasal dua, chat harus dibales maksimal lima belas menit. Kalau lewat, wajib kasih alasan yang masuk akal.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_teras_protokol_vertical.jpg",
  },
  {
    id: "ep5_20_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep5/ep5_20_raka.mp3",
    duration_sec: 12.04,
    duration_frames: 361,
    start_frame: 794,
    clean_text:
      "Dua jam, Nar! Di kepala gue itu udah kayak dua tahun. Gue bolak-balik ngeliatin layar... centangnya cuma satu abu-abu. Gue mikir, 'dia marah? Dia lagi sama siapa?'",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_kamar_overthinking_vertical.jpg",
  },
  {
    id: "ep5_22_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_22_nara.mp3",
    duration_sec: 13.72,
    duration_frames: 412,
    start_frame: 1161,
    clean_text:
      "Pas akhirnya gue buka HP, ada tiga puluh dua notifikasi. Isinya... 'Nar?', 'Udah makan?', 'Kok nggak bales?', sampai 'Oke, gue ngerti.' Padahal gue nggak ngapa-ngapain!",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_kamar_overthinking_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1579,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const EP5_SHORT1_TOTAL_FRAMES = 1769; // ~58.9 detik (@ 30 fps)

export const SudutGanjilEp5Short1: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP5_SHORT1_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP5_SHORT1_SEGMENTS[activeSegmentIndex]
      : EP5_SHORT1_SEGMENTS[EP5_SHORT1_SEGMENTS.length - 1];

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
        title="POV COWOK: 10 PASAL"
        subtitle="SUDUT GANJIL • EP. 05"
        hookHeadline="POV COWOK: PAS NIAT SAYANG JADI 10 PASAL MENYESAKKAN"
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
          topicTitle="EP. 05 | PROTOKOL KONYOL 10 PASAL"
        />
      )}

      {/* 5. Audio Sequences */}
      {EP5_SHORT1_SEGMENTS.map((seg) => (
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
