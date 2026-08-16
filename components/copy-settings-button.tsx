"use client";

import { useState } from "react";
import type { Setting } from "@/lib/types";

export function CopySettingsButton({
  lookName,
  deviceName,
  settings,
}: {
  lookName: string;
  deviceName: string;
  settings: Setting[];
}) {
  const [copied, setCopied] = useState(false);

  async function copySettings() {
    const text = [
      `${lookName} — ${deviceName}`,
      "",
      ...settings.map((setting) => `${setting.label}: ${setting.value}`),
      "",
      "Prototype settings — verify on your camera before relying on them.",
      "SOOCLY — Choose the look before you shoot.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="look-v1-copy" type="button" onClick={copySettings} aria-live="polite">
      <span>{copied ? "Copied" : "Copy settings"}</span>
      <span aria-hidden="true">{copied ? "✓" : "↗"}</span>
    </button>
  );
}
