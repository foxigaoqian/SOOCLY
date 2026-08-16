import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildSocialMetadata } from "@/lib/social-metadata";

const title = "About SOOCLY";
const description =
  "SOOCLY is built around a simple photographic idea: choose the look before you shoot. Discover a visual direction, use the version made for your camera, and spend less time fixing photographs later.";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  ...buildSocialMetadata({ title, description, path: "/about" }),
};

export default function AboutLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
