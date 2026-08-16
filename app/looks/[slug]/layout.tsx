import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    alternates: {
      canonical: `/looks/${slug}`,
    },
  };
}

export default function LookLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
