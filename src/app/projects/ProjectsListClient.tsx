"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { PortfolioData } from "@/lib/mockData";

interface ProjectsListClientProps {
  data: PortfolioData;
}

function getYoutubeEmbedUrl(url?: string) {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[2].length === 11) ? match[2] : null;
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

function ProjectsContent({ data }: ProjectsListClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idParam = searchParams.get("id");

  useEffect(() => {
    if (idParam !== null) {
      const idx = parseInt(idParam);
      const element = document.getElementById(`project-card-${idx}`);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Highlight effect
          element.classList.add("ring-2", "ring-primary", "ring-offset-2");
          setTimeout(() => {
            element.classList.remove("ring-2", "ring-primary", "ring-offset-2");
          }, 2000);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [idParam]);

  const colorPrimary = data.appearance?.colorPrimary || "#8b5cf6";
  const colorAccent = data.appearance?.colorAccent || "#14b8a6";
  const colorWarm = data.appearance?.colorWarm || "#f59e0b";

  const themeStyle = `
    :root {
      --color-primary: ${colorPrimary};
      --color-primary-light: color-mix(in srgb, ${colorPrimary} 75%, white);
      --color-primary-dark: color-mix(in srgb, ${colorPrimary} 70%, black);
      --color-primary-ultra-light: color-mix(in srgb, ${colorPrimary} 6%, white);
      --color-accent: ${colorAccent};
      --color-warm: ${colorWarm};
    }
    *, body, html {
      font-family: ${data.appearance?.customFontUrl && data.appearance?.customFontName 
        ? `'${data.appearance.customFontName}', sans-serif` 
        : `${data.appearance?.selectedFont || "Inter"}, sans-serif`} !important;
    }
  `;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      {data.appearance?.selectedFont && (
        <link 
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${data.appearance.selectedFont.replace(/\s+/g, "+")}:wght@300;400;500;600;700;800;900&display=swap`}
        />
      )}

      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 opacity-20 blur-[130px] pointer-events-none rounded-full" />

      {/* Top Navbar */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60 z-30 py-4 shadow-sm">
        <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-900" /> Back To Portfolio
          </button>
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
            {data.profile.name}.Dev / Projects
          </span>
        </div>
      </nav>

      {/* Main List */}
      <div className="container mx-auto px-6 max-w-4xl mt-16 space-y-16">
        
        {/* Header */}
        <div className="text-left space-y-2">
          <h1 className="text-3xl font-black text-zinc-950 tracking-tight">Showcase Archive</h1>
          <p className="text-zinc-500 text-sm max-w-xl">
            Detailed walkthrough of projects, frameworks, repositories, and technical engineering deliverables.
          </p>
        </div>

        <div className="space-y-12">
          {data.projects.map((project, idx) => (
            <div
              key={idx}
              id={`project-card-${idx}`}
              className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative overflow-hidden"
            >
              {/* Media Preview Column */}
              <div className="w-full space-y-4">
                {project.videoUrl ? (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-100 shadow-sm relative bg-zinc-950">
                    <iframe
                      src={getYoutubeEmbedUrl(project.videoUrl)}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                ) : (
                  project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full aspect-video object-cover rounded-2xl border border-zinc-200 shadow-sm bg-zinc-50"
                    />
                  )
                )}
              </div>

              {/* Text Info Column */}
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-md text-[8px] font-extrabold uppercase tracking-wider">
                      {project.status || "Completed"}
                    </span>
                    {project.duration && (
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-md text-[8px] font-bold uppercase">
                        {project.duration}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-zinc-950 tracking-tight">{project.title}</h2>
                </div>

                <p className="text-zinc-600 text-xs leading-relaxed">{project.description}</p>

                {/* Tech tags */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest block">Stack</span>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 bg-zinc-50 border border-zinc-200/50 rounded-md text-[9px] font-bold text-zinc-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Code <GithubIcon className="w-3 h-3 text-white" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-[10px] uppercase tracking-wider transition-colors"
                    >
                      Live <ExternalLink className="w-3 h-3 text-zinc-800" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsListClient({ data }: ProjectsListClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-400">Loading showcase...</div>}>
      <ProjectsContent data={data} />
    </Suspense>
  );
}
