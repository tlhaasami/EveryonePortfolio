"use client";

import React, { useState, useEffect, useRef } from "react";
import { PortfolioData, Project, Skill, Experience, Education, Certificate, Competition, GithubRepo } from "@/lib/mockData";
import {
  User, Code, Briefcase, Award, Save, Plus, Trash2, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, Palette, Upload, ChevronDown, Sun, Moon
} from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SOCIAL_PLATFORMS, SOCIAL_PLATFORM_LOGOS } from "@/lib/socialConfig";
import HeroSection from "@/components/portfolio/HeroSection";

interface AdminDashboardProps {
  initialData: PortfolioData;
}

// ─── Custom Premium Styled Dropdown Component ───
interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

function CustomDropdown({ label, value, options, onChange, disabled = false }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`space-y-2 relative text-left ${disabled ? "opacity-50" : ""}`} ref={dropdownRef}>
      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-sm text-left transition-all disabled:cursor-not-allowed"
        >
          <span>{selectedOption?.label}</span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 dark:text-zinc-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-30 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto mt-1"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors block ${opt.value === value
                    ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-zinc-100"
                    : "text-zinc-700 dark:text-zinc-300"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Auto-Resizing Textarea Component ───
interface AutoResizingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function AutoResizingTextarea({ label, value, onChange, className = "", ...props }: AutoResizingTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    const timer = setTimeout(resize, 0);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-1.5 text-left w-full">
      <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider block">{label}</label>
      <textarea
        ref={textareaRef}
        value={value}
        rows={props.rows || 1}
        onChange={(e) => {
          if (onChange) onChange(e);
          resize();
        }}
        className={`w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/70 focus:bg-white dark:focus:bg-zinc-800 transition-colors overflow-hidden resize-none leading-relaxed ${className}`}
        {...props}
      />
    </div>
  );
}

const getDeviconUrl = (techName: string): string => {
  const normalized = techName.toLowerCase().trim().replace(/[^a-z0-9+#]/g, "");
  const overrides: Record<string, string> = {
    "c++": "cplusplus",
    "c#": "csharp",
    "dotnet": "dot-net",
    "js": "javascript",
    "ts": "typescript",
    "node": "nodejs",
    "next": "nextjs",
    "next.js": "nextjs",
    "react": "react",
    "react.js": "react",
    "vue": "vuejs",
    "postgres": "postgresql",
    "postgresql": "postgresql",
    "mysql": "mysql",
    "mongo": "mongodb",
    "mongodb": "mongodb",
    "aws": "amazonwebservices",
    "gcp": "googlecloud",
    "docker": "docker",
    "kubernetes": "kubernetes",
    "git": "git",
    "firebase": "firebase",
    "supabase": "supabase",
    "html": "html5",
    "css": "css3",
    "sass": "sass",
    "tailwind": "tailwindcss",
    "tailwindcss": "tailwindcss",
    "python": "python",
    "django": "django",
    "flask": "flask",
    "java": "java",
    "spring": "spring",
    "flutter": "flutter",
    "dart": "dart",
    "swift": "swift",
    "kotlin": "kotlin",
    "rust": "rust",
    "golang": "go",
    "go": "go"
  };
  const name = overrides[normalized] || normalized;
  return `https://raw.githubusercontent.com/devicons/devicon/master/icons/${name}/${name}-original.svg`;
};

interface PreviewSimulatorProps {
  appearance: any;
  profile: any;
}

function LivePreviewSimulator({ appearance, profile }: PreviewSimulatorProps) {
  const [key, setKey] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [viewportHeight, setViewportHeight] = useState(720);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1280);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const colorPrimary = appearance?.colorPrimary || "#8b5cf6";
  const colorAccent = appearance?.colorAccent || "#14b8a6";
  const colorWarm = appearance?.colorWarm || "#f59e0b";

  const previewColorsStyle = `
    .preview-container-root {
      --color-primary: ${colorPrimary};
      --color-primary-light: color-mix(in srgb, ${colorPrimary} 75%, white);
      --color-primary-dark: color-mix(in srgb, ${colorPrimary} 70%, black);
      --color-primary-ultra-light: color-mix(in srgb, ${colorPrimary} 6%, white);

      --color-accent: ${colorAccent};
      --color-accent-light: color-mix(in srgb, ${colorAccent} 75%, white);
      --color-accent-dark: color-mix(in srgb, ${colorAccent} 70%, black);

      --color-warm: ${colorWarm};
      --color-warm-light: color-mix(in srgb, ${colorWarm} 75%, white);
      --color-warm-dark: color-mix(in srgb, ${colorWarm} 70%, black);
    }
  `;

  // Calculate dynamic scale factor based on container width
  const paddingOffset = 32; // padding x-4 on parent container
  const availableWidth = Math.max(280, containerWidth - paddingOffset);
  const scale = Math.min(1.0, availableWidth / viewportWidth);
  const scaledHeight = viewportHeight * scale;

  return (
    <div className="bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-xl overflow-hidden flex flex-col w-full">
      {/* Header controls toolbar */}
      <div className="flex flex-wrap items-center gap-4 px-5 py-3 border-b border-zinc-900 bg-zinc-900/60 justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-1.5 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-zinc-400 ml-2 tracking-wider uppercase font-extrabold">Live Hero Preview</span>
        </div>

        {/* Preset buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setViewportWidth(1280); setViewportHeight(720); }}
            className={`px-2 py-1 rounded transition-colors cursor-pointer text-[10px] font-extrabold uppercase tracking-wider ${viewportWidth === 1280 ? "bg-white text-zinc-950" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
          >
            Desktop (1280x720)
          </button>
          <button
            type="button"
            onClick={() => { setViewportWidth(1024); setViewportHeight(600); }}
            className={`px-2 py-1 rounded transition-colors cursor-pointer text-[10px] font-extrabold uppercase tracking-wider ${viewportWidth === 1024 ? "bg-white text-zinc-950" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
          >
            Laptop (1024x600)
          </button>
          <button
            type="button"
            onClick={() => { setViewportWidth(768); setViewportHeight(960); }}
            className={`px-2 py-1 rounded transition-colors cursor-pointer text-[10px] font-extrabold uppercase tracking-wider ${viewportWidth === 768 ? "bg-white text-zinc-950" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
          >
            Tablet (768x960)
          </button>
          <button
            type="button"
            onClick={() => { setViewportWidth(375); setViewportHeight(720); }}
            className={`px-2 py-1 rounded transition-colors cursor-pointer text-[10px] font-extrabold uppercase tracking-wider ${viewportWidth === 375 ? "bg-white text-zinc-950" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
          >
            Mobile (375x720)
          </button>
        </div>

        {/* Dimension sliders */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            <span>W: {viewportWidth}px</span>
            <input
              type="range"
              min="375"
              max="1440"
              value={viewportWidth}
              onChange={(e) => setViewportWidth(Number(e.target.value))}
              className="w-16 h-1 rounded bg-zinc-800 appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            <span>H: {viewportHeight}px</span>
            <input
              type="range"
              min="400"
              max="1200"
              value={viewportHeight}
              onChange={(e) => setViewportHeight(Number(e.target.value))}
              className="w-16 h-1 rounded bg-zinc-800 appearance-none cursor-pointer"
            />
          </div>
          <button
            type="button"
            onClick={() => setKey(prev => prev + 1)}
            className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Re-run animation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        key={key}
        style={{ height: `${scaledHeight + 32}px` }}
        className="preview-container-root flex-grow relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/30 p-4 flex items-start justify-center border-t border-zinc-800/80 transition-all duration-300"
      >
        <style dangerouslySetInnerHTML={{ __html: previewColorsStyle }} />

        {/* Dynamic browser mockup container, scaled according to dimensions */}
        <div
          style={{
            width: `${viewportWidth}px`,
            height: `${viewportHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center'
          }}
          className="light-preview absolute top-4 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-950 transition-all duration-300"
        >
          <HeroSection profile={profile} appearance={appearance} isPreview={true} />
        </div>
      </div>
    </div>
  );
}

type TabType = "profile" | "skills-projects" | "experience-education" | "certs-wins" | "github-sync" | "appearance";

// Social media constants imported from '@/lib/socialConfig'

export default function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const [data, setData] = useState<PortfolioData>(initialData);
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [githubUsername, setGithubUsername] = useState("");
  const [isScraping, setIsScraping] = useState(false);

  useEffect(() => {
    if (data.profile.socialLinks.github && !githubUsername) {
      const username = data.profile.socialLinks.github
        .replace(/^https:\/\/github\.com\//, "")
        .replace(/^\//, "")
        .replace(/\/$/, "");
      setGithubUsername(username);
    }
  }, [data.profile.socialLinks.github]);
  const [isSaving, setIsSaving] = useState(false);
  const [customFontNameInput, setCustomFontNameInput] = useState("");
  const [isUploadingFont, setIsUploadingFont] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // New item placeholders
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({ name: "", category: "languages", level: 80, years: 1 });
  const [newProject, setNewProject] = useState<Partial<Project>>({ title: "", description: "", technologies: [], tags: [], githubUrl: "", thumbnail: "/images/workspace.png", status: "completed" });
  const [newExp, setNewExp] = useState<Partial<Experience>>({ company: "", position: "", timeline: "", responsibilities: [], achievements: [], technologies: [] });
  const [newEdu, setNewEdu] = useState<Partial<Education>>({ institution: "", degree: "", timeline: "", cgpa: "", achievements: [] });
  const [newCert, setNewCert] = useState<Partial<Certificate>>({ name: "", organization: "", date: "", credentialId: "", verificationLink: "", skillsEarned: [], image: "/assets/Certificates/GoogleAiEssentials.png" });
  const [newComp, setNewComp] = useState<Partial<Competition>>({ title: "", description: "", image: "/assets/CompetitionsWinner/FETX_Winner.png", badge: "Winner", badgeIcon: "trophy" });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/save-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const result = await res.json();
      if (result.success) {
        showNotification("success", "All changes saved successfully to data.json!");
      } else {
        showNotification("error", result.error || "Failed to save changes.");
      }
    } catch (error) {
      showNotification("error", "Error saving data to filesystem.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleScrapeGithub = async () => {
    if (!githubUsername) return;
    setIsScraping(true);
    try {
      const res = await fetch("/api/scrape-github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: githubUsername }),
      });
      const result = await res.json();
      if (result.success) {
        setData(prev => ({
          ...prev,
          githubRepos: result.repos,
          profile: result.profile ? {
            ...prev.profile,
            name: result.profile.name || prev.profile.name,
            socialLinks: {
              ...prev.profile.socialLinks,
              github: result.profile.githubUrl,
            }
          } : prev.profile
        }));
        showNotification("success", `Successfully scraped & imported ${result.repos.length} repositories from GitHub!`);
      } else {
        showNotification("error", result.error || "Failed to scrape repos.");
      }
    } catch (error) {
      showNotification("error", "Network error while scraping.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (!customFontNameInput) {
      showNotification("error", "Please input a font name before selecting a file.");
      return;
    }

    const file = files[0];
    setIsUploadingFont(true);

    const formData = new FormData();
    formData.append("fontFile", file);
    formData.append("fontName", customFontNameInput);

    try {
      const res = await fetch("/api/upload-font", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setData((prev) => ({
          ...prev,
          appearance: {
            ...prev.appearance,
            customFontName: result.fontName,
            customFontUrl: result.fontUrl,
            customFontFormat: result.format,
          },
        }));
        showNotification("success", `Custom font "${result.fontName}" uploaded successfully!`);
        setCustomFontNameInput("");
      } else {
        showNotification("error", result.error || "Failed to upload font.");
      }
    } catch (error) {
      showNotification("error", "Error uploading font file.");
    } finally {
      setIsUploadingFont(false);
      e.target.value = "";
    }
  };

  const clearCustomFont = () => {
    setData((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        customFontName: undefined,
        customFontUrl: undefined,
        customFontFormat: undefined,
      },
    }));
    showNotification("success", "Custom font cleared.");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploadingAvatar(true);

    const formData = new FormData();
    formData.append("avatarFile", file);

    try {
      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setData((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            heroImage: result.imageUrl,
          },
        }));
        showNotification("success", "Profile picture updated successfully!");
      } else {
        showNotification("error", result.error || "Failed to upload profile picture.");
      }
    } catch (error) {
      showNotification("error", "Error uploading profile picture.");
    } finally {
      setIsUploadingAvatar(false);
      e.target.value = "";
    }
  };

  // Helper functions to update arrays
  const removeSkill = (index: number) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const addSkill = () => {
    if (!newSkill.name) return;
    const resolvedLogo = getDeviconUrl(newSkill.name);
    setData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          ...newSkill,
          logoUrl: resolvedLogo,
          featured: true,
          displayOrder: prev.skills.length + 1
        } as Skill
      ]
    }));
    setNewSkill({ name: "", category: "languages", level: 80, years: 1 });
  };

  const removeProject = (index: number) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const addProject = () => {
    if (!newProject.title) return;
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...newProject, technologies: [], tags: [], featured: true } as Project]
    }));
    setNewProject({ title: "", description: "", technologies: [], tags: [], githubUrl: "", thumbnail: "/images/workspace.png", status: "completed" });
  };

  const removeExperience = (index: number) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const addExperience = () => {
    if (!newExp.company || !newExp.position) return;
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...newExp, responsibilities: [], achievements: [], technologies: [] } as Experience]
    }));
    setNewExp({ company: "", position: "", timeline: "", responsibilities: [], achievements: [], technologies: [] });
  };

  const removeEducation = (index: number) => {
    setData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  const addEducation = () => {
    if (!newEdu.institution || !newEdu.degree) return;
    setData(prev => ({
      ...prev,
      education: [...prev.education, { ...newEdu, coursework: [], achievements: [] } as Education]
    }));
    setNewEdu({ institution: "", degree: "", timeline: "", cgpa: "", achievements: [] });
  };

  const removeCert = (index: number) => {
    setData(prev => ({ ...prev, certificates: prev.certificates.filter((_, i) => i !== index) }));
  };

  const addCert = () => {
    if (!newCert.name) return;
    setData(prev => ({
      ...prev,
      certificates: [...prev.certificates, { ...newCert, skillsEarned: [] } as Certificate]
    }));
    setNewCert({ name: "", organization: "", date: "", credentialId: "", verificationLink: "", skillsEarned: [], image: "/assets/Certificates/GoogleAiEssentials.png" });
  };

  const removeComp = (index: number) => {
    setData(prev => ({ ...prev, competitions: prev.competitions.filter((_, i) => i !== index) }));
  };

  const addComp = () => {
    if (!newComp.title) return;
    setData(prev => ({
      ...prev,
      competitions: [...prev.competitions, newComp as Competition]
    }));
    setNewComp({ title: "", description: "", image: "/assets/CompetitionsWinner/FETX_Winner.png", badge: "Winner", badgeIcon: "trophy" });
  };

  const renderTabButton = (tab: { id: TabType; label: string; icon: React.ReactNode }) => {
    const active = activeTab === tab.id;
    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-left text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer group relative whitespace-nowrap ${active
            ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40"
          }`}
      >
        <span className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
          {tab.icon}
        </span>
        <span>{tab.label}</span>
        {active && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
        )}
      </button>
    );
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans p-6 md:p-12 relative overflow-hidden transition-colors duration-300">
        {/* Decorative glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 opacity-20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 opacity-25 blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-8">

          {/* Navigation / Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800 pb-6">
            <div className="space-y-2">
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-[0.98]">
                <ArrowLeft className="w-4 h-4" /> Back to Live Portfolio
              </Link>
              <h1 className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
                Portfolio CMS Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all shadow-sm cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-emerald-500" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/20 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer animate-fade-in"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save All Changes
              </button>
            </div>
          </div>

          {/* Dynamic Notification bar */}
          {notification && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 border shadow-sm ${notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300"
              }`}>
              {notification.type === "success" ? <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 dark:text-rose-400" />}
              <span className="text-sm font-semibold">{notification.message}</span>
            </div>
          )}

          {/* Horizontal Navigation Navbar (Floating Capsule) */}
          <div className="w-fit mx-auto bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md flex items-center overflow-x-auto gap-1.5 scrollbar-none sticky top-6 z-30">
            {renderTabButton({ id: "profile", label: "Profile", icon: <User className="w-3.5 h-3.5" /> })}
            {renderTabButton({ id: "appearance", label: "Appearance", icon: <Palette className="w-3.5 h-3.5" /> })}
            {renderTabButton({ id: "github-sync", label: "GitHub Sync", icon: <GithubIcon className="w-3.5 h-3.5" /> })}
            {renderTabButton({ id: "skills-projects", label: "Skills & Projects", icon: <Code className="w-3.5 h-3.5" /> })}
            {renderTabButton({ id: "experience-education", label: "Experience & Edu", icon: <Briefcase className="w-3.5 h-3.5" /> })}
            {renderTabButton({ id: "certs-wins", label: "Certs & Wins", icon: <Award className="w-3.5 h-3.5" /> })}
          </div>

          {/* Tabs Content Panels wrapper */}
          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 pb-36 md:pb-48 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">

            {/* 1. Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8 animate-fade-in text-left">
                <div>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">Personal Profile Wizard</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Configure your personal brand identity, unique handle, profile picture and interactive connections matrix.</p>
                </div>

                {/* Top section containing profile pic on the left and name/username on the right */}
                <div className="flex flex-col md:flex-row gap-6 items-stretch bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm transition-all duration-300 hover:border-emerald-500/30">
                  {/* Left: Profile Photo upload block (fit according to content) */}
                  <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/20 rounded-2xl space-y-3 w-full md:w-64 flex-shrink-0 transition-all hover:border-emerald-500/50">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-md bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 group">
                      {data.profile.heroImage ? (
                        <>
                          <img src={data.profile.heroImage} alt="Avatar Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-[9px] font-bold uppercase tracking-wider cursor-pointer">
                            Change Pic
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-500 text-xs">No Avatar</div>
                      )}
                      {isUploadingAvatar && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white space-y-1">
                          <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                          <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400">Uploading</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 max-w-[200px]">
                      <h3 className="font-extrabold text-[11px] text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">Profile Photo</h3>
                      <p className="text-[9px] text-zinc-400 dark:text-zinc-500 leading-normal">Displays on the home hero section.</p>
                    </div>
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-[9px] font-extrabold uppercase tracking-widest cursor-pointer transition-all active:scale-[0.97] shadow-sm">
                      <Upload className="w-3 h-3" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        disabled={isUploadingAvatar}
                      />
                    </label>
                  </div>

                  {/* Right: Full Name and Username Stacked */}
                  <div className="flex flex-col justify-center gap-4 flex-grow">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest block mb-2">Full Name</label>
                      <input
                        type="text"
                        value={data.profile.name}
                        onChange={(e) => setData({
                          ...data,
                          profile: { ...data.profile, name: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/70 focus:bg-white dark:focus:bg-zinc-800 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest block mb-2">Unique Username</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-sm font-bold text-zinc-400 dark:text-zinc-500">@</span>
                        <input
                          type="text"
                          value={data.profile.username || ""}
                          placeholder="username"
                          onChange={(e) => setData({
                            ...data,
                            profile: { ...data.profile, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") }
                          })}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/70 focus:bg-white dark:focus:bg-zinc-800 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <AutoResizingTextarea
                  label="Professional Title"
                  value={data.profile.title}
                  onChange={(e) => setData({
                    ...data,
                    profile: { ...data.profile, title: e.target.value }
                  })}
                />

                <AutoResizingTextarea
                  label="Subtitle / CTA Tagline"
                  value={data.profile.subtitle}
                  onChange={(e) => setData({
                    ...data,
                    profile: { ...data.profile, subtitle: e.target.value }
                  })}
                />

                <AutoResizingTextarea
                  label="Short Introduction"
                  value={data.profile.introduction}
                  onChange={(e) => setData({
                    ...data,
                    profile: { ...data.profile, introduction: e.target.value }
                  })}
                />

                <AutoResizingTextarea
                  label="Biography (Detail)"
                  rows={4}
                  value={data.profile.biography}
                  onChange={(e) => setData({
                    ...data,
                    profile: { ...data.profile, biography: e.target.value }
                  })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                  <CustomDropdown
                    label="Availability Status"
                    value={data.profile.availabilityStatus}
                    options={[
                      { value: "available", label: "Available for Projects" },
                      { value: "busy", label: "Busy / Engaged" },
                      { value: "hiring", label: "Hiring" }
                    ]}
                    onChange={(val) => setData({
                      ...data,
                      profile: { ...data.profile, availabilityStatus: val as any }
                    })}
                  />
                  <AutoResizingTextarea
                    label="Current Tech Focus"
                    value={data.profile.currentFocus}
                    onChange={(e) => setData({
                      ...data,
                      profile: { ...data.profile, currentFocus: e.target.value }
                    })}
                  />
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-4">
                  <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-200">Social Handles & Connections</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {SOCIAL_PLATFORMS.map((platform) => {
                      const linkVal = data.profile.socialLinks[platform.key as keyof typeof data.profile.socialLinks] || "";
                      const isActive = linkVal.trim().length > 0;
                      return (
                        <div
                          key={platform.key}
                          style={{
                            borderColor: platform.brandColor,
                            boxShadow: isActive ? `0 0 16px ${platform.brandColor}30` : `0 0 6px ${platform.brandColor}10`,
                            backgroundColor: isActive ? `${platform.brandColor}0a` : `${platform.brandColor}05`
                          }}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-3 min-h-[120px] hover:shadow-lg ${isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              style={{
                                backgroundColor: platform.brandColor,
                                color: "#ffffff"
                              }}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all shadow-sm ${isActive
                                  ? "scale-110 shadow-md"
                                  : ""
                                }`}
                            >
                              {SOCIAL_PLATFORM_LOGOS[platform.key as keyof typeof SOCIAL_PLATFORM_LOGOS]}
                            </div>
                            <div className="text-left">
                              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Platform</span>
                              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{platform.label}</span>
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder={platform.placeholder}
                            value={linkVal}
                            onChange={(e) => setData({
                              ...data,
                              profile: {
                                ...data.profile,
                                socialLinks: { ...data.profile.socialLinks, [platform.key]: e.target.value }
                              }
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-900 dark:text-zinc-200 placeholder-zinc-300 dark:placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* 2. Skills & Projects Tab */}
            {activeTab === "skills-projects" && (
              <div className="space-y-8">

                {/* SKILLS */}
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-zinc-900 border-b border-zinc-100 pb-3">Technical Skills</h2>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {data.skills.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold text-zinc-700">
                        {skill.name} ({skill.level}%)
                        <button type="button" onClick={() => removeSkill(idx)} className="text-zinc-500 hover:text-rose-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add skill form */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-zinc-50 p-4 rounded-2xl border border-zinc-200/60">
                    <div>
                      <label className="text-[9px] font-bold text-zinc-400 uppercase block mb-1">Skill Name</label>
                      <input
                        type="text"
                        placeholder="e.g. React"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-zinc-400 uppercase block mb-1">Category</label>
                      <select
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      >
                        <option value="languages">Languages</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="databases">Databases</option>
                        <option value="cloud-devops">DevOps</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-zinc-400 uppercase block mb-1">Level (0-100)</label>
                      <input
                        type="number"
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>

                {/* PROJECTS */}
                <div className="space-y-4 pt-6 border-t border-zinc-200">
                  <h2 className="text-xl font-black text-zinc-900 border-b border-zinc-100 pb-3">Projects</h2>

                  {/* Current Projects list */}
                  <div className="space-y-3">
                    {data.projects.map((proj, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60">
                        <div>
                          <h4 className="font-extrabold text-zinc-900 text-sm">{proj.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-1">{proj.description}</p>
                        </div>
                        <button type="button" onClick={() => removeProject(idx)} className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Project Form */}
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/60 space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">New Project Form</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="GitHub URL"
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>

                    <textarea
                      placeholder="Short description..."
                      rows={2}
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs resize-none"
                    />

                    <button
                      type="button"
                      onClick={addProject}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* 3. Experience & Education Tab */}
            {activeTab === "experience-education" && (
              <div className="space-y-8">

                {/* EXPERIENCE */}
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-zinc-900 border-b border-zinc-100 pb-3">Work History</h2>

                  {/* Current list */}
                  <div className="space-y-3">
                    {data.experience.map((exp, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60">
                        <div>
                          <h4 className="font-extrabold text-zinc-900 text-sm">{exp.position} @ {exp.company}</h4>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">{exp.timeline}</span>
                        </div>
                        <button type="button" onClick={() => removeExperience(idx)} className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Experience */}
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/60 space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">New Experience Form</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Company"
                        value={newExp.company}
                        onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={newExp.position}
                        onChange={(e) => setNewExp({ ...newExp, position: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Timeline"
                        value={newExp.timeline}
                        onChange={(e) => setNewExp({ ...newExp, timeline: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={addExperience}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Experience
                    </button>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="space-y-4 pt-6 border-t border-zinc-200">
                  <h2 className="text-xl font-black text-zinc-900 border-b border-zinc-100 pb-3">Education</h2>

                  {/* Current list */}
                  <div className="space-y-3">
                    {data.education.map((edu, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60">
                        <div>
                          <h4 className="font-extrabold text-zinc-900 text-sm">{edu.degree}</h4>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">{edu.institution} ({edu.timeline})</span>
                        </div>
                        <button type="button" onClick={() => removeEducation(idx)} className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Education */}
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/60 space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">New Education Form</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={newEdu.institution}
                        onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Degree / Major"
                        value={newEdu.degree}
                        onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Timeline"
                        value={newEdu.timeline}
                        onChange={(e) => setNewEdu({ ...newEdu, timeline: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="CGPA / Score"
                        value={newEdu.cgpa}
                        onChange={(e) => setNewEdu({ ...newEdu, cgpa: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={addEducation}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Education
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* 4. Certifications & Competitions Tab */}
            {activeTab === "certs-wins" && (
              <div className="space-y-8">

                {/* CERTIFICATIONS */}
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-zinc-900 border-b border-zinc-100 pb-3">Professional Certifications</h2>

                  {/* Current Certifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.certificates.map((cert, idx) => (
                      <div key={idx} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {cert.image && (
                            <img src={cert.image} alt="" className="w-10 h-7 object-cover rounded border border-zinc-200 flex-shrink-0" />
                          )}
                          <div>
                            <h4 className="font-extrabold text-zinc-900 text-xs sm:text-sm line-clamp-1">{cert.name}</h4>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase">{cert.organization}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeCert(idx)} className="p-1.5 text-zinc-500 hover:text-rose-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Certification */}
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/60 space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">New Certification Form</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Certification Name"
                        value={newCert.name}
                        onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Organization / Issuer"
                        value={newCert.organization}
                        onChange={(e) => setNewCert({ ...newCert, organization: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Verification Link"
                        value={newCert.verificationLink}
                        onChange={(e) => setNewCert({ ...newCert, verificationLink: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                      <select
                        value={newCert.image}
                        onChange={(e) => setNewCert({ ...newCert, image: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      >
                        <option value="/assets/Certificates/GoogleAiEssentials.png">Google AI Essentials Image</option>
                        <option value="/assets/Certificates/GooglePromptingEssentials.png">Prompting Essentials Image</option>
                        <option value="/assets/Certificates/CrashCourseOnPython.png">Crash Course Python Image</option>
                        <option value="/assets/Certificates/GetStartedWithPython.png">Get Started Python Image</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={addCert}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Certification
                    </button>
                  </div>
                </div>

                {/* COMPETITIONS */}
                <div className="space-y-4 pt-6 border-t border-zinc-200">
                  <h2 className="text-xl font-black text-zinc-900 border-b border-zinc-100 pb-3">Competitions & Wins</h2>

                  {/* Current list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.competitions?.map((comp, idx) => (
                      <div key={idx} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {comp.image && (
                            <img src={comp.image} alt="" className="w-10 h-7 object-cover rounded border border-zinc-200 flex-shrink-0" />
                          )}
                          <div>
                            <h4 className="font-extrabold text-zinc-900 text-xs sm:text-sm line-clamp-1">{comp.title}</h4>
                            <span className="text-[9px] px-2 py-0.5 bg-yellow-100 text-yellow-800 font-bold rounded uppercase">{comp.badge}</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeComp(idx)} className="p-1.5 text-zinc-500 hover:text-rose-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Competition */}
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/60 space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">New Competition Achievement Form</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Competition/Award Title"
                        value={newComp.title}
                        onChange={(e) => setNewComp({ ...newComp, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Badge / Rank (e.g. Winner)"
                        value={newComp.badge}
                        onChange={(e) => setNewComp({ ...newComp, badge: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <textarea
                        placeholder="Description of the win..."
                        rows={2}
                        value={newComp.description}
                        onChange={(e) => setNewComp({ ...newComp, description: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs resize-none"
                      />
                      <select
                        value={newComp.image}
                        onChange={(e) => setNewComp({ ...newComp, image: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      >
                        <option value="/assets/CompetitionsWinner/FETX_Winner.png">FETX Winner Image</option>
                        <option value="/assets/CompetitionsWinner/BugBuster.png">Bug Buster Image</option>
                        <option value="/assets/CompetitionsWinner/CodeAir.png">Code Air Image</option>
                        <option value="/assets/CompetitionsWinner/Nascon.png">Code Craft Image</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={addComp}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Competition
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* 5. GitHub Sync Tab */}
            {activeTab === "github-sync" && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-zinc-900 border-b border-zinc-100 pb-3">GitHub Scraper & Repository Sync</h2>

                <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/60 space-y-4">
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Provide a GitHub username below. The system will scrape their profile information and public repositories, and automatically update your portfolio repos!
                  </p>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="e.g. tlhasami"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleScrapeGithub}
                      disabled={isScraping || !githubUsername}
                      className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md disabled:opacity-50"
                    >
                      {isScraping ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                      Scrape & Sync
                    </button>
                  </div>
                </div>

                {/* Scraped repos overview */}
                {data.githubRepos.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-zinc-900 text-sm flex items-center justify-between">
                      Scraped Repositories ({data.githubRepos.length})
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                      {data.githubRepos.map((repo, idx) => (
                        <div key={idx} className="p-4 bg-white border border-zinc-200 rounded-xl space-y-2 text-left relative group shadow-sm">
                          <h4 className="font-extrabold text-zinc-950 text-xs">{repo.name}</h4>
                          <p className="text-[10px] text-zinc-400 line-clamp-1">{repo.description}</p>
                          <div className="flex gap-3 text-[9px] font-bold text-zinc-500">
                            <span>★ {repo.stars}</span>
                            <span>⌥ {repo.forks}</span>
                            <span>{repo.language}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-8 animate-fade-in text-left">
                {/* Live Hero Preview (At the top of the page) */}
                <div className="w-full">
                  <LivePreviewSimulator appearance={data.appearance} profile={data.profile} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white">Appearance & Layout Settings</h2>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Customize typography, global colors, background animations, and hero layout configuration.</p>
                </div>

                {/* 1. Global Color Schemes & Theme Customizer */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 p-6 rounded-3xl space-y-6">
                  <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm border-b border-zinc-200 dark:border-zinc-800 pb-2">Global Color Settings & Theme Scheme</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {/* Theme Scheme Presets */}
                    <div className="md:col-span-2">
                      <CustomDropdown
                        label="Theme Preset"
                        value={data.appearance?.colorScheme || "purple-haze"}
                        options={[
                          { value: "purple-haze", label: "Purple Haze (Default)" },
                          { value: "midnight-ocean", label: "Midnight Ocean (Deep Blue / Green)" },
                          { value: "sunset-rose", label: "Sunset Rose (Fuchsia / Orange)" },
                          { value: "forest-moss", label: "Forest Moss (Emerald / Gold)" },
                          { value: "cyberpunk", label: "Cyberpunk (Neon Pink / Cyan)" },
                          { value: "classic-mono", label: "Classic Mono (Zinc Grayscale)" },
                          { value: "custom", label: "Custom Colors (Pick below)" }
                        ]}
                        onChange={(val) => {
                          const presets: Record<string, { primary: string; accent: string; warm: string }> = {
                            "purple-haze": { primary: "#8b5cf6", accent: "#14b8a6", warm: "#f59e0b" },
                            "midnight-ocean": { primary: "#3b82f6", accent: "#10b981", warm: "#06b6d4" },
                            "sunset-rose": { primary: "#ec4899", accent: "#f97316", warm: "#eab308" },
                            "forest-moss": { primary: "#059669", accent: "#d97706", warm: "#84cc16" },
                            "cyberpunk": { primary: "#ff007f", accent: "#00f0ff", warm: "#ffb800" },
                            "classic-mono": { primary: "#18181b", accent: "#52525b", warm: "#a1a1aa" },
                          };

                          if (val !== "custom") {
                            const p = presets[val];
                            setData(prev => ({
                              ...prev,
                              appearance: {
                                ...prev.appearance,
                                colorScheme: val as any,
                                colorPrimary: p.primary,
                                colorAccent: p.accent,
                                colorWarm: p.warm,
                                glowRingsColor: p.primary
                              }
                            }));
                          } else {
                            setData(prev => ({
                              ...prev,
                              appearance: {
                                ...prev.appearance,
                                colorScheme: "custom"
                              }
                            }));
                          }
                        }}
                      />
                    </div>

                    {/* Color customizers */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.appearance?.colorPrimary || "#8b5cf6"}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              colorScheme: "custom",
                              colorPrimary: e.target.value
                            }
                          }))}
                          className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0"
                        />
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.colorPrimary || "#8b5cf6"}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Accent Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.appearance?.colorAccent || "#14b8a6"}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              colorScheme: "custom",
                              colorAccent: e.target.value
                            }
                          }))}
                          className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0"
                        />
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.colorAccent || "#14b8a6"}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Highlight Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.appearance?.colorWarm || "#f59e0b"}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              colorScheme: "custom",
                              colorWarm: e.target.value
                            }
                          }))}
                          className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0"
                        />
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.colorWarm || "#f59e0b"}</span>
                      </div>
                    </div>

                    {/* Heading Text Color */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Headings Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.appearance?.textColorPrimary || "#09090b"}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              colorScheme: "custom",
                              textColorPrimary: e.target.value
                            }
                          }))}
                          className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0"
                        />
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.textColorPrimary || "#09090b"}</span>
                      </div>
                    </div>

                    {/* Paragraph Text Color */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Paragraphs Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.appearance?.textColorMuted || "#71717a"}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              colorScheme: "custom",
                              textColorMuted: e.target.value
                            }
                          }))}
                          className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0"
                        />
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.textColorMuted || "#71717a"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Background Grid Customization */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 p-6 rounded-3xl space-y-6">
                  <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm border-b border-zinc-200 dark:border-zinc-800 pb-2">Dynamic Background Customization</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Grid Type */}
                    <CustomDropdown
                      label="Background Grid Type"
                      value={data.appearance?.bgGridType || "graph-paper"}
                      options={[
                        { value: "graph-paper", label: "Graph Paper Grid" },
                        { value: "dots", label: "Dots Grid" },
                        { value: "lines", label: "Vertical Lines Only" },
                        { value: "isometric", label: "Isometric Grid" },
                        { value: "radial-waves", label: "Concentric Radial Waves" },
                        { value: "honeycomb", label: "Hexagonal Honeycomb" },
                        { value: "crosshatch", label: "Sketch Crosshatch" },
                        { value: "waves", label: "Sine Waves Grid" },
                        { value: "none", label: "Clean / Empty" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          bgGridType: val as any
                        }
                      }))}
                    />

                    {/* Sizing slider */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Grid Size ({data.appearance?.bgGridSize || 48}px)</label>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        step={4}
                        value={data.appearance?.bgGridSize || 48}
                        onChange={(e) => setData(prev => ({
                          ...prev,
                          appearance: {
                            ...prev.appearance,
                            bgGridSize: parseInt(e.target.value)
                          }
                        }))}
                        className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
                      />
                      <div className="flex justify-between text-[9px] text-zinc-500 dark:text-zinc-500">
                        <span>Small (20px)</span>
                        <span>Large (100px)</span>
                      </div>
                    </div>

                    {/* Opacity slider */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Grid Line Opacity ({Math.round((data.appearance?.bgGridOpacity || 0.03) * 100)}%)</label>
                      <input
                        type="range"
                        min={0.005}
                        max={0.15}
                        step={0.005}
                        value={data.appearance?.bgGridOpacity || 0.03}
                        onChange={(e) => setData(prev => ({
                          ...prev,
                          appearance: {
                            ...prev.appearance,
                            bgGridOpacity: parseFloat(e.target.value)
                          }
                        }))}
                        className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
                      />
                      <div className="flex justify-between text-[9px] text-zinc-455 dark:text-zinc-500">
                        <span>Faint (0.5%)</span>
                        <span>Dark (15%)</span>
                      </div>
                    </div>

                    {/* Grid line color */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Grid Line Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.appearance?.bgGridColor || "#0a0a0a"}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              bgGridColor: e.target.value
                            }
                          }))}
                          className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-700 cursor-pointer p-0"
                        />
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.bgGridColor || "#0a0a0a"}</span>
                      </div>
                    </div>

                    {/* Particles toggle */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Floating 3D Particles</label>
                      <label className="relative inline-flex items-center cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={data.appearance?.enableParticles ?? true}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              enableParticles: e.target.checked
                            }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                        <span className="ml-3 text-xs font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.enableParticles ? "Enabled" : "Disabled"}</span>
                      </label>
                    </div>

                    {/* Particles count */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Particle Count ({data.appearance?.particleCount || 150})</label>
                      <input
                        type="range"
                        min={50}
                        max={300}
                        step={10}
                        value={data.appearance?.particleCount || 150}
                        disabled={!data.appearance?.enableParticles}
                        onChange={(e) => setData(prev => ({
                          ...prev,
                          appearance: {
                            ...prev.appearance,
                            particleCount: parseInt(e.target.value)
                          }
                        }))}
                        className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white disabled:opacity-40"
                      />
                      <div className="flex justify-between text-[9px] text-zinc-455 dark:text-zinc-500">
                        <span>Minimal (50)</span>
                        <span>Dense (300)</span>
                      </div>
                    </div>

                    {/* Particle Style */}
                    <CustomDropdown
                      label="3D Particle Style"
                      value={data.appearance?.particleStyle || "stars"}
                      disabled={!data.appearance?.enableParticles}
                      options={[
                        { value: "stars", label: "Glowing Stars" },
                        { value: "bubbles", label: "Hollow Bubbles" },
                        { value: "floating-cubes", label: "Isometric Wireframe Cubes" },
                        { value: "vortex", label: "Centripetal Vortex" },
                        { value: "spiral", label: "Galactic Spiral" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          particleStyle: val as any
                        }
                      }))}
                    />

                    {/* Particle Speed */}
                    <CustomDropdown
                      label="3D Particle Speed & Physics"
                      value={data.appearance?.particleSpeed || "normal"}
                      disabled={!data.appearance?.enableParticles}
                      options={[
                        { value: "slow", label: "Serene & Slow" },
                        { value: "normal", label: "Default Drift" },
                        { value: "fast", label: "Hyper Space Warp" },
                        { value: "interactive", label: "Interactive Chase (Follow Mouse)" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          particleSpeed: val as any
                        }
                      }))}
                    />

                    {/* Glow ring toggle */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Central Pulsing Glow Ring</label>
                      <label className="relative inline-flex items-center cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={data.appearance?.enableGlowRings ?? true}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              enableGlowRings: e.target.checked
                            }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                        <span className="ml-3 text-xs font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.enableGlowRings ? "Enabled" : "Disabled"}</span>
                      </label>
                    </div>

                    {/* Glow ring color picker */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Glow Ring Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.appearance?.glowRingsColor || "#8b5cf6"}
                          disabled={!data.appearance?.enableGlowRings}
                          onChange={(e) => setData(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              glowRingsColor: e.target.value
                            }
                          }))}
                          className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-700 cursor-pointer p-0 disabled:opacity-40"
                        />
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{data.appearance?.glowRingsColor || "#8b5cf6"}</span>
                      </div>
                    </div>

                    {/* 3D Geometry Mesh */}
                    <CustomDropdown
                      label="3D Geometry Mesh Overlay"
                      value={data.appearance?.geometryMeshStyle || "none"}
                      options={[
                        { value: "none", label: "No Extra Mesh (Clean)" },
                        { value: "wireframe-globe", label: "3D Rotating Wireframe Globe" },
                        { value: "floating-shapes", label: "3D Floating Pyramids" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          geometryMeshStyle: val as any
                        }
                      }))}
                    />
                  </div>
                </div>

                {/* 3. Hero Layout Configurations */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 p-6 rounded-3xl space-y-6">
                  <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm border-b border-zinc-200 dark:border-zinc-800 pb-2">Hero Section Layout & Display Style</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Preset Layout */}
                    <CustomDropdown
                      label="Hero Layout Structure"
                      value={data.appearance?.heroLayout || "split-right"}
                      options={[
                        { value: "split-right", label: "Split (Text Left, Photo Right)" },
                        { value: "split-left", label: "Split Reversed (Photo Left, Text Right)" },
                        { value: "centered", label: "Centered Minimal (Vertical Stack)" },
                        { value: "split-vertical", label: "Split Column Screen (Accent Side Panel)" },
                        { value: "banner-overlay", label: "Overlay Card Banner (Glass Panel)" },
                        { value: "floating-cards", label: "Asymmetric Floating Cards" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          heroLayout: val as any
                        }
                      }))}
                    />

                    {/* Text alignment selector */}
                    <CustomDropdown
                      label="Text Alignment"
                      value={data.appearance?.heroTextAlignment || "left"}
                      options={[
                        { value: "left", label: "Align Left" },
                        { value: "center", label: "Align Center" },
                        { value: "right", label: "Align Right" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          heroTextAlignment: val as any
                        }
                      }))}
                    />

                    {/* Typography Title Weight */}
                    <CustomDropdown
                      label="Headline Weight"
                      value={data.appearance?.heroTitleWeight || "black"}
                      options={[
                        { value: "normal", label: "Light / Regular" },
                        { value: "semibold", label: "Semibold" },
                        { value: "bold", label: "Bold" },
                        { value: "black", label: "Extra Black (Heavy)" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          heroTitleWeight: val as any
                        }
                      }))}
                    />

                    {/* Pic shape mask selector */}
                    <CustomDropdown
                      label="Profile Photo Shape"
                      value={data.appearance?.heroPicShape || "circle"}
                      options={[
                        { value: "circle", label: "Circle" },
                        { value: "rounded-square", label: "Rounded Corner Square" },
                        { value: "square", label: "Perfect Square" },
                        { value: "hexagon", label: "Hexagon Polygon Mask" },
                        { value: "blob", label: "Fluid Organic Blob Shape" },
                        { value: "hidden", label: "No Image (Text Only)" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          heroPicShape: val as any
                        }
                      }))}
                    />

                    {/* Picture border style selector */}
                    <CustomDropdown
                      label="Border Outline Frame"
                      value={data.appearance?.heroPicBorder || "conic-glow"}
                      options={[
                        { value: "conic-glow", label: "Conic Animated Gradient" },
                        { value: "pulse-solid", label: "Solid Pulsing Outline" },
                        { value: "glow-ring", label: "Electric Glow Ring Outline" },
                        { value: "none", label: "No Frame Border" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          heroPicBorder: val as any
                        }
                      }))}
                    />

                    {/* Profile Pic size slider */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Photo Border Box Size ({data.appearance?.profilePicSize || 310}px)</label>
                      <input
                        type="range"
                        min={200}
                        max={450}
                        step={10}
                        value={data.appearance?.profilePicSize || 310}
                        onChange={(e) => setData(prev => ({
                          ...prev,
                          appearance: {
                            ...prev.appearance,
                            profilePicSize: parseInt(e.target.value)
                          }
                        }))}
                        className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
                      />
                      <div className="flex justify-between text-[9px] text-zinc-500 dark:text-zinc-500">
                        <span>Small (200px)</span>
                        <span>Large (450px)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography and Fonts Section */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 p-6 rounded-3xl space-y-6">
                  <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm border-b border-zinc-200 dark:border-zinc-800 pb-2">Typography & Custom Fonts</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Google Font Selector */}
                    <CustomDropdown
                      label="Select Google Font family"
                      value={data.appearance?.selectedFont || "Inter"}
                      options={[
                        { value: "Inter", label: "Inter (Clean modern sans)" },
                        { value: "Montserrat", label: "Montserrat (Geometric modern)" },
                        { value: "Cormorant Garamond", label: "Cormorant Garamond (Premium Serif)" },
                        { value: "Outfit", label: "Outfit (Elegant premium sans)" },
                        { value: "Playfair Display", label: "Playfair Display (Classy serif)" },
                        { value: "Fira Code", label: "Fira Code (Developer monospace)" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          selectedFont: val
                        }
                      }))}
                    />

                    {/* Font Upload Box */}
                    <div className="space-y-3 p-4 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl relative">
                      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Upload Custom Font File</label>

                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            placeholder="e.g. MyBrandFont"
                            value={customFontNameInput}
                            onChange={(e) => setCustomFontNameInput(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:text-white"
                          />
                          <span className="text-[8px] text-zinc-400 mt-1 block">Input font family name first.</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex-grow flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer transition-all">
                            <Upload className="w-3.5 h-3.5" />
                            Choose .ttf / .woff / .woff2
                            <input
                              type="file"
                              accept=".ttf,.woff,.woff2"
                              onChange={handleFontUpload}
                              className="hidden"
                              disabled={isUploadingFont || !customFontNameInput}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Display Custom Font Status */}
                      {data.appearance?.customFontName && (
                        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                          <div className="text-zinc-700 dark:text-zinc-300">
                            <span className="font-bold block text-[10px] uppercase text-zinc-400 tracking-wider">Active Custom Font:</span>
                            <span className="font-extrabold text-zinc-900 dark:text-zinc-100">{data.appearance.customFontName}</span>
                          </div>
                          <button
                            type="button"
                            onClick={clearCustomFont}
                            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>


              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );

}