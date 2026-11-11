import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LungsCutawayScene } from "./components/LungsCutawayScene";
import { SkyscraperDemolitionScene } from "./components/SkyscraperDemolitionScene";
import { EarAnatomyRuptureScene } from "./components/EarAnatomyRuptureScene";
import { AtmosphereOzoneCollapseScene } from "./components/AtmosphereOzoneCollapseScene";
import { WastelandRecoveryScene } from "./components/WastelandRecoveryScene";
import { KineticFloatingSubtitles } from "./components/KineticFloatingSubtitles";

export const FaktaOksigenHilang5Detik: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // =========================================================================
  // SCENE TIMINGS (ACCURATELY SYNCED TO GADIS VOICEOVER)
  // =========================================================================
  // Scene 1: Lungs & Respiratory Cutaway (0 - 348 / 0.0s - 11.6s)
  // Scene 2: Full-Screen Skyscraper Demolition (348 - 661 / 11.6s - 22.0s)
  // Scene 3: Ear Canal & Eardrum Rupture Cutaway (661 - 879 / 22.0s - 29.3s)
  // Scene 4: Atmospheric Ozone Collapse & Dark Sky (879 - 1084 / 29.3s - 36.1s)
  // Scene 5: Wasteland Recovery & Verified Outro (1084 - 1470 / 36.1s - 49.0s)

  const isScene1 = frame < 348;
  const isScene2 = frame >= 348 && frame < 661;
  const isScene3 = frame >= 661 && frame < 879;
  const isScene4 = frame >= 879 && frame < 1084;
  const isScene5 = frame >= 1084;

  // Scene 1 countdown: 5.0 to 0.0
  const countdown = interpolate(frame, [0, 320], [5.0, 0.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2 concrete crumble progress: 0 to 1
  const crumbleProgress = interpolate(frame, [355, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3 ear rupture progress: 0 to 1
  const ruptureProgress = interpolate(frame, [670, 780], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4 sky darkening: 0 to 1
  const skyDarkness = interpolate(frame, [885, 980], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top Progress Bar (0% to 100%)
  const progressPercent = (frame / durationInFrames) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      {/* ----------------------------------------------------------------- */}
      {/* FULL-SCREEN IMMERSIVE VISUAL STORYTELLING (NO BOXES / NO CARDS)   */}
      {/* ----------------------------------------------------------------- */}
      {isScene1 && (
        <LungsCutawayScene countdown={countdown} isHalt={frame >= 162} />
      )}

      {isScene2 && (
        <SkyscraperDemolitionScene crumbleProgress={crumbleProgress} />
      )}

      {isScene3 && (
        <EarAnatomyRuptureScene ruptureProgress={ruptureProgress} />
      )}

      {isScene4 && (
        <AtmosphereOzoneCollapseScene skyDarkness={skyDarkness} />
      )}

      {isScene5 && <WastelandRecoveryScene />}

      {/* ----------------------------------------------------------------- */}
      {/* TOP PROGRESS BAR (Hairline 6px at very top edge)                  */}
      {/* ----------------------------------------------------------------- */}
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
            background: "linear-gradient(90deg, #00E5FF, #38BDF8, #FDE047)",
            boxShadow: "0 0 12px rgba(0, 229, 255, 0.9)",
          }}
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* KINETIC FLOATING SUBTITLES (DIRECTLY ON CANVAS WITH DROP SHADOW)   */}
      {/* ----------------------------------------------------------------- */}
      <KineticFloatingSubtitles />

      {/* ----------------------------------------------------------------- */}
      {/* AUDIO LAYERS (Gadis Voiceover + BGM + SFX)                        */}
      {/* ----------------------------------------------------------------- */}
      {/* Voiceover Gadis Neural */}
      <Audio
        src={staticFile("audio/fakta-oksigen-5-detik.mp3")}
        startFrom={0}
        volume={1.0}
      />

      {/* Background Music Loop */}
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

      {/* Transition Whoosh SFX on scene changes */}
      <Sequence from={348}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={661}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={879}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={1264}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};
