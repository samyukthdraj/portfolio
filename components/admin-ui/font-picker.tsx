"use client";

export function FontPicker() {
  return (
    <div className="flex flex-col space-y-2 p-4 border border-slate-800 rounded-lg bg-slate-900/30">
      <span className="text-[10px] text-slate-500 font-mono">SYSTEM_FONT_TOKEN</span>
      <select className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-200">
        <option>Geist Mono</option>
        <option>JetBrains Mono</option>
        <option>Fira Code</option>
      </select>
    </div>
  );
}
