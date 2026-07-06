"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/icons";
import { Profile } from "@/lib/mockData";

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  const contactDetails = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com", color: "text-[hsl(262,83%,58%)]", borderColor: "group-hover:border-violet-500/30" },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+1 (234) 567-890", href: "tel:+1234567890", color: "text-[hsl(175,72%,42%)]", borderColor: "group-hover:border-teal-500/30" },
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "San Francisco, CA", href: null, color: "text-[hsl(35,92%,62%)]", borderColor: "group-hover:border-amber-500/30" },
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-white border-b border-zinc-200">
      {/* Decorative dot grid background behind the form */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-grid-pattern opacity-50 pointer-events-none" />
      
      {/* Background glows */}
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-[hsl(262,83%,90%)] opacity-15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-[hsl(175,72%,88%)] opacity-12 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-left mb-16">
          <motion.h2 
            className="text-xs font-bold tracking-widest text-[hsl(262,83%,58%)] uppercase mb-2"
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
          
          {/* Contact Details - Left column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-zinc-50/80 border border-zinc-200/60">
            <div className="space-y-6">
              <h4 className="text-base font-bold text-zinc-900 mb-2">Contact Details</h4>
              
              {contactDetails.map((detail, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={`p-3 rounded-xl bg-white border border-zinc-200/80 ${detail.color} shadow-sm ${detail.borderColor} transition-all`}>
                    {detail.icon}
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">{detail.label}</span>
                    {detail.href ? (
                      <a href={detail.href} className={`text-zinc-700 font-semibold text-sm hover:${detail.color} transition-colors`}>
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-zinc-700 font-semibold text-sm">{detail.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Grid */}
            <div className="pt-8 border-t border-zinc-200/60 mt-8">
              <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Connect with me</h5>
              <div className="flex flex-wrap gap-2">
                <a 
                  href={profile.socialLinks.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-zinc-200/80 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 hover:shadow-sm transition-all flex items-center gap-1.5 text-xs font-bold"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
                <a 
                  href={profile.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-zinc-200/80 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 hover:shadow-sm transition-all flex items-center gap-1.5 text-xs font-bold"
                >
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
                {profile.socialLinks.kaggle && (
                  <a href={profile.socialLinks.kaggle} target="_blank" rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-zinc-200/80 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 hover:shadow-sm transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                    Kaggle
                  </a>
                )}
                {profile.socialLinks.medium && (
                  <a href={profile.socialLinks.medium} target="_blank" rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-zinc-200/80 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 hover:shadow-sm transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                    Medium
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Form - Right column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-6 relative overflow-hidden">
              {/* Subtle gradient on form card */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.01] via-transparent to-teal-500/[0.01] pointer-events-none" />

              {/* Name Field with floating label */}
              <div className="relative z-10">
                <label 
                  htmlFor="name" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-bold uppercase tracking-wider ${
                    focusedField === "name" || formState.name 
                      ? "top-1.5 text-[8px] text-[hsl(262,83%,58%)]" 
                      : "top-3.5 text-[10px] text-zinc-400"
                  }`}
                >
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formState.name}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 pt-5 pb-2 rounded-xl bg-zinc-50/80 border border-zinc-200/80 text-zinc-900 focus:outline-none focus:border-[hsl(262,83%,58%)] focus:bg-white focus:shadow-sm transition-all text-sm"
                />
              </div>

              {/* Email Field with floating label */}
              <div className="relative z-10">
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-bold uppercase tracking-wider ${
                    focusedField === "email" || formState.email 
                      ? "top-1.5 text-[8px] text-[hsl(262,83%,58%)]" 
                      : "top-3.5 text-[10px] text-zinc-400"
                  }`}
                >
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formState.email}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 pt-5 pb-2 rounded-xl bg-zinc-50/80 border border-zinc-200/80 text-zinc-900 focus:outline-none focus:border-[hsl(262,83%,58%)] focus:bg-white focus:shadow-sm transition-all text-sm"
                />
              </div>

              {/* Message Field with floating label */}
              <div className="relative z-10">
                <label 
                  htmlFor="message" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-bold uppercase tracking-wider ${
                    focusedField === "message" || formState.message 
                      ? "top-1.5 text-[8px] text-[hsl(262,83%,58%)]" 
                      : "top-3.5 text-[10px] text-zinc-400"
                  }`}
                >
                  Message
                </label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  value={formState.message}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 pt-5 pb-2 rounded-xl bg-zinc-50/80 border border-zinc-200/80 text-zinc-900 focus:outline-none focus:border-[hsl(262,83%,58%)] focus:bg-white focus:shadow-sm transition-all text-sm resize-none"
                />
              </div>

              {/* Gradient Submit Button */}
              <button 
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="relative z-10 w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(262,83%,48%)] hover:from-[hsl(262,83%,52%)] hover:to-[hsl(262,83%,42%)] text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-violet-500/20 active:scale-[0.98] cursor-pointer hover:shadow-xl hover:shadow-violet-500/30"
              >
                {status === "sending" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending Message...</>
                ) : status === "success" ? (
                  "✓ Message Sent Successfully!"
                ) : (
                  <>Send Message <Send className="w-3.5 h-3.5" /></>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
