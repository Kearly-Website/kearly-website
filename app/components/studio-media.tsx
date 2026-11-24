/* eslint-disable @next/next/no-img-element -- Approved source assets are served directly by Sites. */
import { PouringArt, MaterialArt, Spark } from "./atelier-art";
import { WorkshopPhoto } from "./workshop-photo";
import type { PhotoSlot } from "../workshop-config";

export function StudioMedia({
  slot,
  kind = "materials",
  compact = false,
}: {
  slot: PhotoSlot;
  kind?: "pouring" | "materials" | "together" | "color" | "scent";
  compact?: boolean;
}) {
  return (
    <div
      className={`studio-media media-${kind}`}
      data-image-slot={slot.id}
      data-photo-status={slot.status}
    >
      <WorkshopPhoto id={slot.id} eager={kind === "pouring" && !compact}>
        {slot.approved && slot.src ? (
          <img
            src={slot.src}
            alt={slot.alt}
            width={slot.width ?? 620}
            height={slot.height ?? 680}
            srcSet={slot.srcSet}
            sizes={
              slot.sizes ??
              "(max-width: 580px) calc(100vw - 40px), (max-width: 1050px) 50vw, 600px"
            }
            fetchPriority={kind === "pouring" && !compact ? "high" : undefined}
            loading={kind === "pouring" && !compact ? "eager" : "lazy"}
          />
        ) : kind === "pouring" ? (
          <PouringArt compact={compact} />
        ) : kind === "materials" || kind === "together" ? (
          <MaterialArt kind={kind} />
        ) : (
          <MaterialStudy kind={kind} />
        )}
      </WorkshopPhoto>
    </div>
  );
}
export function MaterialStudy({ kind }: { kind: "color" | "scent" }) {
  return (
    <div
      className={`material-study study-${kind}`}
      role="img"
      aria-label={
        kind === "color"
          ? "Illustration von Farben und Materialien."
          : "Illustration eines Duftfläschchens mit pflanzlichen Details."
      }
    >
      {kind === "color" ? (
        <>
          <span />
          <span />
          <span />
          <span />
          <Spark />
        </>
      ) : (
        <>
          <div className="study-ring" />
          <div className="study-vial" />
          <div className="study-stem" />
          <Spark />
        </>
      )}
    </div>
  );
}
export function CategoryArtwork({ tone }: { tone: string }) {
  return (
    <div className={`category-art tone-${tone}`} aria-hidden="true">
      <svg viewBox="0 0 400 300" fill="none">
        <ellipse
          cx="204"
          cy="155"
          rx="110"
          ry="85"
          stroke="currentColor"
          strokeWidth="1"
        />
        <ellipse
          cx="204"
          cy="155"
          rx="84"
          ry="110"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(45 204 155)"
        />
        <path
          d="M60 235h280M200 45v215"
          stroke="currentColor"
          strokeWidth=".6"
          opacity=".5"
        />
        <circle cx="200" cy="150" r="8" fill="currentColor" opacity=".25" />
      </svg>
      <span>FORMENWELT</span>
    </div>
  );
}
