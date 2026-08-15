"use client";

import { useSyncExternalStore } from "react";
import {
  getSavedSnapshot,
  getServerSavedSnapshot,
  parseSavedSnapshot,
  subscribeSaved,
  toggleSavedLook,
} from "@/lib/saved-store";

export function SaveLookButton({ slug }: { slug: string }) {
  const snapshot = useSyncExternalStore(
    subscribeSaved,
    getSavedSnapshot,
    getServerSavedSnapshot,
  );
  const saved = parseSavedSnapshot(snapshot).includes(slug);

  return (
    <button
      className={`save-button${saved ? " is-saved" : ""}`}
      type="button"
      onClick={() => toggleSavedLook(slug)}
      aria-pressed={saved}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 20.25 4.76 12.9A5.2 5.2 0 0 1 12 5.45a5.2 5.2 0 0 1 7.24 7.45L12 20.25Z"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
      {saved ? "Saved" : "Save This Look"}
    </button>
  );
}
