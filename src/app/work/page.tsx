import { PageIntro } from "@/components/content/page-intro";
import { SectionContainer } from "@/components/ui/section-container";
import { WorkCard } from "@/components/work/work-card";
import {
  getWorkItemsByCategory,
  workCategorySections,
  workItems,
} from "@/content/work";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Work",
  "Curated applications, sanitised professional case studies and reproducible technical engineering work.",
  "/work",
);

export default function WorkPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Work"
        title="Applications and engineering evidence."
        description="A curated collection of public engineering projects, sanitised professional case studies and reproducible technical work—each presented with clear scope and evidence."
      />
      {workCategorySections.map((section) => (
        <WorkSection
          key={section.category}
          id={section.id}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          items={getWorkItemsByCategory(section.category)}
        />
      ))}
    </div>
  );
}

function WorkSection({
  id,
  eyebrow,
  title,
  description,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: typeof workItems;
}) {
  return (
    <SectionContainer
      id={id}
      aria-labelledby={`${id}-heading`}
      className="pb-20 sm:pb-24"
    >
      <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent-emphasis)] uppercase">
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-3 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--text-secondary)]">
        {description}
      </p>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </SectionContainer>
  );
}
