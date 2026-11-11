import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const THE_QUIET_LOGOS_TOTAL_FRAMES = 750; // 25.0s @ 30 FPS

// Color palette - Cinematic URROFI Aesthetic
const PALETTE = {
  white: "#FFFFFF",
  creamText: "#F8FAFC",
  cyanAccent: "#00F2FE",
  darkVignette: "rgba(4, 10, 18, 0.75)",
  cardBg: "#FFFFFF",
  cardText: "#0F172A",
  hudBorder: "rgba(0, 242, 254, 0.4)",
  hudBg: "rgba(15, 23, 42, 0.65)",
};

// Top Hook Badge (Detik 0.0 - 2.6 / Frames 0 - 80)
const HookBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring pop-in from top
  const enterSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const enterY = interpolate(enterSpring, [0, 1], [-80, 0]);
  const enterOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth exit before title drop
  const exitOpacity = interpolate(frame, [65, 78], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < 8 || frame > 82) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 220,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translateY(${enterY}px)`,
        opacity: enterOpacity * exitOpacity,
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      {/* White rounded pill badge like URROFI */}
      <div
        style={{
          backgroundColor: PALETTE.cardBg,
          color: PALETTE.cardText,
          padding: "16px 40px",
          borderRadius: "28px",
          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "44px",
            fontWeight: 800,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          LOGOS, jadi kantor mati?
        </span>
      </div>

      {/* Floating secondary punchline below badge */}
      <div
        style={{
          marginTop: "16px",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "10px 24px",
          borderRadius: "18px",
        }}
      >
        <span
          style={{
            color: PALETTE.white,
            fontSize: "30px",
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: "0.5px",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          100% gak ada orang..
        </span>
      </div>
    </div>
  );
};

// Title Drop (Detik 2.5 - 4.5 / Frames 75 - 135)
const TitleDrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title appears right on bass drop (frame 75)
  const titleSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  const scale = interpolate(titleSpring, [0, 1], [1.28, 1.0]);
  const opacity = interpolate(frame, [75, 85, 125, 134], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < 73 || frame > 135) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
        zIndex: 45,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontSize: "66px",
          fontWeight: 900,
          color: PALETTE.white,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          letterSpacing: "5px",
          textAlign: "center",
          textShadow:
            "0 6px 30px rgba(0, 0, 0, 0.95), 0 0 45px rgba(0, 242, 254, 0.35)",
        }}
      >
        THE QUIET LOGOS
      </div>

      {/* Elegant cyan hairline separator */}
      <div
        style={{
          width: interpolate(titleSpring, [0, 1], [20, 160]),
          height: "3px",
          backgroundColor: PALETTE.cyanAccent,
          margin: "18px 0",
          boxShadow: "0 0 16px rgba(0, 242, 254, 0.8)",
          borderRadius: "2px",
        }}
      />

      <div
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#CBD5E1",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          letterSpacing: "9px",
          textAlign: "center",
          textShadow: "0 4px 16px rgba(0, 0, 0, 0.9)",
        }}
      >
        A CINEMATIC WALKTHROUGH
      </div>
    </div>
  );
};

// Location HUD Tag (Minimalist Hairline Badge in Safe Area)
interface LocationHudProps {
  timeTag: string;
  locationName: string;
  statusTag: string;
  startFrame: number;
  durationFrames: number;
}

const LocationHud: React.FC<LocationHudProps> = ({
  timeTag,
  locationName,
  statusTag,
  startFrame,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 5 || localFrame > durationFrames - 5) return null;

  const opacity = interpolate(
    localFrame,
    [5, 18, durationFrames - 18, durationFrames - 5],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const slideX = interpolate(localFrame, [5, 20], [-25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 240, // Above social media safe-zone
        left: 70,
        opacity,
        transform: `translateX(${slideX}px)`,
        zIndex: 35,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        pointerEvents: "none",
      }}
    >
      {/* Cyan vertical accent bar */}
      <div
        style={{
          width: "4px",
          backgroundColor: PALETTE.cyanAccent,
          borderRadius: "2px",
          marginRight: "14px",
          boxShadow: "0 0 12px rgba(0, 242, 254, 0.7)",
        }}
      />

      {/* Text block */}
      <div
        style={{
          backgroundColor: PALETTE.hudBg,
          backdropFilter: "blur(12px)",
          border: `1px solid ${PALETTE.hudBorder}`,
          borderRadius: "10px",
          padding: "12px 20px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: PALETTE.cyanAccent,
            fontFamily: "monospace, monospace",
            letterSpacing: "2px",
            marginBottom: "4px",
          }}
        >
          {timeTag}
        </div>
        <div
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: PALETTE.white,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: "0.5px",
            marginBottom: "4px",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          {locationName}
        </div>
        <div
          style={{
            fontSize: "19px",
            fontWeight: 600,
            color: "#94A3B8",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: "1px",
          }}
        >
          {statusTag}
        </div>
      </div>
    </div>
  );
};

// Outro Card (Detik 22.0 - 25.0 / Frames 660 - 750)
const OutroCard: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame < 660) return null;

  const opacity = interpolate(frame, [660, 680, 735, 750], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [660, 735], [0.96, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontSize: "62px",
          fontWeight: 900,
          color: PALETTE.white,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          letterSpacing: "4px",
          textAlign: "center",
          textShadow:
            "0 6px 30px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 242, 254, 0.35)",
        }}
      >
        THE QUIET LOGOS
      </div>

      <div
        style={{
          width: "120px",
          height: "3px",
          backgroundColor: PALETTE.cyanAccent,
          margin: "16px 0",
          boxShadow: "0 0 16px rgba(0, 242, 254, 0.8)",
          borderRadius: "2px",
        }}
      />

      <div
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#94A3B8",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          letterSpacing: "7px",
          textAlign: "center",
        }}
      >
        BEKASI • METROLINK LOGISTICS HUB
      </div>
    </div>
  );
};

// Flash Transition between beat cuts
const FlashTransition: React.FC<{ cutFrame: number }> = ({ cutFrame }) => {
  const frame = useCurrentFrame();
  const diff = frame - cutFrame;

  if (diff < 0 || diff > 6) return null;

  const flashOpacity = interpolate(diff, [0, 1, 6], [0, 0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        opacity: flashOpacity,
        zIndex: 38,
        pointerEvents: "none",
      }}
    />
  );
};

// Master Composition: The Quiet Logos
export const TheQuietLogos: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle continuous cinematic handheld breathing
  const driftY = Math.sin(frame * 0.04) * 3;
  const driftScale = 1.0 + Math.sin(frame * 0.03) * 0.008;

  // Global fade to black at the very end
  const blackFade = interpolate(frame, [735, 750], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      {/* Container with cinematic micro-drift */}
      <AbsoluteFill
        style={{
          transform: `scale(${driftScale}) translateY(${driftY}px)`,
          filter: "contrast(1.15) brightness(0.93) saturate(0.88)",
        }}
      >
        {/* Shot 1: Break room & Ping Pong Walk (0 to 135 / 0s to 4.5s) */}
        <Sequence from={0} durationInFrames={135}>
          <AbsoluteFill>
            <OffthreadVideo
              src={staticFile("projects/the-quiet-logos/video/shot1_breakroom.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AbsoluteFill>
        </Sequence>

        {/* Shot 2: Vast Warehouse Glass Window (135 to 285 / 4.5s to 9.5s) */}
        <Sequence from={135} durationInFrames={150}>
          <AbsoluteFill>
            <OffthreadVideo
              src={staticFile("projects/the-quiet-logos/video/shot2_warehouse_window.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AbsoluteFill>
        </Sequence>

        {/* Shot 3: Dark Meeting Room Peeking (285 to 420 / 9.5s to 14.0s) */}
        <Sequence from={285} durationInFrames={135}>
          <AbsoluteFill>
            <OffthreadVideo
              src={staticFile("projects/the-quiet-logos/video/shot3_dark_meeting_room.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AbsoluteFill>
        </Sequence>

        {/* Shot 4: Workstations, Safety Vest & Jalur Evakuasi (420 to 585 / 14.0s to 19.5s) */}
        <Sequence from={420} durationInFrames={165}>
          <AbsoluteFill>
            <OffthreadVideo
              src={staticFile("projects/the-quiet-logos/video/shot4_workstations.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AbsoluteFill>
        </Sequence>

        {/* Shot 5: Logistics Box, Printer Station & End Corridor (585 to 750 / 19.5s to 25.0s) */}
        <Sequence from={585} durationInFrames={165}>
          <AbsoluteFill>
            <OffthreadVideo
              src={staticFile("projects/the-quiet-logos/video/shot5_corridor_printer.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>

      {/* Beat Cut Flash Transitions */}
      <FlashTransition cutFrame={135} />
      <FlashTransition cutFrame={285} />
      <FlashTransition cutFrame={420} />
      <FlashTransition cutFrame={585} />

      {/* Atmospheric Cold Teal / Shadow Color Wash Overlay */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(8, 20, 32, 0.25) 0%, rgba(0, 0, 0, 0) 40%, rgba(2, 6, 23, 0.4) 100%)",
          mixBlendMode: "color",
          pointerEvents: "none",
          zIndex: 20,
        }}
      />

      {/* Cinematic Vignette Overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0) 45%, rgba(2, 8, 16, 0.65) 100%)",
          pointerEvents: "none",
          zIndex: 25,
        }}
      />

      {/* Subtle 35mm Organic Film Noise Overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
          opacity: 0.35,
          pointerEvents: "none",
          zIndex: 28,
        }}
      />

      {/* Top Hook Badge (Shot 1: 0 - 80) */}
      <HookBadge />

      {/* Main Title Drop (Shot 1: 75 - 135) */}
      <TitleDrop />

      {/* Location HUDs for Shot 2, 3, 4, 5 */}
      <LocationHud
        timeTag="[01:14 AM] • HUB LOGISTIK"
        locationName="GUDANG SENTRAL UTAMA"
        statusTag="PANDANGAN DARI LANTAI 2 • KOSONG"
        startFrame={140}
        durationFrames={135}
      />

      <LocationHud
        timeTag="[01:15 AM] • EXECUTIVE AREA"
        locationName="RUANG RAPAT DIREKSI"
        statusTag="LAYAR HITAM • 0 AKTIVITAS"
        startFrame={290}
        durationFrames={120}
      />

      <LocationHud
        timeTag="[01:16 AM] • MAIN OFFICE FLOOR"
        locationName="LANTAI OPERASIONAL LOGOS"
        statusTag="KAPASITAS 200+ MEJA • STANDBY"
        startFrame={425}
        durationFrames={150}
      />

      <LocationHud
        timeTag="[01:17 AM] • CORRIDOR"
        locationName="JALUR LOGISTIK AKHIR"
        statusTag="STASIUN CETAK & DOKUMEN"
        startFrame={590}
        durationFrames={70}
      />

      {/* Outro Ending Card */}
      <OutroCard />

      {/* Master Soundtrack (Ambient Beat + Sound Design) */}
      <Audio
        src={staticFile("projects/the-quiet-logos/audio/the_quiet_logos_bgm.mp3")}
        volume={1.0}
      />

      {/* Final Fade To Black */}
      <AbsoluteFill
        style={{
          backgroundColor: "#000000",
          opacity: blackFade,
          zIndex: 99,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
