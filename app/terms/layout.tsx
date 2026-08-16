import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildSocialMetadata } from "@/lib/social-metadata";

const title = "Terms";
const description =
  "Basic terms for using the current SOOCLY Alpha and its prototype Camera Look settings.";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  ...buildSocialMetadata({ title, description, path: "/terms" }),
};

export default function TermsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
