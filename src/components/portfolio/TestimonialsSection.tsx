"use client";

import { useState, useRef, useEffect } from "react";
import { Testimonial } from "@/lib/mockData";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const directionRef = useRef(1); // 1 = right, -1 = left
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
    const timer = setTimeout(checkScroll, 150);

    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [testimonials]);

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
    <section id="testimonials" className="py-20 relative overflow-hidden bg-white border-b border-zinc-200">
      {/* Aligned exactly inside container */}
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-left mb-12">
          <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2">Recommendations</h2>
          <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">What Clients Say</h3>
          <p className="text-xs text-zinc-450 mt-1">Feedback from my professional workspace collaborations.</p>
        </div>

        {/* Carousel Row wrapper */}
        <div className="relative w-full overflow-hidden select-none">
          {/* Fading Edge Overlays - Only shown if scroll is active */}
          {canScroll && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/10 to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/10 to-transparent pointer-events-none z-10" />
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
            
            {testimonials.map((test, idx) => (
              <TestimonialCard key={idx} test={test} />
            ))}

            {/* Spacing spacer after last card - only if scrolling */}
            {canScroll && <div className="w-1.5 flex-shrink-0" />}
          </div>
        </div>
      </div>
    </section>
  );
}
