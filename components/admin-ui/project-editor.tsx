"use client";

import { ProjectMetrics } from "@/lib/types";
import { Trash2, Upload, X } from "lucide-react";

const compressImage = (file: File, callback: (base64: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target?.result as string;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 450;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
      callback(dataUrl);
    };
  };
};

export function ProjectEditor({ 
  data, 
  onChange,
  onDelete
}: { 
  data: ProjectMetrics; 
  onChange: (data: ProjectMetrics) => void;
  onDelete?: () => void;
}) {
  const handleChange = <K extends keyof ProjectMetrics>(field: K, value: ProjectMetrics[K]) => {
    const newData = { ...data, [field]: value };
    onChange(newData);
  };

  const handlePerformanceChange = (field: string, value: string) => {
    const newData = { 
      ...data, 
      performance: { ...data.performance, [field]: value } 
    };
    onChange(newData);
  };

  const handleTechStackChange = (value: string) => {
    const newData = { 
      ...data, 
      techStack: value.split(',').map(s => s.trim()).filter(Boolean) 
    };
    onChange(newData);
  };

  return (
    <div className="flex flex-col space-y-4 border border-slate-800 bg-slate-900/30 p-4 rounded-lg">
      <div className="flex justify-between items-center pb-2 border-b border-slate-900">
        <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest">
          {data.title || "NEW_PROJECT"} ({data.id})
        </h3>
        {onDelete && (
          <button 
            type="button" 
            onClick={onDelete}
            className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">TITLE</span>
          <input 
            value={data.title} 
            onChange={e => handleChange("title", e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          />
        </label>
        
        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">STATUS</span>
          <select 
            value={data.statusTag} 
            onChange={e => handleChange("statusTag", e.target.value as "Live" | "Development" | "Beta")}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          >
            <option value="Live">Live</option>
            <option value="Development">Development</option>
            <option value="Beta">Beta</option>
          </select>
        </label>

        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">PROJECT TYPE</span>
          <select 
            value={data.projectType || "personal"} 
            onChange={e => handleChange("projectType", e.target.value as "enterprise" | "personal")}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          >
            <option value="enterprise">Enterprise Grade</option>
            <option value="personal">Personal</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">LIVE_LINK</span>
          <input 
            value={data.liveLink} 
            onChange={e => handleChange("liveLink", e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          />
        </label>

        <div className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">SCREENSHOT (OPTIONAL FILE OR URL PATH)</span>
          <div className="flex items-center space-x-2">
            <input 
              value={data.screenshotPath || ""} 
              onChange={e => handleChange("screenshotPath", e.target.value)}
              placeholder="e.g. /images/c2k.png or base64 data"
              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200 grow"
            />
            <label className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded cursor-pointer transition-colors border border-slate-700 shrink-0 text-xs font-mono">
              <Upload className="w-3.5 h-3.5 mr-1" />
              <span>UPLOAD</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    compressImage(file, (base64) => {
                      handleChange("screenshotPath", base64);
                    });
                  }
                }}
                className="hidden"
              />
            </label>
            {data.screenshotPath && (
              <button 
                type="button"
                onClick={() => handleChange("screenshotPath", "")}
                className="flex items-center bg-red-950/20 border border-red-500/30 hover:bg-red-950/40 text-red-400 px-3 py-1.5 rounded transition-colors shrink-0 text-xs font-mono"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                <span>REMOVE</span>
              </button>
            )}
          </div>
          {data.screenshotPath && (
            <div className="mt-1 flex items-center space-x-2">
              <span className="text-[9px] text-slate-500 font-mono">PREVIEW:</span>
              <div className="relative w-16 h-8 rounded border border-slate-800 overflow-hidden bg-slate-950 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={data.screenshotPath} 
                  alt="Preview" 
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-[9px] text-emerald-500 font-mono truncate max-w-xs">
                {data.screenshotPath.startsWith("data:") ? "Base64 Image Data Loaded" : data.screenshotPath}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">CLIENT / CUSTOMER DETAILS</span>
          <input 
            value={data.customerDetails || ""} 
            onChange={e => handleChange("customerDetails", e.target.value)}
            placeholder="Education Authority of Northern Ireland"
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          />
        </label>

        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">TECH_STACK (comma separated)</span>
          <input 
            value={data.techStack.join(', ')} 
            onChange={e => handleTechStackChange(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          />
        </label>
      </div>

      <label className="flex flex-col space-y-1">
        <span className="text-[10px] text-slate-500 font-mono">DESCRIPTION</span>
        <textarea 
          value={data.description} 
          onChange={e => handleChange("description", e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200 h-20"
        />
      </label>

      <div className="grid grid-cols-3 gap-2">
        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">PERF: USERS</span>
          <input 
            value={data.performance?.users || ""} 
            onChange={e => handlePerformanceChange("users", e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          />
        </label>
        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">PERF: CONC</span>
          <input 
            value={data.performance?.concurrency || ""} 
            onChange={e => handlePerformanceChange("concurrency", e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          />
        </label>
        <label className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">PERF: UPTIME</span>
          <input 
            value={data.performance?.uptime || ""} 
            onChange={e => handlePerformanceChange("uptime", e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200"
          />
        </label>
      </div>
    </div>
  );
}
