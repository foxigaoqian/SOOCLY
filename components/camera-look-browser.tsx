"use client";

import { useMemo, useState } from "react";
import { LookCard } from "@/components/look-card";
import type { Device, Look } from "@/lib/types";

const preferredMoods = [
  "Street",
  "Night",
  "Portrait",
  "Travel",
  "Daylight",
  "Everyday",
  "Rain",
  "Overcast",
];

export function CameraLookBrowser({
  device,
  looks,
}: {
  device: Device;
  looks: Look[];
}) {
  const [activeMood, setActiveMood] = useState("All");

  const availableMoods = useMemo(
    () => preferredMoods.filter((mood) => looks.some((look) => look.tags.includes(mood))),
    [looks],
  );

  const filteredLooks = useMemo(() => {
    if (activeMood === "All") return looks;
    return looks.filter((look) => look.tags.includes(activeMood));
  }, [activeMood, looks]);

  return (
    <div className="camera-look-browser">
      <div className="camera-look-browser__toolbar">
        <div>
          <p className="eyebrow brand-eyebrow">Browse by mood / scene</p>
          <p className="camera-look-browser__count">
            {filteredLooks.length} {filteredLooks.length === 1 ? "Look" : "Looks"} for {device.shortLabel}
          </p>
        </div>

        <div className="camera-look-browser__filters" role="group" aria-label="Filter Looks by mood or scene">
          {["All", ...availableMoods].map((mood) => (
            <button
              key={mood}
              type="button"
              className={activeMood === mood ? "is-active" : undefined}
              aria-pressed={activeMood === mood}
              onClick={() => setActiveMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <div className="camera-look-browser__grid look-grid">
        {filteredLooks.map((look, index) => (
          <LookCard
            key={look.id}
            look={look}
            device={device}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}
