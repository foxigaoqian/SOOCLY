"use client";

import { useSyncExternalStore } from "react";
import {
  getGearSnapshot,
  getServerGearSnapshot,
  parseGearSnapshot,
  subscribeGear,
  toggleGearDevice,
} from "@/lib/gear-store";

export function GearDeviceButton({
  deviceId,
  label,
}: {
  deviceId: string;
  label: string;
}) {
  const snapshot = useSyncExternalStore(
    subscribeGear,
    getGearSnapshot,
    getServerGearSnapshot,
  );
  const savedDeviceIds = parseGearSnapshot(snapshot);
  const isSaved = savedDeviceIds.includes(deviceId);

  return (
    <button
      className={`gear-device-button${isSaved ? " is-saved" : ""}`}
      type="button"
      onClick={() => toggleGearDevice(deviceId)}
      aria-pressed={isSaved}
    >
      <span className="gear-device-button__mark" aria-hidden="true">
        {isSaved ? "✓" : "+"}
      </span>
      <span>{isSaved ? `${label} is in My Gear` : `Add ${label} to My Gear`}</span>
    </button>
  );
}
