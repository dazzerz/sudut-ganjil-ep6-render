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
import { KineticSubtitlesReel1 } from "./components/KineticSubtitlesReel1";
import { BrainTelemetryHUD } from "./components/BrainTelemetryHUD";
import { ScientificBadgeReel1 } from "./components/ScientificBadgeReel1";

export const FaktaReel1Begadang: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scene timing definitions (1800 frames = 60s)
  const isScene1 = frame < 293;
  const isScene2 = frame >= 293 && frame < 760;
  const isScene3 = frame >= 760 && frame < 1314;
  const isScene4 = frame >= 1314;

  // Top retention bar
  const progressPercent = (frame / durationInFrames) * 100;

  // Camera drift per scene
  const s1Scale = interpolate(frame, [0, 293], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2Scale = interpolate(frame, [293, 760], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3Scale = interpolate(frame, [760, 1314], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s4Scale = interpolate(frame, [1314, 1800], [1.06, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050811",
        overflow: "hidden",
        width: 1080,
        height: 1920,
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. VISUAL 3D ENVIRONMENT PLATES (9:16 FULL-BLEED)             */}
      {/* ------------------------------------------------------------- */}

      {/* SCENE 1 & 4: 3D Translucent Skull & Glowing Brain Cortex */}
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
            src={staticFile("images/fakta-reels/reel1/scene1_neural_brain.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isScene4
                ? "linear-gradient(180deg, rgba(5,8,17,0.85) 0%, rgba(5,8,17,0.55) 35%, rgba(5,8,17,0.55) 65%, rgba(5,8,17,0.92) 100%)"
                : "linear-gradient(180deg, rgba(5,8,17,0.75) 0%, rgba(5,8,17,0.15) 30%, rgba(5,8,17,0.15) 65%, rgba(5,8,17,0.85) 100%)",
            }}
          />
        </div>
      )}

      {/* SCENE 2: Anatomical Exhausted Eye & Optic Stress */}
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
            src={staticFile("images/fakta-reels/reel1/scene2_optic_exhaustion.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,8,17,0.8) 0%, rgba(5,8,17,0.2) 30%, rgba(5,8,17,0.2) 65%, rgba(5,8,17,0.9) 100%)",
            }}
          />
        </div>
      )}

      {/* SCENE 3: Microscopic Microglia Synapse Cannibalism */}
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
            src={staticFile("images/fakta-reels/reel1/scene3_microglia_cannibalism.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,8,17,0.85) 0%, rgba(5,8,17,0.25) 30%, rgba(5,8,17,0.25) 65%, rgba(5,8,17,0.9) 100%)",
            }}
          />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. DYNAMIC CENTER HUD & HAIRLINES                            */}
      {/* ------------------------------------------------------------- */}
      {isScene2 && <BrainTelemetryHUD scene={2} />}
      {isScene3 && <BrainTelemetryHUD scene={3} />}
      {isScene4 && <ScientificBadgeReel1 />}

      {/* ------------------------------------------------------------- */}
      {/* 3. TOP PROGRESS BAR (6px)                                     */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #00F2FE, #FACC15, #EF4444)",
            boxShadow: "0 0 12px rgba(0, 242, 254, 0.9)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. SEKTOR ATAS: DYNAMIC HEADLINE (Y: 160 - 380)               */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 70,
          right: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        {/* Category Pill */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: isScene3 ? "#EF4444" : "#00F2FE",
              boxShadow: `0 0 10px ${isScene3 ? "#EF4444" : "#00F2FE"}`,
            }}
          />
          <span
            style={{
              color: "#E2E8F0",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
              textShadow: "0 2px 8px #000000",
            }}
          >
            NEUROLOGI • FAKTA MASUK AKAL
          </span>
        </div>

        {/* Headlines sitting directly on canvas (NO BOX / NO CARD) */}
        {isScene1 && (
          <h1
            style={{
              margin: 0,
              fontSize: 64,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.95), 0 0 30px rgba(239, 68, 68, 0.5)",
            }}
          >
            JANGAN REMEHKAN BEGADANG: <br />
            <span
              style={{
                color: "#EF4444",
                textShadow: "0 0 35px rgba(239, 68, 68, 0.95), 0 4px 16px #000",
              }}
            >
              OTAK MEMAKAN DIRINYA!
            </span>
          </h1>
        )}

        {isScene2 && (
          <h1
            style={{
              margin: 0,
              fontSize: 58,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.95), 0 0 30px rgba(249, 115, 22, 0.5)",
            }}
          >
            24 HINGGA 48 JAM: <br />
            <span
              style={{
                color: "#F97316",
                textShadow: "0 0 35px rgba(249, 115, 22, 0.95), 0 4px 16px #000",
              }}
            >
              KORTISOL MELONJAK TINGGI
            </span>
          </h1>
        )}

        {isScene3 && (
          <h1
            style={{
              margin: 0,
              fontSize: 58,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.95), 0 0 30px rgba(239, 68, 68, 0.6)",
            }}
          >
            HARI KE-3: FASE KRITIS! <br />
            <span
              style={{
                color: "#EF4444",
                textShadow: "0 0 35px rgba(239, 68, 68, 0.95), 0 4px 16px #000",
              }}
            >
              MIKROGLIA LAHAP SINAPSIS
            </span>
          </h1>
        )}

        {isScene4 && (
          <h1
            style={{
              margin: 0,
              fontSize: 62,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.95), 0 0 30px rgba(74, 222, 128, 0.5)",
            }}
          >
            TIDUR ADALAH KEBUTUHAN: <br />
            <span
              style={{
                color: "#4ADE80",
                textShadow: "0 0 35px rgba(74, 222, 128, 0.95), 0 4px 16px #000",
              }}
            >
              BERAPA REKOR BEGADANGMU?
            </span>
          </h1>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. FLOATING KINETIC SUBTITLES                                */}
      {/* ------------------------------------------------------------- */}
      <KineticSubtitlesReel1 />

      {/* ------------------------------------------------------------- */}
      {/* 6. AUDIO MASTERING (VOICEOVER + BGM + SFX)                    */}
      {/* ------------------------------------------------------------- */}
      <Audio
        src={staticFile("audio/fakta-masuk-akal/reels/vo_reel1_begadang.mp3")}
        startFrom={0}
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

      {/* Transition SFX */}
      <Sequence from={0}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={293}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.7} />
      </Sequence>
      <Sequence from={760}>
        <Audio src={staticFile("audio/sfx_heartbeat.mp3")} volume={0.8} />
      </Sequence>
      <Sequence from={1314}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};
