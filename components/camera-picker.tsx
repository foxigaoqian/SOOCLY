"use client";

import Link from "next/link";
import { useState } from "react";
import type { Device } from "@/lib/types";

export function CameraPicker({ devices }: { devices: Device[] }) {
  const [selected, setSelected] = useState(devices[0]?.id ?? "");
  const device = devices.find((item) => item.id === selected);
  const href = device ? `/cameras/${device.brandSlug}/${device.modelSlug}` : "/#cameras";

  return (
    <div className="camera-picker">
      <label className="camera-picker__label" htmlFor="camera-picker">
        Your camera
      </label>
      <div className="camera-picker__controls">
        <select
          id="camera-picker"
          name="camera"
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          autoComplete="off"
        >
          {devices.map((item) => (
            <option key={item.id} value={item.id}>
              {item.brand} {item.model}
            </option>
          ))}
        </select>
        <Link className="camera-picker__action" href={href}>
          Show My Looks
        </Link>
      </div>
    </div>
  );
}
