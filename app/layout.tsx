import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { profile } from "@/data/profile";
import { themeCSSVariables } from "@/data/theme";

const siteUrl =
  profile.seo.siteUrl ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: profile.seo.title,
  description: profile.seo.description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: profile.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={themeCSSVariables}>
      <body>{children}</body>
    </html>
  );
}
