"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const stageRef = useRef<HTMLDivElement>(null);
  const interactedRef = useRef(false);
  const demoedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || demoedRef.current || interactedRef.current) return;

        demoedRef.current = true;
        stage.classList.add("is-auto-demo");

        const sequence: Array<[number, number]> = [
          [260, 66],
          [900, 36],
          [1540, 52],
        ];

        sequence.forEach(([delay, nextPosition], index) => {
          const timer = window.setTimeout(() => {
            if (interactedRef.current) return;
            setPosition(nextPosition);
            if (index === sequence.length - 1) {
              window.setTimeout(() => stage.classList.remove("is-auto-demo"), 520);
            }
          }, delay);
          timersRef.current.push(timer);
        });

        observer.unobserve(entry.target);
      },
      { threshold: 0.55 },
    );

    observer.observe(stage);
    return () => {
      observer.disconnect();
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const stopAutoDemo = () => {
    interactedRef.current = true;
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    stageRef.current?.classList.remove("is-auto-demo");
  };

  return (
    <div className="comparison comparison--soocly-split">
      <div className="comparison__brandline" aria-hidden="true">
        <span className="comparison__brandline-name">The SOOCLY Split</span>
        <span className="comparison__brandline-rule" />
        <span className="comparison__brandline-state">Default → Look</span>
      </div>

      <div
        ref={stageRef}
        className="comparison__stage"
        role="group"
        aria-label={`Compare Default with ${lookLabel}`}
      >
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
          <span className="comparison__handle comparison__handle--soocly">
            <span className="comparison__oo comparison__oo--outline" />
            <span className="comparison__oo comparison__oo--fill" />
          </span>
        </div>

        <input
          className="comparison__scrubber"
          type="range"
          min="0"
          max="100"
          value={position}
          onPointerDown={stopAutoDemo}
          onKeyDown={stopAutoDemo}
          onChange={(event) => {
            stopAutoDemo();
            setPosition(Number(event.target.value));
          }}
          aria-label={`Drag to compare Default and ${lookLabel}`}
        />
      </div>

      <div className="comparison__meta">
        <span>← Drag anywhere across the image →</span>
        <span>Choose it here. Shoot it out there.</span>
      </div>

      <p className="comparison__disclaimer">
        Prototype visualization only: the Look side currently uses a browser color treatment. Production comparisons must use verified same-scene camera output.
      </p>
    </div>
  );
}
