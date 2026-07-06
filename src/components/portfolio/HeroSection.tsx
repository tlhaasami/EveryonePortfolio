"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/icons";
import { Profile } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";
import ThreeDBackground from "./ThreeDBackground";
import { Magnetic, TextReveal, FadeInUp, StaggerContainer, StaggerItem } from "./Animations";

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center py-20 overflow-hidden bg-grid-pattern bg-white wave-divider">
      <ThreeDBackground />

      {/* Glow blobs */}
      <div className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full bg-[hsl(262,83%,85%)] opacity-30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-[hsl(175,72%,80%)] opacity-25 blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[hsl(35,92%,85%)] opacity-15 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
          
          {/* Left Column */}
          <div className="flex-1 text-center lg:text-left space-y-7">
            
            {/* Floating Availability Badge */}
            {profile.availabilityStatus === "available" && (
              <FadeInUp delay={0.2} distance={15}>
                <div 
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-emerald-700 text-[10px] font-bold tracking-wider uppercase border border-emerald-500/20"
                  style={{ animation: "float 6s ease-in-out infinite" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Available for projects
                </div>
              </FadeInUp>
            )}

            {/* Name with word-by-word reveal */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.1]">
                <TextReveal text={profile.name} delay={0.3} />
              </h1>
              <FadeInUp delay={0.6} distance={20}>
                <p className="text-lg sm:text-xl lg:text-2xl font-extrabold gradient-text">
                  {profile.title}
                </p>
              </FadeInUp>
            </div>

            {/* Intro */}
            <FadeInUp delay={0.75} distance={20}>
              <p className="text-zinc-700 text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                {profile.introduction}
              </p>
            </FadeInUp>

            <FadeInUp delay={0.85} distance={20}>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                {profile.subtitle}
              </p>
            </FadeInUp>

            {/* CTAs with magnetic hover */}
            <FadeInUp delay={0.95} distance={20}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
                <Magnetic strength={0.15}>
                  <a 
                    href="#projects"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(262,83%,48%)] hover:from-[hsl(262,83%,52%)] hover:to-[hsl(262,83%,42%)] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-violet-500/20 active:scale-[0.98] hover:shadow-xl hover:shadow-violet-500/30"
                  >
                    View Work <ArrowRight className="w-4 h-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a 
                    href="#contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl glass text-zinc-700 font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/80 active:scale-[0.98] border border-zinc-200/60"
                  >
                    Contact Me <MessageSquare className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>
            </FadeInUp>

            {/* Social Links with stagger */}
            <StaggerContainer className="flex items-center justify-center lg:justify-start gap-3 pt-3" staggerDelay={0.06}>
              {[
                { href: profile.socialLinks.github, icon: <GithubIcon className="w-4.5 h-4.5" />, label: "GitHub" },
                { href: profile.socialLinks.linkedin, icon: <LinkedinIcon className="w-4.5 h-4.5" />, label: "LinkedIn" },
              ].map((social, idx) => (
                <StaggerItem key={idx}>
                  <Magnetic strength={0.25}>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-zinc-900 transition-all duration-300 p-2.5 rounded-xl hover:bg-zinc-100 hover:shadow-sm"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  </Magnetic>
                </StaggerItem>
              ))}
              {profile.socialLinks.kaggle && (
                <StaggerItem>
                  <a href={profile.socialLinks.kaggle} target="_blank" rel="noreferrer"
                    className="text-zinc-400 hover:text-zinc-900 transition-all duration-300 p-2.5 rounded-xl hover:bg-zinc-100 hover:shadow-sm font-bold text-xs">
                    Kaggle
                  </a>
                </StaggerItem>
              )}
              {profile.socialLinks.medium && (
                <StaggerItem>
                  <a href={profile.socialLinks.medium} target="_blank" rel="noreferrer"
                    className="text-zinc-400 hover:text-zinc-900 transition-all duration-300 p-2.5 rounded-xl hover:bg-zinc-100 hover:shadow-sm font-bold text-xs">
                    Medium
                  </a>
                </StaggerItem>
              )}
            </StaggerContainer>
          </div>

          {/* Right Column: Photo */}
          <motion.div 
            className="flex-1 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
          >
            {/* Animated conic gradient ring */}
            <div className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full animate-[spin_12s_linear_infinite]"
              style={{
                background: "conic-gradient(from 0deg, hsl(262, 83%, 58%), hsl(175, 72%, 42%), hsl(35, 92%, 62%), hsl(262, 83%, 58%))",
                padding: "3px",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
              }}
            />

            <div className="absolute w-[310px] sm:w-[380px] h-[310px] sm:h-[380px] rounded-full border border-zinc-200/40 animate-[spin_50s_linear_infinite] pointer-events-none" />

            <div className="relative w-[250px] sm:w-[310px] h-[250px] sm:h-[310px] rounded-full overflow-hidden border-4 border-white shadow-2xl bg-zinc-100 group">
              <SkeletonImage 
                src={profile.heroImage} 
                alt={profile.name} 
                fill 
                className="object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
