import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { PPDBSMPAnnidaDemo } from "./projects/educational/ppdb/PPDBSMPAnnidaDemo";
import { PPDBSMPAnnidaPOC } from "./projects/educational/ppdb/PPDBSMPAnnidaPOC";
import { PPDBSMPAnnidaFinal } from "./projects/educational/ppdb/PPDBSMPAnnidaFinal";
import { PPDBBiayaPromoGelombang1 } from "./projects/educational/ppdb/PPDBBiayaPromoGelombang1";
import { PPDBKineticHook } from "./projects/educational/ppdb/PPDBKineticHook";
import { PPDBPromoUrgency } from "./projects/educational/ppdb/PPDBPromoUrgency";
import { PPDBInfografikPilar } from "./projects/educational/ppdb/PPDBInfografikPilar";
import { KenaliKeunggulanSMPAnnida } from "./projects/motion-graphics/kenali-keunggulan/KenaliKeunggulanSMPAnnida";
import { FaktaBumiBerhenti1Detik } from "./projects/motion-graphics/fakta-masuk-akal/FaktaBumiBerhenti1Detik";
import { FaktaOksigenHilang5Detik } from "./projects/motion-graphics/fakta-masuk-akal/FaktaOksigenHilang5Detik";
import { MandiMalamRematik } from "./projects/motion-graphics/fakta-masuk-akal/mandi-malam/MandiMalamRematik";
import { FaktaBersin15s } from "./projects/motion-graphics/fakta-masuk-akal/reels-15s/FaktaBersin15s";
import { FaktaReel1Begadang } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel1/FaktaReel1Begadang";
import { FaktaReel2AirEs } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel2/FaktaReel2AirEs";
import { FaktaReel3Mariana } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel3/FaktaReel3Mariana";
import { FaktaReel4Aturan5Detik } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel4/FaktaReel4Aturan5Detik";
import { FaktaReel5MatahariPadam } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel5/FaktaReel5MatahariPadam";
import { FaktaReel6RefleksKucing } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel6/FaktaReel6RefleksKucing";
import { FaktaReel7Petir } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel7/FaktaReel7Petir";
import { FaktaReel8BersinTidur } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel8/FaktaReel8BersinTidur";
import { FaktaReel9EfekMpemba } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel9/FaktaReel9EfekMpemba";
import { FaktaReel10PerjalananFoton } from "./projects/motion-graphics/fakta-masuk-akal/reels-10/reel10/FaktaReel10PerjalananFoton";
import { JarvisOpeningCinematic } from "./projects/motion-graphics/jarvis-launch/opening-cinematic/JarvisOpeningCinematic";
import { JarvisAriaDemo } from "./projects/motion-graphics/jarvis-launch/aria-demo/JarvisAriaDemo";
import { JainalSalesShowcase60s } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalSalesShowcase60s";
import { JainalSalesShowcase120s } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalSalesShowcase120s";
import { JainalCustomerDemo60s } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalCustomerDemo60s";
import { JainalCustomerDemo120s } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalCustomerDemo120s";
import { JainalOrderTracingDemo60s } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalOrderTracingDemo60s";
import { JainalOrderTracingDemo120s } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalOrderTracingDemo120s";
import { JainalSOTracingCardiosoftDemo } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalSOTracingCardiosoftDemo";
import { JainalSOTracingCardiosoftDemo120s } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalSOTracingCardiosoftDemo120s";
import { JainalActivitySyncDemo60s } from "./projects/motion-graphics/jarvis-launch/aria-demo/JainalActivitySyncDemo60s";
import { JarvisSageDemo } from "./projects/motion-graphics/jarvis-launch/sage-demo/JarvisSageDemo";
import { JarvisVegaDemo } from "./projects/motion-graphics/jarvis-launch/vega-demo/JarvisVegaDemo";
import { VegaManagementShowcase } from "./projects/motion-graphics/vega-management-showcase/VegaManagementShowcase";
import { VegaManagementDeckShowcase } from "./projects/motion-graphics/vega-management-showcase/VegaManagementDeckShowcase";
import { JarvisConnectedDemo } from "./projects/motion-graphics/jarvis-launch/connected-demo/JarvisConnectedDemo";
import { MysteryCharacterPreview } from "./projects/character-animation/mystery-investigation/MysteryCharacterPreview";
import { NcekInvestPOV } from "./projects/motion-graphics/ncek-invest/NcekInvestPOV";
import { GajiHabisPOV } from "./projects/motion-graphics/gaji-habis/GajiHabisPOV";
import { TOTAL_FRAMES as GAJI_HABIS_FRAMES } from "./projects/motion-graphics/gaji-habis/scenes";
import { SudutGanjilEp1 } from "./projects/educational/sudut-ganjil/SudutGanjilEp1";
import { TOTAL_FRAMES as SUDUT_GANJIL_EP1_FRAMES } from "./projects/educational/sudut-ganjil/scenes";
import { SudutGanjilEp2 } from "./projects/educational/sudut-ganjil/ep2/SudutGanjilEp2";
import { EP2_TOTAL_FRAMES as SUDUT_GANJIL_EP2_FRAMES } from "./projects/educational/sudut-ganjil/ep2/ep2_scenes";
import { SudutGanjilEp3 } from "./projects/educational/sudut-ganjil/ep3/SudutGanjilEp3";
import { EP3_TOTAL_FRAMES as SUDUT_GANJIL_EP3_FRAMES } from "./projects/educational/sudut-ganjil/ep3/ep3_scenes";
import { SudutGanjilEp4 } from "./projects/educational/sudut-ganjil/ep4/SudutGanjilEp4";
import { EP4_TOTAL_FRAMES as SUDUT_GANJIL_EP4_FRAMES } from "./projects/educational/sudut-ganjil/ep4/ep4_scenes";
import { SudutGanjilEp5 } from "./projects/educational/sudut-ganjil/ep5/SudutGanjilEp5";
import { EP5_TOTAL_FRAMES as SUDUT_GANJIL_EP5_FRAMES } from "./projects/educational/sudut-ganjil/ep5/ep5_scenes";
import { SudutGanjilEp6 } from "./projects/educational/sudut-ganjil/ep6/SudutGanjilEp6";
import { SudutGanjilEp6Thumbnail } from "./projects/educational/sudut-ganjil/ep6/SudutGanjilEp6Thumbnail";
import { EP6_TOTAL_FRAMES as SUDUT_GANJIL_EP6_FRAMES } from "./projects/educational/sudut-ganjil/ep6/ep6_scenes";
import { Gaji5JutaNikahGedung } from "./projects/educational/sudut-ganjil/special/Gaji5JutaNikahGedung";
import { Gaji5JutaReksaDana } from "./projects/educational/sudut-ganjil/special/Gaji5JutaReksaDana";
import { Gaji6JutaKreditMobil } from "./projects/educational/sudut-ganjil/special/Gaji6JutaKreditMobil";
import { SudutGanjilNikahThumbnail } from "./projects/educational/sudut-ganjil/special/SudutGanjilNikahThumbnail";
import { SudutGanjilNabung5TahunThumbnail } from "./projects/educational/sudut-ganjil/special/SudutGanjilNabung5TahunThumbnail";
import { SudutGanjilMobilThumbnail } from "./projects/educational/sudut-ganjil/special/SudutGanjilMobilThumbnail";
import { NIKAH_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/special/nikah_scenes";
import { REKSA_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/special/reksa_dana_scenes";
import { MOBIL_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/special/kredit_mobil_scenes";
import { SudutGanjilShort1, SHORT1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilShort1";
import { SudutGanjilShort2, SHORT2_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilShort2";
import { SudutGanjilShort3, SHORT3_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilShort3";
import { SudutGanjilEp2Short1, EP2_SHORT1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp2Short1";
import { SudutGanjilEp2Short2, EP2_SHORT2_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp2Short2";
import { SudutGanjilEp2Short3, EP2_SHORT3_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp2Short3";
import { SudutGanjilEp3Short1, EP3_SHORT1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp3Short1";
import { SudutGanjilEp3Short2, EP3_SHORT2_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp3Short2";
import { SudutGanjilEp3Short3, EP3_SHORT3_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp3Short3";
import { SudutGanjilEp4Short1, EP4_SHORT1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp4Short1";
import { SudutGanjilEp4Short2, EP4_SHORT2_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp4Short2";
import { SudutGanjilEp4Short3, EP4_SHORT3_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp4Short3";
import { SudutGanjilEp5Short1, EP5_SHORT1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp5Short1";
import { SudutGanjilEp5Short2, EP5_SHORT2_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp5Short2";
import { SudutGanjilEp5Short3, EP5_SHORT3_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilEp5Short3";
import { SudutGanjilNikahShort1, NIKAH_SHORT1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilNikahShort1";
import { SudutGanjilNikahShort2, NIKAH_SHORT2_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilNikahShort2";
import { SudutGanjilNikahShort3, NIKAH_SHORT3_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilNikahShort3";
import { SudutGanjilMobilShort1, MOBIL_SHORT1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilMobilShort1";
import { SudutGanjilMobilShort2, MOBIL_SHORT2_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilMobilShort2";
import { SudutGanjilMobilShort3, MOBIL_SHORT3_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilMobilShort3";
import { SudutGanjilReksaShort1, REKSA_SHORT1_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilReksaShort1";
import { SudutGanjilReksaShort2, REKSA_SHORT2_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilReksaShort2";
import { SudutGanjilReksaShort3, REKSA_SHORT3_TOTAL_FRAMES } from "./projects/educational/sudut-ganjil/shorts/SudutGanjilReksaShort3";
import { TheQuietLogos, THE_QUIET_LOGOS_TOTAL_FRAMES } from "./projects/motion-graphics/the-quiet-logos/TheQuietLogos";
import { RezaArapClip, REZA_ARAP_CLIP_FRAMES } from "./projects/motion-graphics/reza-arap-clip/RezaArapClip";
import { TrainAndHotMatcha } from "./projects/motion-graphics/hot-matcha/TrainAndHotMatcha";
import { TOTAL_HOT_MATCHA_FRAMES } from "./projects/motion-graphics/hot-matcha/lyricsData";
import { ClaudeAdComposition, TOTAL_CLAUDE_AD_FRAMES } from "./projects/motion-graphics/claude-ad/ClaudeAdComposition";
import { ShowreelComposition, TOTAL_SHOWREEL_FRAMES } from "./projects/motion-graphics/world-class-showreel/ShowreelComposition";
import { BellaCiaoBallSimulation, TOTAL_SIMULATION_FRAMES } from "./projects/visual-experiments/bella-ciao-ball/BellaCiaoBallSimulation";
import { RhythmMotionProfilePic, RhythmMotionCoverBanner } from "./projects/visual-experiments/bella-ciao-ball/RhythmMotionBranding";
import { NeonCrusherASMR, NEON_CRUSHER_TOTAL_FRAMES } from "./projects/visual-experiments/neon-crusher-asmr/NeonCrusherASMR";
import { TrueSquishASMR, TRUE_SQUISH_TOTAL_FRAMES } from "./projects/visual-experiments/neon-crusher-asmr/TrueSquishASMR";
import { ClawBalloonASMR, CLAW_BALLOON_TOTAL_FRAMES } from "./projects/visual-experiments/neon-crusher-asmr/ClawBalloonASMR";
import { EscalatingBallASMR, ESCALATING_BALL_TOTAL_FRAMES } from "./projects/visual-experiments/neon-crusher-asmr/EscalatingBallASMR";
import { HebohColliderASMR, HEBOH_COLLIDER_TOTAL_FRAMES } from "./projects/visual-experiments/neon-crusher-asmr/HebohColliderASMR";
import { MathQuadraticASMR, MATH_QUADRATIC_TOTAL_FRAMES } from "./projects/visual-experiments/neon-crusher-asmr/MathQuadraticASMR";
import { MathCuriosityASMR, MATH_CURIOSITY_TOTAL_FRAMES } from "./projects/visual-experiments/neon-crusher-asmr/MathCuriosityASMR";
import { GaltonBoardASMR, GALTON_BOARD_TOTAL_FRAMES } from "./projects/visual-experiments/neon-crusher-asmr/GaltonBoardASMR";
import { XhsCosplayMaling } from "./projects/motion-graphics/reels-remix/XhsCosplayMaling";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
      <Folder name="JarvisKeynote">
        <Composition
          id="JarvisOpeningCinematic"
          component={JarvisOpeningCinematic}
          durationInFrames={2700}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JarvisAriaDemo"
          component={JarvisAriaDemo}
          durationInFrames={2700}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalSalesShowcase60s"
          component={JainalSalesShowcase60s}
          durationInFrames={1800}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalSalesShowcase120s"
          component={JainalSalesShowcase120s}
          durationInFrames={3600}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalCustomerDemo60s"
          component={JainalCustomerDemo60s}
          durationInFrames={1800}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalCustomerDemo120s"
          component={JainalCustomerDemo120s}
          durationInFrames={3600}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalOrderTracingDemo60s"
          component={JainalOrderTracingDemo60s}
          durationInFrames={1800}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalOrderTracingDemo120s"
          component={JainalOrderTracingDemo120s}
          durationInFrames={3600}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalSOTracingCardiosoftDemo"
          component={JainalSOTracingCardiosoftDemo}
          durationInFrames={3300}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalSOTracingCardiosoftDemo120s"
          component={JainalSOTracingCardiosoftDemo120s}
          durationInFrames={3600}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JainalActivitySyncDemo60s"
          component={JainalActivitySyncDemo60s}
          durationInFrames={1800}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JarvisSageDemo"
          component={JarvisSageDemo}
          durationInFrames={2400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JarvisVegaDemo"
          component={JarvisVegaDemo}
          durationInFrames={1997}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="VegaManagementShowcase"
          component={VegaManagementShowcase}
          durationInFrames={1779}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="VegaManagementDeckShowcase"
          component={VegaManagementDeckShowcase}
          durationInFrames={1800}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="JarvisConnectedDemo"
          component={JarvisConnectedDemo}
          durationInFrames={2700}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="FaktaMasukAkal">
        <Composition
          id="FaktaBumiBerhenti1Detik"
          component={FaktaBumiBerhenti1Detik}
          durationInFrames={1140}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaOksigenHilang5Detik"
          component={FaktaOksigenHilang5Detik}
          durationInFrames={1470}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MandiMalamRematik"
          component={MandiMalamRematik}
          durationInFrames={1530}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaBersin15s"
          component={FaktaBersin15s}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel1Begadang"
          component={FaktaReel1Begadang}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel2AirEs"
          component={FaktaReel2AirEs}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel3Mariana"
          component={FaktaReel3Mariana}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel4Aturan5Detik"
          component={FaktaReel4Aturan5Detik}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel5MatahariPadam"
          component={FaktaReel5MatahariPadam}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel6RefleksKucing"
          component={FaktaReel6RefleksKucing}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel7Petir"
          component={FaktaReel7Petir}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel8BersinTidur"
          component={FaktaReel8BersinTidur}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel9EfekMpemba"
          component={FaktaReel9EfekMpemba}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FaktaReel10PerjalananFoton"
          component={FaktaReel10PerjalananFoton}
          durationInFrames={1800}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="SMP-Annida">
        <Composition
          id="PPDB1-KineticHook"
          component={PPDBKineticHook}
          durationInFrames={645}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PPDB2-PromoUrgency"
          component={PPDBPromoUrgency}
          durationInFrames={630}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PPDB3-InfografikPilar"
          component={PPDBInfografikPilar}
          durationInFrames={570}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PPDBBiayaPromoGelombang1"
          component={PPDBBiayaPromoGelombang1}
          durationInFrames={900}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="KenaliKeunggulanSMPAnnida"
          component={KenaliKeunggulanSMPAnnida}
          durationInFrames={900}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PPDBSMPAnnidaFinal"
          component={PPDBSMPAnnidaFinal}
          durationInFrames={900}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PPDBSMPAnnidaDemo"
          component={PPDBSMPAnnidaDemo}
          durationInFrames={900}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PPDBSMPAnnidaPOC"
          component={PPDBSMPAnnidaPOC}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="MysteryInvestigation">
        <Composition
          id="MysteryCharacterPreview"
          component={MysteryCharacterPreview}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="NcekInvest">
        <Composition
          id="NcekInvestPOV"
          component={NcekInvestPOV}
          durationInFrames={1635}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="GajiHabisPOV"
          component={GajiHabisPOV}
          durationInFrames={GAJI_HABIS_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="SudutGanjil">
        <Composition
          id="SudutGanjilEp1"
          component={SudutGanjilEp1}
          durationInFrames={SUDUT_GANJIL_EP1_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilEp2"
          component={SudutGanjilEp2}
          durationInFrames={SUDUT_GANJIL_EP2_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilEp3"
          component={SudutGanjilEp3}
          durationInFrames={SUDUT_GANJIL_EP3_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilEp4"
          component={SudutGanjilEp4}
          durationInFrames={SUDUT_GANJIL_EP4_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilEp5"
          component={SudutGanjilEp5}
          durationInFrames={SUDUT_GANJIL_EP5_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilEp6"
          component={SudutGanjilEp6}
          durationInFrames={SUDUT_GANJIL_EP6_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ThumbnailEp6"
          component={SudutGanjilEp6Thumbnail}
          durationInFrames={1}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilNikahGedung"
          component={Gaji5JutaNikahGedung}
          durationInFrames={NIKAH_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ThumbnailNikahGedung"
          component={SudutGanjilNikahThumbnail}
          durationInFrames={1}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ThumbnailNabung5Tahun"
          component={SudutGanjilNabung5TahunThumbnail}
          durationInFrames={1}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ThumbnailKreditMobil"
          component={SudutGanjilMobilThumbnail}
          durationInFrames={1}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilReksaDana"
          component={Gaji5JutaReksaDana}
          durationInFrames={REKSA_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilKreditMobil"
          component={Gaji6JutaKreditMobil}
          durationInFrames={MOBIL_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SudutGanjilShort1"
          component={SudutGanjilShort1}
          durationInFrames={SHORT1_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilShort2"
          component={SudutGanjilShort2}
          durationInFrames={SHORT2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilShort3"
          component={SudutGanjilShort3}
          durationInFrames={SHORT3_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp2Short1"
          component={SudutGanjilEp2Short1}
          durationInFrames={EP2_SHORT1_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp2Short2"
          component={SudutGanjilEp2Short2}
          durationInFrames={EP2_SHORT2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp2Short3"
          component={SudutGanjilEp2Short3}
          durationInFrames={EP2_SHORT3_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp3Short1"
          component={SudutGanjilEp3Short1}
          durationInFrames={EP3_SHORT1_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp3Short2"
          component={SudutGanjilEp3Short2}
          durationInFrames={EP3_SHORT2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp3Short3"
          component={SudutGanjilEp3Short3}
          durationInFrames={EP3_SHORT3_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp4Short1"
          component={SudutGanjilEp4Short1}
          durationInFrames={EP4_SHORT1_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp4Short2"
          component={SudutGanjilEp4Short2}
          durationInFrames={EP4_SHORT2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp4Short3"
          component={SudutGanjilEp4Short3}
          durationInFrames={EP4_SHORT3_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp5Short1"
          component={SudutGanjilEp5Short1}
          durationInFrames={EP5_SHORT1_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp5Short2"
          component={SudutGanjilEp5Short2}
          durationInFrames={EP5_SHORT2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilEp5Short3"
          component={SudutGanjilEp5Short3}
          durationInFrames={EP5_SHORT3_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilNikahShort1"
          component={SudutGanjilNikahShort1}
          durationInFrames={NIKAH_SHORT1_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilNikahShort2"
          component={SudutGanjilNikahShort2}
          durationInFrames={NIKAH_SHORT2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilNikahShort3"
          component={SudutGanjilNikahShort3}
          durationInFrames={NIKAH_SHORT3_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilMobilShort1"
          component={SudutGanjilMobilShort1}
          durationInFrames={MOBIL_SHORT1_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilMobilShort2"
          component={SudutGanjilMobilShort2}
          durationInFrames={MOBIL_SHORT2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilMobilShort3"
          component={SudutGanjilMobilShort3}
          durationInFrames={MOBIL_SHORT3_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilReksaShort1"
          component={SudutGanjilReksaShort1}
          durationInFrames={REKSA_SHORT1_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilReksaShort2"
          component={SudutGanjilReksaShort2}
          durationInFrames={REKSA_SHORT2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SudutGanjilReksaShort3"
          component={SudutGanjilReksaShort3}
          durationInFrames={REKSA_SHORT3_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="StreamHighlights">
        <Composition
          id="RezaArapClip"
          component={RezaArapClip}
          durationInFrames={REZA_ARAP_CLIP_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="AestheticEdits">
        <Composition
          id="TrainAndHotMatcha"
          component={TrainAndHotMatcha}
          durationInFrames={TOTAL_HOT_MATCHA_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="ClaudeAd"
          component={ClaudeAdComposition}
          durationInFrames={TOTAL_CLAUDE_AD_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="WorldClassShowreel"
          component={ShowreelComposition}
          durationInFrames={TOTAL_SHOWREEL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="TheQuietSeries">
        <Composition
          id="TheQuietLogos"
          component={TheQuietLogos}
          durationInFrames={THE_QUIET_LOGOS_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="ReelsRemix">
        <Composition
          id="XhsCosplayMaling"
          component={XhsCosplayMaling}
          durationInFrames={286}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="VisualExperiments">
        <Composition
          id="GaltonBoardASMR"
          component={GaltonBoardASMR}
          durationInFrames={GALTON_BOARD_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MathCuriosityASMR"
          component={MathCuriosityASMR}
          durationInFrames={MATH_CURIOSITY_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="MathQuadraticASMR"
          component={MathQuadraticASMR}
          durationInFrames={MATH_QUADRATIC_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="HebohColliderASMR"
          component={HebohColliderASMR}
          durationInFrames={HEBOH_COLLIDER_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="EscalatingBallASMR"
          component={EscalatingBallASMR}
          durationInFrames={ESCALATING_BALL_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="ClawBalloonASMR"
          component={ClawBalloonASMR}
          durationInFrames={CLAW_BALLOON_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="TrueSquishASMR"
          component={TrueSquishASMR}
          durationInFrames={TRUE_SQUISH_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="NeonCrusherASMR"
          component={NeonCrusherASMR}
          durationInFrames={NEON_CRUSHER_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BellaCiaoBallSimulation"
          component={BellaCiaoBallSimulation}
          durationInFrames={TOTAL_SIMULATION_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="RhythmMotionProfilePic"
          component={RhythmMotionProfilePic}
          durationInFrames={1}
          fps={30}
          width={1080}
          height={1080}
        />
        <Composition
          id="RhythmMotionCoverBanner"
          component={RhythmMotionCoverBanner}
          durationInFrames={1}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

    </>
  );
};
