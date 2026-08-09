import { PageIntro } from "@/components/content/page-intro";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { skillGroups } from "@/content/skills";

export default function SkillsPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Skills"
        title="Capabilities grouped by engineering purpose."
        description="A practical view of the technologies and engineering disciplines I use, with portfolio-demonstrated frontend tools labelled separately from professional experience."
      />
      <SectionContainer className="pb-20 sm:pb-24">
        <div className="grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <Card key={group.title}>
              <h2 className="text-xl font-semibold">{group.title}</h2>
              {group.description ? (
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {group.description}
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
