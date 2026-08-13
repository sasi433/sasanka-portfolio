import Link from "next/link";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/content/page-intro";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/ui/section-container";
import { experienceItems } from "@/content/experience";
import { getWorkItem } from "@/content/work";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Experience",
  "Professional experience across Django backend development, Linux telecom systems, Python engineering, CI/CD and cloud-native delivery.",
  "/experience",
);

export default function ExperiencePage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Experience"
        title="Backend foundations to cloud-native delivery."
        description="A career built by expanding from Python and Django product development through C/C++ telecom systems into reusable Python capabilities, CI/CD and cloud-native delivery."
      />

      {experienceItems.map((item, index) => {
        const id = item.organisation.toLowerCase().replaceAll(" ", "-");
        return (
          <SectionContainer
            id={id}
            className="experience-stage pb-20 sm:pb-28"
            key={`${item.organisation}-${item.role}`}
          >
            <div className="experience-stage-index" aria-hidden="true">
              {String(experienceItems.length - index).padStart(2, "0")}
            </div>
            <article className="experience-panel">
              <header className="experience-panel-header">
                <div>
                  <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent-emphasis)] uppercase">
                    {item.dates}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                    {item.organisation}
                  </h2>
                  <p className="mt-2 font-medium text-[var(--text-secondary)]">
                    {item.role}
                  </p>
                  {item.location ? (
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <MapPin aria-hidden="true" className="size-4" />
                      {item.location}
                    </p>
                  ) : null}
                </div>
                <Building2
                  aria-hidden="true"
                  className="size-8 text-[var(--accent-emphasis)]"
                />
              </header>
              <p className="mt-8 max-w-3xl leading-7 text-[var(--text-secondary)]">
                {item.context}
              </p>
              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.42fr)]">
                <div>
                  <p className="font-mono text-xs tracking-[0.12em] text-[var(--text-secondary)] uppercase">
                    Selected contributions
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {item.contributions.map((contribution) => (
                      <li
                        key={contribution}
                        className="grid grid-cols-[0.55rem_1fr] gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.65rem] size-1.5 rounded-full bg-[var(--accent-emphasis)]"
                        />
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
                <aside>
                  <p className="font-mono text-xs tracking-[0.12em] text-[var(--text-secondary)] uppercase">
                    Engineering context
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((technology) => (
                      <Badge key={technology}>{technology}</Badge>
                    ))}
                  </div>
                </aside>
              </div>
              {item.relatedWorkSlugs.length ? (
                <div className="mt-8 border-t border-[var(--border)] pt-6">
                  <p className="font-mono text-xs tracking-[0.12em] text-[var(--text-secondary)] uppercase">
                    Related case studies
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                    {item.relatedWorkSlugs.map((slug) => {
                      const work = getWorkItem(slug);
                      return work ? (
                        <Link
                          className="font-semibold text-[var(--accent-emphasis)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent-emphasis)]"
                          href={`/work/${slug}`}
                          key={slug}
                        >
                          {work.shortTitle ?? work.title}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              ) : null}
            </article>
          </SectionContainer>
        );
      })}

      <SectionContainer id="secure-development" className="pb-20 sm:pb-24">
        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-6 sm:p-8">
          <ShieldCheck
            aria-hidden="true"
            className="size-6 text-[var(--accent-emphasis)]"
          />
          <Badge className="mt-5">Secure engineering highlight</Badge>
          <h2 className="mt-4 text-xl font-semibold">
            Supported Secure Development Awareness as the Team&apos;s Security
            Master
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
            A supporting team responsibility focused on secure-development
            awareness—not a dedicated security engineering or leadership role.
          </p>
        </aside>
      </SectionContainer>
    </div>
  );
}
