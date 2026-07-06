"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "@/lib/mockData";
import { Code2, Monitor, Cpu, Database, Cloud, Wrench, Shield } from "lucide-react";
import SkeletonImage from "./SkeletonImage";

interface SkillsSectionProps {
  skills: Skill[];
}

const CATEGORY_MAP: Record<string, { label: string; icon: typeof Code2; gradient: string }> = {
  languages: { label: "Languages", icon: Code2, gradient: "from-violet-500 to-violet-600" },
  frontend: { label: "Frontend", icon: Monitor, gradient: "from-cyan-500 to-teal-500" },
  backend: { label: "Backend", icon: Cpu, gradient: "from-fuchsia-500 to-purple-600" },
  databases: { label: "Databases", icon: Database, gradient: "from-emerald-500 to-green-600" },
  "cloud-devops": { label: "DevOps", icon: Cloud, gradient: "from-amber-500 to-orange-500" },
  tools: { label: "Tools", icon: Wrench, gradient: "from-sky-500 to-blue-600" },
};

// 3D tilt hook for skill cards (lighter tilt)
function useCardTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = ((rect.height / 2 - y) / rect.height) * 8;
    const tiltY = ((x - rect.width / 2) / rect.width) * 8;
    card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = `perspective(600px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

function SkillCard({ skill }: { skill: Skill }) {
  const { ref, handleMouseMove, handleMouseLeave } = useCardTilt();
  const catInfo = CATEGORY_MAP[skill.category];

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-3.5 rounded-2xl bg-white border border-zinc-200/80 flex flex-col items-center text-center justify-between group hover:border-zinc-300/60 hover:shadow-lg transition-all duration-300 h-fit min-h-[140px] relative overflow-hidden cursor-default"
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, box-shadow 0.3s, border-color 0.3s" }}
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-br from-violet-500/[0.04] via-transparent to-teal-500/[0.04]" />

      {/* Tech logo wrapper */}
      <div className="w-9 h-9 flex items-center justify-center mb-3 flex-shrink-0 relative z-10">
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

      <div className="space-y-0.5 relative z-10">
        <h4 className="font-extrabold text-zinc-900 group-hover:text-[hsl(262,83%,58%)] transition-colors text-[11px] sm:text-xs leading-snug">
          {skill.name}
        </h4>
        <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider block">
          {catInfo?.label}
        </span>
      </div>

      {/* Animated proficiency bar with gradient glow */}
      <div className="w-full mt-3 relative z-10">
        <div className="flex justify-between items-center text-[8px] text-zinc-400 font-bold mb-1">
          <span>Proficiency</span>
          <span>{skill.level}%</span>
        </div>
        <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden relative">
          <motion.div 
            className={`h-full bg-gradient-to-r ${catInfo?.gradient || "from-violet-500 to-cyan-500"} rounded-full relative`}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Glow pulse at tip when bar finishes animating */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-80 blur-[2px] animate-[glow-pulse_2s_ease-in-out_infinite]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...Object.keys(CATEGORY_MAP)];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-[#fafafa] border-b border-zinc-200 wave-divider-white">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[hsl(262,83%,90%)] opacity-15 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-[hsl(262,83%,58%)] uppercase mb-2"
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
          <p className="text-zinc-500 text-xs">
            Categorized list of core technologies, coding tools, and environments I use to develop projects.
          </p>
        </div>

        {/* Filter Navigation with sliding pill */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            const catInfo = cat !== "all" ? CATEGORY_MAP[cat] : null;
            const Icon = catInfo?.icon;
            
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 border ${
                  isActive 
                    ? "bg-zinc-900 border-transparent text-white shadow-lg shadow-zinc-900/15" 
                    : "bg-white border-zinc-200/80 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 hover:shadow-sm"
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {cat === "all" ? "All Skills" : catInfo?.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
