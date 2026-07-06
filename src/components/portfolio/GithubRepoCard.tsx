"use client";

import { Star, GitFork } from "lucide-react";
import { GithubRepo } from "@/lib/mockData";

interface GithubRepoCardProps {
  repo: GithubRepo;
}

export default function GithubRepoCard({ repo }: GithubRepoCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="flex-shrink-0 w-[240px] sm:w-[280px] p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-violet-500/20 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-extrabold text-zinc-900 text-sm line-clamp-1 group-hover:text-violet-600">
            {repo.name}
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-[8px] font-bold text-zinc-500 uppercase">
            {repo.language}
          </span>
        </div>
        <p className="text-zinc-505 text-xs leading-relaxed line-clamp-3 mb-6">
          {repo.description}
        </p>
      </div>

      <div className="flex items-center gap-4 pt-3 border-t border-zinc-150 text-[10px] text-zinc-400 font-bold">
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5 text-zinc-400" /> {repo.forks}
        </span>
      </div>
    </a>
  );
}
