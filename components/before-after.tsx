"use client";

import Image from "next/image";
import { useState } from "react";

export function BeforeAfter({
  image,
  alt,
  filter,
  lookLabel = "SOOCLY Look",
}: {
  image: string;
  alt: string;
  filter: string;
  lookLabel?: string;
}) {
  const [position, setPosition] = useState(52);

  return (
    <div className="comparison">
      <div className="comparison__stage" role="group" aria-label={`Compare Default with ${lookLabel}`}>
        <Image
          src={image}
          alt={`${alt}, default visualization`}
          fill
          priority
          sizes="(max-width: 900px) 94vw, 1240px"
          className="comparison__image"
        />

        <div
          className="comparison__after"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          aria-hidden="true"
        >
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 94vw, 1240px"
            className="comparison__image"
            style={{ filter }}
          />
        </div>

        <div className="comparison__labels" aria-hidden="true">
          <span>Default</span>
          <span>{lookLabel}</span>
        </div>

        <div className="comparison__divider" aria-hidden="true" style={{ left: `${position}%` }}>
          <span className="comparison__handle">
            <span>‹</span>
            <span>›</span>
          </span>
        </div>

        <input
          className="comparison__scrubber"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Drag to compare Default and ${lookLabel}`}
        />
      </div>

      <div className="comparison__meta">
        <span>← Drag anywhere across the image →</span>
        <span>Default / {lookLabel}</span>
      </div>

      <p className="comparison__disclaimer">
        Prototype visualization only: the Look side currently uses a browser color treatment. Production comparisons must use verified same-scene camera output.
      </p>
    </div>
  );
}
