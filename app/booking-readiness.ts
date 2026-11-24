import { workshopConfig, type AuthorityStatus } from "./workshop-config";

// Authority gates are deliberately independent from the presentation flags.
// Enabling the UI alone must never activate an incomplete booking flow.
export type BookingAuthority = {
  publicName: AuthorityStatus;
  price: AuthorityStatus;
  duration: AuthorityStatus;
  participants: AuthorityStatus;
  inclusions: AuthorityStatus;
  cancellation: AuthorityStatus;
  payment: AuthorityStatus;
  checkout: AuthorityStatus;
};
export const bookingAuthority: BookingAuthority = {
  publicName: "APPROVED",
  price: "APPROVED",
  duration: "APPROVED",
  participants: "APPROVED",
  inclusions: "APPROVED",
  cancellation: "OPEN",
  payment: "OPEN",
  checkout: "OPEN",
};
export const plannedBookingSteps = [
  { id: "date", required: true },
  { id: "participants", required: true },
  { id: "variant", condition: "multipleApprovedProducts" },
  { id: "shapeWorld", required: false },
  { id: "scentWorld", required: false },
  { id: "addons", condition: "approvedAddonsOnly" },
  { id: "contact", required: true },
  { id: "payment", required: true },
] as const;
export function directBookingReady() {
  return (
    workshopConfig.features.directBookingEnabled &&
    workshopConfig.publicWorkshop.bookingEnabled &&
    Object.values(bookingAuthority).every((status) => status === "APPROVED") &&
    workshopConfig.publicWorkshop.price !== null &&
    workshopConfig.publicWorkshop.duration !== null &&
    workshopConfig.publicWorkshop.minParticipants !== null &&
    workshopConfig.publicWorkshop.maxParticipants !== null
  );
}
