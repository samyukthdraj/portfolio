"use client";

import { ProjectMetrics } from "@/lib/types";
import { Trash2, Upload, X, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const compressImage = (file: File, callback: (base64: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new window.Image();
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
  onDelete,
}: {
  data: ProjectMetrics;
  onChange: (data: ProjectMetrics) => void;
  onDelete?: () => void;
}) {
  const handleChange = <K extends keyof ProjectMetrics>(
    field: K,
    value: ProjectMetrics[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  const handleTechStackChange = (value: string) => {
    onChange({
      ...data,
      techStack: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="flex flex-col bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-slate-700 relative group">
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-2 right-2 z-10 bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Image Preview / Upload Section */}
      <div className="w-full aspect-4/3 bg-slate-900 relative p-6 flex flex-col items-center justify-center group/image">
        {data.screenshotPath ? (
          <>
            <Image
              src={data.screenshotPath}
              alt="Preview"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => handleChange("screenshotPath", "")}
                className="bg-red-500/80 text-white px-4 py-2 rounded-lg font-bold flex items-center space-x-2 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Remove Image</span>
              </button>
            </div>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-emerald-400 transition-colors">
            <Upload className="w-8 h-8 mb-2" />
            <span className="font-bold">Upload Screenshot</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
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
        )}
      </div>

      {/* Content Editor Section */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        {/* Title Input */}
        <input
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Project Title"
          className="text-xl font-bold text-slate-100 bg-transparent border-b border-slate-700 focus:border-emerald-400 outline-none pb-1 placeholder:text-slate-600 w-full"
        />

        {/* Description Textarea */}
        <textarea
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Detailed description of your project..."
          rows={3}
          className="text-slate-400 text-sm leading-relaxed bg-transparent border border-slate-700 focus:border-emerald-400 outline-none p-3 rounded-xl placeholder:text-slate-600 w-full resize-none"
        />

        {/* Tech Stack Input */}
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] text-slate-500 font-mono uppercase">
            Technologies Used (Comma Separated)
          </span>
          <input
            value={data.techStack.join(", ")}
            onChange={(e) => handleTechStackChange(e.target.value)}
            placeholder="React, Next.js, Tailwind..."
            className="text-sm font-medium text-emerald-400 bg-emerald-900/10 border border-emerald-900/30 focus:border-emerald-500/50 outline-none px-3 py-2 rounded-lg w-full"
          />
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-slate-800">
          <div className="flex-1 flex flex-col space-y-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase">
              Live Website URL
            </span>
            <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg">
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                value={data.liveLink}
                onChange={(e) => handleChange("liveLink", e.target.value)}
                placeholder="https://..."
                className="bg-transparent outline-none text-sm text-slate-200 w-full placeholder:text-slate-600"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col space-y-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase">
              Source Code URL
            </span>
            <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg">
              <FaGithub className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                value={data.sourceLink || ""}
                onChange={(e) => handleChange("sourceLink", e.target.value)}
                placeholder="https://github.com/..."
                className="bg-transparent outline-none text-sm text-slate-200 w-full placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
