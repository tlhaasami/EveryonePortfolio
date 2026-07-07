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
      className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl bg-white border border-zinc-200/80 hover:shadow-lg hover:border-zinc-300/60 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between relative"
    >
      {/* Upper Part: Certificate Image with clean aspect and padding */}
      <div className="relative aspect-[4/3] bg-zinc-100/60 w-full overflow-hidden border-b border-zinc-100 shimmer-overlay p-3 flex items-center justify-center">
        {cert.image ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-sm bg-white border border-zinc-150 flex items-center justify-center">
            <SkeletonImage 
              src={cert.image} 
              alt={cert.name}
              fill
              className="object-contain p-1 transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
            <Award className="w-8 h-8" />
          </div>
        )}
        <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Lower Part: Certificate Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h5 className="font-extrabold text-zinc-950 text-xs sm:text-sm line-clamp-1 leading-snug group-hover:text-primary transition-colors duration-300">
            {cert.name}
          </h5>
          <p className="text-[10px] text-zinc-400 font-bold mt-1">{cert.organization}</p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-3 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
          <span className="group-hover:text-primary transition-colors">View Details</span>
          <ChevronRightIcon className="w-3.5 h-3.5 text-zinc-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
