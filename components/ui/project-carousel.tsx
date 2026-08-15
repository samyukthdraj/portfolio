import { ProjectMetrics } from "@/lib/types";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCarouselProps {
  projects: ProjectMetrics[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-12">
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-800/50 pb-8 last:border-0 last:pb-0">
          <div className="w-full md:w-1/3 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={project.screenshotPath} 
              alt={project.title} 
              className="w-full rounded-xl object-cover border border-slate-800 shadow-md"
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-4">
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl font-bold text-slate-100">{project.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  {project.statusTag}
                </span>
              </div>
              <p className="text-emerald-400 font-medium text-sm mt-1">{project.customerDetails}</p>
            </div>
            
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-900 text-slate-300 rounded-lg text-xs font-medium border border-slate-800">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors"
              >
                <span>View Live Project</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
