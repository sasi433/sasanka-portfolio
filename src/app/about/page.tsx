import { PageIntro } from "@/components/content/page-intro";
import { Card } from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { interests } from "@/content/interests";

export default function AboutPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="About"
        title="Engineering depth, with an expanding scope."
        description="I am a senior software engineer with more than six years of experience across backend development, Linux-based systems, telecom software, automation, CI/CD and cloud-native delivery."
      />
      <SectionContainer className="pb-20 sm:pb-24">
        <div className="max-w-3xl space-y-5 text-base leading-7 text-[var(--text-secondary)]">
          <p>
            I built my foundations with C/C++ and Linux in performance-sensitive
            telecom systems, then broadened that work into Python, reusable
            backend capabilities, delivery automation, containers and platform
            tooling.
          </p>
          <p>
            I care about maintainable systems, useful developer tooling,
            reliability and using AI thoughtfully across implementation, testing
            and review.
          </p>
        </div>
        <h2 className="mt-14 text-2xl font-semibold">Beyond code</h2>
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
