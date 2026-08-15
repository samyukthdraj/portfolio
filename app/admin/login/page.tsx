"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { TerminalWrapper } from "@/components/ui/terminal-wrapper";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <TerminalWrapper title="AUTH.GATEWAY" className="w-full max-w-md">
        <form action={formAction} className="flex flex-col space-y-4 p-4">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-mono text-slate-400">ADMIN_PASSPHRASE</label>
            <input 
              type="password" 
              name="password"
              className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
              required
            />
          </div>
          {state?.error && (
            <div className="text-xs text-red-400 font-mono bg-red-900/20 border border-red-900/50 p-2 rounded">
              [ERROR]: {state.error}
            </div>
          )}
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-sm py-2 rounded transition-colors border border-slate-700 hover:border-slate-600 disabled:opacity-50"
          >
            {isPending ? "AUTHENTICATING..." : "INITIATE_SESSION"}
          </button>
        </form>
      </TerminalWrapper>
    </div>
  );
}
