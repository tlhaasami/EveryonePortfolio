"use client";

import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";

interface TestimonialCardProps {
  test: Testimonial;
}

export default function TestimonialCard({ test }: TestimonialCardProps) {
  return (
    <div
      className="flex-shrink-0 w-[290px] sm:w-[340px] p-6 rounded-2xl bg-white border border-zinc-200/80 relative hover:border-zinc-300/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden"
    >
      {/* Left gradient accent border stripe */}
      <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-primary via-accent to-warm opacity-40 group-hover:opacity-80 transition-opacity" />

      {/* Quote Mark with faint pulse */}
      <Quote className="absolute top-5 right-6 w-8 h-8 text-zinc-100 pointer-events-none animate-[glow-pulse_4s_ease-in-out_infinite]" />

      <div className="pl-2">
        {/* Star rating */}
        <div className="flex items-center gap-0.5 mb-4">
          {[...Array(test.rating)].map((_, starIdx) => (
            <Star key={starIdx} className="w-3.5 h-3.5 fill-warm text-warm" />
          ))}
        </div>

        <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed italic mb-6 relative z-10">
          "{test.quote}"
        </p>
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 pl-2">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-100 flex-shrink-0 shadow-sm">
          <SkeletonImage 
            src={test.avatar} 
            alt={test.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h5 className="font-extrabold text-zinc-950 text-xs sm:text-sm leading-tight">{test.name}</h5>
          <p className="text-[10px] text-zinc-400 font-semibold">{test.position} at {test.company}</p>
        </div>
      </div>
    </div>
  );
}
