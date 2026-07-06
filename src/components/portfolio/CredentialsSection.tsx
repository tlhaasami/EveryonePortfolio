"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Education, Experience } from "@/lib/mockData";
import { GraduationCap, Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import ScrollParallaxWrapper from "./ScrollParallaxWrapper";

interface CredentialsSectionProps {
  education: Education[];
  experience: Experience[];
}

export default function CredentialsSection({ education, experience }: CredentialsSectionProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setExpandedIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="credentials" className="py-28 relative overflow-hidden bg-white border-b border-zinc-200 wave-divider">
      {/* Background decorative glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(175,72%,88%)] opacity-15 blur-[130px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-left mb-16">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-[hsl(262,83%,58%)] uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Background
          </motion.h2>
          <motion.h3 
            className="text-2xl sm:text-3xl font-black text-zinc-950"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Experience & Education
          </motion.h3>
        </div>

        {/* Side-by-Side Row Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          
          {/* Left Column: Work Experience Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-lg font-black text-zinc-950 flex items-center gap-2.5 mb-4 pl-1">
              <div className="p-2 rounded-xl bg-violet-500/8 border border-violet-500/10">
                <Briefcase className="w-4 h-4 text-[hsl(262,83%,58%)]" />
              </div>
              Work History
            </h4>

            <div className="space-y-4">
              {experience.map((job, idx) => {
                const isExpanded = expandedIdx === idx;

                return (
                  <ScrollParallaxWrapper key={idx} offsetY={[-(8 + idx * 3), 8 + idx * 3]} rotateX={[1.5, 0]}>
                    <motion.div
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isExpanded 
                          ? "bg-zinc-50/80 border-zinc-300/80 shadow-md" 
                          : "bg-white border-zinc-200/80 hover:border-zinc-300/60 hover:shadow-sm"
                      }`}
                      layout
                    >
                      {/* Header trigger */}
                      <div 
                        onClick={() => toggleAccordion(idx)}
                        className="p-5 flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h5 className="font-extrabold text-sm sm:text-base text-zinc-950">{job.position}</h5>
                            <span className="text-[9px] font-bold text-[hsl(262,83%,58%)] bg-violet-500/5 border border-violet-500/10 px-2.5 py-0.5 rounded-full uppercase">
                              {job.company}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-zinc-400 uppercase">
                            <Calendar className="w-3 h-3" /> {job.timeline}
                          </span>
                        </div>
                        <div className={`p-1.5 rounded-lg border shadow-sm transition-all ${
                          isExpanded 
                            ? "bg-zinc-900 border-zinc-800 text-white" 
                            : "bg-white border-zinc-100 text-zinc-400"
                        }`}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>

                      {/* Expandable Panel */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-zinc-200/60"
                          >
                            <div className="p-5 bg-white space-y-4 font-sans text-xs sm:text-sm">
                              
                              {/* Responsibilities */}
                              <div className="space-y-2">
                                <h6 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Responsibilities</h6>
                                {job.responsibilities.map((resp, respIdx) => (
                                  <p key={respIdx} className="text-zinc-600 leading-relaxed pl-3 border-l-2 border-violet-500/20">
                                    {resp}
                                  </p>
                                ))}
                              </div>

                              {/* Achievements */}
                              <div className="space-y-2 pt-3 border-t border-zinc-100">
                                <h6 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Achievements</h6>
                                {job.achievements.map((ach, achIdx) => (
                                  <p key={achIdx} className="text-zinc-600 leading-relaxed pl-3 border-l-2 border-teal-500/20">
                                    {ach}
                                  </p>
                                ))}
                              </div>

                              {/* Tech Badges */}
                              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100">
                                {job.technologies.map((tech, techIdx) => (
                                  <span 
                                    key={techIdx} 
                                    className="px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200/80 text-[9px] font-bold text-zinc-500"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </ScrollParallaxWrapper>
                );
              })}
            </div>
          </div>

          {/* Right Column: Education Timeline with gradient line */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-lg font-black text-zinc-950 flex items-center gap-2.5 mb-4 pl-1">
              <div className="p-2 rounded-xl bg-teal-500/8 border border-teal-500/10">
                <GraduationCap className="w-4 h-4 text-[hsl(175,72%,42%)]" />
              </div>
              Education
            </h4>

            <div className="relative ml-4 pl-5 space-y-8">
              {/* Gradient animated timeline border */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-[hsl(175,72%,42%)] via-[hsl(262,83%,58%)] to-[hsl(35,92%,62%)] opacity-30" />

              {education.map((edu, idx) => (
                <ScrollParallaxWrapper key={idx} offsetY={[-(12 + idx * 5), 12 + idx * 5]} rotateX={[2, 0]}>
                  <motion.div 
                    className="relative group space-y-2"
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    {/* Dot node with glow */}
                    <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[hsl(175,72%,42%)] shadow-sm shadow-teal-500/30" />
                    
                    <span className="text-[9px] font-bold text-[hsl(175,72%,42%)] uppercase tracking-wider block">
                      {edu.timeline}
                    </span>
                    <h5 className="font-extrabold text-zinc-950 text-sm leading-tight group-hover:text-[hsl(175,72%,42%)] transition-colors">
                      {edu.degree}
                    </h5>
                    <p className="text-zinc-400 text-xs font-semibold leading-none">{edu.institution}</p>
                    
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider pt-1">
                      GPA Score: <span className="text-zinc-800 font-black">{edu.cgpa}</span>
                    </div>

                    <ul className="space-y-1 pl-4 list-disc text-zinc-500 text-xs pt-2">
                      {edu.achievements.map((ach, achIdx) => (
                        <li key={achIdx}>{ach}</li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollParallaxWrapper>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
