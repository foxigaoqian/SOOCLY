import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}): Promise<Metadata> {
  const { brand, model } = await params;

  return {
    alternates: {
      canonical: `/cameras/${brand}/${model}`,
    },
  };
}

export default function CameraLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
