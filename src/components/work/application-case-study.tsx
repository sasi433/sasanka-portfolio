import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "@/components/ui/external-link";
import { SectionContainer } from "@/components/ui/section-container";
import { workExecutionModelLabels, workStatusLabels } from "@/content/work";
import type { WorkDetailSection, WorkItem, WorkMedia } from "@/content/types";

export function ApplicationCaseStudy({ item }: { item: WorkItem }) {
  const sections = new Map(
    item.detailSections?.map((section) => [section.id, section]),
  );
  const evidence = item.screenshots?.length
    ? item.screenshots
    : item.heroImage
      ? [item.heroImage]
      : [];

  return (
    <SectionContainer className="pb-20 sm:pb-24">
      <div className="flex flex-wrap gap-2">
        <Badge>{item.statusLabel ?? workStatusLabels[item.status]}</Badge>
        <Badge>{workExecutionModelLabels[item.executionModel]}</Badge>
      </div>

      <div className="mt-10 grid gap-12 xl:grid-cols-[minmax(0,48rem)_minmax(16rem,1fr)] xl:gap-20">
        <div className="space-y-12">
          <CopySection id="overview" title="Overview" body={item.context} />
          <CopySection
            id="problem-motivation"
            title="Problem / motivation"
            body={item.problem}
          />
          <ListSection
            id="what-it-implements"
            title="What it implements"
            values={item.approach}
          />
          <DetailSection section={sections.get("architecture-workflow")} />
          <DecisionSection decisions={item.decisions} />
          <DetailSection section={sections.get("reliability-security")} />
          <DetailSection section={sections.get("validation-testing")} />
        </div>

        <aside className="h-fit rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 xl:sticky xl:top-28">
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
            Project boundaries
          </p>
          <p className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
            Evidence with explicit scope
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            {item.executionModel === "live-web-application"
              ? "This application has a verified public deployment."
              : "This project is presented as a local or reproducible engineering implementation, not as a hosted service."}
          </p>
          <div className="mt-6 flex flex-col items-start gap-2 border-t border-[var(--border)] pt-5">
            <ProjectActions item={item} />
          </div>
        </aside>
      </div>

      {evidence.length ? (
        <ProjectGallery title={item.title} media={evidence} />
      ) : null}

      <div className="mt-16 max-w-3xl space-y-12 sm:mt-20">
        <ListSection id="outcomes" title="Outcomes" values={item.outcomes} />
        <DetailSection section={sections.get("scope-limitations")} />
        <section
          id="technology-stack"
          data-route-stop
          data-route-label="Technology stack"
          className="scroll-mt-24"
        >
          <h2 className="text-2xl font-semibold">Technology stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.technologies.map((technology) => (
              <Badge key={technology}>{technology}</Badge>
            ))}
          </div>
        </section>
      </div>
    </SectionContainer>
  );
}

function ProjectGallery({
  title,
  media,
}: {
  title: string;
  media: readonly WorkMedia[];
}) {
  return (
    <section
      id="screenshots-results"
      data-project-gallery
      data-route-stop
      data-route-label="Screenshots and results"
      className="mt-16 scroll-mt-24 sm:mt-20"
      aria-labelledby="screenshots-results-heading"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
          Project evidence
        </p>
        <h2
          id="screenshots-results-heading"
          className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
        >
          Screenshots / results
        </h2>
        <p className="mt-4 leading-7 text-[var(--text-secondary)]">
          Verified output from {title}, presented with the operating boundaries
          described on this page.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {media.map((image) => {
          const isWide = image.width / image.height >= 1.55;
          return (
            <figure
              className={`overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_70px_rgba(0,0,0,0.16)] ${isWide ? "xl:col-span-2" : ""}`}
              key={image.src}
            >
              <div className="flex min-h-56 items-center justify-center bg-[var(--surface-elevated)] p-2 sm:p-4">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  sizes={
                    isWide
                      ? "(min-width: 1280px) 88vw, 100vw"
                      : "(min-width: 1280px) 44vw, 100vw"
                  }
                  className="h-auto max-h-[48rem] w-full rounded-2xl object-contain"
                />
              </div>
              <figcaption className="border-t border-[var(--border)] px-5 py-4 text-sm leading-6 text-[var(--text-secondary)] sm:px-6">
                {image.caption ?? "Current project interface."}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function CopySection({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) {
  return (
    <section
      id={id}
      data-route-stop
      data-route-label={title}
      className="scroll-mt-24"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-4 leading-7 text-[var(--text-secondary)]">{body}</p>
    </section>
  );
}

function DetailSection({
  section,
}: {
  section: WorkDetailSection | undefined;
}) {
  if (!section) return null;

  return (
    <section
      id={section.id}
      data-route-stop
      data-route-label={section.title}
      className="scroll-mt-24"
    >
      <h2 className="text-2xl font-semibold">{section.title}</h2>
      {section.body ? (
        <p className="mt-4 leading-7 text-[var(--text-secondary)]">
          {section.body}
        </p>
      ) : null}
      {section.items?.length ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[var(--text-secondary)]">
          {section.items.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function DecisionSection({ decisions }: { decisions: WorkItem["decisions"] }) {
  return (
    <section
      id="key-engineering-decisions"
      data-route-stop
      data-route-label="Key engineering decisions"
      className="scroll-mt-24"
    >
      <h2 className="text-2xl font-semibold">Key engineering decisions</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {decisions.map((decision) => (
          <div
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            key={decision.title}
          >
            <h3 className="font-semibold">{decision.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              {decision.explanation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ListSection({
  id,
  title,
  values,
}: {
  id: string;
  title: string;
  values: readonly string[];
}) {
  return (
    <section
      id={id}
      data-route-stop
      data-route-label={title}
      className="scroll-mt-24"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[var(--text-secondary)]">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </section>
  );
}

function ProjectActions({ item }: { item: WorkItem }) {
  return (
    <>
      {item.githubUrl ? (
        <ExternalLink href={item.githubUrl}>
          View GitHub repository
        </ExternalLink>
      ) : null}
      {item.release?.url ? (
        <ExternalLink href={item.release.url}>
          View {item.release.label} release
        </ExternalLink>
      ) : null}
      {item.executionModel === "live-web-application" && item.liveUrl ? (
        <ExternalLink href={item.liveUrl}>View live application</ExternalLink>
      ) : null}
    </>
  );
}
