/**
 * FAKTA MASUK AKAL - MOTION & CAMERA TYPES
 * Kontrak tipe data untuk kamera virtual, transformasi lapisan, dan keyframing deterministik.
 */

export interface Vector2D {
  x: number;
  y: number;
}

/**
 * Keadaan kamera virtual pada frame tertentu.
 * lookAt: titik bidik di ruang dunia yang ingin difokuskan ke tengah layar.
 * zoom: tingkat perbesaran (1.0 = 100%, 1.2 = 120% zoom in).
 */
export interface CameraState {
  lookAt: Vector2D;
  zoom: number;
}

/**
 * Keyframe kamera untuk interpolasi gerakan halus.
 */
export interface CameraKeyframe {
  frame: number;
  lookAt: Vector2D;
  zoom: number;
  easing?: (t: number) => number;
}

/**
 * Hasil komputasi transformasi kamera untuk suatu layer.
 * translateX & translateY: pergeseran pixel dengan CSS origin di tengah viewport.
 * cameraScale: faktor skala optik akibat zoom kamera pada depth layer tersebut.
 */
export interface CameraTransform {
  translateX: number;
  translateY: number;
  cameraScale: number;
}
