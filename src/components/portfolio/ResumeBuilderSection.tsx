"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioData } from "@/lib/mockData";
import { FileText, Settings, Layout, Download, Check, Sparkles, Terminal, FileCode, CheckCircle2 } from "lucide-react";

interface ResumeBuilderSectionProps {
  data: PortfolioData;
}

export default function ResumeBuilderSection({ data }: ResumeBuilderSectionProps) {
  const [template, setTemplate] = useState("ats-minimal");
  const [includeProjects, setIncludeProjects] = useState(data.projects.map(p => p.title));
  const [includeSkills, setIncludeSkills] = useState(data.skills.map(s => s.name));
  const [includeExperience, setIncludeExperience] = useState(true);
  const [includeEducation, setIncludeEducation] = useState(true);
  const [includeCertificates, setIncludeCertificates] = useState(true);
  
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileSteps, setCompileSteps] = useState<string[]>([]);
  const [downloadReady, setDownloadReady] = useState(false);

  const toggleProject = (title: string) => {
    setIncludeProjects(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handleCompile = () => {
    setIsCompiling(true);
    setDownloadReady(false);
    setCompileSteps([]);

    const steps = [
      "Parsing portfolio schema files...",
      "Generating clean TeX files for compilation...",
      "Setting layout metrics: 0.75in margins, font definitions...",
      "Running pdflatex pass (1/2)...",
      "Running bibtex to reference credentials...",
      "Running pdflatex pass (2/2)...",
      "Optimizing file compression: Draco compressed PDF..."
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCompileSteps(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsCompiling(false);
            setDownloadReady(true);
          }, 800);
        }
      }, (idx + 1) * 600);
    });
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "#";
    link.setAttribute("download", `${data.profile.name.replace(/\s+/g, "_")}_Resume.pdf`);
    alert(`Starting download of ${data.profile.name.replace(/\s+/g, "_")}_Resume_${template === "ats-minimal" ? "ATS" : "Design"}.pdf`);
    setDownloadReady(false);
  };

  return (
    <section id="resume-builder" className="py-24 relative overflow-hidden bg-zinc-950/40 border-t border-zinc-900">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SaaS Showcase
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ATS-Friendly Resume Builder
          </motion.h3>
          <motion.p 
            className="text-zinc-500 text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SaaS engine preview: Compile clean, PDF resumes directly from your portfolio database using custom LaTeX layouts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Settings Customizer Column - Left side */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md">
            <div className="space-y-8">
              
              {/* Template Selection Cards */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-violet-400" /> 1. Select Layout Template
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ATS Minimal Card */}
                  <div
                    onClick={() => setTemplate("ats-minimal")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between h-[120px] ${
                      template === "ats-minimal"
                        ? "bg-violet-600/10 border-violet-500/40 text-violet-400"
                        : "bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-extrabold uppercase tracking-wide">ATS Minimal</span>
                        {template === "ats-minimal" && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        Optimized for ATS parses. Clean formatting, single column.
                      </p>
                    </div>
                    <span className="text-[9px] font-semibold text-zinc-400">Recommended for application screening</span>
                  </div>

                  {/* Awesome CV Card */}
                  <div
                    onClick={() => setTemplate("awesome-cv")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between h-[120px] ${
                      template === "awesome-cv"
                        ? "bg-violet-600/10 border-violet-500/40 text-violet-400"
                        : "bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-extrabold uppercase tracking-wide">Awesome CV</span>
                        {template === "awesome-cv" && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        Design-rich visual layout. Two columns, colored accents.
                      </p>
                    </div>
                    <span className="text-[9px] font-semibold text-zinc-400">Best for creative & tech reviewers</span>
                  </div>
                </div>
              </div>

              {/* Sections checklist */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-cyan-400" /> 2. Toggle Sections
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/50 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={includeExperience}
                      onChange={(e) => setIncludeExperience(e.target.checked)}
                      className="rounded border-zinc-800 text-violet-600 bg-zinc-950 focus:ring-violet-500/25 w-4 h-4"
                    />
                    <span className="text-xs text-zinc-300 font-semibold">Experience</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/50 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={includeEducation}
                      onChange={(e) => setIncludeEducation(e.target.checked)}
                      className="rounded border-zinc-800 text-violet-600 bg-zinc-950 focus:ring-violet-500/25 w-4 h-4"
                    />
                    <span className="text-xs text-zinc-300 font-semibold">Education</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/50 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={includeCertificates}
                      onChange={(e) => setIncludeCertificates(e.target.checked)}
                      className="rounded border-zinc-800 text-violet-600 bg-zinc-950 focus:ring-violet-500/25 w-4 h-4"
                    />
                    <span className="text-xs text-zinc-300 font-semibold">Certificates</span>
                  </label>
                </div>
              </div>

              {/* Individual Project Selector */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                  3. Select Featured Projects
                </h4>
                <div className="space-y-2.5">
                  {data.projects.map((project, idx) => {
                    const isChecked = includeProjects.includes(project.title);
                    return (
                      <div 
                        key={idx}
                        onClick={() => toggleProject(project.title)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked 
                            ? "bg-zinc-950/60 border-zinc-800 text-zinc-200" 
                            : "bg-zinc-950/10 border-zinc-900/50 text-zinc-650"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">{project.title}</span>
                          <span className="text-[9px] text-zinc-500 mt-0.5">{project.technologies.slice(0, 3).join(", ")}</span>
                        </div>
                        {isChecked ? (
                          <div className="p-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <span className="w-5 h-5 border border-zinc-850 rounded-md" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* LaTeX Compiler / Button controls */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-4">
              <AnimatePresence>
                {isCompiling && (
                  <motion.div 
                    className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 font-mono text-[9px] text-zinc-400 space-y-2 max-h-[140px] overflow-y-auto"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center gap-2 text-violet-400 font-bold mb-1.5 border-b border-zinc-900 pb-1">
                      <Terminal className="w-3.5 h-3.5" />
                      LaTeX Builder Stream
                    </div>
                    {compileSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-zinc-500">
                        <span className="text-violet-500">✓</span> {step}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {downloadReady ? (
                <button
                  onClick={triggerDownload}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-500/15"
                >
                  Download Compiled PDF <Download className="w-4.5 h-4.5" />
                </button>
              ) : (
                <button
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:brightness-110 text-white font-bold transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-violet-500/10"
                >
                  Compile PDF Resume <Sparkles className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Live Document Sheet Preview - Right side */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" /> Interactive Document Sheet Preview
            </h4>
            
            {/* Visual sheet with two layouts styled to mimic a real professional print CV */}
            <div className="w-full max-w-[500px] aspect-[1/1.41] bg-white text-zinc-900 p-8 shadow-2xl rounded-2xl border border-zinc-200/50 flex flex-col justify-between text-[9px] leading-relaxed overflow-hidden font-sans relative">
              
              {/* Layout 1: Awesome CV (Design layout) */}
              {template === "awesome-cv" ? (
                <div className="h-full flex flex-col justify-between">
                  {/* Top banner accent stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
                  
                  {/* Header */}
                  <div className="flex justify-between items-start border-b border-zinc-200 pb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-wide leading-none">{data.profile.name}</h3>
                      <p className="text-xs text-violet-600 font-bold mt-1.5">{data.profile.title}</p>
                    </div>
                    <div className="text-right text-[8px] text-zinc-500 leading-normal font-medium">
                      <p>hello@example.com</p>
                      <p>+1 (234) 567-890</p>
                      <p>github.com/example</p>
                    </div>
                  </div>

                  {/* Body columns */}
                  <div className="grid grid-cols-12 gap-5 mt-4 flex-1">
                    
                    {/* Left Column (Main content: Experience & Projects) */}
                    <div className="col-span-8 space-y-4">
                      {/* Experience */}
                      {includeExperience && (
                        <div>
                          <h4 className="font-extrabold text-[10px] text-zinc-900 border-b border-zinc-200 pb-0.5 uppercase mb-2 tracking-wider">Experience</h4>
                          <div className="space-y-3">
                            {data.experience.map((job, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-baseline font-bold text-zinc-950 text-[9px]">
                                  <span>{job.position} @ <span className="text-violet-600">{job.company}</span></span>
                                  <span className="text-[7.5px] text-zinc-400 font-normal">{job.timeline}</span>
                                </div>
                                <p className="text-zinc-500 text-[8px] leading-normal">{job.responsibilities[0]}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Projects */}
                      {includeProjects.length > 0 && (
                        <div>
                          <h4 className="font-extrabold text-[10px] text-zinc-900 border-b border-zinc-200 pb-0.5 uppercase mb-2 tracking-wider">Featured Projects</h4>
                          <div className="space-y-3">
                            {data.projects.filter(p => includeProjects.includes(p.title)).map((project, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-baseline font-bold text-zinc-950 text-[9px]">
                                  <span>{project.title}</span>
                                  <span className="text-[7.5px] text-zinc-400 font-normal">{project.duration}</span>
                                </div>
                                <p className="text-zinc-500 text-[8px] leading-normal">{project.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column (Side data: Skills, Education, Certifications) */}
                    <div className="col-span-4 space-y-4 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                      
                      {/* Education */}
                      {includeEducation && (
                        <div>
                          <h4 className="font-extrabold text-[8.5px] text-zinc-900 border-b border-zinc-200 pb-0.5 uppercase mb-2 tracking-wider">Education</h4>
                          {data.education.map((edu, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <p className="font-bold text-zinc-950 text-[8px] leading-tight">{edu.degree}</p>
                              <p className="text-[7.5px] text-zinc-500">{edu.institution}</p>
                              <p className="text-[7.5px] text-zinc-400 font-medium">GPA: {edu.cgpa}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Certificates */}
                      {includeCertificates && (
                        <div>
                          <h4 className="font-extrabold text-[8.5px] text-zinc-900 border-b border-zinc-200 pb-0.5 uppercase mb-2 tracking-wider">Certificates</h4>
                          <div className="space-y-1.5">
                            {data.certificates.slice(0, 3).map((cert, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <p className="font-bold text-zinc-950 text-[8px] leading-tight">{cert.name}</p>
                                <p className="text-[7.5px] text-zinc-400">{cert.organization}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills */}
                      <div>
                        <h4 className="font-extrabold text-[8.5px] text-zinc-900 border-b border-zinc-200 pb-0.5 uppercase mb-2 tracking-wider">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {data.skills.slice(0, 10).map((skill, idx) => (
                            <span 
                              key={idx} 
                              className="px-1.5 py-0.5 rounded bg-zinc-200/50 border border-zinc-200 text-zinc-700 font-bold text-[7.5px]"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              ) : (
                /* Layout 2: ATS Minimal (Standard application layout) */
                <div className="h-full flex flex-col justify-between font-serif">
                  
                  {/* Centered clean header */}
                  <div className="text-center pb-3 border-b border-zinc-300">
                    <h3 className="text-2xl font-bold text-zinc-950 tracking-wide">{data.profile.name}</h3>
                    <p className="text-zinc-600 text-xs mt-1 italic">{data.profile.title}</p>
                    <p className="text-zinc-500 text-[8px] mt-1 font-mono">hello@example.com | +1 (234) 567-890 | github.com/example</p>
                  </div>

                  <div className="mt-4 flex-1 space-y-4">
                    
                    {/* Education */}
                    {includeEducation && (
                      <div>
                        <h4 className="font-bold text-[10px] text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase mb-2 tracking-widest">Education</h4>
                        {data.education.map((edu, idx) => (
                          <div key={idx} className="flex justify-between items-baseline font-bold text-zinc-950 text-[9px]">
                            <span>{edu.institution} — <span className="font-normal italic">{edu.degree}</span></span>
                            <span className="font-normal text-zinc-500">{edu.cgpa} GPA</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Experience */}
                    {includeExperience && (
                      <div>
                        <h4 className="font-bold text-[10px] text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase mb-2 tracking-widest">Professional Experience</h4>
                        <div className="space-y-3">
                          {data.experience.map((job, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-baseline font-bold text-zinc-950 text-[9px]">
                                <span>{job.position} | {job.company}</span>
                                <span className="font-normal text-zinc-500 text-[8px]">{job.timeline}</span>
                              </div>
                              <p className="text-zinc-550 text-[8.5px] leading-normal">{job.responsibilities[0]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {includeProjects.length > 0 && (
                      <div>
                        <h4 className="font-bold text-[10px] text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase mb-2 tracking-widest">Featured Projects</h4>
                        <div className="space-y-3">
                          {data.projects.filter(p => includeProjects.includes(p.title)).map((project, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-baseline font-bold text-zinc-950 text-[9px]">
                                <span>{project.title} — <span className="font-normal italic">{project.technologies.slice(0, 3).join(", ")}</span></span>
                                <span className="font-normal text-zinc-500 text-[8px]">{project.duration}</span>
                              </div>
                              <p className="text-zinc-550 text-[8.5px] leading-normal">{project.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certificates */}
                    {includeCertificates && (
                      <div>
                        <h4 className="font-bold text-[10px] text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase mb-2 tracking-widest">Certifications</h4>
                        <div className="grid grid-cols-2 gap-2 text-zinc-800 text-[8px] leading-tight">
                          {data.certificates.map((cert, idx) => (
                            <div key={idx}>
                              <span className="font-bold text-zinc-950">{cert.name}</span> — <span className="text-zinc-500">{cert.organization}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div>
                      <h4 className="font-bold text-[10px] text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase mb-2 tracking-widest">Technical Skills</h4>
                      <p className="text-zinc-700 text-[8.5px] font-medium leading-relaxed font-sans">
                        {data.skills.map(s => s.name).join(" • ")}
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
