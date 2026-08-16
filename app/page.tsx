import { redis } from "@/lib/upstash";
import { PortfolioData } from "@/lib/types";
import { projectsData, defaultPortfolioData } from "@/lib/data";
import { FaFileAlt, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiGit,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiJest,
  SiDocker,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { PortfolioTabs } from "@/components/portfolio-tabs";
import Link from "next/link";
import Image from "next/image";
import { FaGlobe, FaWpforms } from "react-icons/fa";

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
      : defaultPortfolioData;

  return (
    <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full space-y-16">
      {/* Intro Section */}
      <section className="space-y-6 pt-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          {defaultData.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed whitespace-pre-wrap">
          {defaultData.hero.description}
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="/resume/Samyukth_Dharmarajan_FrontEnd.pdf"
            target="_blank"
            className="hero-social-btn flex items-center space-x-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm font-medium"
            aria-label="View Resume"
          >
            <FaFileAlt className="w-4 h-4" />
            <span>Resume</span>
          </a>
          <a
            href="https://linkedin.com/in/samyukth-dharmarajan"
            target="_blank"
            className="hero-social-btn flex items-center space-x-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm font-medium"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/samyukthdraj"
            target="_blank"
            className="hero-social-btn flex items-center space-x-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm font-medium"
            aria-label="Github Profile"
          >
            <FaGithub className="w-4 h-4" />
            <span>Github</span>
          </a>
          <a
            href="mailto:drajsamyukth@gmail.com"
            target="_blank"
            className="hero-social-btn flex items-center space-x-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm font-medium"
            aria-label="Email Me"
          >
            <FaEnvelope className="w-4 h-4" />
            <span>Email</span>
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
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiNextdotjs className="w-5 h-5 text-white" />
            <span className="font-medium text-slate-200">Next.js</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiReact className="w-5 h-5 text-sky-400" />
            <span className="font-medium text-slate-200">React</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiTailwindcss className="w-5 h-5 text-sky-300" />
            <span className="font-medium text-slate-200">Tailwind</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiTypescript className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-slate-200">Typescript</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiGit className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-slate-200">Git</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiMongodb className="w-5 h-5 text-green-500" />
            <span className="font-medium text-slate-200">MongoDB</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <VscAzure className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-slate-200">Azure</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiNodedotjs className="w-5 h-5 text-green-600" />
            <span className="font-medium text-slate-200">Node.js</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiPython className="w-5 h-5 text-yellow-500" />
            <span className="font-medium text-slate-200">Python</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiJest className="w-5 h-5 text-red-500" />
            <span className="font-medium text-slate-200">Jest</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiDocker className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-slate-200">Docker</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiVercel className="w-5 h-5 text-white" />
            <span className="font-medium text-slate-200">Vercel</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <SiRender className="w-5 h-5 text-slate-300" />
            <span className="font-medium text-slate-200">Render</span>
          </div>
          <div className="tech-btn flex items-center space-x-2 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm transition-transform hover:scale-105">
            <FaWpforms className="w-5 h-5 text-indigo-400" />
            <span className="font-medium text-slate-200">Web3Forms</span>
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
                    className="project-action-btn border border-transparent inline-flex items-center space-x-2 px-4 py-2 bg-white text-slate-950 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                  >
                    <FaGlobe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                  {project.sourceLink && (
                    <a
                      href={project.sourceLink}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action-btn border border-transparent inline-flex items-center space-x-2 px-4 py-2 bg-white text-slate-950 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
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
            className="view-more-btn flex items-center justify-center space-x-2 px-8 py-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-sm font-bold text-lg"
          >
            View More Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
