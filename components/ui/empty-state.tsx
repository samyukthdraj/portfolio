import { TerminalWrapper } from "./terminal-wrapper";
import { Server } from "lucide-react";

export function EmptyState({ title = "Data Unavailable" }: { title?: string }) {
  return (
    <TerminalWrapper title={title} className="h-full items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center text-slate-500 space-y-4">
        <Server className="w-8 h-8 opacity-50" />
        <p className="text-sm font-mono tracking-tight text-slate-400">Not yet uploaded</p>
      </div>
    </TerminalWrapper>
  );
}
