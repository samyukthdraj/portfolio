export interface SubMilestone {
  year: string;
  title: string;
  company: string;
  desc: string;
  type?: "certification" | "internship" | "other";
}

export interface Milestone {
  year: string;
  title: string;
  company: string;
  desc: string;
  iconType: "work" | "education" | "award" | "other";
  subMilestones?: SubMilestone[];
}

export interface ProjectMetrics {
  id: string;
  title: string;
  description: string;
  customerDetails?: string;
  techStack: string[];
  liveLink: string;
  statusTag: "Live" | "Development" | "Beta";
  projectType: "enterprise" | "personal";
  screenshotPath?: string;
  performance: {
    users?: string;
    concurrency?: string;
    uptime?: string;
  };
}

export interface PortfolioData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  milestones: Milestone[];
  projects: ProjectMetrics[];
}
