import React from "react";
import {
  Audio,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * JainalActivitySyncDemo60s
 * 
 * 60-second corporate live demo showcasing Jainal Sales Assistant Omnichannel Activity Management:
 * 
 * Part 1 (Frames 0 - 900 / 0.0s - 30.0s):
 *   Platform: Web Workspace (idsMED)
 *   Action: Sales rep logs visit: "hari kamis saya mau ke rs abdi waluyo, mau nawarin hamilton c6, tolong buatin activitynya yaa"
 *   Response: Instant Activity Created (ID: 365581, RS Abdi Waluyo, Hamilton C6, Reminder 17:00 & 19:00 WIB).
 * 
 * Part 2 (Frames 900 - 1800 / 30.0s - 60.0s):
 *   Platform: Mobile Bot (Telegram Assistant)
 *   Action: Field rep on the road checks active schedule: "Activity saya ada apa aja yaa?"
 *   Response: Instant real-time retrieval confirming Activity ID 365581 is active & synced!
 * 
 * Total: 1800 frames = Exactly 60.00s @ 30 FPS.
 * Audio: Soft Corporate Tech Groove (-22 dB LUFS, zero typing noise).
 * UI: 100% authentic recording, zero artificial cards inside footage.
 */

export const JainalActivitySyncDemo60s: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const masterFade = interpolate(
    frame,
    [0, 15, 1780, 1800],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0b0f19",
        position: "relative",
        overflow: "hidden",
        opacity: masterFade,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <Audio
        src={staticFile("audio/vega_management_showcase_master_60s.mp3")}
        volume={0.85}
      />

      {/* ========================================================= */}
      {/* PART 1: WEB WORKSPACE (0 - 900 frames / 0.0s - 30.0s) */}
      {/* ========================================================= */}
      <Sequence from={0} durationInFrames={900}>
        {(() => {
          const relFrame = frame;

          // Camera push-in during typing (0 - 210) and smooth re-center during response (210 - 900)
          const cameraScale = interpolate(
            relFrame,
            [0, 190, 290, 850, 900],
            [1.0, 1.035, 1.015, 1.008, 1.0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.25, 1, 0.5, 1),
            }
          );

          const cameraPanY = interpolate(
            relFrame,
            [0, 190, 310, 850, 900],
            [0, -16, 6, 4, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.25, 1, 0.5, 1),
            }
          );

          const segFade = interpolate(relFrame, [888, 900], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: segFade,
                transform: `scale(${cameraScale}) translateY(${cameraPanY}px)`,
                transformOrigin: "center center",
              }}
            >
              <OffthreadVideo
                src={staticFile("video/jainal_activity/act_web_30s.mp4")}
                style={{
                  width: 1920,
                  height: 1008,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          );
        })()}
      </Sequence>

      {/* ========================================================= */}
      {/* PART 2: MOBILE BOT SYNC (900 - 1800 frames / 30.0s - 60.0s) */}
      {/* ========================================================= */}
      <Sequence from={900} durationInFrames={900}>
        {(() => {
          const relFrame = frame - 900;

          const segFade = interpolate(relFrame, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Phone entrance slide & settle
          const phoneSlideY = interpolate(relFrame, [0, 20], [30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          const phoneScale = interpolate(
            relFrame,
            [0, 20, 200, 850, 900],
            [0.96, 1.0, 1.015, 1.01, 1.0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.25, 1, 0.5, 1),
            }
          );

          // Info cards reveal on the left side
          const infoOpacity = interpolate(relFrame, [10, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const infoSlideX = interpolate(relFrame, [10, 25], [-20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: segFade,
              }}
            >
              {/* Ambient backdrop glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 65% 50%, rgba(14, 165, 233, 0.15) 0%, rgba(2, 132, 199, 0.05) 45%, transparent 70%)",
                }}
              />

              <div
                style={{
                  width: "100%",
                  maxWidth: 1600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 80px",
                  zIndex: 10,
                }}
              >
                {/* Left side: Context badge & sync metadata */}
                <div
                  style={{
                    width: 580,
                    opacity: infoOpacity,
                    transform: `translateX(${infoSlideX}px)`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 14px",
                      borderRadius: 20,
                      backgroundColor: "rgba(14, 165, 233, 0.12)",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                      color: "#38bdf8",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      width: "fit-content",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#38bdf8",
                        boxShadow: "0 0 8px #38bdf8",
                      }}
                    />
                    Omnichannel Real-Time Sync
                  </div>

                  <div>
                    <h2
                      style={{
                        fontSize: 40,
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1.15,
                        margin: 0,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Jainal Mobile Assistant
                    </h2>
                    <p
                      style={{
                        fontSize: 17,
                        color: "#94a3b8",
                        marginTop: 10,
                        lineHeight: 1.5,
                      }}
                    >
                      Aktivitas yang dibuat di Web Workspace langsung tersinkronisasi otomatis ke Bot Telegram / WhatsApp sales rep di lapangan.
                    </p>
                  </div>

                  {/* Sync status card */}
                  <div
                    style={{
                      backgroundColor: "rgba(15, 23, 42, 0.75)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 16,
                      padding: "20px 24px",
                      backdropFilter: "blur(12px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                        paddingBottom: 10,
                      }}
                    >
                      <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>
                        SYNC STATUS
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#10b981",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "#10b981",
                            boxShadow: "0 0 6px #10b981",
                          }}
                        />
                        CONNECTED · 2-WAY SYNC
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, color: "#94a3b8" }}>Activity ID</span>
                        <span style={{ fontSize: 14, color: "#f8fafc", fontWeight: 700 }}>
                          #365581
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, color: "#94a3b8" }}>Customer Target</span>
                        <span style={{ fontSize: 14, color: "#f8fafc", fontWeight: 600 }}>
                          RS Abdi Waluyo
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, color: "#94a3b8" }}>Product Focus</span>
                        <span style={{ fontSize: 14, color: "#38bdf8", fontWeight: 600 }}>
                          Hamilton C6
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, color: "#94a3b8" }}>Jadwal Visit</span>
                        <span style={{ fontSize: 14, color: "#f8fafc", fontWeight: 600 }}>
                          Kamis, 12 Nov 2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Modern Smartphone Mockup */}
                <div
                  style={{
                    position: "relative",
                    transform: `translateY(${phoneSlideY}px) scale(${phoneScale})`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* Phone Outer Chassis */}
                  <div
                    style={{
                      width: 430,
                      height: 940,
                      borderRadius: 48,
                      padding: 12,
                      backgroundColor: "#18181b",
                      border: "3px solid #3f3f46",
                      boxShadow:
                        "0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(14,165,233,0.25), inset 0 0 4px rgba(255,255,255,0.2)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {/* Screen Viewport with Rounded Corners */}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 38,
                        overflow: "hidden",
                        position: "relative",
                        backgroundColor: "#000000",
                      }}
                    >
                      <OffthreadVideo
                        src={staticFile("video/jainal_activity/act_mobile_30s.mp4")}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* Minimal timeline progress indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 50,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / 1800) * 100}%`,
            background: "linear-gradient(90deg, #0284c7, #38bdf8)",
            boxShadow: "0 0 10px #38bdf8",
          }}
        />
      </div>
    </div>
  );
};
