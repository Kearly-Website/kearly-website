import { workshopConfig } from "./workshop-config";

function externalLink(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

/** Only supplied, approved legal copy or URLs can create customer-facing legal links. */
export function getLegalLinks() {
  return {
    imprint:
      externalLink(workshopConfig.legal.imprintUrl) ||
      (workshopConfig.legal.imprint ? "/impressum" : null),
    privacy:
      externalLink(workshopConfig.legal.privacyUrl) ||
      (workshopConfig.legal.privacy ? "/datenschutz" : null),
  };
}
