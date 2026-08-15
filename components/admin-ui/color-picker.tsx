"use client";

export function ColorPicker() {
  return (
    <div className="flex flex-col space-y-2 p-4 border border-slate-800 rounded-lg bg-slate-900/30">
      <span className="text-[10px] text-slate-500 font-mono">ACCENT_COLOR</span>
      <div className="flex space-x-2">
        {['bg-emerald-400', 'bg-blue-400', 'bg-purple-400', 'bg-rose-400'].map(color => (
          <div key={color} className={`w-6 h-6 rounded-full cursor-pointer ${color} opacity-80 hover:opacity-100`} />
        ))}
      </div>
    </div>
  );
}
