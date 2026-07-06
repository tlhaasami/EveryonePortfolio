"use client";

import React, { useState, useEffect, useRef } from "react";
import { PortfolioData, Project, Skill, Experience, Education, Certificate, Competition, GithubRepo } from "@/lib/mockData";
import { 
  User, Code, Briefcase, Award, Save, Plus, Trash2, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, Palette, Upload, ChevronDown
} from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

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
}

function CustomDropdown({ label, value, options, onChange }: CustomDropdownProps) {
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
    <div className="space-y-2 relative text-left" ref={dropdownRef}>
      <label className="block text-[10px] font-bold text-zinc-450 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 cursor-pointer shadow-sm text-left transition-all"
        >
          <span>{selectedOption?.label}</span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-30 w-full bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-zinc-50 cursor-pointer transition-colors block ${
                    opt.value === value 
                      ? "bg-zinc-950 text-white hover:bg-zinc-900" 
                      : "text-zinc-700"
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
    resize();
  }, [value]);

  return (
    <div className="space-y-2 text-left">
      <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block">{label}</label>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e);
          resize();
        }}
        className={`w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors overflow-hidden resize-none ${className}`}
        {...props}
      />
    </div>
  );
}

type TabType = "profile" | "skills-projects" | "experience-education" | "certs-wins" | "github-sync" | "appearance";

export default function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [githubUsername, setGithubUsername] = useState("");
  const [isScraping, setIsScraping] = useState(false);
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
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...newSkill, featured: true, displayOrder: prev.skills.length + 1 } as Skill]
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

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[hsl(262,83%,92%)] opacity-20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[hsl(175,72%,90%)] opacity-25 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Navigation / Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-950 transition-colors uppercase tracking-wider mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Live Portfolio
            </Link>
            <h1 className="text-3xl font-black text-zinc-950 tracking-tight flex items-center gap-2">
              Portfolio CMS Dashboard <span className="text-xs px-2.5 py-1 bg-violet-100 text-violet-700 font-bold rounded-full uppercase tracking-wider">Local Host</span>
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(262,83%,48%)] hover:from-[hsl(262,83%,52%)] hover:to-[hsl(262,83%,42%)] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Changes
          </button>
        </div>

        {/* Dynamic Notification bar */}
        {notification && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 border shadow-sm ${
            notification.type === "success" 
              ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}>
            {notification.type === "success" ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm font-semibold">{notification.message}</span>
          </div>
        )}

        {/* Tab Layout Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Tabs Bar */}
          <div className="lg:col-span-3 flex flex-col gap-2 bg-white p-4 rounded-3xl border border-zinc-200/80 shadow-sm">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-3 mb-2">Sections CMS</h3>
            {[
              { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
              { id: "skills-projects", label: "Skills & Projects", icon: <Code className="w-4 h-4" /> },
              { id: "experience-education", label: "Experience & Edu", icon: <Briefcase className="w-4 h-4" /> },
              { id: "certs-wins", label: "Certs & Wins", icon: <Award className="w-4 h-4" /> },
              { id: "github-sync", label: "GitHub Sync", icon: <GithubIcon className="w-4 h-4" /> },
              { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    active 
                      ? "bg-zinc-950 text-white shadow-md shadow-zinc-900/10" 
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Tabs Content Panels */}
          <div className="lg:col-span-9 bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-sm space-y-6">
            
            {/* 1. Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-zinc-900 border-b border-zinc-100 pb-3">Personal Profile</h2>
                
                {/* Profile Pic Upload Box */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-zinc-50 border border-zinc-200/60 rounded-3xl">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-zinc-200 flex-shrink-0">
                    {data.profile.heroImage ? (
                      <img src={data.profile.heroImage} alt="Avatar Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 text-[10px]">No Pic</div>
                    )}
                    {isUploadingAvatar && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h3 className="font-extrabold text-xs text-zinc-900">Change Profile Image</h3>
                    <p className="text-[9px] text-zinc-450 leading-relaxed max-w-md">Upload a fresh JPG, PNG, or WebP picture. The profile image displays in the Hero section of the homepage.</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all active:scale-[0.97] w-fit shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      Upload New Image
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarUpload}
                        className="hidden"
                        disabled={isUploadingAvatar}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={data.profile.name}
                      onChange={(e) => setData({
                        ...data,
                        profile: { ...data.profile, name: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">Professional Title</label>
                    <input 
                      type="text" 
                      value={data.profile.title}
                      onChange={(e) => setData({
                        ...data,
                        profile: { ...data.profile, title: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">Subtitle / CTA Tagline</label>
                  <input 
                    type="text" 
                    value={data.profile.subtitle}
                    onChange={(e) => setData({
                      ...data,
                      profile: { ...data.profile, subtitle: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">Short Introduction</label>
                  <input 
                    type="text" 
                    value={data.profile.introduction}
                    onChange={(e) => setData({
                      ...data,
                      profile: { ...data.profile, introduction: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors"
                  />
                </div>

                <AutoResizingTextarea 
                  label="Biography (Detail)"
                  rows={4}
                  value={data.profile.biography}
                  onChange={(e) => setData({
                    ...data,
                    profile: { ...data.profile, biography: e.target.value }
                  })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  <div>
                    <label className="text-[10px] font-bold text-zinc-455 uppercase tracking-widest block mb-2">Current Tech Focus</label>
                    <input 
                      type="text" 
                      value={data.profile.currentFocus}
                      onChange={(e) => setData({
                        ...data,
                        profile: { ...data.profile, currentFocus: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-6 space-y-4">
                  <h3 className="font-bold text-zinc-900 text-sm">Social Handles & Connections</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] font-bold text-zinc-400 uppercase block mb-1">GitHub Profile Link</label>
                      <input 
                        type="text" 
                        value={data.profile.socialLinks.github}
                        onChange={(e) => setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            socialLinks: { ...data.profile.socialLinks, github: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-violet-500/60 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-zinc-400 uppercase block mb-1">LinkedIn Profile Link</label>
                      <input 
                        type="text" 
                        value={data.profile.socialLinks.linkedin}
                        onChange={(e) => setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            socialLinks: { ...data.profile.socialLinks, linkedin: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-violet-500/60 focus:bg-white"
                      />
                    </div>
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
                        <button type="button" onClick={() => removeSkill(idx)} className="text-zinc-450 hover:text-rose-500">
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
                <div className="space-y-4 pt-6 border-t border-zinc-150">
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
                <div className="space-y-4 pt-6 border-t border-zinc-150">
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
                        <button type="button" onClick={() => removeCert(idx)} className="p-1.5 text-zinc-450 hover:text-rose-500">
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
                <div className="space-y-4 pt-6 border-t border-zinc-150">
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
                        <button type="button" onClick={() => removeComp(idx)} className="p-1.5 text-zinc-450 hover:text-rose-500">
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
                          <div className="flex gap-3 text-[9px] font-bold text-zinc-450">
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
                <div>
                  <h2 className="text-xl font-black text-zinc-950">Appearance & Layout Settings</h2>
                  <p className="text-xs text-zinc-400 mt-1">Customize typography, fonts, and the layout style of your homepage profile picture.</p>
                </div>

                {/* Profile Pic Settings Grid */}
                <div className="bg-zinc-50 border border-zinc-200/60 p-6 rounded-3xl space-y-6">
                  <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-250 pb-2">Profile Picture Customization</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Size slider */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-zinc-550 uppercase tracking-wider">Profile Pic Size ({data.appearance?.profilePicSize || 310}px)</label>
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
                        className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                      />
                      <div className="flex justify-between text-[9px] text-zinc-400">
                        <span>Small (200px)</span>
                        <span>Large (450px)</span>
                      </div>
                    </div>

                    {/* Shape Selector */}
                    <CustomDropdown 
                      label="Pic Shape"
                      value={data.appearance?.profilePicShape || "circle"}
                      options={[
                        { value: "circle", label: "Circle (Default)" },
                        { value: "rounded-square", label: "Rounded Square" },
                        { value: "square", label: "Square" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          profilePicShape: val as any
                        }
                      }))}
                    />

                    {/* Placement Selector */}
                    <CustomDropdown 
                      label="Placement (Hero Layout)"
                      value={data.appearance?.profilePicPlacement || "right"}
                      options={[
                        { value: "right", label: "Right (Text Left, Photo Right)" },
                        { value: "left", label: "Left (Photo Left, Text Right)" },
                        { value: "center", label: "Center Stacked (Centered Vertical)" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          profilePicPlacement: val as any
                        }
                      }))}
                    />
                  </div>
                </div>

                {/* Typography and Fonts Section */}
                <div className="bg-zinc-50 border border-zinc-200/60 p-6 rounded-3xl space-y-6">
                  <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-250 pb-2">Typography & Custom Fonts</h3>

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
                    <div className="space-y-3 p-4 bg-white border border-zinc-200/80 rounded-2xl relative">
                      <label className="block text-[10px] font-bold text-zinc-550 uppercase tracking-wider">Upload Custom Font File</label>
                      
                      <div className="space-y-3">
                        <div>
                          <input 
                            type="text" 
                            placeholder="e.g. MyBrandFont" 
                            value={customFontNameInput}
                            onChange={(e) => setCustomFontNameInput(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400"
                          />
                          <span className="text-[8px] text-zinc-400 mt-1 block">Input font family name first.</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex-grow flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-xs font-bold text-zinc-700 cursor-pointer transition-all">
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
                        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                          <div className="text-zinc-650">
                            <span className="font-bold block text-[10px] uppercase text-zinc-400 tracking-wider">Active Custom Font:</span>
                            <span className="font-extrabold text-zinc-900">{data.appearance.customFontName}</span>
                          </div>
                          <button 
                            type="button" 
                            onClick={clearCustomFont}
                            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Animations Options Section */}
                <div className="bg-zinc-50 border border-zinc-200/60 p-6 rounded-3xl space-y-6">
                  <h3 className="font-extrabold text-zinc-900 text-sm border-b border-zinc-250 pb-2">Animation Options</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Text animations */}
                    <CustomDropdown 
                      label="Text Entrance Style"
                      value={data.appearance?.textAnimationStyle || "fade-in-up"}
                      options={[
                        { value: "fade-in-up", label: "Fade In Up (Classic)" },
                        { value: "slide-in-left", label: "Slide In Left (Dynamic)" },
                        { value: "typewriter", label: "Typewriter Lettering (Interactive)" },
                        { value: "scale-up", label: "Scale In (Zoom-Reveal)" },
                        { value: "none", label: "None (Static Display)" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          textAnimationStyle: val as any
                        }
                      }))}
                    />

                    {/* Dropdown transitions */}
                    <CustomDropdown 
                      label="Accordion/Dropdown Style"
                      value={data.appearance?.dropdownAnimationStyle || "slide-down"}
                      options={[
                        { value: "slide-down", label: "Slide Down Unroll (Classic)" },
                        { value: "fade-scale", label: "Fade & Scale Expand (Premium)" },
                        { value: "skew-unroll", label: "Skew & Unroll (3D Dynamic)" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          dropdownAnimationStyle: val as any
                        }
                      }))}
                    />

                    {/* Continuous animations */}
                    <CustomDropdown 
                      label="Continuous Text Animation"
                      value={data.appearance?.continuousAnimationStyle || "none"}
                      options={[
                        { value: "none", label: "None (Static Display)" },
                        { value: "glowing", label: "Glowing Shadow Pulse" },
                        { value: "pulsing", label: "Breathing Zoom Loop" },
                        { value: "wiggle", label: "Wiggle Shake Loop" }
                      ]}
                      onChange={(val) => setData(prev => ({
                        ...prev,
                        appearance: {
                          ...prev.appearance,
                          continuousAnimationStyle: val as any
                        }
                      }))}
                    />
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
