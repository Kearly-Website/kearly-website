/* eslint-disable @next/next/no-img-element -- Serve the supplied SVG directly. */
import { brand } from "../brand";

export function BrandWordmark({
  className = "",
  decorative = false,
  loading = "lazy",
}: {
  className?: string;
  decorative?: boolean;
  loading?: "eager" | "lazy";
}) {
  return (
    <img
      className={`brand-wordmark ${className}`}
      src={brand.wordmark.src}
      alt={decorative ? "" : brand.wordmark.alt}
      width={brand.wordmark.width}
      height={brand.wordmark.height}
      decoding="async"
      loading={loading}
    />
  );
}

export function BrandLockup({ loading = "lazy" }: { loading?: "eager" | "lazy" } = {}) {
  return (
    <span className="brand-lockup">
      <BrandWordmark loading={loading} />
    </span>
  );
}
