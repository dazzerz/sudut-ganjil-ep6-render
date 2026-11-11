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

export const EP4_SHORT1_SEGMENTS: ShortSegment[] = [
  {
    id: "ep4_07_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep4/ep4_07_raka.mp3",
    duration_sec: 9.72,
    duration_frames: 292,
    start_frame: 0,
    clean_text:
      "Waktu itu jam lima sore. Langit di atas jalanan kota udah abu-abu gelap, bau aspal basah mulai kecium karena gerimis rintik-rintik.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_warung_tenda_vertical.jpg",
  },
  {
    id: "ep4_08_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep4/ep4_08_nara.mp3",
    duration_sec: 11.56,
    duration_frames: 347,
    start_frame: 298,
    clean_text:
      "Perut kita berdua udah keroncongan parah karena seharian antre legalisir. Pas Raka rogoh kantong celananya... dia cuma nemu selembar sepuluh ribu lecek sama dua koin kusam.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_warung_tenda_vertical.jpg",
  },
  {
    id: "ep4_09_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep4/ep4_09_raka.mp3",
    duration_sec: 11.92,
    duration_frames: 358,
    start_frame: 651,
    clean_text:
      "Sebagai cowok yang pengen keliatan keren di depan cewek, di momen itu gue malu banget. Tapi Nara malah narik lengan hoodie gue sambil nunjuk warung tenda gorengan di seberang halte.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_warung_tenda_vertical.jpg",
  },
  {
    id: "ep4_10_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep4/ep4_10_nara.mp3",
    duration_sec: 14.8,
    duration_frames: 444,
    start_frame: 1015,
    clean_text:
      "Ngapain gengsi? 'Ka, beli tahu isi empat biji sama dua gelas teh manis anget cukup nih lima belas ribu!' Kita langsung lari nerobos gerimis masuk ke dalem tenda terpal oranye itu.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep3/sma_warung_tenda_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1465,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const EP4_SHORT1_TOTAL_FRAMES = 1655; // ~55.1 detik (@ 30 fps)

export const SudutGanjilEp4Short1: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP4_SHORT1_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP4_SHORT1_SEGMENTS[activeSegmentIndex]
      : EP4_SHORT1_SEGMENTS[EP4_SHORT1_SEGMENTS.length - 1];

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
        title="KENCAN 15 RIBU"
        subtitle="SUDUT GANJIL • EP. 04"
        hookHeadline="SALDO ATM TINGGAL 15 RIBU PAS MAU NGE-DATE 💸"
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
          topicTitle="EP. 04 | KENCAN PALING HEMAT"
        />
      )}

      {/* 5. Audio Sequences */}
      {EP4_SHORT1_SEGMENTS.map((seg) => (
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
