import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/content/page-intro";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "@/components/ui/external-link";
import { SectionContainer } from "@/components/ui/section-container";
import { CaseStudyDiagram } from "@/components/work/case-study-diagram";
import { getWorkItem, workItems, workStatusLabels } from "@/content/work";

type WorkDetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailProps): Promise<Metadata> {
  const item = getWorkItem((await params).slug);
  return item
    ? {
        title: item.shortTitle ?? item.title,
        description: item.summary,
        alternates: { canonical: `/work/${item.slug}` },
        openGraph: {
          title: item.shortTitle ?? item.title,
          description: item.summary,
          url: `/work/${item.slug}`,
          type: "article",
        },
      }
    : {};
}

export default async function WorkDetailPage({ params }: WorkDetailProps) {
  const item = getWorkItem((await params).slug);
  if (!item) notFound();

  const sections = [
    { id: "context", title: "Context", content: item.context },
    { id: "problem", title: "Problem", content: item.problem },
  ];

  return (
    <article className="page-shell">
      <PageIntro
        eyebrow={
          item.type === "application" ? "Application" : "Engineering case study"
        }
        title={item.title}
        description={item.summary}
      />
      <SectionContainer className="pb-20 sm:pb-24">
        <Badge>{item.statusLabel ?? workStatusLabels[item.status]}</Badge>
        <div className="mt-10 max-w-3xl space-y-12">
          {sections.map((section) => (
            <section
              id={section.id}
              data-route-stop
              data-route-label={section.title}
              className="scroll-mt-24"
              key={section.title}
            >
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">
                {section.content}
              </p>
            </section>
          ))}
          <ListSection id="approach" title="Approach" values={item.approach} />
          <CaseStudyDiagram slug={item.slug} />
          <section
            id="technical-decisions"
            data-route-stop
            data-route-label="Technical decisions"
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-semibold">Technical decisions</h2>
            <div className="mt-4 space-y-5">
              {item.decisions.map((decision) => (
                <div key={decision.title}>
                  <h3 className="font-semibold">{decision.title}</h3>
                  <p className="mt-1 leading-7 text-[var(--text-secondary)]">
                    {decision.explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <ListSection
            id="challenges"
            title="Challenges"
            values={item.challenges}
          />
          <ListSection id="outcomes" title="Outcomes" values={item.outcomes} />
          <ListSection
            id="lessons"
            title="Lessons learned"
            values={item.lessons}
          />
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
          {item.githubUrl ? (
            <ExternalLink href={item.githubUrl}>
              View GitHub repository
            </ExternalLink>
          ) : null}
          {item.liveUrl ? (
            <ExternalLink href={item.liveUrl}>
              View live application
            </ExternalLink>
          ) : null}
          {item.confidentialityNote ? (
            <p className="border-l-2 border-[var(--accent)] pl-4 text-sm leading-6 text-[var(--text-secondary)]">
              {item.confidentialityNote}
            </p>
          ) : null}
        </div>
      </SectionContainer>
    </article>
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
