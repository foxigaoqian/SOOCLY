import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getDevice } from "@/lib/demo-data";
import { buildSocialMetadata } from "@/lib/social-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}): Promise<Metadata> {
  const { brand, model } = await params;
  const path = `/cameras/${brand}/${model}`;
  const device = getDevice(brand, model);

  if (!device) {
    return { alternates: { canonical: path } };
  }

  const title = `${device.brand} ${device.model} Camera Looks`;
  const description = `Discover SOOCLY Camera Looks made for the ${device.brand} ${device.model}. Browse visual directions, open device-specific settings, and choose the Look before you shoot.`;

  return {
    alternates: {
      canonical: path,
    },
    ...buildSocialMetadata({ title, description, path }),
  };
}

export default function CameraLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
