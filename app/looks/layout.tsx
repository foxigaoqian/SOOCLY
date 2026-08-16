import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/looks",
  },
};

export default function LooksLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
