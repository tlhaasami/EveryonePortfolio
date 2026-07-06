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
    <section id="contact" className="py-24 relative overflow-hidden bg-zinc-950/20">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's Start a Conversation
          </motion.h3>
          <motion.p 
            className="text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Have a project in mind, an opportunity, or just want to say hello? Drop me a message below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          
          {/* Details - Left column */}
          <div className="lg:col-span-2 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white mb-4">Contact Information</h4>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-violet-400 group-hover:border-violet-500/30 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Email me</span>
                  <a href="mailto:hello@example.com" className="text-zinc-300 font-medium hover:text-white transition-colors">
                    hello@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Call me</span>
                  <a href="tel:+1234567890" className="text-zinc-300 font-medium hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-fuchsia-400 group-hover:border-fuchsia-500/30 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Location</span>
                  <span className="text-zinc-300 font-medium">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Social Grid block */}
            <div className="pt-8 border-t border-zinc-900">
              <h5 className="text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-4">Connect with me</h5>
              <div className="flex items-center gap-4">
                <a 
                  href={profile.socialLinks.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a 
                  href={profile.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                {profile.socialLinks.twitter && (
                  <a 
                    href={profile.socialLinks.twitter} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Form - Right column */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md space-y-6">
              
              <div>
                <label htmlFor="name" className="text-xs font-semibold text-zinc-400 tracking-wider uppercase block mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-5 py-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-semibold text-zinc-400 tracking-wider uppercase block mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-5 py-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-semibold text-zinc-400 tracking-wider uppercase block mb-2">
                  Message
                </label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project details..."
                  className="w-full px-5 py-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:brightness-110 text-white font-bold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-98 shadow-lg shadow-violet-500/10"
              >
                {status === "sending" ? (
                  "Sending Message..."
                ) : status === "success" ? (
                  "Message Sent Successfully!"
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
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
