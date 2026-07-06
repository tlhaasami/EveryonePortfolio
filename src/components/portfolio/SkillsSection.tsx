"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skill } from "@/lib/mockData";
import { Code2, Monitor, Cpu, Database, Cloud, Wrench } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

const CATEGORY_MAP = {
  languages: { label: "Languages", icon: Code2, color: "text-violet-400 border-violet-500/20" },
  frontend: { label: "Frontend", icon: Monitor, color: "text-cyan-400 border-cyan-500/20" },
  backend: { label: "Backend", icon: Cpu, color: "text-fuchsia-400 border-fuchsia-500/20" },
  databases: { label: "Databases", icon: Database, color: "text-emerald-400 border-emerald-500/20" },
  "cloud-devops": { label: "Cloud & DevOps", icon: Cloud, color: "text-amber-400 border-amber-500/20" },
  tools: { label: "Tools", icon: Wrench, color: "text-sky-400 border-sky-500/20" }
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...Object.keys(CATEGORY_MAP)];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-zinc-950/20">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Expertise
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Skillset
          </motion.h3>
          <motion.p 
            className="text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Categorized view of my engineering competencies, tools, and platforms that I use to deliver solutions.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            const catInfo = cat !== "all" ? CATEGORY_MAP[cat as keyof typeof CATEGORY_MAP] : null;
            const Icon = catInfo?.icon;
            
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 border ${
                  isActive 
                    ? "bg-gradient-to-r from-violet-600 to-cyan-600 border-transparent text-white shadow-lg shadow-violet-500/10" 
                    : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {cat === "all" ? "All Skills" : catInfo?.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, idx) => {
            const catInfo = CATEGORY_MAP[skill.category];
            const Icon = catInfo.icon;

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between group hover:border-violet-500/20"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/50 ${catInfo.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-violet-400 transition-colors text-sm sm:text-base">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                        {catInfo.label}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 font-semibold bg-zinc-950/40 px-2 py-1 rounded-md border border-zinc-800/30">
                    {skill.years} {skill.years === 1 ? "yr" : "yrs"}
                  </span>
                </div>

                {/* Level indicator */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-zinc-500">Proficiency</span>
                    <span className="text-xs font-semibold text-zinc-300">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/20">
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
