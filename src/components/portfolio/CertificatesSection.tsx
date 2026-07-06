"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Certificate } from "@/lib/mockData";
import { Award, ExternalLink, ShieldCheck, Calendar, Bookmark, X } from "lucide-react";
import CertificateCard from "./CertificateCard";
import SkeletonImage from "./SkeletonImage";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const directionRef = useRef(1); // 1 = scrolling right, -1 = scrolling left
  const [isHovered, setIsHovered] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  // Mouse Drag to Scroll State refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  // Detect if scroll row actually overflows the screen
  useEffect(() => {
    const checkScroll = () => {
      const el = scrollRef.current;
      if (el) {
        setCanScroll(el.scrollWidth > el.clientWidth);
      }
    };
    checkScroll();
    const timer = setTimeout(checkScroll, 150); // Timeout to let images render layout sizes

    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [certificates]);

  // Fluid sub-pixel auto-scroll with Ping-Pong direction changes at boundaries
  useEffect(() => {
    if (!canScroll) return;
    const el = scrollRef.current;
    if (!el) return;

    let frameId: number;
    const speed = 0.55; // Pixels per frame crawl speed

    const tick = () => {
      if (!isHovered) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        // Update position based on direction
        scrollPosRef.current += speed * directionRef.current;

        // Bounce back from right edge
        if (scrollPosRef.current >= maxScroll) {
          scrollPosRef.current = maxScroll;
          directionRef.current = -1;
        }
        // Bounce back from left edge
        else if (scrollPosRef.current <= 0) {
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

  // Sync scroll tracker on manual scroll interaction
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (isHovered && canScroll) {
      scrollPosRef.current = el.scrollLeft;
    }
  };

  // Mouse drag-to-scroll handlers
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
    <section id="certificates" className="py-20 relative overflow-hidden bg-zinc-50/50 border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-left mb-12">
          <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2">My Credentials</h2>
          <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">Professional Certifications</h3>
          <p className="text-xs text-zinc-450 mt-1">Explore my verified certifications.</p>
        </div>

        {/* Carousel Row wrapper */}
        <div className="relative w-full overflow-hidden select-none">
          {/* Fading Edge Overlays - Only shown if scroll is active */}
          {canScroll && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-zinc-50 via-zinc-50/10 to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-zinc-50 via-zinc-50/10 to-transparent pointer-events-none z-10" />
            </>
          )}

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => canScroll && setIsHovered(true)}
            onMouseLeave={handleMouseUpOrLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onTouchStart={() => canScroll && setIsHovered(true)}
            onTouchEnd={() => canScroll && setIsHovered(false)}
            className={`flex gap-6 py-4 scrollbar-none snap-mandatory ${
              canScroll 
                ? "overflow-x-auto cursor-grab active:cursor-grabbing" 
                : "overflow-x-hidden"
            }`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Spacing spacer before first card - only if scrolling */}
            {canScroll && <div className="w-1.5 flex-shrink-0" />}
            
            {certificates.map((cert, idx) => (
              <CertificateCard key={idx} cert={cert} onClick={() => setSelectedCert(cert)} />
            ))}

            {/* Spacing spacer after last card - only if scrolling */}
            {canScroll && <div className="w-1.5 flex-shrink-0" />}
          </div>
        </div>
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
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-150 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-all active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-violet-600/10 border border-violet-500/10 text-violet-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg leading-snug">{selectedCert.name}</h4>
                    <p className="text-xs text-zinc-400 font-semibold">{selectedCert.organization}</p>
                  </div>
                </div>

                {/* Main Image in Modal */}
                <div className="relative aspect-[1.6] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
                  {selectedCert.image ? (
                    <SkeletonImage 
                      src={selectedCert.image} 
                      alt={selectedCert.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                      <Award className="w-12 h-12" />
                    </div>
                  )}
                </div>

                {/* Details list */}
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

                {/* Footer buttons */}
                <div className="flex items-center gap-3 pt-6 border-t border-zinc-100 text-xs">
                  <span className="flex items-center gap-1 text-emerald-600 font-extrabold flex-1">
                    <ShieldCheck className="w-4 h-4" /> SECURE AUTHENTIC LINK
                  </span>
                  <a
                    href={selectedCert.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-[10px] transition-all shadow-md shadow-zinc-900/10 active:scale-95 cursor-pointer"
                  >
                    Verify Certificate <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
