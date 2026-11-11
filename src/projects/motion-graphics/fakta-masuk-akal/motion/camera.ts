/**
 * FAKTA MASUK AKAL - VIRTUAL CAMERA & PARALLAX ENGINE
 * Komputasi deterministik posisi kamera, zoom, dan proyeksi lapisan 2.5D.
 *
 * KONTRAK SISTEM KOORDINAT:
 * - Viewport: 1080 x 1920 (rasio 9:16 vertikal).
 * - Titik Pusat Kanvas (Center / Origin C): (540, 960).
 * - Sumbu X: positif mengarah ke kanan.
 * - Sumbu Y: positif mengarah ke bawah.
 * - lookAt (P_cam): koordinat target di ruang dunia yang dibidik kamera untuk dibawa ke titik tengah kanvas.
 * - Zoom (Z): faktor perbesaran. Z = 1.0 (normal 100%), Z > 1.0 (zoom-in / tele), Z < 1.0 (zoom-out / wide).
 * - Transform-Origin pada CSS: selalu dipatok pada titik pusat (540px, 960px).
 *
 * DEFINISI DEPTH (D):
 * - D = 0.0 : Lapisan tak terhingga (langit/grid statis jauh), tidak bergeser saat pan.
 * - 0.0 < D < 1.0 : Latar belakang/tengah di belakang bidang fokus (bergerak lebih lambat dari kamera).
 * - D = 1.0 : Bidang fokus utama (Focal Plane) tempat objek utama berada. Bergerak 1:1 terhadap kamera.
 * - D > 1.0 : Latar depan (Foreground), bergerak lebih cepat saat kamera bergerak, menciptakan efek parallax alami.
 * - isScreenFixed = true : Kebal kamera (D diabaikan, cameraScale = 1.0, offset = (0, 0)).
 */

import { VIEWPORT_CONFIG } from "../design-system/layout";
import type {
  CameraKeyframe,
  CameraState,
  CameraTransform,
  Vector2D,
} from "./types";

export const DEFAULT_CAMERA_STATE: CameraState = {
  lookAt: { ...VIEWPORT_CONFIG.center },
  zoom: 1.0,
};

/**
 * Menghitung transformasi kamera (translasi & skala) untuk layer tertentu pada depth D.
 * Menghasilkan nilai translasi pixel dan skala optik yang harus diterapkan dengan
 * transform-origin di titik tengah viewport (center).
 */
export function computeLayerTransform(
  camera: CameraState,
  depth: number,
  isScreenFixed: boolean = false,
  center: Vector2D = VIEWPORT_CONFIG.center
): CameraTransform {
  // Jika layer screen-fixed (UI, watermark, text, subtitle), kamera tidak memengaruhinya.
  if (isScreenFixed) {
    return {
      translateX: 0,
      translateY: 0,
      cameraScale: 1.0,
    };
  }

  // Skala optik kamera pada depth D:
  // D = 1.0 -> cameraScale = zoom
  // D = 0.0 -> cameraScale = 1.0 (tidak membesar)
  const cameraScale = 1.0 + (camera.zoom - 1.0) * depth;

  // Pergeseran titik bidik terhadap titik pusat viewport
  const deltaX = camera.lookAt.x - center.x;
  const deltaY = camera.lookAt.y - center.y;

  // Nilai translasi CSS yang mengompensasi skala dengan transform-origin di center:
  // t = - cameraScale * delta * depth
  const translateX = -cameraScale * deltaX * depth;
  const translateY = -cameraScale * deltaY * depth;

  return {
    translateX,
    translateY,
    cameraScale,
  };
}

/**
 * Memproyeksikan titik koordinat dunia (worldPoint) ke koordinat layar (screenPoint)
 * berdasarkan posisi kamera dan depth layer.
 *
 * Rumus: P_screen = Center + cameraScale * (P_world - Center) + (translateX, translateY)
 */
export function projectWorldToScreen(
  worldPoint: Vector2D,
  camera: CameraState,
  depth: number,
  center: Vector2D = VIEWPORT_CONFIG.center
): Vector2D {
  const transform = computeLayerTransform(camera, depth, false, center);

  const screenX =
    center.x +
    transform.cameraScale * (worldPoint.x - center.x) +
    transform.translateX;

  const screenY =
    center.y +
    transform.cameraScale * (worldPoint.y - center.y) +
    transform.translateY;

  return {
    x: screenX,
    y: screenY,
  };
}

/**
 * Helper untuk memverifikasi di mana posisi titik bidik (lookAt) terproyeksikan pada layar.
 * Pada focal plane (depth = 1.0), lookAt harus selalu jatuh tepat di center viewport.
 */
export function getLookAtScreenPosition(
  camera: CameraState,
  depth: number,
  center: Vector2D = VIEWPORT_CONFIG.center
): Vector2D {
  return projectWorldToScreen(camera.lookAt, camera, depth, center);
}

/**
 * Interpolasi keadaan kamera deterministik berdasarkan array keyframe terurut.
 */
export function interpolateCamera(
  frame: number,
  keyframes: CameraKeyframe[],
  defaultState: CameraState = DEFAULT_CAMERA_STATE
): CameraState {
  if (!keyframes || keyframes.length === 0) {
    return defaultState;
  }

  // Jika sebelum atau pada keyframe pertama
  if (frame <= keyframes[0].frame) {
    return {
      lookAt: { ...keyframes[0].lookAt },
      zoom: keyframes[0].zoom,
    };
  }

  // Jika setelah atau pada keyframe terakhir
  const lastIndex = keyframes.length - 1;
  if (frame >= keyframes[lastIndex].frame) {
    return {
      lookAt: { ...keyframes[lastIndex].lookAt },
      zoom: keyframes[lastIndex].zoom,
    };
  }

  // Cari dua keyframe yang mengapit frame saat ini
  let prev = keyframes[0];
  let next = keyframes[lastIndex];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (frame >= keyframes[i].frame && frame <= keyframes[i + 1].frame) {
      prev = keyframes[i];
      next = keyframes[i + 1];
      break;
    }
  }

  const duration = next.frame - prev.frame;
  if (duration <= 0) {
    return {
      lookAt: { ...prev.lookAt },
      zoom: prev.zoom,
    };
  }

  const progress = (frame - prev.frame) / duration;
  const easedProgress = next.easing ? next.easing(progress) : progress;

  return {
    lookAt: {
      x: prev.lookAt.x + (next.lookAt.x - prev.lookAt.x) * easedProgress,
      y: prev.lookAt.y + (next.lookAt.y - prev.lookAt.y) * easedProgress,
    },
    zoom: prev.zoom + (next.zoom - prev.zoom) * easedProgress,
  };
}
