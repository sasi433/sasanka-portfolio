import { PageIntro } from "@/components/content/page-intro";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/ui/section-container";
import { skillGroups } from "@/content/skills";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Skills",
  "Engineering capabilities across programming, backend systems, DevOps, cloud-native delivery, operations and AI-assisted development.",
  "/skills",
);

export default function SkillsPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Skills"
        title="Capabilities connected across the delivery lifecycle."
        description="A practical view of the technologies and engineering disciplines I use, with portfolio-demonstrated frontend tools labelled separately from professional experience."
      />
      <div className="pb-10">
        {skillGroups.map((group, index) => {
          const id = `skills-${index + 1}`;
          return (
            <SectionContainer
              id={id}
              routeLabel={group.title}
              className="skill-station pb-16 sm:pb-20"
              key={group.title}
            >
              <div className="skill-station-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="skill-station-content">
                <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                  {group.title}
                </h2>
                {group.description ? (
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                    {group.description}
                  </p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} aria-label={`${group.title}: ${skill}`}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </SectionContainer>
          );
        })}
      </div>
    </div>
  );
}
