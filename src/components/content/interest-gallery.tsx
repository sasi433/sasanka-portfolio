import Image from "next/image";
import type { Interest } from "@/content/types";

export function InterestGallery({
  items,
  compact = false,
}: {
  items: readonly Interest[];
  compact?: boolean;
}) {
  return (
    <div className={`interest-gallery ${compact ? "is-compact" : ""}`}>
      {items.map((interest, index) => (
        <article className="interest-card" key={interest.title}>
          <Image
            src={interest.image.src}
            alt={interest.image.alt}
            fill
            sizes={
              compact
                ? "(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 24vw"
                : "(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 22vw"
            }
            className="interest-card__image"
            style={{ objectPosition: interest.image.position }}
          />
          <div className="interest-card__scrim" aria-hidden="true" />
          <p className="interest-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div className="interest-card__copy">
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
