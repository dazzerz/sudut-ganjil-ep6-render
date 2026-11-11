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

export const EP5_SHORT3_SEGMENTS: ShortSegment[] = [
  {
    id: "ep5_38_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep5/ep5_38_raka.mp3",
    duration_sec: 10.16,
    duration_frames: 305,
    start_frame: 0,
    clean_text:
      "Nara nyobek halaman pertama. Suara sobekannya kenceng banget di sore yang sepi itu. Gue kaget... 'Nar, lu ngapain?'",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_robek_protokol_vertical.jpg",
  },
  {
    id: "ep5_39_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_39_nara.mp3",
    duration_sec: 11.68,
    duration_frames: 350,
    start_frame: 311,
    clean_text:
      "Gue bilang, 'Kita ganti protokolnya. Cuma satu pasal.' Terus gue tulis di halaman kosong... 'Jujur. Termasuk jujur kalau lagi takut.'",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_robek_protokol_vertical.jpg",
  },
  {
    id: "ep5_41_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_41_nara.mp3",
    duration_sec: 11.96,
    duration_frames: 359,
    start_frame: 667,
    clean_text:
      "Gue jawab, 'Gue juga takut, Ka. Tapi mendingan kita takut berdua daripada pura-pura berani sendirian.' Dua anak nangis-nangis sambil ketawa di tribun sekolah.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/sma_robek_protokol_vertical.jpg",
  },
  {
    id: "ep5_43_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep5/ep5_43_nara.mp3",
    duration_sec: 11.52,
    duration_frames: 346,
    start_frame: 1032,
    clean_text:
      "Gue juga. Dan anehnya, hari itu kita justru saling kirim pesan bukan karena kewajiban... tapi karena kangen. Ternyata kepercayaan itu nggak bisa dipaksa pakai pasal.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep5/kampus_ospek_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1384,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const EP5_SHORT3_TOTAL_FRAMES = 1574; // ~52.4 detik (@ 30 fps)

export const SudutGanjilEp5Short3: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP5_SHORT3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP5_SHORT3_SEGMENTS[activeSegmentIndex]
      : EP5_SHORT3_SEGMENTS[EP5_SHORT3_SEGMENTS.length - 1];

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
        title="POV: CUKUP SATU PASAL"
        subtitle="SUDUT GANJIL • EP. 05"
        hookHeadline="POV: HUBUNGAN DEWASA CUMA BUTUH SATU KATA 'JUJUR'"
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
          topicTitle="EP. 05 | SATU PASAL: JUJUR"
        />
      )}

      {/* 5. Audio Sequences */}
      {EP5_SHORT3_SEGMENTS.map((seg) => (
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
