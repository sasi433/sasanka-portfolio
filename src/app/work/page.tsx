import { PageIntro } from "@/components/content/page-intro";
import { SectionContainer } from "@/components/ui/section-container";
import { WorkCard } from "@/components/work/work-card";
import { workItems } from "@/content/work";

export default function WorkPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Work"
        title="Applications and engineering evidence."
        description="A curated collection of public applications and sanitised professional case studies—focused on decisions, reliability and maintainability rather than vanity metrics."
      />
      <SectionContainer className="pb-20 sm:pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          {workItems.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
