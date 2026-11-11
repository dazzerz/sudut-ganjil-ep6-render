import React from "react";
import { Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Ep6Dust } from "./Ep6Dust";
import { cameraFor, Ep6Shot, XFADE } from "./ep6_shots";

const smooth = Easing.bezier(0.45, 0, 0.25, 1);

const PlaceTag: React.FC<{ text: string }> = ({ text }) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [XFADE + 6, XFADE + 26, XFADE + 140, XFADE + 168], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reveal = interpolate(f, [XFADE + 6, XFADE + 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 128,
        opacity,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: 3,
        color: "#FFFFFF",
        textShadow: "0 3px 12px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#FF5E57",
            boxShadow: "0 0 10px #FF5E57",
            opacity: f % 30 < 18 ? 1 : 0.35,
          }}
        />
        <span>{text}</span>
      </div>
      <div
        style={{
          marginTop: 10,
          height: 2,
          width: 380 * reveal,
          background: "linear-gradient(90deg, #FFD166, rgba(255,209,102,0))",
        }}
      />
    </div>
  );
};

const FlashbackLayer: React.FC<{ shot: Ep6Shot; length: number }> = ({ shot, length }) => {
  const f = useCurrentFrame();
  const cam = cameraFor(shot.index);
  const t = interpolate(f, [0, length], [0, 1], {
    extrapolateRight: "clamp",
    easing: smooth,
  });
  const scale = cam.s0 + (cam.s1 - cam.s0) * t;
  const x = cam.x0 + (cam.x1 - cam.x0) * t;
  const y = cam.y0 + (cam.y1 - cam.y0) * t;
  const glow = interpolate(Math.sin(f / 38), [-1, 1], [0.97, 1.04]);
  const opacity = shot.index === 0 ? 1 : interpolate(f, [0, XFADE], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity }}>
      <img
        src={staticFile(shot.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: String(scale),
          translate: `${x}px ${y}px`,
          filter: `brightness(${glow}) contrast(1.04) saturate(1.08)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(0,0,0,0) 52%, rgba(6,6,10,0.62) 100%)",
        }}
      />
      <Ep6Dust count={28} seed={shot.index + 3} />
      {shot.placeLabel ? <PlaceTag text={shot.placeLabel} /> : null}
    </div>
  );
};

const StudioLayer: React.FC<{ shot: Ep6Shot; length: number }> = ({ shot, length }) => {
  const f = useCurrentFrame();
  const cam = cameraFor(shot.index);
  const t = interpolate(f, [0, length], [0, 1], { extrapolateRight: "clamp", easing: smooth });
  const scale = 1.1 + (cam.s1 - cam.s0) * 0.5 * t;

  const lead = shot.index === 0 ? 0 : XFADE;
  const xs = shot.segments.map((s) => s.start_frame - shot.start + lead + s.duration_frames / 2);
  const targets = shot.segments.map((s) => (s.character === "raka" ? 42 : -42));
  const panX =
    xs.length > 1
      ? interpolate(f, xs, targets, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: smooth,
        })
      : targets[0] ?? 0;
  const panY = -10 * t;
  const opacity = shot.index === 0 ? 1 : interpolate(f, [0, XFADE], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity }}>
      <img
        src={staticFile(shot.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: String(scale),
          translate: `${panX}px ${panY}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 42%, rgba(255,150,70,0.06) 0%, rgba(10,10,14,0.5) 100%)",
        }}
      />
      <Ep6Dust count={22} seed={shot.index + 9} tint="255, 214, 150" />
    </div>
  );
};

export const Ep6ShotLayer: React.FC<{ shot: Ep6Shot }> = ({ shot }) => {
  const from = Math.max(0, shot.start - (shot.index === 0 ? 0 : XFADE));
  const duration = Math.max(1, shot.end - from);
  return (
    <Sequence from={from} durationInFrames={duration}>
      {shot.kind === "flashback" ? (
        <FlashbackLayer shot={shot} length={duration} />
      ) : (
        <StudioLayer shot={shot} length={duration} />
      )}
    </Sequence>
  );
};
