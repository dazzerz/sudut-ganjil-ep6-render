import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AUDIO_LEAD,
  CROSSFADE,
  FPS,
  SceneData,
  scenes,
  TOTAL_FRAMES,
} from "./scenes";

// Gerak kamera halus per adegan (bergantian agar tidak monoton)
const MOVES = [
  { s0: 1.0, s1: 1.14, x0: 0, x1: -30, y0: 0, y1: -20 },
  { s0: 1.14, s1: 1.02, x0: -30, x1: 20, y0: -10, y1: 10 },
  { s0: 1.02, s1: 1.15, x0: 25, x1: -15, y0: 10, y1: -25 },
  { s0: 1.12, s1: 1.0, x0: 0, x1: 30, y0: -20, y1: 0 },
];

const SceneImage: React.FC<{ scene: SceneData; index: number }> = ({
  scene,
  index,
}) => {
  const frame = useCurrentFrame();
  const m = MOVES[index % MOVES.length];
  const t = (v0: number, v1: number) =>
    interpolate(frame, [0, scene.frames + CROSSFADE], [v0, v1], {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateRight: "clamp",
    });
  const fadeIn =
    index === 0
      ? 1
      : interpolate(frame, [0, CROSSFADE], [0, 1], {
          extrapolateRight: "clamp",
        });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <Img
        src={staticFile(`images/gaji-habis/s${scene.id}.jpg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: t(m.s0, m.s1),
          translate: `${t(m.x0, m.x1)}px ${t(m.y0, m.y1)}px`,
        }}
      />
    </AbsoluteFill>
  );
};

// Subtitle kuning per kalimat, tanpa kotak pembungkus
const Subtitle: React.FC<{ scene: SceneData }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sentences = scene.text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const totalChars = sentences.reduce((a, s) => a + s.length, 0);
  const speakFrames = scene.duration * FPS;

  let acc = 0;
  const cues = sentences.map((s) => {
    const start = AUDIO_LEAD + (acc / totalChars) * speakFrames;
    acc += s.length;
    const end = AUDIO_LEAD + (acc / totalChars) * speakFrames;
    return { s, start, end };
  });

  const active = cues.find((c, i) =>
    i === cues.length - 1 ? frame >= c.start : frame >= c.start && frame < c.end
  );
  if (!active) return null;

  const local = frame - active.start;
  const pop = spring({ frame: local, fps, config: { damping: 14, stiffness: 180 } });
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        bottom: 250,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        opacity,
        scale: interpolate(pop, [0, 1], [0.92, 1]),
        translate: `0px ${interpolate(pop, [0, 1], [14, 0])}px`,
      }}
    >
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', Arial, sans-serif",
          fontSize: 48,
          lineHeight: 1.25,
          fontWeight: 900,
          color: "#FFE600",
          WebkitTextStroke: "9px #000",
          paintOrder: "stroke fill",
          textShadow: "0 5px 16px rgba(0,0,0,0.85)",
        }}
      >
        {active.s}
      </span>
    </div>
  );
};

// Debu halus melayang agar layar tidak membeku
const Dust: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: 16 }).map((_, i) => {
        const x = (i * 197) % 1080;
        const speed = 0.25 + (i % 4) * 0.12;
        const y = 1920 - ((frame * speed * 3 + i * 211) % 2100);
        const drift = Math.sin(frame / 50 + i) * 22;
        const size = 3 + (i % 3) * 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + drift,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "rgba(255, 235, 190, 0.55)",
              filter: "blur(1px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 70, 90], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 14], [-24, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 170,
        left: 70,
        right: 70,
        textAlign: "center",
        opacity,
        translate: `0px ${y}px`,
        fontFamily: "'Montserrat', 'Inter', Arial, sans-serif",
        fontWeight: 900,
        fontSize: 54,
        lineHeight: 1.15,
        color: "#FFFFFF",
        WebkitTextStroke: "10px #000",
        paintOrder: "stroke fill",
        textShadow: "0 6px 18px rgba(0,0,0,0.8)",
      }}
    >
      POV: GAJIMU HABIS
      <br />
      <span style={{ color: "#FFE600" }}>TANGGAL 10</span>
    </div>
  );
};

export const GajiHabisPOV: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b10" }}>
      {scenes.map((scene, i) => (
        <Sequence
          key={scene.id}
          from={scene.start}
          durationInFrames={scene.frames + CROSSFADE}
        >
          <SceneImage scene={scene} index={i} />
        </Sequence>
      ))}

      <Dust />

      {/* Gradien bawah agar subtitle terbaca, tanpa kotak */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 32%), linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 20%)",
        }}
      />

      <Sequence from={0} durationInFrames={95}>
        <Hook />
      </Sequence>

      {/* Background Music Mellow / Lo-Fi */}
      <Audio
        src={staticFile("audio/jarvis-connected/jarvis_connected_soundtrack_98s.mp3")}
        volume={(f) =>
          interpolate(f, [0, 30, TOTAL_FRAMES - 45, TOTAL_FRAMES], [0, 0.12, 0.12, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {scenes.map((scene) => (
        <Sequence key={`sub-${scene.id}`} from={scene.start} durationInFrames={scene.frames}>
          <Subtitle scene={scene} />
          <Sequence from={AUDIO_LEAD}>
            <Audio src={staticFile(`audio/gaji-habis/s${scene.id}.mp3`)} />
          </Sequence>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export { TOTAL_FRAMES };
