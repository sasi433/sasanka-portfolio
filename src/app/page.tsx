import Link from "next/link";
import { careerStoryItems } from "@/components/home/career-journey";
import { HeroStage } from "@/components/home/hero-stage";
import { ScrollStory, type StoryItem } from "@/components/home/scroll-story";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { WorkCard } from "@/components/work/work-card";
import { interests } from "@/content/interests";
import { skillGroups } from "@/content/skills";
import { workItems } from "@/content/work";

const pillars = [
  {
    kicker: "Services and interfaces",
    icon: "backend",
    title: "Backend and Python Engineering",
    description:
      "Maintainable services, reusable libraries and clear interfaces that reduce reinvention.",
  },
  {
    kicker: "From commit to release",
    icon: "tooling",
    title: "CI/CD and Developer Tooling",
    description:
      "Build and delivery workflows that fail early, communicate clearly and support teams.",
  },
  {
    kicker: "Runtime and operations",
    icon: "cloud",
    title: "Cloud-Native Delivery",
    description:
      "Container workflows and Kubernetes/OpenShift delivery shaped by operational needs.",
  },
  {
    kicker: "Evidence before assumptions",
    icon: "reliability",
    title: "Production Troubleshooting",
    description:
      "Structured triage, evidence analysis and practical collaboration across system boundaries.",
  },
] as const satisfies readonly StoryItem[];

const impacts = [
  "Shared Python capabilities with clearer ownership and less duplication",
  "More predictable container build, validation, scanning and delivery workflows",
  "Earlier build feedback through clearer module ownership and fail-fast validation",
  "Evidence-led production issue triage and cross-team escalation",
  "Supported Secure Development Awareness as the Team's Security Master",
] as const;

export default function Home() {
  const featured = workItems.filter((item) => item.featured).slice(0, 4);
  const building = workItems.find(
    (item) => item.slug === "document-support-rag-chatbot",
  );

  return (
    <div className="page-shell">
      <HeroStage />

      <ScrollStory
        id="engineering-summary"
        eyebrow="Engineering focus"
        title="Broad systems experience, connected by reliability."
        description="Each change in focus is a different part of the same delivery system—from maintainable services to dependable operations."
        items={pillars}
      />

      <ScrollStory
        id="career-journey"
        eyebrow="Career journey"
        title="An expanding engineering scope."
        description="Systems fundamentals remain the foundation as the work grows across backend engineering, automation and cloud-native delivery."
        items={careerStoryItems}
        cta={{ href: "/experience", label: "Explore experience" }}
      />

      <SectionContainer
        id="featured-work"
        aria-labelledby="featured-heading"
        className="py-20 sm:py-24"
      >
        <SectionHeading
          eyebrow="Featured work"
          title="Evidence through applications and engineering case studies."
          id="featured-heading"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featured.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
        {building ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[var(--border)] p-6">
            <Badge>Currently building</Badge>
            <h3 className="mt-4 text-lg font-semibold">{building.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
              {building.summary}
            </p>
            <Link
              className="mt-4 inline-block font-semibold text-[var(--accent-emphasis)]"
              href={`/work/${building.slug}`}
            >
              Follow the project →
            </Link>
          </div>
        ) : null}
      </SectionContainer>

      <SectionContainer
        id="engineering-impact"
        aria-labelledby="impact-heading"
        className="py-20 sm:py-24"
      >
        <SectionHeading
          eyebrow="Engineering impact"
          title="Improving the systems around the code."
          id="impact-heading"
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {impacts.map((impact) => (
            <li
              key={impact}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 leading-7 text-[var(--text-secondary)]"
            >
              {impact}
            </li>
          ))}
        </ul>
      </SectionContainer>

      <SectionContainer
        id="skills-summary"
        aria-labelledby="skills-heading"
        className="py-20 sm:py-24"
      >
        <SectionHeading
          eyebrow="Skills"
          title="A practical toolkit across the delivery lifecycle."
          id="skills-heading"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {skillGroups.slice(0, 6).map((group) => (
            <div
              key={group.title}
              className="border-l border-[var(--border)] pl-5"
            >
              <h3 className="font-semibold">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {group.skills.slice(0, 4).join(" · ")}
              </p>
            </div>
          ))}
        </div>
        <ButtonLink href="/skills" variant="secondary" className="mt-10">
          View all skills
        </ButtonLink>
      </SectionContainer>

      <SectionContainer
        id="beyond-code"
        aria-labelledby="beyond-heading"
        className="py-20 sm:py-24"
      >
        <SectionHeading
          eyebrow="Beyond code"
          title="Curiosity continues outside the editor."
          id="beyond-heading"
        />
        <p className="mt-6 max-w-3xl leading-7 text-[var(--text-secondary)]">
          {interests
            .slice(0, 6)
            .map((interest) => interest.title)
            .join(", ")}
          —interests that keep me curious about systems, products and how people
          experience them.
        </p>
        <ButtonLink href="/about" variant="ghost" className="mt-6">
          More about me
        </ButtonLink>
      </SectionContainer>

      <SectionContainer id="contact-destination" className="py-20 sm:py-24">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--accent-soft)] p-7 sm:p-10">
          <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent-emphasis)] uppercase">
            Let&apos;s talk
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em]">
            Interested in backend systems, developer tooling or cloud-native
            delivery?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--text-secondary)]">
            Get in touch for a professional conversation about software
            engineering or collaboration.
          </p>
          <ButtonLink href="/contact" className="mt-7">
            Contact Me
          </ButtonLink>
        </div>
      </SectionContainer>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  id,
  description,
}: {
  eyebrow: string;
  title: string;
  id: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-emphasis)] uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 leading-7 text-[var(--text-secondary)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
