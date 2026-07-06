"use client";

import { motion } from "framer-motion";
import { Education, Certificate } from "@/lib/mockData";
import { GraduationCap, Award, ExternalLink, Calendar, BookOpen } from "lucide-react";

interface CredentialsSectionProps {
  education: Education[];
  certificates: Certificate[];
}

export default function CredentialsSection({ education, certificates }: CredentialsSectionProps) {
  return (
    <section id="credentials" className="py-24 relative overflow-hidden bg-zinc-950/20">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Qualifications
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Education & Certifications
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Education */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-white flex items-center gap-2.5 mb-2 pl-2">
              <GraduationCap className="w-6 h-6 text-violet-400" /> Academic Journey
            </h4>
            
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md hover:border-violet-500/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h5 className="text-lg font-bold text-white">{edu.degree}</h5>
                    <p className="text-sm text-zinc-400 font-medium">{edu.institution}</p>
                  </div>
                  <span className="self-start sm:self-center inline-flex items-center gap-1 text-[10px] font-bold text-violet-400 tracking-wider bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/10 uppercase">
                    <Calendar className="w-2.5 h-2.5" /> {edu.timeline}
                  </span>
                </div>

                <div className="text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-2">
                  Performance: <span className="text-white font-bold">{edu.cgpa}</span>
                </div>

                {/* Coursework */}
                <div className="mt-4">
                  <h6 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Key Coursework
                  </h6>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, courseIdx) => (
                      <span 
                        key={courseIdx}
                        className="px-2 py-0.5 rounded bg-zinc-950/60 border border-zinc-800/40 text-[10px] text-zinc-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mt-6 pt-4 border-t border-zinc-800/60">
                  <ul className="list-disc pl-4 text-zinc-300 space-y-1.5 text-xs sm:text-sm">
                    {edu.achievements.map((ach, achIdx) => (
                      <li key={achIdx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Certifications */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-white flex items-center gap-2.5 mb-2 pl-2">
              <Award className="w-6 h-6 text-cyan-400" /> Professional Certificates
            </h4>

            <div className="space-y-6">
              {certificates.map((cert, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md hover:border-cyan-500/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                        {cert.name}
                      </h5>
                      <p className="text-xs text-zinc-400 mt-1">{cert.organization} | Issued {cert.date}</p>
                    </div>
                    <a 
                      href={cert.verificationLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-zinc-950/50 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-3">
                    ID: {cert.credentialId}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsEarned.map((skill, skillIdx) => (
                      <span 
                        key={skillIdx}
                        className="px-2 py-0.5 rounded-md bg-zinc-950/60 border border-zinc-800/50 text-[10px] font-medium text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
