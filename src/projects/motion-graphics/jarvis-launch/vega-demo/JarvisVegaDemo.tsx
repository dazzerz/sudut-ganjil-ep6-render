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
  SubtitleCue,
  VegaDynamicSubtitle,
} from "./components/VegaDynamicSubtitle";
import { VegaKineticPunchline } from "./components/VegaKineticPunchline";
import { VegaTelemetryBadge } from "./components/VegaTelemetryBadge";
import { VegaClosingReveal } from "./components/VegaClosingReveal";

export const JarvisVegaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Voiceover speaking intervals (in frames @ 30fps) for smart ducking
  const voIntervals = [
    [6, 177],    // Bagi manajemen, data adalah tentang kecepatan mengambil keputusan.
    [204, 321],  // Jarvis, seberapa besar market patient monitor di Indonesia? Dan siapa dominan?
    [330, 489],  // Seketika, data UN Comtrade tersaji. Total market 25 juta dollar...
    [510, 585],  // ...dengan dominasi produk China menembus 50 persen.
    [591, 705],  // Market intelligence that used to take days — answered in seconds.
    [885, 981],  // Bandingkan dengan performa idsMED di kategori yang sama.
    [999, 1155], // Tanpa menarik laporan manual, revenue patient monitor GE langsung terpetakan.
    [1170, 1311],// External context. Internal reality. One conversation.
    [1341, 1401],// Apa window opportunity untuk kita?
    [1416, 1560],// Terpetakan siklus pergantian alat 2027 hingga 2028.
    [1575, 1680],// Peluang terbesar idsMED ada di segmen mid-to-high.
    [1695, 1776],// Not just data. A next step.
    [1797, 1875],// JARVIS VEGA. Your chief of staff. Always on.
    [1890, 1986],// From data to decision.
  ];

  const isSpeaking = voIntervals.some(
    ([start, end]) => frame >= start - 4 && frame <= end + 4
  );

  // Smooth ducking transition
  const baseVolume = isSpeaking ? 0.12 : 0.32;
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [1960, 1997], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgmVolume = baseVolume * fadeIn * fadeOut;

  // Subtitle cues (synchronized to voiceover)
  const subtitleCues: SubtitleCue[] = [
    {
      startFrame: 6,
      endFrame: 180,
      text: "Bagi manajemen, data adalah tentang kecepatan mengambil keputusan.",
    },
    {
      startFrame: 195,
      endFrame: 325,
      text: "Jarvis, seberapa besar market patient monitor di Indonesia? Dan siapa dominan?",
    },
    {
      startFrame: 330,
      endFrame: 495,
      text: "Seketika, data UN Comtrade tersaji. Total market 25 juta dollar...",
    },
    {
      startFrame: 505,
      endFrame: 585,
      text: "...dengan dominasi produk China menembus 50 persen.",
    },
    {
      startFrame: 885,
      endFrame: 985,
      text: "Bandingkan dengan performa idsMED di kategori yang sama.",
    },
    {
      startFrame: 995,
      endFrame: 1155,
      text: "Tanpa menarik laporan manual, revenue patient monitor GE langsung terpetakan.",
    },
    {
      startFrame: 1335,
      endFrame: 1405,
      text: "Apa window opportunity untuk kita?",
    },
    {
      startFrame: 1415,
      endFrame: 1560,
      text: "Terpetakan siklus pergantian alat 2027 hingga 2028.",
    },
    {
      startFrame: 1570,
      endFrame: 1680,
      text: "Peluang terbesar idsMED ada di segmen mid-to-high.",
    },
  ];

  // Dynamic Camera pan & zoom transforms per cut
  // Cut 1: The Prompt (0 to 330 frames)
  const cut1Scale = interpolate(frame, [0, 220, 330], [1.0, 1.05, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cut1TranslateY = interpolate(frame, [0, 220, 330], [0, -20, -32], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cut 2: External Intel & UN Comtrade (330 to 825 frames)
  const cut2RelFrame = Math.max(0, frame - 330);
  const cut2Scale = interpolate(cut2RelFrame, [0, 150, 495], [1.02, 1.08, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cut2TranslateY = interpolate(cut2RelFrame, [0, 150, 495], [0, -15, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cut 3: Internal Revenue (825 to 1314 frames)
  const cut3RelFrame = Math.max(0, frame - 825);
  const cut3Scale = interpolate(cut3RelFrame, [0, 200, 489], [1.02, 1.10, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cut3TranslateY = interpolate(cut3RelFrame, [0, 200, 489], [0, -25, -35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cut 4: Strategic Scope & Next Step (1314 to 1785 frames)
  const cut4RelFrame = Math.max(0, frame - 1314);
  const cut4Scale = interpolate(cut4RelFrame, [0, 200, 471], [1.0, 1.03, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cut4TranslateY = interpolate(cut4RelFrame, [0, 200, 471], [0, -10, -15], {
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
      {/* Executive Keynote Soundtrack */}
      <Audio
        src={staticFile("audio/jarvis-vega/jarvis_vega_soundtrack.mp3")}
        volume={bgmVolume}
      />

      {/* Voiceover Master (Google AI Studio) */}
      <Audio
        src={staticFile("audio/jarvis-vega/vega_vo_full.mp3")}
        volume={1.0}
      />

      {/* SFX: Audio sync on transitions and punchlines */}
      {frame === 315 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_data_scan.wav")} volume={0.65} />
      )}
      {frame === 590 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_sub_drop.wav")} volume={0.7} />
      )}
      {frame === 810 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_data_scan.wav")} volume={0.65} />
      )}
      {frame === 1160 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_sub_drop.wav")} volume={0.7} />
      )}
      {frame === 1660 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_sub_drop.wav")} volume={0.7} />
      )}
      {frame === 1785 && (
        <Audio src={staticFile("audio/jarvis-vega/sfx_whoosh.wav")} volume={0.65} />
      )}

      {/* CUT 1: The Prompt (0:00 - 11.0s / frames 0 - 330) */}
      {frame < 330 && (
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            top: 0,
            left: 0,
            transform: `scale(${cut1Scale}) translateY(${cut1TranslateY}px)`,
            transformOrigin: "center center",
          }}
        >
          <Sequence from={0} durationInFrames={330}>
            <Video
              src={staticFile("videos/jarvis-vega/cuts/clip1_prompt.mp4")}
              style={{ width: 1920, height: 1080 }}
            />
          </Sequence>
        </div>
      )}

      {/* Hologram Transition 1: Querying UN Comtrade (frames 315 - 345) */}
      <VegaTelemetryBadge
        label="✦ VEGA ORCHESTRATION ENGINE"
        sublabel="CROSS-REFERENCING UN COMTRADE HS 901819"
        startFrame={315}
        durationInFrames={30}
        position="center"
        accentColor="#A78BFA"
      />

      {/* CUT 2: External Market Intel & UN Comtrade (11.0s - 27.5s / frames 330 - 825) */}
      {frame >= 330 && frame < 825 && (
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            top: 0,
            left: 0,
            transform: `scale(${cut2Scale}) translateY(${cut2TranslateY}px)`,
            transformOrigin: "center center",
          }}
        >
          <Sequence from={330} durationInFrames={495}>
            <Video
              src={staticFile("videos/jarvis-vega/cuts/clip2_comtrade.mp4")}
              style={{ width: 1920, height: 1080 }}
            />
          </Sequence>
        </div>
      )}

      {/* Data Callout Badge 1: UN Comtrade Stats (frames 400 - 570) */}
      <VegaTelemetryBadge
        label="UN COMTRADE · HS 901819"
        sublabel="TOTAL MARKET USD 25,0M | CHINA 50%"
        startFrame={400}
        durationInFrames={170}
        position="top-right"
        accentColor="#C084FC"
      />

      {/* Kinetic Punchline 1: External Market Intel Takeaway (frames 590 - 710) */}
      <VegaKineticPunchline
        prefix="EXTERNAL MARKET INTELLIGENCE"
        headline="Market intelligence that used to take days..."
        tagline="Answered in seconds."
        startFrame={590}
        durationInFrames={120}
        accentColor="#A78BFA"
      />

      {/* Hologram Transition 2: PostgreSQL Telemetry Sync (frames 810 - 840) */}
      <VegaTelemetryBadge
        label="✦ SQL TELEMETRY OVERLAY"
        sublabel="INTERNAL IDS-MED REVENUE DATABASE"
        startFrame={810}
        durationInFrames={30}
        position="center"
        accentColor="#A78BFA"
      />

      {/* CUT 3: Internal Revenue Overlay (27.5s - 43.8s / frames 825 - 1314) */}
      {frame >= 825 && frame < 1314 && (
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            top: 0,
            left: 0,
            transform: `scale(${cut3Scale}) translateY(${cut3TranslateY}px)`,
            transformOrigin: "center center",
          }}
        >
          <Sequence from={825} durationInFrames={489}>
            <Video
              src={staticFile("videos/jarvis-vega/cuts/clip3_internal.mp4")}
              style={{ width: 1920, height: 1080 }}
            />
          </Sequence>
        </div>
      )}

      {/* Data Callout Badge 2: Internal Revenue Stats (frames 960 - 1140) */}
      <VegaTelemetryBadge
        label="POSTGRESQL INTERNAL REVENUE"
        sublabel="CARESCAPE RP 20,3 MILIAR | 71 UNIT"
        startFrame={960}
        durationInFrames={180}
        position="top-right"
        accentColor="#C084FC"
      />

      {/* Kinetic Punchline 2: Hybrid Data Takeaway (frames 1160 - 1300) */}
      <VegaKineticPunchline
        prefix="HYBRID CONVERSATIONAL INTELLIGENCE"
        headline="External context. Internal reality."
        tagline="One conversation."
        startFrame={1160}
        durationInFrames={140}
        accentColor="#A78BFA"
      />

      {/* CUT 4: Strategic Scope & Next Step (43.8s - 59.5s / frames 1314 - 1785) */}
      {frame >= 1314 && frame < 1785 && (
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            top: 0,
            left: 0,
            transform: `scale(${cut4Scale}) translateY(${cut4TranslateY}px)`,
            transformOrigin: "center center",
          }}
        >
          <Sequence from={1314} durationInFrames={471}>
            <Video
              src={staticFile("videos/jarvis-vega/cuts/clip4_scope.mp4")}
              style={{ width: 1920, height: 1080 }}
            />
          </Sequence>
        </div>
      )}

      {/* Data Callout Badge 3: Strategic Window (frames 1420 - 1640) */}
      <VegaTelemetryBadge
        label="STRATEGIC OPPORTUNITY WINDOW"
        sublabel="REPLACEMENT CYCLE 2027–2028 | MID-TO-HIGH SEGMENT"
        startFrame={1420}
        durationInFrames={220}
        position="top-right"
        accentColor="#C084FC"
      />

      {/* Kinetic Punchline 3: Strategic Conclusion Takeaway (frames 1660 - 1780) */}
      <VegaKineticPunchline
        prefix="STRATEGIC EXECUTION"
        headline="Not just data."
        tagline="A next step."
        startFrame={1660}
        durationInFrames={120}
        accentColor="#A78BFA"
      />

      {/* CUT 5 / Closing Reveal (59.5s - 66.56s / frames 1785 - 1997) */}
      <VegaClosingReveal
        startFrame={1785}
        durationInFrames={212}
      />

      {/* Dynamic Subtitles (frames 0 to 1780) */}
      {frame < 1780 && (
        <VegaDynamicSubtitle
          cues={subtitleCues}
          accentColor="#C084FC"
        />
      )}
    </div>
  );
};
