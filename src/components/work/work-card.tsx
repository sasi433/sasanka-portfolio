import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, Braces, Code2, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import type { WorkItem } from "@/content/types";
import {
  workCategoryBadgeLabels,
  workExecutionModelLabels,
  workStatusLabels,
} from "@/content/work";

export function WorkCard({ item }: { item: WorkItem }) {
  const VisualIcon = item.githubUrl
    ? Code2
    : item.slug.includes("container")
      ? Boxes
      : item.type === "engineering-case-study"
        ? Workflow
        : Braces;

  return (
    <Card
      className="work-card flex h-full flex-col"
      data-work-kind={item.type}
      data-work-slug={item.slug}
    >
      {item.heroImage ? (
        <div className="work-card__visual work-card__visual--evidence">
          <Image
            src={item.heroImage.src}
            alt={item.heroImage.alt}
            width={item.heroImage.width}
            height={item.heroImage.height}
            sizes="(min-width: 768px) 50vw, 100vw"
            loading="lazy"
            className="work-card__image"
          />
        </div>
      ) : (
        <div className="work-card__visual" aria-hidden="true">
          <span className="work-card__ring" />
          <span className="work-card__icon">
            <VisualIcon className="size-7" />
          </span>
          <span className="work-card__signal" />
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Badge>{workCategoryBadgeLabels[item.category]}</Badge>
        <Badge>{item.statusLabel ?? workStatusLabels[item.status]}</Badge>
        <Badge>{workExecutionModelLabels[item.executionModel]}</Badge>
      </div>
      <h2 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">
        {item.shortTitle ?? item.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
        {item.summary}
      </p>
      <ul
        className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[var(--text-secondary)]"
        aria-label="Key technologies"
      >
        {item.technologies.slice(0, 4).map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Link
          href={`/work/${item.slug}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-[var(--accent-emphasis)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          {item.type === "application" ? "View project" : "Read case study"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        {item.githubUrl ? (
          <ExternalLink
            href={item.githubUrl}
            aria-label={`Open ${item.shortTitle ?? item.title} GitHub repository`}
            className="text-xs"
          >
            GitHub
          </ExternalLink>
        ) : null}
      </div>
    </Card>
  );
}
