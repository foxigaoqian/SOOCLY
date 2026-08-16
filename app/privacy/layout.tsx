import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildSocialMetadata } from "@/lib/social-metadata";

const title = "Privacy";
const description =
  "How the SOOCLY Alpha handles browser-local data and basic site delivery information.";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  ...buildSocialMetadata({ title, description, path: "/privacy" }),
};

export default function PrivacyLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
