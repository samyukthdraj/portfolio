import { redis } from "@/lib/upstash";
import { PortfolioData } from "@/lib/types";
import { projectsData } from "@/lib/data";
import { FaFileAlt, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiGit,
  SiMongodb,
  SiNodedotjs,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { PortfolioTabs } from "@/components/portfolio-tabs";
import Link from "next/link";
import Image from "next/image";
import { FaGlobe } from "react-icons/fa";

export const revalidate = 0;

export default async function DashboardPage() {
  let data: PortfolioData | null = null;

  try {
    data = await redis.get<PortfolioData>("portfolio_data");
  } catch (e) {
    console.error("Redis fetch failed:", e);
  }

  const defaultData: PortfolioData =
    data && data.hero && data.milestones && data.projects
      ? data
      : {
          hero: {
            title: "Samyukth Dharmarajan",
            subtitle: "ASSOCIATE SOFTWARE ENGINEER",
            description: "",
          },
          milestones: [
            {
              year: "Aug 2024 – Present",
              title: "Associate Software Engineer",
              company: "Terawe Corporation (Microsoft Vendor)",
              desc: "Architected reusable component libraries using atomic design. Resolved client-side bottlenecks on 50k-item payloads using DOM virtualization. Engineered WCAG 2.1 AA accessibility standards.",
              iconType: "work",
              imagePath: "/images/terawe_logo.png",
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
              ],
            },
            {
              year: "Sept 2024",
              title:
                "Certification: Microsoft Certified: Azure Administrator Associate (AZ-104)",
              company: "Microsoft Certification",
              desc: "Achieved AZ-104 certification for managing cloud resources, storage, virtual networks, and CI/CD integrations.",
              iconType: "certification",
              imagePath: "/images/az-104.png",
            },
            {
              year: "June 2020 – July 2024",
              title: "B.Tech in Computer Science",
              company: "APJ Abdul Kalam Technological University",
              desc: "Graduated with honors in Computer Science from Kochi, India, securing a CGPA of 7.46/10.",
              iconType: "education",
              imagePath: "/images/ktu_logo.jpg",
              subMilestones: [
                {
                  year: "April 2023 – June 2023",
                  title: "Web Development Intern",
                  company: "Acmegrade",
                  desc: "Built responsive user interfaces using React. Implemented state management with Redux Toolkit. Developed backend systems using Node.js and MongoDB.",
                  type: "internship",
                },
              ],
            },
          ],
          projects: [],
        };

  return (
    <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full space-y-16">
      {/* Intro Section */}
      <section className="space-y-6 pt-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Hi! I&apos;m Samyukth Dharmarajan.
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
          24 year old associate software engineer passionate about Frontend
          engineering from India.
        </p>

        {/* Links */}
        <div className="flex items-center space-x-6 pt-2">
          <a
            href="#"
            target="_blank"
            className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
          >
            <FaFileAlt className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/samyukth-dharmarajan"
            target="_blank"
            className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/samyukthdraj"
            target="_blank"
            className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="mailto:drajsamyukth@gmail.com"
            target="_blank"
            className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm"
          >
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Current Technologies */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Current Technologies
          </h2>
          <p className="text-slate-400 mt-1 text-sm md:text-base">
            I&apos;m proficient in a range of modern technologies that excites
            me.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiNextdotjs className="w-5 h-5 text-white" />
            <span className="font-medium text-slate-200">Next.js</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiReact className="w-5 h-5 text-sky-400" />
            <span className="font-medium text-slate-200">React</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiTailwindcss className="w-5 h-5 text-sky-300" />
            <span className="font-medium text-slate-200">Tailwind</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiTypescript className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-slate-200">Typescript</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiGit className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-slate-200">Git</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiMongodb className="w-5 h-5 text-green-500" />
            <span className="font-medium text-slate-200">MongoDB</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <VscAzure className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-slate-200">Azure</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiNodedotjs className="w-5 h-5 text-green-600" />
            <span className="font-medium text-slate-200">Node.js</span>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section>
        <PortfolioTabs data={defaultData} />
      </section>

      {/* Highlight Projects Section */}
      <section className="space-y-8 pt-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-slate-400 mt-1 text-sm md:text-base">
            Some of my recent highlighted work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.slice(0, 2).map((project) => (
            <div
              key={project.id}
              className="flex flex-col bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-slate-700"
            >
              <div className="w-full aspect-4/3 bg-slate-900 relative p-6 flex items-center justify-center">
                {project.screenshotPath ? (
                  <Image
                    src={project.screenshotPath}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-slate-600 font-bold text-2xl">
                    {project.title}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-100 mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-auto">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-slate-950 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                  >
                    <FaGlobe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                  {project.sourceLink && (
                    <a
                      href={project.sourceLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-slate-950 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Link
            href="/projects"
            className="px-8 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors"
          >
            View More Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
