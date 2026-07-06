"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../shared/icons";
import { Profile } from "@/lib/mockData";

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending form submission
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white border-b border-zinc-200">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* Header */}
        <div className="text-left mb-16">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.h3 
            className="text-2xl sm:text-3xl font-black text-zinc-950"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's Start a Conversation
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Details - Left column (Lg: col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-zinc-50 border border-zinc-200">
            <div className="space-y-6">
              <h4 className="text-base font-bold text-zinc-900 mb-2">Contact Details</h4>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white border border-zinc-200 text-violet-600 shadow-sm group-hover:border-violet-500/30 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">Email</span>
                  <a href="mailto:hello@example.com" className="text-zinc-700 font-semibold text-sm hover:text-violet-600 transition-colors">
                    hello@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white border border-zinc-200 text-cyan-600 shadow-sm group-hover:border-cyan-500/30 transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">Phone</span>
                  <a href="tel:+1234567890" className="text-zinc-700 font-semibold text-sm hover:text-cyan-600 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white border border-zinc-200 text-fuchsia-600 shadow-sm group-hover:border-fuchsia-500/30 transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">Location</span>
                  <span className="text-zinc-700 font-semibold text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Social Grid block */}
            <div className="pt-8 border-t border-zinc-200/80 mt-8">
              <h5 className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest mb-4">Connect with me</h5>
              <div className="flex flex-wrap gap-2">
                <a 
                  href={profile.socialLinks.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
                <a 
                  href={profile.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold"
                >
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
                {profile.socialLinks.kaggle && (
                  <a 
                    href={profile.socialLinks.kaggle} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                  >
                    Kaggle
                  </a>
                )}
                {profile.socialLinks.medium && (
                  <a 
                    href={profile.socialLinks.medium} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                  >
                    Medium
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Form - Right column (Lg: col-span-7) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
              
              <div>
                <label htmlFor="name" className="text-[10px] font-bold text-zinc-455 uppercase tracking-widest block mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-[10px] font-bold text-zinc-455 uppercase tracking-widest block mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-[10px] font-bold text-zinc-455 uppercase tracking-widest block mb-2">
                  Message
                </label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your project requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-violet-500/60 focus:bg-white transition-colors text-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md shadow-zinc-900/10 active:scale-98 cursor-pointer"
              >
                {status === "sending" ? (
                  "Sending Message..."
                ) : status === "success" ? (
                  "Message Sent Successfully!"
                ) : (
                  <>
                    Send Message <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
