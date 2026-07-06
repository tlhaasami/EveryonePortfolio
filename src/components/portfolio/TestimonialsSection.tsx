"use client";

import { Testimonial } from "@/lib/mockData";
import { Star, Quote } from "lucide-react";
import SkeletonImage from "./SkeletonImage";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // Double the testimonials array for continuous infinite scroll
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-white border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl mb-12">
        <div className="text-left">
          <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2">Recommendations</h2>
          <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">What Clients Say</h3>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Left/Right fading edge overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/30 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/30 to-transparent pointer-events-none z-10" />

        {/* Scrolling strip */}
        <div className="flex gap-6 animate-marquee py-4">
          {marqueeItems.map((test, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[290px] sm:w-[340px] p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm relative hover:border-violet-500/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Mark Background */}
              <Quote className="absolute top-6 right-8 w-8 h-8 text-zinc-100 pointer-events-none" />

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(test.rating)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-zinc-650 text-xs sm:text-sm leading-relaxed italic mb-6 relative z-10">
                  "{test.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 flex-shrink-0">
                  <SkeletonImage 
                    src={test.avatar} 
                    alt={test.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-extrabold text-zinc-900 text-xs sm:text-sm leading-tight">{test.name}</h5>
                  <p className="text-[10px] text-zinc-500 font-semibold">{test.position} at {test.company}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
