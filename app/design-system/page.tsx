import { notFound } from "next/navigation";
import { occasions } from "../workshop-config";
import { WorkshopLanding } from "../components/workshop-landing";
import {
  WorkshopHero,
  WorkshopExperience,
  ColorScentSelection,
  WhatsIncluded,
  WorkshopFAQ,
} from "../components/workshop-sections";
import {
  ShapeLibrary,
  PrivateWorkshops,
} from "../components/workshop-interactions";
import {
  DesignBar,
  ComponentLibrary,
  BookingPreview,
  CategoryStudy,
} from "../components/design-library";

export default async function DesignSystem({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; occasion?: string }>;
}) {
  const { view = "library", occasion = "" } = await searchParams;
  if (view === "full")
    return (
      <div className="capture-document">
        <WorkshopLanding />
      </div>
    );
  const views: Record<string, React.ReactNode> = {
    hero: <WorkshopHero />,
    usp: <WorkshopExperience />,
    forms: <ShapeLibrary />,
    categories: <CategoryStudy />,
    selection: (
      <>
        <ShapeLibrary />
        <ColorScentSelection />
      </>
    ),
    price: <WhatsIncluded />,

    private: <PrivateWorkshops storyOnly />,
    booking: <BookingPreview />,
    inquiry: (
      <PrivateWorkshops
        formOnly
        initialOccasion={
          (occasions as readonly string[]).includes(occasion) ? occasion : ""
        }
      />
    ),
    faq: <WorkshopFAQ />,
    library: <ComponentLibrary />,
  };
  if (!(view in views)) notFound();
  return (
    <>
      <DesignBar />
      <main className="studio-sheet">{views[view]}</main>
    </>
  );
}
