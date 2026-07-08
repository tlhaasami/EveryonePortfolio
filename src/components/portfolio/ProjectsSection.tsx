"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShieldAlert, BookOpen, Layers, X, Star, GitFork, ArrowRightLeft } from "lucide-react";
import { GithubIcon } from "../shared/icons";
import { Project, GithubRepo } from "@/lib/mockData";
import ProjectCard from "./ProjectCard";
import GithubRepoCard from "./GithubRepoCard";
import SkeletonImage from "./SkeletonImage";
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from "./Animations";

interface ProjectsSectionProps {
  projects: Project[];
  githubRepos: GithubRepo[];
  githubProfileUrl: string;
}

export default function ProjectsSection({ projects, githubRepos, githubProfileUrl }: ProjectsSectionProps) {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const directionRef = useRef(1); // 1 = right, -1 = left
  const [isHovered, setIsHovered] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  // Mouse Drag to Scroll State refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  // Detect if scroll row actually overflows the screen
  useEffect(() => {
    const checkScroll = () => {
      const el = scrollRef.current;
      if (el) {
        setCanScroll(el.scrollWidth > el.clientWidth);
      }
    };
    checkScroll();
    const timer = setTimeout(checkScroll, 150);

    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [githubRepos]);

  // Fluid sub-pixel auto-scroll with Ping-Pong direction changes at boundaries
  useEffect(() => {
    if (!canScroll) return;
    const el = scrollRef.current;
    if (!el) return;

    let frameId: number;
    const speed = 0.55; // Pixels per frame crawl speed

    const tick = () => {
      if (!isHovered) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        // Update position based on direction
        scrollPosRef.current += speed * directionRef.current;

        // Bounce back from right edge
        if (scrollPosRef.current >= maxScroll) {
          scrollPosRef.current = maxScroll;
          directionRef.current = -1;
        }
        // Bounce back from left edge
        else if (scrollPosRef.current <= 0) {
          scrollPosRef.current = 0;
          directionRef.current = 1;
        }

        el.scrollLeft = Math.round(scrollPosRef.current);
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered, canScroll]);

  // Sync scroll tracker on manual scroll interaction
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (isHovered && canScroll) {
      scrollPosRef.current = el.scrollLeft;
    }
  };

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canScroll) return;
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsHovered(true);
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !canScroll) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftStartRef.current - walk;
    scrollPosRef.current = el.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsHovered(false);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-left mb-16">
          <FadeInUp distance={15}>
            <h2 className="text-xs font-bold tracking-widest text-primary uppercase mb-2">My Showcase</h2>
          </FadeInUp>
          <FadeInUp delay={0.1} distance={20}>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">Featured Projects</h3>
          </FadeInUp>
        </div>

        {/* Featured Projects Grid (Top 3 or 4) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24" staggerDelay={0.12}>
          {projects.slice(0, 4).map((project, idx) => (
            <StaggerItem key={idx}>
              <ScaleIn delay={idx * 0.05}>
              <ProjectCard 
                project={project} 
                onClick={() => {
                  const isAdmin = typeof window !== "undefined" && window.location.pathname.includes("/admin");
                  if (isAdmin) {
                    setSelectedProject(project);
                  } else {
                    router.push(`/projects?id=${idx}`);
                  }
                }} 
              />
              </ScaleIn>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* GitHub & More Projects Horizontal Scroll Section */}
        <div className="pt-12 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h4 className="text-lg font-black text-zinc-950 flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-zinc-900" /> Additional Repositories
              </h4>
              <p className="text-xs text-zinc-450 mt-0.5">Explore active pipelines and packages directly from my GitHub profile.</p>
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

          {/* Horizontal Scrolling Repos Container */}
          <div className="relative w-full overflow-hidden select-none">
            {/* Fading Edge Overlays - Only shown if scroll is active */}
            {canScroll && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/10 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/10 to-transparent pointer-events-none z-10" />
              </>
            )}

            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseEnter={() => canScroll && setIsHovered(true)}
              onMouseLeave={handleMouseUpOrLeave}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onTouchStart={() => canScroll && setIsHovered(true)}
              onTouchEnd={() => canScroll && setIsHovered(false)}
              className={`flex gap-6 py-4 scrollbar-none snap-mandatory ${
                canScroll 
                  ? "overflow-x-auto cursor-grab active:cursor-grabbing" 
                  : "overflow-x-hidden"
              }`}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Spacing spacer before first card - only if scrolling */}
              {canScroll && <div className="w-1.5 flex-shrink-0" />}
              
              {githubRepos.map((repo, idx) => (
                <GithubRepoCard key={idx} repo={repo} />
              ))}

              {/* Spacing spacer after last card - only if scrolling */}
              {canScroll && <div className="w-1.5 flex-shrink-0" />}
            </div>

            {/* Horizontal Scroll Hint - Only shown if scrolling is active */}
            {canScroll && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-405 uppercase tracking-widest mt-2 justify-end pr-2">
                <ArrowRightLeft className="w-3 h-3 animate-pulse" /> Hover to pause & scroll
              </div>
            )}
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
                      <Layers className="w-4 h-4 text-primary" /> Key Features
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
                        <ShieldAlert className="w-4 h-4 text-accent" /> Engineering Challenges
                      </h4>
                      <p className="text-zinc-650 text-xs leading-relaxed">{selectedProject.challenges}</p>
                    </div>
                    <div>
                      <h4 className="text-zinc-400 font-bold text-xs tracking-wider uppercase mb-2.5 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-warm" /> Lessons Learned
                      </h4>
                      <p className="text-zinc-655 text-xs leading-relaxed">{selectedProject.lessonsLearned}</p>
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
                      <h4 className="text-zinc-450 font-bold text-xs tracking-wider uppercase mb-2">System Architecture</h4>
                      <p className="text-zinc-505 text-xs leading-relaxed">{selectedProject.architecture}</p>
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
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md active:scale-95 shadow-primary/10"
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
