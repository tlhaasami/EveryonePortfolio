"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

interface SkeletonImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackIcon?: React.ReactNode;
}

export default function SkeletonImage({ src, alt, className, fallbackIcon, ...props }: SkeletonImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[50px] bg-zinc-900 overflow-hidden flex items-center justify-center">
      {/* Pulsing Skeleton Loader */}
      {isLoading && !isError && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
        </div>
      )}

      {/* Fallback Graphic (If Image fails to load or isn't available) */}
      {isError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 border border-zinc-800/50 p-4 text-center">
          <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-600 mb-2">
            <ImageOff className="w-6 h-6" />
          </div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Image Not Found</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsError(true)}
          className={`${className} transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          {...props}
        />
      )}

      {/* Tailwind shimmer animation utility styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
