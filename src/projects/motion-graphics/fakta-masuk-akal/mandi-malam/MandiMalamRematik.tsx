import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedBathroomScene } from "./components/AnimatedBathroomScene";
import { AnimatedKneeCutawayScene } from "./components/AnimatedKneeCutawayScene";
import { AnimatedAutoimmuneScene } from "./components/AnimatedAutoimmuneScene";
import { AnimatedWarmShowerOutroScene } from "./components/AnimatedWarmShowerOutroScene";
import { MandiMalamFloatingSubtitles } from "./components/MandiMalamFloatingSubtitles";

export const MandiMalamRematik: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Top progress bar calculation
  const progressPercent = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#0F172A",
        overflow: "hidden",
        fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* SCENE SEQUENCES (FULL BLEED STYLIZED ENVIRONMENT ANIMATION)   */}
      {/* ------------------------------------------------------------- */}

      {/* Scene 1: Bathroom & Cold Shower Setting (f0 - f296) */}
      <Sequence from={0} durationInFrames={296}>
        <AnimatedBathroomScene isStopTriggered={frame >= 149} />
      </Sequence>

      {/* Scene 2: 3D Anatomical Knee Cutaway & Vasoconstriction (f296 - f641) */}
      <Sequence from={296} durationInFrames={345}>
        <AnimatedKneeCutawayScene />
      </Sequence>

      {/* Scene 3: Microscopic Cellular Autoimmune Cutaway (f641 - f1072) */}
      <Sequence from={641} durationInFrames={431}>
        <AnimatedAutoimmuneScene />
      </Sequence>

      {/* Scene 4: Warm Shower Steam & Medical Conclusion Outro (f1072 - f1530) */}
      <Sequence from={1072} durationInFrames={458}>
        <AnimatedWarmShowerOutroScene />
      </Sequence>

      {/* ------------------------------------------------------------- */}
      {/* OVERLAY: FLOATING KINETIC SUBTITLES (NO BOXES, DIRECT CANVAS) */}
      {/* ------------------------------------------------------------- */}
      <MandiMalamFloatingSubtitles />

      {/* ------------------------------------------------------------- */}
      {/* TOP PROGRESS BAR                                              */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${progressPercent}%`,
          height: 8,
          background: "linear-gradient(90deg, #0284C7 0%, #38BDF8 50%, #FDE047 100%)",
          zIndex: 200,
          boxShadow: "0 0 12px rgba(56, 189, 248, 0.8)",
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* TOP CHANNEL BRANDING HEADER (SAFE ZONE COMPLIANT)             */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 150,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              boxShadow: "0 0 10px #EF4444",
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              color: "#0F172A",
              textShadow: "0 1px 4px rgba(255,255,255,0.8)",
            }}
          >
            FAKTA MASUK AKAL
          </span>
        </div>

        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#0284C7",
            letterSpacing: 1.5,
            textShadow: "0 1px 4px rgba(255,255,255,0.8)",
          }}
        >
          EPS. 03 // MEDIS
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* AUDIO TRACKS: VOICEOVER + DUCKED BGM + TRANSITION SFX         */}
      {/* ------------------------------------------------------------- */}

      {/* Primary Voiceover (GadisNeural, Clear Studio Quality) */}
      <Audio src={staticFile("audio/fakta-mandi-malam.mp3")} volume={1.0} />

      {/* Ambient ducked cinematic BGM */}
      <Audio
        src={staticFile("audio/bgm_ambient.mp3")}
        volume={(f) =>
          interpolate(f, [0, 30, durationInFrames - 30, durationInFrames], [0, 0.12, 0.12, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* Transition Whoosh SFX at scene cuts */}
      <Sequence from={294} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.4} />
      </Sequence>

      <Sequence from={639} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.4} />
      </Sequence>

      <Sequence from={1070} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.4} />
      </Sequence>
    </div>
  );
};
