"use client";

import { useEffect, useState, type ReactNode } from "react";

type Photos = Record<string, { alt: string }>;
let pending: Promise<Photos> | undefined;

export function WorkshopPhoto({ id, eager, children }: { id: string; eager: boolean; children: ReactNode }) {
  const [photo, setPhoto] = useState<{ alt: string }>();
  useEffect(() => {
    let active = true;
    pending ??= fetch("/api/workshop-photos")
      .then(response => response.ok ? response.json() as Promise<Photos> : {})
      .catch(() => ({}));
    void pending.then(photos => {
      if (active) setPhoto(photos[id]);
    });
    return () => { active = false; };
  }, [id]);
  return photo ? (
    // eslint-disable-next-line @next/next/no-img-element -- The image is streamed from the site.
    <img src={"/api/workshop-photos?bild=" + encodeURIComponent(id)} alt={photo.alt}
      loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setPhoto(undefined)} />
  ) : children;
}
