import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://soocly.com"),
  title: {
    default: "SOOCLY — Choose the Look Before You Shoot.",
    template: "%s — SOOCLY",
  },
  description: "Discover Camera Looks made for your gear. Choose a visual direction before you shoot, apply the camera-specific settings, and shoot it straight.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F5F2EA",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteMotion />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
