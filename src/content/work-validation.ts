import type { WorkItem, WorkMedia } from "@/content/types";

function readUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

function validateMedia(
  issues: string[],
  slug: string,
  label: string,
  media: WorkMedia,
) {
  if (!media.src.startsWith(`/images/projects/${slug}/`)) {
    issues.push(`${slug}: ${label} must use its project asset directory`);
  }

  if (!media.alt.trim()) {
    issues.push(`${slug}: ${label} requires alt text`);
  }
}

export function getWorkContentIssues(items: readonly WorkItem[]) {
  const issues: string[] = [];
  const slugs = new Set<string>();

  for (const item of items) {
    if (slugs.has(item.slug)) {
      issues.push(`${item.slug}: duplicate slug`);
    }
    slugs.add(item.slug);

    if (!item.category) {
      issues.push(`${item.slug}: category is required`);
    }

    if (!item.executionModel) {
      issues.push(`${item.slug}: execution model is required`);
    }

    const requiredCollections = [
      ["approach", item.approach],
      ["decisions", item.decisions],
      ["challenges", item.challenges],
      ["outcomes", item.outcomes],
      ["lessons", item.lessons],
      ["technologies", item.technologies],
    ] as const;

    for (const [label, values] of requiredCollections) {
      if (values.length === 0) {
        issues.push(`${item.slug}: ${label} must not be empty`);
      }
    }

    if (item.githubUrl) {
      const githubUrl = readUrl(item.githubUrl);
      if (
        githubUrl?.protocol !== "https:" ||
        githubUrl.hostname !== "github.com"
      ) {
        issues.push(`${item.slug}: GitHub URL must use https://github.com`);
      }
    }

    if (item.liveUrl && item.executionModel !== "live-web-application") {
      issues.push(
        `${item.slug}: live URL requires the live-web-application execution model`,
      );
    }

    if (item.liveUrl) {
      const liveUrl = readUrl(item.liveUrl);
      if (liveUrl?.protocol !== "https:") {
        issues.push(`${item.slug}: live URL must use HTTPS`);
      }
    }

    if (item.release) {
      if (!item.release.label.trim()) {
        issues.push(`${item.slug}: release label must not be empty`);
      }

      if (item.release.url) {
        const releaseUrl = readUrl(item.release.url);
        if (
          releaseUrl?.protocol !== "https:" ||
          releaseUrl.hostname !== "github.com" ||
          !releaseUrl.pathname.includes("/releases/tag/")
        ) {
          issues.push(
            `${item.slug}: release URL must target a GitHub release tag`,
          );
        }
      }
    }

    if (item.heroImage) {
      validateMedia(issues, item.slug, "hero image", item.heroImage);
    }

    item.screenshots?.forEach((screenshot, index) => {
      validateMedia(issues, item.slug, `screenshot ${index + 1}`, screenshot);
    });

    if (item.detailSections) {
      const sectionIds = new Set<string>();
      for (const section of item.detailSections) {
        if (sectionIds.has(section.id)) {
          issues.push(
            `${item.slug}: duplicate detail section id ${section.id}`,
          );
        }
        sectionIds.add(section.id);

        if (!section.id.trim() || !section.title.trim()) {
          issues.push(`${item.slug}: detail sections require an id and title`);
        }

        if (
          !section.body?.trim() &&
          !section.items?.some((value) => value.trim())
        ) {
          issues.push(
            `${item.slug}: detail section ${section.id} has no content`,
          );
        }
      }
    }
  }

  return issues;
}
