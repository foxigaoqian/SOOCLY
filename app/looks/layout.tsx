import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildSocialMetadata } from "@/lib/social-metadata";

const title = "Camera Looks";
const description =
  "Browse SOOCLY Camera Looks by mood, scene, and camera. Start with the photograph you want to make, then open the version built for your gear.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/looks",
  },
  ...buildSocialMetadata({ title, description, path: "/looks" }),
};

export default function LooksLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
