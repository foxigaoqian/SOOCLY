import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://soocly.com"),
  title: {
    default: "SOOCLY — Find Your Look. Shoot It Straight.",
    template: "%s — SOOCLY",
  },
  description: "Discover camera Looks calibrated for your device, compare the result, and apply the settings before you shoot.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f4f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
