import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { WorkItem } from "@/content/types";
import { workStatusLabels } from "@/content/work";

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap gap-2">
        <Badge>
          {item.type === "application" ? "Application" : "Case study"}
        </Badge>
        <Badge>{item.statusLabel ?? workStatusLabels[item.status]}</Badge>
      </div>
      <h2 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">
        {item.shortTitle ?? item.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
        {item.summary}
      </p>
      <Link
        href={`/work/${item.slug}`}
        className="mt-6 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-[var(--accent-emphasis)]"
      >
        Read case study <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </Card>
  );
}
