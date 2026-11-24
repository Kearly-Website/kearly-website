import type { Metadata } from "next";
import "./globals.css";
import "./v07.css";
import { brand } from "./brand";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: brand.title,
  description: brand.description,
  openGraph: {
    title: brand.title,
    description: brand.description,
    images: [
      {
        url: brand.logo.originalSrc,
        width: 1254,
        height: 1254,
        alt: brand.logo.alt,
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
