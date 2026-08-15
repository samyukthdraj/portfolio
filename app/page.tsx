import { redis } from "@/lib/upstash";
import { PortfolioData } from "@/lib/types";
import { HeroPanel } from "@/components/bento/hero-panel";
import { StatusPanel } from "@/components/bento/status-panel";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ProjectCarousel } from "@/components/ui/project-carousel";

export const revalidate = 0; // Dynamic route to always fetch latest

export default async function DashboardPage() {
  let data: PortfolioData | null = null;

  try {
    data = await redis.get<PortfolioData>("portfolio_data");
  } catch (e) {
    console.error("Redis fetch failed:", e);
  }

  // Fallback defaults if Redis is empty or missing keys
  const defaultData: PortfolioData =
    data && data.hero && data.milestones && data.projects
      ? data
      : {
          hero: {
            title: "Samyukth Dharmarajan",
            subtitle: "ASSOCIATE SOFTWARE ENGINEER",
            description:
              "Expert software architect specialized in constructing ultra-high-performance web platforms using React 19, Next.js, and TypeScript. Experienced in designing secure multi-tenant architectures, edge-routed API interfaces, state synchronization layers, and zero-CLS page hydration mechanics. Associate software engineer with nearly 2 years of experience engineering accessible and high-performance enterprise web applications.",
          },
          milestones: [
            {
              year: "Aug 2024 – Present",
              title: "Associate Software Engineer",
              company: "Terawe Corporation (Microsoft Vendor)",
              desc: "Architected reusable component libraries using atomic design, resolved client-side bottlenecks on 50k-item payloads using DOM virtualization, and engineered WCAG 2.1 AA accessibility standards.",
              iconType: "work",
              subMilestones: [
                {
                  year: "March 2026",
                  title: "WCAG 2.1 AA Accessibility",
                  company: "Terawe Corp",
                  desc: "Engineered full screen reader and keyboard navigability, reducing user support tickets by 15%.",
                  type: "other",
                },
                {
                  year: "April 2025",
                  title: "50k JSON DOM Virtualization",
                  company: "Terawe Corp",
                  desc: "Optimized dataset rendering using windowing and useMemo, restoring frame rates from 12 FPS to 60 FPS.",
                  type: "other",
                },
                {
                  year: "Nov 2024",
                  title: "Atomic Design Library",
                  company: "Terawe Corp",
                  desc: "Unified UI architecture across 3 internal product teams, accelerating feature delivery by 20%.",
                  type: "other",
                },
                {
                  year: "Sept 2024",
                  title:
                    "Microsoft Certified: Azure Administrator Associate (AZ-104)",
                  company: "Microsoft Certification",
                  desc: "Achieved AZ-104 certification for managing cloud resources, storage, virtual networks, and CI/CD integrations.",
                  type: "certification",
                },
              ],
            },
            {
              year: "June 2020 – July 2024",
              title: "B.Tech in Computer Science",
              company: "APJ Abdul Kalam Technological University",
              desc: "Graduated with honors in Computer Science from Kochi, India, securing a CGPA of 7.46/10.",
              iconType: "education",
              subMilestones: [
                {
                  year: "April 2023 – June 2023",
                  title: "Web Development Intern",
                  company: "Acmegrade",
                  desc: "Built responsive user interfaces using React, implemented state management with Redux Toolkit, and developed backend systems using Node.js and MongoDB.",
                  type: "internship",
                },
              ],
            },
          ],
          projects: [
            {
              id: "skillup2",
              title: "SkillUp 2.0",
              description:
                "SkillUp 2.0 is an enterprise-grade Gen AI educational learning management platform configured with 5 distinct user personas (student, author, reviewer, institution admin, and skillup admin). Built to support robust certification path tracking, it integrates secure Credly badge verifications and detailed progress visualization dashboards. The platform was thoroughly and rigorously tested in staging and production deployment cycles for over 1 year to ensure high availability and zero layout shifts. Re-engineered dynamic Redux Toolkit state synchronization across browser contexts, integrated standard Ant Design layouts, and built Recharts progress metrics tracking. Scaled platform infrastructure to manage 10,000+ registered users and 1,200 concurrent user sessions with secure Google/GitHub OAuth 2.0 gates, and PostgreSQL data persistence utilizing Prisma ORM.",
              customerDetails: "Vollee AI Internal / Consumer",
              techStack: [
                "Next.js 14",
                "React 18",
                "Redux Toolkit",
                "Ant Design",
                "Recharts",
                "OpenAI GPT-4o",
                "PostgreSQL",
                "Prisma ORM",
                "OAuth 2.0",
                "Tailwind CSS",
                "TypeScript",
              ],
              liveLink: "https://skillup.vollee.ai",
              statusTag: "Live",
              projectType: "enterprise",
              screenshotPath: "/images/skillup_2.0_landing.png",
              performance: {
                users: "10k+",
                concurrency: "1.2k",
                uptime: "99.9%",
              },
            },
            {
              id: "skillupEdis",
              title: "Ignite EdIs C2k",
              description:
                "Ignite EdIs C2k is an enterprise learning management and licensing platform engineered for the Education Authority of Northern Ireland. Built to manage mandatory compliance and teacher certification, the platform features a custom checkpoint-gated Vidstack player that prevents user skipping and tracks detailed training logs. It integrates secure SAML/OAuth 2.0 SSO and Azure AD Multi-Factor Authentication (MFA) for 24,000 active educators across the region with an Azure Redis caching layer handling up to 5,000 concurrent teachers. Automated Azure Web App backups secure critical user states. Includes document views for Ethics & Guidance/Training Resources, upcoming events feeds, recommended video lists, and checkpoint assessments.",
              customerDetails: "Education Authority of Northern Ireland",
              techStack: [
                "React 19",
                "Next.js 16",
                "Vidstack Player",
                "Azure Web Apps",
                "Azure Redis",
                "SQL Server",
                "OAuth 2.0 / SAML SSO",
                "Azure AD MFA",
                "Tailwind CSS v4",
                "TypeScript",
              ],
              liveLink: "https://skillup-edis.azurewebsites.net/",
              statusTag: "Live",
              projectType: "enterprise",
              screenshotPath: "/images/ignite_edis_c2k_landing.png",
              performance: {
                users: "24k",
                concurrency: "5k",
                uptime: "99.95%",
              },
            },
            {
              id: "stackpilot",
              title: "StackPilot",
              description:
                "StackPilot is an intelligent career transition and developer resource planning platform designed to parse uploaded resumes, track compatibility scores, and suggest relevant high-matching software job roles. Built with a NestJS backend and SQLite database persistence via Prisma, the platform connects to multiple third-party resume analysis and job listing APIs. To ensure production-grade reliability, it implements a custom backup and fallback API router mechanism that dynamically switches providers if primary services rate-limit or fail. The frontend features custom Next.js 16 and React 19 router layers, state synchronization via Zustand/TanStack Query, Radix UI primitives, and secure OAuth 2.0 authentication flows.",
              customerDetails: "Open Source / Developer Tooling",
              techStack: [
                "NestJS",
                "React 19",
                "Next.js 16",
                "Zustand",
                "TanStack Query",
                "Radix UI",
                "SQLite",
                "Prisma ORM",
                "OAuth 2.0",
                "Tailwind CSS",
                "TypeScript",
              ],
              liveLink: "https://stackpilot-jext.onrender.com/",
              statusTag: "Development",
              projectType: "personal",
              screenshotPath: "/images/stackpilot_landing.png",
              performance: {
                users: "500+",
                concurrency: "50+",
                uptime: "99.9%",
              },
            },
          ],
        };

  // Filter projects by type
  const enterpriseProjects = defaultData.projects.filter(
    (p) =>
      p.projectType === "enterprise" ||
      p.id === "skillup2" ||
      p.id === "skillupEdis",
  );

  const personalProjects = defaultData.projects.filter(
    (p) => p.projectType === "personal" || p.id === "stackpilot",
  );

  return (
    <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Profile Row: Profile + Journey timeline in the same row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ErrorBoundary fallbackTitle="PROFILE.INIT">
          <HeroPanel
            title={defaultData.hero.title}
            subtitle={defaultData.hero.subtitle}
            description={defaultData.hero.description}
          />
        </ErrorBoundary>

        <ErrorBoundary fallbackTitle="JOURNEY.LOG">
          <StatusPanel milestones={defaultData.milestones} />
        </ErrorBoundary>
      </div>

      {/* Enterprise Grade Projects Section */}
      <div className="space-y-6">
        <div className="border-t border-slate-900 pt-8 mt-4">
          <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">
            {"// ENTERPRISE_GRADE_PROJECTS"}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mt-1">
            ENTERPRISE GRADE PROJECTS
          </h2>
        </div>

        <ErrorBoundary fallbackTitle="ENTERPRISE_CAROUSEL">
          <ProjectCarousel projects={enterpriseProjects} />
        </ErrorBoundary>
      </div>

      {/* Personal Projects Section */}
      <div className="space-y-6">
        <div className="border-t border-slate-900 pt-8 mt-4">
          <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">
            {"// PERSONAL_PROJECTS"}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mt-1">
            PERSONAL PROJECTS
          </h2>
        </div>

        <ErrorBoundary fallbackTitle="PERSONAL_CAROUSEL">
          <ProjectCarousel projects={personalProjects} />
        </ErrorBoundary>
      </div>
    </main>
  );
}
