"use client";

import {
  Boxes,
  CloudCog,
  CodeXml,
  SearchCheck,
  ServerCog,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";

export type StoryItem = {
  kicker: string;
  title: string;
  description: string;
  icon?: "backend" | "tooling" | "cloud" | "reliability" | "foundation";
};

const icons: Record<NonNullable<StoryItem["icon"]>, LucideIcon> = {
  backend: ServerCog,
  tooling: Boxes,
  cloud: CloudCog,
  reliability: SearchCheck,
  foundation: CodeXml,
};

export function ScrollStory({
  id,
  eyebrow,
  title,
  description,
  items,
  cta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: readonly StoryItem[];
  cta?: { href: string; label: string };
}) {
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const headingId = `${id}-heading`;

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 899px)",
    );
    const update = () => setEnhanced(!media.matches);
    const frame = requestAnimationFrame(update);
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enhanced) return;

    const observers = triggerRefs.current.map((trigger, index) => {
      if (!trigger) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { rootMargin: "-32% 0px -58% 0px", threshold: 0 },
      );
      observer.observe(trigger);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [enhanced]);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-story ${enhanced ? "is-enhanced" : ""}`}
      style={{ "--story-count": items.length } as CSSProperties}
    >
      <div className="scroll-story__stage">
        <div className="scroll-story__intro">
          <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-emphasis)] uppercase">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-[var(--text-secondary)]">
            {description}
          </p>
          <div className="scroll-story__progress" aria-hidden="true">
            <span
              style={{
                transform: `scaleX(${(activeIndex + 1) / items.length})`,
              }}
            />
          </div>
          {cta ? (
            <ButtonLink href={cta.href} variant="secondary" className="mt-8">
              {cta.label}
            </ButtonLink>
          ) : null}
        </div>

        <div className="scroll-story__scenes">
          {items.map((item, index) => {
            const Icon = item.icon ? icons[item.icon] : null;
            const active = index === activeIndex;
            return (
              <article
                key={`${item.kicker}-${item.title}`}
                className={`scroll-story__scene ${active ? "is-active" : ""}`}
                aria-hidden={enhanced ? !active : undefined}
              >
                <div className="scroll-story__scene-topline">
                  <p>{item.kicker}</p>
                  {Icon ? <Icon aria-hidden="true" className="size-6" /> : null}
                </div>
                <h3>{item.title}</h3>
                <p className="scroll-story__description">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="scroll-story__triggers" aria-hidden="true">
        {items.map((item, index) => (
          <div
            key={`${item.title}-trigger`}
            ref={(element) => {
              triggerRefs.current[index] = element;
            }}
            className="scroll-story__trigger"
          />
        ))}
      </div>
    </section>
  );
}
