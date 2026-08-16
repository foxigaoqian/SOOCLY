const STORAGE_KEY = "soocly:gear:v1";
const GEAR_EVENT = "soocly:gear";

type GearPayload = {
  version: 1;
  deviceIds: string[];
};

export function getGearSnapshot() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

export function getServerGearSnapshot() {
  return "";
}

export function parseGearSnapshot(snapshot: string): string[] {
  if (!snapshot) return [];

  try {
    const parsed = JSON.parse(snapshot) as Partial<GearPayload>;
    if (parsed.version !== 1 || !Array.isArray(parsed.deviceIds)) return [];
    return parsed.deviceIds.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function subscribeGear(callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === null || event.key === STORAGE_KEY) callback();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(GEAR_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(GEAR_EVENT, callback);
  };
}

export function toggleGearDevice(deviceId: string) {
  const current = parseGearSnapshot(getGearSnapshot());
  const next = current.includes(deviceId)
    ? current.filter((item) => item !== deviceId)
    : [...current, deviceId];

  const payload: GearPayload = { version: 1, deviceIds: next };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event(GEAR_EVENT));
}
