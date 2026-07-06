"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Award } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../shared/icons";
import { Profile } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";
import ThreeDBackground from "./ThreeDBackground";

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden bg-grid-pattern">
      <ThreeDBackground />
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Availability Indicator */}
            {profile.availabilityStatus === "available" && (
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Available for Projects
              </motion.div>
            )}

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-medium text-zinc-300 mb-6">
              {profile.title}
            </h2>

            <p className="text-zinc-400 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed mb-8">
              {profile.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <a 
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-violet-500/25"
              >
                Let's Connect <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href={profile.cvUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Download CV <Download className="w-4 h-4" />
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <a 
                href={profile.socialLinks.github} 
                target="_blank" 
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
              <a 
                href={profile.socialLinks.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
              {profile.socialLinks.twitter && (
                <a 
                  href={profile.socialLinks.twitter} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <TwitterIcon className="w-6 h-6" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Luxury Graphic Render / Photo */}
          <motion.div 
            className="flex-1 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            {/* Glowing Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] rounded-full border border-violet-500/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full border border-dashed border-cyan-500/10 animate-[spin_20s_linear_infinite_reverse]" />
            </div>

            {/* Main Interactive Shape Container */}
            <div className="relative w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md p-4 group">
              <SkeletonImage 
                src={profile.heroImage} 
                alt={profile.name} 
                fill 
                className="object-cover rounded-2xl opacity-90 transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Overlay Interactive Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/50 backdrop-blur-md flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Top Rated Developer</h4>
                  <p className="text-xs text-zinc-400">Delivering premium codebases</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-24 pt-12 border-t border-zinc-900 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {profile.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-white mb-2 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
