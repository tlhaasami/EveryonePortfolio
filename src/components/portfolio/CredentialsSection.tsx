"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Education, Experience } from "@/lib/mockData";
import { GraduationCap, Briefcase, Calendar, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

interface CredentialsSectionProps {
  education: Education[];
  experience: Experience[];
}

export default function CredentialsSection({ education, experience }: CredentialsSectionProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0); // Default first item open

  const toggleAccordion = (idx: number) => {
    setExpandedIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="credentials" className="py-24 relative overflow-hidden bg-white border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* Header */}
        <div className="text-left mb-16">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Work Experience Accordion (Lg: col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-lg font-black text-zinc-950 flex items-center gap-2.5 mb-4 pl-1">
              <Briefcase className="w-5 h-5 text-violet-600" /> Work History
            </h4>

            <div className="space-y-4">
              {experience.map((job, idx) => {
                const isExpanded = expandedIdx === idx;

                return (
                  <motion.div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? "bg-zinc-50 border-zinc-300 shadow-sm" 
                        : "bg-white border-zinc-200 hover:border-zinc-300"
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
                          <span className="text-[9px] font-bold text-violet-600 bg-violet-500/5 border border-violet-500/10 px-2.5 py-0.5 rounded-full uppercase">
                            {job.company}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-zinc-400 uppercase">
                          <Calendar className="w-3 h-3" /> {job.timeline}
                        </span>
                      </div>
                      <div className="text-zinc-400 p-1.5 rounded-lg bg-white border border-zinc-100 shadow-sm">
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
                          transition={{ duration: 0.25 }}
                          className="border-t border-zinc-200"
                        >
                          <div className="p-5 bg-white space-y-4 font-sans text-xs sm:text-sm">
                            
                            {/* Responsibilities */}
                            <div className="space-y-2">
                              <h6 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Responsibilities</h6>
                              {job.responsibilities.map((resp, respIdx) => (
                                <p key={respIdx} className="text-zinc-600 leading-relaxed pl-3 border-l border-zinc-200">
                                  {resp}
                                </p>
                              ))}
                            </div>

                            {/* Achievements */}
                            <div className="space-y-2 pt-3 border-t border-zinc-100">
                              <h6 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Achievements</h6>
                              {job.achievements.map((ach, achIdx) => (
                                <p key={achIdx} className="text-zinc-600 leading-relaxed pl-3 border-l border-zinc-200">
                                  {ach}
                                </p>
                              ))}
                            </div>

                            {/* Tech Badges */}
                            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100">
                              {job.technologies.map((tech, techIdx) => (
                                <span 
                                  key={techIdx} 
                                  className="px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-[9px] font-bold text-zinc-500"
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
                );
              })}
            </div>
          </div>

          {/* Right Column: Education Timeline (Lg: col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-lg font-black text-zinc-950 flex items-center gap-2.5 mb-4 pl-1">
              <GraduationCap className="w-5 h-5 text-cyan-600" /> Education
            </h4>

            <div className="relative border-l-2 border-zinc-200 ml-4 pl-5 space-y-8">
              {education.map((edu, idx) => (
                <motion.div 
                  key={idx}
                  className="relative group space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Dot node */}
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-cyan-500" />
                  
                  <span className="text-[9px] font-bold text-cyan-600 uppercase tracking-wider block">
                    {edu.timeline}
                  </span>
                  <h5 className="font-extrabold text-zinc-950 text-sm leading-tight group-hover:text-cyan-600 transition-colors">
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
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
