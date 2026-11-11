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
import { KineticSubtitlesReel2 } from "./components/KineticSubtitlesReel2";
import { HeartTelemetryHUD } from "./components/HeartTelemetryHUD";
import { ScientificBadgeReel2 } from "./components/ScientificBadgeReel2";

export const FaktaReel2AirEs: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scene timing definitions (1800 frames = 60s)
  const isScene1 = frame < 420;
  const isScene2 = frame >= 420 && frame < 950;
  const isScene3 = frame >= 950 && frame < 1450;
  const isScene4 = frame >= 1450;

  // Top retention bar
  const progressPercent = (frame / durationInFrames) * 100;

  // Camera drift per scene
  const s1Scale = interpolate(frame, [0, 420], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2Scale = interpolate(frame, [420, 950], [1.0, 1.09], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3Scale = interpolate(frame, [950, 1450], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s4Scale = interpolate(frame, [1450, 1800], [1.07, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030712",
        overflow: "hidden",
        width: 1080,
        height: 1920,
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. VISUAL 3D ENVIRONMENT PLATES (9:16 FULL-BLEED)             */}
      {/* ------------------------------------------------------------- */}

      {/* SCENE 1 & 4: Drinking ice water in sweltering heat */}
      {(isScene1 || isScene4) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${isScene1 ? s1Scale : s4Scale})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile("images/fakta-reels/reel2/scene1_ice_drink.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isScene4
                ? "linear-gradient(180deg, rgba(3,7,18,0.88) 0%, rgba(3,7,18,0.55) 35%, rgba(3,7,18,0.55) 65%, rgba(3,7,18,0.92) 100%)"
                : "linear-gradient(180deg, rgba(3,7,18,0.78) 0%, rgba(3,7,18,0.12) 30%, rgba(3,7,18,0.12) 65%, rgba(3,7,18,0.85) 100%)",
            }}
          />
        </div>
      )}

      {/* SCENE 2: 3D Medical Cutaway: Esophagus & Vagus Nerve Shock */}
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
            src={staticFile("images/fakta-reels/reel2/scene2_vagus_shock.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(3,7,18,0.75) 0%, rgba(3,7,18,0.15) 35%, rgba(3,7,18,0.2) 65%, rgba(3,7,18,0.88) 100%)",
            }}
          />
        </div>
      )}

      {/* SCENE 3: 3D Heart Bradycardia Cold Shock */}
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
            src={staticFile("images/fakta-reels/reel2/scene3_cardiac_freeze.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(3,7,18,0.8) 0%, rgba(3,7,18,0.15) 30%, rgba(3,7,18,0.2) 65%, rgba(3,7,18,0.9) 100%)",
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
            background: "linear-gradient(90deg, #38BDF8, #F59E0B)",
            boxShadow: "0 0 10px #38BDF8",
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
            color: "#38BDF8",
            textTransform: "uppercase",
            marginBottom: 8,
            textShadow: "0 0 16px rgba(56,189,248,0.8), 0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#38BDF8",
              display: "inline-block",
              boxShadow: "0 0 12px #38BDF8",
            }}
          />
          FISIOLOGI TUBUH • FAKTA MASUK AKAL
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
              "0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(56,189,248,0.4)",
          }}
        >
          {isScene1 && (
            <>
              AIR ES SAAT GERAH: <br />
              <span style={{ color: "#EF4444" }}>SYOK JANTUNG?</span>
            </>
          )}
          {isScene2 && (
            <>
              SYOK SARAF VAGUS: <br />
              <span style={{ color: "#38BDF8" }}>REFLEKS TERMAL AKUT</span>
            </>
          )}
          {isScene3 && (
            <>
              DETAK DROP DRASTIS: <br />
              <span style={{ color: "#EF4444" }}>BRADIKARDIA & SINKOP</span>
            </>
          )}
          {isScene4 && (
            <>
              MINUM SEJUK BERTAHAP: <br />
              <span style={{ color: "#10B981" }}>JAGA RITME JANTUNG</span>
            </>
          )}
        </h1>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. REAL-TIME TELEMETRY HUD & SCIENTIFIC CITATION              */}
      {/* ------------------------------------------------------------- */}
      <HeartTelemetryHUD />
      <ScientificBadgeReel2 />

      {/* ------------------------------------------------------------- */}
      {/* 5. KINETIC SUBTITLES                                          */}
      {/* ------------------------------------------------------------- */}
      <KineticSubtitlesReel2 />

      {/* ------------------------------------------------------------- */}
      {/* 6. AUDIO: VOICEOVER, BGM & SFX                                */}
      {/* ------------------------------------------------------------- */}
      <Audio
        src={staticFile("audio/fakta-masuk-akal/reels/vo_reel2_aires.mp3")}
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
      <Sequence from={420}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.7} />
      </Sequence>
      <Sequence from={950}>
        <Audio src={staticFile("audio/sfx_heartbeat.mp3")} volume={0.85} />
      </Sequence>
      <Sequence from={1450}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};
