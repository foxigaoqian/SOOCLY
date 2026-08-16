import type { Metadata } from "next";
import { LooksDiscovery } from "@/components/looks-discovery";
import { devices, looks, lookVariants } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Camera Looks",
  description:
    "Browse SOOCLY Camera Looks by mood, scene, and camera. Start with the photograph you want to make, then open the version built for your gear.",
};

export default function LooksPage() {
  return (
    <main id="main-content" className="looks-page">
      <LooksDiscovery looks={looks} devices={devices} variants={lookVariants} />
    </main>
  );
}
