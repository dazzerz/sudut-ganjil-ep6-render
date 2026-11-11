/**
 * FAKTA MASUK AKAL - DESIGN SYSTEM LAYOUT & SAFE ZONES
 * Dimensi standar 9:16 vertikal (1080x1920) dan batas aman UI platform.
 */

export const VIEWPORT_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
  center: {
    x: 540,
    y: 960,
  },
} as const;

export interface ContentSafeZone {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SubtitleSafeZone {
  bottomOffset: number;
  maxHeight: number;
  sideMargin: number;
}

export interface PlatformOverlayEstimate {
  reelsRightRailWidth: number;
  reelsBottomCaptionHeight: number;
  topHeaderHeight: number;
}

export interface SafeZoneConfig {
  content: ContentSafeZone;
  subtitle: SubtitleSafeZone;
  platformOverlays: PlatformOverlayEstimate;
}

/**
 * Batas aman default untuk Facebook Reels / Shorts 9:16 vertikal.
 * Dapat di-override per komposisi atau per platform tujuan.
 */
export const defaultSafeZones: SafeZoneConfig = {
  content: {
    top: 160,
    bottom: 260,
    left: 80,
    right: 80,
  },
  subtitle: {
    bottomOffset: 320,
    maxHeight: 180,
    sideMargin: 90,
  },
  platformOverlays: {
    reelsRightRailWidth: 120,
    reelsBottomCaptionHeight: 220,
    topHeaderHeight: 140,
  },
};

/**
 * Factory helper untuk menghasilkan konfigurasi SafeZone kustom.
 */
export function createSafeZoneConfig(
  overrides?: Partial<{
    content: Partial<ContentSafeZone>;
    subtitle: Partial<SubtitleSafeZone>;
    platformOverlays: Partial<PlatformOverlayEstimate>;
  }>
): SafeZoneConfig {
  return {
    content: {
      ...defaultSafeZones.content,
      ...overrides?.content,
    },
    subtitle: {
      ...defaultSafeZones.subtitle,
      ...overrides?.subtitle,
    },
    platformOverlays: {
      ...defaultSafeZones.platformOverlays,
      ...overrides?.platformOverlays,
    },
  };
}
