"use client";

import { useState, useEffect } from "react";
import { PortfolioData } from "@/lib/mockData";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import CredentialsSection from "./CredentialsSection";
import CertificatesSection from "./CertificatesSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import AssistantPanel from "./AssistantPanel";
import ResumeDownloaderModal from "./ResumeDownloaderModal";
import { Menu, X, FileDown, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    { href: "#certificates", label: "Certificates" },
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
      const offset = 80; // sticky header height offset
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
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-violet-500/10 selection:text-violet-900 font-sans">
      
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/85 border-b border-zinc-200/80 backdrop-blur-md py-4" 
          : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => handleScrollTo(e, "#")}
            className="text-lg font-black tracking-wider text-zinc-950 uppercase flex items-center gap-1"
          >
            <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">{data.profile.name.split(" ")[0]}</span>
            <span className="text-zinc-400 font-medium">.Dev</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Resume Downloader Button on far right */}
          <div className="hidden lg:block">
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              Resume <FileDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-500 hover:text-zinc-900"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Slide-out Sidebar Panel */}
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
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white border-l border-zinc-200 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
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
                    className="p-2 rounded-xl bg-zinc-50 border border-zinc-150 text-zinc-500 hover:text-zinc-900"
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
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
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
        <HeroSection profile={data.profile} />
        <AboutSection profile={data.profile} />
        <ProjectsSection 
          projects={data.projects} 
          githubRepos={data.githubRepos}
          githubProfileUrl={data.profile.socialLinks.github}
        />
        <SkillsSection skills={data.skills} />
        <CredentialsSection experience={data.experience} education={data.education} />
        <CertificatesSection certificates={data.certificates} />
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

      {/* Enhanced Footer */}
      <footer className="py-16 border-t border-zinc-200 bg-zinc-50/50 text-zinc-650">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Info */}
            <div className="space-y-4">
              <span className="text-sm font-black text-zinc-950 tracking-wider uppercase block">
                {data.profile.name}
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full Stack Engineer focusing on WebGL interactive layouts, scalable backend APIs, and multi-tenant applications.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Navigation</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {navLinks.map((link, idx) => (
                  <a key={idx} href={link.href} className="hover:text-zinc-950 transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Stack Tags */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Platform Core</h5>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js 16", "React 19", "Supabase", "TypeScript", "Tailwind v4"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-white border border-zinc-200 text-[9px] font-semibold text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Quick Connect</h5>
              <p className="text-xs text-zinc-500">Have an interesting project proposal?</p>
              <a href="mailto:hello@example.com" className="text-xs font-bold text-zinc-900 hover:underline block pt-1">
                hello@example.com
              </a>
            </div>

          </div>

          <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-medium">
            <p>&copy; {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & clean code.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
