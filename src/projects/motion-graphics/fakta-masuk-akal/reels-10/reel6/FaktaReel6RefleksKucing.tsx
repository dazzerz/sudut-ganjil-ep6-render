import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CatRightingSimulation } from "./components/CatRightingSimulation";
import { BiomechanicsHUD } from "./components/BiomechanicsHUD";
import { KineticSubtitlesReel6 } from "./components/KineticSubtitlesReel6";
import { ScientificBadgeReel6 } from "./components/ScientificBadgeReel6";

export const FaktaReel6RefleksKucing: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Retention bar
  const progressPercent = (frame / durationInFrames) * 100;

  // Camera drift
  const roomScale = interpolate(frame, [0, 1800], [1.02, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080604",
        overflow: "hidden",
        width: 1080,
        height: 1920,
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. 3D PHYSICAL LIVING ROOM ENVIRONMENT (9:16 FULL-BLEED)      */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${roomScale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("images/environments/indonesian_living_room_3d.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(8,6,4,0.78) 0%, rgba(8,6,4,0.15) 30%, rgba(8,6,4,0.2) 65%, rgba(8,6,4,0.92) 100%)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. TOP RETENTION PROGRESS BAR                                 */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            background: "linear-gradient(90deg, #FACC15, #22D3EE)",
            boxShadow: "0 0 10px #22D3EE",
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CAT RIGHTING KINEMATICS SIMULATION                         */}
      {/* ------------------------------------------------------------- */}
      <CatRightingSimulation />

      {/* ------------------------------------------------------------- */}
      {/* 4. BIOMECHANICS HUD & SENSORS (ANTI-BOX)                      */}
      {/* ------------------------------------------------------------- */}
      <BiomechanicsHUD />

      {/* ------------------------------------------------------------- */}
      {/* 5. KINETIC FLOATING SUBTITLES                                 */}
      {/* ------------------------------------------------------------- */}
      <KineticSubtitlesReel6 />

      {/* ------------------------------------------------------------- */}
      {/* 6. SCIENTIFIC BADGE & FOLLOW CTA                              */}
      {/* ------------------------------------------------------------- */}
      <ScientificBadgeReel6 />

      {/* ------------------------------------------------------------- */}
      {/* 7. AUDIO SYSTEM (VOICEOVER + BGM + SFX)                       */}
      {/* ------------------------------------------------------------- */}

      {/* Primary Voiceover (Edge-TTS GadisNeural) */}
      <Audio
        src={staticFile("audio/fakta-masuk-akal/reels/vo_reel6_kucing.mp3")}
        volume={1.0}
      />

      {/* Educational Background Music */}
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        volume={0.14}
        loop
      />

      {/* Scene Transition & Impact SFX */}
      <Sequence from={0}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.4} />
      </Sequence>

      {/* Vestibular ear detection ping */}
      <Sequence from={488}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.4} />
      </Sequence>

      {/* Waist twist whoosh */}
      <Sequence from={733}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.45} />
      </Sequence>

      {/* 4-Paw touchdown impact shockwave */}
      <Sequence from={1240}>
        <Audio src={staticFile("audio/sfx_heartbeat.mp3")} volume={0.7} />
      </Sequence>

      <Sequence from={1410}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};
