import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Device, Look } from "@/lib/types";

export function LookCard({
  look,
  device,
  priority = false,
}: {
  look: Look;
  device?: Device;
  priority?: boolean;
}) {
  const href = device ? `/looks/${look.slug}?device=${device.id}` : `/looks/${look.slug}`;

  return (
    <article className="look-card" style={{ "--look-accent": look.accent } as CSSProperties}>
      <Link className="look-card__image" href={href} aria-label={`Open ${look.name}`}>
        <Image
          src={look.coverImage}
          alt={`Editorial demo for the ${look.name} look`}
          fill
          priority={priority}
          sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 31vw"
        />
        <span className="look-card__frame" aria-hidden="true" />
        <span className="look-card__index" aria-hidden="true">
          LOOK / {look.slug.slice(0, 2).toUpperCase()}
        </span>
      </Link>
      <div className="look-card__body">
        <div>
          <p className="eyebrow">{look.kicker}</p>
          <h3>{look.name}</h3>
        </div>
        <p>{look.summary}</p>
        <div className="tag-row" aria-label="Look tags">
          {look.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link className="text-link" href={href}>
          View Look <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
