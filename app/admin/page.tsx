"use client";

import { useEffect, useState, useTransition } from "react";
import { TerminalWrapper } from "@/components/ui/terminal-wrapper";
import { ProjectEditor } from "@/components/admin-ui/project-editor";
import { FontPicker } from "@/components/admin-ui/font-picker";
import { SizePicker } from "@/components/admin-ui/size-picker";
import { ColorPicker } from "@/components/admin-ui/color-picker";
import { getPortfolioData, updatePortfolioData } from "./actions";
import {
  PortfolioData,
  ProjectMetrics,
  Milestone,
  SubMilestone,
} from "@/lib/types";
import {
  Save,
  AlertTriangle,
  Plus,
  Trash2,
  Calendar,
  FileText,
  GitBranch,
} from "lucide-react";

const DEFAULT_DATA: PortfolioData = {
  hero: {
    title: "Samyukth Dharmarajan",
    subtitle: "ASSOCIATE SOFTWARE ENGINEER",
    description:
      "Expert software architect specialized in constructing ultra-high-performance web platforms using React 19, Next.js, and TypeScript.",
  },
  milestones: [],
  projects: [],
};

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getPortfolioData().then((res) => {
      setData(res.data || DEFAULT_DATA);
      setIsLoading(false);
    });
  }, []);

  const handleHeroChange = (
    field: "title" | "subtitle" | "description",
    value: string,
  ) => {
    if (!data) return;
    setData({ ...data, hero: { ...data.hero, [field]: value } });
  };

  // Milestone Helpers
  const handleMilestoneChange = <K extends keyof Milestone>(
    index: number,
    field: K,
    value: Milestone[K],
  ) => {
    if (!data) return;
    const newMilestones = [...data.milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setData({ ...data, milestones: newMilestones });
  };

  const handleSubMilestoneChange = (
    mIdx: number,
    sIdx: number,
    field: keyof SubMilestone,
    value: string,
  ) => {
    if (!data) return;
    const newMilestones = [...data.milestones];
    const newSubMilestones = [...(newMilestones[mIdx].subMilestones || [])];
    newSubMilestones[sIdx] = { ...newSubMilestones[sIdx], [field]: value };
    newMilestones[mIdx] = {
      ...newMilestones[mIdx],
      subMilestones: newSubMilestones,
    };
    setData({ ...data, milestones: newMilestones });
  };

  const addMilestone = () => {
    if (!data) return;
    const newMilestone: Milestone = {
      year: "2024",
      title: "New Position/Degree",
      company: "Company or School",
      desc: "Brief description of achievements.",
      iconType: "work",
      subMilestones: [],
    };
    setData({ ...data, milestones: [...data.milestones, newMilestone] });
  };

  const addSubMilestone = (mIdx: number) => {
    if (!data) return;
    const newMilestones = [...data.milestones];
    const newSubMilestones = [...(newMilestones[mIdx].subMilestones || [])];
    newSubMilestones.push({
      year: newMilestones[mIdx].year,
      title: "Sub-Internship / Freelance Role",
      company: "Company / Client",
      desc: "Brief description of role achievements.",
    });
    newMilestones[mIdx] = {
      ...newMilestones[mIdx],
      subMilestones: newSubMilestones,
    };
    setData({ ...data, milestones: newMilestones });
  };

  const deleteMilestone = (index: number) => {
    if (!data) return;
    const newMilestones = data.milestones.filter((_, i) => i !== index);
    setData({ ...data, milestones: newMilestones });
  };

  const deleteSubMilestone = (mIdx: number, sIdx: number) => {
    if (!data) return;
    const newMilestones = [...data.milestones];
    const newSubMilestones = (newMilestones[mIdx].subMilestones || []).filter(
      (_, i) => i !== sIdx,
    );
    newMilestones[mIdx] = {
      ...newMilestones[mIdx],
      subMilestones: newSubMilestones,
    };
    setData({ ...data, milestones: newMilestones });
  };

  // Project Helpers
  const handleProjectChange = (
    index: number,
    updatedProject: ProjectMetrics,
  ) => {
    if (!data) return;
    const newProjects = [...data.projects];
    newProjects[index] = updatedProject;
    setData({ ...data, projects: newProjects });
  };

  const addProject = () => {
    if (!data) return;
    const newProjId = `project_${Date.now()}`;
    const newProject: ProjectMetrics = {
      id: newProjId,
      title: "New Project",
      description: "Project description.",
      customerDetails: "Client / Customer",
      techStack: ["Next.js", "Tailwind"],
      liveLink: "",
      statusTag: "Development",
      projectType: "personal",
      screenshotPath: "/images/skillup_2.0_landing.png",
      performance: {
        users: "1k+",
        concurrency: "100+",
        uptime: "99.9%",
      },
    };
    setData({ ...data, projects: [...data.projects, newProject] });
  };

  const deleteProject = (index: number) => {
    if (!data) return;
    const newProjects = data.projects.filter((_, i) => i !== index);
    setData({ ...data, projects: newProjects });
  };

  const handleSave = () => {
    if (!data) return;
    startTransition(async () => {
      await updatePortfolioData(data);
      alert("SYS.UPDATE_SUCCESSFUL - Cache Revalidated");
    });
  };

  if (isLoading || !data)
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="animate-pulse text-emerald-400 font-mono">
          LOADING_SYS_DATA...
        </div>
      </div>
    );

  return (
    <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
      <div className="flex justify-between items-center bg-slate-900/80 p-4 border border-slate-800 rounded-lg">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-emerald-400" />
          <h1 className="text-xl font-bold tracking-tight text-slate-100">
            COMMAND_CENTER
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center space-x-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span className="font-mono text-sm">
            {isPending ? "COMMITTING..." : "COMMIT_CHANGES"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FontPicker />
        <SizePicker />
        <ColorPicker />
      </div>

      {/* Hero configuration */}
      <TerminalWrapper title="HERO_CONFIG" className="w-full">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col space-y-1">
              <span className="text-[10px] text-slate-500 font-mono">
                HERO.TITLE
              </span>
              <input
                value={data.hero.title}
                onChange={(e) => handleHeroChange("title", e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
              />
            </label>
            <label className="flex flex-col space-y-1">
              <span className="text-[10px] text-slate-500 font-mono">
                HERO.SUBTITLE
              </span>
              <input
                value={data.hero.subtitle}
                onChange={(e) => handleHeroChange("subtitle", e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
              />
            </label>
          </div>
          <label className="flex flex-col space-y-1">
            <span className="text-[10px] text-slate-500 font-mono">
              HERO.DESCRIPTION
            </span>
            <textarea
              value={data.hero.description || ""}
              onChange={(e) => handleHeroChange("description", e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200 h-20"
            />
          </label>
        </div>
      </TerminalWrapper>

      {/* Timeline / Milestones configuration */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-slate-200">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h2 className="text-md font-bold font-mono">TIMELINE_MILESTONES</h2>
          </div>
          <button
            type="button"
            onClick={addMilestone}
            className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="font-mono">ADD_MILESTONE</span>
          </button>
        </div>

        <div className="space-y-4">
          {data.milestones.map((m, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-3 bg-slate-900/30 border border-slate-800 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <span className="text-[10px] text-emerald-400 font-mono">
                  MILESTONE #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => deleteMilestone(idx)}
                  className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <label className="flex flex-col space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">
                    YEAR / TIMELINE
                  </span>
                  <input
                    value={m.year}
                    onChange={(e) =>
                      handleMilestoneChange(idx, "year", e.target.value)
                    }
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
                  />
                </label>
                <label className="flex flex-col space-y-1 md:col-span-2">
                  <span className="text-[10px] text-slate-500 font-mono">
                    ROLE TITLE / DEGREE
                  </span>
                  <input
                    value={m.title}
                    onChange={(e) =>
                      handleMilestoneChange(idx, "title", e.target.value)
                    }
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
                  />
                </label>
                <label className="flex flex-col space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">
                    ICON TYPE
                  </span>
                  <select
                    value={m.iconType}
                    onChange={(e) =>
                      handleMilestoneChange(
                        idx,
                        "iconType",
                        e.target.value as Milestone["iconType"],
                      )
                    }
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
                  >
                    <option value="work">Work (Briefcase)</option>
                    <option value="education">
                      Education (Graduation Cap)
                    </option>
                    <option value="award">Award (Trophy)</option>
                    <option value="other">Other (Star)</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="flex flex-col space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">
                    COMPANY / INSTITUTION
                  </span>
                  <input
                    value={m.company}
                    onChange={(e) =>
                      handleMilestoneChange(idx, "company", e.target.value)
                    }
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
                  />
                </label>
                <label className="flex flex-col space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">
                    DESCRIPTION
                  </span>
                  <textarea
                    value={m.desc}
                    onChange={(e) =>
                      handleMilestoneChange(idx, "desc", e.target.value)
                    }
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200 h-16"
                  />
                </label>
              </div>

              {/* Nested Sub-Milestones / Sub-Branches */}
              <div className="mt-4 pt-3 border-t border-slate-900 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1.5 text-slate-300">
                    <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      SUB-BRANCHES (INTERNSHIP / FREELANCING)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addSubMilestone(idx)}
                    className="text-[9px] text-emerald-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded hover:bg-slate-900 transition-colors font-mono"
                  >
                    + ADD SUB-BRANCH
                  </button>
                </div>

                <div className="space-y-3 pl-4 border-l border-dashed border-slate-800">
                  {m.subMilestones &&
                    m.subMilestones.map((sub, subIdx) => (
                      <div
                        key={subIdx}
                        className="bg-slate-950/40 border border-slate-900 p-3 rounded space-y-2 relative"
                      >
                        <div className="flex justify-between items-center pb-1.5 border-b border-slate-900/50">
                          <span className="text-[9px] text-emerald-400/80 font-mono">
                            SUB-BRANCH #{subIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => deleteSubMilestone(idx, subIdx)}
                            className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                          <label className="flex flex-col space-y-0.5">
                            <span className="text-[9px] text-slate-500 font-mono">
                              YEAR
                            </span>
                            <input
                              value={sub.year}
                              onChange={(e) =>
                                handleSubMilestoneChange(
                                  idx,
                                  subIdx,
                                  "year",
                                  e.target.value,
                                )
                              }
                              className="bg-slate-950 border border-slate-900 rounded px-2 py-0.5 text-xs text-slate-200"
                            />
                          </label>
                          <label className="flex flex-col space-y-0.5 md:col-span-2">
                            <span className="text-[9px] text-slate-500 font-mono">
                              ROLE TITLE / DEGREE
                            </span>
                            <input
                              value={sub.title}
                              onChange={(e) =>
                                handleSubMilestoneChange(
                                  idx,
                                  subIdx,
                                  "title",
                                  e.target.value,
                                )
                              }
                              className="bg-slate-950 border border-slate-900 rounded px-2 py-0.5 text-xs text-slate-200"
                            />
                          </label>
                          <label className="flex flex-col space-y-0.5">
                            <span className="text-[9px] text-slate-500 font-mono">
                              COMPANY / CLIENT
                            </span>
                            <input
                              value={sub.company}
                              onChange={(e) =>
                                handleSubMilestoneChange(
                                  idx,
                                  subIdx,
                                  "company",
                                  e.target.value,
                                )
                              }
                              className="bg-slate-950 border border-slate-900 rounded px-2 py-0.5 text-xs text-slate-200"
                            />
                          </label>
                        </div>
                        <label className="flex flex-col space-y-0.5">
                          <span className="text-[9px] text-slate-500 font-mono">
                            DESCRIPTION
                          </span>
                          <textarea
                            value={sub.desc}
                            onChange={(e) =>
                              handleSubMilestoneChange(
                                idx,
                                subIdx,
                                "desc",
                                e.target.value,
                              )
                            }
                            className="bg-slate-950 border border-slate-900 rounded px-2 py-0.5 text-xs text-slate-200 h-12"
                          />
                        </label>
                      </div>
                    ))}
                  {(!m.subMilestones || m.subMilestones.length === 0) && (
                    <div className="text-[9px] text-slate-600 font-mono italic">
                      No sub-branches created for this timeline event.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Configuration */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-slate-200">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h2 className="text-md font-bold font-mono">PROJECTS_REGISTRY</h2>
          </div>
          <button
            type="button"
            onClick={addProject}
            className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="font-mono">ADD_PROJECT</span>
          </button>
        </div>

        <div className="space-y-6">
          {data.projects.map((proj, idx) => (
            <ProjectEditor
              key={proj.id || idx}
              data={proj}
              onChange={(updated) => handleProjectChange(idx, updated)}
              onDelete={() => deleteProject(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
