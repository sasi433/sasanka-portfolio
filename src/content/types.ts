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
  location?: string;
  context: string;
  contributions: string[];
  technologies: string[];
  relatedWorkSlugs: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  location: string;
  dates: string;
  thesis: {
    title: string;
    description: string;
    technologies: string[];
  };
};

export type LanguageItem = {
  language: string;
  proficiency: string;
};

export type SkillVisual =
  | "programming"
  | "backend"
  | "delivery"
  | "quality"
  | "observability"
  | "web"
  | "ai";

export type SkillGroup = {
  title: string;
  description?: string;
  skills: string[];
  image: {
    src: string;
    alt: string;
    position?: string;
  };
  tone: "burgundy" | "blue" | "green" | "slate" | "amber";
  visual: SkillVisual;
};

export type Interest = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
  placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  tone?: "burgundy" | "blue" | "green" | "slate" | "amber";
};
