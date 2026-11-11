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

export const EP2_SHORT2_SEGMENTS: ShortSegment[] = [
  {
    id: "ep2_21_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep2/ep2_21_raka.mp3",
    duration_sec: 13.6,
    duration_frames: 408,
    start_frame: 0,
    clean_text:
      "Gue lari ke kantin belakang sekolah yang hampir tutup. Gue beli dua kotak teh melati dingin, terus gue jalan balik ke kelas.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/sma_teh_kotak_sore.jpg",
  },
  {
    id: "ep2_22_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep2/ep2_22_nara.mp3",
    duration_sec: 16.08,
    duration_frames: 482,
    start_frame: 412,
    clean_text:
      "Gue kaget banget waktu kotak teh dingin itu nempel di meja gue. Raka naruh itu tanpa noleh, sambil natap layar laptopnya dan ngomong: 'Minum dulu, muka lu udah pucat kayak vampir. Ntar lu pingsan, tugas gue nggak selesai'.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/sma_kelas_tugas_paksaan.jpg",
  },
  {
    id: "ep2_23_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep2/ep2_23_raka.mp3",
    duration_sec: 6.96,
    duration_frames: 209,
    start_frame: 898,
    clean_text:
      "Alasan klise cowok gengsian. Padahal aslinya gue beneran khawatir ngeliat Nara yang nggak berhenti kerja dari siang.",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "ep2_24_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep2/ep2_24_nara.mp3",
    duration_sec: 15.76,
    duration_frames: 473,
    start_frame: 1111,
    clean_text:
      "Gue nancepin sedotannya, minum teh dingin itu pelan-pelan, dan untuk pertama kalinya setelah berbulan-bulan saling sinis... gue ngerasa cowok di sebelah gue ini nggak sebrengsek yang gue kira.",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
  {
    id: "short_cta_nara_full",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_nara_full.mp3",
    duration_sec: 6.68,
    duration_frames: 200,
    start_frame: 1588,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
];

export const EP2_SHORT2_TOTAL_FRAMES = 1795; // ~59.8 detik (@ 30 fps)

export const SudutGanjilEp2Short2: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP2_SHORT2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP2_SHORT2_SEGMENTS[activeSegmentIndex]
      : EP2_SHORT2_SEGMENTS[EP2_SHORT2_SEGMENTS.length - 1];

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

      {/* 2. Top HUD Branding */}
      <ShortsHUD
        title="TEH KOTAK & GENGSI SMA"
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
      {EP2_SHORT2_SEGMENTS.map((seg) => (
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
