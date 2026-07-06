"use client";

import { useState, useRef, useEffect } from "react";
import { Trophy, Medal, Award } from "lucide-react";
import { Competition } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";
import { FadeInUp } from "./Animations";

interface CompetitionsSectionProps {
  competitions: Competition[];
}

export default function CompetitionsSection({ competitions }: CompetitionsSectionProps) {
  const [canScroll, setCanScroll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPosRef = useRef(0);
  const directionRef = useRef(1); // 1 = right, -1 = left
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Check if content overflows to enable scrolling
  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (el) {
        setCanScroll(el.scrollWidth > el.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [competitions]);

  // Ping-pong scrolling effect
  useEffect(() => {
    if (!canScroll || isHovered) return;

    let animFrame: number;
    const scrollSpeed = 0.45; // pixels per frame

    const animate = () => {
      const el = scrollRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;

      if (directionRef.current === 1) {
        scrollPosRef.current += scrollSpeed;
        if (scrollPosRef.current >= maxScroll - 1) {
          directionRef.current = -1;
          scrollPosRef.current = maxScroll;
        }
      } else {
        scrollPosRef.current -= scrollSpeed;
        if (scrollPosRef.current <= 1) {
          directionRef.current = 1;
          scrollPosRef.current = 0;
        }
      }

      el.scrollLeft = scrollPosRef.current;
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [canScroll, isHovered]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canScroll) return;
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsHovered(true);
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !canScroll) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftStartRef.current - walk;
    scrollPosRef.current = el.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsHovered(false);
  };

  const badgeIcons: Record<string, any> = {
    trophy: <Trophy className="w-3.5 h-3.5" />,
    medal: <Medal className="w-3.5 h-3.5" />,
    award: <Award className="w-3.5 h-3.5" />,
  };

  return (
    <section id="competitions" className="py-20 relative overflow-hidden bg-white border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-left mb-12">
          <FadeInUp distance={15}>
            <h2 className="text-xs font-bold tracking-widest text-[hsl(262,83%,58%)] uppercase mb-2">My Wins</h2>
          </FadeInUp>
          <FadeInUp delay={0.1} distance={20}>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">Hackathons & Competitions</h3>
          </FadeInUp>
          <FadeInUp delay={0.2} distance={15}>
            <p className="text-xs text-zinc-400 mt-1">Wins and rank certificates from tech competitions.</p>
          </FadeInUp>
        </div>

        {/* Carousel Row wrapper */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {/* Left/Right fading overlays */}
          {canScroll && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 opacity-100 transition-opacity" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 opacity-100 transition-opacity" />
            </>
          )}

          {/* Scrolling card row */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className={`flex gap-6 overflow-x-auto scrollbar-none pb-6 select-none ${
              canScroll ? "cursor-grab active:cursor-grabbing" : "cursor-default"
            }`}
          >
            {/* Start Spacer */}
            {canScroll && <div className="w-1.5 flex-shrink-0" />}

            {competitions.map((comp, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[260px] sm:w-[300px] rounded-2xl bg-white border border-zinc-200/80 hover:shadow-lg hover:border-zinc-300/60 transition-all duration-300 overflow-hidden group flex flex-col justify-between relative"
              >
                {/* Upper Winner Image */}
                <div className="relative aspect-[2/1] bg-zinc-100 w-full overflow-hidden border-b border-zinc-100 shimmer-overlay">
                  <SkeletonImage 
                    src={comp.image} 
                    alt={comp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {comp.badge && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[9px] font-black uppercase tracking-wider shadow-sm shadow-amber-500/20">
                      {badgeIcons[comp.badgeIcon] || <Trophy className="w-3 h-3" />}
                      {comp.badge}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <h4 className="font-extrabold text-zinc-950 text-sm sm:text-base leading-tight group-hover:text-[hsl(262,83%,58%)] transition-colors">
                    {comp.title}
                  </h4>
                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                    {comp.description}
                  </p>
                </div>
              </div>
            ))}

            {/* End Spacer */}
            {canScroll && <div className="w-1.5 flex-shrink-0" />}
          </div>
        </div>

      </div>
    </section>
  );
}
