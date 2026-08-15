"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { TerminalWrapper } from "./terminal-wrapper";
import { Activity } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <TerminalWrapper title={this.props.fallbackTitle || "System Failure"} className="h-full border-red-900/50 items-center justify-center min-h-[200px]">
          <div className="flex flex-col items-center space-y-4">
            <Activity className="w-8 h-8 text-red-500 opacity-50" />
            <p className="text-sm font-mono tracking-tight text-red-400">PANEL_CRASH_DETECTED</p>
          </div>
        </TerminalWrapper>
      );
    }

    return this.props.children;
  }
}
