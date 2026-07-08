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

const parseLatexToHtml = (latex: string) => {
  if (!latex) return [];
  const lines = latex.split("\n");
  const elements: any[] = [];
  let currentSection: string | null = null;
  let sectionText: string[] = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith("\\section*{")) {
      if (currentSection) {
        elements.push({ type: "section", title: currentSection, content: sectionText.join("\n") });
      }
      currentSection = trimmed.replace("\\section*{", "").replace("}", "");
      sectionText = [];
    } else if (trimmed.startsWith("\\begin{center}") || trimmed.startsWith("\\end{center}")) {
      // ignore
    } else if (
      trimmed.startsWith("\\documentclass") || 
      trimmed.startsWith("\\usepackage") || 
      trimmed.startsWith("\\geometry") || 
      trimmed.startsWith("\\begin{document}") || 
      trimmed.startsWith("\\end{document}")
    ) {
      // ignore
    } else {
      let cleaned = trimmed
        .replace(/\\textbf{([^}]+)}/g, "$1")
        .replace(/\\textit{([^}]+)}/g, "$1")
        .replace(/\\LARGE/g, "")
        .replace(/\\textbf/g, "")
        .replace(/\\textit/g, "")
        .replace(/\\hfill/g, "  ")
        .replace(/\\\\/g, "")
        .replace(/[{}]/g, "");
      if (cleaned) {
        if (currentSection) {
          sectionText.push(cleaned);
        } else {
          elements.push({ type: "text", content: cleaned });
        }
      }
    }
  });

  if (currentSection) {
    elements.push({ type: "section", title: currentSection, content: sectionText.join("\n") });
  }
  return elements;
};

export default function ResumeDownloaderModal({ isOpen, onClose, data }: ResumeDownloaderModalProps) {
  const [fontFamily, setFontFamily] = useState(data.profile.resumeFontFamily || "sans");
  const [fontSize, setFontSize] = useState(data.profile.resumeFontSize || "medium");
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
            </span>            {/* Document sheet */}
            <div 
              className={`w-full max-w-[340px] aspect-[1/1.41] bg-white border border-zinc-200 shadow-xl p-6 flex flex-col justify-start overflow-hidden text-zinc-800 leading-normal text-left ${
                fontFamily === "sans" ? "font-sans" : fontFamily === "serif" ? "font-serif" : "font-mono"
              } ${
                fontSize === "small" ? "text-[6px]" : fontSize === "medium" ? "text-[8px]" : "text-[10px]"
              }`}
            >
              {/* LaTeX parse nodes list */}
              <div className="space-y-3">
                {parseLatexToHtml(data.profile.resumeLatex || "").map((item: any, itemIdx: number) => {
                  if (item.type === "section") {
                    return (
                      <div key={itemIdx} className="space-y-1">
                        <h4 className="font-extrabold uppercase border-b border-zinc-300 pb-0.5 text-zinc-900 tracking-wide text-[8px]">
                          {item.title}
                        </h4>
                        <p className="text-zinc-655 whitespace-pre-line text-justify font-medium">
                          {item.content}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <p key={itemIdx} className="text-center font-semibold text-zinc-600 whitespace-pre-line">
                      {item.content}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
