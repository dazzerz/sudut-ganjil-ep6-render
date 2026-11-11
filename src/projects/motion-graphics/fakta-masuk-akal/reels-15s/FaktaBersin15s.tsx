import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticBersinSubtitles } from "./components/KineticBersinSubtitles";
import { SpeedometerGauge160 } from "./components/SpeedometerGauge160";
import { TechnicalHairlines } from "./components/TechnicalHairlines";
import { ScientificCitationBadge } from "./components/ScientificCitationBadge";

export const FaktaBersin15s: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // =========================================================================
  // SCENE TIMINGS (ACCURATELY SYNCED TO 15s GADIS VOICEOVER)
  // =========================================================================
  // Scene 1: Hook "Jangan pernah tahan bersinmu!" (0 - 80 frames / 0 - 2.67s)
  // Scene 2: Kecepatan 160 km/jam (80 - 224 frames / 2.67 - 7.46s)
  // Scene 3: Bahaya tekanan dalam kepala (224 - 380 frames / 7.46 - 12.67s)
  // Scene 4: Lepaskan saja & Sumber Ilmiah (380 - 450 frames / 12.67 - 15.00s)

  const isScene1 = frame < 80;
  const isScene2 = frame >= 80 && frame < 224;
  const isScene3 = frame >= 224 && frame < 380;
  const isScene4 = frame >= 380;

  // Top Progress Bar (0% to 100%)
  const progressPercent = (frame / durationInFrames) * 100;

  // Scene transitions & camera drift
  const s1Scale = interpolate(frame, [0, 80], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2Scale = interpolate(frame, [80, 224], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3Scale = interpolate(frame, [224, 380], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s4Scale = interpolate(frame, [380, 450], [1.05, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2 Gauge progress (0 to 1 over frames 80 to 224)
  const gaugeProgress = interpolate(frame, [85, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3 Technical pressure progress (0 to 1 over frames 224 to 380)
  const pressureProgress = interpolate(frame, [230, 340], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top Header entrance spring
  const headerSpring = spring({
    frame: frame % 80, // gentle reset pulse on scene shifts
    fps,
    config: { stiffness: 200, damping: 15 },
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
      {/* ----------------------------------------------------------------- */}
      {/* 1. VISUAL 3D ENVIRONMENT PLATES (9:16 FULL-BLEED)                 */}
      {/* ----------------------------------------------------------------- */}

      {/* SCENE 1 & 4 PLATE: 3D Sagittal Airway Cutaway */}
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
            src={staticFile("images/fakta-bersin/scene1_airway_sneeze.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Subtle dark gradient overlay for text readability without cards */}
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

      {/* SCENE 2 PLATE: Luminous Supersonic Wind Tunnel Shockwave */}
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
            src={staticFile("images/fakta-bersin/scene2_shockwave_tunnel.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
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

      {/* SCENE 3 PLATE: Glowing Crimson Internal Anatomical Pressure Cutaway */}
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
            src={staticFile("images/fakta-bersin/scene3_internal_pressure.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,8,17,0.85) 0%, rgba(5,8,17,0.2) 30%, rgba(5,8,17,0.2) 65%, rgba(5,8,17,0.9) 100%)",
            }}
          />
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 2. DYNAMIC CENTER GRAPHICS & TELEMETRY                            */}
      {/* ----------------------------------------------------------------- */}

      {/* SCENE 2: Animated Speedometer Gauge (0 to 160 KM/H) */}
      {isScene2 && <SpeedometerGauge160 progress={gaugeProgress} />}

      {/* SCENE 3: Technical Hairlines & Anatomical Pressure Gauge */}
      {isScene3 && <TechnicalHairlines progress={pressureProgress} />}

      {/* SCENE 4: Scientific Citation Outro Badge */}
      {isScene4 && <ScientificCitationBadge />}

      {/* ----------------------------------------------------------------- */}
      {/* 3. TOP PROGRESS BAR (Hairline 6px at very top edge)              */}
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
            background: "linear-gradient(90deg, #00F2FE, #FACC15, #EF4444)",
            boxShadow: "0 0 12px rgba(0, 242, 254, 0.9)",
          }}
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 4. TOP TOPIC HEADLINE (SEKTOR ATAS: Y 160 - 380, SAFE ZONE >= 140) */}
      {/* ----------------------------------------------------------------- */}
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
          transform: `scale(${interpolate(headerSpring, [0, 1], [0.95, 1])})`,
        }}
      >
        {/* Category Pill with glowing bullet */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
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
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 2px 8px #000000",
            }}
          >
            FAKTA BIOLOGI • FAKTA MASUK AKAL
          </span>
        </div>

        {/* Dynamic Massive Headline (NO BOX / NO CARD) */}
        {isScene1 && (
          <h1
            style={{
              margin: 0,
              fontSize: 66,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 4px #000000, 0 0 30px rgba(239, 68, 68, 0.5)",
              letterSpacing: 0.5,
            }}
          >
            JANGAN PERNAH <br />
            <span
              style={{
                color: "#EF4444",
                textShadow:
                  "0 0 35px rgba(239, 68, 68, 0.95), 0 4px 16px #000000",
              }}
            >
              TAHAN BERSIN!
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
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 4px #000000, 0 0 30px rgba(0, 242, 254, 0.5)",
              letterSpacing: 0.5,
            }}
          >
            KECEPATAN EMISI UDARA <br />
            <span
              style={{
                color: "#FACC15",
                textShadow:
                  "0 0 35px rgba(250, 204, 21, 0.95), 0 4px 16px #000000",
              }}
            >
              MENEMBUS 160 KM/JAM
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
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 4px #000000, 0 0 30px rgba(239, 68, 68, 0.5)",
              letterSpacing: 0.5,
            }}
          >
            BAHAYA LONJAKAN TEKANAN <br />
            <span
              style={{
                color: "#EF4444",
                textShadow:
                  "0 0 35px rgba(239, 68, 68, 0.95), 0 4px 16px #000000",
              }}
            >
              DI DALAM KEPALA!
            </span>
          </h1>
        )}

        {isScene4 && (
          <h1
            style={{
              margin: 0,
              fontSize: 68,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              fontFamily: "'Montserrat', system-ui, sans-serif",
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 4px #000000, 0 0 30px rgba(74, 222, 128, 0.5)",
              letterSpacing: 0.5,
            }}
          >
            BIARKAN KELUAR: <br />
            <span
              style={{
                color: "#4ADE80",
                textShadow:
                  "0 0 35px rgba(74, 222, 128, 0.95), 0 4px 16px #000000",
              }}
            >
              LEPASKAN SAJA!
            </span>
          </h1>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 5. FLOATING KINETIC SUBTITLES (BOTTOM SAFE ZONE >= 220)           */}
      {/* ----------------------------------------------------------------- */}
      <KineticBersinSubtitles />

      {/* ----------------------------------------------------------------- */}
      {/* 6. AUDIO MASTERING (VOICEOVER + BGM + SFX)                         */}
      {/* ----------------------------------------------------------------- */}

      {/* Voiceover Gadis Neural (14.66s) */}
      <Audio
        src={staticFile("audio/fakta-masuk-akal/vo_bersin_15s.mp3")}
        startFrom={0}
        volume={1.0}
      />

      {/* Background Music Loop */}
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        startFrom={0}
        volume={0.16}
      />

      {/* Transition Whoosh SFX */}
      <Sequence from={0}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={80}>
        <Audio src={staticFile("audio/sfx_whoosh.mp3")} volume={0.7} />
      </Sequence>
      <Sequence from={224}>
        <Audio src={staticFile("audio/sfx_heartbeat.mp3")} volume={0.8} />
      </Sequence>
      <Sequence from={380}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};
