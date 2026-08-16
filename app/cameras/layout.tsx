import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildSocialMetadata } from "@/lib/social-metadata";

const title = "Supported Cameras";
const description =
  "Find SOOCLY Camera Looks made for supported Fujifilm and Ricoh cameras. Choose your camera first, then discover visual directions built for its in-camera controls.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/cameras",
  },
  ...buildSocialMetadata({ title, description, path: "/cameras" }),
};

export default function CamerasLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
