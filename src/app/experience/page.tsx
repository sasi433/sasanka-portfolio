import Link from "next/link";
import { PageIntro } from "@/components/content/page-intro";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { experienceItems } from "@/content/experience";
import { getWorkItem } from "@/content/work";

export default function ExperiencePage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Experience"
        title="Systems foundations to cloud-native delivery."
        description="A career built by expanding from C/C++ and Linux telecom engineering into Python, shared backend capabilities, CI/CD and cloud-native delivery."
      />
      <SectionContainer className="space-y-6 pb-20 sm:pb-24">
        {experienceItems.map((item) => (
          <Card key={`${item.organisation}-${item.role}`}>
            <p className="font-mono text-xs text-[var(--accent-emphasis)] uppercase">
              {item.dates}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">{item.organisation}</h2>
            <p className="mt-1 font-medium text-[var(--text-secondary)]">
              {item.role}
            </p>
            <p className="mt-5 max-w-3xl leading-7 text-[var(--text-secondary)]">
              {item.context}
            </p>
            <ul className="mt-5 max-w-4xl list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
              {item.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.technologies.map((technology) => (
                <Badge key={technology}>{technology}</Badge>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {item.relatedWorkSlugs.map((slug) => {
                const work = getWorkItem(slug);
                return work ? (
                  <Link
                    className="font-semibold text-[var(--accent-emphasis)] underline underline-offset-4"
                    href={`/work/${slug}`}
                    key={slug}
                  >
                    {work.shortTitle ?? work.title}
                  </Link>
                ) : null;
              })}
            </div>
          </Card>
        ))}
      </SectionContainer>
    </div>
  );
}
