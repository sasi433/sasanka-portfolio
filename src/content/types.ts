export type WorkType = "application" | "engineering-case-study";

export type WorkStatus =
  "complete" | "maintained" | "currently-building" | "archived";

export type WorkItem = {
  slug: string;
  title: string;
  shortTitle?: string;
  type: WorkType;
  status: WorkStatus;
  statusLabel?: string;
  featured: boolean;
  summary: string;
  context: string;
  problem: string;
  approach: string[];
  decisions: { title: string; explanation: string }[];
  challenges: string[];
  outcomes: string[];
  lessons: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  screenshots?: { src: string; alt: string; caption?: string }[];
  diagram?: { src: string; alt: string };
  confidentialityNote?: string;
};

export type ExperienceItem = {
  organisation: string;
  role: string;
  dates: string;
  context: string;
  contributions: string[];
  technologies: string[];
  relatedWorkSlugs: string[];
};

export type SkillGroup = {
  title: string;
  description?: string;
  skills: string[];
};

export type Interest = {
  title: string;
  description: string;
};
