"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/lib/mockData";
import { Star, Quote } from "lucide-react";
import SkeletonImage from "./SkeletonImage";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-zinc-950/20">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Recommendations
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Clients Say
          </motion.h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md relative hover:border-violet-500/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Quote Mark Background */}
              <Quote className="absolute top-6 right-8 w-10 h-10 text-zinc-800/30 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(test.rating)].map((_, starIdx) => (
                  <Star key={starIdx} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed italic mb-8 relative z-10">
                "{test.quote}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/60">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-800">
                  <SkeletonImage 
                    src={test.avatar} 
                    alt={test.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm sm:text-base">{test.name}</h5>
                  <p className="text-xs text-zinc-500">{test.position} at {test.company}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
