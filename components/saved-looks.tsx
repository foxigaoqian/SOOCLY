"use client";

import { useEffect, useState } from "react";
import { looks } from "@/lib/demo-data";
import { LookCard } from "@/components/look-card";

const STORAGE_KEY = "soocly:saved:v1";

export function SavedLooks() {
  const [slugs, setSlugs] = useState<string[] | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setSlugs([]);
        return;
      }
      const parsed = JSON.parse(raw) as { version?: number; lookSlugs?: unknown };
      setSlugs(
        parsed.version === 1 && Array.isArray(parsed.lookSlugs)
          ? parsed.lookSlugs.filter((item): item is string => typeof item === "string")
          : [],
      );
    } catch {
      setSlugs([]);
    }
  }, []);

  if (slugs === null) {
    return <p className="empty-state" aria-live="polite">Loading saved Looks…</p>;
  }

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
