import { cn } from "@/lib/utils";

interface TerminalWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function TerminalWrapper({ children, className, title, ...props }: TerminalWrapperProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-lg overflow-hidden",
        className
      )}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900">
          <div className="flex space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <span className="text-xs text-slate-400 font-mono tracking-wider">{title}</span>
        </div>
      )}
      <div className="p-4 grow flex flex-col relative">
        {children}
      </div>
    </div>
  );
}
