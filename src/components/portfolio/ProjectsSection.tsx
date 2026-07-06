"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, ShieldAlert, BookOpen, Layers, X } from "lucide-react";
import { GithubIcon } from "../shared/icons";
import { Project } from "@/lib/mockData";
import Image from "next/image";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-zinc-950/40">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Work
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h3>
          <motion.p 
            className="text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            A collection of production-ready systems, custom WebGL simulations, and full-stack software products.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="group flex flex-col h-full rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md overflow-hidden cursor-pointer hover:border-violet-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden border-b border-zinc-800/50">
                <Image 
                  src={project.thumbnail} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />
                
                {/* Tech Badges on Thumbnail overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="px-2.5 py-0.5 rounded-full bg-zinc-950/80 border border-zinc-800/60 text-[10px] font-semibold text-zinc-300 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors mb-3">
                    {project.title}
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Icon List & Button */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                  <span className="text-xs font-semibold text-violet-400 group-hover:underline">
                    View Details
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-600 hover:text-white transition-colors">
                      <Code className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div 
              className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-zinc-950/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Banner */}
              <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-zinc-800">
                <Image 
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <h3 className="text-3xl font-extrabold text-white mb-2">{selectedProject.title}</h3>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
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
                    <h4 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase mb-3">Overview</h4>
                    <p className="text-zinc-300 text-base leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h4 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-violet-400" /> Key Features
                    </h4>
                    <ul className="list-disc pl-5 text-zinc-300 space-y-2 text-sm leading-relaxed">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800/60">
                    <div>
                      <h4 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase mb-2.5 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-fuchsia-400" /> Engineering Challenges
                      </h4>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{selectedProject.challenges}</p>
                    </div>
                    <div>
                      <h4 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase mb-2.5 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" /> Lessons Learned
                      </h4>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{selectedProject.lessonsLearned}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Architecture, Technologies & Links */}
                <div className="space-y-6 bg-zinc-950/40 p-6 rounded-2xl border border-zinc-800/40 h-fit">
                  <div>
                    <h4 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.architecture && (
                    <div>
                      <h4 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase mb-2">System Architecture</h4>
                      <p className="text-zinc-400 text-xs leading-relaxed">{selectedProject.architecture}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm font-semibold text-white transition-all active:scale-95"
                    >
                      <GithubIcon className="w-4 h-4" /> View GitHub Repository
                    </a>
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-semibold text-white transition-all active:scale-95 shadow-md shadow-violet-500/10"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo Showcase
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
