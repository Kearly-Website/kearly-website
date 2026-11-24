/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation matches the supported Vinext runtime. */
import { notFound } from "next/navigation";
import { workshopConfig } from "../workshop-config";
import { brand } from "../brand";
export default function Privacy() {
  if (!workshopConfig.legal.privacy) notFound();
  return (
    <main className="wrap section">
      <a className="text-link" href="/workshop">
        Zurück zu {brand.name}
      </a>
      <h1>Datenschutz</h1>
      <div style={{ whiteSpace: "pre-wrap", marginTop: 30 }}>
        {workshopConfig.legal.privacy}
      </div>
    </main>
  );
}
