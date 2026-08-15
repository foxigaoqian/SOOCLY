"use client";

import Image from "next/image";
import { useState } from "react";

export function BeforeAfter({
  image,
  alt,
  filter,
}: {
  image: string;
  alt: string;
  filter: string;
}) {
  const [position, setPosition] = useState(58);

  return (
    <div className="comparison">
      <div className="comparison__canvas" role="group" aria-label="Prototype before and after visualization">
        <Image
          src={image}
          alt={`${alt}, default visualization`}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 68vw"
          className="comparison__image"
        />
        <div
          className="comparison__after"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 68vw"
            className="comparison__image"
            style={{ filter }}
          />
        </div>
        <div className="comparison__labels" aria-hidden="true">
          <span>Default</span>
          <span>Look</span>
        </div>
        <div className="comparison__line" aria-hidden="true" style={{ left: `${position}%` }}>
          <span>↔</span>
        </div>
      </div>
      <label className="comparison__control">
        <span>Compare Default & Look</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Move before and after comparison divider"
        />
      </label>
      <p className="comparison__disclaimer">
        Prototype visualization: the “Look” side uses a browser color treatment to demonstrate the interaction. Final product proof must use verified same-scene camera output.
      </p>
    </div>
  );
}
