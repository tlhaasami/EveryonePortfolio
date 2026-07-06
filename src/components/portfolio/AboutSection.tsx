"use client";

import { motion } from "framer-motion";
import { Profile } from "@/lib/mockData";
import { Award, Briefcase, BookmarkCheck } from "lucide-react";

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  // Map icons for stats
  const statIcons = [
    <Briefcase className="w-5 h-5 text-violet-600" />,
    <BookmarkCheck className="w-5 h-5 text-cyan-600" />,
    <Award className="w-5 h-5 text-fuchsia-600" />
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white border-b border-zinc-100">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.h3 
            className="text-2xl sm:text-3xl font-black text-zinc-950"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Story & Biography
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Biography Text - Left side */}
          <div className="lg:col-span-7">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                {profile.biography}
              </p>
              
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/60">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Current Focus</h4>
                <p className="text-zinc-700 text-xs sm:text-sm font-medium leading-relaxed">{profile.currentFocus}</p>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats Grid - Right side */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {profile.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center gap-4 hover:shadow-md hover:border-zinc-300/80 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 flex-shrink-0">
                  {statIcons[idx] || <Award className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-2xl font-black text-zinc-950 leading-none block">{stat.value}</span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-1">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
