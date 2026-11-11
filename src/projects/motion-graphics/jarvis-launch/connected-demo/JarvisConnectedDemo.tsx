import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import {
  ConnectedCue,
  ConnectedSubtitle,
} from "./components/ConnectedSubtitle";
import { ConnectedTelemetryBadge } from "./components/ConnectedTelemetryBadge";
import { ConnectedKineticPunchline } from "./components/ConnectedKineticPunchline";
import { ConnectedMeetTheTeamReveal } from "./components/ConnectedMeetTheTeamReveal";

export const JarvisConnectedDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Voiceover speaking intervals (in frames @ 30fps) for smart ducking
  // Cleaned version: spoken 'grand pause' removed, smooth flow into closing
  const voIntervals = [
    [0, 85],      // Anda sudah melihat ketiganya beraksi.
    [105, 312],   // Aria di garda depan... mengorkestrasi keputusan.
    [345, 492],   // Tapi inilah rahasia terbesarnya...
    [534, 723],   // Saat Aria mendeteksi pergeseran permintaan...
    [750, 924],   // Dalam hitungan detik...
    [954, 1017],  // Di sinilah keajaibannya terjadi.
    [1050, 1197], // Chris di tim Manajemen...
    [1215, 1437], // menanyakan ke tim Sage...
    [1461, 1578], // Tanpa birokrasi...
    [1626, 1746], // Seketika, Vega langsung mendelegasikan...
    [1767, 1953], // Di layar Sage...
    [1974, 2139], // Tim operasi bisa langsung bergerak...
    [2160, 2256], // Satu instruksi, seluruh tim melaju bersama.
    [2277, 2435], // Inilah kolaborasi masa depan... satu kekuatan.
    [2454, 2585], // JARVIS idsMED. One Team. Always connected.
  ];

  const isSpeaking = voIntervals.some(
    ([start, end]) => frame >= start - 3 && frame <= end + 3
  );

  // Smooth ducking transition
  const baseVolume = isSpeaking ? 0.12 : 0.35;
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [2660, 2700], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgmVolume = baseVolume * fadeIn * fadeOut;

  // Subtitle cues (synchronized to cleaned voiceover)
  const subtitleCues: ConnectedCue[] = [
    {
      startFrame: 0,
      endFrame: 90,
      text: "Anda sudah melihat ketiganya beraksi.",
    },
    {
      startFrame: 105,
      endFrame: 320,
      text: "Aria di garda depan, Sage di balik layar, dan Vega yang mengorkestrasi keputusan.",
    },
    {
      startFrame: 345,
      endFrame: 500,
      text: "Tapi inilah rahasia terbesarnya... Mereka tidak pernah bekerja sendiri-sendiri.",
    },
    {
      startFrame: 530,
      endFrame: 730,
      text: "Saat Aria mendeteksi pergeseran permintaan di pasar Jakarta...",
    },
    {
      startFrame: 750,
      endFrame: 930,
      text: "Dalam hitungan detik, informasi dari lapangan langsung meluncur ke meja manajemen Vega.",
    },
    {
      startFrame: 950,
      endFrame: 1030,
      text: "Di sinilah keajaibannya terjadi.",
    },
    {
      startFrame: 1045,
      endFrame: 1200,
      text: "Chris di tim Manajemen hanya perlu mengetik satu instruksi sederhana di chat Vega:",
    },
    {
      startFrame: 1215,
      endFrame: 1445,
      text: "menanyakan ke tim Sage, apakah produk monitor pasien kita masih kompetitif untuk masuk ke pasar Jakarta di bawah seratus juta rupiah.",
    },
    {
      startFrame: 1460,
      endFrame: 1585,
      text: "Tanpa birokrasi, tanpa puluhan rantai email yang menumpuk.",
    },
    {
      startFrame: 1626,
      endFrame: 1750,
      text: "Seketika, Vega langsung mendelegasikan tugas tersebut ke Back Office.",
    },
    {
      startFrame: 1765,
      endFrame: 1960,
      text: "Di layar Sage, notifikasi tugas masuk secara instan lengkap dengan seluruh konteks pertanyaan.",
    },
    {
      startFrame: 1974,
      endFrame: 2140,
      text: "Tim operasi bisa langsung bergerak mengeksekusi data tanpa ada informasi yang terdistorsi.",
    },
    {
      startFrame: 2160,
      endFrame: 2256,
      text: "Satu instruksi, seluruh tim melaju bersama.",
    },
    {
      startFrame: 2277,
      endFrame: 2435,
      text: "Inilah kolaborasi masa depan. Tiga asisten cerdas, satu kekuatan.",
    },
    {
      startFrame: 2454,
      endFrame: 2590,
      text: "JARVIS idsMED. One Team. Always connected.",
    },
  ];

  // Camera zooms for authentic footage focus
  // During typing in Vega (frames 810 to 1620), subtle focus push-in on the chat box
  const typingRel = Math.max(0, frame - 810);
  const typingScale = interpolate(typingRel, [0, 90, 810], [1.0, 1.05, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const typingTranslateY = interpolate(typingRel, [0, 90, 810], [0, -18, -18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // During Sage modal (frames 1860 to 2275), subtle focus on the incoming modal
  const sageModalRel = Math.max(0, frame - 1860);
  const sageScale = interpolate(sageModalRel, [0, 60, 415], [1.0, 1.04, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sageTranslateY = interpolate(sageModalRel, [0, 60, 415], [0, -12, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Master Keynote Soundtrack (98s score) */}
      <Audio
        src={staticFile("audio/jarvis-connected/jarvis_connected_soundtrack_98s.mp3")}
        volume={bgmVolume}
      />

      {/* Voiceover Master (Google AI Studio - Cleaned, without spoken 'grand pause') */}
      <Audio
        src={staticFile("audio/jarvis-connected/connected_vo_87s_cleaned.mp3")}
        volume={1.0}
      />

      {/* SFX: Audio sync on transitions and punchlines */}
      {frame === 390 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_digital_chirp.wav")} volume={0.65} />
      )}
      {frame === 810 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_data_scan.wav")} volume={0.65} />
      )}
      {frame === 1620 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_whoosh.wav")} volume={0.65} />
      )}
      {frame === 1860 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_data_scan.wav")} volume={0.65} />
      )}
      {frame === 2240 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_sub_drop.wav")} volume={0.7} />
      )}
      {frame === 2275 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_whoosh.wav")} volume={0.65} />
      )}

      {/* 1. SCENE 1: Main Aria & Vega Footage (Frames 0 - 1860 / 62.0s) */}
      {/* Includes 100% full un-sped-up real-time typing from frame 810 to 1620! */}
      {frame < 1860 && (
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            top: 0,
            left: 0,
            transform: frame >= 810 ? `scale(${typingScale}) translateY(${typingTranslateY}px)` : "none",
            transformOrigin: "center center",
          }}
        >
          <Sequence from={0} durationInFrames={1860}>
            <Video
              src={staticFile("videos/jarvis-connected/cuts/clip_main_aria_to_vega.mp4")}
              style={{ width: 1920, height: 1080 }}
            />
          </Sequence>
        </div>
      )}

      {/* Telemetry Badge 1: ARIA (Sales) (0 - 380 frames) */}
      <ConnectedTelemetryBadge
        label="JARVIS ARIA // FIELD SALES"
        sublabel="DISPATCHING MARKET DEMAND TO MANAGEMENT"
        startFrame={10}
        durationInFrames={370}
        position="top-right"
        accentColor="#06B6D4"
      />

      {/* Telemetry Badge 2: Vega receives Aria Intel (390 - 800 frames) */}
      <ConnectedTelemetryBadge
        label="REAL-TIME TELEMETRY"
        sublabel="VEGA INBOX RECEIVES ARIA INTEL"
        startFrame={390}
        durationInFrames={410}
        position="top-right"
        accentColor="#8B5CF6"
      />

      {/* Telemetry Badge 3: Chris Prompts Vega (810 - 1600 frames) */}
      <ConnectedTelemetryBadge
        label="MANAGEMENT ORCHESTRATION"
        sublabel="CHRIS PROMPTS VEGA // REAL-TIME TYPING"
        startFrame={810}
        durationInFrames={800}
        position="top-right"
        accentColor="#A78BFA"
      />

      {/* Telemetry Badge 4: Vega Autonomous Dispatch (1620 - 1850 frames) */}
      <ConnectedTelemetryBadge
        label="AUTONOMOUS DISPATCH"
        sublabel="VEGA (MANAGEMENT) ➔ SAGE (BACK OFFICE)"
        startFrame={1620}
        durationInFrames={230}
        position="top-right"
        accentColor="#8B5CF6"
      />

      {/* 2. SCENE 2: Sage Back Office Receives Work Order (Frames 1860 - 2275 / ~13.8s) */}
      {frame >= 1860 && frame < 2275 && (
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            top: 0,
            left: 0,
            transform: `scale(${sageScale}) translateY(${sageTranslateY}px)`,
            transformOrigin: "center center",
          }}
        >
          <Sequence from={1860} durationInFrames={415}>
            <Video
              src={staticFile("videos/jarvis-connected/cuts/clip_sage_modal_full.mp4")}
              style={{ width: 1920, height: 1080 }}
            />
          </Sequence>
        </div>
      )}

      {/* Telemetry Badge 5: Sage Back Office (1860 - 2240 frames) */}
      <ConnectedTelemetryBadge
        label="WORKFLOW TRIGGERED"
        sublabel="SAGE (BACK OFFICE) VERIFYING PRICING & MARKET"
        startFrame={1860}
        durationInFrames={380}
        position="top-right"
        accentColor="#10B981"
      />

      {/* 3. Kinetic Punchline (2240 - 2275 frames / ~1.2s) */}
      <ConnectedKineticPunchline
        prefix="CROSS-FUNCTIONAL INTELLIGENCE"
        headline="One instruction."
        tagline="Three in motion."
        startFrame={2240}
        durationInFrames={35}
        accentColor="#38BDF8"
      />

      {/* 4. SCENE 3: Grand Reveal — Meet the Team (2275 - 2700 frames / ~14.2s) */}
      <ConnectedMeetTheTeamReveal
        startFrame={2275}
        durationInFrames={425}
      />

      {/* Dynamic Subtitles */}
      <ConnectedSubtitle
        cues={subtitleCues}
        accentColor="#38BDF8"
      />
    </div>
  );
};
