"use client";

import { Star, GitFork } from "lucide-react";
import { GithubRepo } from "@/lib/mockData";

// Map common languages to brand colors
const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Rust: "bg-orange-600",
  Go: "bg-cyan-500",
  Java: "bg-red-500",
  "C++": "bg-purple-600",
  Ruby: "bg-rose-500",
  Swift: "bg-orange-500",
  Kotlin: "bg-violet-500",
};

interface GithubRepoCardProps {
  repo: GithubRepo;
}

export default function GithubRepoCard({ repo }: GithubRepoCardProps) {
  const langColor = LANG_COLORS[repo.language] || "bg-zinc-400";

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="flex-shrink-0 w-[240px] sm:w-[280px] p-5 rounded-2xl bg-white border border-zinc-200/80 hover:shadow-lg hover:border-zinc-300/60 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-br from-violet-500/[0.03] via-transparent to-teal-500/[0.03]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-extrabold text-zinc-900 text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {repo.name}
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-100 text-[8px] font-bold text-zinc-500 uppercase">
            <span className={`w-2 h-2 rounded-full ${langColor} shadow-sm`} style={{ boxShadow: `0 0 6px 1px currentColor` }} />
            {repo.language}
          </span>
        </div>
        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 mb-6">
          {repo.description}
        </p>
      </div>

      <div className="flex items-center gap-4 pt-3 border-t border-zinc-100 text-[10px] text-zinc-400 font-bold relative z-10">
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-warm text-warm" /> {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5 text-zinc-400" /> {repo.forks}
        </span>
      </div>
    </a>
  );
}
