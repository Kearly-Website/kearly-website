import { WorkshopLanding } from "../components/workshop-landing";
import {
  buildWorkshopMetadata,
  buildWorkshopStructuredData,
} from "../workshop-seo";

export const metadata = buildWorkshopMetadata();
const workshopData = buildWorkshopStructuredData();

export default function Workshop() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workshopData).replace(/</g, "\\u003c"),
        }}
      />
      <WorkshopLanding />
    </>
  );
}
