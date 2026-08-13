import { GraduationCap, Languages, Route } from "lucide-react";
import { PageIntro } from "@/components/content/page-intro";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { educationItems, languageItems } from "@/content/education";
import { interests } from "@/content/interests";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "About",
  "How Sasanka Maddala expanded from signal processing and systems engineering into backend, DevOps and cloud-native delivery.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="About"
        title="Engineering depth, with an expanding scope."
        description="I am a senior software engineer with more than six years of experience across backend development, Linux-based systems, telecom software, automation, CI/CD and cloud-native delivery."
      />

      <SectionContainer id="engineering-story" className="pb-20 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="space-y-5 text-base leading-7 text-[var(--text-secondary)]">
            <p>
              I built my foundations in signal processing, C/C++ and Linux, then
              broadened that work into Python, reusable backend capabilities,
              delivery automation, containers and platform tooling.
            </p>
            <p>
              I care about maintainable systems, useful developer tooling,
              reliability and using AI thoughtfully across implementation,
              testing and review.
            </p>
            <p>
              That progression expands my engineering scope without leaving
              systems thinking behind. The same attention to failure modes,
              interfaces and operational evidence informs my backend and
              delivery work today.
            </p>
            <p>
              Side projects give me a practical space to deepen those skills by
              designing APIs, exercising incident scenarios, automating reports
              and evaluating newer AI-assisted workflows.
            </p>
          </div>
          <aside className="sticky top-28 h-fit rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-6">
            <Route
              aria-hidden="true"
              className="size-5 text-[var(--accent-emphasis)]"
            />
            <p className="mt-5 font-mono text-xs tracking-[0.12em] text-[var(--accent-emphasis)] uppercase">
              Engineering philosophy
            </p>
            <p className="mt-4 leading-7">
              Make ownership clear. Validate early. Design for investigation.
              Leave the next change easier than the last.
            </p>
          </aside>
        </div>
      </SectionContainer>

      <SectionContainer id="education" className="pb-20 sm:pb-24">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent-emphasis)] uppercase">
            Academic foundations
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
            Signal processing, communications and practical experimentation.
          </h2>
          <p className="mt-4 leading-7 text-[var(--text-secondary)]">
            Earlier academic projects underpin the systems thinking used in my
            professional engineering work. They are presented as thesis work,
            not current featured applications.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {educationItems.map((education) => (
            <article
              key={education.degree}
              className="academic-card group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
            >
              <GraduationCap
                aria-hidden="true"
                className="size-6 text-[var(--accent-emphasis)]"
              />
              <p className="mt-6 font-mono text-xs tracking-[0.1em] text-[var(--accent-emphasis)] uppercase">
                {education.dates} · {education.location}
              </p>
              <h3 className="mt-3 text-xl font-semibold">{education.degree}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {education.institution}
              </p>
              <div className="mt-7 border-t border-[var(--border)] pt-6">
                <p className="font-mono text-xs tracking-[0.1em] text-[var(--text-secondary)] uppercase">
                  Thesis
                </p>
                <h4 className="mt-2 text-lg font-semibold">
                  {education.thesis.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {education.thesis.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {education.thesis.technologies.map((technology) => (
                    <Badge key={technology}>{technology}</Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer id="languages" className="pb-20 sm:pb-24">
        <div className="flex items-center gap-3">
          <Languages
            aria-hidden="true"
            className="size-6 text-[var(--accent-emphasis)]"
          />
          <h2 className="text-2xl font-semibold">Languages</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {languageItems.map((item) => (
            <div
              key={item.language}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <h3 className="font-semibold">{item.language}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {item.proficiency}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer id="beyond-code" className="pb-20 sm:pb-24">
        <h2 className="text-2xl font-semibold">Beyond code</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest) => (
            <Card key={interest.title}>
              <h3 className="font-semibold">{interest.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {interest.description}
              </p>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
