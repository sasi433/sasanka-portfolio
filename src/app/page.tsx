import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  Boxes,
  CloudCog,
  Code2,
  Network,
  SearchCheck,
  ServerCog,
} from "lucide-react";
import { CareerJourney } from "@/components/home/career-journey";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import { SectionContainer } from "@/components/ui/section-container";
import { WorkCard } from "@/components/work/work-card";
import { interests } from "@/content/interests";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { workItems } from "@/content/work";

const pillars = [
  {
    icon: ServerCog,
    title: "Backend and Python Engineering",
    description:
      "Maintainable services, reusable libraries and clear interfaces that reduce reinvention.",
  },
  {
    icon: Boxes,
    title: "CI/CD and Developer Tooling",
    description:
      "Build and delivery workflows that fail early, communicate clearly and support teams.",
  },
  {
    icon: CloudCog,
    title: "Cloud-Native Delivery",
    description:
      "Container workflows and Kubernetes/OpenShift delivery shaped by operational needs.",
  },
  {
    icon: SearchCheck,
    title: "Production Troubleshooting",
    description:
      "Structured triage, evidence analysis and practical collaboration across system boundaries.",
  },
] as const;

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
      <SectionContainer
        id="home-intro"
        routeLabel="Introduction"
        className="grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.68fr)] lg:py-20"
      >
        <div className="max-w-3xl">
          <Badge>Senior Software Engineer</Badge>
          <h1 className="mt-6 text-4xl leading-[1.03] font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl xl:text-7xl">
            Backend systems built for{" "}
            <span className="text-[var(--accent-emphasis)]">
              reliable delivery.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            {profile.summary}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/work">View My Work</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Me
            </ButtonLink>
          </div>
          <div className="mt-5 flex gap-2">
            <ExternalLink
              aria-label="Sasanka Maddala on GitHub"
              href={profile.githubUrl}
            >
              <Code2 aria-hidden="true" className="size-4" /> GitHub
            </ExternalLink>
            <ExternalLink
              aria-label="Sasanka Maddala on LinkedIn"
              href={profile.linkedInUrl}
            >
              <Network aria-hidden="true" className="size-4" /> LinkedIn
            </ExternalLink>
          </div>
          <Link
            href="#engineering-summary"
            className="mt-9 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-secondary)]"
          >
            Explore the portfolio{" "}
            <ArrowDown aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div data-hero-portrait className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2rem] bg-[var(--accent-soft)] opacity-70 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_24px_80px_var(--shadow)]">
            <Image
              src={profile.headshot.src}
              alt={profile.headshot.alt}
              width={900}
              height={900}
              priority
              loading="eager"
              sizes="(max-width: 1024px) 85vw, 36vw"
              className="aspect-square w-full rounded-[1.55rem] object-cover"
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer
        id="engineering-summary"
        routeLabel="Engineering focus"
        aria-labelledby="engineering-summary-heading"
        className="py-20 sm:py-24"
      >
        <SectionHeading
          eyebrow="Engineering focus"
          title="Broad systems experience, connected by reliability."
          id="engineering-summary-heading"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, ...pillar }) => (
            <Card key={pillar.title}>
              <Icon
                aria-hidden="true"
                className="size-5 text-[var(--accent-emphasis)]"
              />
              <h3 className="mt-5 text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer
        id="career-journey"
        routeLabel="Career journey"
        aria-labelledby="journey-heading"
        className="py-20 sm:py-24"
      >
        <SectionHeading
          eyebrow="Career journey"
          title="An expanding engineering scope."
          id="journey-heading"
          description="Systems fundamentals remain the foundation as the work grows across backend engineering, automation and cloud-native delivery."
        />
        <div className="mt-12">
          <CareerJourney />
        </div>
        <ButtonLink href="/experience" variant="secondary" className="mt-10">
          Explore experience
        </ButtonLink>
      </SectionContainer>

      <SectionContainer
        id="featured-work"
        routeLabel="Featured work"
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
        routeLabel="Engineering impact"
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
        routeLabel="Skills"
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
        routeLabel="Beyond code"
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

      <SectionContainer
        id="contact-destination"
        routeLabel="Contact"
        className="py-20 sm:py-24"
      >
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
