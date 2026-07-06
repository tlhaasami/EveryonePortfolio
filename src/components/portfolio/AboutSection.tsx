"use client";

import { Profile } from "@/lib/mockData";
import { Award, Briefcase, BookmarkCheck, Sparkles } from "lucide-react";
import ScrollParallaxWrapper from "./ScrollParallaxWrapper";
import { FadeInUp, SlideIn, AnimatedCounter, StaggerContainer, StaggerItem } from "./Animations";

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const statIcons = [
    <Briefcase key="b" className="w-5 h-5 text-[hsl(262,83%,58%)]" />,
    <BookmarkCheck key="c" className="w-5 h-5 text-[hsl(175,72%,42%)]" />,
    <Award key="a" className="w-5 h-5 text-[hsl(35,92%,62%)]" />,
  ];

  const statColors = [
    "from-violet-500/8 to-violet-500/0 border-violet-500/10",
    "from-teal-500/8 to-teal-500/0 border-teal-500/10",
    "from-amber-500/8 to-amber-500/0 border-amber-500/10",
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden bg-white border-b border-zinc-100 wave-divider">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[hsl(262,83%,92%)] opacity-20 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-left mb-14">
          <FadeInUp distance={15}>
            <h2 className="text-xs font-bold tracking-widest text-[hsl(262,83%,58%)] uppercase mb-2">About Me</h2>
          </FadeInUp>
          <FadeInUp delay={0.1} distance={20}>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">My Story & Biography</h3>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          
          {/* Biography */}
          <div className="lg:col-span-7">
            <ScrollParallaxWrapper rotateX={[4, 0]} offsetY={[-15, 15]}>
              <SlideIn direction="left" delay={0.15}>
                <div className="space-y-6">
                  <p className="text-zinc-600 text-sm sm:text-base leading-[1.8]">
                    {profile.biography}
                  </p>
                  
                  {/* Glassmorphism card */}
                  <FadeInUp delay={0.3} distance={25}>
                    <div className="p-6 rounded-2xl glass border border-zinc-200/40 relative overflow-hidden">
                      <div className="absolute top-3 right-3 text-violet-300">
                        <Sparkles className="w-5 h-5 animate-[glow-pulse_3s_ease-in-out_infinite]" />
                      </div>
                      <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2">Current Focus</h4>
                      <p className="text-zinc-700 text-xs sm:text-sm font-medium leading-relaxed">{profile.currentFocus}</p>
                    </div>
                  </FadeInUp>
                </div>
              </SlideIn>
            </ScrollParallaxWrapper>
          </div>

          {/* Stats with animated counters */}
          <div className="lg:col-span-5">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4" staggerDelay={0.12}>
              {profile.stats.map((stat, idx) => (
                <StaggerItem key={idx}>
                  <ScrollParallaxWrapper offsetY={[-(20 + idx * 8), 20 + idx * 8]} rotateX={[2, 0]}>
                    <div className={`p-5 rounded-2xl bg-gradient-to-br ${statColors[idx]} border shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300 group`}>
                      <div className="p-3 rounded-xl bg-white/80 border border-zinc-100 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                        {statIcons[idx] || <Award className="w-5 h-5" />}
                      </div>
                      <div>
                        <AnimatedCounter value={stat.value} className="text-2xl font-black text-zinc-950 leading-none block" />
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-1">{stat.label}</span>
                      </div>
                    </div>
                  </ScrollParallaxWrapper>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
