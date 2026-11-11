import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Scene1CdakbEreport } from "./Scene1CdakbEreport";
import { Scene2OrderTracing } from "./Scene2OrderTracing";
import { Scene3DocumentSearch } from "./Scene3DocumentSearch";
import { Scene4ClosingReveal } from "./Scene4ClosingReveal";

export const JarvisSageDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Voiceover intervals for smart soundtrack ducking (total: 2400 frames / 80.0s @ 30 FPS)
  // [startFrame, endFrame]
  const voIntervals = [
    [30, 265],   // Scene 1: Di balik setiap kelancaran...
    [270, 535],  // Scene 1: Pelaporan regulasi CDAKB...
    [545, 755],  // Scene 1: Sekarang, cukup satu instruksi...
    [765, 895],  // Scene 1: Reports that used to take hours...
    [900, 975],  // Scene 2: Lalu, bagaimana dengan pelacakan...
    [980, 1215], // Scene 2: Tidak ada lagi chat manual...
    [1225, 1420],// Scene 2: Cukup sebutkan nomor PO...
    [1430, 1555],// Scene 2: Visibility without the back-and-forth...
    [1560, 1680],// Scene 3: Butuh dokumen tender...
    [1685, 1920],// Scene 3: Lupakan pencarian manual...
    [1926, 2060],// Scene 3: The document you need...
    [2070, 2155],// Scene 4: Tanpa follow-up berulang...
    [2160, 2300],// Scene 4: JARVIS SAGE. Your back office companion...
  ];

  const isSpeaking = voIntervals.some(
    ([start, end]) => frame >= start && frame <= end
  );

  const bgmVolume = isSpeaking ? 0.16 : 0.45;

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#050811",
        overflow: "hidden",
      }}
    >
      {/* Master Soundtrack (Sage Electronic Tech Beats) */}
      <Audio
        src={staticFile("audio/jarvis-sage/jarvis_sage_soundtrack.mp3")}
        volume={bgmVolume}
      />

      {/* Main Master Voiceover Audio */}
      <Sequence from={30} durationInFrames={2265}>
        <Audio
          src={staticFile("audio/jarvis-sage/sage_vo_full.mp3")}
          volume={1.0}
        />
      </Sequence>

      {/* Scene 1: CDAKB & E-Report (0:00 - 0:30 / Frame 0 - 900) */}
      <Sequence from={0} durationInFrames={900}>
        <Scene1CdakbEreport />
      </Sequence>

      {/* Scene 2: Order Tracing & ETA Telemetry (0:30 - 0:52 / Frame 900 - 1560) */}
      <Sequence from={900} durationInFrames={660}>
        <Scene2OrderTracing />
      </Sequence>

      {/* Scene 3: Instant Document Search (0:52 - 1:09 / Frame 1560 - 2070) */}
      <Sequence from={1560} durationInFrames={510}>
        <Scene3DocumentSearch />
      </Sequence>

      {/* Scene 4: Monolithic Brand Reveal & Taglines (1:09 - 1:20 / Frame 2070 - 2400) */}
      <Sequence from={2070} durationInFrames={330}>
        <Scene4ClosingReveal />
      </Sequence>
    </div>
  );
};
