/**
 * KOMPONEN KARAKTER PRESENTER 2D BERHIJAB RESMI (USTADZAH NIDA)
 * Versi Rigged 2D Multi-Layer (Full 30 Detik / 900 Frames):
 * 1. Layer Torso: Bahu & Torso bernapas natural (visible breathing & weight shift)
 * 2. Layer Head: Kepala & Hijab tilt/rotasi dinamis mengikuti intonasi bicara Selina (ElevenLabs)
 * 3. Layer Eyes: Kedipan mata berkala & realistis pada jeda frasa bicara
 * 4. Layer Mouth: Artikulasi vokal sinkron audio (RMS-driven lip-sync) & senyum ramah saat jeda
 * 5. Layer Arm & Hand: Gestur presentasi anggun mengangkat telapak tangan terbuka ke arah konten
 */

import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SELINA_RMS } from "../data/selinaRms";

export interface PresenterCharacterProps {
  scale?: number;
  bottom?: number;
  right?: number;
  left?: number;
  gesture?: "greeting" | "presenting" | "idle" | "auto";
  audioStartFrame?: number;
}

// Titik-titik jeda bicara alami untuk kedipan mata sepanjang 30 detik
const BLINK_RANGES: [number, number][] = [
  [40, 44],   // S1: jeda Bunda
  [93, 97],   // S1: jeda terbaik
  [148, 152], // S1 -> S2: jeda antar kalimat
  [225, 229], // S2: jeda hadir
  [330, 334], // S2 -> S3: jeda terpadu
  [435, 439], // S3: jeda Qurani
  [508, 512], // S3: jeda nyaman
  [614, 618], // S3 -> S4: jeda minat bakat
  [710, 714], // S4: jeda terbatas
  [822, 826], // S4 -> Outro: jeda akhir ucapan
];

export const PresenterCharacter: React.FC<PresenterCharacterProps> = ({
  scale = 1.0,
  bottom = 0,
  right = 0,
  left,
  gesture = "auto",
  audioStartFrame = 15,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -------------------------------------------------------------------------
  // 1. PERNAPASAN & BAHU (Torso & Shoulders Breathing Animation)
  // Gerakan ritmis naik-turun yang jelas terlihat pada bahu & dada (4.5 px)
  // -------------------------------------------------------------------------
  const breathCycle = Math.sin((frame / fps) * 2.6);
  const torsoBreathY = breathCycle * 4.5;
  const torsoScaleY = 1 + breathCycle * 0.008;
  const torsoScaleX = 1 - breathCycle * 0.003;
  const torsoSway = Math.sin((frame / fps) * 1.5) * 0.4;

  // -------------------------------------------------------------------------
  // 2. GERAKAN KEPALA & HIJAB (Head Tilt & Rotation Mengikuti Intonasi)
  // Pivot di leher (380px, 520px)
  // -------------------------------------------------------------------------
  const headSpeechTilt = interpolate(
    frame,
    [0, 25, 45, 70, 110, 150, 180, 240, 300, 350, 420, 480, 560, 620, 680, 750, 820, 900],
    [0.2, -2.2, 1.8, -1.8, 1.2, 0.0, -1.8, 1.6, -1.2, 0.4, -2.0, 1.5, -1.6, 1.4, -1.8, 1.5, 0.2, 0.0],
    { extrapolateRight: "clamp", easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
  );
  const headSecondaryMotion = Math.sin((frame / fps) * 3.0) * 0.5;
  const headTotalTilt = headSpeechTilt + headSecondaryMotion;
  const headNodY = Math.abs(Math.sin((frame / fps) * 2.6)) * 2.2;

  // -------------------------------------------------------------------------
  // 3. KEDIPAN MATA NYATA (Natural Eyelid Blinking pada Jeda Frasa)
  // -------------------------------------------------------------------------
  let blinkOpacity = 0;
  for (const [bStart, bEnd] of BLINK_RANGES) {
    if (frame >= bStart && frame <= bEnd) {
      if (frame === bStart || frame === bEnd) {
        blinkOpacity = 0.65;
      } else {
        blinkOpacity = 1.0;
      }
      break;
    }
  }

  // -------------------------------------------------------------------------
  // 4. LIP-SYNC & EKSPRESI RAMAH (RMS-Driven Dari Audio Selina)
  // -------------------------------------------------------------------------
  const audioIndex = frame - audioStartFrame;
  const currentRms =
    audioIndex >= 0 && audioIndex < SELINA_RMS.length
      ? SELINA_RMS[audioIndex]
      : 0;

  // Ambang batas energi suara aktif (vokalisasi ucapan)
  const isSpeakingNow = currentRms > 220;
  // Artikulasi vokal membuka-menutup dalam irama 2-3 frame saat ada sinyal suara
  const mouthOpen = isSpeakingNow && Math.floor(frame / 2) % 3 !== 0;

  // -------------------------------------------------------------------------
  // 5. GESTUR TANGAN & LENGAN (Graceful Presentation Gestures)
  // Pivot di pangkal manset kemeja (355px, 980px)
  // -------------------------------------------------------------------------
  let armGestureRot = 0;
  let armGestureY = 0;
  let armGestureX = 0;

  if (gesture === "auto") {
    // Gestur kontekstual terprogram sesuai alur cerita 30 detik:
    // 1. Hook (Frame 18 - 85): Mengangkat tangan presentasi ke teks pembuka
    // 2. Nilai Sekolah Alam & Tahfidz (Frame 230 - 325): Mengangkat tangan
    // 3. Rincian Biaya & Promo (Frame 610 - 745): Mengangkat tangan ke kartu biaya
    // Di luar itu: tangan kembali ke resting position secara natural
    const isGesture1 = frame >= 18 && frame <= 130;
    const isGesture2 = frame >= 230 && frame <= 360;
    const isGesture3 = frame >= 610 && frame <= 770;

    let gestureIntensity = 0;

    if (isGesture1) {
      gestureIntensity = interpolate(
        frame,
        [18, 42, 85, 125],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.2, 1) }
      );
    } else if (isGesture2) {
      gestureIntensity = interpolate(
        frame,
        [230, 255, 325, 360],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.2, 1) }
      );
    } else if (isGesture3) {
      gestureIntensity = interpolate(
        frame,
        [610, 638, 735, 770],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.2, 1) }
      );
    }

    armGestureRot = -6.5 * gestureIntensity;
    armGestureY = -22 * gestureIntensity;
    armGestureX = -8 * gestureIntensity;

    // Follow-through pernapasan mikro pada lengan
    armGestureY += breathCycle * 1.5;
  } else if (gesture === "presenting") {
    // Mode presenting statis berkelanjutan
    armGestureRot = -6.5;
    armGestureY = -22 + breathCycle * 1.5;
    armGestureX = -8;
  }

  // -------------------------------------------------------------------------
  // 6. ENTRANCE SPRING KARAKTER
  // -------------------------------------------------------------------------
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const enterY = interpolate(enterSpring, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        right: right !== undefined ? right : undefined,
        left: left !== undefined ? left : undefined,
        width: 768,
        height: 1376,
        transform: `translateY(${enterY}px) scale(${scale})`,
        transformOrigin: "bottom right",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* ----------------------------------------------------------------- */}
      {/* LAYER 1: TORSO & BAHU (Pernapasan & Weight Shift)                 */}
      {/* ----------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 768,
          height: 1376,
          transform: `translateY(${torsoBreathY}px) scaleX(${torsoScaleX}) scaleY(${torsoScaleY}) rotate(${torsoSway}deg)`,
          transformOrigin: "380px 1250px",
        }}
      >
        <Img
          src={staticFile("ppdb/presenter/layer_torso.png")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* --------------------------------------------------------------- */}
        {/* LAYER 2: KEPALA & HIJAB (Tilt, Rotasi & Anggukan Manusiawi)     */}
        {/* --------------------------------------------------------------- */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 768,
            height: 1376,
            transform: `translateY(${headNodY}px) rotate(${headTotalTilt}deg)`,
            transformOrigin: "380px 520px", // Titik leher
          }}
        >
          {/* Kepala & Hijab Master */}
          <Img
            src={staticFile("ppdb/presenter/layer_head.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />

          {/* Overlay Mata Berkedip Alami (Tampil Nyata saat Blink) */}
          {blinkOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                top: 250,
                left: 240,
                width: 220,
                height: 110,
                opacity: blinkOpacity,
              }}
            >
              <Img
                src={staticFile("ppdb/presenter/layer_eyes_closed.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}

          {/* Overlay Mulut: Artikulasi Bicara vs Senyum Ramah Saat Jeda */}
          {mouthOpen ? (
            <div
              style={{
                position: "absolute",
                top: 370,
                left: 250,
                width: 200,
                height: 120,
              }}
            >
              <Img
                src={staticFile("ppdb/presenter/mouth_talk_patch.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: 370,
                left: 250,
                width: 200,
                height: 120,
              }}
            >
              <Img
                src={staticFile("ppdb/presenter/layer_mouth_smile.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>

        {/* --------------------------------------------------------------- */}
        {/* LAYER 3: TANGAN & LENGAN (Gestur Presentasi Anggun)             */}
        {/* --------------------------------------------------------------- */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 768,
            height: 1376,
            transform: `translate(${armGestureX}px, ${armGestureY}px) rotate(${armGestureRot}deg)`,
            transformOrigin: "355px 980px", // Titik sambungan manset/lengan
          }}
        >
          <Img
            src={staticFile("ppdb/presenter/layer_hand.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};
