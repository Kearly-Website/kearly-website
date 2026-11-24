import { z } from "zod";
import { occasions, scentWorlds, shapeWorlds, WORKSHOP_MAX_PARTICIPANTS } from "./workshop-config";

export function berlinToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  return `${parts.find((p) => p.type === "year")!.value}-${parts.find((p) => p.type === "month")!.value}-${parts.find((p) => p.type === "day")!.value}`;
}
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte wähle dein Wunschdatum.")
  .refine((value) => {
    const parsed = new Date(`${value}T12:00:00Z`);
    return (
      !Number.isNaN(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === value &&
      value >= berlinToday()
    );
  }, "Bitte wähle ein gültiges Datum ab heute.");
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Bitte verwende höchstens ${max} Zeichen.`)
    .optional()
    .default("");
export const inquirySchema = z.object({
  occasion: z
    .string()
    .refine(
      (v) => (occasions as readonly string[]).includes(v),
      "Bitte wähle einen Anlass.",
    ),
  desiredDate: date,
  alternativeDate: z
    .union([date, z.literal("")])
    .optional()
    .default(""),
  participants: z.coerce
    .number({
      invalid_type_error: "Bitte gib die ungefähre Teilnehmerzahl an.",
    })
    .int("Bitte gib eine ganze Zahl ein.")
    .positive("Bitte gib die ungefähre Teilnehmerzahl an.")
    .max(WORKSHOP_MAX_PARTICIPANTS, `Pro Workshop sind höchstens ${WORKSHOP_MAX_PARTICIPANTS} Personen möglich.`)
    .safe("Bitte prüfe deine Eingabe."),
  name: z
    .string()
    .trim()
    .min(2, "Bitte gib deinen Namen ein.")
    .max(150, "Bitte verwende höchstens 150 Zeichen."),
  email: z
    .string()
    .trim()
    .max(254, "Bitte prüfe deine E-Mail-Adresse.")
    .superRefine((value, ctx) => {
      if (!value)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bitte gib deine E-Mail-Adresse ein.",
        });
      else if (!z.string().email().safeParse(value).success)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bitte prüfe deine E-Mail-Adresse.",
        });
    }),
  phone: optionalText(80),
  shapeWorld: z
    .string()
    .refine(
      (v) => v === "" || shapeWorlds.some((w) => w.name === v),
      "Bitte wähle eine Formenwelt.",
    )
    .optional()
    .default(""),
  scentWorld: z
    .string()
    .refine(
      (v) => v === "" || (scentWorlds as readonly string[]).includes(v),
      "Bitte wähle eine Duftwelt.",
    )
    .optional()
    .default(""),
  message: optionalText(3000),
});
export type Inquiry = z.infer<typeof inquirySchema>;

export const weddingInquirySchema = inquirySchema
  .pick({ name: true, email: true, message: true })
  .extend({
    weddingDate: z.union([date, z.literal("")]).optional().default(""),
    location: optionalText(200),
  });
