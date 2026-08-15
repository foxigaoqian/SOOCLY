"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "soocly:saved:v1";

type SavedPayload = {
  version: 1;
  lookSlugs: string[];
};

function readSaved(): SavedPayload {
  if (typeof window === "undefined") return { version: 1, lookSlugs: [] };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: 1, lookSlugs: [] };
    const parsed = JSON.parse(raw) as Partial<SavedPayload>;
    if (parsed.version !== 1 || !Array.isArray(parsed.lookSlugs)) {
      return { version: 1, lookSlugs: [] };
    }
    return {
      version: 1,
      lookSlugs: parsed.lookSlugs.filter((item) => typeof item === "string"),
    };
  } catch {
    return { version: 1, lookSlugs: [] };
  }
}

export function SaveLookButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const payload = readSaved();
    setSaved(payload.lookSlugs.includes(slug));
    setReady(true);
  }, [slug]);

  function toggleSaved() {
    const payload = readSaved();
    const next = payload.lookSlugs.includes(slug)
      ? payload.lookSlugs.filter((item) => item !== slug)
      : [...payload.lookSlugs, slug];

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, lookSlugs: next } satisfies SavedPayload),
    );
    setSaved(next.includes(slug));
  }

  return (
    <button
      className={`save-button${saved ? " is-saved" : ""}`}
      type="button"
      onClick={toggleSaved}
      aria-pressed={saved}
      disabled={!ready}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 20.25 4.76 12.9A5.2 5.2 0 0 1 12 5.45a5.2 5.2 0 0 1 7.24 7.45L12 20.25Z"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
      {ready ? (saved ? "Saved" : "Save This Look") : "Loading…"}
    </button>
  );
}
