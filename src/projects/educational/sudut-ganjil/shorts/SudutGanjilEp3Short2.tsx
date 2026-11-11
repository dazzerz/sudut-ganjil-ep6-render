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

export const EP3_SHORT2_SEGMENTS: ShortSegment[] = [
  {
    id: "ep3_10_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep3/ep3_10_nara.mp3",
    duration_sec: 13.78,
    duration_frames: 413,
    start_frame: 0,
    clean_text:
      "Sepulang sekolah, waktu semua orang udah pulang, gue cuma bisa duduk sendirian di kelas yang kosong. Kepala gue bertumpu di atas meja, nangis sejadi-jadinya sampai dada gue sakit.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_nara_menangis_vertical.jpg",
  },
  {
    id: "ep3_11_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep3/ep3_11_raka.mp3",
    duration_sec: 8.33,
    duration_frames: 250,
    start_frame: 419,
    clean_text:
      "Gue yang biasanya paling dingin dan sinis kalau ngeliat Nara, sore itu masuk ke kelas dengan perasaan yang aneh. Marah... campur nggak terima.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_nara_menangis_vertical.jpg",
  },
  {
    id: "ep3_12_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep3/ep3_12_nara.mp3",
    duration_sec: 7.46,
    duration_frames: 224,
    start_frame: 675,
    clean_text:
      "Raka tiba-tiba narik kursi di depan meja gue, terus naruh satu bungkus tisu sama teh kotak dingin.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_nara_menangis_vertical.jpg",
  },
  {
    id: "ep3_13_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep3/ep3_13_raka.mp3",
    duration_sec: 11.66,
    duration_frames: 350,
    start_frame: 905,
    clean_text:
      "Gue bilang ke dia: 'Nara, gue saingan lu tiap semester. Gue tahu persis lu belajar sampai jam dua subuh tiap hari. Kalau ada orang di sekolah ini yang nggak mungkin nyontek... itu lu.'",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "ep3_14_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep3/ep3_14_nara.mp3",
    duration_sec: 8.14,
    duration_frames: 244,
    start_frame: 1261,
    clean_text:
      "Kata-kata Raka sore itu... rasanya kayak oksigen pertama yang masuk ke paru-paru gue setelah seharian ngerasa tenggelam.",
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
    start_frame: 1511,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
];

export const EP3_SHORT2_TOTAL_FRAMES = 1700; // ~56.6 detik (@ 30 fps)

export const SudutGanjilEp3Short2: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP3_SHORT2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP3_SHORT2_SEGMENTS[activeSegmentIndex]
      : EP3_SHORT2_SEGMENTS[EP3_SHORT2_SEGMENTS.length - 1];

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
        title="DARI RIVAL JADI SAHABAT"
        subtitle="SUDUT GANJIL • EP. 03"
        hookHeadline="SAINGAN YG PERTAMA PERCAYA SAMA LU 🥺"
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
          topicTitle="EP. 03 | DARI RIVAL JADI SAHABAT"
        />
      )}

      {/* 5. Audio Sequences */}
      {EP3_SHORT2_SEGMENTS.map((seg) => (
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
