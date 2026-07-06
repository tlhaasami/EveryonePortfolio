"use client";

import { motion } from "framer-motion";
import { Profile } from "@/lib/mockData";
import { Compass, Lightbulb, GraduationCap } from "lucide-react";

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-zinc-950/20">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Story & Background
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Biography & Focus Details */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-4">Professional Profile</h4>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
                {profile.biography}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-800/60">
                
                {/* Current Focus */}
                <div className="space-y-2">
                  <h5 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-violet-400" /> Current Focus
                  </h5>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {profile.currentFocus}
                  </p>
                </div>

                {/* Interests */}
                <div className="space-y-2.5">
                  <h5 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-cyan-400" /> Interests
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.interests.map((interest, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-zinc-950/60 border border-zinc-800/50 text-xs font-medium text-zinc-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Timeline - Right side */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-lg font-bold text-white mb-2 pl-4">Milestones</h4>
            <div className="relative border-l border-zinc-800/80 ml-6 pl-6 space-y-8">
              {profile.timeline.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="relative group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-zinc-900 border-2 border-violet-500 group-hover:bg-violet-400 transition-colors" />
                  
                  <span className="text-[10px] font-bold text-violet-400 tracking-wider uppercase block mb-1">
                    {item.year}
                  </span>
                  <h5 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
