import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getLook } from "@/lib/demo-data";
import { buildSocialMetadata } from "@/lib/social-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = `/looks/${slug}`;
  const look = getLook(slug);

  if (!look) {
    return { alternates: { canonical: path } };
  }

  const description = `${look.summary} Choose the Look before you shoot, then use the version made for your camera.`;

  return {
    alternates: {
      canonical: path,
    },
    ...buildSocialMetadata({ title: look.name, description, path }),
  };
}

export default function LookLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
