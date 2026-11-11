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
import { KineticSubtitlesReel4 } from "./components/KineticSubtitlesReel4";
import { MicrobiologyHUD } from "./components/MicrobiologyHUD";
import { ScientificBadgeReel4 } from "./components/ScientificBadgeReel4";

export const FaktaReel4Aturan5Detik: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scene timing definitions (1800 frames = 60s)
  const isScene1 = frame < 550;
  const isScene2 = frame >= 550 && frame < 1250;
  const isScene3 = frame >= 1250;

  // Top retention bar
  const progressPercent = (frame / durationInFrames) * 100;

  // Camera drift per scene
  const s1Scale = interpolate(frame, [0, 550], [1.0, 1.09], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2Scale = interpolate(frame, [550, 1250], [1.02, 1.11], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3Scale = interpolate(frame, [1250, 1800], [1.08, 1.01], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // UV scanner line in Scene 3
  const uvScanY = interpolate(frame, [1250, 1800], [-100, 2020], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050505",
        overflow: "hidden",
        width: 1080,
        height: 1920,
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. VISUAL 3D ENVIRONMENT PLATES (9:16 FULL-BLEED)             */}
      {/* ------------------------------------------------------------- */}

      {/* SCENE 1: Dropped Bread Macro on Polished Kitchen Floor */}
      {isScene1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${s1Scale})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile("images/fakta-reels/reel4/scene1_dropped_bread.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.1) 30%, rgba(5,5,5,0.15) 65%, rgba(5,5,5,0.85) 100%)",
            }}
          />
        </div>
      )}

      {/* SCENE 2: Microscopic Bacterial Adhesion Boundary */}
      {isScene2 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${s2Scale})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile("images/fakta-reels/reel4/scene2_bacteria_micro.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.12) 30%, rgba(5,5,5,0.15) 65%, rgba(5,5,5,0.88) 100%)",
            }}
          />
        </div>
      )}

      {/* SCENE 3: Forensic UV Microbial Colonies on Tile Floor */}
      {isScene3 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${s3Scale})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile("images/fakta-reels/reel4/scene3_uv_colonies.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.1) 30%, rgba(5,5,5,0.15) 65%, rgba(5,5,5,0.88) 100%)",
            }}
          />

          {/* Forensic UV sweep beam */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: uvScanY,
              height: 12,
              background:
                "linear-gradient(180deg, rgba(168,85,247,0) 0%, rgba(192,132,252,0.8) 50%, rgba(168,85,247,0) 100%)",
              boxShadow: "0 0 25px 8px rgba(168,85,247,0.7)",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

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
            background: "linear-gradient(90deg, #FACC15, #22C55E)",
            boxShadow: "0 0 10px #FACC15",
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. SCIENTIFIC TELEMETRY HUD OVERLAY (ANTI-BOX)                */}
      {/* ------------------------------------------------------------- */}
      <MicrobiologyHUD />

      {/* ------------------------------------------------------------- */}
      {/* 4. KINETIC FLOATING SUBTITLES                                 */}
      {/* ------------------------------------------------------------- */}
      <KineticSubtitlesReel4 />

      {/* ------------------------------------------------------------- */}
      {/* 5. SCIENTIFIC BADGE & FOLLOW CTA                              */}
      {/* ------------------------------------------------------------- */}
      <ScientificBadgeReel4 />

      {/* ------------------------------------------------------------- */}
      {/* 6. AUDIO SYSTEM (VOICEOVER + BGM + SFX)                       */}
      {/* ------------------------------------------------------------- */}

      {/* Primary Voiceover (Edge-TTS GadisNeural) */}
      <Audio
        src={staticFile("audio/fakta-masuk-akal/reels/vo_reel4_5detik.mp3")}
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

      <Sequence from={550}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.45} />
      </Sequence>

      <Sequence from={750}>
        {/* Instant contamination impact */}
        <Audio src={staticFile("audio/sfx_heartbeat.mp3")} volume={0.6} />
      </Sequence>

      <Sequence from={1250}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.45} />
      </Sequence>

      <Sequence from={1450}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};
