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
          <h5 className="font-extrabold text-zinc-950 text-xs sm:text-sm leading-tight">{test.name}</h5>
          <p className="text-[10px] text-zinc-500 font-semibold">{test.position} at {test.company}</p>
        </div>
      </div>
    </div>
  );
}
