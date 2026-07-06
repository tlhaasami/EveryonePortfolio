"use client";

import { useState, useEffect } from "react";
import { PortfolioData } from "@/lib/mockData";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import CredentialsSection from "./CredentialsSection";
import AchievementsSection from "./AchievementsSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import AssistantPanel from "./AssistantPanel";
import ResumeDownloaderModal from "./ResumeDownloaderModal";
import { Menu, X, FileDown, Heart, Settings } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "../shared/icons";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollProgress } from "./Animations";

interface PortfolioLayoutProps {
  data: PortfolioData;
}

export default function PortfolioLayout({ data }: PortfolioLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#credentials", label: "Credentials" },
    { href: "#achievements", label: "Achievements" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-violet-500/10 selection:text-violet-900 font-sans">
      {/* Dynamic Font Loader & Style Injections */}
      {data.appearance?.selectedFont && (
        <link 
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${data.appearance.selectedFont.replace(/\s+/g, "+")}:wght@300;400;500;600;700;800;900&display=swap`}
        />
      )}
      <style dangerouslySetInnerHTML={{
        __html: `
          ${data.appearance?.customFontUrl && data.appearance?.customFontName ? `
            @font-face {
              font-family: '${data.appearance.customFontName}';
              src: url('${data.appearance.customFontUrl}') format('${data.appearance.customFontFormat || "truetype"}');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
          ` : ""}
          *, body, html, button, input, select, textarea {
            font-family: ${data.appearance?.customFontUrl && data.appearance?.customFontName 
              ? `'${data.appearance.customFontName}', sans-serif` 
              : `${data.appearance?.selectedFont || "Inter"}, sans-serif`} !important;
          }
        `
      }} />

      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Navigation Header with gradient shadow */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(0,0,0,0.03)]" 
          : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => handleScrollTo(e, "#")}
            className="text-lg font-black tracking-wider text-zinc-950 uppercase flex items-center gap-1"
          >
            <span className="gradient-text">{data.profile.name.split(" ")[0]}</span>
            <span className="text-zinc-300 font-medium">.Dev</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1.5px] after:bg-[hsl(262,83%,58%)] after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls: Admin + Resume */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              href="/admin"
              className="inline-flex items-center justify-center p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-650 hover:text-zinc-950 transition-all shadow-sm active:scale-[0.97] cursor-pointer"
              title="Admin Dashboard"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(262,83%,48%)] hover:from-[hsl(262,83%,52%)] hover:to-[hsl(262,83%,42%)] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-violet-500/15 cursor-pointer hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.97]"
            >
              Resume <FileDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/80 border border-zinc-200/60 text-zinc-500 hover:text-zinc-900 backdrop-blur-sm shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div 
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-950/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar drawer content */}
            <motion.div 
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white/95 backdrop-blur-xl border-l border-zinc-200/60 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="space-y-8">
                {/* Close Button Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <span className="text-xs font-black tracking-wider text-zinc-950 uppercase">Menu</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-zinc-50 border border-zinc-200/60 text-zinc-500 hover:text-zinc-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Vertical menu links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleScrollTo(e, link.href);
                      }}
                      className="text-sm font-bold text-zinc-500 hover:text-zinc-950 flex items-center justify-between py-1 transition-colors group"
                    >
                      {link.label}
                      <span className="opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all font-mono text-zinc-350">&rarr;</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Action drawer footer */}
              <div className="space-y-4 pt-6 border-t border-zinc-100">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsResumeOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(262,83%,48%)] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-violet-500/20"
                >
                  Download Resume <FileDown className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-zinc-400 text-center font-bold uppercase tracking-wider">
                  {data.profile.name}.Dev
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Layout */}
      <main>
        <HeroSection profile={data.profile} appearance={data.appearance} />
        <AboutSection profile={data.profile} />
        <ProjectsSection 
          projects={data.projects} 
          githubRepos={data.githubRepos}
          githubProfileUrl={data.profile.socialLinks.github}
        />
        <SkillsSection skills={data.skills} />
        <CredentialsSection experience={data.experience} education={data.education} appearance={data.appearance} />
        <AchievementsSection certificates={data.certificates} competitions={data.competitions || []} />
        <TestimonialsSection testimonials={data.testimonials} />
        <ContactSection profile={data.profile} />
      </main>

      {/* Floating Smart Assistant panel */}
      <AssistantPanel data={data} />

      {/* Resume Compilation modal trigger */}
      <ResumeDownloaderModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        data={data}
      />

      {/* Premium Footer */}
      <footer className="relative py-16 border-t border-zinc-200/60 bg-zinc-950 text-zinc-400 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-[hsl(262,83%,30%)] opacity-10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-[hsl(175,72%,30%)] opacity-8 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Column 1: Info */}
            <div className="space-y-4">
              <span className="text-sm font-black text-white tracking-wider uppercase block gradient-text">
                {data.profile.name}
              </span>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Full Stack Engineer focusing on WebGL interactive layouts, scalable backend APIs, and multi-tenant applications.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <a href={data.profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all">
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a href={data.profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Navigation</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {navLinks.map((link, idx) => (
                  <a key={idx} href={link.href} className="hover:text-white transition-colors duration-300">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Stack Tags */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Platform Core</h5>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js 16", "React 19", "Supabase", "TypeScript", "Tailwind v4"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[9px] font-semibold text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quick Connect</h5>
              <p className="text-xs text-zinc-500">Have an interesting project proposal?</p>
              <a href="mailto:hello@example.com" className="text-xs font-bold text-white hover:underline underline-offset-2 block pt-1">
                hello@example.com
              </a>
            </div>

          </div>

          <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-medium">
            <p>&copy; {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & clean code.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Admin Dashboard Trigger (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link 
          href="/admin"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white border border-zinc-800 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Access Admin CMS"
        >
          <Settings className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
        </Link>
      </div>

    </div>
  );
}
