import React from "react";
import {
  Audio,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const VegaManagementDeckShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // TIMING IN FRAMES (@ 30 FPS):
  // --- ACT 1: LIVE DEMO SCREEN RECORDING (0 to 1038 frames / 34.6s) ---
  // Clip 1 (Prompt Typing Sped-up & Send): 0 to 279 (9.30s)
  // Clip 2 Step 1 (Brief review): 279 to 356 (2.57s)
  // Clip 2 Step 2 (SVG cover render): 356 to 432 (2.53s)
  // Clip 2 Step 3 (Cover inspection): 432 to 509 (2.57s)
  // Clip 2 Step 4 (15 pages inspected): 509 to 585 (2.53s)
  // Clip 3 (Table Streaming & Citations): 585 to 856 (9.03s)
  // Clip 4 (Download Card & Click): 856 to 1038 (6.07s)
  //
  // --- ACT 2: ACTUAL GENERATED PPTX PRESENTATION (1038 to 1800 frames / 25.4s) ---
  // Slide 01 (Cover: LivaNova HLM S5): 1038 to 1188 (150 frames / 5.0s)
  // Slide 03 (Tantangan Klinis & Ruang Bedah): 1188 to 1338 (150 frames / 5.0s)
  // Slide 06 (Solusi Platform Modular): 1338 to 1488 (150 frames / 5.0s)
  // Slide 10 (Pilihan Paket & Harga Internal): 1488 to 1638 (150 frames / 5.0s)
  // Slide 15 (Penutup & Dukungan Surabaya): 1638 to 1773 (135 frames / 4.5s)
  // Outro Smooth Fade: 1773 to 1800 (27 frames / 0.9s)
  // Total: 1800 frames = 60.00 seconds (Max 1 minute)

  // Virtual Camera Rig for the Live Demo part (0 - 1038)
  const demoCameraScale = interpolate(
    frame,
    [0, 45, 120, 220, 279, 585, 856, 920, 1020, 1038],
    [1.0, 1.0, 1.22, 1.22, 1.10, 1.12, 1.12, 1.22, 1.25, 1.35],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    }
  );

  const demoCameraPanX = interpolate(
    frame,
    [0, 45, 120, 220, 279, 585, 856, 920, 1020, 1038],
    [0, 0, -30, -30, -15, -15, -15, -45, -50, -50],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    }
  );

  const demoCameraPanY = interpolate(
    frame,
    [0, 45, 120, 220, 279, 585, 856, 920, 1020, 1038],
    [0, 0, -15, -15, 25, 20, 20, 35, 38, 40],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    }
  );

  // Transition from Live Demo to Slide Presentation at frame 1038
  const demoOpacity = interpolate(frame, [1032, 1038], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slidesOpacity = interpolate(frame, [1036, 1038], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Global Fade-out at the very end
  const masterFade = interpolate(frame, [1775, 1799], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0f172a",
        position: "relative",
        overflow: "hidden",
        opacity: masterFade,
      }}
    >
      {/* Background Master Audio: Soft Groove Tech (-22 dB LUFS, speech ready, ZERO typing noise) */}
      <Audio
        src={staticFile("audio/vega_management_showcase_master_60s.mp3")}
      />

      {/* ======================================================== */}
      {/* ACT 1: AUTHENTIC LIVE DEMO (Frames 0 to 1038)             */}
      {/* ======================================================== */}
      {frame < 1045 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: demoOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${demoCameraScale}) translate(${demoCameraPanX}px, ${demoCameraPanY}px)`,
            transformOrigin: "center center",
          }}
        >
          {/* Clip 1: Sped-up Prompt Typing & Send (0 - 279) */}
          <Sequence from={0} durationInFrames={279}>
            <OffthreadVideo
              src={staticFile("video/vega_real/deck_clip1_prompt.mp4")}
              style={{ width: 1920, height: 1008 }}
            />
          </Sequence>

          {/* Clip 2 Step 1: Brief review (279 - 356) */}
          <Sequence from={279} durationInFrames={77}>
            <OffthreadVideo
              src={staticFile("video/vega_real/deck_clip2_step1.mp4")}
              style={{ width: 1920, height: 1008 }}
            />
          </Sequence>

          {/* Clip 2 Step 2: Render SVG cover (356 - 432) */}
          <Sequence from={356} durationInFrames={76}>
            <OffthreadVideo
              src={staticFile("video/vega_real/deck_clip2_step2.mp4")}
              style={{ width: 1920, height: 1008 }}
            />
          </Sequence>

          {/* Clip 2 Step 3: Ilustrasi cover bagus (432 - 509) */}
          <Sequence from={432} durationInFrames={77}>
            <OffthreadVideo
              src={staticFile("video/vega_real/deck_clip2_step3.mp4")}
              style={{ width: 1920, height: 1008 }}
            />
          </Sequence>

          {/* Clip 2 Step 4: 15 halaman diinspeksi (509 - 585) */}
          <Sequence from={509} durationInFrames={76}>
            <OffthreadVideo
              src={staticFile("video/vega_real/deck_clip2_step4.mp4")}
              style={{ width: 1920, height: 1008 }}
            />
          </Sequence>

          {/* Clip 3: Table Streaming (585 - 856) */}
          <Sequence from={585} durationInFrames={271}>
            <OffthreadVideo
              src={staticFile("video/vega_real/deck_clip3_stream.mp4")}
              style={{ width: 1920, height: 1008 }}
            />
          </Sequence>

          {/* Clip 4: Download Card & Click (856 - 1038) */}
          <Sequence from={856} durationInFrames={182}>
            <OffthreadVideo
              src={staticFile("video/vega_real/deck_clip4_download.mp4")}
              style={{ width: 1920, height: 1008 }}
            />
          </Sequence>
        </div>
      )}

      {/* ======================================================== */}
      {/* ACT 2: ACTUAL GENERATED PPTX PRESENTATION (1038 to 1800) */}
      {/* ======================================================== */}
      {frame >= 1030 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: slidesOpacity,
            backgroundColor: "#020617",
          }}
        >
          {/* SLIDE 01: COVER (1038 to 1188) */}
          <Sequence from={1038} durationInFrames={150}>
            {(() => {
              const relFrame = frame - 1038;
              const scale = interpolate(relFrame, [0, 150], [1.02, 1.06], {
                extrapolateRight: "clamp",
              });
              const slideFade = interpolate(relFrame, [0, 6, 144, 150], [0, 1, 1, 0.9], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: slideFade,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                  }}
                >
                  <Img
                    src={staticFile("images/livanova_slides/slide_01.png")}
                    style={{ width: 1920, height: 1080, objectFit: "contain" }}
                  />
                </div>
              );
            })()}
          </Sequence>

          {/* SLIDE 03: TANTANGAN KLINIS & RUANG BEDAH (1188 to 1338) */}
          <Sequence from={1188} durationInFrames={150}>
            {(() => {
              const relFrame = frame - 1188;
              const scale = interpolate(relFrame, [0, 150], [1.04, 1.01], {
                extrapolateRight: "clamp",
              });
              const panX = interpolate(relFrame, [0, 150], [-20, 10], {
                extrapolateRight: "clamp",
              });
              const slideFade = interpolate(relFrame, [0, 14, 136, 150], [0, 1, 1, 0.85], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: slideFade,
                    transform: `scale(${scale}) translate(${panX}px, 0px)`,
                    transformOrigin: "center center",
                  }}
                >
                  <Img
                    src={staticFile("images/livanova_slides/slide_03.png")}
                    style={{ width: 1920, height: 1080, objectFit: "contain" }}
                  />
                </div>
              );
            })()}
          </Sequence>

          {/* SLIDE 06: PLATFORM PERFUSI GENERASI TERKINI (1338 to 1488) */}
          <Sequence from={1338} durationInFrames={150}>
            {(() => {
              const relFrame = frame - 1338;
              const scale = interpolate(relFrame, [0, 150], [1.01, 1.05], {
                extrapolateRight: "clamp",
              });
              const slideFade = interpolate(relFrame, [0, 14, 136, 150], [0, 1, 1, 0.85], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: slideFade,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                  }}
                >
                  <Img
                    src={staticFile("images/livanova_slides/slide_06.png")}
                    style={{ width: 1920, height: 1080, objectFit: "contain" }}
                  />
                </div>
              );
            })()}
          </Sequence>

          {/* SLIDE 10: PILIHAN PAKET & KISARAN HARGA (1488 to 1638) */}
          <Sequence from={1488} durationInFrames={150}>
            {(() => {
              const relFrame = frame - 1488;
              const scale = interpolate(relFrame, [0, 150], [1.02, 1.05], {
                extrapolateRight: "clamp",
              });
              const panY = interpolate(relFrame, [0, 150], [10, -10], {
                extrapolateRight: "clamp",
              });
              const slideFade = interpolate(relFrame, [0, 14, 136, 150], [0, 1, 1, 0.85], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: slideFade,
                    transform: `scale(${scale}) translate(0px, ${panY}px)`,
                    transformOrigin: "center center",
                  }}
                >
                  <Img
                    src={staticFile("images/livanova_slides/slide_10.png")}
                    style={{ width: 1920, height: 1080, objectFit: "contain" }}
                  />
                </div>
              );
            })()}
          </Sequence>

          {/* SLIDE 15: PENUTUP & CALL TO ACTION (1638 to 1773) */}
          <Sequence from={1638} durationInFrames={135}>
            {(() => {
              const relFrame = frame - 1638;
              const scale = interpolate(relFrame, [0, 135], [1.04, 1.0], {
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              });
              const slideFade = interpolate(relFrame, [0, 14, 120, 135], [0, 1, 1, 0.9], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: slideFade,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                  }}
                >
                  <Img
                    src={staticFile("images/livanova_slides/slide_15.png")}
                    style={{ width: 1920, height: 1080, objectFit: "contain" }}
                  />
                </div>
              );
            })()}
          </Sequence>
        </div>
      )}
    </div>
  );
};
