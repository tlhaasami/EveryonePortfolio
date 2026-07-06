"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ShieldCheck, TrendingUp, X, Send, Bot, User, CheckCircle2, ChevronRight } from "lucide-react";
import { PortfolioData } from "@/lib/mockData";

interface AssistantPanelProps {
  data: PortfolioData;
}

const CAREER_PROFILES = {
  "frontend-architect": {
    name: "Frontend Architect",
    match: 95,
    missing: ["Next.js App Router performance profiling", "WebGL shaders custom optimization"],
    roadmap: ["Core JS/TS Mastery", "React & Next.js scaling architectures", "WebGL & 3D Interactive Graphics", "CI/CD & Advanced Performance Auditing"]
  },
  "fullstack-developer": {
    name: "Full Stack Developer",
    match: 98,
    missing: ["Docker containers setup"],
    roadmap: ["HTML/CSS/JS Basics", "React & Tailwind CSS layout builds", "Node.js REST & SQL DB integrations", "Cloud Deployments & Docker containerization"]
  },
  "machine-learning": {
    name: "Machine Learning Engineer",
    match: 45,
    missing: ["Python pandas/numpy advanced processing", "TensorFlow & PyTorch training datasets", "Deep Learning Neural Networks"],
    roadmap: ["Python Programming basics", "Linear Algebra & Statistics math foundations", "Data Processing & Regression modeling", "Deep Learning frameworks & LLM hosting"]
  }
};

export default function AssistantPanel({ data }: AssistantPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "health" | "gap">("chat");
  const [messages, setMessages] = useState<{ sender: "ai" | "user"; text: string }[]>([
    { sender: "ai", text: "Hello! I am Alex's Portfolio Assistant. Ask me anything about their projects, technical skills, certifications, or experience!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [targetCareer, setTargetCareer] = useState<keyof typeof CAREER_PROFILES>("frontend-architect");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Client-Side RAG Simulator
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInputValue("");

    setTimeout(() => {
      let aiResponse = "I'm sorry, I couldn't find details in the portfolio content relating to that. Could you ask about Alex's projects, experience, or skills?";
      const lower = userText.toLowerCase();

      if (lower.includes("who") || lower.includes("name") || lower.includes("alex") || lower.includes("about")) {
        aiResponse = `Alex Carter is a ${data.profile.title}. They are focused on ${data.profile.currentFocus} and have interests in ${data.profile.interests.join(", ")}.`;
      } else if (lower.includes("project") || lower.includes("work") || lower.includes("devorbit") || lower.includes("ecosphere") || lower.includes("taskflow")) {
        const titles = data.projects.map(p => p.title).join(", ");
        aiResponse = `Alex has built several high-quality projects including ${titles}. For instance, DevOrbit is a WebGL commit-tree visualizer, and EcoSphere tracks IoT forest climate feeds.`;
      } else if (lower.includes("skill") || lower.includes("tech") || lower.includes("languages") || lower.includes("code")) {
        const skillsList = data.skills.slice(0, 6).map(s => s.name).join(", ");
        aiResponse = `Alex's core technical competencies include ${skillsList}, and several others. They specialize in Next.js, TypeScript, and WebGL rendering.`;
      } else if (lower.includes("certif") || lower.includes("aws") || lower.includes("meta")) {
        const certList = data.certificates.map(c => c.name).join(" and ");
        aiResponse = `Alex holds professional certifications including the ${certList}.`;
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("phone")) {
        aiResponse = "You can contact Alex directly using the form in the Contact section of this page, or email hello@example.com.";
      } else if (lower.includes("experience") || lower.includes("job") || lower.includes("company")) {
        const companies = data.experience.map(e => e.company).join(" and ");
        aiResponse = `Alex has worked at ${companies} as a Senior Interactive Developer and Full Stack Engineer.`;
      }

      setMessages(prev => [...prev, { sender: "ai", text: aiResponse }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Toggle Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-xl shadow-violet-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1">Ask AI</span>
        </motion.button>
      </div>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-full max-w-[400px] h-[550px] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-md"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="p-4 bg-zinc-950/80 border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Smart Portfolio Assistant</h4>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">AI Assistant Layer</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 bg-zinc-950/40 border-b border-zinc-800/60 font-semibold text-[10px] uppercase tracking-wider text-center">
              <button 
                onClick={() => setActiveTab("chat")}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === "chat" 
                    ? "border-violet-500 text-white bg-zinc-900/20" 
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> Chatbot
              </button>
              <button 
                onClick={() => setActiveTab("health")}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === "health" 
                    ? "border-violet-500 text-white bg-zinc-900/20" 
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Health
              </button>
              <button 
                onClick={() => setActiveTab("gap")}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === "gap" 
                    ? "border-violet-500 text-white bg-zinc-900/20" 
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" /> Skill Gap
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-zinc-950/10">
              
              {/* TAB 1: Chatbot (RAG emulator) */}
              {activeTab === "chat" && (
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-4 overflow-y-auto flex-1 max-h-[360px] pr-1">
                    {messages.map((msg, idx) => {
                      const isAi = msg.sender === "ai";
                      return (
                        <div key={idx} className={`flex items-start gap-2.5 ${!isAi && "flex-row-reverse"}`}>
                          <div className={`p-1.5 rounded-lg border text-xs ${
                            isAi 
                              ? "bg-zinc-900 border-zinc-800 text-violet-400" 
                              : "bg-violet-600/10 border-violet-500/20 text-cyan-400"
                          }`}>
                            {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                          </div>
                          <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
                            isAi 
                              ? "bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 rounded-tl-none" 
                              : "bg-violet-600 text-white rounded-tr-none"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 pt-4 border-t border-zinc-800/40">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about projects, skills, history..."
                      className="flex-1 px-4 py-2 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 transition-all"
                    />
                    <button 
                      type="submit"
                      className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white active:scale-95 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: Portfolio Health Analyzer */}
              {activeTab === "health" && (
                <div className="space-y-6">
                  {/* Score circle */}
                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                    <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-4 border-violet-500 text-white font-extrabold text-lg">
                      92%
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Portfolio Integrity Rating</h5>
                      <p className="text-[10px] text-zinc-500 mt-0.5">High rating. Meets general recruiter standards.</p>
                    </div>
                  </div>

                  {/* Audit Checklist */}
                  <div className="space-y-3.5">
                    <h6 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Audits Checklist</h6>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>SEO parameters defined & optimized for indexes</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>Core skills configured with levels (14 detailed)</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>Work experiences detailed with bullet parameters</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <div className="w-4 h-4 border border-zinc-800 rounded-full flex-shrink-0 mt-0.5" />
                        <span className="italic">Warning: Missing video walk link for DevOrbit project</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <div className="w-4 h-4 border border-zinc-800 rounded-full flex-shrink-0 mt-0.5" />
                        <span className="italic">Warning: Contact phone parameter is currently blank</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Skill Gap & Roadmap */}
              {activeTab === "gap" && (
                <div className="space-y-6">
                  {/* Select profile */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 block mb-2">
                      Target Career Role
                    </label>
                    <select
                      value={targetCareer}
                      onChange={(e) => setTargetCareer(e.target.value as keyof typeof CAREER_PROFILES)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-violet-500/50"
                    >
                      {Object.keys(CAREER_PROFILES).map((key) => (
                        <option key={key} value={key}>
                          {CAREER_PROFILES[key as keyof typeof CAREER_PROFILES].name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Matching Indicator */}
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold text-zinc-300">Skill Competency Match</span>
                      <span className="text-xs font-bold text-violet-400">
                        {CAREER_PROFILES[targetCareer].match}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-850">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${CAREER_PROFILES[targetCareer].match}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Missing Skills */}
                  {CAREER_PROFILES[targetCareer].missing.length > 0 && (
                    <div className="space-y-2">
                      <h6 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Missing Competencies</h6>
                      <div className="space-y-1.5">
                        {CAREER_PROFILES[targetCareer].missing.map((sk, idx) => (
                          <div key={idx} className="text-xs text-zinc-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                            {sk}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Roadmap Milestones */}
                  <div className="space-y-3 pt-2">
                    <h6 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Learning Milestones Roadmap</h6>
                    <div className="space-y-2.5 relative pl-4 border-l border-zinc-800/60 ml-2">
                      {CAREER_PROFILES[targetCareer].roadmap.map((milestone, idx) => {
                        const isCompleted = idx < Math.ceil(CAREER_PROFILES[targetCareer].roadmap.length * (CAREER_PROFILES[targetCareer].match / 100));
                        return (
                          <div key={idx} className="relative group text-[10px] sm:text-xs">
                            <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border ${
                              isCompleted 
                                ? "bg-emerald-500 border-transparent shadow-sm shadow-emerald-500/20" 
                                : "bg-zinc-900 border-zinc-850"
                            }`} />
                            <span className={isCompleted ? "text-zinc-300 font-medium" : "text-zinc-600 italic"}>
                              {milestone}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
