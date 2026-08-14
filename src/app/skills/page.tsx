import { PageIntro } from "@/components/content/page-intro";
import {
  MediaScrollStory,
  type MediaStoryItem,
} from "@/components/content/media-scroll-story";
import { skillGroups } from "@/content/skills";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Skills",
  "Engineering capabilities across programming, backend systems, DevOps, cloud-native delivery, operations and AI-assisted development.",
  "/skills",
);

export default function SkillsPage() {
  const skillScenes = skillGroups.map((group, index) => ({
    kicker: `Capability ${String(index + 1).padStart(2, "0")}`,
    title: group.title,
    description: group.description ?? "",
    image: group.image,
    badges: group.skills,
    placement: "top-left",
    tone: group.tone,
  })) satisfies readonly MediaStoryItem[];

  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Skills"
        title="Capabilities connected across the delivery lifecycle."
        description="A practical view of the technologies and engineering disciplines I use, with portfolio-demonstrated frontend tools labelled separately from professional experience."
      />
      <MediaScrollStory
        id="skills-story"
        label="Engineering skills"
        items={skillScenes}
        className="media-scroll-story--skills"
      />
    </div>
  );
}
