import { ProjectMetrics } from "@/lib/types";
import { TerminalWrapper } from "../ui/terminal-wrapper";
import { EmptyState } from "../ui/empty-state";
import Image from "next/image";
import { ExternalLink, Layers, Landmark, Users } from "lucide-react";

export function StackPilotPanel({ data }: { data?: ProjectMetrics }) {
  if (!data) return <EmptyState title="STACKPILOT" />;

  const screenshot = data.screenshotPath;

  return (
    <TerminalWrapper title="personal_project.01_StackPilot" className="col-span-full">
      <div className="flex flex-col h-full space-y-4 justify-between">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-500 font-mono">AI_CAREER_RESOURCE_PLANNER</span>
              <h2 className="text-xl font-bold text-slate-100 mt-0.5">{data.title}</h2>
            </div>
            {data.liveLink && (
              <a 
                href={data.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {screenshot && (
            <div className="relative w-full aspect-video rounded-md overflow-hidden border border-slate-800 bg-slate-950/40">
              <Image 
                src={screenshot} 
                alt={`${data.title} Preview`}
                fill
                className="object-contain p-1.5 opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          )}

          <p className="text-xs text-slate-400 leading-relaxed">{data.description}</p>
        </div>

        {data.performance && (data.performance.users || data.performance.uptime) && (
          <div className="grid grid-cols-2 gap-2 py-2 border-t border-slate-900 text-[10px] text-slate-400 font-mono">
            {data.performance.users && (
              <div className="flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Users: {data.performance.users}</span>
              </div>
            )}
            {data.performance.uptime && (
              <div className="flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Uptime: {data.performance.uptime}</span>
              </div>
            )}
          </div>
        )}

        {data.customerDetails && (
          <div className="flex items-center space-x-2 py-2 border-t border-slate-900 text-xs text-slate-400 font-mono">
            <Landmark className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Client: {data.customerDetails}</span>
          </div>
        )}

        <div className="space-y-2 mt-auto pt-4 border-t border-slate-900">
          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tech Stack Details</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {data.techStack.map((tech, i) => (
              <span key={i} className="text-[9px] text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TerminalWrapper>
  );
}
