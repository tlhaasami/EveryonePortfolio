"use client";

import { useState, useEffect } from "react";
import { PortfolioData } from "@/lib/mockData";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ContactSection from "./ContactSection";
import { Menu, X } from "lucide-react";

interface PortfolioLayoutProps {
  data: PortfolioData;
}

export default function PortfolioLayout({ data }: PortfolioLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-zinc-950/75 border-b border-zinc-900/80 backdrop-blur-md py-4" 
          : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent uppercase">
            {data.profile.name.split(" ")[0]}.Dev
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                className="text-sm font-semibold text-zinc-400 hover:text-white hover:underline transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Call to action header button */}
          <div className="hidden md:block">
            <a 
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-white transition-all"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-zinc-950 flex flex-col justify-center items-center gap-8 md:hidden">
          {navLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-zinc-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-bold uppercase tracking-widest text-white shadow-lg"
          >
            Hire Me
          </a>
        </div>
      )}

      {/* Main Content Layout */}
      <main className="pt-20">
        <HeroSection profile={data.profile} />
        <ProjectsSection projects={data.projects} />
        <SkillsSection skills={data.skills} />
        <ExperienceSection experience={data.experience} />
        <ContactSection profile={data.profile} />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950 text-center">
        <div className="container mx-auto px-6">
          <p className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent uppercase mb-4">
            {data.profile.name}
          </p>
          <p className="text-xs text-zinc-600 leading-relaxed mb-6">
            &copy; {new Date().getFullYear()} EveryonePortfolio. All rights reserved.<br />
            Built with Next.js, Tailwind CSS, and Supabase.
          </p>
        </div>
      </footer>

    </div>
  );
}
