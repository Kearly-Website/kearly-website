import Link from "next/link";
import { brand } from "./brand";
export default function NotFound() {
  return (
    <main className="wrap section">
      <p className="eyebrow">{brand.name.toUpperCase()} WORKSHOPS</p>
      <h1
        style={{ fontFamily: "var(--serif)", fontSize: 60, marginBottom: 30 }}
      >
        Hier geht’s zurück
        <br />
        zu deinen Ideen.
      </h1>
      <Link className="button" href="/">
        Zur Workshopseite
      </Link>
    </main>
  );
}
