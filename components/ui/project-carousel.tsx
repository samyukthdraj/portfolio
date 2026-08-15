"use client";

import { Carousel, ConfigProvider, theme } from "antd";
import { ProjectMetrics } from "@/lib/types";
import { SkillUpTwo } from "../bento/skillup-two";
import { SkillUpEdis } from "../bento/skillup-edis";
import { StackPilotPanel } from "../bento/stackpilot-panel";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomPrevArrow = ({ style, onClick }: CustomArrowProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-[-40px] top-[50%] translate-y-[-50%] z-20 text-slate-400 hover:text-emerald-400 transition-colors p-2 hover:bg-slate-900/50 rounded-full border border-transparent hover:border-slate-800"
      style={{ ...style, display: "block" }}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
};

const CustomNextArrow = ({ style, onClick }: CustomArrowProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-[-40px] top-[50%] translate-y-[-50%] z-20 text-slate-400 hover:text-emerald-400 transition-colors p-2 hover:bg-slate-900/50 rounded-full border border-transparent hover:border-slate-800"
      style={{ ...style, display: "block" }}
    >
      <ArrowRight className="w-5 h-5" />
    </button>
  );
};

interface ProjectCarouselProps {
  projects: ProjectMetrics[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  if (projects.length === 0) return null;

  const showArrows = projects.length > 1;

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#10b981", // Emerald-500
        },
      }}
    >
      <div className="relative px-2 md:px-10">
        <Carousel
          autoplay={projects.length > 1}
          autoplaySpeed={5000}
          dots={projects.length > 1}
          arrows={showArrows}
          prevArrow={showArrows ? <CustomPrevArrow /> : undefined}
          nextArrow={showArrows ? <CustomNextArrow /> : undefined}
          className="w-full"
        >
          {projects.map((project) => (
            <div key={project.id} className="outline-none py-2 px-1">
              {project.id === "skillup2" ? (
                <SkillUpTwo data={project} />
              ) : project.id === "skillupEdis" ? (
                <SkillUpEdis data={project} />
              ) : (
                <StackPilotPanel data={project} />
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </ConfigProvider>
  );
}
