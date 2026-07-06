"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Award } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../shared/icons";
import { Profile } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";
import ThreeDBackground from "./ThreeDBackground";

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden bg-grid-pattern border-b border-zinc-200 bg-white">
      {/* 3D Interactive Canvas */}
      <ThreeDBackground />

      {/* Glow blobs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-violet-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-cyan-200/40 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-5xl mx-auto">
          
          {/* Left Column: Text & CTAs */}
          <motion.div 
            className="flex-1 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Availability Badge */}
            {profile.availabilityStatus === "available" && (
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[10px] font-bold tracking-wider uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for projects
              </motion.div>
            )}

            {/* Name + Role */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950">
                {profile.name}
              </h1>
              <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                {profile.title}
              </p>
            </div>

            {/* One-Line Intro */}
            <p className="text-zinc-800 text-base sm:text-lg font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
              {profile.introduction}
            </p>

            {/* Short Paragraph */}
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              {profile.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a 
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-zinc-900/10 active:scale-98"
              >
                View Work <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-wider transition-colors active:scale-98"
              >
                Contact Me <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links Directly Under CTAs */}
            <div className="flex items-center justify-center lg:justify-start gap-5 pt-4">
              <a 
                href={profile.socialLinks.github} 
                target="_blank" 
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-900 transition-colors p-2 rounded-lg hover:bg-zinc-100"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a 
                href={profile.socialLinks.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-900 transition-colors p-2 rounded-lg hover:bg-zinc-100"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              {profile.socialLinks.kaggle && (
                <a 
                  href={profile.socialLinks.kaggle} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-zinc-900 transition-colors p-2 rounded-lg hover:bg-zinc-100 font-bold text-xs"
                >
                  Kaggle
                </a>
              )}
              {profile.socialLinks.medium && (
                <a 
                  href={profile.socialLinks.medium} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-zinc-900 transition-colors p-2 rounded-lg hover:bg-zinc-100 font-bold text-xs"
                >
                  Medium
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Column: Circle Photo */}
          <motion.div 
            className="flex-1 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            {/* Spinning decorative frame rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full border border-zinc-200/80 animate-[spin_50s_linear_infinite]" />
              <div className="absolute w-[260px] sm:w-[320px] h-[260px] sm:h-[320px] rounded-full border border-dashed border-zinc-300/60 animate-[spin_30s_linear_infinite_reverse]" />
            </div>

            {/* Circular Image frame */}
            <div className="relative w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full overflow-hidden border-4 border-white shadow-2xl bg-zinc-100 group">
              <SkeletonImage 
                src={profile.heroImage} 
                alt={profile.name} 
                fill 
                className="object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
