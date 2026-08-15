"use client";

import { useSyncExternalStore } from "react";
import { LookCard } from "@/components/look-card";
import { looks } from "@/lib/demo-data";
import {
  getSavedSnapshot,
  getServerSavedSnapshot,
  parseSavedSnapshot,
  subscribeSaved,
} from "@/lib/saved-store";

export function SavedLooks() {
  const snapshot = useSyncExternalStore(
    subscribeSaved,
    getSavedSnapshot,
    getServerSavedSnapshot,
  );
  const slugs = parseSavedSnapshot(snapshot);
  const savedLooks = looks.filter((look) => slugs.includes(look.slug));

  if (savedLooks.length === 0) {
    return (
      <div className="empty-state">
        <strong>No saved Looks yet.</strong>
        <span>Open a Look and tap “Save This Look” to build your shortlist.</span>
      </div>
    );
  }

  return (
    <div className="look-grid">
      {savedLooks.map((look) => (
        <LookCard key={look.id} look={look} />
      ))}
    </div>
  );
}
