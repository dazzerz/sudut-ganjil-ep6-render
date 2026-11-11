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
import { KineticSubtitlesReel3 } from "./components/KineticSubtitlesReel3";
import { AbyssTelemetryHUD } from "./components/AbyssTelemetryHUD";
import { ScientificBadgeReel3 } from "./components/ScientificBadgeReel3";

export const FaktaReel3Mariana: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scene timing definitions (1800 frames = 60s)
  const isScene1 = frame < 450;
  const isScene2 = frame >= 450 && frame < 1100;
  const isScene3 = frame >= 1100;

  // Top retention bar
  const progressPercent = (frame / durationInFrames) * 100;

  // Camera drift per scene
  const s1Scale = interpolate(frame, [0, 450], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2Scale = interpolate(frame, [450, 1100], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3Scale = interpolate(frame, [1100, 1800], [1.06, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        width: 1080,
        height: 1920,
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. VISUAL 3D ENVIRONMENT PLATES (9:16 FULL-BLEED)             */}
      {/* ------------------------------------------------------------- */}

      {/* SCENE 1: Deep Ocean Abyss Descent */}
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
            src={staticFile("images/fakta-reels/reel3/scene1_mariana_abyss.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0.12) 30%, rgba(2,6,23,0.15) 65%, rgba(2,6,23,0.85) 100%)",
            }}
          />
        </div>
      )}

      {/* SCENE 2: Hydrostatic Cavitation Implosion */}
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
            src={staticFile("images/fakta-reels/reel3/scene2_deep_implosion.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.15) 30%, rgba(2,6,23,0.15) 65%, rgba(2,6,23,0.88) 100%)",
            }}
          />
        </div>
      )}

      {/* SCENE 3: Hadal Seabed Floor with Snailfish */}
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
            src={staticFile("images/fakta-reels/reel3/scene3_challenger_deep_floor.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.3) 35%, rgba(2,6,23,0.3) 65%, rgba(2,6,23,0.92) 100%)",
            }}
          />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. PROGRESS BAR RETENTION (TOP SAFE ZONE)                     */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          zIndex: 60,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #06B6D4, #3B82F6)",
            boxShadow: "0 0 10px #06B6D4",
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. HEADLINE HOOK (NO BOXES / DIRECT ON CANVAS)                */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 60,
          right: 60,
          textAlign: "center",
          zIndex: 55,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#22D3EE",
            textTransform: "uppercase",
            marginBottom: 8,
            textShadow: "0 0 16px rgba(34,211,238,0.8), 0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#22D3EE",
              display: "inline-block",
              boxShadow: "0 0 12px #22D3EE",
            }}
          />
          FISIKA SAMUDRA • FAKTA MASUK AKAL
        </div>

        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            color: "#FFFFFF",
            margin: 0,
            textTransform: "uppercase",
            textShadow:
              "0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(6,182,212,0.4)",
          }}
        >
          {isScene1 && (
            <>
              JATUH KE PALUNG MARIANA: <br />
              <span style={{ color: "#EF4444" }}>11.000 METER KE BAWAH!</span>
            </>
          )}
          {isScene2 && (
            <>
              IMPLOSI TOTAL: <br />
              <span style={{ color: "#38BDF8" }}>TEKANAN 1.086 BAR</span>
            </>
          )}
          {isScene3 && (
            <>
              TITIK TERDALAM BUMI: <br />
              <span style={{ color: "#FACC15" }}>MISTERI CHALLENGER DEEP</span>
            </>
          )}
        </h1>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. REAL-TIME TELEMETRY HUD & SCIENTIFIC CITATION              */}
      {/* ------------------------------------------------------------- */}
      <AbyssTelemetryHUD />
      <ScientificBadgeReel3 />

      {/* ------------------------------------------------------------- */}
      {/* 5. KINETIC SUBTITLES                                          */}
      {/* ------------------------------------------------------------- */}
      <KineticSubtitlesReel3 />

      {/* ------------------------------------------------------------- */}
      {/* 6. AUDIO: VOICEOVER, BGM & SFX                                */}
      {/* ------------------------------------------------------------- */}
      <Audio
        src={staticFile("audio/fakta-masuk-akal/reels/vo_reel3_mariana.mp3")}
        volume={1.0}
      />
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        startFrom={0}
        volume={0.16}
      />
      <Sequence from={900}>
        <Audio
          src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
          startFrom={0}
          volume={0.16}
        />
      </Sequence>

      {/* Cinematic SFX */}
      <Sequence from={0}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={450}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.8} />
      </Sequence>
      <Sequence from={600}>
        <Audio src={staticFile("audio/sfx_heartbeat.mp3")} volume={0.9} />
      </Sequence>
      <Sequence from={1100}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};
