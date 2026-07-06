"use client";

import { motion } from "framer-motion";
import { Experience } from "@/lib/mockData";
import { Briefcase, Calendar, Award } from "lucide-react";

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-zinc-950/40">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Journey
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Work Experience
          </motion.h3>
          <motion.p 
            className="text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            A timeline of my professional roles, engineering contributions, and architectural accomplishments.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical line through timeline */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800/80 transform md:-translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {experience.map((job, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-stretch">
                  
                  {/* Left block (Desktop only) */}
                  <div className={`hidden md:block w-1/2 ${isEven ? "pr-12 text-right" : "pl-12 order-2 text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="pt-6"
                    >
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 tracking-wider bg-violet-500/10 px-3.5 py-1 rounded-full border border-violet-500/10 uppercase mb-2">
                        <Calendar className="w-3 h-3" /> {job.timeline}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-2">{job.position}</h4>
                      <p className="text-zinc-400 font-medium text-sm mt-1">{job.company}</p>
                    </motion.div>
                  </div>

                  {/* Center Node Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-8 h-8 rounded-full bg-zinc-900 border-2 border-violet-500 flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg shadow-violet-500/10">
                    <Briefcase className="w-3.5 h-3.5 text-violet-400" />
                  </div>

                  {/* Right Card block */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pl-12" : "md:pr-12 md:order-1"}`}>
                    <motion.div
                      className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md hover:border-violet-500/20 transition-all duration-300 shadow-xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {/* Mobile Header (Hidden on Desktop) */}
                      <div className="block md:hidden mb-4">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-violet-400 tracking-wider bg-violet-500/10 px-3 py-0.5 rounded-full border border-violet-500/10 uppercase mb-2">
                          <Calendar className="w-2.5 h-2.5" /> {job.timeline}
                        </span>
                        <h4 className="text-lg font-bold text-white mt-1">{job.position}</h4>
                        <p className="text-zinc-400 font-medium text-xs">{job.company}</p>
                      </div>

                      {/* Responsibilities list */}
                      <div className="space-y-3.5">
                        <h5 className="text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-2">Key Responsibilities</h5>
                        {job.responsibilities.map((resp, respIdx) => (
                          <p key={respIdx} className="text-zinc-300 text-sm leading-relaxed pl-4 border-l-2 border-zinc-800">
                            {resp}
                          </p>
                        ))}
                      </div>

                      {/* Achievements list */}
                      <div className="mt-6 pt-6 border-t border-zinc-800/60 space-y-3.5">
                        <h5 className="text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-cyan-400" /> Key Achievements
                        </h5>
                        {job.achievements.map((ach, achIdx) => (
                          <p key={achIdx} className="text-zinc-300 text-sm leading-relaxed pl-4 border-l-2 border-zinc-800">
                            {ach}
                          </p>
                        ))}
                      </div>

                      {/* Tech Used */}
                      <div className="mt-6 pt-6 border-t border-zinc-800/60">
                        <div className="flex flex-wrap gap-1.5">
                          {job.technologies.map((tech, techIdx) => (
                            <span 
                              key={techIdx} 
                              className="px-2.5 py-0.5 rounded-md bg-zinc-950/60 border border-zinc-800/50 text-[10px] font-semibold text-zinc-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
