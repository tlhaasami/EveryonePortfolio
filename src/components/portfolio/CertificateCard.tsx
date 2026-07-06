"use client";

import { Award, ExternalLink } from "lucide-react";
import { Certificate } from "@/lib/mockData";
import SkeletonImage from "./SkeletonImage";

interface CertificateCardProps {
  cert: Certificate;
  onClick: () => void;
}

export default function CertificateCard({ cert, onClick }: CertificateCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[240px] sm:w-[280px] rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-violet-500/20 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
    >
      {/* Upper Part: Certificate Image (Sleek horizontal landscape cover matching repo card height) */}
      <div className="relative aspect-[2.2/1] bg-zinc-100 w-full overflow-hidden border-b border-zinc-150">
        {cert.image ? (
          <SkeletonImage 
            src={cert.image} 
            alt={cert.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
            <Award className="w-8 h-8" />
          </div>
        )}
        <div className="absolute top-2 right-2 p-1 rounded-lg bg-zinc-900/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>

      {/* Lower Part: Certificate Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h5 className="font-extrabold text-zinc-950 text-xs sm:text-sm line-clamp-1 leading-snug group-hover:text-violet-600 transition-colors">
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
