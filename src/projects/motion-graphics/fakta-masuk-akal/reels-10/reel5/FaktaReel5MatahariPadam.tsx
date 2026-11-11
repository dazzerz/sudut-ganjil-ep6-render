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
import { EarthGlobe } from "../../../fakta-masuk-akal/components/EarthGlobe";
import { KineticSubtitlesReel5 } from "./components/KineticSubtitlesReel5";
import { CosmicSolarHUD } from "./components/CosmicSolarHUD";
import { ScientificBadgeReel5 } from "./components/ScientificBadgeReel5";

export const FaktaReel5MatahariPadam: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Timing:
  // Phase 1 (0 - 611 / 0 - 20.3s): Light traveling, warm illuminated cosmos
  // Phase 2 (611 - 994 / 20.3 - 33.1s): Extinction shockwave, gravitational sling
  // Phase 3 (994 - 1800 / 33.1 - 60.0s): Cryogenic deep freeze & snowball Earth

  const isPreExtinction = frame < 611;
  const isShockwave = frame >= 611 && frame < 660;
  const isDeepFreeze = frame >= 994;

  // Retention bar
  const progressPercent = (frame / durationInFrames) * 100;

  // Solar flare brightness at the top
  const solarBrightness = interpolate(frame, [590, 611], [1.0, 0.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cosmic camera drift
  const spaceScale = interpolate(frame, [0, 1800], [1.0, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Earth position & scale (drifting slightly as it flies out of orbit)
  const earthY = interpolate(frame, [0, 611, 1200, 1800], [780, 780, 840, 890], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const earthScale = interpolate(
    frame,
    [0, 611, 1200, 1800],
    [1.05, 1.05, 0.96, 0.88],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Shockwave ring expansion at frame 611
  const shockwaveRadius = isShockwave
    ? interpolate(frame, [611, 655], [20, 800], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const shockwaveOpacity = isShockwave
    ? interpolate(frame, [611, 655], [0.9, 0.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Deep freeze frost overlay
  const frostOpacity = interpolate(frame, [994, 1500], [0.0, 0.65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#02040a",
        overflow: "hidden",
        width: 1080,
        height: 1920,
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. DEEP SPACE COSMIC PLATE                                    */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${spaceScale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("images/jarvis/shot4_cinematic_quantum_void.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,4,10,0.6) 0%, rgba(2,4,10,0.15) 30%, rgba(2,4,10,0.2) 65%, rgba(2,4,10,0.92) 100%)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SOLAR CORONA RADIANCE (TOP)                                */}
      {/* ------------------------------------------------------------- */}
      {solarBrightness > 0 && (
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.5) 45%, rgba(245,158,11,0) 75%)",
            filter: "blur(40px)",
            opacity: solarBrightness,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. EXTINCTION GRAVITATIONAL SHOCKWAVE                         */}
      {/* ------------------------------------------------------------- */}
      {isShockwave && (
        <div
          style={{
            position: "absolute",
            top: 250,
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            width: shockwaveRadius * 2,
            height: shockwaveRadius * 2,
            borderRadius: "50%",
            border: "3px solid #38BDF8",
            boxShadow: "0 0 40px #38BDF8, inset 0 0 30px #38BDF8",
            opacity: shockwaveOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. EARTH GLOBE (3D PROGRAMMATIC)                              */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: earthY,
          left: "50%",
          transform: `translateX(-50%) translateY(-50%) scale(${earthScale})`,
          zIndex: 20,
        }}
      >
        <EarthGlobe
          size={580}
          isSpinning={true}
          alarmMode={!isPreExtinction && !isDeepFreeze}
        />

        {/* Cryogenic frost shroud in Phase 3 */}
        {frostOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(224,242,254,0.7) 0%, rgba(56,189,248,0.3) 70%, rgba(30,58,138,0.85) 100%)",
              mixBlendMode: "screen",
              opacity: frostOpacity,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. TOP RETENTION PROGRESS BAR                                 */}
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
            background: isPreExtinction
              ? "linear-gradient(90deg, #F59E0B, #FDE047)"
              : "linear-gradient(90deg, #38BDF8, #22D3EE)",
            boxShadow: isPreExtinction
              ? "0 0 10px #F59E0B"
              : "0 0 10px #38BDF8",
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. ASTROPHYSICS HUD & SENSORS (ANTI-BOX)                      */}
      {/* ------------------------------------------------------------- */}
      <CosmicSolarHUD />

      {/* ------------------------------------------------------------- */}
      {/* 7. KINETIC FLOATING SUBTITLES                                 */}
      {/* ------------------------------------------------------------- */}
      <KineticSubtitlesReel5 />

      {/* ------------------------------------------------------------- */}
      {/* 8. SCIENTIFIC BADGE & FOLLOW CTA                              */}
      {/* ------------------------------------------------------------- */}
      <ScientificBadgeReel5 />

      {/* ------------------------------------------------------------- */}
      {/* 9. AUDIO SYSTEM (VOICEOVER + BGM + SFX)                       */}
      {/* ------------------------------------------------------------- */}

      {/* Primary Voiceover (Edge-TTS GadisNeural) */}
      <Audio
        src={staticFile("audio/fakta-masuk-akal/reels/vo_reel5_matahari.mp3")}
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

      {/* Exact moment solar light stops at 8m 20s (frame 611) */}
      <Sequence from={611}>
        <Audio src={staticFile("audio/sfx_heartbeat.mp3")} volume={0.7} />
      </Sequence>

      <Sequence from={994}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.45} />
      </Sequence>

      <Sequence from={1400}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};
