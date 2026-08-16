import type { Metadata } from "next";
import Link from "next/link";
import { MyGear } from "@/components/my-gear";

export const metadata: Metadata = {
  title: "My Gear",
  description:
    "Save the cameras you shoot with and keep SOOCLY discovery focused on Looks made for your gear.",
};

export default function MyGearPage() {
  return (
    <main id="main-content" className="my-gear-page">
      <div className="shell my-gear-page__breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>My Gear</span>
        </nav>
      </div>
      <MyGear />
    </main>
  );
}
