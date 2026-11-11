/**
 * FAKTA MASUK AKAL - DESIGN SYSTEM THEME
 * Palet warna token dan kontrak tema fleksibel untuk video edukasi.
 */

export interface MotionTheme {
  id: string;
  name: string;
  colors: {
    background: string;
    backgroundSurface: string;
    backgroundDeep: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accentPrimary: string;   // Solar Orange
    accentSecondary: string; // Electric Cyan
    accentWarning: string;
    accentSuccess: string;
    borderSubtle: string;
    shadowColor: string;
  };
}

/**
 * Palet Standar Fakta Masuk Akal:
 * Deep Midnight Blue + Warm Off-White + Solar Orange Accent
 */
export const defaultFaktaTheme: MotionTheme = {
  id: "fakta-default-dark",
  name: "Fakta Masuk Akal Default Dark",
  colors: {
    background: "#0B1325",
    backgroundSurface: "#14203D",
    backgroundDeep: "#060A14",
    textPrimary: "#F8F9FA",
    textSecondary: "#E2E8F0",
    textMuted: "#94A3B8",
    accentPrimary: "#FF6B35",
    accentSecondary: "#00C2CB",
    accentWarning: "#F59E0B",
    accentSuccess: "#10B981",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
    shadowColor: "rgba(0, 0, 0, 0.45)",
  },
};
