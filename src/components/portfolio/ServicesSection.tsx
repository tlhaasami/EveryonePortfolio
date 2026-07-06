"use client";

import { motion } from "framer-motion";
import { Service } from "@/lib/mockData";
import { Sparkles, Terminal, Layers } from "lucide-react";

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-zinc-950/40">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Offerings
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Freelance & Consulting Services
          </motion.h3>
          <motion.p 
            className="text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Providing expert consulting, web animations, and clean architecture packages to build digital models.
          </motion.p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, idx) => {
            const isFirst = idx === 0;

            return (
              <motion.div
                key={idx}
                className={`p-8 rounded-3xl border backdrop-blur-md flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isFirst
                    ? "bg-gradient-to-br from-violet-950/20 via-zinc-900/60 to-zinc-900/40 border-violet-500/20 hover:border-violet-500/40 shadow-lg shadow-violet-500/5"
                    : "bg-zinc-900/40 border-zinc-800/80 hover:border-cyan-500/30"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Glow Ring for First (Featured) Service */}
                {isFirst && (
                  <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-violet-500/5 blur-[50px] group-hover:bg-violet-500/10 transition-all" />
                )}

                <div>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${
                    isFirst 
                      ? "bg-violet-500/10 border-violet-500/20 text-violet-400" 
                      : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                  }`}>
                    {isFirst ? <Sparkles className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                  </div>

                  {/* Title & Pricing */}
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <h4 className="text-xl font-bold text-white leading-tight">{service.name}</h4>
                    <span className="text-sm font-bold text-violet-400 bg-violet-500/5 border border-violet-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {service.pricing}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">{service.description}</p>
                </div>

                {/* Tech Badges */}
                <div className="pt-6 border-t border-zinc-800/60">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-3">Technologies</span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.map((tech, techIdx) => (
                      <span 
                        key={techIdx} 
                        className="px-2.5 py-0.5 rounded-md bg-zinc-950/60 border border-zinc-800/50 text-[10px] font-semibold text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
