import { Milestone } from "@/lib/types";
import { TerminalWrapper } from "../ui/terminal-wrapper";
import { Briefcase, GraduationCap, Award, Star } from "lucide-react";

interface StatusPanelProps {
  milestones?: Milestone[];
}

export function StatusPanel({ milestones = [] }: StatusPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return Briefcase;
      case "education":
        return GraduationCap;
      case "award":
        return Award;
      default:
        return Star;
    }
  };

  const defaultMilestones: Milestone[] = milestones.length > 0 ? milestones : [
    {
      year: "2024 - Present",
      title: "Senior Frontend Architect",
      company: "Vollee AI",
      desc: "Architected gated assessment players, migrated systems to Next.js 14/15, and scaled enterprise education platforms.",
      iconType: "work"
    },
    {
      year: "2023",
      title: "Ignite EdIs C2K Project Lead",
      company: "EA of Ireland / Vollee",
      desc: "Engineered SSO, MFA, Azure backups, scaling to 24k educators and 5k concurrency with Northern Ireland portal integration.",
      iconType: "work"
    },
    {
      year: "2022",
      title: "Full-Stack Engineer",
      company: "Freelance / Tech Startup",
      desc: "Designed Zustand and TanStack Query state patterns, integrated web APIs, and managed PostgreSQL databases.",
      iconType: "work"
    },
    {
      year: "2021",
      title: "B.S. Software Engineering",
      company: "University of Ireland",
      desc: "Graduated with honors. Focused on Distributed Systems and Frontend Architectures.",
      iconType: "education"
    }
  ];

  return (
    <TerminalWrapper title="JOURNEY.LOG" className="col-span-full lg:col-span-2 h-full">
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-900">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-mono text-slate-300">JOURNEY_TIMELINE</span>
        </div>
        
        {/* Added pl-4 to prevent cutting off absolute badges/borders */}
        <div className="flex-1 overflow-y-auto pl-4 pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          {defaultMilestones.map((item, index) => {
            const IconComponent = getIcon(item.iconType);
            return (
              <div key={index} className="relative pl-6 border-l border-slate-800 pb-4 last:pb-0">
                <div className="absolute left-[-9px] top-1 bg-slate-950 p-0.5 border border-slate-800 rounded-full flex items-center justify-center z-10">
                  <IconComponent className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-xs font-semibold text-slate-100">{item.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">{item.year}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">{item.company}</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  
                  {/* Nested Sub-branches */}
                  {item.subMilestones && item.subMilestones.length > 0 && (
                    <div className="mt-3 space-y-3 pl-4 relative">
                      {item.subMilestones.map((sub, sIdx) => (
                        <div key={sIdx} className="relative pl-0.5 pt-1">
                          {/* Horizontal connector line directly to the main timeline line */}
                          <div className="absolute left-[-40px] top-[11px] w-10 h-px border-t border-dashed border-slate-800" />
                          
                          <div className="flex flex-col">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[10px] font-medium text-slate-200 flex items-start gap-1.5">
                                {sub.type === "certification" ? (
                                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-[1px]" />
                                ) : sub.type === "internship" ? (
                                  <Briefcase className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-[1px]" />
                                ) : (
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-[5px]" />
                                )}
                                <span>{sub.title}</span>
                              </span>
                              <span className="text-[9px] text-slate-500 font-mono shrink-0 mt-[2px]">{sub.year}</span>
                            </div>
                            <span className="text-[9px] text-emerald-400 font-mono pl-5">{sub.company}</span>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed pl-5">{sub.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TerminalWrapper>
  );
}
