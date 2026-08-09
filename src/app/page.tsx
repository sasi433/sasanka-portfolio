import { ButtonLink } from "@/components/ui/button";
import { PageIntro } from "@/components/content/page-intro";
import { SectionContainer } from "@/components/ui/section-container";
import { WorkCard } from "@/components/work/work-card";
import { profile } from "@/content/profile";
import { workItems } from "@/content/work";

export default function Home() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Senior Software Engineer"
        title={profile.headline}
        description={profile.summary}
        actions={
          <>
            <ButtonLink href="/work">View My Work</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Me
            </ButtonLink>
          </>
        }
      />
      <SectionContainer
        aria-labelledby="selected-work"
        className="pb-20 sm:pb-24"
      >
        <h2
          id="selected-work"
          className="text-2xl font-semibold text-[var(--text-primary)]"
        >
          Selected work
        </h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {workItems
            .filter((item) => item.featured)
            .slice(0, 4)
            .map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
        </div>
      </SectionContainer>
    </div>
  );
}
