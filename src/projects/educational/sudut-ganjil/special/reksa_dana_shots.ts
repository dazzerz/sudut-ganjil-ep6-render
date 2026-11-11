import { ShotConfig } from "./ReksaDanaShotLayer";
import { REKSA_SEGMENTS } from "./reksa_dana_scenes";

export const getReksaDanaShots = (): ShotConfig[] => {
  const getSceneRange = (sceneNum: number) => {
    const sceneSegs = REKSA_SEGMENTS.filter((s) => s.scene === sceneNum);
    if (sceneSegs.length === 0) return { start: 0, duration: 300 };
    const start = sceneSegs[0].startFrame;
    const lastSeg = sceneSegs[sceneSegs.length - 1];
    const duration = lastSeg.startFrame + lastSeg.durationInFrames + 10 - start;
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
      image: "images/sudut-ganjil/reksa-dana/scene1_studio_reksa_intro.jpg",
      startFrame: scene1.start,
      durationInFrames: scene1.duration,
      panDirection: "zoom-in",
    },
    {
      id: "shot_2_kosan_struk",
      scene: 2,
      image: "images/sudut-ganjil/reksa-dana/scene2_kosan_struk_budgeting.jpg",
      startFrame: scene2.start,
      durationInFrames: scene2.duration,
      panDirection: "pan-right",
    },
    {
      id: "shot_3_bank_inflasi",
      scene: 3,
      image: "images/sudut-ganjil/reksa-dana/scene3_bank_inflasi_kontras.jpg",
      startFrame: scene3.start,
      durationInFrames: scene3.duration,
      panDirection: "zoom-out",
    },
    {
      id: "shot_4_bus_reksadana",
      scene: 4,
      image: "images/sudut-ganjil/reksa-dana/scene4_cutaway_bus_reksadana.jpg",
      startFrame: scene4.start,
      durationInFrames: scene4.duration,
      panDirection: "pan-left",
    },
    {
      id: "shot_5_keamanan_ksei",
      scene: 5,
      image: "images/sudut-ganjil/reksa-dana/scene5_keamanan_ksei_kustodian.jpg",
      startFrame: scene5.start,
      durationInFrames: scene5.duration,
      panDirection: "zoom-in",
    },
    {
      id: "shot_6_pasar_merah",
      scene: 6,
      image: "images/sudut-ganjil/reksa-dana/scene6_pasar_merah_ujian.jpg",
      startFrame: scene6.start,
      durationInFrames: scene6.duration,
      panDirection: "pan-right",
    },
    {
      id: "shot_7_bola_salju",
      scene: 7,
      image: "images/sudut-ganjil/reksa-dana/scene7_bola_salju_compound.jpg",
      startFrame: scene7.start,
      durationInFrames: scene7.duration,
      panDirection: "zoom-out",
    },
    {
      id: "shot_8_kafe_saldo",
      scene: 8,
      image: "images/sudut-ganjil/reksa-dana/scene8_kafe_saldo_146juta.jpg",
      startFrame: scene8.start,
      durationInFrames: scene8.duration,
      panDirection: "zoom-in",
    },
    {
      id: "shot_9_akad_rumah",
      scene: 9,
      image: "images/sudut-ganjil/reksa-dana/scene9_akad_dan_rumah_kpr.jpg",
      startFrame: scene9.start,
      durationInFrames: scene9.duration,
      panDirection: "pan-left",
    },
    {
      id: "shot_10_studio_epilog",
      scene: 10,
      image: "images/sudut-ganjil/reksa-dana/scene10_studio_reksa_epilog.jpg",
      startFrame: scene10.start,
      durationInFrames: scene10.duration,
      panDirection: "zoom-in",
    },
  ];
};
