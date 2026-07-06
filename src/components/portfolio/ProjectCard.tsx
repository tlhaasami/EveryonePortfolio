"use client";

import { useRef } from "react";
import { Code } from "lucide-react";
import { Project } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const tiltX = (yc - y) / 12;
    const tiltY = (x - xc) / 12;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col h-full rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden cursor-pointer transition-all duration-200 ease-out hover:shadow-xl hover:border-violet-500/30"
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden border-b border-zinc-200" style={{ transform: "translateZ(20px)" }}>
        <SkeletonImage 
          src={project.thumbnail} 
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        
        {/* Tags overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 rounded-full bg-zinc-950/80 border border-zinc-800/40 text-[9px] font-bold text-zinc-100 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        <div>
          <h4 className="text-lg font-black text-zinc-950 group-hover:text-violet-600 transition-colors mb-2">
            {project.title}
          </h4>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-150">
          <span className="text-xs font-bold text-violet-600 group-hover:underline">
            View Case Study
          </span>
          <Code className="w-4 h-4 text-zinc-400 group-hover:text-zinc-800" />
        </div>
      </div>
    </div>
  );
}
