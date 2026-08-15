import { ProjectMetrics } from "@/lib/types";
import { TerminalWrapper } from "../ui/terminal-wrapper";
import { EmptyState } from "../ui/empty-state";
import Image from "next/image";
import { ExternalLink, Landmark } from "lucide-react";

export function SkillUpTwo({ data }: { data?: ProjectMetrics }) {
  if (!data) return <EmptyState title="SKILLUP_2.0" />;

  const screenshot = data.screenshotPath;

  return (
    <TerminalWrapper title="enterprise_project.02_SkillUp 2.0" className="col-span-full">
      <div className="flex flex-col h-full space-y-4 justify-between">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-500 font-mono">GEN_AI_EDTECH_PLATFORM</span>
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

        {data.customerDetails && (
          <div className="flex items-center space-x-2 py-2 border-t border-slate-900 text-xs text-slate-400 font-mono">
            <Landmark className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Client: {data.customerDetails}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-900">
          {data.techStack.map((tech, i) => (
            <span key={i} className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </TerminalWrapper>
  );
}
