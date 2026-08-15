import type { Metadata } from "next";
import Link from "next/link";
import { SavedLooks } from "@/components/saved-looks";

export const metadata: Metadata = {
  title: "Saved Looks",
  description: "Your locally saved SOOCLY prototype Looks.",
};

export default function SavedPage() {
  return (
    <main id="main-content" className="saved-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Saved</span>
      </nav>
      <header className="saved-page__header">
        <p className="eyebrow">Stored on this device</p>
        <h1>Your saved Looks.</h1>
        <p>For the prototype, saves stay in this browser. Account sync comes later only if the core experience earns it.</p>
      </header>
      <SavedLooks />
    </main>
  );
}
