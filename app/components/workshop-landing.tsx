import {
  WorkshopHero,
  WorkshopExperience,
  ColorScentSelection,
  WorkshopProcess,
  WhatsIncluded,
  WorkshopDates,
  WorkshopGallery,
  WorkshopFAQ,
  WorkshopCTA,
  WorkshopFooter,
} from "./workshop-sections";
import {
  WorkshopNavigation,
  ShapeLibrary,
  PrivateWorkshops,
  MobileWorkshopCTA,
} from "./workshop-interactions";
export function WorkshopLanding() {
  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <WorkshopNavigation />
      <main id="inhalt">
        <WorkshopHero />
        <WorkshopExperience />
        <ShapeLibrary />
        <ColorScentSelection />
        <WorkshopProcess />
        <WhatsIncluded />
        <WorkshopDates />
        <PrivateWorkshops />
        <WorkshopGallery />
        <WorkshopFAQ />
        <WorkshopCTA />
      </main>
      <WorkshopFooter />
      <MobileWorkshopCTA />
    </>
  );
}
