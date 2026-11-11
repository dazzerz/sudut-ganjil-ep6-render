import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CosmicBackground } from "./components/CosmicBackground";
import { EarthGlobe } from "./components/EarthGlobe";
import { SpeedometerHUD } from "./components/SpeedometerHUD";
import { InertiaShockwave } from "./components/InertiaShockwave";
import { MegaTsunamiGauge } from "./components/MegaTsunamiGauge";
import { KineticSubtitles } from "./components/KineticSubtitles";

export const FaktaBumiBerhenti1Detik: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // =========================================================================
  // 1. SCENE TIMING DEFINITIONS (SYNCED WITH FEMALE VOICEOVER GADIS)
  // =========================================================================
  // Scene 1: Hook (0 - 195 / 0 - 6.5s)
  // Scene 2: Kecepatan 1.670 km/jam (195 - 402 / 6.5 - 13.4s)
  // Scene 3: Inersia & Sudden Halt (402 - 606 / 13.4 - 20.2s)
  // Scene 4: Mega Tsunami & Badai (606 - 753 / 20.2 - 25.1s)
  // Scene 5: Gravitasi & Momentum Stabil (753 - 966 / 25.1 - 32.2s)
  // Scene 6: Outro, Diskusi & Sumber Referensi (966 - 1140 / 32.2 - 38.0s)

  const isScene1 = frame < 195;
  const isScene2 = frame >= 195 && frame < 402;
  const isScene3 = frame >= 402 && frame < 606;
  const isScene4 = frame >= 606 && frame < 753;
  const isScene5 = frame >= 753 && frame < 966;
  const isScene6 = frame >= 966;

  // Earth properties per scene
  const isEarthSpinning = !(isScene3 || isScene4); // Earth freezes during the sudden stop
  const isAlarmMode = isScene3; // Red alert during inersia impact
  const showEquatorHighlight = isScene2;
  const showRotationVectors = isScene2;

  // Earth shockwave scale at the exact instant of the halt (frame 402)
  const shockwaveScale =
    frame >= 402 && frame < 445
      ? interpolate(frame, [402, 440], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Dynamic Camera Zoom & Position (Vertical framing)
  const earthY = interpolate(
    frame,
    [0, 180, 205, 390, 415, 595, 620, 745, 770, 955, 980, 1140],
    [720, 720, 560, 560, 530, 530, 520, 520, 660, 660, 680, 680],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const earthScale = interpolate(
    frame,
    [0, 180, 205, 390, 415, 595, 620, 745, 770, 955, 980, 1140],
    [1.0, 1.05, 0.88, 0.88, 0.82, 0.82, 0.78, 0.78, 0.94, 0.96, 0.9, 0.92],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Top header entrance spring
  const headerSpring = spring({
    frame,
    fps,
    config: { stiffness: 120, damping: 14 },
  });

  // Top Progress Bar
  const progressPercent = (frame / durationInFrames) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814", overflow: "hidden" }}>
      {/* ----------------------------------------------------------------- */}
      {/* 1. LAYER BACKGROUND KOSMIK                                         */}
      {/* ----------------------------------------------------------------- */}
      <CosmicBackground />

      {/* ----------------------------------------------------------------- */}
      {/* 2. TOP BRANDING & PROGRESS BAR (Safe Zone Top: 140px)             */}
      {/* ----------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #00F2FE, #FF6B35, #FF2E54)",
            boxShadow: "0 0 12px #00F2FE",
          }}
        />
      </div>

      {/* Top Header Badge */}
      <div
        style={{
          position: "absolute",
          top: 140, // Outside platform top bar safe area
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${headerSpring})`,
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(11, 19, 37, 0.9)",
            border: "1px solid rgba(0, 242, 254, 0.35)",
            padding: "8px 22px",
            borderRadius: 999,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: isAlarmMode ? "#EF4444" : "#00F2FE",
              boxShadow: `0 0 8px ${isAlarmMode ? "#EF4444" : "#00F2FE"}`,
            }}
          />
          <span
            style={{
              color: "#F8FAFC",
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            FAKTA MASUK AKAL • SIMULASI SAINS
          </span>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 3. EARTH 3D VECTOR GLOBE                                          */}
      {/* ----------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: earthY,
          left: "50%",
          transform: `translate(-50%, -50%) scale(${earthScale})`,
          zIndex: 20,
          transition: "transform 0.1s ease-out",
        }}
      >
        <EarthGlobe
          size={580}
          isSpinning={isEarthSpinning}
          showEquatorHighlight={showEquatorHighlight}
          showRotationVectors={showRotationVectors}
          alarmMode={isAlarmMode}
          shockwaveScale={shockwaveScale}
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 4. DYNAMIC SCENE OVERLAYS (CENTER/LOWER HALF)                     */}
      {/* ----------------------------------------------------------------- */}
      {/* SCENE 1 OVERLAY: HOOK QUESTION CARD (0 - 195) */}
      {isScene1 && (
        <div
          style={{
            position: "absolute",
            top: 1140,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 35,
            width: 680,
            backgroundColor: "rgba(11, 19, 37, 0.85)",
            border: "1px solid rgba(0, 242, 254, 0.35)",
            borderRadius: 20,
            padding: "18px 24px",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ color: "#00F2FE", fontSize: 13, fontWeight: 900, letterSpacing: 2 }}>
            EKSPERIMEN PIKIRAN SAINS
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 900, marginTop: 4 }}>
            Apa Dampak Nyata Pada Kehidupan Kita?
          </div>
        </div>
      )}

      {/* SCENE 2 OVERLAY: SPEEDOMETER HUD (195 - 402) */}
      {isScene2 && (
        <div
          style={{
            position: "absolute",
            top: 1040,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 35,
          }}
        >
          <SpeedometerHUD startFrame={195} maxSpeed={1670} />
        </div>
      )}

      {/* SCENE 3 OVERLAY: INERTIA SHOCKWAVE & PROJECTILE (402 - 606) */}
      {isScene3 && (
        <div
          style={{
            position: "absolute",
            top: 960,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 35,
          }}
        >
          <InertiaShockwave startFrame={402} />
        </div>
      )}

      {/* SCENE 4 OVERLAY: MEGA TSUNAMI GAUGE (606 - 753) */}
      {isScene4 && (
        <div
          style={{
            position: "absolute",
            top: 960,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 35,
          }}
        >
          <MegaTsunamiGauge startFrame={606} />
        </div>
      )}

      {/* SCENE 5 OVERLAY: GRAVITASI & MOMENTUM CARD (753 - 966) */}
      {isScene5 && (
        <div
          style={{
            position: "absolute",
            top: 1060,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 35,
            width: 660,
            backgroundColor: "rgba(11, 19, 37, 0.88)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 20,
            padding: "20px 28px",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div
            style={{
              color: "#10B981",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            STABILITAS FISIKA ASTRONOMI
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 22, fontWeight: 800 }}>
            Hukum Kekekalan Momentum Sudut
          </div>
          <div style={{ color: "#94A3B8", fontSize: 14, marginTop: 4 }}>
            Bumi terus berputar mulus tanpa rem mendadak sejak 4,5 miliar tahun lalu.
          </div>
        </div>
      )}

      {/* SCENE 6 OVERLAY: WATERMARK, OUTRO & SUMBER REFERENSI (966 - 1140) */}
      {isScene6 && (
        <div
          style={{
            position: "absolute",
            top: 1040,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 35,
            width: 720,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Brand Watermark Badge */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255, 107, 53, 0.2)",
              border: "2px solid #FF6B35",
              color: "#FF6B35",
              padding: "10px 28px",
              borderRadius: 999,
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: 3,
              boxShadow: "0 0 25px rgba(255, 107, 53, 0.5)",
              marginBottom: 10,
            }}
          >
            FAKTA MASUK AKAL
          </div>
          <div style={{ color: "#E2E8F0", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
            Follow untuk fakta sains & misteri unik setiap hari!
          </div>

          {/* VERIFIED SCIENTIFIC SOURCE CITATION */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 12,
              padding: "8px 18px",
              maxWidth: 680,
            }}
          >
            <span
              style={{
                color: "#94A3B8",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 0.5,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              📚 Sumber Referensi Ilmiah: NASA Planetary Science • NOAA Hydrodynamics • Isaac Newton: Principia Mathematica
            </span>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 5. KINETIC SUBTITLES (Safe Zone Bottom: > 230px)                  */}
      {/* ----------------------------------------------------------------- */}
      <KineticSubtitles />

      {/* ----------------------------------------------------------------- */}
      {/* 6. MULTI-TRACK AUDIO (FEMALE VOICEOVER, BGM WITH DUCKING & SFX)   */}
      {/* ----------------------------------------------------------------- */}
      {/* Background Music Score */}
      <Audio
        src={staticFile("audio/soundtrack_120bpm_educational.mp3")}
        volume={0.12}
      />

      {/* Primary Voiceover (Indonesian Female GadisNeural) */}
      <Sequence from={0} durationInFrames={1110}>
        <Audio src={staticFile("audio/vo_fakta_bumi_gadis.mp3")} volume={1.0} />
      </Sequence>

      {/* SFX Scene 1 Hook Entry */}
      <Sequence from={5} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.5} />
      </Sequence>

      {/* SFX Scene 2 Speedometer Accelerate */}
      <Sequence from={195} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.65} />
      </Sequence>

      {/* SFX Scene 3 Sudden Halt Shockwave (Dramatic Heartbeat/Impact) */}
      <Sequence from={402} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_heartbeat.mp3")} volume={0.9} />
      </Sequence>
      <Sequence from={403} durationInFrames={20}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.7} />
      </Sequence>

      {/* SFX Scene 4 Tsunami Surge */}
      <Sequence from={606} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.65} />
      </Sequence>

      {/* SFX Scene 5 Recovery Chime */}
      <Sequence from={753} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx_chime.mp3")} volume={0.5} />
      </Sequence>

      {/* SFX Scene 6 Outro Discussion */}
      <Sequence from={966} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx_modern_whoosh.mp3")} volume={0.65} />
      </Sequence>
    </AbsoluteFill>
  );
};
