"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/icons";
import { Profile, AppearanceSettings } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";
import ThreeDBackground from "./ThreeDBackground";
import { Magnetic, TextReveal, FadeInUp, StaggerContainer, StaggerItem, TextAnimationWrapper } from "./Animations";

interface HeroSectionProps {
  profile: Profile;
  appearance?: AppearanceSettings;
}

export default function HeroSection({ profile, appearance }: HeroSectionProps) {
  // Appearance Configurations
  const placement = appearance?.profilePicPlacement || "right";
  const shape = appearance?.profilePicShape || "circle";
  const picSize = appearance?.profilePicSize || 310;

  // Derive sizes for rings
  const outerRingSize = picSize + 70;
  const innerRingSize = picSize + 30;

  // Dynamic Class Mappings
  const containerClass = placement === "center"
    ? "flex flex-col items-center text-center gap-12 max-w-4xl mx-auto"
    : placement === "left"
      ? "flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 max-w-6xl mx-auto"
      : "flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto";

  const textColClass = placement === "center"
    ? "text-center space-y-7 flex flex-col items-center justify-center w-full"
    : "text-center lg:text-left space-y-7 flex-1";

  const ctasClass = placement === "center"
    ? "flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 w-full"
    : "flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3";
    
  const socialsClass = placement === "center"
    ? "flex items-center justify-center gap-3 pt-3 w-full"
    : "flex items-center justify-center lg:justify-start gap-3 pt-3 w-full";

  const shapeClass = shape === "square"
    ? "rounded-none"
    : shape === "rounded-square"
      ? "rounded-[2.5rem]"
      : "rounded-full";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center py-20 overflow-hidden bg-grid-pattern bg-white wave-divider">
      <ThreeDBackground />

      {/* Glow blobs */}
      <div className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full bg-[hsl(262,83%,85%)] opacity-30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-[hsl(175,72%,80%)] opacity-25 blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[hsl(35,92%,85%)] opacity-15 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={containerClass}>
          
          {/* Left Column */}
          <div className={textColClass}>
            
            {/* Floating Availability Badge */}
            {profile.availabilityStatus === "available" && (
              <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.2} distance={15}>
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
              </TextAnimationWrapper>
            )}

            {/* Name with customizable animations */}
            <div className="space-y-3 w-full">
              <style dangerouslySetInnerHTML={{
                __html: `
                  @keyframes textGlow {
                    0%, 100% { text-shadow: 0 0 6px rgba(139, 92, 246, 0.15), 0 0 12px rgba(139, 92, 246, 0.1); }
                    50% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.45), 0 0 35px rgba(139, 92, 246, 0.25); }
                  }
                  @keyframes textPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                  }
                  @keyframes textWiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-0.5deg); }
                    75% { transform: rotate(0.5deg); }
                  }
                `
              }} />

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.1] w-full ${
                appearance?.continuousAnimationStyle === "glowing" 
                  ? "animate-[textGlow_3s_ease-in-out_infinite]"
                  : appearance?.continuousAnimationStyle === "pulsing"
                    ? "animate-[textPulse_4s_ease-in-out_infinite]"
                    : appearance?.continuousAnimationStyle === "wiggle"
                      ? "animate-[textWiggle_5s_ease-in-out_infinite]"
                      : ""
              }`}>
                {appearance?.textAnimationStyle === "typewriter" ? (
                  <TextAnimationWrapper style="typewriter" delay={0.3}>
                    {profile.name}
                  </TextAnimationWrapper>
                ) : (
                  <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.3} distance={30}>
                    {profile.name}
                  </TextAnimationWrapper>
                )}
              </h1>
              <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.6} distance={20}>
                <p className="text-lg sm:text-xl lg:text-2xl font-extrabold gradient-text">
                  {profile.title}
                </p>
              </TextAnimationWrapper>
            </div>

            {/* Intro */}
            <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.75} distance={20}>
              <p className="text-zinc-700 text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                {profile.introduction}
              </p>
            </TextAnimationWrapper>

            <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.85} distance={20}>
              <p className="text-zinc-450 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                {profile.subtitle}
              </p>
            </TextAnimationWrapper>

            {/* CTAs with magnetic hover and new outline Contact Me */}
            <TextAnimationWrapper style={appearance?.textAnimationStyle} delay={0.95} distance={20}>
              <div className={ctasClass}>
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,58%)] hover:text-white text-[hsl(262,83%,58%)] font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] hover:shadow-lg hover:shadow-violet-500/20 cursor-pointer"
                  >
                    Contact Me <MessageSquare className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>
            </TextAnimationWrapper>

            {/* Social Links with stagger */}
            <StaggerContainer className={socialsClass} staggerDelay={0.06}>
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
            </StaggerContainer>
          </div>

          {/* Right Column: Photo with dynamic size, shape, and placement */}
          <motion.div 
            className="flex-1 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
          >
            {/* Animated conic gradient ring */}
            <div 
              className={`absolute animate-[spin_12s_linear_infinite] ${shapeClass}`}
              style={{
                width: innerRingSize,
                height: innerRingSize,
                background: "conic-gradient(from 0deg, hsl(262, 83%, 58%), hsl(175, 72%, 42%), hsl(35, 92%, 62%), hsl(262, 83%, 58%))",
                padding: "3px",
                WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))`,
                mask: `radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))`,
              }}
            />

            <div 
              className={`absolute border border-zinc-200/40 animate-[spin_50s_linear_infinite] pointer-events-none ${shapeClass}`}
              style={{ width: outerRingSize, height: outerRingSize }}
            />

            <div 
              className={`relative overflow-hidden border-4 border-white shadow-2xl bg-zinc-100 group ${shapeClass}`}
              style={{ width: picSize, height: picSize }}
            >
              <SkeletonImage 
                src={profile.heroImage} 
                alt={profile.name} 
                fill 
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${shapeClass}`}
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
