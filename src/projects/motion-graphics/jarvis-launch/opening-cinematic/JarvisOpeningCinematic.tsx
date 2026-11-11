import React from "react";
import { Sequence, Audio, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Shot1MorningTension } from "./Shot1MorningTension";
import { Shot2RepetitiveWork } from "./Shot2RepetitiveWork";
import { Shot3BoardroomWaiting } from "./Shot3BoardroomWaiting";
import { Shot4FadeToBlack } from "./Shot4FadeToBlack";
import { Shot5JarvisReveal } from "./Shot5JarvisReveal";

export const JarvisOpeningCinematic: React.FC = () => {
  const frame = useCurrentFrame();

  // Master soundtrack volume envelope:
  // - Starts gentle, sits under voiceover (0.75)
  // - Dips slightly in dark void (0.65)
  // - Sits balanced under Shot 5 voiceover (0.68)
  // - Swells to full glorious presence after VO finishes (1.0)
  // - Subtle fade-out at the very end
  const musicVolume = interpolate(
    frame,
    [0, 60, 1350, 1800, 2050, 2120, 2580, 2620, 2680, 2700],
    [0, 0.75, 0.7, 0.65, 0.8, 0.68, 0.68, 1.0, 1.0, 0.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

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
      {/* Master 90-Second Cinematic Soundtrack */}
      <Audio
        src={staticFile("audio/jarvis/jarvis_opening_soundtrack.mp3")}
        startFrom={0}
        endAt={2700}
        volume={musicVolume}
      />

      {/* SHOT 1: Morning Tension (0:00 - 0:15 / Frames 0 - 450) */}
      <Sequence from={0} durationInFrames={450} name="Shot 1: Morning Tension">
        <Shot1MorningTension />
      </Sequence>

      {/* SHOT 2: Repetitive Work (0:15 - 0:30 / Frames 450 - 900) */}
      <Sequence from={450} durationInFrames={450} name="Shot 2: Repetitive Work">
        <Shot2RepetitiveWork />
      </Sequence>

      {/* SHOT 3: Boardroom Waiting (0:30 - 0:45 / Frames 900 - 1350) */}
      <Sequence from={900} durationInFrames={450} name="Shot 3: Boardroom Waiting">
        <Shot3BoardroomWaiting />
      </Sequence>

      {/* SHOT 4: Fade to Black (0:45 - 1:10 / Frames 1350 - 2100) */}
      <Sequence from={1350} durationInFrames={750} name="Shot 4: Fade To Black">
        <Shot4FadeToBlack />
      </Sequence>

      {/* SHOT 5: Jarvis Reveal (1:10 - 1:30 / Frames 2100 - 2700) */}
      <Sequence from={2100} durationInFrames={600} name="Shot 5: Jarvis Reveal">
        <Shot5JarvisReveal />
      </Sequence>
    </div>
  );
};
