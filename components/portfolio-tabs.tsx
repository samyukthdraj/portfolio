"use client";

import { useState } from "react";
import { PortfolioData } from "@/lib/types";
import { StatusPanel } from "@/components/bento/status-panel";

interface PortfolioTabsProps {
  data: PortfolioData;
}

export function PortfolioTabs({ data }: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  const workMilestones = data.milestones.filter((m) => m.iconType === "work");
  const eduMilestones = data.milestones.filter((m) => m.iconType === "education" || m.iconType === "certification");

  return (
    <div className="w-full mt-12 bg-slate-900/40 rounded-xl border border-slate-800/80 p-6 md:p-8">
      {/* Main Tabs */}
      <div role="tablist" aria-label="Milestone Categories" className="flex space-x-2 border-b border-slate-800 pb-4 mb-6">
        {(["work", "education"] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`panel-${tab}`}
            id={`tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? "portfolio-tab-active bg-slate-800/50 text-slate-100"
                : "portfolio-tab-inactive text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "work" && (
          <div 
            role="tabpanel"
            id="panel-work"
            aria-labelledby="tab-work"
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <StatusPanel milestones={workMilestones} />
          </div>
        )}

        {activeTab === "education" && (
          <div 
            role="tabpanel"
            id="panel-education"
            aria-labelledby="tab-education"
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <StatusPanel milestones={eduMilestones} />
          </div>
        )}
      </div>
    </div>
  );
}
