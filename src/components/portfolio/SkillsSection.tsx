"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skill } from "@/lib/mockData";
import { Code2, Monitor, Cpu, Database, Cloud, Wrench, Shield } from "lucide-react";
import SkeletonImage from "./SkeletonImage";

interface SkillsSectionProps {
  skills: Skill[];
}

const CATEGORY_MAP = {
  languages: { label: "Languages", icon: Code2, color: "text-violet-600 border-violet-500/10" },
  frontend: { label: "Frontend", icon: Monitor, color: "text-cyan-600 border-cyan-500/10" },
  backend: { label: "Backend", icon: Cpu, color: "text-fuchsia-600 border-fuchsia-500/10" },
  databases: { label: "Databases", icon: Database, color: "text-emerald-600 border-emerald-500/10" },
  "cloud-devops": { label: "DevOps", icon: Cloud, color: "text-amber-600 border-amber-500/10" },
  tools: { label: "Tools", icon: Wrench, color: "text-sky-600 border-sky-500/10" }
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...Object.keys(CATEGORY_MAP)];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-zinc-50/50 border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Expertise
          </motion.h2>
          <motion.h3 
            className="text-2xl sm:text-3xl font-black text-zinc-950 mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Skillset
          </motion.h3>
          <p className="text-zinc-505 text-xs">
            Categorized list of core technologies, coding tools, and environments I use to develop projects.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            const catInfo = cat !== "all" ? CATEGORY_MAP[cat as keyof typeof CATEGORY_MAP] : null;
            const Icon = catInfo?.icon;
            
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-205 border ${
                  isActive 
                    ? "bg-zinc-900 border-transparent text-white shadow-md shadow-zinc-900/10" 
                    : "bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300"
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {cat === "all" ? "All Skills" : catInfo?.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid - Scaled down size (cols: 3 on mobile, 4 sm, 6 lg; gap: 3) */}
        <motion.div 
          layout
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {filteredSkills.map((skill) => {
            const catInfo = CATEGORY_MAP[skill.category];

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col items-center text-center justify-between group hover:border-violet-500/30 hover:shadow-md transition-all duration-300 h-fit min-h-[140px]"
              >
                {/* Tech logo wrapper - Scaled down size (w-9 h-9) */}
                <div className="w-9 h-9 flex items-center justify-center mb-3 flex-shrink-0">
                  {skill.logoUrl ? (
                    <SkeletonImage 
                      src={skill.logoUrl} 
                      alt={skill.name}
                      width={26}
                      height={26}
                      className="object-contain"
                      fallbackIcon={<Shield className="w-5 h-5 text-zinc-300" />}
                    />
                  ) : (
                    <Shield className="w-5 h-5 text-zinc-300" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-zinc-900 group-hover:text-violet-600 transition-colors text-[11px] sm:text-xs leading-snug">
                    {skill.name}
                  </h4>
                  <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider block">
                    {catInfo.label}
                  </span>
                </div>

                {/* Progress bar - Scaled down margins */}
                <div className="w-full mt-3">
                  <div className="flex justify-between items-center text-[8px] text-zinc-400 font-bold mb-1">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full h-0.5 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
