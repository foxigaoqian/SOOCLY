const STORAGE_KEY = "soocly:saved:v1";
const SAVED_EVENT = "soocly:saved";

type SavedPayload = {
  version: 1;
  lookSlugs: string[];
};

export function getSavedSnapshot() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

export function getServerSavedSnapshot() {
  return "";
}

export function parseSavedSnapshot(snapshot: string): string[] {
  if (!snapshot) return [];

  try {
    const parsed = JSON.parse(snapshot) as Partial<SavedPayload>;
    if (parsed.version !== 1 || !Array.isArray(parsed.lookSlugs)) return [];
    return parsed.lookSlugs.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function subscribeSaved(callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === null || event.key === STORAGE_KEY) callback();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SAVED_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(SAVED_EVENT, callback);
  };
}

function writeSavedLooks(lookSlugs: string[]) {
  const payload: SavedPayload = { version: 1, lookSlugs };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event(SAVED_EVENT));
}

export function toggleSavedLook(slug: string) {
  const current = parseSavedSnapshot(getSavedSnapshot());
  const next = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug];

  writeSavedLooks(next);
}

export function clearSavedLooks() {
  writeSavedLooks([]);
}
