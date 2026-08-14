"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import type { SkillVisual } from "@/content/types";

export type MediaStoryItem = {
  kicker: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
  badges?: readonly string[];
  placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  tone?: "burgundy" | "blue" | "green" | "slate" | "amber";
  visual?: SkillVisual;
};

const visualContent: Record<
  SkillVisual,
  { label: string; lines: readonly string[]; status: string }
> = {
  programming: {
    label: "event_handler.py",
    lines: [
      "async def publish_event(event):",
      "  payload = Event.validate(event)",
      "  await repository.save(payload)",
      "  return { status: accepted }",
    ],
    status: "Python · C/C++ · Shell",
  },
  backend: {
    label: "service request",
    lines: [
      "POST /api/events",
      "validate → authenticate",
      "service → repository",
      "202 ACCEPTED",
    ],
    status: "API contract verified",
  },
  delivery: {
    label: "delivery pipeline",
    lines: ["COMMIT", "TEST", "BUILD", "SCAN", "DEPLOY"],
    status: "container → cluster",
  },
  quality: {
    label: "quality gates",
    lines: [
      "lint             PASS",
      "typecheck        PASS",
      "unit tests       PASS",
      "security scan    PASS",
    ],
    status: "release candidate verified",
  },
  observability: {
    label: "production signals",
    lines: [
      "trace_id    8f2a…",
      "latency p95  142 ms",
      "error rate   0.08%",
      "logs · metrics · traces",
    ],
    status: "service healthy",
  },
  web: {
    label: "portfolio stack",
    lines: [
      "<HeroStage />",
      "<MediaScrollStory />",
      "Next.js → Worker edge",
      "responsive · accessible",
    ],
    status: "globally distributed",
  },
  ai: {
    label: "assisted workflow",
    lines: [
      "context → candidate",
      "candidate → evaluate",
      "evaluate → verify",
      "human review → deliver",
    ],
    status: "evidence before acceptance",
  },
};

function SkillSceneVisual({ kind }: { kind: SkillVisual }) {
  const content = visualContent[kind];

  return (
    <div
      className={`skill-scene-visual skill-scene-visual--${kind}`}
      data-skill-visual={kind}
      aria-hidden="true"
    >
      <div className="skill-scene-visual__header">
        <span className="skill-scene-visual__signal" />
        <span>{content.label}</span>
      </div>
      <div className="skill-scene-visual__lines">
        {content.lines.map((line, index) => (
          <span key={line} data-line={index + 1}>
            {line}
          </span>
        ))}
      </div>
      <div className="skill-scene-visual__status">
        <span />
        {content.status}
      </div>
    </div>
  );
}

export function MediaScrollStory({
  id,
  label,
  items,
  className,
}: {
  id: string;
  label: string;
  items: readonly MediaStoryItem[];
  className?: string;
}) {
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

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
        { rootMargin: "-34% 0px -56% 0px", threshold: 0 },
      );
      observer.observe(trigger);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [enhanced]);

  return (
    <section
      id={id}
      aria-label={label}
      className={`media-scroll-story ${className ?? ""} ${enhanced ? "is-enhanced" : ""}`}
      data-active-index={activeIndex}
      data-active-tone={items[activeIndex]?.tone ?? "burgundy"}
      style={{ "--media-story-count": items.length } as CSSProperties}
    >
      <div className="media-scroll-story__stage">
        <div className="media-scroll-story__scenes">
          {items.map((item, index) => {
            const active = index === activeIndex;
            return (
              <article
                key={item.title}
                className={`media-scroll-story__scene ${active ? "is-active" : ""}`}
                data-placement={item.placement ?? "bottom-left"}
                data-tone={item.tone ?? "burgundy"}
                aria-hidden={enhanced ? !active : undefined}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 899px) 94vw, 96vw"
                  className="media-scroll-story__image"
                  style={{ objectPosition: item.image.position }}
                />
                {item.visual ? <SkillSceneVisual kind={item.visual} /> : null}
                <div className="media-scroll-story__scrim" aria-hidden="true" />
                <div className="media-scroll-story__copy">
                  <div className="media-scroll-story__topline">
                    <p>{item.kicker}</p>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h2>{item.title}</h2>
                  <p className="media-scroll-story__description">
                    {item.description}
                  </p>
                  {item.badges?.length ? (
                    <div className="media-scroll-story__badges">
                      {item.badges.map((badge) => (
                        <Badge key={badge}>{badge}</Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
        <div className="media-scroll-story__progress" aria-hidden="true">
          <span
            style={{
              transform: `scaleX(${(activeIndex + 1) / items.length})`,
            }}
          />
        </div>
      </div>

      <div className="media-scroll-story__triggers" aria-hidden="true">
        {items.map((item, index) => (
          <div
            key={`${item.title}-trigger`}
            ref={(element) => {
              triggerRefs.current[index] = element;
            }}
            className="media-scroll-story__trigger"
          />
        ))}
      </div>
    </section>
  );
}
