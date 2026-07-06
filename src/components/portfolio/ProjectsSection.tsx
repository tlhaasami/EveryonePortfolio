"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, ShieldAlert, BookOpen, Layers, X, Star, GitFork, ArrowRightLeft } from "lucide-react";
import { GithubIcon } from "../shared/icons";
import { Project, GithubRepo } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";

interface ProjectsSectionProps {
  projects: Project[];
  githubRepos: GithubRepo[];
  githubProfileUrl: string;
}

// Custom 3D Tilt Card Component
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const tiltX = (yc - y) / 12; // tilt factors
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

export default function ProjectsSection({ projects, githubRepos, githubProfileUrl }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Duplicate items for seamless circular marquee
  const marqueeRepos = [...githubRepos, ...githubRepos];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* Header */}
        <div className="text-left mb-16">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Showcase
          </motion.h2>
          <motion.h3 
            className="text-2xl sm:text-3xl font-black text-zinc-950"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h3>
        </div>

        {/* Featured Projects Grid (Top 3 or 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {projects.slice(0, 4).map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </div>

        {/* GitHub & More Projects Horizontal Scroll Section */}
        <div className="pt-12 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h4 className="text-lg font-black text-zinc-950 flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-zinc-900" /> Additional Repositories
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">Explore active pipelines and packages directly from my GitHub profile.</p>
            </div>
            
            <a 
              href={githubProfileUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs uppercase tracking-wider transition-colors w-fit"
            >
              View GitHub Profile <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Infinite Horizontal Scrolling Repos Marquee */}
          <div className="relative w-full overflow-hidden select-none">
            {/* Fading Edge Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/10 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/10 to-transparent pointer-events-none z-10" />
            
            <div className="flex gap-6 animate-marquee py-4">
              {marqueeRepos.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 w-[240px] sm:w-[280px] p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-violet-500/20 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-extrabold text-zinc-900 text-sm line-clamp-1 group-hover:text-violet-600">
                        {repo.name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-[8px] font-bold text-zinc-500 uppercase">
                        {repo.language}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 mb-6">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-zinc-150 text-[10px] text-zinc-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-zinc-400" /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Horizontal Scroll Hint */}
            <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2 justify-end pr-2">
              <ArrowRightLeft className="w-3 h-3 animate-pulse" /> Auto Scrolling Loop
            </div>
          </div>
        </div>

      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
            <motion.div 
              className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-zinc-200 rounded-3xl overflow-y-auto shadow-2xl text-zinc-900"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Banner */}
              <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-zinc-200">
                <SkeletonImage 
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <h3 className="text-3xl font-extrabold text-zinc-950 mb-2">{selectedProject.title}</h3>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase">
                    <span>Role: {selectedProject.role}</span>
                    <span>•</span>
                    <span>Duration: {selectedProject.duration}</span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side: Summary & Features */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-zinc-400 font-bold text-xs tracking-wider uppercase mb-3">Overview</h4>
                    <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h4 className="text-zinc-400 font-bold text-xs tracking-wider uppercase mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-violet-600" /> Key Features
                    </h4>
                    <ul className="list-disc pl-5 text-zinc-600 space-y-2 text-xs sm:text-sm leading-relaxed">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
                    <div>
                      <h4 className="text-zinc-400 font-bold text-xs tracking-wider uppercase mb-2.5 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-fuchsia-600" /> Engineering Challenges
                      </h4>
                      <p className="text-zinc-600 text-xs leading-relaxed">{selectedProject.challenges}</p>
                    </div>
                    <div>
                      <h4 className="text-zinc-400 font-bold text-xs tracking-wider uppercase mb-2.5 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-600" /> Lessons Learned
                      </h4>
                      <p className="text-zinc-600 text-xs leading-relaxed">{selectedProject.lessonsLearned}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Architecture, Technologies & Links */}
                <div className="space-y-6 bg-zinc-50 p-6 rounded-2xl border border-zinc-150 h-fit">
                  <div>
                    <h4 className="text-zinc-400 font-bold text-xs tracking-wider uppercase mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-[10px] font-bold text-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.architecture && (
                    <div>
                      <h4 className="text-zinc-400 font-bold text-xs tracking-wider uppercase mb-2">System Architecture</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed">{selectedProject.architecture}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-200 space-y-3">
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md active:scale-95"
                    >
                      <GithubIcon className="w-4 h-4" /> View Repository
                    </a>
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md active:scale-95 shadow-violet-500/10"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
