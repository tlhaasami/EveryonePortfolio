"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Certificate, Competition } from "@/lib/mockData";
import { Award, Calendar, Bookmark, X, Trophy } from "lucide-react";
import CertificateCard from "./CertificateCard";
import SkeletonImage from "./SkeletonImage";
import { FadeInUp } from "./Animations";

interface AchievementsSectionProps {
  certificates: Certificate[];
  competitions: Competition[];
}

// Reusable Horizontal Scroll Row Component
function HorizontalScrollRow({ children }: { children: React.ReactNode }) {
  const [canScroll, setCanScroll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const directionRef = useRef(1); // 1 = right, -1 = left

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  useEffect(() => {
    const checkScroll = () => {
      const el = scrollRef.current;
      if (el) {
        setCanScroll(el.scrollWidth > el.clientWidth);
      }
    };
    checkScroll();
    const timer = setTimeout(checkScroll, 200);

    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [children]);

  useEffect(() => {
    if (!canScroll) return;
    const el = scrollRef.current;
    if (!el) return;

    let frameId: number;
    const speed = 0.45;

    const tick = () => {
      if (!isHovered) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        scrollPosRef.current += speed * directionRef.current;

        if (scrollPosRef.current >= maxScroll) {
          scrollPosRef.current = maxScroll;
          directionRef.current = -1;
        } else if (scrollPosRef.current <= 0) {
          scrollPosRef.current = 0;
          directionRef.current = 1;
        }

        el.scrollLeft = Math.round(scrollPosRef.current);
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered, canScroll]);

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

  return (
    <div 
      className="relative group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {canScroll && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 opacity-100 transition-opacity" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 opacity-100 transition-opacity" />
        </>
      )}

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className={`flex gap-6 py-4 scrollbar-none snap-mandatory ${
          canScroll ? "overflow-x-auto cursor-grab active:cursor-grabbing" : "overflow-x-hidden"
        }`}
      >
        {canScroll && <div className="w-1.5 flex-shrink-0" />}
        {children}
        {canScroll && <div className="w-1.5 flex-shrink-0" />}
      </div>
    </div>
  );
}

export default function AchievementsSection({ certificates, competitions }: AchievementsSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const badgeIcons: Record<string, any> = {
    trophy: <Trophy className="w-3.5 h-3.5" />,
    medal: <Award className="w-3.5 h-3.5" />,
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-white border-b border-zinc-200 wave-divider">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-16">
        
        {/* Section Header */}
        <div className="text-left">
          <FadeInUp distance={15}>
            <h2 className="text-xs font-bold tracking-widest text-[hsl(262,83%,58%)] uppercase mb-2">My Showcase</h2>
          </FadeInUp>
          <FadeInUp delay={0.1} distance={20}>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">Achievements & Credentials</h3>
          </FadeInUp>
          <FadeInUp delay={0.2} distance={15}>
            <p className="text-xs text-zinc-400 mt-1">Verified industry certifications and honors from technology hackathons.</p>
          </FadeInUp>
        </div>

        {/* 1. Certifications Row */}
        {certificates.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 pl-1">Professional Certifications</h4>
            <HorizontalScrollRow>
              {certificates.map((cert, idx) => (
                <CertificateCard key={idx} cert={cert} onClick={() => setSelectedCert(cert)} />
              ))}
            </HorizontalScrollRow>
          </div>
        )}

        {/* 2. Competitions Row */}
        {competitions.length > 0 && (
          <div className="space-y-4 pt-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 pl-1">Hackathons & Wins</h4>
            <HorizontalScrollRow>
              {competitions.map((comp, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl bg-white border border-zinc-200/80 hover:shadow-lg hover:border-zinc-300/60 transition-all duration-300 overflow-hidden group flex flex-col justify-between relative"
                >
                  {/* Image with white padding frame and aspect 4:3 */}
                  <div className="relative aspect-[4/3] bg-zinc-100/60 w-full overflow-hidden border-b border-zinc-100 shimmer-overlay p-3 flex items-center justify-center">
                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-sm bg-white border border-zinc-150 flex items-center justify-center">
                      <SkeletonImage 
                        src={comp.image} 
                        alt={comp.title}
                        fill
                        className="object-contain p-1 transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    {comp.badge && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[9px] font-black uppercase tracking-wider shadow-sm z-10">
                        {badgeIcons[comp.badgeIcon] || <Trophy className="w-3 h-3" />}
                        {comp.badge}
                      </div>
                    )}
                  </div>
                  {/* Content */}
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
            </HorizontalScrollRow>
          </div>
        )}

      </div>

      {/* Certificate details modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
            <motion.div
              className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-900 flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-150 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-all active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-violet-600/10 border border-violet-500/10 text-violet-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg leading-snug">{selectedCert.name}</h4>
                    <p className="text-xs text-zinc-400 font-semibold">{selectedCert.organization}</p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 p-2 flex items-center justify-center">
                  {selectedCert.image ? (
                    <SkeletonImage 
                      src={selectedCert.image} 
                      alt={selectedCert.name}
                      fill
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                      <Award className="w-12 h-12" />
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-100">
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-455 uppercase tracking-widest block font-bold">Issue Date</span>
                      <span className="text-zinc-700 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {selectedCert.date}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-455 uppercase tracking-widest block font-bold">Credential ID</span>
                      <span className="text-zinc-700 flex items-center gap-1.5 font-mono"><Bookmark className="w-3.5 h-3.5" /> {selectedCert.credentialId}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-zinc-455 uppercase tracking-widest block font-bold">Skills Authenticated</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCert.skillsEarned.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-[10px] font-bold text-zinc-650"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedCert.verificationLink && (
                  <a
                    href={selectedCert.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] shadow-md shadow-zinc-950/10 cursor-pointer"
                  >
                    Verify Credential Online
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
