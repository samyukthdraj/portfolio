import { Milestone } from "@/lib/types";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import Image from "next/image";

interface StatusPanelProps {
  milestones?: Milestone[];
}

export function StatusPanel({ milestones = [] }: StatusPanelProps) {
  if (milestones.length === 0) return null;

  return (
    <div className="space-y-0">
      {milestones.map((item, index) => {
        const isCert =
          item.iconType === "certification" ||
          item.title.toLowerCase().includes("certification");
        const Icon = isCert
          ? Award
          : item.iconType === "education"
            ? GraduationCap
            : Briefcase;
        const isLast = index === milestones.length - 1;

        return (
          <div key={index} className="flex gap-4 relative pb-8">
            {/* Left Timeline Line & Icon */}
            <div className="shrink-0 flex flex-col items-center z-10">
              <div className="w-14 h-14 rounded-full border border-slate-700 bg-white flex items-center justify-center text-slate-300 overflow-hidden relative">
                {item.imagePath ? (
                  <Image
                    src={item.imagePath}
                    alt={item.company}
                    fill
                    className={`object-cover ${
                      item.imagePath.includes("ktu_logo")
                        ? "scale-[1.45]"
                        : item.imagePath.includes("az-104")
                          ? "scale-[0.99]"
                          : "scale-110"
                    }`}
                  />
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                )}
              </div>
              {/* Timeline connecting line */}
              {!isLast && (
                <div className="w-px h-[calc(100%-66px)] bg-slate-800 mt-2 absolute top-14 left-7"></div>
              )}
            </div>

            {/* Right Content */}
            <div className="flex-1 pb-2 min-w-0">
              {/* Company / Title header */}
              <h3 className="text-[17px] font-bold text-slate-100 break-words">
                {item.company}
              </h3>

              {/* Main Role & Date */}
              <div className="flex flex-col sm:flex-row justify-between items-start mt-0.5 mb-2 gap-1 sm:gap-4">
                <span className="text-[15px] font-medium text-slate-300 break-words">
                  {item.title}
                </span>
                <span className="text-[13px] font-medium text-slate-400 whitespace-nowrap sm:pl-4">
                  {item.year}
                </span>
              </div>

              {/* Main Desc Bullet Points */}
              <ul className="list-outside ml-4 list-disc text-[14px] text-slate-300 space-y-1.5 leading-relaxed marker:text-slate-500">
                {item.desc
                  .split(/(?<=\.)\s+/)
                  .filter(Boolean)
                  .map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
              </ul>

              {/* Sub roles */}
              {item.subMilestones && item.subMilestones.length > 0 && (
                <div className="mt-5 space-y-5">
                  {item.subMilestones.map((sub, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-1 sm:gap-4">
                        <span className="text-[15px] font-medium text-slate-300 break-words">
                          {sub.title}
                        </span>
                        <span className="text-[13px] font-medium text-slate-400 whitespace-nowrap sm:pl-4">
                          {sub.year}
                        </span>
                      </div>
                      <ul className="list-outside ml-4 list-disc text-[14px] text-slate-300 space-y-1.5 leading-relaxed marker:text-slate-500">
                        {sub.desc
                          .split(/(?<=\.)\s+/)
                          .filter(Boolean)
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
