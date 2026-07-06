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
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-transparent">
      {/* Pulsing Skeleton Loader - Light theme matched */}
      {isLoading && !isError && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-zinc-50 to-zinc-100 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-zinc-200 border-t-zinc-450 animate-spin" />
        </div>
      )}

      {/* Fallback Graphic (If Image fails to load or isn't available) */}
      {isError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 border border-zinc-200 p-2 text-center">
          <div className="p-1 rounded-xl bg-zinc-100 text-zinc-400 mb-1">
            {fallbackIcon || <ImageOff className="w-4 h-4" />}
          </div>
          <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-semibold">Error</span>
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
