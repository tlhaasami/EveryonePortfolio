"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Certificate } from "@/lib/mockData";
import { Award, ExternalLink, ShieldCheck, Calendar, Bookmark, X } from "lucide-react";
import SkeletonImage from "./SkeletonImage";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Duplicate items for the infinite marquee scroll
  const marqueeItems = [...certificates, ...certificates];

  return (
    <section id="certificates" className="py-20 relative overflow-hidden bg-zinc-50/50 border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl mb-12">
        <div className="text-left">
          <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2">My Credentials</h2>
          <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">Professional Certifications</h3>
          <p className="text-xs text-zinc-400 mt-1">Explore my verified certifications. Click any certificate to view authentication details.</p>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Fading Edge Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-zinc-50 via-zinc-50/10 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-zinc-50 via-zinc-50/10 to-transparent pointer-events-none z-10" />

        {/* Scrolling Strip */}
        <div className="flex gap-6 animate-marquee py-4">
          {marqueeItems.map((cert, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCert(cert)}
              className="flex-shrink-0 w-[240px] sm:w-[280px] rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-violet-500/20 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              {/* Upper Part: Certificate Image / Placeholder */}
              <div className="relative aspect-[4/3] bg-zinc-100 w-full overflow-hidden border-b border-zinc-150">
                {cert.image ? (
                  <SkeletonImage 
                    src={cert.image} 
                    alt={cert.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                    <Award className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-900/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Lower Part: Certificate Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-extrabold text-zinc-950 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-violet-600 transition-colors">
                    {cert.name}
                  </h5>
                  <p className="text-[10px] text-zinc-400 font-bold mt-1">{cert.organization}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-3 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                  <span>View Details</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>

            </div>
          ))}
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
                      <span className="text-[9px] text-zinc-450 uppercase tracking-widest block font-bold">Issue Date</span>
                      <span className="text-zinc-700 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {selectedCert.date}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-450 uppercase tracking-widest block font-bold">Credential ID</span>
                      <span className="text-zinc-700 flex items-center gap-1.5 font-mono"><Bookmark className="w-3.5 h-3.5" /> {selectedCert.credentialId}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-zinc-450 uppercase tracking-widest block font-bold">Skills Authenticated</span>
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

// Simple Helper Icon component
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
