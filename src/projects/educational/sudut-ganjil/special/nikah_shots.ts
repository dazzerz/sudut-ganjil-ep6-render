import { ShotConfig } from "./NikahShotLayer";
import { NIKAH_SEGMENTS, NIKAH_TOTAL_FRAMES } from "./nikah_scenes";

export const getNikahShots = (): ShotConfig[] => {
  const getSceneRange = (sceneNum: number) => {
    const sceneSegs = NIKAH_SEGMENTS.filter((s) => s.scene === sceneNum);
    if (sceneSegs.length === 0) return { start: 0, duration: 300 };
    const start = sceneSegs[0].startFrame;
    const lastSeg = sceneSegs[sceneSegs.length - 1];
    const duration = (lastSeg.startFrame + lastSeg.durationInFrames + 10) - start;
    return { start, duration };
  };

  const scene1 = getSceneRange(1);
  const scene2 = getSceneRange(2);
  const scene3 = getSceneRange(3);
  const scene4 = getSceneRange(4);
  const scene5 = getSceneRange(5);
  const scene6 = getSceneRange(6);
  const scene7 = getSceneRange(7);
  const scene8 = getSceneRange(8);
  const scene9 = getSceneRange(9);
  const scene10 = getSceneRange(10);

  return [
    {
      id: "shot_1_studio_intro",
      scene: 1,
      image: "images/sudut-ganjil/nikah-gedung/studio_wide_clean.jpg",
      startFrame: scene1.start,
      durationInFrames: scene1.duration,
      panDirection: "zoom-in",
    },
    {
      id: "shot_2_wedding_fair",
      scene: 2,
      image: "images/sudut-ganjil/nikah-gedung/wedding_fair_gaun_brosur.jpg",
      startFrame: scene2.start,
      durationInFrames: scene2.duration,
      panDirection: "pan-right",
    },
    {
      id: "shot_3_kamar_kalkulator",
      scene: 3,
      image: "images/sudut-ganjil/nikah-gedung/kamar_raka_hitung_kalkulator.jpg",
      startFrame: scene3.start,
      durationInFrames: scene3.duration,
      panDirection: "zoom-in",
    },
    {
      id: "shot_4_katering_vs_kpr",
      scene: 4,
      image: "images/sudut-ganjil/nikah-gedung/cutaway_katering_vs_kpr.jpg",
      startFrame: scene4.start,
      durationInFrames: scene4.duration,
      panDirection: "pan-left",
    },
    {
      id: "shot_5_reuni_flexing",
      scene: 5,
      image: "images/sudut-ganjil/nikah-gedung/reuni_teman_flexing_gedung.jpg",
      startFrame: scene5.start,
      durationInFrames: scene5.duration,
      panDirection: "zoom-out",
    },
    {
      id: "shot_6_teman_pinjol",
      scene: 6,
      image: "images/sudut-ganjil/nikah-gedung/teman_stres_tagihan_pinjol.jpg",
      startFrame: scene6.start,
      durationInFrames: scene6.duration,
      panDirection: "zoom-in",
    },
    {
      id: "shot_7_kua_asri",
      scene: 7,
      image: "images/sudut-ganjil/nikah-gedung/nara_ajak_ke_kua_asri.jpg",
      startFrame: scene7.start,
      durationInFrames: scene7.duration,
      panDirection: "pan-right",
    },
    {
      id: "shot_8_kontrakan_damai",
      scene: 8,
      image: "images/sudut-ganjil/nikah-gedung/kontrakan_pertama_bahagia.jpg",
      startFrame: scene8.start,
      durationInFrames: scene8.duration,
      panDirection: "zoom-out",
    },
    {
      id: "shot_9_meja_ortu",
      scene: 9,
      image: "images/sudut-ganjil/nikah-gedung/meja_makan_kompromi_ortu.jpg",
      startFrame: scene9.start,
      durationInFrames: scene9.duration,
      panDirection: "zoom-in",
    },
    {
      id: "shot_10_studio_epilog",
      scene: 10,
      image: "images/sudut-ganjil/nikah-gedung/studio_wide_clean.jpg",
      startFrame: scene10.start,
      durationInFrames: scene10.duration + 60,
      panDirection: "zoom-out",
    },
  ];
};
