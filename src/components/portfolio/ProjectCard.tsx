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
    const tiltX = (yc - y) / 14;
    const tiltY = (x - xc) / 14;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Inner glow follows pointer
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.setProperty("--glow-x", `${glowX}%`);
    card.style.setProperty("--glow-y", `${glowY}%`);
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
      className="group relative flex flex-col h-full rounded-2xl bg-white border border-zinc-200/80 overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:border-zinc-300/60"
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Inner glow gradient following mouse */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-2xl"
        style={{
          background: "radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), hsla(262, 83%, 58%, 0.06), transparent 60%)",
        }}
      />

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden border-b border-zinc-100" style={{ transform: "translateZ(20px)" }}>
        <SkeletonImage 
          src={project.thumbnail} 
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        
        {/* Glassmorphism Tags overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[9px] font-bold text-white backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div>
          <h4 className="text-base font-extrabold text-zinc-950 group-hover:text-[hsl(262,83%,58%)] transition-colors duration-300 mb-2">
            {project.title}
          </h4>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <span className="text-xs font-bold text-[hsl(262,83%,58%)] group-hover:underline underline-offset-2">
            View Case Study
          </span>
          <Code className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 transition-colors" />
        </div>
      </div>
    </div>
  );
}
