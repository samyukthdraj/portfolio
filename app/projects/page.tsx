import { projectsData } from "@/lib/data";
import { FaGlobe, FaGithub } from "react-icons/fa";
import Image from "next/image";

const ProjectGrid = ({ projects }: { projects: typeof projectsData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.map((project) => (
      <div key={project.id} className="flex flex-col bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-slate-700">
        {/* Image Section */}
        <div className="w-full aspect-4/3 bg-slate-900 relative p-6 flex items-center justify-center">
          {project.screenshotPath ? (
              <Image 
                src={project.screenshotPath} 
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-slate-600 font-bold text-2xl">{project.title}</div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-2xl font-bold text-slate-100 mb-3">{project.title}</h3>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-6 flex-1">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-900 text-slate-300 rounded-lg text-xs font-semibold border border-slate-800">
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-auto">
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-slate-950 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                >
                  <FaGlobe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
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
  );

export default function ProjectsPage() {
  const personalProjects = projectsData.filter((p) => p.projectType === "personal");
  const workProjects = projectsData.filter((p) => p.projectType === "enterprise");

  return (
    <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full space-y-16">
      <section>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
          My Projects.
        </h1>
        <p className="text-lg text-slate-400 mb-10">A showcase of my recent work and personal experiments.</p>
        
        <div className="space-y-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Personal Projects
            </h2>
            <ProjectGrid projects={personalProjects} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Work Related Projects
            </h2>
            <ProjectGrid projects={workProjects} />
          </div>
        </div>
      </section>
    </main>
  );
}
