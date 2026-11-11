import React from "react";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { Section1ShapeMorph } from "./Section1ShapeMorph";
import { Section2Origami3D } from "./Section2Origami3D";
import { Section3TelemetricUI } from "./Section3TelemetricUI";
import { Section4KineticType } from "./Section4KineticType";
import { Section5EndTitleLoop } from "./Section5EndTitleLoop";
import { KineticLyricsOverlay } from "./KineticLyricsOverlay";
import { TOTAL_SHOWREEL_FRAMES } from "./types";

export const ShowreelComposition: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#FAFAF9",
        overflow: "hidden",
      }}
    >
      {/* Section 1: Shape Morphing & Planar Expansion (Frames 0 - 264) */}
      {frame < 264 && <Section1ShapeMorph frame={frame} />}

      {/* Section 2: 2D-to-3D Dimensional Origami (Frames 264 - 528) */}
      {frame >= 264 && frame < 528 && <Section2Origami3D frame={frame} />}

      {/* Section 3: Telemetric UI & Data Matrix (Frames 528 - 792, Chorus Drop) */}
      {frame >= 528 && frame < 792 && <Section3TelemetricUI frame={frame} />}

      {/* Section 4: Kinetic Typography Architecture (Frames 792 - 1056) */}
      {frame >= 792 && frame < 1056 && <Section4KineticType frame={frame} />}

      {/* Section 5: The Monolithic Climax & Seamless Infinite Loop (Frames 1056 - 1320) */}
      {frame >= 1056 && <Section5EndTitleLoop frame={frame} />}

      {/* Dynamic Floating Kinetic Lyrics Overlay (Word-by-word synced) */}
      <KineticLyricsOverlay frame={frame} />

      {/* Frame-Accurate Soundtrack: Weird Genius & Guraisu - Train & Hot Matcha */}
      <Audio
        src={staticFile("audio/train_and_hot_matcha_cut.mp3")}
        volume={1.0}
      />
    </div>
  );
};

export { TOTAL_SHOWREEL_FRAMES };
