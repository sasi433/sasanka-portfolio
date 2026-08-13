import { PageIntro } from "@/components/content/page-intro";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/ui/section-container";
import { WorkCard } from "@/components/work/work-card";
import { workItems } from "@/content/work";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Work",
  "Curated applications and sanitised engineering case studies covering backend systems, delivery automation and troubleshooting.",
  "/work",
);

const applications = workItems.filter(
  (item) => item.type === "application" && item.status !== "currently-building",
);
const caseStudies = workItems.filter(
  (item) => item.type === "engineering-case-study",
);
const currentlyBuilding = workItems.filter(
  (item) => item.status === "currently-building",
);

export default function WorkPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Work"
        title="Applications and engineering evidence."
        description="A manually curated collection of public applications and sanitised professional case studies—focused on decisions, reliability and maintainability rather than vanity metrics."
      />
      <WorkSection
        id="applications"
        eyebrow="Featured applications"
        title="Public projects built to solve and explore."
        items={applications}
      />
      <WorkSection
        id="case-studies"
        eyebrow="Engineering case studies"
        title="Professional work, explained without proprietary detail."
        items={caseStudies}
      />
      <WorkSection
        id="building"
        eyebrow="Currently building"
        title="Active work shown with an honest status."
        items={currentlyBuilding}
      />
      <SectionContainer id="secure-engineering" className="pb-20 sm:pb-24">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-6 sm:p-8">
          <Badge>Secure engineering highlight</Badge>
          <h2 className="mt-4 text-xl font-semibold">
            Supported Secure Development Awareness as the Team&apos;s Security
            Master
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--text-secondary)]">
            Supported team awareness and secure-development practices alongside
            software engineering responsibilities. This was not a dedicated
            security role.
          </p>
        </div>
      </SectionContainer>
    </div>
  );
}

function WorkSection({
  id,
  eyebrow,
  title,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
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
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </SectionContainer>
  );
}
