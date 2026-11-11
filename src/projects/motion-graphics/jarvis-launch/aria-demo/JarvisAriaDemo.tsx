import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Scene1ActivityLogging } from "./Scene1ActivityLogging";
import { Scene2CreateQuotation } from "./Scene2CreateQuotation";
import { Scene3ResultQuotation } from "./Scene3ResultQuotation";
import { Scene4ClosingReveal } from "./Scene4ClosingReveal";

export const JarvisAriaDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Total Duration: 2700 Frames (90.0s @ 30 FPS)
  // Clean, non-overlapping speech intervals for dynamic music volume ducking
  const voIntervals = [
    [15, 545], // Scene 1 Part A
    [600, 725], // Scene 1 Part B
    [765, 1355], // Scene 2 Part A (750 + 15 to 750 + 605)
    [1530, 1660], // Scene 2 Part B (750 + 780 to 750 + 910)
    [1725, 2215], // Scene 3 Part A (1710 + 15 to 1710 + 505)
    [2250, 2375], // Scene 3 Part B (1710 + 540 to 1710 + 665)
    [2415, 2670], // Scene 4 Closing (2400 + 15 to 2400 + 270)
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
      {/* Master Soundtrack 90s */}
      <Audio
        src={staticFile("audio/jarvis-aria/jarvis_aria_soundtrack_90s.mp3")}
        volume={bgmVolume}
      />

      {/* Scene 1: Activity & Visit Logging (0:00 - 0:25 / Frame 0 - 750) */}
      <Sequence from={0} durationInFrames={750}>
        <Scene1ActivityLogging />
      </Sequence>

      {/* Scene 2: Create Quotation / SPH (0:25 - 0:57 / Frame 750 - 1710) */}
      <Sequence from={750} durationInFrames={960}>
        <Scene2CreateQuotation />
      </Sequence>

      {/* Scene 3: Production-Grade Legal Document (0:57 - 1:20 / Frame 1710 - 2400) */}
      <Sequence from={1710} durationInFrames={690}>
        <Scene3ResultQuotation />
      </Sequence>

      {/* Scene 4: Monolithic Brand Reveal & Tagline (1:20 - 1:30 / Frame 2400 - 2700) */}
      <Sequence from={2400} durationInFrames={300}>
        <Scene4ClosingReveal />
      </Sequence>
    </div>
  );
};
