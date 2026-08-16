import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import {
  SITE_DESCRIPTION,
  SITE_INDEXABLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import "./globals.css";
import "./apple-motion.css";
import "./brand-v4.css";
import "./brand-shell-v5.css";
import "./interaction-v6.css";
import "./look-detail-v1.css";
import "./looks-discovery-v1.css";
import "./camera-detail-v1.css";
import "./cameras-index-v1.css";
import "./my-gear-v1.css";
import "./saved-v1.css";
import "./about-v1.css";
import "./foundation-v1.css";
import "./prelaunch-v1.css";

const brandTitle = "SOOCLY — Choose the Look Before You Shoot.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: brandTitle,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  robots: SITE_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: brandTitle,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: brandTitle,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F2EA",
  colorScheme: "light",
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteMotion />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
