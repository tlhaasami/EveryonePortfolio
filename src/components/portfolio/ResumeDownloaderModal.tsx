"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioData } from "@/lib/mockData";
import { FileText, Layout, Settings, Sparkles, Terminal, Download, X, Check } from "lucide-react";

interface ResumeDownloaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export default function ResumeDownloaderModal({ isOpen, onClose, data }: ResumeDownloaderModalProps) {
  const [fontFamily, setFontFamily] = useState("sans");
  const [fontSize, setFontSize] = useState("medium");
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileSteps, setCompileSteps] = useState<string[]>([]);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleCompile = () => {
    setIsCompiling(true);
    setDownloadReady(false);
    setCompileSteps([]);

    const steps = [
      "Parsing profile schema fields...",
      "Generating standard LaTeX source...",
      `Loading template font family: ${fontFamily === "sans" ? "Helvetica" : fontFamily === "serif" ? "Times New Roman" : "Courier"}...`,
      `Setting baseline text size to ${fontSize === "small" ? "9pt" : fontSize === "medium" ? "10.5pt" : "12pt"}...`,
      "Compiling LaTeX files (pdflatex pass 1/2)...",
      "Binding education & certifications nodes...",
      "Compiling final pass (pdflatex pass 2/2)...",
      "Optimizing compression sizes..."
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCompileSteps(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsCompiling(false);
            setDownloadReady(true);
          }, 600);
        }
      }, (idx + 1) * 500);
    });
  };

  const triggerDownload = () => {
    alert(`Downloading ${data.profile.name.replace(/\s+/g, "_")}_Resume.pdf`);
    setDownloadReady(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-zinc-200 rounded-3xl overflow-y-auto shadow-2xl flex flex-col md:flex-row text-zinc-900"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Panel: Controls */}
          <div className="flex-1 p-8 border-r border-zinc-100 flex flex-col justify-between bg-zinc-50/50">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-950 mb-1">Resume Compiler</h3>
                <p className="text-xs text-zinc-500">Configure and download Alex's resume document.</p>
              </div>

              {/* Font Family Selection */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5 text-violet-500" /> Font Family
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {["sans", "serif", "mono"].map((font) => (
                    <button
                      key={font}
                      onClick={() => setFontFamily(font)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                        fontFamily === font
                          ? "bg-violet-600/10 border-violet-500/40 text-violet-600"
                          : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400"
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Selection */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-cyan-500" /> Font Size
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {["small", "medium", "large"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                        fontSize === size
                          ? "bg-violet-600/10 border-violet-500/40 text-violet-600"
                          : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* LaTeX Logs & Button */}
            <div className="mt-8 pt-6 border-t border-zinc-200 space-y-4">
              <AnimatePresence>
                {isCompiling && (
                  <motion.div
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[9px] text-zinc-400 space-y-1.5 max-h-[120px] overflow-y-auto"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center gap-1.5 text-violet-400 font-bold border-b border-zinc-900 pb-1 mb-1">
                      <Terminal className="w-3 h-3" />
                      LaTeX Builder Logs
                    </div>
                    {compileSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="text-violet-500">✓</span> {step}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {downloadReady ? (
                <button
                  onClick={triggerDownload}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/15"
                >
                  Download PDF <Download className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  Compile PDF <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Panel: Live sheet preview */}
          <div className="flex-1 p-8 bg-zinc-100/50 flex flex-col items-center justify-center min-h-[400px]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> A4 Print Preview
            </span>

            {/* Document sheet */}
            <div 
              className={`w-full max-w-[340px] aspect-[1/1.41] bg-white border border-zinc-200 shadow-xl p-6 flex flex-col justify-between overflow-hidden text-zinc-800 leading-normal ${
                fontFamily === "sans" ? "font-sans" : fontFamily === "serif" ? "font-serif" : "font-mono"
              } ${
                fontSize === "small" ? "text-[6px]" : fontSize === "medium" ? "text-[8px]" : "text-[10px]"
              }`}
            >
              {/* Header */}
              <div className="text-center border-b border-zinc-300 pb-2 mb-2">
                <h4 className="font-extrabold uppercase text-zinc-950 text-[10px] sm:text-xs leading-none">{data.profile.name}</h4>
                <p className="text-[7px] text-violet-600 font-bold mt-1 leading-none">{data.profile.title}</p>
                <p className="text-[6px] text-zinc-400 mt-1 leading-none">hello@example.com | +1 (234) 567-890 | github.com/example</p>
              </div>

              {/* Bio snippet */}
              <p className="text-zinc-500 text-[6.5px] italic leading-normal mb-2">
                {data.profile.biography.slice(0, 150)}...
              </p>

              {/* Experience */}
              <div className="space-y-1.5">
                <h5 className="font-black text-zinc-900 border-b border-zinc-200 pb-0.5 uppercase tracking-wide text-[7px] sm:text-[8px]">Experience</h5>
                {data.experience.map((job, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-bold text-zinc-950 text-[7px]">
                      <span>{job.position} @ {job.company}</span>
                      <span className="text-zinc-400 font-normal">{job.timeline}</span>
                    </div>
                    <p className="text-zinc-500 text-[6.5px] leading-tight">{job.responsibilities[0]}</p>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="space-y-1.5 mt-2">
                <h5 className="font-black text-zinc-900 border-b border-zinc-200 pb-0.5 uppercase tracking-wide text-[7px] sm:text-[8px]">Projects</h5>
                {data.projects.slice(0, 2).map((project, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-bold text-zinc-950 text-[7px]">
                      <span>{project.title}</span>
                      <span className="text-zinc-400 font-normal">{project.duration}</span>
                    </div>
                    <p className="text-zinc-500 text-[6.5px] leading-tight">{project.description}</p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="space-y-1.5 mt-2">
                <h5 className="font-black text-zinc-900 border-b border-zinc-200 pb-0.5 uppercase tracking-wide text-[7px] sm:text-[8px]">Education</h5>
                {data.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between font-bold text-zinc-950 text-[7px]">
                    <span>{edu.institution} | {edu.degree}</span>
                    <span className="text-zinc-400 font-normal">GPA: {edu.cgpa}</span>
                  </div>
                ))}
              </div>

              {/* Skills footer */}
              <div className="pt-2 border-t border-zinc-200">
                <p className="text-zinc-600 text-[6px] font-semibold leading-relaxed">
                  <span className="font-bold uppercase text-zinc-950">Technical Skills:</span> {data.skills.map(s => s.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
